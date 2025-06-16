
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SettingItem } from './SettingsLayout';

interface SystemSettingsProps {
    apiLimit: number;
    currentApiUsage: number;
    logRetention: string;
    onApiLimitChange: (value: number) => void;
    onLogRetentionChange: (value: string) => void;
}

export const SystemSettings = ({ apiLimit, currentApiUsage, logRetention, onApiLimitChange, onLogRetentionChange }: SystemSettingsProps) => {
  return (
    <>
      <div className="bg-white p-4 rounded-lg space-y-2">
          <Label className="font-medium text-custom-dark-text text-base">일일 API 사용 제한</Label>
          <Input 
            type="number" 
            value={apiLimit} 
            onChange={(e) => onApiLimitChange(Number(e.target.value))}
          />
          <Progress value={currentApiUsage} max={apiLimit} className="w-full" />
          <p className="text-sm text-muted-foreground text-right">
              현재 사용량: {currentApiUsage.toLocaleString()} / {apiLimit.toLocaleString()}
          </p>
      </div>
        <SettingItem label="로그 보관 기간">
          <Select
            value={logRetention}
            onValueChange={onLogRetentionChange}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7일</SelectItem>
              <SelectItem value="30">30일</SelectItem>
              <SelectItem value="90">90일</SelectItem>
              <SelectItem value="365">1년 (영구)</SelectItem>
            </SelectContent>
          </Select>
      </SettingItem>
    </>
  );
};
