import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';

export default function About() {
  return (
    <main className="section">
      <SEO title="About Us | AB Interior Works" description="Ottawa-based painting & renovation specialists delivering expert craftsmanship, premium materials, and a white-glove customer experience." />
      <div className="container narrow">
        <Reveal as="header" className="page-header">
          <h1 className="page-title">About AB Interior Works</h1>
          <p className="lead">We're a detail-obsessed team of painters and renovation specialists delivering refined interiors with a respectful, white-glove experience.</p>
        </Reveal>
        <Reveal as="div" className="prose" delay={100}>
          <p>Founded in Ottawa, AB Interior Works brings together craftsmanship, premium materials, and a commitment to customer care. Whether it's a flawless paint job or a complete home renovation, we believe exceptional results start long before the first coat or first swing of the hammer — through meticulous planning, clean job sites, and clear communication.</p>
          <p>Our team is fully insured and trained in dust-control systems to keep your home comfortable during the process. From smoothing imperfect walls and spraying factory-grade cabinet finishes to designing dream kitchens and transforming basements into livable spaces, we take pride in details that others overlook.</p>
          <p>Our renovation services span the full scope of interior transformation: kitchen remodels with custom cabinetry and premium countertops, bathroom upgrades with modern tiling and fixtures, basement finishing for extra living space, and professional flooring installation throughout your home.</p>
          <p>Whether you're refreshing a single room with a new color or undertaking a complete home renovation, we tailor our approach to your space, lifestyle, and budget. The result: interiors that feel lighter, brighter, and impeccably finished.</p>
        </Reveal>
      </div>
    </main>
  );
}
