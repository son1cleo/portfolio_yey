import type { Metadata } from "next";
import { VT323, Press_Start_2P, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  variable: "--font-sora",
  weight: "400",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-space-grotesk",
  weight: "400",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-type-machine",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Midhat Ratib Khan | Portfolio",
  description:
    "Pixelated dark-mode portfolio of Midhat Ratib Khan - Data Scientist and AI Engineer turning messy data into shipped systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vt323.variable} ${pressStart2P.variable} ${jetBrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
