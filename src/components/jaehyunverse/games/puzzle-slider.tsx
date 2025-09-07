"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Award, RotateCcw, BarChart2 } from 'lucide-react';
import GlassCard from '../shared/glass-card';

const GRID_SIZE = 3;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const EMPTY_INDEX = TILE_COUNT - 1;
const IMAGE_URL = 'https://picsum.photos/seed/jaehyun-puzzle/600/600';
const IMAGE_HINT = 'kpop idol portrait';

const isSolvable = (tiles: number[]) => {
  let inversions = 0;
  for (let i = 0; i < TILE_COUNT -1; i++) {
    for (let j = i + 1; j < TILE_COUNT; j++) {
      if (tiles[i] !== EMPTY_INDEX && tiles[j] !== EMPTY_INDEX && tiles[i] > tiles[j]) {
        inversions++;
      }
    }
  }
  return inversions % 2 === 0;
};

const shuffle = (tiles: number[]) => {
  let shuffledTiles;
  do {
    shuffledTiles = [...tiles].sort(() => Math.random() - 0.5);
  } while (!isSolvable(shuffledTiles));
  return shuffledTiles;
};

const getInitialTiles = () => Array.from({ length: TILE_COUNT }, (_, i) => i);

export default function PuzzleSliderGame() {
  const [tiles, setTiles] = useState(getInitialTiles);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    createNewGame();
  }, []);

  const createNewGame = useCallback(() => {
    const initialTiles = getInitialTiles();
    setTiles(shuffle(initialTiles));
    setMoves(0);
    setIsGameWon(false);
  }, []);

  const getTilePosition = (index: number) => {
    return {
      row: Math.floor(index / GRID_SIZE),
      col: index % GRID_SIZE,
    };
  };

  const getTileStyle = (tileValue: number) => {
    const TILE_SIZE_PERCENT = 100 / (GRID_SIZE - 1);
    const { row, col } = getTilePosition(tileValue);
     return {
        backgroundPosition: `${col * TILE_SIZE_PERCENT}% ${row * TILE_SIZE_PERCENT}%`,
        backgroundSize: `${GRID_SIZE * 100}%`,
     }
  }

  const handleTileClick = (clickedIndex: number) => {
    if (isGameWon) return;

    const emptyIndex = tiles.indexOf(EMPTY_INDEX);
    const { row: tileRow, col: tileCol } = getTilePosition(clickedIndex);
    const { row: emptyRow, col: emptyCol } = getTilePosition(emptyIndex);

    const isAdjacent = Math.abs(tileRow - emptyRow) + Math.abs(tileCol - emptyCol) === 1;

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[clickedIndex], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[clickedIndex]];
      setTiles(newTiles);
      setMoves(moves => moves + 1);

      const isWon = newTiles.every((t, i) => t === i);
      if (isWon) {
        setIsGameWon(true);
      }
    }
  };
  
  if (!isClient) {
     return <GlassCard className="w-full max-w-lg h-[400px] flex items-center justify-center"><div className="animate-pulse">Loading puzzle...</div></GlassCard>;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <GlassCard className="mb-6 p-4 flex justify-around items-center text-center">
        <div>
          <p className="text-sm text-muted-foreground">Moves</p>
          <p className="text-2xl font-bold flex items-center gap-2"><BarChart2 className="text-accent"/> {moves}</p>
        </div>
        <Button onClick={createNewGame}>
          <RotateCcw className="mr-2" /> Reset
        </Button>
      </GlassCard>
      
      <div className="relative w-full aspect-square">
        <GlassCard className="!p-1 grid grid-cols-3 gap-1 bg-secondary/30 w-full h-full rounded-2xl">
          {tiles.map((tileValue, index) => {
            const isVisible = tileValue !== EMPTY_INDEX;
            
            return (
              <button
                key={index}
                onClick={() => handleTileClick(index)}
                className="relative bg-cover rounded-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary z-10"
                style={{
                  backgroundImage: isVisible ? `url(${IMAGE_URL})` : 'none',
                  ...getTileStyle(tileValue),
                  opacity: isVisible || isGameWon ? 1 : 0,
                  cursor: isVisible ? 'pointer' : 'default',
                }}
              />
            );
          })}
        </GlassCard>
        
        {isGameWon && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center z-20 text-center p-4 rounded-2xl">
             <div className="relative w-full aspect-square mb-4 max-w-[300px]">
                <Image src={IMAGE_URL} alt="Solved Puzzle" width={400} height={400} data-ai-hint={IMAGE_HINT} className="rounded-lg object-cover shadow-2xl shadow-primary/20" />
             </div>
             <Award className="w-16 h-16 text-yellow-400 -mt-8 mb-2" style={{filter: 'drop-shadow(0 0 10px #facc15)'}}/>
             <h2 className="text-3xl font-bold text-primary mb-2">You solved it!</h2>
             <p className="text-lg text-muted-foreground mb-6">
              You completed the puzzle in <span className="font-bold text-primary">{moves}</span> moves!
            </p>
            <Button onClick={createNewGame} size="lg">
              <RotateCcw className="mr-2" /> Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
