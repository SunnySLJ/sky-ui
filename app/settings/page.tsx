'use client';

import { useMemo, useState } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import { LanguageSettings } from '@/components/settings/language-settings';
import { NotificationSettings } from '@/components/settings/notification-settings';
import { ThemeColors } from '@/components/settings/theme-colors';
import { ThemeSettings } from '@/components/settings/theme-settings';
import { useToast } from '@/components/shell/toast-host';
import { languageOptions, notificationOptions, themeColorOptions, themeOptions } from '@/lib/mock/settings';

export default function SettingsPage() {
  const { showToast } = useToast();
  const [theme, setTheme] = useState(themeOptions[0]);
  const [color, setColor] = useState(themeColorOptions[0]);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    useMemo(
      () => Object.fromEntries(notificationOptions.map((item) => [item.key, item.defaultChecked])),
      [],
    ),
  );

  return (
    <AppShell requireAuth>
      <section className="settings-page">
        <div className="settings-header">
          <div>
            <h1>Settings</h1>
            <p>自定义你的应用偏好</p>
          </div>
          <button type="button" className="director-primary-btn" onClick={() => showToast('设置已保存（mock）', 'success')}>
            Save
          </button>
        </div>
        <div className="settings-grid">
          <ThemeSettings options={themeOptions} active={theme} onChange={setTheme} />
          <ThemeColors options={themeColorOptions} active={color} onChange={setColor} />
          <LanguageSettings options={languageOptions} active={language} onChange={setLanguage} />
          <NotificationSettings
            options={notificationOptions}
            values={notifications}
            onToggle={(key) => setNotifications((current) => ({ ...current, [key]: !current[key] }))}
          />
        </div>
      </section>
    </AppShell>
  );
}
