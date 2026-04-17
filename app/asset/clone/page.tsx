'use client';

import { useState } from 'react';
import { AppShell } from '@/components/shell/app-shell';

const cloneTabs = ['照片形象', '燃动分身', '对口型'] as const;

const exampleImages = [
  '/images/cdn-2.png',
  '/images/cdn-3.jpg',
  '/images/cdn-4.png',
  '/images/cdn-5.jpg',
  '/images/ba91e81c1a7b02544c6b61d852aacc.png',
  '/images/36ba636d5351f39326d46f4fec61fc.jpg',
];

const tabConfig: Record<string, {
  uploadHint: string;
  hasBananaBtn: boolean;
  placeholder: string;
  exampleLabel: string;
  formula: string;
  resultLabel: string;
  ratios: string[];
  durationOptions: string[];
  countOptions: string[];
  qualityOptions: string[];
  points: number;
}> = {
  照片形象: {
    uploadHint: '可添加多张参考图',
    hasBananaBtn: false,
    placeholder: '简单描述你的创意想法',
    exampleLabel: '创意形象示例 (点击使用提示词):',
    formula: '图片+文本=',
    resultLabel: '照片形象',
    ratios: ['9:16', '16:9', '1:1', '4:3'],
    durationOptions: [],
    countOptions: ['1张', '2张', '4张'],
    qualityOptions: ['普通1K', '高清2K', '超清4K'],
    points: 4,
  },
  燃动分身: {
    uploadHint: '仅支持1张参考图',
    hasBananaBtn: true,
    placeholder: '可添加描述驱动创意提示词及口播文案内容【10秒口播文案内容控制在45-70字之间】',
    exampleLabel: '创意驱动示例 (点击使用提示词):',
    formula: '照片形象+文本=',
    resultLabel: '视频分身',
    ratios: ['9:16'],
    durationOptions: ['10秒', '5秒'],
    countOptions: [],
    qualityOptions: [],
    points: 50,
  },
  对口型: {
    uploadHint: '仅支持1张参考图',
    hasBananaBtn: false,
    placeholder: '可添加描述驱动创意提示词及口播文案内容【10秒口播文案内容控制在45-70字之间】',
    exampleLabel: '创意驱动示例 (点击使用提示词):',
    formula: '照片形象+文本=',
    resultLabel: '对口型视频',
    ratios: ['9:16'],
    durationOptions: ['10秒', '5秒'],
    countOptions: [],
    qualityOptions: [],
    points: 10,
  },
};

export default function AssetClonePage() {
  const [activeTab, setActiveTab] = useState<string>(cloneTabs[0]);
  const [description, setDescription] = useState('');
  const [ratio, setRatio] = useState<string>('9:16');
  const [quality, setQuality] = useState<string>('普通1K');
  const [count, setCount] = useState<string>('1张');
  const [duration, setDuration] = useState<string>('10秒');

  const config = tabConfig[activeTab];

  return (
    <AppShell requireAuth>
      <div className="clone-page">
        {/* Header with sub-tabs */}
        <div className="clone-header">
          <nav className="clone-sub-tabs">
            {cloneTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`clone-sub-tab${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
          <div className="clone-header-actions">
            <div className="clone-search-box">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="7" cy="7" r="4" />
                <path d="M10 10l3 3" />
              </svg>
              <input type="text" placeholder="搜索关键字" />
            </div>
            <button type="button" className="clone-history-btn">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 1v5h5M12.5 4.5A6 6 0 101 7" />
              </svg>
              历史记录
            </button>
          </div>
        </div>

        {/* Main two-panel layout */}
        <div className="clone-main">
          {/* Left: form */}
          <div className="clone-form">
            {/* Reference image upload */}
            <div className="clone-upload-area">
              <div className="clone-upload-left">
                <div className="clone-upload-placeholder">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                    <rect x="6" y="10" width="24" height="20" rx="2" />
                    <circle cx="14" cy="18" r="4" />
                    <path d="M30 14l6 6" />
                    <path d="M36 14v6" />
                  </svg>
                </div>
                <div className="clone-upload-text">
                  <span>添加参考图片</span>
                  <span className="clone-upload-or">或</span>
                  <button type="button" className="clone-upload-link">素材库</button>
                  <span className="clone-upload-or">或</span>
                  <button type="button" className="clone-upload-link">香蕉作品</button>
                </div>
                <p className="clone-upload-hint">{config.uploadHint}</p>
              </div>
              {config.hasBananaBtn && (
                <div className="clone-upload-banana">
                  <span>🍌</span>
                  <span>香蕉</span>
                  <span>生图/改图</span>
                </div>
              )}
            </div>

            {/* Description textarea */}
            <div className="clone-description-area">
              <textarea
                placeholder={config.placeholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Script section */}
            <div className="clone-script-section">
              <div className="clone-script-header">
                <button type="button" className="clone-script-write-btn">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 1l3 3-8 8H2v-3z" />
                  </svg>
                  分镜脚本撰写
                </button>
                <div className="clone-script-meta">
                  <span className="clone-script-count">{description.length}/1000</span>
                  <span className="clone-script-divider">|</span>
                  <button type="button" className="clone-script-clear">清空</button>
                </div>
              </div>

              {/* Example images row */}
              <div className="clone-example-header">
                <span>{config.exampleLabel}</span>
                <button type="button" className="clone-example-more">全部&gt;</button>
              </div>
              <div className="clone-example-row">
                {exampleImages.map((src, i) => (
                  <div key={i} className="clone-example-thumb">
                    <img src={src} alt="" />
                    <span className="clone-example-thumb-label">动作表情<br />描述参考</span>
                  </div>
                ))}
              </div>

              <p className="clone-disclaimer">注：智能生成的内容仅供参考，不代表平台立场</p>
            </div>
          </div>

          {/* Right: info panel */}
          <div className="clone-info">
            <h3 className="clone-info-title">{activeTab}</h3>
            <p className="clone-info-subtitle">
              {config.formula}<span className="clone-info-highlight">{config.resultLabel}</span>
            </p>

            {/* Example workflow */}
            <div className="clone-info-example">
              <div className="clone-example-card">
                <img src="/images/cdn-4.png" alt="" className="clone-example-img" />
                <span className="clone-example-label">
                  {activeTab === '燃动分身' || activeTab === '对口型' ? '照片形象' : '图片'}
                </span>
              </div>
              <div className="clone-example-arrow">→</div>
              <div className="clone-example-card text-card">
                <div className="clone-example-text-block">
                  <p className="clone-text-title">一段创意描述:</p>
                  <p className="clone-text-body">8K超高清写实人像摄影，高颜值年轻东方女性，半身近景（胸口上），正对镜头平视</p>
                  <span className="clone-text-a">Aa</span>
                </div>
                <span className="clone-example-label">文本</span>
              </div>
              <div className="clone-example-arrow">→</div>
              <div className="clone-example-card">
                <img src="/images/cdn-2.png" alt="" className="clone-example-img" />
                <span className="clone-example-label">{config.resultLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div className="clone-footer">
          <div className="clone-footer-settings">
            <div className="clone-dropdown">
              <span>📱</span>
              <select value={ratio} onChange={(e) => setRatio(e.target.value)}>
                {config.ratios.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            {config.durationOptions.length > 0 && (
              <div className="clone-dropdown">
                <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                  {config.durationOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            )}
            {config.qualityOptions.length > 0 && (
              <div className="clone-dropdown">
                <select value={quality} onChange={(e) => setQuality(e.target.value)}>
                  {config.qualityOptions.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
            )}
            {config.countOptions.length > 0 && (
              <div className="clone-dropdown">
                <select value={count} onChange={(e) => setCount(e.target.value)}>
                  {config.countOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <button type="button" className="clone-generate-btn">
            立即生成
            <span className="clone-points">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 8.5 3 10.5l.5-3.5L1 4.5 4.5 4z" />
              </svg>
              {config.points}点/次
            </span>
          </button>
        </div>
      </div>
    </AppShell>
  );
}
