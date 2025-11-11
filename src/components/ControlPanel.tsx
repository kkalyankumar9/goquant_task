"use client";

import { useAppState } from "@/context/AppStateProvider";
import { Button } from "@/components/ui/button";

export default function ControlPanel() {
  const { state, dispatch } = useAppState();

  return (
    <div className="flex flex-col gap-3 bg-gray-900/80 text-white p-4 rounded-xl shadow-lg w-64">
      <h2 className="text-lg font-semibold mb-2">Filter Providers</h2>

      {Object.keys(state.providerFilter).map((provider) => (
        <label
          key={provider}
          className="flex items-center justify-between cursor-pointer"
        >
          <span>{provider}</span>
          <input
            type="checkbox"
            checked={state.providerFilter[provider]}
            onChange={() =>
              dispatch({ type: "TOGGLE_PROVIDER", provider })
            }
          />
        </label>
      ))}

      <Button
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
        onClick={() => window.location.reload()}
      >
        Refresh Globe
      </Button>
    </div>
  );
}
