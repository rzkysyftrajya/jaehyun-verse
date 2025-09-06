"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Award, Clock, Heart, Play, RotateCcw } from 'lucide-react';
import GlassCard from '../shared/glass-card';

const GAME_DURATION = 30; // seconds

interface Heart {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
}

const createHeart = (id: number, gameAreaWidth: number): Heart => ({
  id,
  x: Math.random() * (gameAreaWidth - 40),
  y: -50,
  speed: Math.random() * 2 + 1,
  size: Math.random() * 20 + 20,
});

export default function CatchTheHeartsGame() {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const nextHeartId = useRef(0);
  const animationFrameId = useRef<number>();

  const resetGame = useCallback(() => {
    setGameState('ready');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setHearts([]);
    nextHeartId.current = 0;
  }, []);
  
  const startGame = () => {
    resetGame();
    setGameState('playing');
  };

  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;

    setHearts(prevHearts => {
      const gameAreaHeight = gameAreaRef.current?.clientHeight || 600;
      const gameAreaWidth = gameAreaRef.current?.clientWidth || 500;
      
      // Move existing hearts
      const updatedHearts = prevHearts
        .map(heart => ({ ...heart, y: heart.y + heart.speed }))
        .filter(heart => heart.y < gameAreaHeight);
      
      // Add a new heart periodically
      if (Math.random() < 0.05) { // Adjust for more/less hearts
        const newHeart = createHeart(nextHeartId.current++, gameAreaWidth);
        updatedHearts.push(newHeart);
      }
      
      return updatedHearts;
    });

    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [gameState]);


  useEffect(() => {
    if (gameState === 'playing') {
      animationFrameId.current = requestAnimationFrame(gameLoop);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
          if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
          clearInterval(timer)
      };
    }
  }, [gameState, gameLoop]);
  
  const catchHeart = (id: number) => {
    setHearts(prev => prev.filter(heart => heart.id !== id));
    setScore(prev => prev + 1);

    // Cute pop effect
    const pop = document.createElement('span');
    pop.innerHTML = '✨';
    pop.className = 'absolute text-2xl animate-ping';
    const caughtHeart = hearts.find(h => h.id === id);
    if (caughtHeart && gameAreaRef.current) {
        pop.style.left = `${caughtHeart.x}px`;
        pop.style.top = `${caughtHeart.y}px`;
        gameAreaRef.current.appendChild(pop);
        setTimeout(() => pop.remove(), 500);
    }
  };


  return (
    <div className="w-full max-w-lg mx-auto">
      <GlassCard className="mb-4 p-4 flex justify-around items-center text-center">
        <div>
          <p className="text-sm text-muted-foreground flex items-center gap-1"><Clock /> Time</p>
          <p className="text-2xl font-bold">{timeLeft}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground flex items-center gap-1"><Heart /> Score</p>
          <p className="text-2xl font-bold text-primary">{score}</p>
        </div>
      </GlassCard>

      <GlassCard 
        ref={gameAreaRef} 
        className="relative w-full h-[500px] overflow-hidden bg-secondary/30"
      >
        {gameState === 'playing' && hearts.map(heart => (
          <div
            key={heart.id}
            className="absolute cursor-pointer animate-float-fast"
            style={{
              left: heart.x,
              top: heart.y,
              width: heart.size,
              height: heart.size,
            }}
            onClick={() => catchHeart(heart.id)}
            onMouseEnter={() => catchHeart(heart.id)}
          >
            <Heart className="text-accent fill-accent" style={{ width: heart.size, height: heart.size, filter: 'drop-shadow(0 0 5px hsl(var(--accent) / 0.7))'}}/>
          </div>
        ))}
        
        {gameState === 'ready' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <h3 className="text-2xl font-bold mb-4 text-primary-foreground">Ready to play?</h3>
            <Button onClick={startGame} size="lg">
              <Play className="mr-2" /> Start Game
            </Button>
          </div>
        )}
        
        {gameState === 'finished' && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center z-10 text-center p-4">
            <Award className="w-16 h-16 text-yellow-400 mb-4" />
            <h2 className="text-3xl font-bold text-primary mb-2">Game Over!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              You caught <span className="font-bold text-primary">{score}</span> hearts!
            </p>
            <Button onClick={resetGame} size="lg">
              <RotateCcw className="mr-2" /> Play Again
            </Button>
          </div>
        )}
      </GlassCard>

       <style jsx global>{`
        @keyframes float-fast {
            0% { transform: translatey(0px) rotate(-5deg); }
            50% { transform: translatey(-5px) rotate(5deg); }
            100% { transform: translatey(0px) rotate(-5deg); }
        }
        .animate-float-fast {
          animation: float-fast 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
