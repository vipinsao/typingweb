"use client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState(""); // 🧑 Add name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      // 1. Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. Set display name in Firebase
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // 3. Navigate to /practice
      router.push("/practice");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className="text-black p-2 rounded"
      />
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="text-black p-2 rounded"
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="text-black p-2 rounded"
      />
      <button
        onClick={handleSignup}
        className="bg-purple-600 px-4 py-2 rounded"
      >
        Sign Up
      </button>
    </div>
  );
}
