'use client';

type NotificationOption = {
  key: string;
  title: string;
  description: string;
};

export function NotificationSettings({
  options,
  values,
  onToggle,
}: {
  options: NotificationOption[];
  values: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <h2>通知设置</h2>
        <p>接收重要更新的通知</p>
      </div>
      <div className="settings-toggle-list">
        {options.map((option) => (
          <label key={option.key} className="settings-toggle-row">
            <span>
              <strong>{option.title}</strong>
              <em>{option.description}</em>
            </span>
            <input type="checkbox" checked={Boolean(values[option.key])} onChange={() => onToggle(option.key)} />
          </label>
        ))}
      </div>
    </section>
  );
}
