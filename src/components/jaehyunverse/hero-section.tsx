import Image from "next/image";

const GlitchText = ({ text }: { text: string }) => (
  <div
    className="relative glitch-text text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-headline tracking-tighter"
    data-text={text}
  >
    {text}
  </div>
);

const FloatingImage = ({
  src,
  alt,
  className,
  style,
  dataAiHint,
  width,
  height,
}: {
  src: string;
  alt: string;
  className: string;
  style?: React.CSSProperties;
  dataAiHint: string;
  width: number;
  height: number;
}) => (
  <div className={`absolute animate-float ${className}`}>
    <div
      className="relative w-full h-full rounded-2xl shadow-2xl shadow-primary/20 animate-pulse-glow overflow-hidden"
      style={{ filter: "drop-shadow(0 0 15px hsl(var(--primary) / 0.5))" }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        data-ai-hint={dataAiHint}
        className="object-cover w-full h-full"
      />
    </div>
  </div>
);

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden p-4">
      <div className="relative w-full h-full max-w-5xl">
        <FloatingImage
          src="/jaehyun.png"
          alt="Jaehyun photo 1"
          dataAiHint="handsome man"
          width={400}
          height={600}
          className="top-1/4 left-1/4 w-48 h-72 md:w-56 md:h-80 -translate-x-1/2 -translate-y-1/2 transform rotate-[-15deg]"
          style={{ animationDelay: "0s" }}
        />
        <FloatingImage
          src="/hero1.png"
          alt="Jaehyun photo 2"
          dataAiHint="male model"
          width={400}
          height={600}
          className="bottom-1/4 right-1/4 w-48 h-72 md:w-64 md:h-96 translate-x-1/2 translate-y-1/2 transform rotate-[10deg]"
          style={{ animationDelay: "2s" }}
        />
        <FloatingImage
          src="/section.png"
          alt="Jaehyun photo 3"
          dataAiHint="korean idol"
          width={600}
          height={400}
          className="top-1/2 left-1/2 w-56 h-40 md:w-80 md:h-56 transform rotate-[5deg] -translate-x-1/2 -translate-y-1/2"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center bg-background/30 backdrop-blur-[2px]">
        <h1 className="text-2xl text-accent font-semibold tracking-widest">
          WELCOME TO THE
        </h1>
        <GlitchText text="JAEHYUNVERSE" />
        <p className="mt-4 text-lg text-muted-foreground max-w-md">
          uti and only Jeong Jaehyun.
        </p>
      </div>
    </div>
  );
}
