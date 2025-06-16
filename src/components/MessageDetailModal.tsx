
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MessageItemProps, typeColors } from "./MessageItem";
import { Badge } from "./ui/badge";
import AiReason from "./AiReason";

interface MessageDetailModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  message: MessageItemProps | null;
}

const MessageDetailModal = ({ isOpen, onOpenChange, message }: MessageDetailModalProps) => {
  const { toast } = useToast();

  if (!message) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: "복사 완료",
      description: "메시지 내용이 클립보드에 복사되었습니다.",
    });
    onOpenChange(false);
  };
  
  const handleIgnore = () => {
    toast({
      title: "완료",
      description: "메시지를 무시했습니다.",
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[360px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>{message.room}</DialogTitle>
          <div className="flex items-center gap-1.5 pt-1 text-sm text-muted-foreground">
            <span>분류:</span>
            <Badge className={`${typeColors[message.type]} text-white`}>{message.type}</Badge>
          </div>
        </DialogHeader>
        <div className="py-4 max-h-60 overflow-y-auto text-left">
          <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        <AiReason reason={message.reason} />
        <DialogFooter className="!flex-row !justify-end gap-2">
          <Button variant="secondary" onClick={handleCopy}>텍스트 복사</Button>
          <Button onClick={handleIgnore}>무시</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDetailModal;
