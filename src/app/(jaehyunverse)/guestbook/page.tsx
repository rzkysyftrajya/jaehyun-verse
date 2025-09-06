import Guestbook from '@/components/jaehyunverse/guestbook';
import SectionWrapper from '@/components/jaehyunverse/shared/section-wrapper';

export default function GuestbookPage() {
  return (
    <div className="w-full min-h-screen pt-16 md:pt-0">
      <SectionWrapper title="Buku Tamu Gemas" description="Tinggalkan jejak cintamu untuk Jaehyun di sini!">
        <Guestbook />
      </SectionWrapper>
    </div>
  );
}
