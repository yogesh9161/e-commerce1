"use client";

import { usePathname } from "next/navigation";
import Navbar from "./landing page/navbar";
import Footer from "./landing page/footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}

      {children}

      {!isDashboard && <Footer />}
    </>
  );
}