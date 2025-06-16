import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from './ui/button';
import { Check, Trash2 } from 'lucide-react';

export interface MessageItemProps {
  id: number;
  type: '광고' | '도배' | '분쟁' | '정상';
  room: string;
  content: string;
  confidence?: number;
  reason?: string;
}

export const typeColors = {
  '광고': 'bg-custom-red',
  '도배': 'bg-custom-orange',
  '분쟁': 'bg-purple-500',
  '정상': 'bg-custom-green',
};

const MessageItem = ({ 
  id, type, room, content, confidence, 
  onClick, isSelected, onToggleSelect, isSelectionMode,
  onAcknowledge, onIgnore
}: MessageItemProps & { 
  onClick: () => void; 
  isSelected?: boolean; 
  onToggleSelect?: (id: number) => void; 
  isSelectionMode?: boolean;
  onAcknowledge?: (id: number) => void;
  onIgnore?: (id: number) => void;
}) => {
  const [offsetX, setOffsetX] = React.useState(0);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const touchStartX = React.useRef(0);
  const pressTimer = React.useRef<NodeJS.Timeout | null>(null);
  const longPressTriggered = React.useRef(false);

  const handlePointerDown = () => {
    longPressTriggered.current = false;
    pressTimer.current = setTimeout(() => {
      onToggleSelect?.(id);
      longPressTriggered.current = true;
    }, 500);
  };

  const handlePointerUp = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (longPressTriggered.current) {
      e.preventDefault();
      return;
    }
    // If item is swiped, clicking it should close it, not trigger main action.
    if (offsetX !== 0) {
        e.preventDefault();
        setOffsetX(0);
        return;
    }
    onClick();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isSelectionMode) return;
    touchStartX.current = e.targetTouches[0].clientX;
    if (itemRef.current) {
        itemRef.current.style.transition = 'none';
    }
    longPressTriggered.current = false;
    pressTimer.current = setTimeout(() => {
        onToggleSelect?.(id);
        longPressTriggered.current = true;
    }, 500);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isSelectionMode || longPressTriggered.current) return;
    
    const currentX = e.targetTouches[0].clientX;
    const diff = currentX - touchStartX.current;
    
    if (pressTimer.current && Math.abs(diff) > 10) {
        clearTimeout(pressTimer.current);
    }
    
    if (diff < 0) { // Only allow swipe left
        setOffsetX(Math.max(diff, -150));
    }
  };

  const handleTouchEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
    if (isSelectionMode || longPressTriggered.current) return;

    if (itemRef.current) {
        itemRef.current.style.transition = 'transform 0.3s ease';
    }

    if (offsetX < -60) {
      setOffsetX(-140); // Snap to open
    } else {
      setOffsetX(0); // Snap to close
    }
  };
  
  const handleAction = (e: React.MouseEvent, action: 'acknowledge' | 'ignore') => {
    e.stopPropagation();
    if (action === 'acknowledge') {
      onAcknowledge?.(id);
    } else {
      onIgnore?.(id);
    }
    setOffsetX(0);
  };

  return (
    <div className="relative bg-white rounded-xl overflow-hidden">
        <div className="absolute top-0 right-0 h-full flex items-center z-0">
            <Button size="sm" className="h-full rounded-none bg-green-500 hover:bg-green-600 w-[70px] flex-col" onClick={(e) => handleAction(e, 'acknowledge')}>
                <Check size={18} />
                <span className="text-xs mt-1">확인</span>
            </Button>
            <Button size="sm" variant="destructive" className="h-full rounded-none w-[70px] flex-col" onClick={(e) => handleAction(e, 'ignore')}>
                <Trash2 size={18} />
                <span className="text-xs mt-1">무시</span>
            </Button>
        </div>
        <div
            ref={itemRef}
            className="bg-white p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 relative z-10"
            style={{ transform: `translateX(${offsetX}px)` }}
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="flex items-center space-x-4 overflow-hidden flex-1">
                {isSelectionMode && (
                    <div className="flex-shrink-0" onClick={(e) => { e.stopPropagation(); onToggleSelect?.(id); }}>
                        <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => onToggleSelect?.(id)}
                        aria-label="Select message"
                        />
                    </div>
                )}
                <div className="flex-shrink-0">
                    <Badge className={`${typeColors[type]} text-white`}>{type}</Badge>
                </div>
                <div className="overflow-hidden">
                    <p className="font-semibold text-custom-dark-text truncate">{room}</p>
                    <p className="text-sm text-custom-light-text truncate">{content}</p>
                </div>
            </div>
            {confidence !== undefined && (
                <div className="text-right ml-4 flex-shrink-0">
                <p className="text-xs text-custom-light-text">신뢰도</p>
                <p className="font-semibold text-sm text-custom-dark-text">{confidence.toFixed(1)}%</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default MessageItem;
