import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "TypingWeb",
  description: "Created Using Next.js,React.js & Firebase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans">{children}</body>
    </html>
  );
}
