
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import DashboardView from '@/components/DashboardView';
import ReportsView from '@/components/ReportsView';
import DetectionLogView from '@/components/DetectionLogView';
import ProfileView from '@/components/ProfileView';

const Index = () => {
  const [searchParams] = useSearchParams();
  const [activeView, setActiveView] = useState(searchParams.get('view') || 'dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'reports':
        return <ReportsView />;
      case 'detection-log':
        return <DetectionLogView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <div className="p-4 text-center">준비 중인 페이지입니다.</div>;
    }
  };
  
  const getTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Today';
      case 'reports':
        return 'Report';
      case 'detection-log':
        return '감지 로그';
      case 'profile':
        return '프로필';
      default:
        return 'OpenKakao Watcher';
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8">
      <div className="w-full max-w-[390px] h-[844px] bg-custom-light-bg rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative">
        <Header title={getTitle()} />
        <main className="flex-1 overflow-y-auto pb-24">
          {renderView()}
        </main>
        <BottomNav activeView={activeView} setActiveView={setActiveView} />
      </div>
    </div>
  );
};

export default Index;
