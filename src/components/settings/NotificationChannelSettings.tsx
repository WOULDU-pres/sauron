
import { Switch } from "@/components/ui/switch";
import { type LucideIcon, MessageSquare, Send, AtSign, Mail } from 'lucide-react';
import { SettingItem } from './SettingsLayout';

interface NotificationSettings {
  kakao: boolean;
  telegram: boolean;
  discord: boolean;
  email: boolean;
}

interface NotificationChannelSettingsProps {
  settings: NotificationSettings;
  onToggle: (id: keyof NotificationSettings) => void;
}

const notificationChannels: { id: keyof NotificationSettings; icon: LucideIcon; label: string; description: string; }[] = [
  { id: 'kakao', icon: MessageSquare, label: '카카오톡 알림', description: '기본 알림 채널' },
  { id: 'telegram', icon: Send, label: '텔레그램 알림', description: '보조 알림 채널' },
  { id: 'discord', icon: AtSign, label: '디스코드 알림', description: '팀 채널 연동' },
  { id: 'email', icon: Mail, label: '이메일 알림', description: '중요 알림 백업' },
];

export const NotificationChannelSettings = ({ settings, onToggle }: NotificationChannelSettingsProps) => {
  return (
    <>
      {notificationChannels.map(channel => (
        <SettingItem 
          key={channel.id} 
          label={channel.label}
          description={channel.description}
        >
          <div className="flex items-center gap-3">
            <channel.icon className="w-5 h-5 text-muted-foreground"/>
            <Switch
                checked={settings[channel.id]}
                onCheckedChange={() => onToggle(channel.id)}
            />
          </div>
        </SettingItem>
      ))}
    </>
  );
};
