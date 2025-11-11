"use client";

import dynamic from "next/dynamic";
import Legend from "@/components/Legend";
import LatencyHistoryChart from "@/components/LatencyHistoryChart";

const GlobeViewer = dynamic(() => import("@/components/GlobeViewer"), { ssr: false });

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col items-center justify-start">
      <header className="w-full max-w-7xl px-4 md:px-8 py-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Latency Topology Visualizer 🌍
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          Explore cryptocurrency exchange infrastructure and latency across AWS, GCP, and Azure regions.
        </p>
      </header>

      <section className="w-full max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
        <Legend />
      </section>

      <section className="relative w-full flex-1 flex items-center justify-center px-2 pb-8">
        <div className="w-full max-w-6xl h-[60vh] md:h-[70vh] lg:h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
          <GlobeViewer />
        </div>
      </section>

      <section className="w-full flex flex-col items-center">
        <LatencyHistoryChart />
      </section>

      <footer className="w-full text-center text-gray-500 text-xs py-4 border-t border-gray-800">
        © {new Date().getFullYear()} GoQuant Assignment • Built with Next.js + Three.js
      </footer>
    </main>
  );
}
