import Image from 'next/image';

export function AuthShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image">
          <Image src="/images/login-bg.png" alt="auth background" fill sizes="50vw" style={{ objectFit: 'cover' }} />
          <div className="auth-image-overlay" />
          <div className="auth-image-content">
            <div className="auth-image-pill">Timarsky Creative OS</div>
            <h1>让灵感、文案、视频与资产管理在一个工作台里闭环。</h1>
            <p>面向内容创作者、电商团队与品牌运营的 AI 创作工作流。</p>
            <div className="auth-image-metrics">
              <div className="auth-image-metric">
                <strong>4</strong>
                <span>核心工作台</span>
              </div>
              <div className="auth-image-metric">
                <strong>10+</strong>
                <span>已落地页面</span>
              </div>
              <div className="auth-image-metric">
                <strong>8888</strong>
                <span>本地开发端口</span>
              </div>
            </div>
          </div>
        </div>
        <div className="auth-form">
          <div className="auth-logo">
            <Image src="/images/favicon.png" alt="Timarsky" width={24} height={24} />
            <span>Timarsky 星空</span>
          </div>
          <h2 className="auth-title">{title}</h2>
          {children}
          <div className="auth-footer">
            ICP备案号: <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">辽ICP备2024044460号-8</a>
            版权所有 Copyright @ 2024-2026 星巢引擎科技版权所有. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
