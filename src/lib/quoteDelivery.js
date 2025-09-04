// Utility to send quote requests via Web3Forms (email) and optional webhook (for SMS/CRM)
// Keep keys public-safe. For SMS, use a no-auth webhook like Zapier/Twilio Function.

export async function sendQuoteRequest({ form, estimate, source = 'website' }) {
  // Prefer env var, but gracefully fallback to a runtime/global or known public key to unblock testing
  const accessKey =
    process.env.REACT_APP_WEB3FORMS_KEY ||
    (typeof window !== 'undefined' && window.__WEB3FORMS_KEY) ||
    '0f596a64-4127-4090-8049-590983010939';
  const webhookUrl =
    process.env.REACT_APP_QUOTE_WEBHOOK ||
    (typeof window !== 'undefined' && window.__QUOTE_WEBHOOK) ||
    '';

  // Build payload for email provider (Web3Forms)
  const payload = {
    access_key: accessKey,
    subject: 'New Free Quote Request — AB Interior Works',
    from_name: form.name,
    from_email: form.email,
    // Standard field names for compatibility
    name: form.name,
    email: form.email,
    phone: form.phone || '',
    service: form.service || '',
    message: form.message || '',
    source,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString(),
  };

  // Flatten estimator details if present
  if (estimate) {
    payload.estimate_rooms = String(estimate.rooms ?? '');
    payload.estimate_finish = String(estimate.finish ?? '');
    payload.estimate_ceilings = estimate.ceilings ? 'Yes' : 'No';
    payload.estimate_trim = estimate.trim ? 'Yes' : 'No';
    if (Number.isFinite(estimate.minHours)) payload.estimate_min_hours = String(estimate.minHours);
    if (Number.isFinite(estimate.maxHours)) payload.estimate_max_hours = String(estimate.maxHours);
    if (Number.isFinite(estimate.minCost)) payload.estimate_min_cost = String(estimate.minCost);
    if (Number.isFinite(estimate.maxCost)) payload.estimate_max_cost = String(estimate.maxCost);
  }

  // Basic spam honeypot support
  payload.botcheck = '';

  const results = { email: null, webhook: null };
  const errors = [];

  // Send to Web3Forms (email)
  try {
    if (!accessKey) throw new Error('Missing Web3Forms access key');
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success !== true) {
      const msg = (data && (data.message || data.error)) || `Web3Forms submission failed (status ${res.status})`;
      throw new Error(msg);
    }
    results.email = data;
  } catch (err) {
    errors.push(err);
  }

  // Optional webhook (for SMS/CRM automations)
  if (webhookUrl) {
    try {
      const isNtfy = /^https?:\/\/ntfy\.sh\//i.test(webhookUrl);
      if (isNtfy) {
        // Build a concise, readable message for ntfy push
        const p = payload || {};
        const name = p.name || p.from_name || 'New Lead';
        const service = p.service || 'Quote Request';
        const email = p.email || p.from_email || '';
        const phoneRaw = (p.phone || '').trim();
        const phoneDigits = phoneRaw.replace(/\D+/g, '');
        const phoneE164 = phoneDigits
          ? (phoneDigits.length === 10 ? `+1${phoneDigits}` : phoneDigits.startsWith('+') ? phoneDigits : `+${phoneDigits}`)
          : '';
        const title = `New Quote: ${name} — ${service}`;
        const lines = [
          `From: ${name}${email ? ` — ${email}` : ''}`,
          phoneRaw ? `Phone: ${phoneRaw} (${phoneE164 ? `tel:${phoneE164}` : 'tap to call'})` : null,
          `Service: ${service}`,
          p.estimate_min_cost && p.estimate_max_cost ? `Estimate: ${p.estimate_min_cost} – ${p.estimate_max_cost}` : null,
          p.estimate_min_hours && p.estimate_max_hours ? `Hours: ${p.estimate_min_hours} – ${p.estimate_max_hours}` : null,
          '',
          p.message ? `Message:\n${(p.message || '').slice(0, 800)}` : null,
          '',
          p.page_url ? `Page: ${p.page_url}` : null,
          p.source ? `Source: ${p.source}` : null,
          p.timestamp ? `Time: ${p.timestamp}` : null,
        ].filter(Boolean);
        const text = lines.join('\n');

        // First attempt: rich headers (title/tags/click)
        let res;
        try {
          res = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'X-Title': title,
              'X-Tags': 'paintbrush,telephone_receiver',
              // Prefer click-to-call; fallback to email, then page URL
              ...(phoneE164
                ? { 'X-Click': `tel:${phoneE164}` }
                : email
                ? { 'X-Click': `mailto:${email}` }
                : p.page_url
                ? { 'X-Click': p.page_url }
                : {}),
              'X-Priority': '4',
            },
            body: text,
          });
        } catch (e) {
          // Network/CORS error: fall back to minimal request
          res = null;
        }

        if (!res || !res.ok) {
          // Fallback: minimal CORS-friendly POST (no custom headers)
          const res2 = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            body: text,
          });
          if (!res2.ok) throw new Error(`ntfy webhook failed: ${res2.status}`);
        }
        results.webhook = { ok: true };
      } else {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'quote_request', payload }),
        });
        if (!res.ok) throw new Error(`Webhook failed: ${res.status}`);
        results.webhook = await res.json().catch(() => ({ ok: true }));
      }
    } catch (err) {
      // Do not block success if webhook fails; log or collect error for UI
      errors.push(err);
    }
  }

  const ok = !!results.email; // email is the critical path
  const message = errors.length ? String(errors[0]?.message || errors[0]) : '';
  return { ok, results, errors, message };
}
