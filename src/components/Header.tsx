
import { Search, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <h1 className="text-2xl font-bold text-custom-dark-text">{title}</h1>
      <div className="flex items-center space-x-4">
        <Search className="h-6 w-6 text-custom-light-text" />
        <Menu className="h-6 w-6 text-custom-light-text" />
      </div>
    </header>
  );
};

export default Header;
