"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FiMail, FiLock } from "react-icons/fi";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isGuest");
    }
  }, []);

  const handleLogin = async () => {
    setErrorMsg("");
    setInfoMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/practice");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMsg("No user found with this email.");
            break;
          case "auth/wrong-password":
            setErrorMsg("Incorrect password.");
            break;
          case "auth/invalid-email":
            setErrorMsg("Invalid email address.");
            break;
          default:
            setErrorMsg("Login failed. Please try again.");
        }
      } else {
        setErrorMsg("An unexpected error occurred.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setInfoMsg("");

    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/practice");
    } catch (error) {
      console.error("Google login error:", error);
      setErrorMsg("Google login failed.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg("Please enter your email to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setInfoMsg("Password reset email sent!");
    } catch (error) {
      console.error("Password reset error:", error);
      setErrorMsg("Failed to send password reset email.");
    }
  };

  const redirectToSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back!
        </h1>

        <div className="space-y-4">
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}
          {infoMsg && (
            <p className="text-green-500 text-sm text-center">{infoMsg}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Login
          </button>

          <button
            onClick={handleForgotPassword}
            className="text-blue-400 text-sm hover:underline block mx-auto"
          >
            Forgot Password?
          </button>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Continue with Google
          </button>

          <button
            onClick={redirectToSignup}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
