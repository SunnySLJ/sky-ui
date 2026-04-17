'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/shell/app-shell';
import { CardGrid } from '@/components/home/card-grid';
import { FilterBar } from '@/components/home/filter-bar';
import { HeroBanner } from '@/components/home/hero-banner';
import { homeBanners, homeCards, homeCategories, homeModels, homeTools, homeTutorialCards } from '@/lib/mock/home';

export default function HomePage() {
  const router = useRouter();
  const [tab, setTab] = useState('灵感案例');
  const [model, setModel] = useState('全部模型');
  const [category, setCategory] = useState('全部');
  const [search, setSearch] = useState('');
  const toolsTrackRef = useRef<HTMLDivElement>(null);
  const sourceCards = tab === '教程视频' ? homeTutorialCards : homeCards;

  const filtered = useMemo(() => sourceCards.filter((card) => {
    const matchModel = model === '全部模型' || card.model === model || (model === '动作迁移' && card.title.includes('动作迁移'));
    const matchCategory = category === '全部' || card.category === category;
    const keyword = search.trim().toLowerCase();
    const matchSearch = !keyword || card.title.toLowerCase().includes(keyword) || card.badge.toLowerCase().includes(keyword);
    return matchModel && matchCategory && matchSearch;
  }), [category, model, search, sourceCards]);

  useEffect(() => {
    const track = toolsTrackRef.current;
    if (!track) return;

    let frame = 0;
    let scrollAmount = 0;
    let direction = 1;
    let hovering = false;
    const scrollStep = 1;

    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };

    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', onLeave);

    function tick() {
      if (!toolsTrackRef.current) return;
      const currentTrack = toolsTrackRef.current;
      const maxScroll = currentTrack.scrollWidth - currentTrack.clientWidth;
      if (!hovering && maxScroll > 0) {
        scrollAmount += scrollStep * direction;
        if (scrollAmount >= maxScroll) direction = -1;
        if (scrollAmount <= 0) direction = 1;
        currentTrack.scrollLeft = scrollAmount;
      }
      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <AppShell>
      <div className="top-row">
        <HeroBanner banners={homeBanners} />
        <div className="tools-carousel">
          <div className="tools-track" ref={toolsTrackRef}>
            {homeTools.map((tool) => (
              <button
                key={tool.label}
                type="button"
                className="home-tool-card"
                onClick={() => router.push(tool.href)}
                aria-label={`进入${tool.label}`}
              >
                <Image src={tool.image} alt={tool.label} width={146} height={120} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <FilterBar
        currentTab={tab}
        onTabChange={setTab}
        currentModel={model}
        onModelChange={setModel}
        currentCategory={category}
        onCategoryChange={setCategory}
        search={search}
        onSearchChange={setSearch}
        models={homeModels}
        categories={homeCategories}
      />
      <CardGrid cards={filtered} />
      <div className="footer"><span>ICP备案号:</span><a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">辽ICP备2024044460号-8</a><span style={{ margin: '0 8px' }}>|</span><span>版权所有 Copyright @ 2024-2026 星巢引擎科技版权所有. All Rights Reserved.</span></div>
    </AppShell>
  );
}
