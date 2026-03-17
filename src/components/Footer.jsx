import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><Link to="/services">Interior Painting</Link></li>
            <li><Link to="/services">Cabinet Refinishing</Link></li>
            <li><Link to="/services">Kitchen Renovation</Link></li>
            <li><Link to="/services">Bathroom Renovation</Link></li>
            <li><Link to="/services">Basement Finishing</Link></li>
            <li><Link to="/services">Flooring Installation</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="contact-list">
            <li><a href="tel:+13432545205">(343) 254-5205</a></li>
            <li><a href="mailto:hello@abinteriorworks.com">hello@abinteriorworks.com</a></li>
            <li>Ottawa, Ontario</li>
          </ul>
          <Link to="/contact" className="btn btn-primary small">Request a Free Quote</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© {year} AB Interior Works — Painting & Renovation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
