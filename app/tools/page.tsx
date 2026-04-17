'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import { toolsModels, toolsCategories, toolsGalleryItems, toolsBanner } from '@/lib/mock/tools';

export default function ToolsPage() {
  const [activeFilter, setActiveFilter] = useState('灵感案例');
  const [activeCategory, setActiveCategory] = useState('全部');
  const [search, setSearch] = useState('');

  const filteredItems = toolsGalleryItems.filter((item) => {
    const matchCategory = activeCategory === '全部' || item.category === activeCategory;
    const keyword = search.trim().toLowerCase();
    const matchSearch = !keyword || item.title.toLowerCase().includes(keyword) || item.author.toLowerCase().includes(keyword);
    return matchCategory && matchSearch;
  });

  return (
    <AppShell layoutClassName="tools-app-layout" mainClassName="tools-main" scrollClassName="tools-scroll">
      <div className="tools-page">
        {/* Banner */}
        <div className="tools-banner">
          <div className="tools-banner-card">
            <div className="tools-banner-info">
              <h2>{toolsBanner.title}</h2>
              <p>{toolsBanner.desc}</p>
              <button type="button" className="tools-banner-btn">立即体验</button>
            </div>
            <div className="tools-banner-image">
              <Image src={toolsBanner.image} alt={toolsBanner.title} width={200} height={120} />
            </div>
          </div>
        </div>

        {/* Model cards */}
        <div className="tools-models">
          {toolsModels.map((model) => (
            <button key={model.name} type="button" className={`tools-model-card${model.featured ? ' featured' : ''}`}>
              <div className="tools-model-icon">
                <Image src={model.icon} alt={model.name} width={40} height={40} />
              </div>
              <div>
                <div className="tools-model-name">{model.name}</div>
                <div className="tools-model-desc">{model.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div className="tools-filter-bar">
          <div className="tools-filter-tabs">
            {['灵感案例', '教程视频'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`tools-filter-tab${activeFilter === tab ? ' active' : ''}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="tools-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.34-4.34" />
            </svg>
            <input
              type="text"
              placeholder="搜索关键字"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Category tags */}
        <div className="tools-category-tags">
          {toolsCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`tools-category-tag${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <div className="tools-gallery">
          {filteredItems.map((item, index) => (
            <div key={index} className="tools-gallery-card">
              <div className="tools-gallery-image">
                <Image src={item.cover} alt={item.title} width={300} height={item.height || 200} />
              </div>
              <div className="tools-gallery-overlay">
                <div className="tools-gallery-source">
                  <span className="tools-gallery-author">{item.author}</span>
                  <div className="tools-gallery-actions">
                    <button type="button" className="tools-gallery-action">做同款</button>
                  </div>
                </div>
                <div className="tools-gallery-info">
                  <p className="tools-gallery-title">{item.title}</p>
                </div>
                <div className="tools-gallery-stats">
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="footer">
          <span>ICP备案号:</span>
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">辽ICP备2024044460号-8</a>
          <span style={{ margin: '0 8px' }}>|</span>
          <span>版权所有 Copyright @ 2024-2026 星巢引擎科技版权所有. All Rights Reserved.</span>
        </div>
      </div>
    </AppShell>
  );
}
