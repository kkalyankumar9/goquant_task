"use client";

import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";

// Types
export type Exchange = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  provider: string;
};

export type LatencyLink = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  latency: number;
};

export type State = {
  providerFilter: Record<string, boolean>;
  exchanges: Exchange[];
  latencyLinks: LatencyLink[];
  latencyHistory: Record<string, LatencyLink[]>; // Step 8
};

type Action =
  | { type: "TOGGLE_PROVIDER"; provider: string }
  | { type: "SET_EXCHANGES"; data: Exchange[] }
  | { type: "SET_LATENCY"; data: LatencyLink[] };

const initialExchanges: Exchange[] = [
  { id: "Binance", name: "Binance", lat: 25.2, lng: 55.3, provider: "AWS" },
  { id: "Coinbase", name: "Coinbase", lat: 37.7, lng: -122.4, provider: "GCP" },
  { id: "Bybit", name: "Bybit", lat: 35.6, lng: 139.7, provider: "Azure" },
];

const initialState: State = {
  providerFilter: { AWS: true, GCP: true, Azure: true },
  exchanges: initialExchanges,
  latencyLinks: [],
  latencyHistory: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_PROVIDER":
      return {
        ...state,
        providerFilter: {
          ...state.providerFilter,
          [action.provider]: !state.providerFilter[action.provider],
        },
      };
    case "SET_EXCHANGES":
      return { ...state, exchanges: action.data };
    case "SET_LATENCY":
      // Store history
      const updatedHistory = { ...state.latencyHistory };
      action.data.forEach((link) => {
        const key = `${link.startLat},${link.startLng}-${link.endLat},${link.endLng}`;
        if (!updatedHistory[key]) updatedHistory[key] = [];
        updatedHistory[key].push(link);
        if (updatedHistory[key].length > 20) updatedHistory[key].shift(); // keep last 20 points
      });
      return { ...state, latencyLinks: action.data, latencyHistory: updatedHistory };
    default:
      return state;
  }
}

const AppStateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Simulate real-time latency
  useEffect(() => {
    const interval = setInterval(() => {
      const links: LatencyLink[] = [];
      for (let i = 0; i < state.exchanges.length; i++) {
        for (let j = i + 1; j < state.exchanges.length; j++) {
          links.push({
            startLat: state.exchanges[i].lat,
            startLng: state.exchanges[i].lng,
            endLat: state.exchanges[j].lat,
            endLng: state.exchanges[j].lng,
            latency: Math.random() * 200,
          });
        }
      }
      dispatch({ type: "SET_LATENCY", data: links });
    }, 5000);

    return () => clearInterval(interval);
  }, [state.exchanges]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
