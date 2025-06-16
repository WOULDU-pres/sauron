
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AccountInfoPage = () => {
  const menuItems = [
    { text: '비밀번호 변경' },
    { text: '연결된 계정 관리' },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8">
      <div className="w-full max-w-[390px] h-[844px] bg-custom-light-bg rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative">
        <header className="flex items-center p-4 bg-white border-b border-gray-200 h-[60px] relative shrink-0">
          <Link to="/?view=profile" className="absolute left-4">
            <ChevronLeft className="h-6 w-6 text-custom-dark-text" />
          </Link>
          <h1 className="text-xl font-bold text-custom-dark-text text-center w-full">계정 정보</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
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
              <button key={index} className="w-full flex items-center justify-between bg-white p-4 rounded-lg text-left hover:bg-gray-50 transition-colors">
                <span className="font-medium text-custom-dark-text">{item.text}</span>
                <ChevronRight className="h-5 w-5 text-custom-light-text" />
              </button>
            ))}
          </div>

          <div className="mt-8">
            <button className="w-full flex justify-center items-center text-sm text-red-500 p-4 rounded-lg bg-white hover:bg-red-50 transition-colors">
              계정 삭제
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountInfoPage;
