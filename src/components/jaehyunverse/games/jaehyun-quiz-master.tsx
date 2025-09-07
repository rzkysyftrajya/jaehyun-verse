"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw, Award } from "lucide-react";
import GlassCard from "../shared/glass-card";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  feedback: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question:
      "Saat fansign, seorang fans berkata ingin menaruh Jaehyun di sakunya. Apa jawaban ikonik Jaehyun?",
    options: [
      '"Sakumu akan robek"',
      '"Aku terlalu berat"',
      '"Boleh, aku muat kok"',
      '"Jangan, di dalam panas"',
    ],
    correctAnswer: '"Sakumu akan robek"',
    feedback:
      "Benar! Jaehyun dengan polosnya khawatir kantong fansnya akan robek. Gemas sekali!",
  },
  {
    question:
      'Jaehyun punya julukan "Valentine Boy". Kapan hari ulang tahunnya?',
    options: ["14 Februari", "14 Maret", "14 Januari", "14 April"],
    correctAnswer: "14 Februari",
    feedback:
      "Tepat sekali! Dia lahir di hari kasih sayang, tak heran kalau dia jago bikin hati meleleh.",
  },
  {
    question:
      "Apa nama panggilan Jaehyun yang diberikan oleh Johnny karena kulitnya yang putih dan lembut?",
    options: ["Yuno", "Jeffrey", "Casper", "Woojae"],
    correctAnswer: "Casper",
    feedback:
      "Betul! Seperti hantu baik hati yang ramah, Johnny memanggilnya Casper karena kulit pucatnya.",
  },
  {
    question: "Makanan apa yang TIDAK disukai Jaehyun?",
    options: ["Semangka tanpa biji", "Kismis", "Pizza nanas", "Daging"],
    correctAnswer: "Kismis",
    feedback:
      "Kamu benar! Jaehyun pernah bilang dia kurang suka dengan tekstur kismis.",
  },
  {
    question:
      "Jika Jaehyun bisa menjadi karakter Disney, dia ingin menjadi siapa?",
    options: [
      "Flynn Rider",
      "Prince Eric",
      "Beast (Beauty and the Beast)",
      "Peter Pan",
    ],
    correctAnswer: "Beast (Beauty and the Beast)",
    feedback:
      "Yup! Dia ingin menjadi Beast karena di akhir cerita dia berubah menjadi pangeran tampan. Padahal dia sudah pangeran dari awal!",
  },
];

export default function JaehyunQuizMaster() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>(
    []
  );

  useEffect(() => {
    // Shuffle questions on client mount
    setShuffledQuestions([...quizQuestions].sort(() => Math.random() - 0.5));
  }, []);

  const question = shuffledQuestions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      setGameFinished(true);
    }
  };

  const resetGame = () => {
    setShuffledQuestions([...quizQuestions].sort(() => Math.random() - 0.5));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setGameFinished(false);
  };

  if (shuffledQuestions.length === 0) {
    return (
      <GlassCard className="w-full max-w-lg h-[400px] flex items-center justify-center">
        <div className="animate-pulse">Memuat kuis seru...</div>
      </GlassCard>
    );
  }

  if (gameFinished) {
    return (
      <GlassCard className="w-full max-w-lg p-8 text-center flex flex-col items-center">
        <Award
          className="w-16 h-16 text-yellow-400 mb-4"
          style={{ filter: "drop-shadow(0 0 10px #facc15)" }}
        />
        <h2 className="text-2xl font-bold text-primary mb-2">
          Permainan Selesai!
        </h2>
        <p className="text-muted-foreground mb-4">Skor akhirmu adalah:</p>
        <p className="text-6xl font-bold text-primary-foreground mb-6">
          {score}{" "}
          <span className="text-2xl text-muted-foreground">
            / {quizQuestions.length}
          </span>
        </p>
        <Button onClick={resetGame} size="lg">
          <RotateCcw className="mr-2" /> Coba Lagi
        </Button>
      </GlassCard>
    );
  }

  const getButtonClass = (option: string) => {
    if (!selectedAnswer) return "bg-secondary hover:bg-secondary/80";
    if (option === question.correctAnswer)
      return "bg-green-500/80 hover:bg-green-500/90";
    if (option === selectedAnswer)
      return "bg-destructive/80 hover:bg-destructive/90";
    return "bg-secondary/50 text-muted-foreground cursor-not-allowed";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <GlassCard className="p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-muted-foreground">
            Pertanyaan {currentQuestionIndex + 1} dari {quizQuestions.length}
          </p>
          <p className="text-sm font-bold text-primary">Skor: {score}</p>
        </div>
        <Progress
          value={((currentQuestionIndex + 1) / quizQuestions.length) * 100}
          className="h-2"
        />
      </GlassCard>

      <GlassCard className="p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-center mb-6 leading-relaxed">
          {question.question}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options.map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`h-auto min-h-14 py-3 text-sm whitespace-normal transition-all duration-300 transform ${getButtonClass(
                option
              )} ${selectedAnswer && "text-primary-foreground"}`}
              disabled={!!selectedAnswer}
            >
              {option}
              {selectedAnswer && option === question.correctAnswer && (
                <CheckCircle className="ml-2" />
              )}
              {selectedAnswer &&
                option !== question.correctAnswer &&
                option === selectedAnswer && <XCircle className="ml-2" />}
            </Button>
          ))}
        </div>

        {selectedAnswer && (
          <div className="mt-6 text-center animate-in fade-in-50">
            <div className="p-3 bg-secondary/30 rounded-md">
              <p className="font-semibold text-primary-foreground">
                {isCorrect ? "Jenius!" : "Aww, salah!"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {question.feedback}
              </p>
            </div>
            <Button onClick={handleNext} className="mt-4 w-full">
              Lanjut
            </Button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
