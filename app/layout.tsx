import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "1T1G — Build a brighter tomorrow",
  description:
    "1T1G is a remote team covering web and app development, design, marketing, hospitality growth, and Nepal government form and share market assistance.",
  icons: {
    icon: "/logo/1t1g-logo.jpg", // Adds your custom logo as the browser favicon
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="font-sans antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}