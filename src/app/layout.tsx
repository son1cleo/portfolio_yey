import type { Metadata } from "next";
import { Belleza, Open_Sans, Fira_Code } from "next/font/google";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import {
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  SITE_URL,
  X_URL,
} from "../data/content";
import "./globals.css";

const belleza = Belleza({
  variable: "--font-belleza",
  subsets: ["latin"],
  weight: "400",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});
const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Midhat Ratib Khan | Portfolio",
  description:
    "Developer working across data, AI and software. Personal portfolio; no services offered.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Midhat Ratib Khan | Portfolio",
    description:
      "Developer working across data, AI and software. Personal portfolio; no services offered.",
    url: SITE_URL,
    type: "website",
    siteName: "RatibBuilds",
    images: [
      {
        url: "/social-preview-v2.png",
        width: 1200,
        height: 630,
        alt: "Midhat Ratib Khan, personal portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Midhat Ratib Khan | Portfolio",
    description:
      "Developer working across data, AI and software. Personal portfolio; no services offered.",
    images: [
      {
        url: "/social-preview-v2.png",
        alt: "Midhat Ratib Khan, personal portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Midhat Ratib Khan",
    url: SITE_URL,
    sameAs: [INSTAGRAM_URL, X_URL, GITHUB_URL, LINKEDIN_URL],
    jobTitle: "Developer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "North South University",
    },
    address: { "@type": "PostalAddress", addressCountry: "Bangladesh" },
  };
  return (
    <html
      lang="en"
      className={`${belleza.variable} ${openSans.variable} ${firaCode.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
