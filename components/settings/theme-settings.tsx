'use client';

export function ThemeSettings({
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
        <h2>外观设置</h2>
        <p>主题模式</p>
      </div>
      <div className="settings-option-group">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            className={`settings-pill ${active === option ? 'active' : ''}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}
