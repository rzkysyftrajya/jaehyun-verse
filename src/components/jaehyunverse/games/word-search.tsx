"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Lightbulb, RotateCcw } from 'lucide-react';
import GlassCard from '../shared/glass-card';
import { cn } from '@/lib/utils';

// Game settings
const GRID_SIZE = 12;
const WORDS_TO_FIND = [
    'JAEHYUN', 'NCT', 'PEACH', 'VALENTINE',
    'REGULAR', 'KICKIT', 'BOSS', 'PERFUME',
    'DOJAEJUNG', 'FOREVERONLY', 'POETICBEAUTY'
];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

type Grid = string[][];
type Position = { row: number; col: number };
type WordLocation = { word: string; positions: Position[] };

// Utility to generate a random grid
const generateGrid = (): { grid: Grid; locations: WordLocation[] } => {    
    const newGrid: Grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    const wordLocations: WordLocation[] = [];

    const placeWord = (word: string): boolean => {
        const directions = [
            { dr: 0, dc: 1 },  // Horizontal
            { dr: 1, dc: 0 },  // Vertical
            { dr: 1, dc: 1 },  // Diagonal down-right
            // { dr: 1, dc: -1 }, // Diagonal down-left
        ];
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);

        let canPlace = true;
        const positions: Position[] = [];
        for (let i = 0; i < word.length; i++) {
            const newRow = row + i * direction.dr;
            const newCol = col + i * direction.dc;

            if (newRow >= GRID_SIZE || newCol >= GRID_SIZE || newCol < 0 || (newGrid[newRow][newCol] !== '' && newGrid[newRow][newCol] !== word[i])) {
                canPlace = false;
                break;
            }
            positions.push({ row: newRow, col: newCol });
        }

        if (canPlace) {
            positions.forEach((pos, i) => {
                newGrid[pos.row][pos.col] = word[i];
            });
            wordLocations.push({ word, positions });
            return true;
        }
        return false;
    }
    
    // Use a copy and sort to not mutate the original and add randomness
    const wordsToPlace = [...WORDS_TO_FIND].sort(() => Math.random() - 0.5);

    wordsToPlace.forEach(word => {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 100) {
            placed = placeWord(word);
            attempts++;
        }
    });

    // Fill the rest of the grid with random letters
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (newGrid[r][c] === '') {
                newGrid[r][c] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
            }
        }
    }

    return { grid: newGrid, locations: wordLocations };
};


export default function WordSearchGame() {
  const [grid, setGrid] = useState<Grid>([]);
  const [wordLocations, setWordLocations] = useState<WordLocation[]>([]);
  const [selection, setSelection] = useState<Position[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  const resetGame = useCallback(() => {
    const { grid: newGrid, locations } = generateGrid();
    setGrid(newGrid);
    setWordLocations(locations);
    setSelection([]);
    setFoundWords([]);
  }, []);

  useEffect(() => {
    setIsClient(true);
    resetGame();
  }, [resetGame]);

  const handleCellClick = (pos: Position) => {
    setSelection(prev => {
        const isSelected = prev.some(p => p.row === pos.row && p.col === pos.col);
        if(isSelected) {
            return prev.filter(p => p.row !== pos.row || p.col !== pos.col);
        }
        return [...prev, pos];
    });
  };

  useEffect(() => {
    if (selection.length > 1) {
        const selectedWord = selection.map(p => grid[p.row][p.col]).join('');
        const reversedSelectedWord = [...selectedWord].reverse().join('');
        
        const checkWord = (wordToCheck: string) => {
            const foundLocation = wordLocations.find(loc => loc.word === wordToCheck);
            if (foundLocation) {
                // simple check for now
                if (selection.length === foundLocation.positions.length) {
                   setFoundWords(fw => [...fw, foundLocation.word]);
                   setSelection([]);
                }
            }
        }
        checkWord(selectedWord);
        checkWord(reversedSelectedWord);
    }
  }, [selection, grid, wordLocations]);

  const isCellFound = (pos: Position): boolean => {
      return foundWords.some(word => {
          const location = wordLocations.find(l => l.word === word);
          return location?.positions.some(p => p.row === pos.row && p.col === pos.col);
      })
  }

  const isCellSelected = (pos: Position): boolean => {
      return selection.some(p => p.row === pos.row && p.col === pos.col);
  }

  if (!isClient) {
     return <GlassCard className="w-full max-w-xl h-[400px] flex items-center justify-center"><div className="animate-pulse">Loading game...</div></GlassCard>;
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="flex-grow">
        <GlassCard className="p-2 sm:p-4">
            <div 
                className="grid gap-1 aspect-square"
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
            >
            {grid.map((row, r) =>
              row.map((letter, c) => {
                const pos = { row: r, col: c };
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(pos)}
                    className={cn(
                      "flex items-center justify-center aspect-square rounded-md text-sm sm:text-base font-bold transition-all duration-200",
                      isCellFound(pos) ? 'bg-primary text-primary-foreground scale-105' : 
                      isCellSelected(pos) ? 'bg-accent text-accent-foreground scale-110' :
                      'bg-secondary/30 hover:bg-secondary/70'
                    )}
                  >
                    {letter}
                  </button>
                );
              })
            )}
          </div>
        </GlassCard>
      </div>

      <div className="w-full md:w-56 flex-shrink-0">
        <GlassCard className="p-4">
            <h3 className="font-bold text-lg mb-4 text-primary-foreground">Cari Kata:</h3>
            <ul className="space-y-2">
                {WORDS_TO_FIND.map(word => (
                    <li 
                        key={word}
                        className={cn(
                            "transition-all duration-300 text-muted-foreground",
                            foundWords.includes(word) && 'line-through text-primary font-semibold'
                        )}
                    >
                       <Check size={16} className={cn("inline-block mr-2 transition-opacity", foundWords.includes(word) ? 'opacity-100' : 'opacity-0')} />
                        {word}
                    </li>
                ))}
            </ul>
             <Button onClick={() => setSelection([])} variant="ghost" size="sm" className="w-full mt-4" disabled={selection.length === 0}>Clear Selection</Button>
            <Button onClick={resetGame} className="w-full mt-2">
                <RotateCcw className="mr-2"/>
                Reset Game
            </Button>
        </GlassCard>
         {foundWords.length === WORDS_TO_FIND.length && (
              <GlassCard className="mt-4 p-4 text-center">
                  <h3 className="font-bold text-yellow-400">Selamat!</h3>
                  <p className="text-sm text-muted-foreground">Kamu menemukan semua kata!</p>
              </GlassCard>
          )}
      </div>
    </div>
  );
}
