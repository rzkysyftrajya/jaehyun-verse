import PuzzleSliderGame from '@/components/jaehyunverse/games/puzzle-slider';
import SectionWrapper from '@/components/jaehyunverse/shared/section-wrapper';

export default function PuzzleSliderPage() {
  return (
    <div className="w-full min-h-screen pt-16 md:pt-0">
      <SectionWrapper
        title="Jaehyun Puzzle Slider"
        description="Geser potongan puzzle untuk menyusun kembali foto Jaehyun!"
      >
        <PuzzleSliderGame />
      </SectionWrapper>
    </div>
  );
}
