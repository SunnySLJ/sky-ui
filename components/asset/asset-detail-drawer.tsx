'use client';

import Image from 'next/image';

interface AssetDetailDrawerProps {
  src: string;
  onClose: () => void;
}

export function AssetDetailDrawer({ src, onClose }: AssetDetailDrawerProps) {
  return (
    <div className="asset-drawer-overlay" onClick={onClose}>
      <div className="asset-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="asset-drawer-close" onClick={onClose} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Left: preview */}
        <div className="asset-drawer-preview">
          <div className="asset-drawer-preview-media">
            <div className="asset-card-overlay">
              <div className="asset-card-overlay-icon large">i</div>
              <p className="asset-card-overlay-text">视频作品已超出24小时，</p>
              <p className="asset-card-overlay-text">无法进行播放/下载</p>
              <p className="asset-card-overlay-text">可使用文案进行再次创作</p>
            </div>
            <Image src={src} alt="" width={480} height={640} style={{ objectFit: 'cover', borderRadius: '16px' }} />
          </div>
        </div>

        {/* Right: detail info */}
        <div className="asset-drawer-info">
          {/* Action buttons */}
          <div className="asset-drawer-actions">
            <button type="button" className="asset-action-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 2v8M4 7l4 4 4-4M3 12h10" />
              </svg>
              下载
            </button>
            <button type="button" className="asset-action-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 6l6 4 6-4M4 10v3h8v-3" />
              </svg>
              保存至素材库
            </button>
            <button type="button" className="asset-action-btn danger">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5h10M6 5V3h4v2M5 8v5M11 8v5M4 5l1 8h6l1-8" />
              </svg>
              删除
            </button>
          </div>

          {/* Description */}
          <div className="asset-drawer-description">
            <div className="asset-drawer-desc-header">
              <span>创作描述:</span>
              <button type="button" className="asset-copy-btn">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="5" width="7" height="7" rx="1" />
                  <path d="M2 9V2h7" />
                </svg>
                复制提示词
              </button>
            </div>

            {/* Thumbnail row */}
            <div className="asset-drawer-thumbs">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="asset-drawer-thumb">
                  <Image src={src} alt="" width={64} height={64} />
                </div>
              ))}
              <div className="asset-drawer-thumb more">+1</div>
            </div>

            {/* Script sections */}
            <div className="asset-drawer-script">
              <div className="asset-script-section">
                <p><strong>【开场 0-5秒】</strong>开场就是人物角色</p>
                <p>您好，我是承瑞阁的传家守护人，承瑞君。</p>
              </div>
              <div className="asset-script-section">
                <p><strong>【第一部分 5-15秒】</strong></p>
                <p>每一件金器，都有一个家族的故事。</p>
              </div>
              <div className="asset-script-section">
                <p><strong>【第二部分 15-25秒】</strong></p>
                <p>用两年时间，陪你打磨一件传家宝。</p>
              </div>
              <div className="asset-script-section">
                <p><strong>【第三部分 25-35秒】</strong></p>
                <p>麒麟·序，为仁德启程；</p>
                <p>白泽·篇，为智慧传家；</p>
                <p>玄武·章，为健康长寿；</p>
                <p>貔貅·卷，为财富聚财。</p>
              </div>
              <div className="asset-script-section">
                <p><strong>【第四部分 35-45秒】</strong>末尾也是人物角色</p>
                <p>四灵护佑，代代相传。</p>
              </div>
              <div className="asset-script-section">
                <p><strong>【第五部分 45-55秒】</strong></p>
                <p>我们不是在卖黄金，</p>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="asset-drawer-bottom-actions">
              <button type="button" className="asset-bottom-action-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="4" height="4" rx="1" />
                  <rect x="10" y="2" width="4" height="4" rx="1" />
                  <rect x="2" y="10" width="4" height="4" rx="1" />
                  <rect x="10" y="10" width="4" height="4" rx="1" />
                </svg>
                智能包装
                <span className="point-tag">3点</span>
              </button>
              <button type="button" className="asset-bottom-action-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 2l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" />
                </svg>
                高清生成
                <span className="point-tag">5点</span>
              </button>
              <button type="button" className="asset-regenerate-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 8a6 6 0 0110.5-4M14 8a6 6 0 01-10.5 4" />
                  <path d="M12 2v4h-4M4 14v-4h4" />
                </svg>
                再次生成
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
