import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { useLocation } from 'react-router-dom';
import { sendQuoteRequest } from '../lib/quoteDelivery';

function formatCurrency(n) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [estimate, setEstimate] = useState(null);
  const { search } = useLocation();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setErrorMessage('Please fill the required fields: Name, Email, and Project Details.');
      return;
    }
    setStatus('submitting');
    setErrorMessage('');
    try {
      const result = await sendQuoteRequest({ form, estimate, source: 'contact_page' });
      if (result.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
        setErrorMessage('');
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Submission failed. Please try again.');
        // Optional: console error for debugging
        // eslint-disable-next-line no-console
        console.error('Quote submit failed', result.errors);
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err?.message || 'Unexpected error.');
      // eslint-disable-next-line no-console
      console.error('Quote submit exception', err);
    }
  };

  // Prefill from Estimator query parameters (runs once per location change)
  useEffect(() => {
    const params = new URLSearchParams(search);
    const rooms = parseInt(params.get('rooms') || '', 10);
    const finish = params.get('finish') || '';
    const ceilings = params.get('ceilings') === '1';
    const trim = params.get('trim') === '1';
    const minHours = parseInt(params.get('minHours') || '', 10);
    const maxHours = parseInt(params.get('maxHours') || '', 10);
    const minCost = parseInt(params.get('minCost') || '', 10);
    const maxCost = parseInt(params.get('maxCost') || '', 10);

    if (!Number.isNaN(rooms) && finish) {
      const summary = [
        'Estimator details:',
        `• Rooms: ${rooms}`,
        `• Finish: ${finish}`,
        `• Ceilings: ${ceilings ? 'Yes' : 'No'}`,
        `• Trim & Doors: ${trim ? 'Yes' : 'No'}`,
        `• Estimated hours: ${!Number.isNaN(minHours) && !Number.isNaN(maxHours) ? `${minHours}–${maxHours}h` : '—'}`,
        `• Estimated cost: ${!Number.isNaN(minCost) && !Number.isNaN(maxCost) ? `${formatCurrency(minCost)}–${formatCurrency(maxCost)}` : '—'}`,
        '',
        'Please share timing, colors, and any specifics. We will confirm measurements and finalize your quote.',
      ].join('\n');

      setEstimate({ rooms, finish, ceilings, trim, minHours, maxHours, minCost, maxCost });
      setForm((prev) => ({
        ...prev,
        service: prev.service || (ceilings ? 'Walls & Ceilings' : (trim ? 'Trim & Doors' : '')),
        message: prev.message || summary,
      }));
    }
  }, [search]);

  return (
    <main className="section">
      <SEO title="Contact | AB Interior Works" description="Request a free interior painting quote in Ottawa. Friendly, fast responses from AB Interior Works." />
      <div className="container">
        <Reveal as="header" className="page-header">
          <h1 className="page-title">Request a Free Quote</h1>
          <p className="lead">Tell us about your project and we’ll respond promptly with next steps.</p>
        </Reveal>

        {estimate && (
          <Reveal className="card mb-6 border border-teal-200 bg-teal-50/70">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm bg-white border border-teal-200 text-teal-900">{estimate.rooms} rooms</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm bg-white border border-teal-200 text-teal-900">{estimate.finish}</span>
              {estimate.ceilings && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm bg-white border border-teal-200 text-teal-900">Ceilings</span>}
              {estimate.trim && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm bg-white border border-teal-200 text-teal-900">Trim & Doors</span>}
              <span className="ml-auto text-sm font-semibold text-teal-900">{formatCurrency(estimate.minCost)}–{formatCurrency(estimate.maxCost)}</span>
            </div>
            <p className="text-xs mt-2 opacity-70">We pre-filled your message with these details. You can <a className="text-teal-700 underline" href="/#estimator">edit selections</a>.</p>
          </Reveal>
        )}

        <div className="grid-2">
          <Reveal as="form" className="card form-card" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Full Name *</label>
              <input id="name" name="name" value={form.name} onChange={onChange} required aria-invalid={status==='error' && !form.name} />
            </div>
            <div className="field">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" value={form.email} onChange={onChange} required aria-invalid={status==='error' && !form.email} />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" value={form.phone} onChange={onChange} />
            </div>
            <div className="field">
              <label htmlFor="service">Service</label>
              <select id="service" name="service" value={form.service} onChange={onChange}>
                <option value="">Select a service</option>
                <option>Walls & Ceilings</option>
                <option>Trim & Doors</option>
                <option>Cabinet Refinishing</option>
                <option>Drywall Repair & Prep</option>
                <option>Color Consultation</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Project Details *</label>
              <textarea id="message" name="message" rows="5" value={form.message} onChange={onChange} required aria-invalid={status==='error' && !form.message} />
            </div>

            <button className="btn btn-primary" disabled={status==='submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send Request'}
            </button>
            {status === 'success' && <p className="success">Thanks! Your request was sent. We’ll be in touch shortly.</p>}
            {status === 'error' && (
              <p className="error">
                We couldn’t send your request. Please ensure required fields are filled. If the problem persists, call us at{' '}
                <a
                  href="tel:+13432545205"
                  onClick={() => {
                    if (typeof window !== 'undefined' && typeof window.__trackPhoneCall === 'function') {
                      window.__trackPhoneCall('Call (343) 254-5205', '+13432545205');
                    }
                  }}
                >
                  (343) 254-5205
                </a> or email{' '}
                <a href="mailto:hello@abinteriorworks.com">hello@abinteriorworks.com</a>.
                {errorMessage && (
                  <>
                    <br />
                    <small className="muted">Error details: {errorMessage}</small>
                  </>
                )}
              </p>
            )}
          </Reveal>

          <Reveal as="aside" className="contact-aside" delay={100}>
            <div className="card">
              <h3>Contact Information</h3>
              <ul className="contact-list">
                <li>
                  <a
                    href="tel:+13432545205"
                    onClick={() => {
                      if (typeof window !== 'undefined' && typeof window.__trackPhoneCall === 'function') {
                        window.__trackPhoneCall('Call (343) 254-5205', '+13432545205');
                      }
                    }}
                  >
                    (343) 254-5205
                  </a>
                </li>
                <li><a href="mailto:hello@abinteriorworks.com">hello@abinteriorworks.com</a></li>
                <li>Ottawa, Ontario</li>
              </ul>
              <p className="muted">Business hours: Mon–Sat, 8am–6pm</p>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
