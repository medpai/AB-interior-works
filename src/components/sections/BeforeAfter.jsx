import React, { useState } from 'react';

function CompareCard({ before, after, caption }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="compare-card">
      <div className="relative w-full overflow-hidden rounded-lg shadow-sm">
        <img
          src={after}
          alt={`${caption} — after`}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto object-cover select-none"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={before}
            alt={`${caption} — before`}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto object-cover select-none"
          />
        </div>
        <input
          aria-label={`Drag to compare before and after for ${caption}`}
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4 appearance-none h-1 bg-white/70 rounded-full cursor-ew-resize [--thumb:theme(colors.teal.500)]"
          style={{ accentColor: 'var(--thumb)' }}
        />
        <div className="absolute top-2 left-2 text-xs bg-black/60 text-white px-2 py-1 rounded">Before</div>
        <div className="absolute top-2 right-2 text-xs bg-black/60 text-white px-2 py-1 rounded">After</div>
      </div>
      {caption && (
        <div className="mt-2 text-sm text-center opacity-80">{caption}</div>
      )}
    </div>
  );
}

export default function BeforeAfterGallery() {
  const items = [
    {
      before: 'https://images.unsplash.com/photo-1505698939230-c0f5e86c9a54?q=80&w=1800&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1800&auto=format&fit=crop',
      caption: 'Living room — walls & ceilings',
    },
    {
      before: 'https://images.unsplash.com/photo-1520881363902-a0ff4e722963?q=80&w=1800&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1800&auto=format&fit=crop',
      caption: 'Trim & doors — enamel finish',
    },
    {
      before: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1800&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?q=80&w=1800&auto=format&fit=crop',
      caption: 'Kitchen — cabinet refinishing',
    },
  ];

  return (
    <section id="before-after" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Before & After</h2>
          <p className="muted">See the difference professional prep and premium materials make.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, idx) => (
            <CompareCard key={idx} before={it.before} after={it.after} caption={it.caption} />
          ))}
        </div>
      </div>
    </section>
  );
}
