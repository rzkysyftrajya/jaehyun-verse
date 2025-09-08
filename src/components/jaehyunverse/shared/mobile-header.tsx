"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SidebarContent } from "@/components/jaehyunverse/sidebar-content";

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="md:hidden sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b bg-background/80 backdrop-blur-lg">
      <h1 className="text-xl font-bold text-primary">Jaehyunverse</h1>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[280px] bg-card/80 backdrop-blur-xl border-l-0 p-0"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Navigasi utama situs</SheetDescription>
          </SheetHeader>
          <div onClick={() => setIsOpen(false)} className="p-4">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
