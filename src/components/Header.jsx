import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import WetPaintButton from './ui/wet-paint-button';
import Logo from './Logo';

export default function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={close}>
          <Logo size="default" />
        </Link>

        <button
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav ${open ? 'is-open' : ''}`}>
          <NavLink to="/" onClick={close} end>
            Home
          </NavLink>
          <NavLink to="/services" onClick={close}>
            Services
          </NavLink>
          <NavLink to="/portfolio" onClick={close}>
            Portfolio
          </NavLink>
          <NavLink to="/service-area" onClick={close}>
            Service Area
          </NavLink>
          <NavLink to="/about" onClick={close}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={close} className="btn btn-primary">
            Get a Quote
          </NavLink>
          <WetPaintButton
            aria-label="Call AB Interior Works (343) 254-5205"
            className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-sm"
            onClick={() => {
              if (typeof window !== 'undefined' && typeof window.__trackPhoneCall === 'function') {
                window.__trackPhoneCall('Call (343) 254-5205', '+13432545205');
              }
              window.location.href = 'tel:+13432545205';
              close();
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.58 2.5a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.8.26 1.64.46 2.5.58A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Call (343) 254-5205</span>
          </WetPaintButton>
        </nav>
      </div>
    </header>
  );
}
