import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';

const services = [
  {
    title: 'Walls & Ceilings',
    img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1965&auto=format&fit=crop',
    desc: 'Even coverage, flawless edges, and smooth textures across rooms and hallways.'
  },
  {
    title: 'Trim, Baseboards & Doors',
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1971&auto=format&fit=crop',
    desc: 'Crisp, durable enamel finishes on all woodwork for a refined, modern look.'
  },
  {
    title: 'Cabinet Refinishing',
    img: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?q=80&w=1974&auto=format&fit=crop',
    desc: 'Factory-quality sprayed finishes that revitalize kitchens and baths.'
  },
  {
    title: 'Accent Walls & Features',
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1971&auto=format&fit=crop',
    desc: 'Statement colors and textures that add personality without overpowering.'
  },
  {
    title: 'Drywall Repair & Prep',
    img: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1974&auto=format&fit=crop',
    desc: 'Seamless patches, sanding, and priming to ensure a perfect final coat.'
  },
  {
    title: 'Color Consultation',
    img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1975&auto=format&fit=crop',
    desc: 'Professional guidance on palettes that complement your lighting and style.'
  }
];

export default function Services() {
  return (
    <main className="section">
      <SEO title="Interior Painting Services | AB Interior Works" description="Walls & ceilings, trim & doors, cabinet refinishing, drywall repair, accent walls, and professional color consultation." />
      <div className="container">
        <Reveal as="header" className="page-header">
          <h1 className="page-title">Interior Painting Services</h1>
          <p className="lead">Premium workmanship, premium materials, and a premium experience—tailored to your home.</p>
        </Reveal>
        <div className="grid-3">
          {services.map((s, i) => (
            <Reveal as="article" className="card service-card" delay={i * 100} key={s.title}>
              <img loading="lazy" decoding="async" src={s.img} alt={s.title} />
              <div className="card-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
