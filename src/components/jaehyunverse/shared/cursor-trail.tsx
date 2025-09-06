"use client";

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

const trailLength = 15;

export default function CursorTrail() {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPoints(prevPoints => [...prevPoints, { x: e.clientX, y: e.clientY }].slice(-trailLength));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {points.map((point, index) => (
        <Heart
          key={index}
          className="fixed pointer-events-none text-accent z-50"
          style={{
            left: point.x - 10,
            top: point.y - 10,
            opacity: (index / trailLength),
            transform: `scale(${(index / trailLength)})`,
            transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
            fill: 'hsl(var(--accent))'
          }}
          size={20}
        />
      ))}
    </>
  );
}
