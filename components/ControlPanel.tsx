// components/ControlPanel.tsx
import React from "react";

interface ControlPanelProps {
  mode: "easy" | "medium" | "hard";
  setMode: React.Dispatch<React.SetStateAction<"easy" | "medium" | "hard">>;
  resetTest: () => void;
  setStartTime: React.Dispatch<React.SetStateAction<number | null>>;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  handleStop: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  mode,
  setMode,
  resetTest,
  setStartTime,
  setIsStarted,
  handleStop,
}) => {
  return (
    <div className="flex items-center gap-4 mb-2 mt-12">
      <div>
        <label className="mr-2 font-medium">Select Mode:</label>
        <select
          value={mode}
          onChange={(e) =>
            setMode(e.target.value as "easy" | "medium" | "hard")
          }
          className="p-1 rounded bg-gray-700 text-white border border-gray-500"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button
        onClick={() => {
          resetTest();
          setStartTime(Date.now());
          setIsStarted(true);
        }}
        className="px-4 py-2 rounded bg-green-600 text-white font-medium"
      >
        Start
      </button>
      <button
        onClick={handleStop}
        className="px-4 py-2 rounded bg-red-600 text-white font-medium"
      >
        Stop
      </button>
    </div>
  );
};

export default ControlPanel;
