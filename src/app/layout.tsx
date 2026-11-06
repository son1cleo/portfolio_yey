import type { Metadata } from "next";
import { Belleza } from "next/font/google";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { ScrollNavigator } from "../components/ScrollNavigator";
import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL, SITE_URL, X_URL } from "../data/content";
import "./globals.css";

const belleza = Belleza({ variable: "--font-display", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Midhat Ratib Khan | Portfolio",
  description: "Student and developer working across data, AI, and software. Personal portfolio; no services offered.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Midhat Ratib Khan | Portfolio",
    description: "Student and developer working across data, AI, and software. Personal portfolio; no services offered.",
    url: SITE_URL,
    type: "website",
    siteName: "RatibBuilds",
    images: [{ url: "/portfolio-social-preview.png", width: 1906, height: 902, alt: "Midhat Ratib Khan portfolio homepage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Midhat Ratib Khan | Portfolio",
    description: "Student and developer working across data, AI, and software. Personal portfolio; no services offered.",
    images: [{ url: "/portfolio-social-preview.png", alt: "Midhat Ratib Khan portfolio homepage" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "Person", name: "Midhat Ratib Khan", url: SITE_URL, sameAs: [INSTAGRAM_URL, X_URL, GITHUB_URL, LINKEDIN_URL], jobTitle: "Student and Developer", address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "Bangladesh" } };
  return (
    <html lang="en">
      <body className={`${belleza.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <Navbar />
        <ScrollNavigator />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
