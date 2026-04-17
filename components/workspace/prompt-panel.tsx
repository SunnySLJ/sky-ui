'use client';

import { useState } from 'react';

export function PromptPanel({ placeholder }: { placeholder: string }) {
  const [value, setValue] = useState('');
  return (
    <>
      <textarea className="gen-textarea gen-textarea-video" placeholder={placeholder} value={value} onChange={(event) => setValue(event.target.value)} />
      <div className="gen-ai-row">
        <div className="gen-ai-polish-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" /></svg>
          AI帮写润色
        </div>
        <div className="gen-char-count"><span>{value.length}/1000</span><button type="button" className="gen-clear-btn" onClick={() => setValue('')}>清空</button></div>
      </div>
    </>
  );
}
