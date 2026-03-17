import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import ServiceAreaMap from '../components/ServiceAreaMap';

export default function ServiceArea() {
  return (
    <main className="section">
      <SEO title="Service Area | AB Interior Works" description="Premium painting & renovation services in Ottawa and nearby communities: Downtown, Kanata, Nepean, Barrhaven, Orleans, Gloucester, Stittsville, and Vanier." />
      <div className="container">
        <Reveal as="header" className="page-header">
          <h1 className="page-title">Where We Work in Ottawa</h1>
          <p className="lead">Premium painting & renovation services across Ottawa and surrounding communities. If you're nearby, we likely serve you.</p>
        </Reveal>

        <ServiceAreaMap />
      </div>
    </main>
  );
}
