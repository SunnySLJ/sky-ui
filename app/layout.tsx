import type { Metadata } from 'next';
import { AuthProvider } from '@/components/shell/auth-provider';
import { ToastProvider } from '@/components/shell/toast-host';
import './globals.css';

export const metadata: Metadata = {
  title: 'Timarsky 星空 - Next Skeleton',
  description: 'Timarsky clone migration skeleton powered by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
