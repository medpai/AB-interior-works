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
import BeforeAfterGallery from '../components/sections/BeforeAfter';


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

      {/* Before/After Gallery */}
      <BeforeAfterGallery />

      {/* Estimator Mini-Tool */}
      <EstimatorMiniTool />

      {/* Service Area on Home */}
      <section className="section" id="service-area">
        <div className="container">
          <Reveal as="div" className="section-header">
            <h2 className="section-title">Service Area — Ottawa & Nearby</h2>
            <span className="muted">We come to you — fast, friendly, and professional.</span>
          </Reveal>
          <ServiceAreaMap />
        </div>
      </section>

      {/* Our Process */}
      <section className="section alt" id="our-process">
        <div className="container process">
          <Reveal as="header" className="process-header">
            <div className="process-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>Our Process</span>
            </div>
            <h2 className="process-title">A Proven, Low‑Stress Experience</h2>
            <p className="process-subtitle">From consultation to completion, we've refined every step to deliver exceptional results with zero hassle.</p>
          </Reveal>
          
          <div className="process-container">
            <Reveal as="div" className="process-intro-modern">
              <div className="process-guarantee">
                <div className="guarantee-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                    <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3" />
                    <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3" />
                  </svg>
                </div>
                <h3>Quality Guarantee</h3>
                <ul className="guarantee-list">
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Complete protection of your belongings
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Professional surface preparation
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Daily cleanup and organization
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    100% satisfaction guarantee
                  </li>
                </ul>
                <Link to="/contact" className="btn btn-primary btn-lg">Start Your Project</Link>
              </div>
            </Reveal>
            
            <Reveal as="div" className="process-steps-modern">
              <div className="step-card">
                <div className="step-number">01</div>
                <div className="step-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9,22 9,12 15,12 15,22" />
                  </svg>
                </div>
                <h3>On‑Site Consultation</h3>
                <p>Detailed assessment, color consultation, and transparent pricing—all in one visit.</p>
                <div className="step-duration">30-45 min</div>
              </div>
              
              <div className="step-card">
                <div className="step-number">02</div>
                <div className="step-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <h3>Protect & Prepare</h3>
                <p>Comprehensive surface prep with full protection of your furniture and floors.</p>
                <div className="step-duration">Day 1</div>
              </div>
              
              <div className="step-card">
                <div className="step-number">03</div>
                <div className="step-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11H1l2-2v6l-2-2h8" />
                    <path d="M13 21H5l2-2v6l-2-2h8" />
                    <path d="M19 8H11l2-2v6l-2-2h8" />
                  </svg>
                </div>
                <h3>Expert Application</h3>
                <p>Premium paints applied with precision techniques for flawless, lasting results.</p>
                <div className="step-duration">Days 2-3</div>
              </div>
              
              <div className="step-card">
                <div className="step-number">04</div>
                <div className="step-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                  </svg>
                </div>
                <h3>Quality Inspection</h3>
                <p>Thorough review and touch-ups to ensure every detail meets our high standards.</p>
                <div className="step-duration">Final day</div>
              </div>
              
              <div className="step-card">
                <div className="step-number">05</div>
                <div className="step-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12h18l-3-3m0 6l3-3" />
                    <path d="M3 7h18" />
                    <path d="M3 17h18" />
                  </svg>
                </div>
                <h3>Final Walkthrough</h3>
                <p>Complete cleanup and walkthrough to ensure you're 100% satisfied with the results.</p>
                <div className="step-duration">30 min</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsMarquee />

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
