'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import { ModelTabs } from '@/components/workspace/model-tabs';
import { PromptPanel } from '@/components/workspace/prompt-panel';
import { SelectBox } from '@/components/workspace/select-box';
import { videoHistoryEntries, videoModels, videoSelects } from '@/lib/mock/video';
import styles from './page.module.css';

export default function VideoPage() {
  const [ratio, setRatio] = useState(videoSelects.ratio[0]);
  const [duration, setDuration] = useState(videoSelects.duration[0]);
  const [count, setCount] = useState(videoSelects.count[0]);
  const [quality, setQuality] = useState(videoSelects.quality[0]);

  return (
    <AppShell
      requireAuth
      layoutClassName={styles.videoAppLayout}
      mainClassName={styles.videoMainContent}
      scrollClassName={styles.videoMainScroll}
    >
      <div className={styles.page}>
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <div className={styles.tabs}>
              <ModelTabs items={videoModels} />
            </div>
          </div>
          <div className={styles.topBarRight}>
            <label className={styles.search}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input type="text" placeholder="搜索关键字" />
            </label>
            <button type="button" className={styles.historyButton}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              历史记录
            </button>
          </div>
        </div>
        <div className={styles.workspace}>
          <div className={styles.leftColumn}>
            <div className={styles.uploadRow}>
              <div className={styles.uploadMain}>
                <div className={styles.uploadIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="4 2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 16-5-5L5 22" />
                  </svg>
                </div>
                <div className={styles.uploadCopy}>
                  <div className={styles.uploadLabel}>添加参考图片 或 素材库 或 香蕉作品</div>
                  <div className={styles.uploadHint}>画面超真实，逻辑不翻车</div>
                </div>
              </div>
              <div className={styles.uploadSide}>
                <div className={styles.uploadSideIcon}>🍌</div>
                <div className={styles.uploadSideLabel}>
                  <span>香蕉</span>
                  <span>生图/改图</span>
                  <span>选填</span>
                </div>
              </div>
            </div>

            <div className={styles.promptShell}>
              <div className={styles.roleStub}>
                <span>+</span>
                <div>角色</div>
              </div>
              <div className={styles.promptArea}>
                <PromptPanel placeholder="简单描述你的视频创作。如：一个年轻的女孩对着镜头微笑说笑" />
              </div>
              <div className={styles.promptDivider} />
              <div className={styles.promptFooter}>
                <div className={styles.caseLink}>
                  <span>灵感案例</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                    <path d="M4.2 2.7 7.5 6l-3.3 3.3.9.9L9.3 6 5.1 1.8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className={styles.disclaimer}>注：智能生成的内容仅供参考，不代表平台立场</div>

            <div className={styles.bottomBar}>
              <SelectBox value={ratio} options={videoSelects.ratio} onChange={setRatio} />
              <SelectBox value={duration} options={videoSelects.duration} onChange={setDuration} />
              <SelectBox value={count} options={videoSelects.count} onChange={setCount} />
              <SelectBox value={quality} options={videoSelects.quality} onChange={setQuality} />
              <button type="button" className={styles.generateButton}>
                <span>立即生成</span>
                <span>20点/次</span>
              </button>
            </div>
          </div>

          <aside className={styles.rightColumn}>
            <div className={styles.rightTitle}>历史记录</div>
            <div className={styles.historyList}>
              {videoHistoryEntries.map((entry, index) => (
                <article key={`${entry.date}-${index}`} className={styles.historyCard}>
                  <div className={styles.thumbRow}>
                    {entry.thumbs.map((thumb) => (
                      <div key={`${thumb}-${index}`} className={styles.thumb}>
                        <Image src={thumb} alt="" width={30} height={30} />
                      </div>
                    ))}
                    <div className={styles.thumbMore}>{entry.moreLabel}</div>
                  </div>
                  <p className={styles.historyPrompt}>{entry.prompt}</p>
                  <div className={styles.tagRow}>
                    {entry.tags.map((tag, tagIndex) => (
                      <span key={`${tag}-${tagIndex}`} className={styles.tag}>
                        {tagIndex === 0 ? <span className={styles.tagIcon} /> : null}
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={styles.previewWrap}>
                    <div className={styles.preview}>
                      <Image src={entry.preview} alt="" width={132} height={176} />
                      <div className={styles.previewOverlay}>
                        <div>
                          <div className={styles.warningIcon}>!</div>
                          <p>视频作品已超出24小时，无法进行播放/下载，可使用文案进行再次创作</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.cardBottom}>
                    <span className={styles.date}>{entry.date}</span>
                    <div className={styles.actions}>
                      {entry.actions.map((action, actionIndex) => (
                        <span key={action} className={styles.action}>
                          {actionIndex === 0 ? <span className={styles.actionIcon}>✦</span> : null}
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
