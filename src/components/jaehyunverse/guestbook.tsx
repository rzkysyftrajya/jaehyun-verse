"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GlassCard from "./shared/glass-card";
import { MessageSquare, Send } from "lucide-react";

interface Signature {
  name: string;
  message: string;
  timestamp: string;
}

const initialSignatures: Signature[] = [
  {
    name: "Uti Gemes",
    message: "Jaehyun, you are my sunshine! ☀️",
    timestamp: "2 hours ago",
  },
  {
    name: "Peach Enthusiast",
    message: "Fighting!! Looking forward to the next comeback!",
    timestamp: "1 day ago",
  },
  {
    name: "Valentine Boy Fan",
    message: "Your voice is like honey 🍯",
    timestamp: "3 days ago",
  },
];

export default function Guestbook() {
  const [signatures, setSignatures] = useState<Signature[]>(initialSignatures);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newSignature: Signature = {
        name,
        message,
        timestamp: "Just now",
      };
      setSignatures([newSignature, ...signatures]);
      setName("");
      setMessage("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-2xl">
      <GlassCard className="mb-8">
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <MessageSquare className="text-primary" />
            Tinggalkan Pesan
          </h3>
          <Input
            placeholder="Nama panggilanmu..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-input/50"
            maxLength={20}
          />
          <Textarea
            placeholder="Pesan cintamu untuk Jaehyun..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-input/50"
            maxLength={100}
            rows={3}
          />
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/80 text-accent-foreground"
            disabled={isSubmitting}
          >
            <Send className="mr-2" />{" "}
            {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
          </Button>
        </form>
      </GlassCard>

      <div className="space-y-4">
        {signatures.map((sig, index) => (
          <GlassCard key={index} className="p-4">
            <p className="text-foreground mb-1">"{sig.message}"</p>
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-primary">- {sig.name}</p>
              <p className="text-xs text-muted-foreground">{sig.timestamp}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
