import Image from 'next/image';

type HistoryData = {
  prompt: string;
  tags: string[];
  preview: string;
  date: string;
  actions: string[];
};

export function HistoryPanel({ thumbs, history }: { thumbs: string[]; history: HistoryData }) {
  return (
    <div className="gen-main gen-main-video">
      <div className="video-history-head">历史记录</div>
      <div className="gen-thumb-strip">
        {thumbs.map((thumb) => (
          <div key={thumb} className="gen-thumb-item"><Image src={thumb} alt="history thumb" width={44} height={44} /></div>
        ))}
        <div className="gen-thumb-item gen-thumb-more">+1</div>
      </div>
      <div className="gen-history-card">
        <div className="gen-history-prompt">{history.prompt}</div>
        <div className="gen-history-tags">
          {history.tags.map((tag) => <span key={tag} className="gen-history-tag">{tag}</span>)}
        </div>
        <div className="gen-history-media">
          <div className="gen-media-thumb">
            <Image src={history.preview} alt="history preview" width={260} height={200} />
            <div className="gen-media-expired">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>视频作品已超出24小时<br />无法进行播放/下载<br />可修改文案进行再次创作</span>
            </div>
          </div>
        </div>
        <div className="gen-history-bottom">
          <span className="gen-history-date">{history.date}</span>
          <div className="gen-history-actions">
            {history.actions.map((action) => <span key={action} className="gen-act-btn">{action}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
