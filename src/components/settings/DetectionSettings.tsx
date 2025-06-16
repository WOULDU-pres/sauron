
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SettingItem } from './SettingsLayout';
import { KeywordManager } from './KeywordManager';

interface DetectionSettingsProps {
  sensitivity: string;
  onSensitivityChange: (value: string) => void;
  keywords: string[];
  onAddKeyword: (keyword: string) => void;
  onRemoveKeyword: (keyword: string) => void;
}

export const DetectionSettings = ({ sensitivity, onSensitivityChange, keywords, onAddKeyword, onRemoveKeyword }: DetectionSettingsProps) => {
  return (
    <>
      <SettingItem label="감지 민감도" description="높을수록 더 많은 메시지를 이상으로 감지합니다.">
        <ToggleGroup 
          type="single" 
          variant="outline"
          value={sensitivity}
          onValueChange={(value) => {
            if (value) onSensitivityChange(value)
          }}
        >
          <ToggleGroupItem value="low" className="text-xs px-2 h-8">낮음</ToggleGroupItem>
          <ToggleGroupItem value="normal" className="text-xs px-2 h-8">보통</ToggleGroupItem>
          <ToggleGroupItem value="high" className="text-xs px-2 h-8">높음</ToggleGroupItem>
        </ToggleGroup>
      </SettingItem>
      <KeywordManager
        label="감지 제외 키워드 (화이트리스트)"
        keywords={keywords}
        onAddKeyword={onAddKeyword}
        onRemoveKeyword={onRemoveKeyword}
        placeholder="제외할 키워드 입력 후 Enter"
      />
    </>
  );
};
