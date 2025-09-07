"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, Lightbulb } from 'lucide-react';
import GlassCard from '../shared/glass-card';
import { Progress } from '@/components/ui/progress';

interface Question {
  image: string;
  imageHint: string;
  options: string[];
  correctAnswer: string;
  fact: string;
}

const questions: Question[] = [
  {
    image: 'https://picsum.photos/seed/era-limitless/500/500',
    imageHint: 'kpop idol blonde hair',
    options: ['Limitless', 'Cherry Bomb', 'Regular', 'Superhuman'],
    correctAnswer: 'Limitless',
    fact: 'Era "Limitless" di tahun 2017 dikenal dengan gaya fashion dan rambut yang sangat eksperimental untuk para member NCT 127.',
  },
  {
    image: 'https://picsum.photos/seed/era-kickit/500/500',
    imageHint: 'kpop idol martial arts',
    options: ['Kick It', 'Punch', 'Sticker', 'Favorite'],
    correctAnswer: 'Kick It',
    fact: 'Konsep "Kick It" sangat terinspirasi dari film-film kung-fu dan legenda Bruce Lee, yang terlihat dari koreografi dan kostumnya.',
  },
  {
    image: 'https://picsum.photos/seed/era-sticker/500/500',
    imageHint: 'kpop idol cowboy',
    options: ['2 Baddies', 'Sticker', 'Ay-Yo', 'Fact Check'],
    correctAnswer: 'Sticker',
    fact: 'Dalam era "Sticker", Jaehyun dan NCT 127 mengusung konsep neo-cowboy yang unik, lengkap dengan topi dan aksesoris khas barat.',
  },
  {
    image: 'https://picsum.photos/seed/era-perfume/500/500',
    imageHint: 'kpop idol romantic',
    options: ['Perfume', 'Kiss', 'Dive', 'Strawberry'],
    correctAnswer: 'Perfume',
    fact: '"Perfume" adalah judul lagu dari debut unit DoJaeJung (Doyoung, Jaehyun, Jungwoo) yang menampilkan sisi lebih dewasa dan romantis.',
  },
];

export default function GuessTheEraGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFact, setShowFact] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Shuffle questions on client mount
    setShuffledQuestions(questions.sort(() => Math.random() - 0.5));
  }, []);

  const question = shuffledQuestions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFact(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      setGameFinished(true);
    }
  };
  
  const resetGame = () => {
    setShuffledQuestions(questions.sort(() => Math.random() - 0.5));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFact(false);
    setGameFinished(false);
  };

  if (shuffledQuestions.length === 0) {
    return <GlassCard className="w-full max-w-lg h-[400px] flex items-center justify-center"><div className="animate-pulse">Loading game...</div></GlassCard>;
  }

  if (gameFinished) {
    return (
      <GlassCard className="w-full max-w-lg p-8 text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Game Selesai!</h2>
        <p className="text-muted-foreground mb-4">Skor akhirmu adalah:</p>
        <p className="text-6xl font-bold text-primary-foreground mb-6">{score} <span className="text-2xl text-muted-foreground">/ {questions.length}</span></p>
        <Button onClick={resetGame}>
          <RotateCcw className="mr-2" /> Main Lagi
        </Button>
      </GlassCard>
    );
  }

  const getButtonClass = (option: string) => {
    if (!selectedAnswer) return "bg-secondary hover:bg-secondary/80";
    if (option === question.correctAnswer) return "bg-green-500/80 hover:bg-green-500/90";
    if (option === selectedAnswer) return "bg-destructive/80 hover:bg-destructive/90";
    return "bg-secondary/50 text-muted-foreground cursor-not-allowed";
  };


  return (
    <div className="w-full max-w-lg mx-auto">
      <GlassCard className="p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</p>
            <p className="text-sm font-bold text-primary">Skor: {score}</p>
        </div>
        <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
      </GlassCard>
      
      <GlassCard className="p-4 sm:p-6">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6 mx-auto max-w-sm">
          <Image
            src={question.image}
            alt="Jaehyun Era Photo"
            width={500}
            height={500}
            data-ai-hint={question.imageHint}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {question.options.map(option => (
            <Button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`h-14 text-sm transition-all duration-300 transform ${getButtonClass(option)} ${selectedAnswer && 'text-primary-foreground'}`}
              disabled={!!selectedAnswer}
            >
              {option}
              {selectedAnswer && option === question.correctAnswer && <CheckCircle className="ml-2" />}
              {selectedAnswer && option !== question.correctAnswer && option === selectedAnswer && <XCircle className="ml-2" />}
            </Button>
          ))}
        </div>

        {selectedAnswer && (
          <div className="mt-6 text-center animate-in fade-in-50">
            {isCorrect ? (
              <p className="text-green-400 font-semibold">Jawabanmu Benar!</p>
            ) : (
              <p className="text-red-400 font-semibold">
                Salah! Jawaban yang benar adalah <span className="font-bold">{question.correctAnswer}</span>.
              </p>
            )}
             <Button variant="link" size="sm" className="mt-2 text-accent" onClick={() => setShowFact(!showFact)}>
                <Lightbulb className="mr-2"/> {showFact ? 'Sembunyikan' : 'Tampilkan'} Fakta Menarik
            </Button>
            {showFact && (
                <p className="text-xs text-muted-foreground mt-2 p-2 bg-secondary/30 rounded-md">
                    {question.fact}
                </p>
            )}
            <Button onClick={handleNext} className="mt-4 w-full">
              Selanjutnya
            </Button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
