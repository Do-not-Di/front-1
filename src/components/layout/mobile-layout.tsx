import type { ReactNode } from 'react';
import Header from './header';
import BottomNav from './bottom-nav';

interface MobileLayoutProps {
  children: ReactNode;
  headerTitle?: string;
  showBack?: boolean;
}

const MobileLayout = ({
  children,
  headerTitle,
  showBack,
}: MobileLayoutProps) => {
  return (
    <div className='min-h-screen bg-gray-100 flex justify-center'>
      {/* 375px 고정 레이아웃 */}
      <div className='w-[375px] min-h-screen bg-white shadow-lg flex flex-col'>
        <Header title={headerTitle} showBack={showBack} />
        <div className='flex-1 overflow-y-auto'>{children}</div>
        <BottomNav />
      </div>
    </div>
  );
};

export default MobileLayout;
