import type { ReactNode } from 'react';

interface MobileLayoutProps {
  children: ReactNode;
  headerTitle?: string;
  showBack?: boolean;
}

const MobileLayout = ({ children, headerTitle, showBack }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-lg flex flex-col">
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default MobileLayout;
