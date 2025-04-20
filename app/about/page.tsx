'use client";';

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white p-4">
      <Header />

      {/* About Section */}
      <div className="max-w-3xl w-full text-center mt-10 space-y-6">
        <h1 className="text-4xl font-bold text-blue-500">
          How I Created Typing Web
        </h1>

        <p className="text-lg">
          Typing Web was developed as a project to help users improve their
          typing speed and accuracy through interactive keyboard practice
          sessions.
        </p>

        <p className="text-lg">
          Below are the steps we took to create this amazing web app:
        </p>

        <div className="space-y-4 mt-6">
          <h2 className="text-2xl font-semibold">
            Steps to Create Typing Web:
          </h2>
          <ul className="list-disc pl-6 text-lg">
            <li>
              <strong>Conceptualization:</strong> First, we focused on
              understanding how users practice typing and the key features they
              would need in an online typing app.
            </li>
            <li>
              <strong>Technology Stack:</strong> We decided to build the app
              using Next.js 15, React, and TypeScript for efficient development
              and scalability.
            </li>
            <li>
              <strong>Responsive Design:</strong> We ensured the app is
              mobile-friendly with a flexible layout that adapts to various
              screen sizes.
            </li>
            <li>
              <strong>Backend Integration:</strong> We integrated Firebase
              Authentication for user management (sign-in and sign-up
              functionality) and used real-time logic to track user progress.
            </li>
            <li>
              <strong>Typing Test Algorithm:</strong> The typing test works by
              comparing user input with pre-defined paragraphs, providing
              real-time feedback on typing speed (WPM) and accuracy.
            </li>
            <li>
              <strong>Interactive UI:</strong> An engaging keyboard UI was
              built, highlighting the active key and showing correct and
              incorrect keystrokes to guide the user.
            </li>
            <li>
              <strong>Testing & Deployment:</strong> After rigorous testing, we
              deployed the app to a live environment, ensuring all features work
              flawlessly.
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <Link href="/practice">
            <button className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all">
              Back to Practice
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
