export type CloudProvider = 'AWS' | 'GCP' | 'Azure' | 'Other';

export type Exchange = {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  provider: CloudProvider;
};

export const EXCHANGES: Exchange[] = [
  { id: 'binance', name: 'Binance', city: 'Singapore', country: 'SG', lat: 1.3521, lon: 103.8198, provider: 'AWS' },
  { id: 'okx', name: 'OKX', city: 'Hong Kong', country: 'HK', lat: 22.3193, lon: 114.1694, provider: 'Azure' },
  { id: 'bybit', name: 'Bybit', city: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503, provider: 'GCP' },
  { id: 'deribit', name: 'Deribit', city: 'Amsterdam', country: 'NL', lat: 52.3676, lon: 4.9041, provider: 'AWS' },
  { id: 'ftx', name: 'FTX (demo)', city: 'London', country: 'GB', lat: 51.5074, lon: -0.1278, provider: 'GCP' },
  { id: 'coinbase', name: 'Coinbase Pro', city: 'San Francisco', country: 'US', lat: 37.7749, lon: -122.4194, provider: 'Azure' },
];
