
import { Label } from "@/components/ui/label";

export const SettingsSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="space-y-4">
    <h2 className="text-lg font-bold text-custom-dark-text pt-2 border-t border-gray-200 first:border-t-0 first:pt-0">{title}</h2>
    <div className="space-y-2">{children}</div>
  </section>
);

export const SettingItem = ({ label, description, children }: { label: string; description?: string; children: React.ReactNode; }) => (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg min-h-[72px]">
        <div className="space-y-1">
            <Label className="font-medium text-custom-dark-text text-base">{label}</Label>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div>{children}</div>
    </div>
);
