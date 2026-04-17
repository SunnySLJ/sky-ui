'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  currentTab: string;
  onTabChange: (tab: string) => void;
  currentModel: string;
  onModelChange: (model: string) => void;
  currentCategory: string;
  onCategoryChange: (category: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  models: string[];
  categories: string[];
};

export function FilterBar(props: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tabs = ['灵感案例', '教程视频'];

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="filter-section">
      <div className="filter-tabs-row">
        <div className="header-tabs">
          {tabs.map((tab) => (
            <button type="button" key={tab} className={`header-tab ${props.currentTab === tab ? 'active' : ''}`} onClick={() => props.onTabChange(tab)}>{tab}</button>
          ))}
        </div>
        <div className="search-box">
          <span className="search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.34-4.34" />
            </svg>
          </span>
          <input value={props.search} onChange={(event) => props.onSearchChange(event.target.value)} placeholder="关键字搜索" />
        </div>
      </div>
      <div className="category-bar">
        <div className="category-model-wrap" ref={dropdownRef}>
          <button type="button" className={`category-model-btn ${open ? 'active' : ''}`} onClick={() => setOpen((value) => !value)}>
            {props.currentModel}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M3 4.5l3 3 3-3" /></svg>
          </button>
          {open ? (
            <div className="category-model-menu">
              {props.models.map((model) => (
                <button
                  key={model}
                  type="button"
                  className={`category-model-option ${props.currentModel === model ? 'active' : ''}`}
                  onClick={() => {
                    props.onModelChange(model);
                    setOpen(false);
                  }}
                >
                  <span>{model}</span>
                  {props.currentModel === model ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="category-tabs">
          {props.categories.map((category) => (
            <button type="button" key={category} className={`category-tab ${props.currentCategory === category ? 'active' : ''}`} onClick={() => props.onCategoryChange(category)}>{category}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
