'use client';

import { useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { useAppState } from '@/context/AppStateProvider';
import { CLOUD_REGIONS } from '@/lib/cloudRegions';

const providerColors: Record<string, string> = {
  AWS: '#ff9900',
  GCP: '#4285f4',
  Azure: '#00a2ed',
};

export default function GlobeViewer() {
  const globeRef = useRef<any>(null);
  const { state } = useAppState();
  const { exchanges = [], latencyLinks = [], providerFilter = {} } = state;

  // Only show regions matching filter
  const visibleRegions = CLOUD_REGIONS.filter(
    (r) => providerFilter[r.provider] !== false
  );

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ altitude: 2.2 }, 2000);
    }
  }, []);

  return (
    <div className="relative w-full h-[600px] md:h-[750px] rounded-xl overflow-hidden shadow-lg bg-black">
      <div className="relative w-full h-[80vh] flex items-center justify-center bg-black rounded-xl overflow-hidden shadow-2xl">
  <Globe
    ref={globeRef}
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
    backgroundColor="#000000"
    arcsData={latencyLinks}
    arcColor={(d: any) =>
      d.latency < 80 ? 'lime' : d.latency < 150 ? 'yellow' : 'red'
    }
    arcDashLength={0.3}
    arcDashGap={0.02}
    arcDashAnimateTime={3000}
    pointsData={[...exchanges, ...visibleRegions]}
    pointColor={(d: any) => providerColors[d.provider] || '#aaa'}
    pointAltitude={(d: any) => (d.serverCount ? 0.08 : 0.1)}
    pointRadius={(d: any) => (d.serverCount ? 0.4 : 0.25)}
    onPointClick={(d: any) =>
      alert(
        d.serverCount
          ? `${d.name} (${d.provider})\nRegion: ${d.regionCode}\nServers: ${d.serverCount}`
          : `${d.name} (${d.provider})`
      )
    }
    labelsData={visibleRegions}
    labelText={(d: any) => d.name}
    labelSize={1.0}
    labelColor={() => 'white'}
    labelDotRadius={0.15}
    labelAltitude={0.1}
  />
</div>

      {/* Provider Legend */}
      <div className="absolute bottom-4 left-4 bg-black/60 text-white text-sm p-3 rounded-lg flex gap-4">
        {Object.entries(providerColors).map(([provider, color]) => (
          <span key={provider} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full`} style={{ background: color }} />
            {provider}
          </span>
        ))}
      </div>
    </div>
  );
}
