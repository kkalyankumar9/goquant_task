'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useAppState } from '@/context/AppStateProvider';
import { useMemo, useState } from 'react';

// Format timestamp to "HH:mm" for same-day, or "MM/DD HH:mm" for older
function formatTime(ts: number, range: string) {
  const date = new Date(ts);
  if (range === '1h' || range === '24h') {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString([], { month: '2-digit', day: '2-digit' }) +
    ' ' +
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function LatencyHistoryChart() {
  const { state } = useAppState();
  const latencyHistory = state.latencyHistory || {};

  const exchangePairs = Object.keys(latencyHistory);
  const [selectedPair, setSelectedPair] = useState(exchangePairs[0] || '');
  const [range, setRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  // Compute chart data from AppState
  const data = useMemo(() => {
    if (!selectedPair || !latencyHistory[selectedPair]) return [];
    return latencyHistory[selectedPair].map((d, i) => ({
      time: formatTime(
        Date.now() - (latencyHistory[selectedPair].length - i - 1) * 5000,
        range
      ),
      latency: d.latency,
    }));
  }, [selectedPair, latencyHistory, range]);

  // Min/Max/Avg
  const min = data.length ? Math.min(...data.map((d) => d.latency)) : 0;
  const max = data.length ? Math.max(...data.map((d) => d.latency)) : 0;
  const avg = data.length
    ? data.reduce((s, d) => s + d.latency, 0) / data.length
    : 0;

  return (
    <div className="w-full max-w-4xl bg-gray-900/70 rounded-2xl border border-gray-800 shadow-lg p-4 md:p-6 mt-4">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-3">
        <h2 className="text-lg md:text-xl font-semibold">
          Historical Latency — {selectedPair}
        </h2>

        <div className="flex gap-2">
          {(['1h', '24h', '7d', '30d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                range === r
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {r}
            </button>
          ))}

          {exchangePairs.length > 1 && (
            <select
              className="bg-gray-800 text-white rounded p-1"
              value={selectedPair}
              onChange={(e) => setSelectedPair(e.target.value)}
            >
              {exchangePairs.map((pair) => (
                <option key={pair} value={pair}>
                  {pair}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" tick={{ fill: '#aaa', fontSize: 12 }} />
          <YAxis tick={{ fill: '#aaa', fontSize: 12 }} domain={[0, 'auto']} />
          <Tooltip
            contentStyle={{
              background: '#111',
              border: '1px solid #333',
              color: '#fff',
            }}
          />
          <Line
            type="monotone"
            dataKey="latency"
            stroke="#00c6ff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Stats */}
      <div className="flex justify-center md:justify-end gap-6 mt-4 text-gray-300 text-sm">
        <span>Min: {min.toFixed(1)} ms</span>
        <span>Max: {max.toFixed(1)} ms</span>
        <span>Avg: {avg.toFixed(1)} ms</span>
      </div>
    </div>
  );
}
