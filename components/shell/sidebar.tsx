'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/shell/auth-provider';
import { primaryNav } from '@/lib/config/nav';
import { cn } from '@/lib/utils/cn';
import { UserMenu } from '@/components/shell/user-menu';
import { useToast } from '@/components/shell/toast-host';

export function Sidebar({ variant = 'default' }: { variant?: 'default' | 'video' }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isReady } = useAuth();
  const { showToast } = useToast();

  return (
    <aside className="sidebar">
      <Link href="/" className="sidebar-logo">
        <Image src="/images/cdn-1.png" alt="logo" width={40} height={40} />
      </Link>
      <nav className="sidebar-nav">
        {primaryNav.map((item) => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          const inactiveSrc = `/images/icon-${item.icon}-inactive.svg`;
          const activeSrc = `/images/icon-${item.icon}-active.svg`;
          const content = (
            <>
              <div className="nav-icon-wrap">
                <Image src={inactiveSrc} className="icon-inactive" alt={item.label} width={28} height={28} />
                <Image src={activeSrc} className="icon-active" alt={item.label} width={28} height={28} />
              </div>
              <span className="nav-label">{item.label}</span>
            </>
          );
          if (item.disabled) {
            return (
              <button
                key={item.label}
                className={cn('nav-item', active && 'active')}
                onClick={() => showToast('该页面还未进入首批 Next 迁移范围', 'warning')}
              >
                {content}
              </button>
            );
          }
          return (
            <Link key={item.href} href={item.href} className={cn('nav-item', active && 'active')}>
              {content}
            </Link>
          );
        })}
      <Link href="/tools" className="sidebar-ai-btn">
        <div className="nav-icon-wrap sidebar-star">★</div>
        <span className="nav-label">AI工具</span>
      </Link>
      </nav>
      <div className="sidebar-bottom">
        {variant === 'video' ? (
          <>
            <button className="sidebar-micro-link" type="button">API</button>
            <button className="sidebar-icon-btn" title="通知" onClick={() => router.push('/notice')}>◌</button>
            <button className="sidebar-icon-btn" title="全球">◍</button>
          </>
        ) : (
          <button className="sidebar-icon-btn" title="通知" onClick={() => router.push('/notice')}>◌</button>
        )}
        <button className="sidebar-credits" onClick={() => showToast('点数充值功能首版仍使用 mock 展示')}>
          <div className="sidebar-credits-row">
            <Image src="/images/icon-credits.svg" alt="credits" width={16} height={16} />
            <span className="credits-num">{user?.credits ?? 50}</span>
          </div>
          <span className="credits-label">获取点数</span>
        </button>
        {isReady && user ? (
          <UserMenu user={user} />
        ) : (
          <button className="sidebar-avatar sidebar-login-cta" onClick={() => router.push('/login')}>
            <Image src="/images/avatar.png" alt="登录" width={36} height={36} />
          </button>
        )}
      </div>
    </aside>
  );
}
