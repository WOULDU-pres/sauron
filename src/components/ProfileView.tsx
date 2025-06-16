
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, User, Bell, HelpCircle, LogOut } from 'lucide-react';
import { Link } from "react-router-dom";

const ProfileView = () => {
  const menuItems = [
    { icon: User, text: '계정 정보', href: '/account-info' },
    { icon: Bell, text: '알림 설정', href: '/notification-settings' },
    { icon: HelpCircle, text: '문의하기', href: '/contact-us' },
  ];

  return (
    <div className="p-4 bg-custom-light-bg h-full">
      <div className="flex flex-col items-center pt-8 pb-12">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold text-custom-dark-text">홍길동</h2>
        <p className="text-sm text-custom-light-text">example@email.com</p>
      </div>

      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.href} className="w-full flex items-center justify-between bg-white p-4 rounded-lg text-left hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <item.icon className="h-5 w-5 text-custom-light-text" />
              <span className="font-medium text-custom-dark-text">{item.text}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-custom-light-text" />
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full flex items-center justify-between bg-white p-4 rounded-lg text-left hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-4">
            <LogOut className="h-5 w-5 text-red-500" />
            <span className="font-medium text-red-500">로그아웃</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
