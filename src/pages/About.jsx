import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';

export default function About() {
  return (
    <main className="section">
      <SEO title="About Us | AB Interior Works" description="Ottawa-based interior painting specialists delivering meticulous prep, premium materials, and a white‑glove customer experience." />
      <div className="container narrow">
        <Reveal as="header" className="page-header">
          <h1 className="page-title">About AB Interior Works</h1>
          <p className="lead">We’re a detail-obsessed painting team delivering refined interiors with a respectful, white‑glove experience.</p>
        </Reveal>
        <Reveal as="div" className="prose" delay={100}>
          <p>Founded in Ottawa, AB Interior Works brings together craftsmanship, premium materials, and a commitment to customer care. We believe a truly elevated paint job starts long before the first coat—through meticulous preparation, clean job sites, and clear communication.</p>
          <p>Our team is fully insured and trained in dust‑control systems to keep your home comfortable during the process. From smoothing imperfect walls to spraying cabinet finishes that look factory‑made, we take pride in details that others overlook.</p>
          <p>Whether you’re refreshing a single room or transforming your entire home, we tailor our approach to your space, lighting, and style. The result: interiors that feel lighter, brighter, and impeccably finished.</p>
        </Reveal>
      </div>
    </main>
  );
}
