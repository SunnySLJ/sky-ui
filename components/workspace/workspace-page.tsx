import { AppShell } from '@/components/shell/app-shell';
import { HistoryPanel } from '@/components/workspace/history-panel';
import { ModelTabs } from '@/components/workspace/model-tabs';
import { PromptPanel } from '@/components/workspace/prompt-panel';
import { UploadPanel } from '@/components/workspace/upload-panel';

export function WorkspacePage({
  models,
  title,
  hint,
  placeholder,
  thumbs,
  selects,
  history,
  accentLabel,
  summary,
  inspirationPills = [],
  costLabel = '30点/次',
}: {
  models: string[];
  title: string;
  hint: string;
  placeholder: string;
  thumbs: string[];
  selects?: {
    ratio: string[];
    duration: string[];
    count: string[];
    quality: string[];
  };
  history?: {
    prompt: string;
    tags: string[];
    preview: string;
    date: string;
    actions: string[];
  };
  accentLabel?: string;
  summary?: string;
  inspirationPills?: string[];
  costLabel?: string;
}) {
  const resolvedSelects = selects ?? {
    ratio: ['1:1'],
    duration: ['默认'],
    count: ['1条'],
    quality: ['标准'],
  };
  const resolvedHistory = history ?? {
    prompt: '历史记录正在接入中，当前版本先保留工作台布局与基础体验。',
    tags: ['演示模式'],
    preview: thumbs[0] ?? '/images/cdn-4.png',
    date: '创建于：2026-04-16 12:00',
    actions: ['再次生成'],
  };

  return (
    <AppShell requireAuth>
      <div className="gen-page-head">
        <div>
          <div className="gen-page-kicker">{accentLabel ?? '创作工作台'}</div>
          <h1>{title}</h1>
          <p>{summary ?? hint}</p>
        </div>
        <div className="gen-page-status">
          <span>模型已就绪</span>
          <strong>演示模式</strong>
        </div>
      </div>
      <div className="gen-model-bar">
        <ModelTabs items={models} />
        <div className="gen-model-actions">
          <div className="gen-search-mini">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.34-4.34" /></svg>
            <input type="text" placeholder="搜索关键字" />
          </div>
          <button type="button" className="gen-history-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="9" /></svg>
            历史记录
          </button>
        </div>
      </div>
      <div className="gen-layout gen-layout-video">
        <div className="gen-sidebar gen-sidebar-video">
          <UploadPanel title={title} hint={hint} />
          <div className="gen-character-btn"><span>+ 角色</span></div>
          <PromptPanel placeholder={placeholder} />
          {inspirationPills.length > 0 ? (
            <div className="gen-pill-row">
              {inspirationPills.map((pill) => (
                <button key={pill} type="button" className="gen-pill">{pill}</button>
              ))}
            </div>
          ) : null}
          <div className="gen-ref-case">
            <span className="gen-ref-label">灵感案例</span>
            <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M3 4.5l3 3 3-3" /></svg>
          </div>
          <div className="gen-helper-note">
            <strong>生成建议</strong>
            <span>先明确主体、镜头语言和输出场景，再调整比例、时长和质量。</span>
          </div>
          <div className="gen-bottom-bar">
            <div className="gen-settings-row">
              <select className="gen-setting-select">{resolvedSelects.ratio.map((option) => <option key={option}>{option}</option>)}</select>
              <select className="gen-setting-select">{resolvedSelects.duration.map((option) => <option key={option}>{option}</option>)}</select>
              <select className="gen-setting-select">{resolvedSelects.count.map((option) => <option key={option}>{option}</option>)}</select>
              <select className="gen-setting-select">{resolvedSelects.quality.map((option) => <option key={option}>{option}</option>)}</select>
            </div>
            <button type="button" className="gen-generate-btn gen-generate-btn-video"><span>立即生成</span><span className="cost">{costLabel}</span></button>
          </div>
          <div className="gen-disclaimer">注：智能生成的内容仅供参考，不代表平台立场</div>
        </div>
        <HistoryPanel thumbs={thumbs} history={resolvedHistory} />
      </div>
    </AppShell>
  );
}
