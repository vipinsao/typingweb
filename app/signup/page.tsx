"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    setErrorMsg("");
    if (!name || !email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      router.push("/practice");
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMsg("Signup failed. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    setErrorMsg("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/practice");
    } catch (error: unknown) {
      console.error("Google signup error:", error);
      setErrorMsg("Google signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-950 text-white">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errorMsg && (
          <p className="text-red-500 text-sm text-center mb-4">{errorMsg}</p>
        )}

        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition duration-200 mb-3"
        >
          Sign Up
        </button>

        <button
          onClick={handleGoogleSignup}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
