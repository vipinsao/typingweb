"use client";
import { useEffect, useRef, useState } from "react";
import paragraphs from "@/public/paragraphs.json";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import Footer from "@/components/Footer";

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
  const [user, setUser] = useState<{ name: string; isGuest: boolean }>({
    name: "Guest",
    isGuest: true,
  });

  useEffect(() => {
    const storedGuest = localStorage.getItem("isGuest");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (storedGuest === "true") {
        setUser({ name: "Guest", isGuest: true });
      } else if (currentUser) {
        setUser({ name: currentUser.displayName || "User", isGuest: false });
      }
    });
    return () => unsubscribe();
  }, []);

  const router = useRouter();
  const paragraphRef = useRef<string>("");

  const resetTest = () => {
    const randomParagraph =
      paragraphs[mode][Math.floor(Math.random() * paragraphs[mode].length)];
    setTargetText(randomParagraph);
    paragraphRef.current = randomParagraph;
    setTypedText("");
    setAccuracy(null);
    setCorrectCount(0);
    setIsStarted(false);
    setShowCompletionModal(false);
  };

  const handleStop = () => {
    setIsStarted(false);
    const total = typedText.length;
    const correct = correctCount;
    const acc = total > 0 ? (correct / total) * 100 : 0;
    setAccuracy(Number(acc.toFixed(2)));
    setShowCompletionModal(true);
  };

  useEffect(() => {
    resetTest();
  }, [mode]);

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
        /^[a-zA-Z0-9 .,!?;:'"()\[\]{}<>\\/\\|`~@#$%^&*\-_=+\\n\\t]$/.test(
          inputChar
        )
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
  }, [typedText, isStarted]);

  const englishLayout = [
    ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    [" "],
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-black text-white p-4 overflow-x-hidden">
      <div className="absolute top-4 right-4 text-white font-semibold">
        {user.isGuest ? "Guest User" : `Hello, ${user.name}`}
      </div>

      <h1
        className="absolute top-4 left-4 text-4xl text-green-400 font-extrabold italic tracking-wide"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        <Link href="/">TypeWeb</Link>
      </h1>

      <div className="flex items-center gap-4 mb-8">
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

      <div className="flex w-full justify-center mb-2">
        <div
          className="text-2xl w-full max-w-[85vw] flex flex-wrap justify-center gap-[2px] text-center bg-gray-800 px-4 py-3 rounded-lg select-none leading-relaxed break-words"
          style={{
            wordBreak: "keep-all",
            whiteSpace: "pre-wrap",
          }}
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

      <div className="text-white space-y-1 mt-1  items-center gap-4 flex ml-[85%] w-full pr-10">
        <p className="mt-1">
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
      </div>

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

      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl text-center space-y-4 border border-gray-700">
            <h2 className="text-xl font-semibold">Typing Completed!</h2>
            <p>Your accuracy: {accuracy}%</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  resetTest();
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
