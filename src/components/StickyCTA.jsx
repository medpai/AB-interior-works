import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function StickyCTA() {
  const location = useLocation();
  const isContact = location.pathname === '/contact';

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden">
      <div className="mx-auto max-w-screen-xl">
        <div className="mx-3 mb-3 sm:mx-4 sm:mb-4 rounded-2xl shadow-xl bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border border-gray-200/50 flex overflow-hidden">
          <a
            href="tel:+13432545205"
            className="flex-1 flex items-center justify-center gap-2 sm:gap-3 py-4 sm:py-5 text-teal-700 font-semibold text-sm sm:text-base transition-colors hover:bg-teal-50 active:bg-teal-100"
            aria-label="Call Bugnot Painting and Renovation (343) 254-5205"
            onClick={() => {
              if (typeof window !== 'undefined' && typeof window.__trackPhoneCall === 'function') {
                window.__trackPhoneCall('StickyCTA Call (343) 254-5205', '+13432545205');
              }
            }}
          >
            <svg 
              width="20" 
              height="20" 
              className="sm:w-5 sm:h-5" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.58 2.5a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.8.26 1.64.46 2.5.58A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="whitespace-nowrap">Call Now</span>
          </a>
          {!isContact && (
            <>
              <div className="w-px bg-gray-200"></div>
              <Link
                to="/contact"
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 py-4 sm:py-5 bg-teal-600 text-white font-semibold text-sm sm:text-base transition-colors hover:bg-teal-700 active:bg-teal-800"
                aria-label="Get a free quote"
              >
                <svg 
                  width="20" 
                  height="20" 
                  className="sm:w-5 sm:h-5" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  aria-hidden="true"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="whitespace-nowrap">Get Quote</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
