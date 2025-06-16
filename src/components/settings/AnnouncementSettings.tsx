
import { Switch } from "@/components/ui/switch";
import { SettingItem } from './SettingsLayout';
import { KeywordManager } from './KeywordManager';

interface AnnouncementSettingsProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  keywords: string[];
  onAddKeyword: (keyword: string) => void;
  onRemoveKeyword: (keyword: string) => void;
}

export const AnnouncementSettings = ({ enabled, onToggle, keywords, onAddKeyword, onRemoveKeyword }: AnnouncementSettingsProps) => {
  return (
    <>
      <SettingItem 
        label="공지 키워드 알림"
        description="지정한 키워드가 포함된 메시지를 공지로 제안합니다."
      >
        <Switch
            checked={enabled}
            onCheckedChange={onToggle}
        />
      </SettingItem>
      <KeywordManager
        label="공지용 키워드"
        keywords={keywords}
        onAddKeyword={onAddKeyword}
        onRemoveKeyword={onRemoveKeyword}
        placeholder="공지용 키워드 입력 후 Enter"
        badgeClassName="bg-blue-100 text-blue-800 hover:bg-blue-200"
      />
    </>
  );
};
