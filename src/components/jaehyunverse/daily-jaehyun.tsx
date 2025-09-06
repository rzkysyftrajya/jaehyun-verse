"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export default function DailyJaehyun() {
  const images = [
    "/daily1.png",
    "/daily2.png",
    "/daily3.png",
    "/daily4.png",
    "/daily5.png",
    "/daily6.png",
    "/daily1.png",
    "/daily2.png",
    "/daily3.png",
    "/daily1.png",
    "/daily5.png",
    "/daily3.png",
    "/daily2.png",
    "/daily4.png",
    "/daily5.png",
    "/daily6.png",
    "/daily2.png",
    "/daily3.png",
    "/daily6.png",
    "/daily1.png",
    "/daily2.png",
  ];
  return (
    <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800/20">
      <ThreeDMarquee images={images} />
    </div>
  );
}
