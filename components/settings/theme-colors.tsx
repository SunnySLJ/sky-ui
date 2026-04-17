'use client';

export function ThemeColors({
  options,
  active,
  onChange,
}: {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <h2>主题色</h2>
        <p>选择你的界面强调色</p>
      </div>
      <div className="settings-color-row">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            className={`settings-color ${active === option ? 'active' : ''}`}
            style={{ ['--swatch' as string]: option }}
            onClick={() => onChange(option)}
            aria-label={`theme color ${option}`}
          />
        ))}
      </div>
    </section>
  );
}
