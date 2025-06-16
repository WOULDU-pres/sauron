
import { Link } from 'react-router-dom';
import { ChevronLeft, Mail, Phone } from 'lucide-react';

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8">
      <div className="w-full max-w-[390px] h-[844px] bg-custom-light-bg rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative">
        <header className="flex items-center p-4 bg-white border-b border-gray-200 h-[60px] relative shrink-0">
          <Link to="/?view=profile" className="absolute left-4">
            <ChevronLeft className="h-6 w-6 text-custom-dark-text" />
          </Link>
          <h1 className="text-xl font-bold text-custom-dark-text text-center w-full">문의하기</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-custom-dark-text mb-2">고객 지원</h2>
              <p className="text-custom-light-text">
                서비스 이용 중 불편한 점이나 궁금한 사항이 있으시면 언제든지 문의해주세요.
              </p>
            </div>
            
            <div className="space-y-4">
              <a href="mailto:support@openkakao.watcher" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="h-5 w-5 text-custom-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-custom-dark-text">이메일 문의</p>
                  <p className="text-sm text-custom-primary">
                    support@openkakao.watcher
                  </p>
                </div>
              </a>
              <div className="flex items-center space-x-3 p-3 rounded-lg">
                <Phone className="h-5 w-5 text-custom-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-custom-dark-text">고객센터</p>
                  <p className="text-sm text-custom-dark-text">1588-0000 (평일 09:00 ~ 18:00)</p>
                </div>
              </div>
            </div>

            <div>
                <h3 className="text-md font-bold text-custom-dark-text mb-2">자주 묻는 질문 (FAQ)</h3>
                <p className="text-sm text-custom-light-text">자주 묻는 질문 페이지는 준비 중입니다.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContactUsPage;
