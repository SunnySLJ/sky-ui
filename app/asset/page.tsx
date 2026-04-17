'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import { assetSubTabs, assetTabs } from '@/lib/mock/asset';
import { AssetDetailDrawer } from '@/components/asset/asset-detail-drawer';

const TABS_WITH_SUB = ['作品', '分身'] as const;

const AVATAR_ACTIONS: Record<string, { label: string; icon: React.ReactNode }[]> = {
  照片形象: [
    { label: '上传/添加照片', icon: 'upload' },
    { label: '创建照片形象', icon: 'create' },
  ],
  燃动分身: [
    { label: '上传燃动视频', icon: 'upload' },
    { label: '创建燃动分身', icon: 'create' },
  ],
  对口型视频: [
    { label: '上传对口型视频', icon: 'upload' },
    { label: '创建对口型视频', icon: 'create' },
  ],
};

const avatarIcons: Record<string, React.ReactNode> = {
  upload: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#ff2a9f" strokeWidth="2">
      <path d="M16 4v16M10 14l6 6 6-6" />
      <path d="M6 22h20" />
    </svg>
  ),
  create: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#ff2a9f" strokeWidth="2">
      <rect x="4" y="8" width="20" height="16" rx="2" />
      <circle cx="14" cy="16" r="4" />
      <path d="M22 10l6 6" />
      <path d="M28 10v6" />
    </svg>
  ),
};

export default function AssetPage() {
  const [activeTab, setActiveTab] = useState<string>(assetTabs[0]);
  const [activeSubTab, setActiveSubTab] = useState(assetSubTabs[assetTabs[0]][0]);
  const [search, setSearch] = useState('');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [batchMode, setBatchMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const showSubTabs = TABS_WITH_SUB.includes(activeTab as (typeof TABS_WITH_SUB)[number]);
  const subTabs = assetSubTabs[activeTab] || [];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const subs = assetSubTabs[tab];
    setActiveSubTab(subs?.[0] || '');
    setBatchMode(false);
    setSelectedIds(new Set());
  };

  // Mock data for demo
  const mockCards = useMemo(
    () =>
      [
        '/images/cdn-2.png',
        '/images/cdn-3.jpg',
        '/images/cdn-4.png',
        '/images/cdn-5.jpg',
        '/images/ba91e81c1a7b02544c6b61d852aacc.png',
        '/images/36ba636d5351f39326d46f4fec61fc.jpg',
        '/images/7a0f19e1775f75480dd733a559468c.png',
        '/images/9382bd4e92b293bc2d5427cdd78043.png',
        '/images/a44778616c13e342f99a8a1ef81cb6.png',
        '/images/72fabc6325ec83c23065743cd2f10e.jpg',
      ].map((src) => ({
        id: src,
        src,
        type: '索拉视频',
        expired: true,
      })),
    []
  );

  const filteredCards = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return mockCards;
    return mockCards.filter((card) => card.type.toLowerCase().includes(keyword));
  }, [search, mockCards]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const showBanner = activeTab === '作品';
  const showCards = activeTab === '作品';
  const showEmptyActions = activeTab === '分身';

  // Toolbar component (shared between 作品 and 分身)
  const Toolbar = () => {
    if (batchMode) {
      return (
        <div className="asset-batch-toolbar">
          <button type="button" className="asset-batch-action-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 3L3 11M3 3l8 8" />
              <path d="M2 7a5 5 0 113 4.6" />
            </svg>
            清理过期作品
          </button>
          <button type="button" className="asset-batch-action-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 5h8M5 5V2h4v3M4 5l1 8h4l1-8" />
            </svg>
            删除
          </button>
          <button type="button" className="asset-batch-action-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 2v7M3.5 6L7 9l3.5-3M2 11h10" />
            </svg>
            下载
          </button>
          <div className="asset-batch-divider" />
          <button
            type="button"
            className="asset-batch-cancel-btn"
            onClick={() => {
              setBatchMode(false);
              setSelectedIds(new Set());
            }}
          >
            取消批量操作
          </button>
        </div>
      );
    }
    return (
      <div className="asset-toolbar-right">
        <button type="button" className="asset-batch-btn" onClick={() => setBatchMode(true)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 10l6-6 6 6M4 13h8" />
          </svg>
          批量操作
        </button>
        <div className="asset-search-box">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="4" />
            <path d="M10 10l3 3" />
          </svg>
          <input
            type="text"
            placeholder="搜索关键字"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <AppShell requireAuth>
      <div className="asset-page">
        {/* Top tabs */}
        <nav className="asset-top-nav">
          {assetTabs.map((tab) => (
            <button
              type="button"
              key={tab}
              className={`asset-top-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="asset-content">
          {/* Tabs with sub-tabs + toolbar: 作品 & 分身 */}
          {showSubTabs && subTabs.length > 0 && (
            <>
              <div className="asset-sub-tabs-row">
                {subTabs.map((tab) => (
                  <button
                    type="button"
                    key={tab}
                    className={`asset-sub-tab${activeSubTab === tab ? ' active' : ''}`}
                    onClick={() => setActiveSubTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
                <Toolbar />
              </div>

              {/* Banner (only for 作品) */}
              {showBanner && (
                <div className="asset-banner">
                  <span className="asset-banner-icon">!</span>
                  <span>特别提示：作品仅保留24小时</span>
                </div>
              )}
            </>
          )}

          {/* Tabs without sub-tabs: 音频, 素材, 文案 */}
          {!showSubTabs && (
            <div className="asset-toolbar-row">
              <div className="asset-toolbar-right">
                <button type="button" className="asset-batch-btn" onClick={() => setBatchMode(!batchMode)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 10l6-6 6 6M4 13h8" />
                  </svg>
                  批量操作
                </button>
                <div className="asset-search-box">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="7" cy="7" r="4" />
                    <path d="M10 10l3 3" />
                  </svg>
                  <input
                    type="text"
                    placeholder="搜索关键字"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 作品: card grid */}
          {showCards && (
            <div className="asset-grid">
              {filteredCards.map((card) => (
                <div key={card.id} className={`asset-card${batchMode ? ' batch-mode' : ''}`}>
                  {batchMode && (
                    <div className="asset-card-checkbox" onClick={() => toggleSelect(card.id)}>
                      <div className={`asset-checkbox${selectedIds.has(card.id) ? ' checked' : ''}`}>
                        {selectedIds.has(card.id) && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2">
                            <path d="M2 6l3 3 5-5" />
                          </svg>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="asset-card-image" onClick={() => !batchMode && setSelectedCard(card.src)}>
                    <Image src={card.src} alt="" width={320} height={320} />
                  </div>
                  <div className="asset-card-label">{card.type}</div>
                  {card.expired && (
                    <div className="asset-card-overlay">
                      <div className="asset-card-overlay-icon">i</div>
                      <p>视频作品已超出24小时，</p>
                      <p>无法进行播放/下载</p>
                      <p>可使用文案进行再次创作</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 分身: action cards + uploaded photos */}
          {showEmptyActions && (
            <div className="asset-empty-actions">
              {(AVATAR_ACTIONS[activeSubTab] || []).map((action) => (
                <button key={action.label} type="button" className="asset-action-card">
                  {avatarIcons[action.icon]}
                  <span>{action.label}</span>
                </button>
              ))}

              {/* Mock uploaded photo card */}
              <div className="asset-photo-card">
                <Image src="/images/cdn-2.png" alt="" width={160} height={200} />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="footer">
            <span>ICP备案号:</span>
            <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">辽ICP备2024044460号-8</a>
            <span style={{ margin: '0 8px' }}>|</span>
            <span>版权所有 Copyright @ 2024-2026 星巢引擎科技版权所有. All Rights Reserved.</span>
          </div>
        </div>

        {/* Detail drawer */}
        {selectedCard && (
          <AssetDetailDrawer src={selectedCard} onClose={() => setSelectedCard(null)} />
        )}
      </div>
    </AppShell>
  );
}
