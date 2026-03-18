import React, { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';

const services = [
  // Painting
  {
    title: 'Walls & Ceilings',
    img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1965&auto=format&fit=crop',
    desc: 'Even coverage, flawless edges, and smooth textures across rooms and hallways.',
    category: 'Painting'
  },
  {
    title: 'Trim, Baseboards & Doors',
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1971&auto=format&fit=crop',
    desc: 'Crisp, durable enamel finishes on all woodwork for a refined, modern look.',
    category: 'Painting'
  },
  {
    title: 'Cabinet Refinishing',
    img: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?q=80&w=1974&auto=format&fit=crop',
    desc: 'Factory-quality sprayed finishes that revitalize kitchens and baths.',
    category: 'Painting'
  },
  {
    title: 'Accent Walls & Features',
    img: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1974&auto=format&fit=crop',
    desc: 'Statement colors and textures that add personality without overpowering.',
    category: 'Painting'
  },
  {
    title: 'Drywall Repair & Prep',
    img: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1974&auto=format&fit=crop',
    desc: 'Seamless patches, sanding, and priming to ensure a perfect final coat.',
    category: 'Painting'
  },
  {
    title: 'Color Consultation',
    img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1975&auto=format&fit=crop',
    desc: 'Professional guidance on palettes that complement your lighting and style.',
    category: 'Painting'
  },
  // Renovation
  {
    title: 'Kitchen Renovation',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1974&auto=format&fit=crop',
    desc: 'Complete kitchen transformations — custom cabinetry, countertops, backsplashes, and modern layouts designed for your lifestyle.',
    category: 'Renovation'
  },
  {
    title: 'Bathroom Renovation',
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1974&auto=format&fit=crop',
    desc: 'Spa-inspired bathrooms with premium tiling, modern fixtures, walk-in showers, and elegant vanities.',
    category: 'Renovation'
  },
  {
    title: 'Basement Finishing',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1974&auto=format&fit=crop',
    desc: 'Turn unused space into beautiful living areas — home offices, entertainment rooms, or rental suites with proper insulation and finishing.',
    category: 'Renovation'
  },
  {
    title: 'Flooring Installation',
    img: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1974&auto=format&fit=crop',
    desc: 'Hardwood, laminate, vinyl plank, and tile installation for a seamless, durable foundation throughout your home.',
    category: 'Renovation'
  }
];

const CATEGORIES = ['All', 'Painting', 'Renovation'];

export default function Services() {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () => filter === 'All' ? services : services.filter(s => s.category === filter),
    [filter]
  );

  return (
    <main className="section">
      <SEO title="Painting & Renovation Services | Bugnot Painting and Renovation" description="Interior painting, cabinet refinishing, kitchen & bathroom renovation, basement finishing, flooring installation, and more in Ottawa." />
      <div className="container">
        <Reveal as="header" className="page-header">
          <h1 className="page-title">Painting & Renovation Services</h1>
          <p className="lead">Expert craftsmanship, premium materials, and a white-glove experience — tailored to your home.</p>
        </Reveal>

        <Reveal as="div" className="filters" delay={80}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`chip ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="grid-3">
          {filtered.map((s, i) => (
            <Reveal as="article" className="card service-card" delay={i * 80} key={s.title}>
              <img loading="lazy" decoding="async" src={s.img} alt={s.title} />
              <div className="card-body">
                <div className="service-card-header">
                  <h3>{s.title}</h3>
                  <span className={`service-badge ${s.category === 'Renovation' ? 'reno' : 'paint'}`}>{s.category}</span>
                </div>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
