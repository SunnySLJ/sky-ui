'use client';

import { useState } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import { NoticeDetail } from '@/components/notice/notice-detail';
import { NoticeList } from '@/components/notice/notice-list';
import { useToast } from '@/components/shell/toast-host';
import { notices } from '@/lib/mock/notice';

export default function NoticePage() {
  const [currentId, setCurrentId] = useState(notices[0]?.id ?? 0);
  const { showToast } = useToast();
  const current = notices.find((item) => item.id === currentId) ?? notices[0];

  return (
    <AppShell requireAuth>
      <section className="notice-page">
        <div className="notice-header">
          <div>
            <h1>消息公告</h1>
            <p>产品更新、功能上线和重要通知都会在这里同步。</p>
          </div>
          <button type="button" className="director-chip-btn" onClick={() => showToast('公告已全部标记为已读（mock）', 'success')}>
            全部已读
          </button>
        </div>
        <div className="notice-layout">
          <NoticeList notices={notices} currentId={currentId} onSelect={setCurrentId} />
          <NoticeDetail
            metaBadge={current.metaBadge}
            date={current.date}
            headline={current.headline}
            intro={current.intro}
            sections={current.sections}
            callout={current.callout}
            outro={current.outro}
          />
        </div>
      </section>
    </AppShell>
  );
}
