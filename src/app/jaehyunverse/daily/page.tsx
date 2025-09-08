import DailyJaehyun from "@/components/jaehyunverse/daily-jaehyun";
import SectionWrapper from "@/components/jaehyunverse/shared/section-wrapper";

export default function DailyPage() {
  return (
    <div className="w-full min-h-screen pt-16 md:pt-0 flex items-center justify-center">
      <SectionWrapper
        title="Daily Jaehyun"
        description="A new surprise every 24 hours."
      >
        <div className="w-full">
          <DailyJaehyun />
        </div>
      </SectionWrapper>
    </div>
  );
}
