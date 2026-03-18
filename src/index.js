import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './tailwind.css';
import './index.css';
import './styles.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Web vitals disabled to avoid extra dependency.

// Dev-only: one-time ntfy test push on app load to verify phone notifications
if (process.env.NODE_ENV === 'development') {
  try {
    if (typeof window !== 'undefined' && window.__QUOTE_WEBHOOK && !sessionStorage.getItem('ntfyTestSent')) {
      const text = 'Bugnot Painting and Renovation — ntfy test from website (auto)';
      const url = window.__QUOTE_WEBHOOK;
      // First try with rich headers (title/tags), then fall back to minimal request
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Title': 'Test from website',
          'X-Tags': 'white_check_mark'
        },
        body: text,
      })
        .then((res) => {
          if (!res.ok) throw new Error('ntfy rich push failed');
          sessionStorage.setItem('ntfyTestSent', '1');
          // eslint-disable-next-line no-console
          console.log('[ntfy] test push sent (rich)');
        })
        .catch(() => {
          // Minimal fallback (no custom headers)
          fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            body: text,
          })
            .then((res2) => {
              if (!res2.ok) throw new Error('ntfy minimal push failed');
              sessionStorage.setItem('ntfyTestSent', '1');
              // eslint-disable-next-line no-console
              console.log('[ntfy] test push sent (minimal)');
            })
            .catch((e) => {
              // eslint-disable-next-line no-console
              console.warn('[ntfy] test push failed', e);
            });
        });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[ntfy] test push exception', e);
  }
}
