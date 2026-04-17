'use client';

import { useState } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import {
  biandaoLibraryItems,
  biandaoProjectCards,
  biandaoProjectSubTabs,
  biandaoScriptCards,
  biandaoScriptTabs,
  biandaoTabs,
  biandaoIndustryPersonas,
  biandaoIndustryTabs,
  biandaoIndustryTemplates,
  biandaoWriteCategories,
} from '@/lib/mock/biandao';

export default function BiandaoPage() {
  const [activeTab, setActiveTab] = useState<string>(biandaoTabs[0]);
  const [scriptTab, setScriptTab] = useState<string>(biandaoScriptTabs[0]);
  const [projectSubTab, setProjectSubTab] = useState<string>(biandaoProjectSubTabs[0]);
  const [industryTab, setIndustryTab] = useState<string>(biandaoIndustryTabs[0]);
  const [writeCategory, setWriteCategory] = useState<string>(biandaoWriteCategories[0]);

  return (
    <AppShell requireAuth layoutClassName="biandao-app-layout" mainClassName="biandao-main" scrollClassName="biandao-scroll">
      <div className="biandao-page">
        {/* Top tabs */}
        <nav className="biandao-top-nav">
          {biandaoTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`biandao-top-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Tab content */}
        <div className="biandao-content">
          {/* 文案二创 */}
          {activeTab === '文案二创' && (
            <div className="biandao-tab-content">
              <div className="biandao-section">
                <div className="biandao-script-header">
                  <div className="biandao-script-tabs">
                    {biandaoScriptTabs.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`biandao-sub-tab${scriptTab === tab ? ' active' : ''}`}
                        onClick={() => setScriptTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="biandao-script-search">
                    <div className="biandao-script-search-box">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                      </svg>
                      <input type="text" placeholder="粘贴对标视频链接开始解析" />
                    </div>
                    <button type="button" className="biandao-action-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      获取文案
                    </button>
                  </div>
                </div>

                <div className="biandao-card-grid">
                  {biandaoScriptCards.map((card) => (
                    <button key={card.title} type="button" className="biandao-feature-card" style={{ '--card-color': card.color } as React.CSSProperties}>
                      <div className="biandao-feature-icon" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}44)` }}>
                        <span>{card.icon === 'script' ? '📝' : card.icon === 'edit' ? '✏️' : card.icon === 'title' ? '📌' : '🎬'}</span>
                      </div>
                      <div className="biandao-feature-info">
                        <strong>{card.title}</strong>
                        <span>{card.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 立项管理 */}
          {activeTab === '立项管理' && (
            <div className="biandao-tab-content">
              <div className="biandao-project-top">
                {biandaoProjectCards.map((card) => (
                  <button key={card.name} type="button" className="biandao-project-card" style={{ '--card-color': card.color } as React.CSSProperties}>
                    <div className="biandao-project-icon" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}44)` }}>
                      <span>{card.icon === 'character' ? '👤' : card.icon === 'product' ? '📦' : '🏪'}</span>
                    </div>
                    <div className="biandao-project-info">
                      <strong>{card.name}</strong>
                      <span>{card.desc}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="biandao-section">
                <div className="biandao-project-sub-tabs">
                  {biandaoProjectSubTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`biandao-sub-tab${projectSubTab === tab ? ' active' : ''}`}
                      onClick={() => setProjectSubTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="biandao-empty-state">
                  <div className="biandao-empty-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <p>还没有人设立项哦~</p>
                  <button type="button" className="biandao-create-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    创建人设
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 行业选题 */}
          {activeTab === '行业选题' && (
            <div className="biandao-tab-content">
              <div className="biandao-section">
                <div className="biandao-industry-bar">
                  <div className="biandao-industry-select">
                    <span className="biandao-industry-label">人设管理</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                  <div className="biandao-industry-value">
                    {biandaoIndustryPersonas.map((p) => (
                      <span key={p.name} className="biandao-industry-tag">{p.name}</span>
                    ))}
                  </div>
                  <button type="button" className="biandao-action-btn">获取行业创意</button>
                </div>
              </div>

              <div className="biandao-section">
                <div className="biandao-industry-sub-tabs">
                  {biandaoIndustryTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`biandao-sub-tab${industryTab === tab ? ' active' : ''}`}
                      onClick={() => setIndustryTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="biandao-template-grid">
                  {biandaoIndustryTemplates.map((row, rowIndex) => (
                    <div key={rowIndex} className="biandao-template-row">
                      {row.map((template) => (
                        <button key={template} type="button" className="biandao-template-card">
                          {template}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 文案自创 */}
          {activeTab === '文案自创' && (
            <div className="biandao-tab-content">
              <div className="biandao-section">
                <div className="biandao-write-bar">
                  <div className="biandao-write-tabs">
                    {biandaoWriteCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className={`biandao-sub-tab${writeCategory === cat ? ' active' : ''}`}
                        onClick={() => setWriteCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <button type="button" className="biandao-action-btn">开始创作</button>
                </div>
              </div>

              <div className="biandao-section">
                <div className="biandao-write-textarea">
                  <textarea placeholder="描述你想要的文案风格、主题、受众..." rows={8} />
                </div>
                <div className="biandao-write-footer">
                  <div className="biandao-write-options">
                    <label className="biandao-option">
                      <input type="checkbox" /> 使用AI润色
                    </label>
                    <label className="biandao-option">
                      <input type="checkbox" /> 添加表情符号
                    </label>
                    <label className="biandao-option">
                      <input type="checkbox" /> 自动分段
                    </label>
                  </div>
                  <button type="button" className="biandao-generate-btn">
                    <span>生成文案</span>
                    <span className="cost">20点/次</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 我的文案库 */}
          {activeTab === '我的文案库' && (
            <div className="biandao-tab-content">
              <div className="biandao-library-grid">
                {biandaoLibraryItems.map((item, index) => (
                  <article key={index} className="biandao-library-card">
                    <div className="biandao-library-header">
                      <strong>{item.title}</strong>
                      <span>{item.subtitle}</span>
                    </div>
                    <p className="biandao-library-content">{item.content}</p>
                    <div className="biandao-library-tags">
                      {item.tags.map((tag) => (
                        <span key={tag} className="biandao-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="biandao-library-footer">
                      <span className="biandao-library-source">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        {item.source}
                      </span>
                      <button type="button" className="biandao-library-action">复制</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
