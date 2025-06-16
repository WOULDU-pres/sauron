
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export interface AnnouncementRequestItemProps {
  room: string;
  content: string;
  onClick?: () => void;
}

const AnnouncementRequestItem = ({ room, content, onClick }: AnnouncementRequestItemProps) => {
    return (
        <div 
            className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={onClick}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="default" className="bg-blue-500 hover:bg-blue-600 text-white whitespace-nowrap">공지 요청</Badge>
                        <span className="font-semibold text-custom-dark-text text-sm truncate">{room}</span>
                    </div>
                    <p className="text-sm text-custom-light-text line-clamp-2">{content}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">승인</Button>
                    <Button size="sm" variant="outline" className="w-full sm:w-auto">거절</Button>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementRequestItem;
