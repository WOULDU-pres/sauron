
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChatroomStatusItemProps } from "./ChatroomStatusItem";
import { useToast } from "./ui/use-toast";

interface ChatroomSettingsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  chatroom: ChatroomStatusItemProps | null;
}

const ChatroomSettingsModal = ({ isOpen, onOpenChange, chatroom }: ChatroomSettingsModalProps) => {
  const [status, setStatus] = React.useState<"활성" | "비활성">("활성");
  const { toast } = useToast();

  React.useEffect(() => {
    if (chatroom) {
      setStatus(chatroom.status);
    }
  }, [chatroom]);

  if (!chatroom) return null;

  const handleSave = () => {
    // 실제로는 여기서 API를 호출하여 상태를 업데이트합니다.
    console.log("Saving settings for", chatroom.name, "with status", status);
    toast({
      title: "저장 완료",
      description: `${chatroom.name}의 설정이 저장되었습니다.`,
    });
    onOpenChange(false);
  };
  
  const handleRemove = () => {
    // 실제로는 여기서 API를 호출하여 채팅방을 제거합니다.
    console.log("Removing chatroom", chatroom.name);
    toast({
      variant: "destructive",
      title: "삭제 완료",
      description: `${chatroom.name}을(를) 감시 목록에서 제거했습니다.`,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[360px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>{chatroom.name}</DialogTitle>
          <DialogDescription>
            {chatroom.members}명 • {chatroom.lastActivity}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="status-toggle" className="font-semibold text-custom-dark-text">
              채팅방 활성화
            </Label>
            <div className="flex items-center gap-3">
              <Switch
                  id="status-toggle"
                  checked={status === '활성'}
                  onCheckedChange={(checked) => setStatus(checked ? '활성' : '비활성')}
              />
              <span className="w-8 text-sm text-muted-foreground">{status}</span>
            </div>
          </div>
          <Button variant="link" className="text-destructive p-0 h-auto hover:no-underline" onClick={handleRemove}>
            감시중인 채팅방에서 제거
          </Button>
        </div>
        <DialogFooter className="!flex-row !justify-end gap-2">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>취소</Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatroomSettingsModal;
