import VirtualDateGame from '@/components/jaehyunverse/games/virtual-date';
import SectionWrapper from '@/components/jaehyunverse/shared/section-wrapper';

export default function VirtualDatePage() {
  return (
    <div className="w-full min-h-screen pt-16 md:pt-0">
      <SectionWrapper
        title="Virtual Date with Jaehyun"
        description="Pilihanmu akan menentukan bagaimana kencanmu berjalan. Pilihlah dengan bijak!"
      >
        <VirtualDateGame />
      </SectionWrapper>
    </div>
  );
}
