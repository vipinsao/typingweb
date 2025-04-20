"use client";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState, useRef } from "react";

export default function Header() {
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    isGuest: boolean;
  }>({
    name: "Guest",
    isGuest: true,
  });
  const avatarName = currentUser?.name || "Guest";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedGuest = localStorage.getItem("isGuest");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (storedGuest === "true") {
        setCurrentUser({ name: "Guest", isGuest: true });
      } else if (user) {
        setCurrentUser({ name: user.displayName || "User", isGuest: false });
      }
    });
    return () => unsubscribe();
  }, []);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser({ name: "Guest", isGuest: true });
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <header className="flex justify-between items-center w-full py-1 px-6 bg-gray-800 text-white fixed top-0 left-0 z-10">
      <h1
        className="text-3xl text-blue-500 font-extrabold italic tracking-wide"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        <Link href="/">TypingWeb</Link>
      </h1>

      {/* Right Section: Login or User Dropdown */}
      <div className="relative flex items-center gap-4">
        {currentUser.isGuest ? (
          <Link href="/login">
            <button className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transition-all">
              Login
            </button>
          </Link>
        ) : (
          <>
            {/* Profile Icon and Dropdown */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 bg-zinc-950  p-2 rounded-full hover:bg-gray-600 transition-all"
            >
              <span className="font-semibold text-zinc-100 hover:text-zinc-50 text-md">
                {avatarName.toUpperCase()}
              </span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-12 bg-white text-black shadow-lg rounded-md w-48 py-2"
              >
                <div className="px-4 py-2 text-sm- font-medium">
                  <Link href={"/about"}>about</Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
