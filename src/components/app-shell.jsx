import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { FullWidthDivider } from "@/components/full-width-divider";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";

export function AppShell({ children }) {
  return (
    <div className="overflow-hidden">
      <SidebarProvider className="relative mx-auto h-svh w-full">
        <FullWidthDivider className="top-14 z-60 -translate-y-px" />
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-background p-3 md:p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
