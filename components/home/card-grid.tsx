import { CaseCard, type HomeCard } from '@/components/home/case-card';

export function CardGrid({ cards }: { cards: HomeCard[] }) {
  return (
    <div className="content-section">
      <div className="waterfall-list">
        {cards.map((card) => <CaseCard key={`${card.title}-${card.img}`} card={card} />)}
      </div>
    </div>
  );
}
