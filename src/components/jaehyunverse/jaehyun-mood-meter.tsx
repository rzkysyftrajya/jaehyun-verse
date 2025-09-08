"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GlassCard from "./shared/glass-card";
import { Wand2, RefreshCw } from "lucide-react";

interface Mood {
  quote: string;
  image: string;
  imageHint: string;
}

const moods: Mood[] = [
  {
    quote:
      '"I believe that if you have a pretty smile, you can make other people’s day."',
    image: "/daily1.png",
    imageHint: "man smiling eye smile",
  },
  {
    quote:
      '"You have to be confident with yourself, that\'s the most important thing."',
    image: "/daily2.png",
    imageHint: "man in suit confident",
  },
  {
    quote: '"masih ada jaehyun kalo ngerasa sendiri"',
    image: "/daily3.png",
    imageHint: "man cute confused",
  },
  {
    quote: "\"Even when you're tired, don't forget to look at the sky.\"",
    image: "/jaehyun-taman.png",
    imageHint: "man looking at sky",
  },
  {
    quote:
      '"I want to be someone who can give off a comfortable and positive vibe."',
    image: "/daily4.png",
    imageHint: "man in sweater warm",
  },
];

const getInitialMood = () => {
  // Return a default or empty state for SSR
  return {
    quote: "Click the button to get a dose of Jaehyun's charm!",
    image: "/kick.png",
    imageHint: "handsome kpop idol",
  };
};

export default function JaehyunMoodMeter() {
  const [currentMood, setCurrentMood] = useState<Mood>(getInitialMood);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Set initial random mood on client mount
    setCurrentMood(moods[Math.floor(Math.random() * moods.length)]);
  }, []);

  const getNewMood = () => {
    const newMood = moods[Math.floor(Math.random() * moods.length)];
    setCurrentMood(newMood);
  };

  return (
    <GlassCard className="w-full flex flex-col p-6 text-center items-center">
      <h3 className="font-bold text-lg flex items-center justify-center gap-2 mb-4">
        <Wand2 className="text-primary" /> Jaehyun Mood Meter
      </h3>

      <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-primary/20 shadow-lg">
        <Image
          key={currentMood.image}
          src={currentMood.image}
          alt="Jaehyun's Mood"
          width={200}
          height={200}
          data-ai-hint={currentMood.imageHint}
          className="object-cover w-full h-full animate-in fade-in duration-500"
        />
      </div>

      <p className="text-muted-foreground flex-grow mb-6 italic">
        "{currentMood.quote}"
      </p>

      <Button onClick={getNewMood} className="mt-auto">
        <RefreshCw className="mr-2" /> Get Another Quote
      </Button>
    </GlassCard>
  );
}
