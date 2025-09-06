import JaehyunMoodMeter from '@/components/jaehyunverse/jaehyun-mood-meter';
import SendLove from '@/components/jaehyunverse/send-love';
import SectionWrapper from '@/components/jaehyunverse/shared/section-wrapper';

export default function CreativePage() {
  return (
    <div className="w-full min-h-screen pt-16 md:pt-0">
    <SectionWrapper title="Creative Corner" description="A little corner for your creative heart.">
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
        <JaehyunMoodMeter />
        <SendLove />
      </div>
    </SectionWrapper>
    </div>
  );
}
