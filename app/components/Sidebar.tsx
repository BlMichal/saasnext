"use client";

import { cn } from "@/lib/utils";
import { DollarSign, Globe, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Sites",
      href: "/dashboard/sites",
      icon: Globe,
    },
    {
      name: "Pricing",
      href: "/dashboard/pricing",
      icon: DollarSign,
    },
  ];

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            pathname === link.href
              ? "bg-muted text-primary"
              : "text-muted-foreground bg-none",
            "flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-primary/70"
          )}
        >
            <link.icon className="4" />
            {link.name}
        </Link>
      ))}
    </>
  );
}
