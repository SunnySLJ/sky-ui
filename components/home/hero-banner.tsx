'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function HeroBanner({ banners }: { banners: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % banners.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="banner-carousel">
      {banners.map((banner, index) => (
        <div key={banner} className={`banner-slide ${index === current ? 'active' : ''}`}>
          <Image src={banner} alt="banner" fill sizes="(max-width: 1200px) 100vw, 720px" style={{ objectFit: 'cover' }} />
        </div>
      ))}
      <div className="banner-dots">
        {banners.map((banner, index) => (
          <button type="button" key={banner} className={`banner-dot ${index === current ? 'active' : ''}`} onClick={() => setCurrent(index)} />
        ))}
      </div>
    </div>
  );
}
