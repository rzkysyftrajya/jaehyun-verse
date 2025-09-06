
"use client";

import { useState, useRef, useEffect } from 'react';
import GlassCard from '@/components/jaehyunverse/shared/glass-card';
import { Button } from '@/components/ui/button';
import { Heart, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const leaderboardData = [
  { name: 'Uti', score: 19970214 },
  { name: 'Uti', score: 18765432 },
  { name: 'Uti', score: 15432109 },
  { name: 'Uti', score: 12345678 },
  { name: 'You', score: 0 },
].sort((a, b) => b.score - a.score);


export default function FanHeartCollector() {
  const [myHearts, setMyHearts] = useState(0);
  const [leaderboard, setLeaderboard] = useState(leaderboardData);
  const [isAnimating, setIsAnimating] = useState(false);
  const heartButtonRef = useRef<HTMLButtonElement>(null);
  const scoreRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHeartClick = () => {
    // Create flying heart particles
    if (heartButtonRef.current && scoreRef.current && containerRef.current) {
        const buttonRect = heartButtonRef.current.getBoundingClientRect();
        const scoreRect = scoreRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = '💖';
            particle.className = 'heart-particle';
            
            const startX = buttonRect.left + buttonRect.width / 2 - containerRect.left;
            const startY = buttonRect.top + buttonRect.height / 2 - containerRect.top;
            
            const endX = scoreRect.left + scoreRect.width / 2 - containerRect.left;
            const endY = scoreRect.top + scoreRect.height / 2 - containerRect.top;

            particle.style.setProperty('--start-x', `${startX}px`);
            particle.style.setProperty('--start-y', `${startY}px`);
            particle.style.setProperty('--end-x', `${endX + (Math.random() - 0.5) * 20}px`);
            particle.style.setProperty('--end-y', `${endY + (Math.random() - 0.5) * 20}px`);
            particle.style.setProperty('--random-x', `${(Math.random() - 0.5) * 100}px`);
            particle.style.setProperty('--random-y', `${(Math.random() - 0.5) * 100}px`);
            particle.style.animationDelay = `${Math.random() * 0.2}s`;
            
            containerRef.current.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }
    
    setTimeout(() => {
      const newHearts = myHearts + 1;
      setMyHearts(newHearts);
      setLeaderboard(
        [...leaderboard.filter(u => u.name !== 'You'), { name: 'You', score: newHearts }]
          .sort((a, b) => b.score - a.score)
      );
       setIsAnimating(true);
    }, 500); // Delay score update to match particle animation
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <>
    <style jsx global>{`
      @keyframes fly-to-score {
        0% {
          transform: translate(var(--start-x), var(--start-y)) scale(1);
          opacity: 1;
        }
        50% {
          transform: translate(calc(var(--start-x) + var(--random-x)), calc(var(--start-y) + var(--random-y))) scale(1.5);
          opacity: 0.7;
        }
        100% {
          transform: translate(var(--end-x), var(--end-y)) scale(0);
          opacity: 0;
        }
      }
      .heart-particle {
        position: absolute;
        pointer-events: none;
        animation: fly-to-score 1s ease-out forwards;
        z-index: 10;
        font-size: 1.5rem;
      }
      @keyframes score-pop {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }
      .score-pop-animation {
        animation: score-pop 0.2s ease-in-out;
      }
    `}</style>
    <GlassCard ref={containerRef} className="w-full flex flex-col h-full relative overflow-hidden">
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg flex items-center gap-2"><Trophy className="text-yellow-400" /> Leaderboard</h3>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Your Hearts</p>
            <p 
              ref={scoreRef} 
              className={cn("font-bold text-xl text-primary transition-transform", isAnimating && "score-pop-animation")}
            >
              {myHearts.toLocaleString()}
            </p>
          </div>
        </div>
        <ul className="space-y-2 mb-6">
          {leaderboard.map((user, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 rounded-md ${user.name === 'You' ? 'bg-primary/20' : 'bg-secondary/50'}`}
            >
              <span className="flex items-center gap-2">
                <span className="font-mono text-sm w-6">{index + 1}.</span>
                <span className="font-semibold">{user.name}</span>
              </span>
              <span className="font-mono text-sm">{user.score.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button 
        ref={heartButtonRef}
        onClick={handleHeartClick} 
        className="w-full bg-accent hover:bg-accent/80 text-accent-foreground mt-auto transition-transform active:scale-95"
      >
        <Heart className="mr-2 fill-current" /> Collect a Heart
      </Button>
    </GlassCard>
    </>
  );
}

