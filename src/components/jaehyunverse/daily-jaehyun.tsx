"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export default function DailyJaehyun() {
  const images = [
    "https://picsum.photos/seed/jaehyun1/400/600",
    "https://picsum.photos/seed/jaehyun2/400/600",
    "https://picsum.photos/seed/jaehyun3/600/400",
    "https://picsum.photos/seed/jaehyun4/400/600",
    "https://picsum.photos/seed/jaehyun5/400/600",
    "https://picsum.photos/seed/jaehyun6/600/400",
    "https://picsum.photos/seed/jaehyun7/400/600",
    "https://picsum.photos/seed/jaehyun8/400/600",
    "https://picsum.photos/seed/jaehyun9/600/400",
    "https://picsum.photos/seed/jaehyun10/400/600",
    "https://picsum.photos/seed/jaehyun11/400/600",
    "https://picsum.photos/seed/jaehyun12/600/400",
    "https://picsum.photos/seed/jaehyun13/400/600",
    "https://picsum.photos/seed/jaehyun14/400/600",
    "https://picsum.photos/seed/jaehyun15/600/400",
    "https://picsum.photos/seed/jaehyun16/400/600",
    "https://picsum.photos/seed/jaehyun17/400/600",
    "https://picsum.photos/seed/jaehyun18/600/400",
    "https://picsum.photos/seed/jaehyun19/400/600",
    "https://picsum.photos/seed/jaehyun20/400/600",
    "https://picsum.photos/seed/jaehyun21/600/400",
  ];
  return (
    <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800/20">
      <ThreeDMarquee images={images} />
    </div>
  );
}
