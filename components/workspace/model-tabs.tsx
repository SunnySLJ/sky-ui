'use client';

import { useState } from 'react';

export function ModelTabs({ items }: { items: string[] }) {
  const [current, setCurrent] = useState(items[0]);
  return (
    <div className="gen-model-tabs">
      {items.map((item) => (
        <button type="button" key={item} className={`gen-model-tab ${current === item ? 'active' : ''}`} onClick={() => setCurrent(item)}>{item}</button>
      ))}
    </div>
  );
}
