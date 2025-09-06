
import { Badge } from '@/components/ui/badge';
import GlassCard from '@/components/jaehyunverse/shared/glass-card';
import SectionWrapper from '@/components/jaehyunverse/shared/section-wrapper';
import { BrainCircuit, Puzzle, History, Search, HeartHandshake, Brain, Users, Lamp, Disc } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface Game {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  isAvailable: boolean;
}

const games: Game[] = [
  { id: 'memory-match', icon: BrainCircuit, title: "Jaehyun Memory Match", description: "Flip cards and find matching photos of Jaehyun from different eras.", isAvailable: true },
  { id: 'puzzle-slider', icon: Puzzle, title: "Jaehyun Puzzle Slider", description: "Solve sliding puzzles of iconic Jaehyun photos with a timer challenge.", isAvailable: true },
  { id: 'guess-the-era', icon: History, title: "Guess the Jaehyun Era", description: "Test your knowledge by guessing the era or concept of a given photo.", isAvailable: true },
  { id: 'word-search', icon: Search, title: "Jaehyun Word Search", description: "Find hidden words related to Jaehyun, NCT, and his songs.", isAvailable: true },
  { id: 'catch-the-hearts', icon: HeartHandshake, title: "Catch the Hearts", description: "A dynamic game where you catch falling hearts with your cursor.", isAvailable: true },
  { id: 'quiz-master', icon: Brain, title: "Jaehyun Quiz Master", description: "Answer trivia questions about Jaehyun's life, career, and fun facts.", isAvailable: true },
  { id: 'virtual-date', icon: Users, title: "Virtual Date with Jaehyun", description: "A 'choose your own adventure' game with multiple endings.", isAvailable: true },
  { id: 'rhythm-game', icon: Disc, title: "Jaehyun's Discography", description: "Explore Jaehyun's solo songs, collaborations, and special releases.", isAvailable: true },
];

const GameCard = ({ game }: { game: Game }) => {
  const cardContent = (
    <GlassCard className="flex flex-col text-center items-center p-6 h-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-primary/30">
        <div className="relative mb-4">
            <game.icon className="w-16 h-16 text-primary" style={{filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))'}}/>
            {!game.isAvailable && (
                <Badge className="absolute -top-1 -right-4 bg-accent text-accent-foreground text-xs pointer-events-none">
                    Segera Hadir
                </Badge>
            )}
        </div>
        <h3 className="font-bold text-lg mb-2 text-primary-foreground">{game.title}</h3>
        <p className="text-sm text-muted-foreground flex-grow">{game.description}</p>
    </GlassCard>
  );

  if (game.isAvailable) {
    return <Link href={`/games/${game.id}`} className="block h-full">{cardContent}</Link>;
  }
  
  return <div className="h-full cursor-not-allowed">{cardContent}</div>;
};

export default function GamesPage() {
  return (
    <div className="w-full min-h-screen pt-16 md:pt-0">
      <SectionWrapper title="Game Center" description="Mainkan game-game seru bertema Jaehyun!">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
            {games.map(game => (
                <GameCard key={game.title} game={game} />
            ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
