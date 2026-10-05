import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "1T1G — Build a brighter tomorrow",
  description:
    "1T1G is a remote team covering web and app development, design, marketing, hospitality growth, and Nepal government form and share market assistance."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
