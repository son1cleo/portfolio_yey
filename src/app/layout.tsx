import type { Metadata } from "next";
import { Fira_Code, Open_Sans } from "next/font/google";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { ScrollNavigator } from "../components/ScrollNavigator";
import { ParticleNetwork } from "../components/ui/particle-network";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Midhat Ratib Khan | Portfolio",
  description:
    "Data scientist who ships production software. Analysis, LLM systems, and the apps around them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firaCode.variable} ${openSans.variable} antialiased`}>
        <ParticleNetwork />
        <Navbar />
        <ScrollNavigator />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
