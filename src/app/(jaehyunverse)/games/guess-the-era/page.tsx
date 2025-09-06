import GuessTheEraGame from '@/components/jaehyunverse/games/guess-the-era';
import SectionWrapper from '@/components/jaehyunverse/shared/section-wrapper';

export default function GuessTheEraPage() {
  return (
    <div className="w-full min-h-screen pt-16 md:pt-0">
      <SectionWrapper
        title="Guess The Jaehyun Era"
        description="Lihat foto Jaehyun dan tebak dari era mana foto itu berasal!"
      >
        <GuessTheEraGame />
      </SectionWrapper>
    </div>
  );
}
