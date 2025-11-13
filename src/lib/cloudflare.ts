export async function fetchGlobalLatency() {
  try {
    const res = await fetch(
      "https://api.cloudflare.com/client/v4/radar/timeseries/network_latency/global?metrics=median_rtt_ms&time_delta=900",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`,
        },
        next: { revalidate: 300 }, // cache for 5 minutes
      }
    );

    if (!res.ok) {
      console.error("Cloudflare API error:", res.statusText);
      return 50;
    }

    const data = await res.json();

    // Cloudflare returns array-like time series data
    const latestValue =
      data?.result?.data?.at(-1)?.median_rtt_ms ?? 50;

    return latestValue;
  } catch (err) {
    console.error("Error fetching latency data:", err);
    return 50; // fallback latency
  }
}
