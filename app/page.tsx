"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleGuestLogin = () => {
    localStorage.setItem("isGuest", "true");
    router.push("/practice");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full items-center">
        {/* Text Section */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            👋 Hey User, Ready to Boost Your Typing Skills?
          </h1>

          <p className="text-lg md:text-xl text-gray-300">
            Practice with{" "}
            <span className="text-blue-400 font-semibold">TypingWeb</span> and
            improve your English typing speed and accuracy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              Login
            </button>

            <button
              onClick={() => router.push("/signup")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              Sign Up
            </button>

            <button
              onClick={handleGuestLogin}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              Continue as Guest
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src="/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg"
            alt="Typing Illustration"
            width={400}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
