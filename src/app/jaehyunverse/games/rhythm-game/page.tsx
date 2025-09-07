import JaehyunDiscography from '@/components/jaehyunverse/jaehyun-discography';
import SectionWrapper from '@/components/jaehyunverse/shared/section-wrapper';

export default function RhythmGamePage() {
  return (
    <div className="w-full min-h-screen pt-16 md:pt-0 flex items-center justify-center">
      <SectionWrapper
        title="Jaehyun's Discography"
        description="Jelajahi karya-karya musik dari sang Valentine Boy, mulai dari lagu solo hingga kolaborasi spesial."
      >
        <JaehyunDiscography />
      </SectionWrapper>
    </div>
  );
}
