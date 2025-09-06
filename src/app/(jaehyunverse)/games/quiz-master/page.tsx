import JaehyunQuizMaster from '@/components/jaehyunverse/games/jaehyun-quiz-master';
import SectionWrapper from '@/components/jaehyunverse/shared/section-wrapper';

export default function QuizMasterPage() {
  return (
    <div className="w-full min-h-screen pt-16 md:pt-0">
      <SectionWrapper
        title="Jaehyun Quiz Master"
        description="Seberapa jauh kamu mengenal seorang Jeong Jaehyun? Uji pengetahuanmu di sini!"
      >
        <JaehyunQuizMaster />
      </SectionWrapper>
    </div>
  );
}
