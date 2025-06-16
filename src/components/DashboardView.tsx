import { useState, useEffect } from 'react';
import SummaryCard from './SummaryCard';
import MessageItem, { MessageItemProps } from './MessageItem';
import { Annoyed, Megaphone, Repeat, ShieldCheck, Plus } from 'lucide-react';
import ChatroomStatusItem, { ChatroomStatusItemProps } from './ChatroomStatusItem';
import MessageDetailModal from './MessageDetailModal';
import ChatroomSettingsModal from './ChatroomSettingsModal';
import { Button } from './ui/button';
import AnnouncementRequestItem, { AnnouncementRequestItemProps } from './AnnouncementRequestItem';
import DashboardViewSkeleton from './DashboardViewSkeleton';


const summaryData = [
  { icon: Megaphone, title: '광고', count: 14, color: '#F39091' },
  { icon: Repeat, title: '도배', count: 8, color: '#FAB491' },
  { icon: Annoyed, title: '분쟁/욕설', count: 5, color: '#C4B5E8' },
  { icon: ShieldCheck, title: '정상 처리', count: 231, color: '#A8D5BA' },
];

const messages: MessageItemProps[] = [
  { id: 11, type: '광고', room: '주식 정보방', content: '(광고) 절대 후회없는 최고의 선택! 지금 바로 확인하세요! https://example.com' },
  { id: 12, type: '도배', room: '자유로운 대화방', content: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ' },
  { id: 13, type: '분쟁', room: '게임 토론방', content: '님 실력이 더 문제인듯... 그렇게밖에 못하시나요? 한심하네요 정말.' },
  { id: 14, type: '광고', room: '부동산 스터디', content: '[Web발신] 100% 당첨! 지금 바로 확인! 지금 가입하면 5만원 즉시 지급! 조건없이 바로 드립니다!' },
];

const chatrooms: ChatroomStatusItemProps[] = [
    { name: 'IT 개발자 모임', members: 248, lastActivity: '방금 전', status: '활성' },
    { name: '부동산 정보방', members: 156, lastActivity: '3분 전', status: '활성' },
    { name: '게임 커뮤니티', members: 89, lastActivity: '1시간 전', status: '활성' },
    { name: '코인 투자방', members: 423, lastActivity: '5시간 전', status: '비활성' },
];

const announcementRequests: AnnouncementRequestItemProps[] = [
  { room: 'IT 개발자 모임', content: '중요 공지: 내일 정기 스터디는 취소되었습니다. 착오 없으시길 바랍니다.' },
  { room: '코인 투자방', content: '필독! A코인 관련 긴급 업데이트 사항입니다. 모두 확인해주세요.' },
];

const DashboardView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<MessageItemProps | null>(null);
  const [selectedChatroom, setSelectedChatroom] = useState<ChatroomStatusItemProps | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate loading for 1.5 seconds
    return () => clearTimeout(timer);
  }, []);


  const handleMessageClick = (message: MessageItemProps) => {
    setSelectedMessage(message);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  const handleChatroomClick = (chatroom: ChatroomStatusItemProps) => {
    setSelectedChatroom(chatroom);
  };

  const handleCloseChatroomModal = () => {
    setSelectedChatroom(null);
  };

  const handleAnnouncementClick = (announcement: AnnouncementRequestItemProps) => {
    console.log('Announcement clicked:', announcement);
  };

  if (isLoading) {
    return <DashboardViewSkeleton />;
  }

  return (
    <>
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {summaryData.map((item) => (
            <SummaryCard key={item.title} {...item} />
          ))}
        </div>
        
        <div>
          <h2 className="text-lg font-bold text-custom-dark-text mb-4">공지 요청</h2>
          <div className="space-y-3">
            {announcementRequests.map((msg, index) => (
              <AnnouncementRequestItem key={index} {...msg} onClick={() => handleAnnouncementClick(msg)} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-bold text-custom-dark-text mb-4">감시 중인 채팅방</h2>
          <div className="space-y-3">
            {chatrooms.map((room, index) => (
              <ChatroomStatusItem key={index} {...room} onClick={() => handleChatroomClick(room)} />
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-3 flex items-center justify-center gap-2 text-custom-light-text hover:bg-gray-100">
            <Plus className="h-4 w-4" />
            <span>채팅방 추가</span>
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-bold text-custom-dark-text mb-4">최근 감지된 메시지</h2>
          <div className="space-y-3">
            {messages.map((msg) => (
              <MessageItem key={msg.id} {...msg} onClick={() => handleMessageClick(msg)} />
            ))}
          </div>
        </div>
      </div>
      <MessageDetailModal
        isOpen={!!selectedMessage}
        onOpenChange={(isOpen) => !isOpen && handleCloseModal()}
        message={selectedMessage}
      />
      <ChatroomSettingsModal
        isOpen={!!selectedChatroom}
        onOpenChange={(isOpen) => !isOpen && handleCloseChatroomModal()}
        chatroom={selectedChatroom}
      />
    </>
  );
};

export default DashboardView;
