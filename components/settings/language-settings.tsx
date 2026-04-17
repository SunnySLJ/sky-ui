'use client';

export function LanguageSettings({
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
        <h2>语言设置</h2>
        <p>界面语言</p>
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
