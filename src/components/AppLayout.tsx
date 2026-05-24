import { ReactNode } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { DesktopSidebar } from '@/components/DesktopSidebar';

interface AppLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export function AppLayout({ children, showNav = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-background">
      {showNav && <DesktopSidebar />}
      
      <main className="flex-1 min-h-screen pb-20 md:pb-0">
        {children}
      </main>

      {showNav && <BottomNav />}
    </div>
  );
}

export default AppLayout;
