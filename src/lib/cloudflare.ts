export async function fetchGlobalLatency() {
  try {
    const res = await fetch(
      'https://api.cloudflare.com/client/v4/radar/timeseries/network_latency/global?metrics=median_rtt_ms&time_delta=900'
    );
    const data = await res.json();
    return data?.result?.[0]?.median_rtt_ms ?? 50;
  } catch {
    return 50;
  }
}
