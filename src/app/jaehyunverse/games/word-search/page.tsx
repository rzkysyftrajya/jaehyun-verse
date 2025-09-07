import WordSearchGame from '@/components/jaehyunverse/games/word-search';
import SectionWrapper from '@/components/jaehyunverse/shared/section-wrapper';

export default function WordSearchPage() {
  return (
    <div className="w-full min-h-screen pt-16 md:pt-0">
      <SectionWrapper
        title="Jaehyun Word Search"
        description="Temukan kata-kata tersembunyi yang berhubungan dengan Jaehyun, NCT, dan lagu-lagunya!"
      >
        <WordSearchGame />
      </SectionWrapper>
    </div>
  );
}
