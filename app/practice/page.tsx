"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import paragraphs from "@/public/paragraphs.json";
import { useRouter } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ControlPanel from "@/components/ControlPanel";

const KeyboardPractice = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [typedText, setTypedText] = useState("");
  const [wrongKey, setWrongKey] = useState<string | null>(null);
  const [mode, setMode] = useState<"easy" | "medium" | "hard">("easy");
  const [targetText, setTargetText] = useState("");
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);

  const router = useRouter();
  const paragraphRef = useRef<string>("");

  // Reset the typing test
  const resetTest = useCallback(() => {
    const randomParagraph =
      paragraphs[mode][Math.floor(Math.random() * paragraphs[mode].length)];
    setTargetText(randomParagraph);
    paragraphRef.current = randomParagraph;
    setTypedText("");
    setAccuracy(null);
    setCorrectCount(0);
    setIsStarted(false);
    setStartTime(null);
    setWpm(null);
    setShowCompletionModal(false);
  }, [mode]);

  // Stop typing and show stats
  const handleStop = useCallback(() => {
    setIsStarted(false);
    const total = typedText.length;
    const correct = correctCount;
    const acc = total > 0 ? (correct / total) * 100 : 0;
    setAccuracy(Number(acc.toFixed(2)));

    if (startTime) {
      const duration = (Date.now() - startTime) / 60000;
      const words = typedText.trim().split(/\s+/).length;
      const calculatedWpm = duration > 0 ? words / duration : 0;
      setWpm(Number(calculatedWpm.toFixed(2)));
    }

    setShowCompletionModal(true);
  }, [typedText, correctCount, startTime]);

  // Auto-reset test when mode changes
  useEffect(() => {
    resetTest();
  }, [resetTest]);

  // Keydown/keyup logic
  useEffect(() => {
    if (!isStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setIsShiftPressed(true);
        return;
      }
      if (["Control", "Alt", "Meta"].includes(e.key)) return;

      e.preventDefault();
      const inputChar = e.key.length === 1 ? e.key : "";
      const currentChar = paragraphRef.current[typedText.length];

      if (
        /^[a-zA-Z0-9 .,!?;:'"()\[\]{}<>\\/|`~@#$%^&*\-_=+\n\t]$/.test(inputChar)
      ) {
        if (typedText.length >= paragraphRef.current.length) return;

        if (inputChar === currentChar) {
          setTypedText((prev) => prev + inputChar);
          setCorrectCount((count) => count + 1);
          setActiveKey(inputChar.toLowerCase());
          setWrongKey(null);
        } else {
          setTypedText((prev) => prev + inputChar);
          setWrongKey(inputChar.toLowerCase());
          setActiveKey(null);
          setTimeout(() => setWrongKey(null), 400);
        }

        if (typedText.length + 1 === paragraphRef.current.length) {
          handleStop();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") setIsShiftPressed(false);
      setActiveKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [typedText, isStarted, handleStop]);

  // Keyboard Layout
  const englishLayout = [
    ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    [" "],
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-black text-white p-4 overflow-x-hidden">
      <Header />
      <ControlPanel
        mode={mode}
        setMode={setMode}
        resetTest={resetTest}
        setStartTime={setStartTime}
        setIsStarted={setIsStarted}
        handleStop={handleStop}
      />

      {/* Target Paragraph */}
      <div className="flex w-full justify-center mb-2">
        <div
          className="text-[20px] w-full max-w-[85vw] flex flex-wrap justify-center gap-[2px] text-center bg-gray-800 px-4 py-3 rounded-lg select-none leading-relaxed break-words"
          style={{ wordBreak: "keep-all", whiteSpace: "pre-wrap" }}
          onMouseDown={(e) => e.preventDefault()}
          onDoubleClick={(e) => e.preventDefault()}
        >
          {targetText.split(" ").map((word, wordIdx) => (
            <span key={wordIdx} className="mr-2 whitespace-nowrap">
              {[...word].map((char, charIdx) => {
                const globalIdx =
                  targetText.split(" ").slice(0, wordIdx).join(" ").length +
                  wordIdx +
                  charIdx;
                let className = "text-gray-300";
                if (globalIdx < typedText.length) {
                  className =
                    typedText[globalIdx] === char
                      ? "text-white opacity-50"
                      : "text-red-500";
                }
                return (
                  <span key={charIdx} className={`${className}`}>
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Panel */}
      <div className="text-white space-y-1 mt-1 items-center gap-4 flex ml-[80%] w-full pr-10">
        <p>
          <strong>Total Typed:</strong> {typedText.length}
        </p>
        <p>
          <strong>Correct:</strong> {correctCount}
        </p>
        {accuracy !== null && (
          <p>
            <strong>Accuracy:</strong> {accuracy}%
          </p>
        )}
        {wpm !== null && (
          <p>
            <strong>WPM:</strong> {wpm}
          </p>
        )}
      </div>

      {/* Keyboard */}
      <div className="flex flex-col items-center mt-3 space-y-2">
        {englishLayout.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-1">
            {row.map((keyChar) => {
              const displayChar =
                keyChar === " "
                  ? "␣"
                  : isShiftPressed
                  ? keyChar.toUpperCase()
                  : keyChar;
              const lowerKey = keyChar.toLowerCase();
              return (
                <div
                  key={keyChar}
                  className={`px-6 py-4 text-xl rounded border border-gray-600 transition-all duration-150 ${
                    activeKey === lowerKey
                      ? "bg-yellow-400 text-black"
                      : wrongKey === lowerKey
                      ? "bg-red-500 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {displayChar}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl text-center space-y-4 border border-gray-700">
            <h2 className="text-xl font-semibold">Typing Completed!</h2>
            <p>Your accuracy: {accuracy}%</p>
            <p>Your WPM: {wpm}</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  resetTest();
                  setStartTime(Date.now());
                  setIsStarted(true);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Start Again
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default KeyboardPractice;
