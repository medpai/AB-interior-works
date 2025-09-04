import React, { Suspense, lazy, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import ScrollToTop from './components/ScrollToTop';
import { Routes, Route, Navigate } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const ServiceArea = lazy(() => import('./pages/ServiceArea'));

function App() {
  // Global analytics: track tel: link clicks (GA4 / Plausible if present)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.__TEL_TRACKING_INSTALLED__) return;
    window.__TEL_TRACKING_INSTALLED__ = true;

    // Helper for programmatic phone call tracking (used by non-anchor buttons)
    window.__trackPhoneCall = (label, phone) => {
      const pn = phone || '+13432545205';
      const lb = label || 'Phone Call';
      if (typeof window.gtag === 'function') {
        try {
          window.gtag('event', 'phone_call_click', {
            event_category: 'engagement',
            phone_number: pn,
            link_text: lb,
            value: 1,
          });
        } catch (_) {}
      }
      if (typeof window.plausible === 'function') {
        try {
          window.plausible('Phone Call', {
            props: {
              phone_number: pn,
              link_text: lb,
              path: window.location ? window.location.pathname : undefined,
            },
          });
        } catch (_) {}
      }
    };

    const onClick = (e) => {
      const t = e.target;
      // Find nearest anchor with tel:
      const a = t && typeof t.closest === 'function' ? t.closest('a[href^="tel:"]') : null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const phone = href.replace('tel:', '');
      const label = (a.textContent || '').trim() || phone;

      // Google Analytics (gtag)
      if (typeof window.gtag === 'function') {
        try {
          window.gtag('event', 'phone_call_click', {
            event_category: 'engagement',
            phone_number: phone,
            link_text: label,
            value: 1,
          });
        } catch (_) {}
      }

      // Plausible Analytics
      if (typeof window.plausible === 'function') {
        try {
          window.plausible('Phone Call', {
            props: {
              phone_number: phone,
              link_text: label,
              path: window.location ? window.location.pathname : undefined,
            },
          });
        } catch (_) {}
      }
    };

    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.__TEL_TRACKING_INSTALLED__ = false;
      try { delete window.__trackPhoneCall; } catch (_) { window.__trackPhoneCall = undefined; }
    };
  }, []);

  return (
    <div className="app-root">
      <Header />
      <ScrollToTop />
      <Suspense fallback={<div className="page-loading">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/service-area" element={<ServiceArea />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <StickyCTA />
      <Footer />
    </div>
  );
}

export default App;
