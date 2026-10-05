"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
