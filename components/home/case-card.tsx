'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/shell/auth-provider';
import { useToast } from '@/components/shell/toast-host';

export type HomeCard = {
  img: string;
  badge: string;
  title: string;
  likes: number;
  category: string;
  model: string;
  href?: string;
  noFooter?: boolean;
  videoSrc?: string;
  actionLabel?: string;
};

export function CaseCard({ card }: { card: HomeCard }) {
  const router = useRouter();
  const { showToast } = useToast();
  const { user } = useAuth();
  const isTutorial = Boolean(card.videoSrc);
  const targetHref = card.href ?? (card.category === '电商' ? '/banana?tab=ecom' : (card.model.includes('图片') ? '/banana' : '/video'));

  return (
    <div className="waterfall-card">
      <div className="content-card">
        <div className={`card-image${isTutorial ? ' card-image-video' : ''}`}>
          {card.videoSrc ? (
            <video
              className="card-video"
              src={card.videoSrc}
              poster={card.img}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
            />
          ) : (
            <Image src={card.img} alt={card.title} width={360} height={460} />
          )}
          <div className="card-badge">{card.badge}</div>
          <div className="card-play-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </div>
          {isTutorial && <div className="card-video-tag">本地教程</div>}
          {!card.noFooter && (
            <div className="card-footer">
              <span className="card-title">{card.title}</span>
              <span className="card-likes">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M2 9.5a5.5 5.5 0 019.591-3.676.56.56 0 00.818 0A5.49 5.49 0 0122 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 01-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
                {card.likes}
              </span>
            </div>
          )}
          <div className="card-overlay">
            <button
              type="button"
              className="card-action-btn"
              onClick={() => {
                if (!user) {
                  showToast('请先登录后再使用创作工作台', 'warning');
                  router.push('/login');
                  return;
                }
                router.push(targetHref);
              }}
            >
              {card.actionLabel ?? '做同款'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
