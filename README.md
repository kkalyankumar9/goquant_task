# 🌐 Latency Topology Visualizer

A **Next.js + TypeScript** application that visualizes **cryptocurrency exchange server locations** and **real-time/historical latency data** across **AWS, GCP, and Azure** regions — for understanding global trading infrastructure latency.

---

## 🚀 Overview

This project renders an **interactive 3D globe** displaying exchange server locations (Binance, OKX, Deribit, Bybit, etc.) and visualizes **latency links** between them and cloud co-location regions.  
Latency data updates in real-time using simulated values (and optionally Cloudflare Radar for real metrics).  
You can explore latency trends, toggle providers, and filter by exchange or region — all within a modern, performant UI.

---

## 🧩 Features

### 🌍 3D World Map
- Built with **Three.js** + **react-globe.gl**
- Interactive controls (zoom, rotate, pan)
- Smooth camera transitions

### 🏢 Exchange Server Visualization
- Major crypto exchanges (Binance, OKX, Deribit, Bybit)
- Hosted across **AWS**, **GCP**, and **Azure**
- Colored markers per cloud provider
- Hover/click to show server info

### ⚡ Real-time Latency Simulation
- Animated connections between exchanges and cloud regions
- Color-coded links (green = low, yellow = medium, red = high)
- Updates every 5–10 seconds
- Uses local simulation for unlimited free demo
- (Optional) Fetches Cloudflare Radar latency data for realism

### 📊 Historical Trends
- Time-series charts for latency history
- View average, min, max latency
- Select time ranges (1h, 24h, 7d, 30d)
- Built using **Recharts**

### ☁️ Cloud Provider Regions
- Visual clusters for AWS / GCP / Azure
- Distinct markers and colors
- Info cards with provider details and server counts
- Filter toggle for each provider

### 🧭 Controls & Filters
- Control panel for exchange, provider, latency range
- Search bar for quick lookup
- Toggle visualization layers (real-time / historical / regions)
- Performance metrics dashboard

### 🌓 Bonus Features
- Latency heatmap overlay
- Dark/Light theme toggle
- Responsive 3D rendering
- Export latency reports (CSV / PDF)

---

## 🛠️ Tech Stack

| Category | Technologies |
|-----------|--------------|
| Framework | [Next.js 14+ (App Router)](https://nextjs.org/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| 3D Visualization | [Three.js](https://threejs.org/), [react-globe.gl](https://github.com/vasturiano/react-globe.gl) |
| Charts | [Recharts](https://recharts.org/en-US/) |
| State Management | React Context API + Hooks |
| Data Fetching | [SWR](https://swr.vercel.app/) |
| Hosting (optional) | [Vercel](https://vercel.com/) |

---

## 🧱 Project Structure

