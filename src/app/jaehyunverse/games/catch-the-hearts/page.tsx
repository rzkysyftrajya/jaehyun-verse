import CatchTheHeartsGame from '@/components/jaehyunverse/games/catch-the-hearts';
import SectionWrapper from '@/components/jaehyunverse/shared/section-wrapper';

export default function CatchTheHeartsPage() {
  return (
    <div className="w-full min-h-screen pt-16 md:pt-0 flex items-center justify-center">
      <SectionWrapper 
        title="Catch The Hearts"
        description="Catch as many falling hearts as you can in 30 seconds!"
      >
        <CatchTheHeartsGame />
      </SectionWrapper>
    </div>
  );
}
