"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function StickyCta() {
  const pathname = usePathname();
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  if (pathname === "/contact" || footerVisible) return null;
  return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-soft-grey bg-white/95 p-3 shadow-lg sm:hidden"><Button href="/contact" className="w-full">Contact us</Button></div>;
}
