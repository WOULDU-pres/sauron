
import { LayoutGrid, BarChart2, FileText, User } from 'lucide-react';

interface BottomNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center space-y-1 ${isActive ? 'text-custom-purple' : 'text-custom-light-text'}`}>
    <Icon className="h-6 w-6" />
    <span className="text-xs">{label}</span>
  </button>
);

const BottomNav = ({ activeView, setActiveView }: BottomNavProps) => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-white flex justify-around items-center p-2 border-t border-gray-200 h-[72px] pt-4">
      <NavItem icon={LayoutGrid} label="대시보드" isActive={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
      <NavItem icon={BarChart2} label="리포트" isActive={activeView === 'reports'} onClick={() => setActiveView('reports')} />
      <NavItem icon={FileText} label="감지로그" isActive={activeView === 'detection-log'} onClick={() => setActiveView('detection-log')} />
      <NavItem icon={User} label="프로필" isActive={activeView === 'profile'} onClick={() => setActiveView('profile')} />
    </footer>
  );
};

export default BottomNav;
