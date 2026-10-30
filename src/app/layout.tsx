import type { Metadata } from "next";
import { Belleza, Fira_Code, Open_Sans } from "next/font/google";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { ScrollNavigator } from "../components/ScrollNavigator";
import { ParticleNetwork } from "../components/ui/particle-network";
import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL, PROVETALE_URL, SITE_URL, X_URL } from "../data/content";
import "./globals.css";

const belleza = Belleza({ variable: "--font-display", subsets: ["latin"], weight: "400" });
const firaCode = Fira_Code({ variable: "--font-fira-code", subsets: ["latin"] });
const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Midhat Ratib Khan | Portfolio",
  description: "Data scientist who ships production software. Analysis, LLM systems, and the apps around them.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Midhat Ratib Khan | Portfolio",
    description: "Data scientist who ships production software. Analysis, LLM systems, and the apps around them.",
    url: SITE_URL,
    type: "website",
    siteName: "RatibBuilds",
    images: [{ url: "/portfolio-social-preview.png", width: 1906, height: 902, alt: "Midhat Ratib Khan portfolio homepage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Midhat Ratib Khan | Portfolio",
    description: "Data scientist who ships production software. Analysis, LLM systems, and the apps around them.",
    images: [{ url: "/portfolio-social-preview.png", alt: "Midhat Ratib Khan portfolio homepage" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "Person", name: "Midhat Ratib Khan", url: SITE_URL, sameAs: [INSTAGRAM_URL, X_URL, GITHUB_URL, LINKEDIN_URL, PROVETALE_URL], jobTitle: "Data Scientist and Software Engineer", address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "Bangladesh" } };
  return (
    <html lang="en">
      <body className={`${belleza.variable} ${firaCode.variable} ${openSans.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <ParticleNetwork />
        <Navbar />
        <ScrollNavigator />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
