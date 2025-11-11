"use client";

import { EXCHANGES } from './exchanges';

export type LatencyLink = {
  from: string;
  to: string;
  latency: number; // in ms
  color: string;
};

// latency color map
function latencyColor(latency: number) {
  if (latency < 100) return 'lime';
  if (latency < 200) return 'yellow';
  return 'red';
}

export function generateLatencyLinks(): LatencyLink[] {
  const links: LatencyLink[] = [];
  const exchanges = [...EXCHANGES];

  for (let i = 0; i < exchanges.length; i++) {
    for (let j = i + 1; j < exchanges.length; j++) {
      const latency = Math.round(40 + Math.random() * 250);
      links.push({
        from: exchanges[i].id,
        to: exchanges[j].id,
        latency,
        color: latencyColor(latency),
      });
    }
  }
  return links;
}
