import MemoryMatchGame from '@/components/jaehyunverse/games/memory-match';
import SectionWrapper from '@/components/jaehyunverse/shared/section-wrapper';

export default function MemoryMatchPage() {
  return (
    <div className="w-full min-h-screen pt-16 md:pt-0">
      <SectionWrapper 
        title="Jaehyun Memory Match"
        description="Flip cards and find matching photos of Jaehyun!"
      >
        <MemoryMatchGame />
      </SectionWrapper>
    </div>
  );
}
