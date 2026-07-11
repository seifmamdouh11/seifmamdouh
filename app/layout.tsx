import type { Metadata } from "next";
import { Poppins, Tajawal } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import LanguageProvider from "./context/LanguageContext";
import ThemeProvider from "./context/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SplashScreen from "./components/shared/SplashScreen";
import ScrollToTop from "./components/shared/ScrollToTop";
import { SplashProvider } from "./context/SplashContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});


export const metadata: Metadata = {
  metadataBase: new URL('https://seifmamdouh.com'),
  title: "Seif Mamdouh | Web Developer",
  description: "Explore the professional portfolio of Seif Mamdouh, a Web Developer based in Cairo, Egypt. Specializing in high-performance, responsive web applications built with Next.js, React, and modern tech stack.",
  keywords: [
    "Seif Mamdouh",
    "سيف ممدوح",
    "Web Developer",
    "Frontend Engineer",
    "Next.js Developer",
    "React Developer",
    "Software Engineer Portfolio",
    "Cairo Web Developer",
    "Egypt Software Engineer"
  ],
  authors: [{ name: "Seif Mamdouh", url: "https://www.linkedin.com/in/seifmamdouh" }],
  creator: "Seif Mamdouh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seifmamdouh.com",
    title: "Seif Mamdouh | Web Developer",
    description: "Explore the professional portfolio of Seif Mamdouh. Building high-performance, responsive web applications with modern technologies.",
    siteName: "Seif Mamdouh Portfolio",
    images: [
      {
        url: "/profile.jpeg",
        width: 800,
        height: 800,
        alt: "Seif Mamdouh Profile",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seif Mamdouh | Web Developer",
    description: "Explore the professional portfolio of Seif Mamdouh. Building high-performance, responsive web applications with modern technologies.",
    images: ["/profile.jpeg"],
  },
  other: {
    freelancehunt: "e203c6ec23b72ae",
  },
};


const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Seif Mamdouh",
  "url": "https://seifmamdouh.com",
  "image": "https://seifmamdouh.com/profile.jpeg",
  "sameAs": [
    "https://www.linkedin.com/in/seifmamdouh",
    "https://www.facebook.com/SeifMamd0uh",
    "https://www.instagram.com/seifmamdouh10/"
  ],
  "jobTitle": "Web Developer",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cairo",
    "addressCountry": "Egypt"
  },
  "description": "Explore the professional portfolio of Seif Mamdouh, a Web Developer based in Cairo, Egypt. Specializing in high-performance, responsive web applications built with Next.js, React, and modern tech stack."
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Seif Mamdouh | Web Developer",
  "url": "https://seifmamdouh.com"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${tajawal.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SplashProvider>
          <SplashScreen />
          <LanguageProvider>
            <ThemeProvider>
              <Navbar />
              {children}
              <Footer />
              <Analytics />
              <SpeedInsights />
              <ScrollToTop />
            </ThemeProvider>
          </LanguageProvider>
        </SplashProvider>
      </body>
    </html>
  );
}

