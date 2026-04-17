import { AppShell } from '@/components/shell/app-shell';
import { mixDirections, mixHistory, mixInfoFields, mixPromptSeeds } from '@/lib/mock/mix';

export default function MixPage() {
  return (
    <AppShell requireAuth>
      <section className="mix-page">
        <div className="page-heading">
          <div>
            <h1>AI 超级混剪</h1>
            <p>补齐行业信息、素材上传、提示词和历史记录，先把 `/mix` 做到可演示。</p>
          </div>
          <button type="button" className="director-primary-btn">导入作品</button>
        </div>

        <div className="mix-layout">
          <section className="page-section mix-main-panel">
            <div className="director-section-head">
              <h2>行业信息完善</h2>
              <span>生成前准备</span>
            </div>
            <div className="mix-info-grid">
              {mixInfoFields.map((field) => (
                <article key={field.label} className="mix-info-card">
                  <span>{field.label}</span>
                  <strong>{field.value}</strong>
                </article>
              ))}
            </div>

            <div className="mix-upload-card">
              <div>
                <strong>视频素材上传区</strong>
                <p>支持口播、门店环境、产品近景、案例证据等素材混合导入。</p>
              </div>
              <button type="button" className="director-primary-btn mix-upload-btn">上传素材</button>
            </div>

            <section className="mix-prompt-card">
              <div className="director-section-head">
                <h3>提示词输入区</h3>
                <span>支持复制后微调</span>
              </div>
              <textarea className="gen-textarea mix-textarea" defaultValue={mixPromptSeeds.join('\n')} />
              <div className="mix-directions">
                {mixDirections.map((item) => (
                  <button key={item} type="button" className="director-chip-btn">{item}</button>
                ))}
              </div>
              <div className="mix-bottom-bar">
                <div className="mix-cost-note">预计生成 3 条成片，消耗 120 点，时长约 4 分钟</div>
                <button type="button" className="gen-generate-btn"><span>立即生成</span><span className="cost">120点</span></button>
              </div>
            </section>
          </section>

          <aside className="page-section mix-history-panel">
            <div className="director-section-head">
              <h2>历史记录</h2>
              <span>最近混剪任务</span>
            </div>
            <div className="mix-history-list">
              {mixHistory.map((item) => (
                <article key={item.title} className="mix-history-item">
                  <div className="mix-history-top">
                    <strong>{item.title}</strong>
                    <span>{item.status}</span>
                  </div>
                  <p>{item.meta}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}
