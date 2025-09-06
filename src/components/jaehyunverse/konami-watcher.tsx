"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useKonamiCode } from '@/hooks/use-konami-code';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Sparkles } from 'lucide-react';

export default function KonamiWatcher() {
  const [unlocked, setUnlocked] = useState(false);

  useKonamiCode(() => {
    setUnlocked(true);
  });

  return (
    <AlertDialog open={unlocked} onOpenChange={setUnlocked}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Sparkles className="text-yellow-400" />
            Secret Unlocked!
          </AlertDialogTitle>
          <AlertDialogDescription>
            You found a hidden treasure! Here's some special content just for you.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="relative w-full aspect-video rounded-md overflow-hidden my-4">
          <Image
            src="https://picsum.photos/seed/konami/800/450"
            alt="Secret Jaehyun content"
            width={800}
            height={450}
            data-ai-hint="kpop concert"
            className="object-cover"
          />
        </div>
        <p className="text-sm text-center text-muted-foreground">
          You've unlocked the legendary Jaehyun memory game! (Coming soon...)
        </p>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setUnlocked(false)}>Awesome!</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
