"use client";

import { useEffect, useState } from 'react';

const Heart = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute text-2xl" style={style}>
    💖
  </div>
);

export default function BouncingHearts() {
  const [hearts, setHearts] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = Array.from({ length: 15 }).map((_, i) => {
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const delay = Math.random() * 10;
        const size = Math.random() * 24 + 12;

        return {
          id: i,
          style: {
            left: `${Math.random() * 100}vw`,
            bottom: `-${size}px`,
            fontSize: `${size}px`,
            animation: `float-up ${duration}s ease-in ${delay}s infinite`,
            opacity: Math.random() * 0.7 + 0.3,
          } as React.CSSProperties,
        };
      });
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      {hearts.map(heart => <Heart key={heart.id} style={heart.style} />)}
    </div>
  );
}
