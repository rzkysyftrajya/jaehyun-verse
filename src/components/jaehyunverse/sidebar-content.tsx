"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Heart,
  Calendar,
  Wand2,
  BookHeart,
  Gamepad2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/jaehyunverse", label: "Home", icon: Home },
  { href: "/jaehyunverse/daily", label: "Daily Jaehyun", icon: Calendar },
  { href: "/jaehyunverse/hearts", label: "Heart Collector", icon: Heart },
  { href: "/jaehyunverse/games", label: "Game Center", icon: Gamepad2 },
  { href: "/jaehyunverse/creative", label: "Creative Corner", icon: Wand2 },
  { href: "/jaehyunverse/guestbook", label: "Guestbook", icon: BookHeart },
];

const NavLink = ({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
        "hover:bg-primary/20 hover:text-primary-foreground",
        isActive
          ? "bg-primary/30 text-primary-foreground shadow-inner"
          : "text-muted-foreground"
      )}
    >
      <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "")} />
      <span className="font-semibold">{label}</span>
    </Link>
  );
};

export const SidebarContent = () => (
  <>
    {/* Header */}
    <div className="text-center py-4">
      <h1 className="text-2xl font-bold text-primary-foreground tracking-wider">
        Jaehyunverse
      </h1>
      <p className="text-xs text-accent">fan portal</p>
    </div>

    {/* Nav links */}
    <nav className="flex flex-col gap-2 mt-8">
      {navItems.map((item) => (
        <NavLink key={item.href} {...item} />
      ))}
    </nav>

    {/* Footer */}
    <div className="mt-auto text-center text-xs text-muted-foreground p-4">
      <p>Made with love for JAEHYUN ♡</p>
      <p>&copy; {new Date().getFullYear()}</p>
    </div>
  </>
);
