'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/shell/auth-provider';
import type { User } from '@/lib/utils/auth';
import { useToast } from '@/components/shell/toast-host';

export function UserMenu({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showToast } = useToast();
  const { logout } = useAuth();

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  return (
    <div className="shell-user-menu-wrap" ref={ref}>
      <button className="sidebar-avatar" onClick={() => setOpen((current) => !current)}>
        <Image src={user.avatar} alt={user.username} width={36} height={36} />
      </button>
      {open && (
        <div className="shell-user-menu is-open">
          <div className="shell-user-menu-card">
            <div className="shell-user-meta">
              <div className="shell-user-avatar"><Image src={user.avatar} alt={user.username} width={32} height={32} /></div>
              <div>
                <div className="shell-user-name">{user.username}</div>
                <div className="shell-user-subtitle">创作者工作台</div>
              </div>
            </div>
            <Link href="/notice" className="shell-user-action" onClick={() => setOpen(false)}>消息公告</Link>
            <Link href="/settings" className="shell-user-action" onClick={() => setOpen(false)}>设置</Link>
            <button
              className="shell-user-action danger"
              onClick={() => {
                logout();
                showToast('已退出登录');
                router.push('/login');
              }}
            >
              退出登录
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
