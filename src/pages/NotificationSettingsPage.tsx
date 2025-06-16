
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { SettingsSection } from '@/components/settings/SettingsLayout';
import { NotificationChannelSettings } from '@/components/settings/NotificationChannelSettings';
import { AnnouncementSettings } from '@/components/settings/AnnouncementSettings';
import { DetectionSettings } from '@/components/settings/DetectionSettings';
import { SystemSettings } from '@/components/settings/SystemSettings';


const NotificationSettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      kakao: true,
      telegram: false,
      discord: false,
      email: true,
    },
    detection: {
      sensitivity: "normal",
      keywords: ["안내", "공고", "이벤트", "알림"],
    },
    announcement: {
      enabled: true,
      keywords: ["공지", "필독", "중요"],
    },
    system: {
      apiLimit: 5000,
      currentApiUsage: 1247,
      logRetention: "30",
    },
  });

  const handleNotificationToggle = (id: keyof typeof settings.notifications) => {
    setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, [id]: !prev.notifications[id] } }));
  };
  
  const handleAddKeyword = (keyword: string) => {
    if (keyword && !settings.detection.keywords.includes(keyword)) {
      setSettings(prev => ({
        ...prev,
        detection: {
          ...prev.detection,
          keywords: [...prev.detection.keywords, keyword],
        },
      }));
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setSettings(prev => ({
      ...prev,
      detection: {
        ...prev.detection,
        keywords: prev.detection.keywords.filter(kw => kw !== keywordToRemove),
      },
    }));
  };

  const handleAddAnnouncementKeyword = (keyword: string) => {
    if (keyword && !settings.announcement.keywords.includes(keyword)) {
      setSettings(prev => ({
        ...prev,
        announcement: {
          ...prev.announcement,
          keywords: [...prev.announcement.keywords, keyword],
        },
      }));
    }
  };

  const handleRemoveAnnouncementKeyword = (keywordToRemove: string) => {
    setSettings(prev => ({
      ...prev,
      announcement: {
        ...prev.announcement,
        keywords: prev.announcement.keywords.filter(kw => kw !== keywordToRemove),
      },
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8">
      <div className="w-full max-w-[390px] h-[844px] bg-custom-light-bg rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative">
        <header className="flex items-center p-4 bg-white border-b border-gray-200 h-[60px] relative shrink-0">
          <Link to="/?view=profile" className="absolute left-4">
            <ChevronLeft className="h-6 w-6 text-custom-dark-text" />
          </Link>
          <h1 className="text-xl font-bold text-custom-dark-text text-center w-full">설정</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 space-y-6">
          <SettingsSection title="알림 설정">
            <NotificationChannelSettings
              settings={settings.notifications}
              onToggle={handleNotificationToggle}
            />
          </SettingsSection>
          
          <SettingsSection title="공지 알림 설정">
            <AnnouncementSettings
              enabled={settings.announcement.enabled}
              onToggle={(checked) => setSettings(prev => ({...prev, announcement: {...prev.announcement, enabled: checked }}))}
              keywords={settings.announcement.keywords}
              onAddKeyword={handleAddAnnouncementKeyword}
              onRemoveKeyword={handleRemoveAnnouncementKeyword}
            />
          </SettingsSection>

          <SettingsSection title="감지 설정">
            <DetectionSettings
              sensitivity={settings.detection.sensitivity}
              onSensitivityChange={(value) => setSettings(prev => ({ ...prev, detection: {...prev.detection, sensitivity: value}}))}
              keywords={settings.detection.keywords}
              onAddKeyword={handleAddKeyword}
              onRemoveKeyword={handleRemoveKeyword}
            />
          </SettingsSection>

          <SettingsSection title="시스템 설정">
            <SystemSettings
                apiLimit={settings.system.apiLimit}
                currentApiUsage={settings.system.currentApiUsage}
                logRetention={settings.system.logRetention}
                onApiLimitChange={(value) => setSettings(prev => ({...prev, system: {...prev.system, apiLimit: value}}))}
                onLogRetentionChange={(value) => setSettings(prev => ({...prev, system: {...prev.system, logRetention: value}}))}
            />
          </SettingsSection>
        </main>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
