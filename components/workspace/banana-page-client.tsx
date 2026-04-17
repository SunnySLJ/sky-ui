'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppShell } from '@/components/shell/app-shell';
import { bananaModes } from '@/lib/mock/banana';
import { EcomWorkspace } from '@/components/workspace/ecom-workspace';

const referenceImages = [
  '/images/banana-case-2.png',
  '/images/banana-case-4.png',
];

const ratios = ['1:1', '4:3', '16:9', '3:4', '9:16'];
const qualities = ['普通1K', '高清2K'];
const counts = ['1张', '2张', '4张'];

function BananaSelect({
  value,
  options,
  onChange,
  className = '',
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const orderedOptions = [value, ...options.filter((option) => option !== value)];

  return (
    <div ref={rootRef} className={`banana-selectbox ${className} ${open ? 'is-open' : ''}`.trim()}>
      <button
        type="button"
        className="banana-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="banana-select-trigger-label">{value}</span>
        <svg className="banana-select-trigger-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <div className="banana-select-menu" role="listbox">
          {orderedOptions.map((option, index) => {
            const selected = option === value;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
                className={`banana-select-option${selected ? ' is-selected' : ''}${index === 0 ? ' is-top' : ''}`}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                <span>{option}</span>
                {selected ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 6.5 5 9l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function BananaWorkspace() {
  const [activeModel, setActiveModel] = useState('极速版');
  const [prompt, setPrompt] = useState('');
  const [ratio, setRatio] = useState(ratios[0]);
  const [quality, setQuality] = useState(qualities[0]);
  const [count, setCount] = useState(counts[0]);

  const promptLength = useMemo(() => prompt.length, [prompt]);

  return (
    <div className="banana-body">
      <section className="banana-editor">
        <div className="banana-mode-bar">
          {bananaModes.slice(1).map((mode) => (
            <button
              key={mode}
              type="button"
              className={`banana-mode-btn${activeModel === mode ? ' active' : ''}`}
              onClick={() => setActiveModel(mode)}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="banana-editor-panel">
          <button type="button" className="banana-upload-card">
            <div className="banana-upload-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
            <div className="banana-upload-copy">
              <div className="banana-upload-line">添加参考图片 <span>或</span> 素材库 <span>或</span> 香蕉作品</div>
              <div className="banana-upload-hint">图片不超过10MB，尺寸不小于300px</div>
            </div>
          </button>

          <textarea
            className="banana-textarea"
            placeholder="简单描述你的图片创作。如：一个年轻 时尚 的女孩对着镜头微笑"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />

          <div className="banana-prompt-tools">
            <button type="button" className="banana-polish-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" /></svg>
              分镜脚本撰写
            </button>
            <div className="banana-counter">
              <span>{promptLength}/1000</span>
              <button type="button" className="banana-clear-btn" onClick={() => setPrompt('')}>清空</button>
            </div>
          </div>

          <button type="button" className="banana-case-entry">
            <span>灵感案例</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 2.5 7.5 6 4 9.5" /></svg>
          </button>
          <div className="banana-editor-footer">
            <div className="banana-panel-note">注：智能生成的内容仅供参考，不代表平台立场</div>
            <div className="banana-bottom-controls">
              <div className="banana-selects">
                <BananaSelect className="banana-select banana-select-ratio" value={ratio} options={ratios} onChange={setRatio} />
                <BananaSelect className="banana-select banana-select-quality" value={quality} options={qualities} onChange={setQuality} />
                <BananaSelect className="banana-select banana-select-count" value={count} options={counts} onChange={setCount} />
              </div>
              <button type="button" className="banana-generate-btn">
                <span>立即生成</span>
                <span className="cost">4点/次</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <aside className="banana-side">
        <div className="banana-side-top">
          <div className="banana-preview-area">
            <div className="banana-preview-title">两步完成生图/改图</div>
            <div className="banana-preview-reference">
              <div className="banana-preview-card">
                <div className="banana-preview-flow-card banana-preview-flow-card-images">
                  <div className="banana-flow-thumb banana-flow-thumb-left">
                    <Image src={referenceImages[0]} alt="参考图 1" width={64} height={64} />
                  </div>
                  <div className="banana-flow-thumb banana-flow-thumb-right">
                    <Image src={referenceImages[1]} alt="参考图 2" width={64} height={64} />
                  </div>
                </div>
                <span className="banana-preview-caption">添加参考图</span>
              </div>
              <div className="banana-preview-plus">+</div>
              <div className="banana-preview-card">
                <div className="banana-preview-flow-card banana-preview-flow-card-script">
                  <div className="banana-script-card-note">
                    短视频脚本方向
                    <br />
                    人物介绍、电商卖点
                    <br />
                    个性标签、文案排版
                  </div>
                  <div className="banana-script-card-arrow">→</div>
                  <div className="banana-script-card-aa">Aa</div>
                </div>
                <span className="banana-preview-caption">脚本撰写</span>
              </div>
            </div>
          </div>
        </div>

        <div className="banana-side-bottom">
          <div className="banana-upload-zone">
            <button type="button" className="banana-upload-ref-btn">上传参考图</button>
            <div className="banana-upload-hint-small">
              将文件拖到此处，或从 <a href="#" className="banana-upload-link">素材库</a> 或 <a href="#" className="banana-upload-link">香蕉作品</a>
            </div>
            <div className="banana-upload-limit">图片不超过10MB，尺寸不小于300px</div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function BananaPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') === 'ecom' ? 'ecom' : 'banana';

  function switchTab(tab: 'banana' | 'ecom') {
    router.push(tab === 'banana' ? '/banana' : '/banana?tab=ecom');
  }

  return (
    <AppShell requireAuth>
      <div className="banana-page">
        <div className="banana-topbar">
          <div className="banana-topbar-left">
            <button
              type="button"
              className={`banana-sublink banana-top-tab${activeTab === 'banana' ? ' active' : ''}`}
              onClick={() => switchTab('banana')}
            >
              香蕉图片
            </button>
            <button
              type="button"
              className={`banana-sublink banana-top-tab${activeTab === 'ecom' ? ' active' : ''}`}
              onClick={() => switchTab('ecom')}
            >
              电商主图/详情图
            </button>
          </div>
          <div className="gen-model-actions">
            <div className="gen-search-mini">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.34-4.34" /></svg>
              <input type="text" placeholder="搜索关键词" />
            </div>
            <button type="button" className="gen-history-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="9" /></svg>
              历史记录
            </button>
          </div>
        </div>

        {activeTab === 'ecom' ? <EcomWorkspace /> : <BananaWorkspace />}
      </div>
    </AppShell>
  );
}
