import type { ReactNode } from "react";

interface SectionWrapperProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function SectionWrapper({ title, description, children }: SectionWrapperProps) {
  return (
    <section className="w-full max-w-6xl px-4 py-16 flex flex-col items-center text-center">
      <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary-foreground mb-4" style={{textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))'}}>
        {title}
      </h2>
      <p className="max-w-2xl text-muted-foreground mb-12">{description}</p>
      {children}
    </section>
  );
}
