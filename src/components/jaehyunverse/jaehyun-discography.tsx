"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ExpandableCardProvider, type Card } from "@/components/ui/expandable-card";
import { Play, Pause } from "lucide-react";

const initialDiscography: Omit<Card, 'ctaText' | 'onCtaClick' | 'isCtaDisabled'>[] = [
    {
        id: "forever-only",
        title: "Forever Only",
        description: "JAEHYUN - NCT LAB (2022)",
        src: "https://picsum.photos/seed/song-forever-only/800/600",
        audioSrc: "https://storage.googleapis.com/studioprod-media-assets/assets/music/forever-only-sample.mp3",
        content: () => (
            <p>
                "Forever Only" is Jaehyun's first official solo song released under the NCT LAB project. 
                It's a captivating R&B track that showcases his smooth vocals and emotive delivery. 
                The song, with lyrics penned by Jaehyun himself, explores the desire for a love that lasts forever, 
                blending a dreamy atmosphere with a touch of melancholy.
            </p>
        ),
    },
    {
        id: "horizon",
        title: "Horizon",
        description: "JAEHYUN - NCT LAB (2023)",
        src: "https://picsum.photos/seed/song-horizon/800/600",
        audioSrc: "https://storage.googleapis.com/studioprod-media-assets/assets/music/horizon-sample.mp3",
        content: () => (
             <p>
                Also part of the NCT LAB project, "Horizon" is another self-composed track by Jaehyun.
                This song features a more relaxed, jazzy vibe with a comforting melody. 
                The lyrics compare a loved one to the horizon, a beautiful and constant presence. 
                It perfectly captures a serene and romantic mood, great for a peaceful evening.
            </p>
        ),
    },
    {
        id: "try-again",
        title: "Try Again",
        description: "d.ear, JAEHYUN - SM STATION (2017)",
        src: "https://picsum.photos/seed/song-try-again/800/600",
        audioSrc: "https://storage.googleapis.com/studioprod-media-assets/assets/music/try-again-sample.mp3",
        content: () => (
             <p>
                A collaboration for SM STATION, "Try Again" is a sweet, acoustic pop ballad. 
                Jaehyun's gentle voice blends beautifully with d.ear's, creating a heartfelt duet.
                The song speaks of reassurance and the desire to try again in a relationship, 
                making it a timeless and comforting love song.
            </p>
        ),
    },
    {
        id: "perfume",
        title: "Perfume",
        description: "NCT DOJAEJUNG - Mini Album (2023)",
        src: "https://picsum.photos/seed/song-perfume/800/600",
        audioSrc: "https://storage.googleapis.com/studioprod-media-assets/assets/music/perfume-sample.mp3",
        content: () => (
             <p>
                The title track from the debut mini-album of NCT's first official sub-unit, DOJAEJUNG. 
                "Perfume" is a sophisticated and groovy R&B track about leaving a lasting impression, like a signature scent.
                The trio's vocal harmony is the highlight, and the performance is as smooth as the song itself.
            </p>
        ),
    },
    {
        id: "can-we-go-back",
        title: "Can We Go Back",
        description: "NCT DOJAEJUNG - Mini Album (2023)",
        src: "https://picsum.photos/seed/song-can-we-go-back/800/600",
        audioSrc: "https://storage.googleapis.com/studioprod-media-assets/assets/music/can-we-go-back-sample.mp3",
        content: () => (
             <p>
                A pre-release track from the "Perfume" mini-album, "Can We Go Back" is a powerful R&B ballad.
                It showcases the emotional and powerful vocal capabilities of Doyoung, Jaehyun, and Jungwoo. 
                The lyrics express the regret and longing of wanting to turn back time to a past love.
            </p>
        ),
    },
];

export default function JaehyunDiscography() {
    const [playingId, setPlayingId] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayPause = (card: Card) => {
        if (audioRef.current) {
            if (playingId === card.id) {
                audioRef.current.pause();
                setPlayingId(null);
            } else {
                audioRef.current.src = card.audioSrc!;
                audioRef.current.play();
                setPlayingId(card.id);
            }
        }
    };
    
    useEffect(() => {
        const audioEl = audioRef.current;
        const handleEnded = () => setPlayingId(null);
        audioEl?.addEventListener('ended', handleEnded);
        return () => {
            audioEl?.removeEventListener('ended', handleEnded);
        }
    }, []);

    const discographyCards = useMemo((): Card[] => {
        return initialDiscography.map(song => ({
            ...song,
            onCtaClick: handlePlayPause,
            ctaText: playingId === song.id ? "Playing..." : "Play",
            isCtaDisabled: playingId !== null && playingId !== song.id,
        }));
    }, [playingId]);


    return (
        <div className="w-full max-w-3xl mx-auto">
           <ExpandableCardProvider cards={discographyCards} />
           <audio ref={audioRef} />
        </div>
    );
}
