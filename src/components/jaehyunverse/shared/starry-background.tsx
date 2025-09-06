"use client";

import { useEffect, useState } from 'react';

const Star = ({ id, style }: { id: number; style: React.CSSProperties }) => (
  <div
    key={id}
    className="absolute h-0.5 w-0.5 rounded-full bg-accent animate-star-fall"
    style={style}
  />
);

export default function StarryBackground() {
  const [stars, setStars] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 50 }).map((_, i) => {
        const duration = Math.random() * 10 + 10; // 10s to 20s
        const delay = Math.random() * 20; // 0s to 20s delay
        const xStart = Math.random() * 150 - 25; // -25vw to 125vw
        const xEnd = xStart + (Math.random() * 40 - 20); // drift left or right
        const scale = Math.random() * 1.5 + 0.5;

        return {
          id: i,
          style: {
            '--star-x-start': `${xStart}vw`,
            '--star-x-end': `${xEnd}vw`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            transform: `scale(${scale})`,
            opacity: Math.random() * 0.5 + 0.5,
          } as React.CSSProperties,
        };
      });
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      {stars.map(star => <Star key={star.id} {...star} />)}
    </div>
  );
}
