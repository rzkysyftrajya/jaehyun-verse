"use client";

import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
import GlassCard from "./shared/glass-card";

export default function SendLove() {
  const handleSendLove = () => {
    // We get the body to append hearts to fill the screen
    const loveContainer = document.body;
    if (!loveContainer) return;

    for (let i = 0; i < 50; i++) { // Increased heart count
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.className = 'fixed text-2xl animate-love z-50 pointer-events-none';
      heart.style.left = `${Math.random() * 100}vw`; // Use vw for full width
      heart.style.bottom = `-30px`; // Start from below the screen
      heart.style.animationDuration = `${Math.random() * 3 + 4}s`; // 4-7 seconds duration
      heart.style.animationDelay = `${Math.random() * 1}s`;
      heart.style.opacity = `${Math.random() * 0.5 + 0.5}`;
      heart.style.transform = `scale(${Math.random() * 0.5 + 0.8})`;

      loveContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 7000); // Remove after animation ends
    }
  };

  return (
    <GlassCard className="w-full flex flex-col items-center justify-center text-center p-8 min-h-[20rem] relative overflow-hidden">
      <style jsx global>{`
        @keyframes love-animation {
          from {
            transform: translateY(0) scale(var(--start-scale, 1));
            opacity: var(--start-opacity, 1);
          }
          to {
            transform: translateY(-100vh) scale(var(--end-scale, 0.5));
            opacity: 0;
          }
        }
        .animate-love {
          animation: love-animation linear forwards;
        }
      `}</style>
      <h3 className="font-bold text-lg mb-2">Send Love to Jaehyun</h3>
      <p className="text-muted-foreground mb-4">Click the button to send a cascade of hearts!</p>
      <Button onClick={handleSendLove} size="lg" className="bg-primary hover:bg-primary/90">
        <Send className="mr-2" />
        Send Love
      </Button>
    </GlassCard>
  );
}
