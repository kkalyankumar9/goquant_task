// src/lib/cloudRegions.ts

// Simplified demo data — enough to visualize clusters
export type CloudRegion = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  provider: "AWS" | "GCP" | "Azure";
  regionCode: string;
  serverCount: number;
};

export const CLOUD_REGIONS: CloudRegion[] = [
  {
    id: "aws-us-east-1",
    name: "N. Virginia",
    lat: 38.8,
    lng: -77.0,
    provider: "AWS",
    regionCode: "us-east-1",
    serverCount: 14,
  },
  {
    id: "aws-eu-west-1",
    name: "Ireland",
    lat: 53.3,
    lng: -6.2,
    provider: "AWS",
    regionCode: "eu-west-1",
    serverCount: 10,
  },
  {
    id: "gcp-asia-south1",
    name: "Mumbai",
    lat: 19.0,
    lng: 72.8,
    provider: "GCP",
    regionCode: "asia-south1",
    serverCount: 8,
  },
  {
    id: "azure-eastus",
    name: "East US",
    lat: 36.8,
    lng: -78.6,
    provider: "Azure",
    regionCode: "eastus",
    serverCount: 9,
  },
  {
    id: "azure-westeurope",
    name: "West Europe",
    lat: 52.4,
    lng: 4.9,
    provider: "Azure",
    regionCode: "westeurope",
    serverCount: 11,
  },
];
