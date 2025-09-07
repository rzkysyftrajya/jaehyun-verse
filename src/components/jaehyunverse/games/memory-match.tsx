"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Award, RotateCcw, BarChart2 } from "lucide-react";
import GlassCard from "../shared/glass-card";

// Unique images for the cards
const cardImages = [
  { src: "/match1.png", id: 1, hint: "kpop idol smile" },
  {
    src: "/match2.png",
    id: 2,
    hint: "kpop idol stage",
  },
  {
    src: "/match3.png",
    id: 3,
    hint: "kpop idol casual",
  },
  {
    src: "/match4.png",
    id: 4,
    hint: "kpop idol suit",
  },
  {
    src: "/match5.png",
    id: 5,
    hint: "kpop idol funny",
  },
  {
    src: "/jaehyun.png",
    id: 6,
    hint: "kpop idol glasses",
  },
  {
    src: "/daily2.png",
    id: 7,
    hint: "kpop idol cute",
  },
  {
    src: "/daily5.png",
    id: 8,
    hint: "kpop idol serious",
  },
];

interface CardType {
  id: number;
  src: string;
  hint: string;
  uniqueId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

// Function to shuffle the cards
const shuffleArray = (array: any[]) => {
  // Use Math.random only on the client
  if (typeof window !== "undefined") {
    return array.sort(() => Math.random() - 0.5);
  }
  return array;
};

const GameCard = ({
  card,
  handleCardClick,
}: {
  card: CardType;
  handleCardClick: (card: CardType) => void;
}) => {
  return (
    <div
      className="perspective-1000"
      onClick={() =>
        !card.isFlipped && !card.isMatched && handleCardClick(card)
      }
    >
      <div
        className={`relative w-full h-full preserve-3d transition-transform duration-500 ${
          card.isFlipped || card.isMatched ? "rotate-y-180" : ""
        }`}
      >
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-primary/20 rounded-lg border-2 border-primary/50 cursor-pointer hover:bg-primary/40">
          <span
            className="text-4xl"
            style={{ textShadow: "0 0 10px hsl(var(--primary))" }}
          >
            🍑
          </span>
        </div>
        {/* Card Front */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-lg overflow-hidden border-2 border-accent">
          <Image
            src={card.src}
            alt="Jaehyun"
            width={200}
            height={200}
            data-ai-hint={card.hint}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default function MemoryMatchGame() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  const createNewGame = () => {
    const gameCards = [...cardImages, ...cardImages].map((card, index) => ({
      ...card,
      uniqueId: index,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffleArray(gameCards));
    setMoves(0);
    setFlippedCards([]);
    setIsGameWon(false);
  };

  useEffect(() => {
    createNewGame();
  }, []);

  const handleCardClick = (clickedCard: CardType) => {
    if (flippedCards.length === 2) return;

    const newCards = cards.map((card) =>
      card.uniqueId === clickedCard.uniqueId
        ? { ...card, isFlipped: true }
        : card
    );
    setCards(newCards);
    setFlippedCards([...flippedCards, clickedCard]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((moves) => moves + 1);
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.id === secondCard.id) {
        // Match
        const newCards = cards.map((card) =>
          card.id === firstCard.id
            ? { ...card, isMatched: true, isFlipped: true }
            : card
        );
        setCards(newCards);
        setFlippedCards([]);

        // Check for win
        if (newCards.every((card) => card.isMatched)) {
          setIsGameWon(true);
        }
      } else {
        // No match
        setTimeout(() => {
          const newCards = cards.map((card) =>
            card.uniqueId === firstCard.uniqueId ||
            card.uniqueId === secondCard.uniqueId
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(newCards);
          setFlippedCards([]);
        }, 1200);
      }
    }
  }, [flippedCards, cards]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>

      <GlassCard className="mb-6 p-4 flex justify-around items-center text-center">
        <div>
          <p className="text-sm text-muted-foreground">Moves</p>
          <p className="text-2xl font-bold flex items-center gap-2">
            <BarChart2 className="text-accent" /> {moves}
          </p>
        </div>
        <Button onClick={createNewGame}>
          <RotateCcw className="mr-2" /> Reset
        </Button>
      </GlassCard>

      {isGameWon ? (
        <GlassCard className="p-8 text-center flex flex-col items-center">
          <Award className="w-16 h-16 text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">You Won!</h2>
          <p className="text-muted-foreground mb-4">
            You matched all the cards in {moves} moves.
          </p>
          <Button onClick={createNewGame}>Play Again</Button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <div key={card.uniqueId} className="aspect-square">
              <GameCard card={card} handleCardClick={handleCardClick} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
