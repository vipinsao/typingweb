"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePageContent() {
  const router = useRouter();

  const handleGuestLogin = () => {
    localStorage.setItem("isGuest", "true");
    router.push("/practice");
  };

  return (
    <main className="bg-gray-950 text-white min-h-screen">
      {/* Beta Header Notice */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-center py-2 text-sm font-medium">
        🚀 This is the <span className="font-semibold">Beta Version</span> of
        TypingWeb. New features are under development. Stay tuned!
      </div>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 py-20 max-w-7xl mx-auto">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Master Typing with <span className="text-blue-500">TypingWeb</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Improve your typing speed, accuracy, and confidence with fun and
            effective typing practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push("/login")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push("/signup")}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Sign Up
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleGuestLogin}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Try as Guest
            </motion.button>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="mt-12 md:mt-0"
        >
          <Image
            src="/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg"
            alt="Typing Hero"
            width={500}
            height={500}
            className="rounded-xl shadow-xl object-cover"
          />
        </motion.div>
      </section>

      {/* Why Typing Matters */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-900 py-16 px-6"
      >
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why is Typing Important?
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            {`In today's digital world, typing is an essential skill for
            communication, productivity, and success. Whether you're a student,
            professional, or gamer — fast and accurate typing gives you a huge
            advantage.`}
          </p>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-950 py-20 px-6"
      >
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why Choose <span className="text-blue-500">TypingWeb</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-400">
                Real-time Practice
              </h3>
              <p className="text-gray-400">
                Practice with real-time feedback on speed, accuracy, and errors.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-purple-400">
                Engaging UI
              </h3>
              <p className="text-gray-400">
                Smooth, responsive, and intuitive design makes learning fun and
                easy.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-green-400">
                Guest Access
              </h3>
              <p className="text-gray-400">
                Jump right in — no sign up required. Just click and start
                typing!
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
