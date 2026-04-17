'use client';

import { cn } from '@/lib/utils/cn';

export function NoticeList({
  notices,
  currentId,
  onSelect,
}: {
  notices: Array<{ id: number; title: string; listDate: string; icon: string }>;
  currentId: number;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="notice-list">
      {notices.map((notice) => (
        <button type="button" key={notice.id} className={cn('notice-item', currentId === notice.id && 'active')} onClick={() => onSelect(notice.id)}>
          <span className="notice-item-icon">{notice.icon}</span>
          <span>
            <strong>{notice.title}</strong>
            <em>{notice.listDate}</em>
          </span>
        </button>
      ))}
    </div>
  );
}
