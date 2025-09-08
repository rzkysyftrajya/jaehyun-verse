import AppSidebar from "@/components/jaehyunverse/sidebar";
import JaehyunverseSidebarContent from "@/components/jaehyunverse/sidebar-content";
import MobileHeader from "@/components/jaehyunverse/shared/mobile-header";

export default function JaehyunverseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AppSidebar>
        <JaehyunverseSidebarContent />
      </AppSidebar>
      <div className="flex-1 pl-0 md:pl-64">
        <MobileHeader />
        {children}
      </div>
    </div>
  );
}
