import React, { useMemo, useState } from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';

const ITEMS = [
  // Painting
  { id: 1, src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1974&auto=format&fit=crop', alt: 'Bright living room with fresh paint', cat: 'Living Rooms' },
  { id: 2, src: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?q=80&w=1974&auto=format&fit=crop', alt: 'Modern kitchen cabinets refinished', cat: 'Kitchens' },
  { id: 3, src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1972&auto=format&fit=crop', alt: 'Elegant bedroom with painted walls', cat: 'Bedrooms' },
  { id: 4, src: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1975&auto=format&fit=crop', alt: 'Color consultation palette', cat: 'Details' },
  { id: 5, src: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1971&auto=format&fit=crop', alt: 'Refined trim and doors', cat: 'Details' },
  { id: 6, src: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1965&auto=format&fit=crop', alt: 'Walls and ceilings freshly painted', cat: 'Living Rooms' },
  // Renovation
  { id: 7, src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1974&auto=format&fit=crop', alt: 'Modern kitchen renovation with white cabinets', cat: 'Kitchens' },
  { id: 8, src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1974&auto=format&fit=crop', alt: 'Luxury bathroom renovation with tiled shower', cat: 'Bathrooms' },
  { id: 9, src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1974&auto=format&fit=crop', alt: 'Modern bathroom vanity and fixtures', cat: 'Bathrooms' },
  { id: 10, src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1974&auto=format&fit=crop', alt: 'Finished basement living area', cat: 'Basements' },
  { id: 11, src: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=1974&auto=format&fit=crop', alt: 'Basement entertainment room', cat: 'Basements' },
  { id: 12, src: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1974&auto=format&fit=crop', alt: 'Hardwood flooring installation', cat: 'Flooring' },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);

  const categories = useMemo(() => ['All', ...Array.from(new Set(ITEMS.map(i => i.cat)))], []);
  const filtered = useMemo(() => filter === 'All' ? ITEMS : ITEMS.filter(i => i.cat === filter), [filter]);

  return (
    <main className="section">
      <SEO title="Portfolio | AB Interior Works" description="A gallery of recent painting and renovation projects across Ottawa: kitchens, bathrooms, basements, living rooms, flooring, and refined details." />
      <div className="container">
        <Reveal as="header" className="page-header">
          <h1 className="page-title">Project Portfolio</h1>
          <p className="lead">A selection of recent painting & renovation projects — precision finishes, stunning transformations, and thoughtful design.</p>
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
