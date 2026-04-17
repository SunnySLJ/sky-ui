type NoticeSection = {
  title: string;
  paragraphs: string[];
};

export function NoticeDetail({
  metaBadge,
  date,
  headline,
  intro,
  sections,
  callout,
  outro,
}: {
  metaBadge: string;
  date: string;
  headline: string;
  intro: string;
  sections: NoticeSection[];
  callout?: { title: string; body: string };
  outro?: string;
}) {
  return (
    <article className="notice-detail">
      <div className="notice-detail-meta">
        <span className="notice-detail-badge">{metaBadge}</span>
        <span>{date}</span>
      </div>
      <h2>{headline}</h2>
      <p>{intro}</p>
      {sections.map((section) => (
        <section key={section.title}>
          <h3>{section.title}</h3>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
      {callout ? (
        <div className="notice-callout">
          <strong>{callout.title}</strong>
          <p>{callout.body}</p>
        </div>
      ) : null}
      {outro ? <p>{outro}</p> : null}
    </article>
  );
}
