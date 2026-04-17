export function UploadPanel({
  title,
  hint,
  secondaryLabel = '香蕉生图/改图',
}: {
  title: string;
  hint: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="gen-upload-row">
      <div className="gen-upload-main">
        <div className="gen-upload-main-inner">
          <div className="gen-upload-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="4 2" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </div>
          <div className="gen-upload-main-text">
            <div className="gen-upload-main-label">{title}</div>
            <div className="gen-upload-main-hint">{hint}</div>
          </div>
        </div>
      </div>
      <div className="gen-upload-secondary">
        <div className="gen-upload-icon-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          </svg>
        </div>
        <div className="gen-upload-secondary-label">{secondaryLabel}</div>
      </div>
    </div>
  );
}
