'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/shell/auth-provider';
import { Sidebar } from '@/components/shell/sidebar';
import { cn } from '@/lib/utils/cn';

export function AppShell({
  children,
  requireAuth = false,
  layoutClassName,
  mainClassName,
  scrollClassName,
  sidebarVariant = 'default',
}: {
  children: React.ReactNode;
  requireAuth?: boolean;
  layoutClassName?: string;
  mainClassName?: string;
  scrollClassName?: string;
  sidebarVariant?: 'default' | 'video';
}) {
  const router = useRouter();
  const { isReady, user } = useAuth();

  useEffect(() => {
    if (isReady && requireAuth && !user) {
      router.replace('/login');
    }
  }, [isReady, requireAuth, router, user]);

  if (requireAuth && !isReady) {
    return null;
  }

  if (requireAuth && isReady && !user) {
    return null;
  }

  return (
    <div className={cn('app-layout', layoutClassName)}>
      <Sidebar variant={sidebarVariant} />
      <main className={cn('main-content next-main-content', mainClassName)}>
        <div className={cn('main-scroll next-main-scroll', scrollClassName)}>{children}</div>
      </main>
    </div>
  );
}
