import React from 'react';

const faqs = [
  {
    q: 'How quickly can you start?',
    a: 'Most projects start within 1–2 weeks. Smaller jobs may be scheduled sooner based on availability.',
  },
  {
    q: 'Do you move and protect furniture?',
    a: 'Yes. We carefully protect floors and furniture, and we handle minor moving as part of prep.',
  },
  {
    q: 'What paint brands do you use?',
    a: 'We recommend premium, low‑VOC paints from Benjamin Moore and Sherwin‑Williams for durable finishes.',
  },
  {
    q: 'Is there a warranty?',
    a: 'Absolutely. All workmanship is backed by a 2‑year warranty.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="muted">Quick answers to common questions. Still unsure? Reach out—we’re happy to help.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((f, i) => (
            <details key={i} className="faq-item rounded-lg border p-4 bg-white/50 open:bg-white">
              <summary className="cursor-pointer font-semibold">
                {f.q}
              </summary>
              <p className="mt-2 text-gray-700">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
