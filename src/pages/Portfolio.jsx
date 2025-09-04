import React, { useMemo, useState } from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';

const ITEMS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1974&auto=format&fit=crop', alt: 'Bright living room', cat: 'Living Rooms' },
  { id: 2, src: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?q=80&w=1974&auto=format&fit=crop', alt: 'Modern kitchen cabinets', cat: 'Kitchens' },
  { id: 3, src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1972&auto=format&fit=crop', alt: 'Elegant bedroom', cat: 'Bedrooms' },
  { id: 4, src: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1975&auto=format&fit=crop', alt: 'Color consultation palette', cat: 'Details' },
  { id: 5, src: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1971&auto=format&fit=crop', alt: 'Refined trim and doors', cat: 'Details' },
  { id: 6, src: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1965&auto=format&fit=crop', alt: 'Walls and ceilings', cat: 'Living Rooms' }
];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);

  const categories = useMemo(() => ['All', ...Array.from(new Set(ITEMS.map(i => i.cat)))], []);
  const filtered = useMemo(() => filter === 'All' ? ITEMS : ITEMS.filter(i => i.cat === filter), [filter]);

  return (
    <main className="section">
      <SEO title="Portfolio | AB Interior Works" description="A gallery of recent interior painting projects across Ottawa: living rooms, kitchens, bedrooms, and refined details." />
      <div className="container">
        <Reveal as="header" className="page-header">
          <h1 className="page-title">Project Portfolio</h1>
          <p className="lead">A selection of recent interior projects—featuring precise lines, premium finishes, and thoughtful palettes.</p>
        </Reveal>

        <Reveal as="div" className="filters" delay={100}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`chip ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="masonry">
          {filtered.map((item, i) => (
            <Reveal
              key={item.id}
              as="button"
              className="masonry-item"
              onClick={() => setActive(item)}
              delay={i * 80}
            >
              <img loading="lazy" decoding="async" src={item.src} alt={item.alt} />
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <img src={active.src} alt={active.alt} />
            <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close">×</button>
          </div>
        </div>
      )}
    </main>
  );
}
