"use client";

import { useAppState } from "@/context/AppStateProvider";

const providers = ["AWS", "GCP", "Azure"];

export default function Legend() {
  const { state, dispatch } = useAppState();

  return (
    <div className="flex gap-4 flex-wrap justify-center items-center">
      {providers.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 rounded-full text-sm ${
            state.providerFilter[p] ? "bg-green-600" : "bg-gray-600"
          }`}
          onClick={() => dispatch({ type: "TOGGLE_PROVIDER", provider: p })}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
