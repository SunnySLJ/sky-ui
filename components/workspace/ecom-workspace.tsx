'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from '@/app/ecom/page.module.css';

const modes = ['中文电商', '跨境电商'];
const previewImages = ['/images/banana-case-2.png', '/images/banana-case-4.png', '/images/banana-case-1.png'];
const outputTypes = ['详情图', '主图', '场景图'];
const languages = ['中文简体', 'English', '中文繁体'];
const platforms = ['淘宝', '抖音', '拼多多', '小红书'];
const ratios = ['智能比例', '1:1', '4:3', '3:4', '16:9'];
const counts = ['5', '1', '2', '4'];

function Select({
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
    <div ref={rootRef} className={`${styles.selectbox} ${open ? styles.selectboxOpen : ''} ${className}`.trim()}>
      <button
        type="button"
        className={styles.selectTrigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.selectLabel}>{value}</span>
        <svg className={styles.selectIcon} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <div className={styles.selectMenu} role="listbox">
          {orderedOptions.map((option, index) => {
            const selected = option === value;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
                className={`${styles.selectOption} ${selected ? styles.selectOptionSelected : ''} ${index === 0 ? styles.selectOptionTop : ''}`.trim()}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                <span>{option}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function EcomWorkspace() {
  const [activeMode, setActiveMode] = useState(modes[0]);
  const [prompt, setPrompt] = useState('');
  const [outputType, setOutputType] = useState(outputTypes[0]);
  const [language, setLanguage] = useState(languages[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [ratio, setRatio] = useState(ratios[0]);
  const [count, setCount] = useState(counts[0]);

  const promptLength = useMemo(() => prompt.length, [prompt]);

  return (
    <div className={styles.body}>
      <section className={styles.editor}>
        <div className={styles.modeBar}>
          {modes.map((mode) => (
            <button
              key={mode}
              type="button"
              className={`${styles.modeBtn} ${activeMode === mode ? styles.modeBtnActive : ''}`.trim()}
              onClick={() => setActiveMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className={styles.editorPanel}>
          <button type="button" className={styles.uploadCard}>
            <div className={styles.uploadIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
            <div className={styles.uploadCopy}>
              <div className={styles.uploadLine}>添加参考图片 <span>或</span> 素材库 <span>或</span> 香蕉作品</div>
              <div className={styles.uploadHint}>请上传1-6张图片</div>
            </div>
          </button>

          <textarea
            className={styles.textarea}
            placeholder="简单描述你的图片创作。如：一个年轻的化妆女孩对着镜头微笑"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />

          <div className={styles.promptTools}>
            <div className={styles.counter}>
              <span>{promptLength}/1000</span>
              <button type="button" className={styles.clearBtn} onClick={() => setPrompt('')}>清空</button>
            </div>
          </div>

          <button type="button" className={styles.caseEntry}>
            <span>灵感案例</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 2.5 7.5 6 4 9.5" /></svg>
          </button>
          <div className={styles.editorFooter}>
            <div className={styles.primarySelects}>
              <Select className={`${styles.select} ${styles.selectType}`} value={outputType} options={outputTypes} onChange={setOutputType} />
              <Select className={`${styles.select} ${styles.selectLanguage}`} value={language} options={languages} onChange={setLanguage} />
              <Select className={`${styles.select} ${styles.selectPlatform}`} value={platform} options={platforms} onChange={setPlatform} />
            </div>
            <div className={styles.panelNote}>注：智能生成的内容仅供参考，不代表平台立场</div>
            <div className={styles.bottomControls}>
              <div className={styles.selects}>
                <Select className={`${styles.select} ${styles.selectRatio}`} value={ratio} options={ratios} onChange={setRatio} />
                <Select className={`${styles.select} ${styles.selectCount}`} value={count} options={counts} onChange={setCount} />
              </div>
              <button type="button" className={styles.generateBtn}>
                <span>立即生成</span>
                <span className={styles.cost}>150点/次</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <aside className={styles.side}>
        <div className={styles.sideTop}>
          <div className={styles.previewArea}>
            <div className={styles.previewTitle}>电商产品图片示例</div>
            <div className={styles.exampleGrid}>
              <div className={styles.exampleBlock}>
                <div className={styles.exampleRail}>
                  {previewImages.map((src, index) => (
                    <div key={src} className={styles.exampleThumb}>
                      <Image src={src} alt={`示例图 ${index + 1}`} width={82} height={82} />
                      <span className={`${styles.exampleBadge} ${styles.badgeGood}`}>✓</span>
                    </div>
                  ))}
                </div>
                <span className={styles.previewCaption}>产品的多角度拍摄</span>
              </div>
              <div className={styles.exampleBlock}>
                <div className={`${styles.exampleRail} ${styles.exampleRailClarity}`}>
                  {[previewImages[1], previewImages[2]].map((src, index) => (
                    <div key={src} className={`${styles.exampleThumb} ${styles.exampleThumbWide}`.trim()}>
                      <Image src={src} alt={`清晰度示例 ${index + 1}`} width={100} height={82} />
                      <span className={`${styles.exampleBadge} ${index === 0 ? styles.badgeGood : styles.badgeBad}`}>{index === 0 ? '✓' : '✕'}</span>
                    </div>
                  ))}
                </div>
                <span className={styles.previewCaption}>清晰度</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sideBottom}>
          <div className={styles.uploadZone}>
            <button type="button" className={styles.uploadRefBtn}>上传参考图</button>
            <div className={styles.uploadHintSmall}>
              将文件拖到此处，或从 <a href="#" className={styles.uploadLink}>素材库</a> 或 <a href="#" className={styles.uploadLink}>香蕉作品</a>
            </div>
            <div className={styles.uploadLimit}>图片不超过10MB，尺寸不小于300px</div>
          </div>
        </div>
      </aside>
    </div>
  );
}
