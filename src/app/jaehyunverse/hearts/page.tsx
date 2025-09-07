import FanHeartCollector from '@/components/jaehyunverse/fan-heart-collector';
import SectionWrapper from '@/components/jaehyunverse/shared/section-wrapper';

export default function HeartsPage() {
  return (
    <div className="w-full min-h-screen pt-16 md:pt-0 flex items-center justify-center">
      <SectionWrapper title="Fan Heart Collector" description="Show your love and climb the leaderboard!">
        <div className="w-full max-w-md">
          <FanHeartCollector />
        </div>
      </SectionWrapper>
    </div>
  );
}
