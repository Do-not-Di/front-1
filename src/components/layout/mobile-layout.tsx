import type { ReactNode } from 'react';
import Header from './header';

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
      <div className='w-[375px] min-h-screen bg-white shadow-lg flex flex-col'>
        <Header title={headerTitle} showBack={showBack} />
        <div className='flex-1 overflow-y-auto'>{children}</div>
      </div>
    </div>
  );
};

export default MobileLayout;
