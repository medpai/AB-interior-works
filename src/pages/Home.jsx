import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import ServiceAreaMap from '../components/ServiceAreaMap';
import TestimonialsMarquee from '../components/sections/TestimonialsMarquee';
import EstimatorMiniTool from '../components/sections/EstimatorMiniTool';
import { ShinyButton } from '../components/ui/shiny-button';
// WetPaintButton is reserved for the sticky top bar only per design
import TrustBadges from '../components/sections/TrustBadges';

export default function Home() {
  const navigate = useNavigate();
  return (
    <main>
      <SEO
        title="AB Interior Works | Premium Interior Painting"
        description="High-end interior painting in Ottawa: walls, ceilings, trim, doors, cabinet refinishing, and color consultation."
      />
      <section className="hero" aria-label="AB Interior Works premium interior painting">
        <div className="hero-bg" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1974&auto=format&fit=crop')"
        }} />
        <div className="container hero-content">
          <Reveal as="h1" className="display">Elevate Your Home with Flawless Interior Painting</Reveal>
          <Reveal as="p" className="lead" delay={100}>High-end finishes. Impeccable prep. Minimal disruption. Ottawa’s trusted interior painting specialists.</Reveal>
          <Reveal as="div" className="actions" delay={200}>
            <ShinyButton onClick={() => navigate('/contact')}>Get a Free Quote</ShinyButton>
            <a
              href="tel:+13432545205"
              className="btn btn-call btn-lg"
              aria-label="Call AB Interior Works (343) 254-5205"
              onClick={() => {
                if (typeof window !== 'undefined' && typeof window.__trackPhoneCall === 'function') {
                  window.__trackPhoneCall('Call (343) 254-5205', '+13432545205');
                }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.58 2.5a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.8.26 1.64.46 2.5.58A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call (343) 254-5205</span>
            </a>
            <Link to="/portfolio" className="btn btn-ghost btn-lg">See Our Work</Link>
          </Reveal>
          <Reveal as="p" className="microcopy" delay={220}>
            Talk to a painting specialist now — friendly advice and ballpark pricing in minutes.
          </Reveal>
          <Reveal as="div" className="trust" delay={300}>
            <span>Fully insured</span>
            <span>Dust-free prep</span>
            <span>Color consultation</span>
          </Reveal>
        </div>
      </section>

      {/* Trust badges strip */}
      <TrustBadges />

      <section className="section" id="why-us">
        <div className="container">
          <h2 className="section-title">Why Choose AB Interior Works</h2>
          <div className="grid-3 features-grid">
            <Reveal className="card feature feature-card">
              <div className="feature-icon-wrap">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="7" y="7" width="10" height="10" rx="2" />
                  <rect x="5" y="5" width="10" height="10" rx="2" opacity="0.5" />
                </svg>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Meticulous Prep</h3>
                <p>Walls, trim, and surfaces are repaired, sanded, and primed to perfection for a flawless final coat.</p>
              </div>
            </Reveal>
            <Reveal className="card feature feature-card" delay={100}>
              <div className="feature-icon-wrap">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z" />
                </svg>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Premium Materials</h3>
                <p>We use top-tier paints with low-VOC, durable finishes for beautiful, long‑lasting results.</p>
              </div>
            </Reveal>
            <Reveal className="card feature feature-card" delay={200}>
              <div className="feature-icon-wrap">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 12l3 3 5-5" />
                </svg>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">White‑Glove Experience</h3>
                <p>Clean, respectful crews. Clear timelines. We treat your home like our own—start to finish.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section alt" id="services-preview">
        <div className="container">
          <Reveal as="div" className="section-header">
            <h2 className="section-title">Interior Painting Services</h2>
            <Link to="/services" className="btn btn-ghost">View all services</Link>
          </Reveal>
          <div className="grid-3">
            <Reveal as="article" className="card service-card">
              <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1965&auto=format&fit=crop" alt="Living room walls freshly painted" />
              <div className="card-body">
                <h3>Walls & Ceilings</h3>
                <p>Pristine, even coverage with crisp lines and smooth textures throughout your home.</p>
              </div>
            </Reveal>
            <Reveal as="article" className="card service-card" delay={100}>
              <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1971&auto=format&fit=crop" alt="Detailed trim and door painting" />
              <div className="card-body">
                <h3>Trim & Doors</h3>
                <p>Sharp, durable enamel finishes for baseboards, casings, crown, and interior doors.</p>
              </div>
            </Reveal>
            <Reveal as="article" className="card service-card" delay={200}>
              <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1556910096-6f5e72db6803?q=80&w=1974&auto=format&fit=crop" alt="Modern kitchen cabinet refinishing" />
              <div className="card-body">
                <h3>Cabinet Refinishing</h3>
                <p>Factory‑smooth sprayed finishes that transform kitchens and bathrooms.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Estimator Mini-Tool */}
      <EstimatorMiniTool />

      {/* Testimonials */}
      <TestimonialsMarquee />

      {/* Meet Your Specialist — Personal connection drives trust */}
      <section className="section" id="meet-specialist">
        <div className="container">
          <Reveal as="div" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="process-badge" style={{ display: 'inline-flex' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Your Direct Contact</span>
            </div>
            <h2 className="process-title">Talk Directly to a Specialist</h2>
            <p className="process-subtitle">No call centers, no runaround. Reach Anas directly for a fast, honest estimate on your project.</p>
          </Reveal>
          <Reveal as="div" delay={150} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div className="card" style={{
              maxWidth: '420px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(20,184,166,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <img
                src="/business-card.png"
                alt="Anas Agnaou — Bugnot Painting and Renovation Business Card"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div style={{ maxWidth: '380px' }}>
              <h3 style={{ fontSize: '22px', margin: '0 0 12px', fontWeight: '700' }}>Why customers love working with us</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'grid', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  One dedicated contact from start to finish
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  Fast response — usually within 1 hour
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  Transparent pricing — no hidden fees
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  Friendly, no-pressure consultations
                </li>
              </ul>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="tel:+13432545205"
                  className="btn btn-primary btn-lg"
                  onClick={() => {
                    if (typeof window !== 'undefined' && typeof window.__trackPhoneCall === 'function') {
                      window.__trackPhoneCall('Call Anas (343) 254-5205', '+13432545205');
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.58 2.5a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.8.26 1.64.46 2.5.58A2 2 0 0 1 22 16.92z" /></svg>
                  Call (343) 254-5205
                </a>
                <a href="mailto:anasagnaou@Bugnot.com" className="btn btn-ghost btn-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  Email Anas
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-content">
          <h2>Ready to refresh your space?</h2>
          <p>Get a fast, accurate quote with expert recommendations.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary btn-lg">Request Your Quote</Link>
            <a
              href="tel:+13432545205"
              className="btn btn-call btn-lg"
              aria-label="Call AB Interior Works (343) 254-5205"
              onClick={() => {
                if (typeof window !== 'undefined' && typeof window.__trackPhoneCall === 'function') {
                  window.__trackPhoneCall('Call (343) 254-5205', '+13432545205');
                }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.58 2.5a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.8.26 1.64.46 2.5.58A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call (343) 254-5205</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
