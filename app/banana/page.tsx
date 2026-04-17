import { Suspense } from 'react';
import { BananaPageClient } from '@/components/workspace/banana-page-client';

export default function BananaPage() {
  return (
    <Suspense fallback={null}>
      <BananaPageClient />
    </Suspense>
  );
}
