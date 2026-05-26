import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import LanguageProvider from "./context/LanguageContext";
import ThemeProvider from "./context/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SplashScreen from "./components/shared/SplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SplashScreen />
        <LanguageProvider>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

