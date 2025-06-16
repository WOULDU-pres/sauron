
import { ChevronRight } from 'lucide-react';

export interface ChatroomStatusItemProps {
  name: string;
  members: number;
  lastActivity: string;
  status: '활성' | '비활성';
}

const ChatroomStatusItem = ({ name, members, lastActivity, status, onClick }: ChatroomStatusItemProps & { onClick: () => void }) => {
  return (
    <div className="bg-white p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={onClick}>
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${status === '활성' ? 'bg-custom-green' : 'bg-gray-400'}`} />
        <div>
          <p className="font-semibold text-custom-dark-text">{name}</p>
          <p className="text-sm text-custom-light-text">{members}명 • {lastActivity}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
         <span className={`text-sm font-medium ${status === '활성' ? 'text-custom-green' : 'text-gray-400'}`}>{status}</span>
         <ChevronRight className="h-5 w-5 text-custom-light-text" />
      </div>
    </div>
  );
};

export default ChatroomStatusItem;

