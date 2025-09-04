import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

function loadLeaflet() {
  return new Promise((resolve, reject) => {
    if (window.L) return resolve(window.L);

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }

    if (!document.getElementById('leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => resolve(window.L);
      script.onerror = (e) => reject(e);
      document.body.appendChild(script);
    } else {
      const tryResolve = () => (window.L ? resolve(window.L) : setTimeout(tryResolve, 50));
      tryResolve();
    }
  });
}

const DEFAULT_AREAS = [
  { name: 'Downtown Ottawa', lat: 45.4215, lng: -75.6972 },
  { name: 'Kanata', lat: 45.3088, lng: -75.9206 },
  { name: 'Nepean', lat: 45.3467, lng: -75.7390 },
  { name: 'Barrhaven', lat: 45.2820, lng: -75.7306 },
  { name: 'Orleans', lat: 45.4676, lng: -75.5126 },
  { name: 'Gloucester', lat: 45.4034, lng: -75.6043 },
  { name: 'Stittsville', lat: 45.2576, lng: -75.9200 },
  { name: 'Vanier', lat: 45.4312, lng: -75.6586 },
];

export default function ServiceAreaMap({ areas = DEFAULT_AREAS, radius = 30000 }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    let isMounted = true;
    loadLeaflet().then((L) => {
      if (!isMounted || mapInstance.current || !mapRef.current) return;
      const center = [45.4215, -75.6972];
      const map = L.map(mapRef.current, { zoomControl: false }).setView(center, 11);
      mapInstance.current = map;

      const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      const cartoLight = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; OpenStreetMap &copy; CARTO'
      });
      const cartoDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; OpenStreetMap &copy; CARTO'
      });
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      L.control.layers({ 'OSM': osm, 'Light': cartoLight, 'Dark': cartoDark }, {}, { position: 'topright' }).addTo(map);

      L.circle(center, {
        radius,
        color: '#14b8a6',
        weight: 2,
        fillColor: '#14b8a6',
        fillOpacity: 0.08
      }).addTo(map);

      const markers = areas.map(a => {
        const m = L.marker([a.lat, a.lng]).addTo(map);
        m.bindPopup(`<strong>${a.name}</strong><br/>Premium interior painting`);
        return { ...a, marker: m };
      });

      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
      bounds.extend(center);
      map.fitBounds(bounds.pad(0.1));

      // Map is ready; flyTo will use mapInstance ref directly below
    });
    return () => { isMounted = false; };
  }, [areas, radius]);

  const flyTo = (lat, lng) => {
    if (mapInstance.current) {
      mapInstance.current.flyTo([lat, lng], 13, { duration: 0.8 });
    }
  };

  return (
    <div className="grid-2 service-area-grid">
      <Reveal as="section" className="card service-area-list">
        <h3>Communities We Serve</h3>
        <ul className="area-list">
          {areas.map(a => (
            <li key={a.name}>
              <button className="chip" onClick={() => flyTo(a.lat, a.lng)}>{a.name}</button>
            </li>
          ))}
        </ul>
        <p className="muted">Don’t see your neighborhood? <Link to="/contact">Contact us</Link> — we may still be able to help.</p>
      </Reveal>

      <Reveal as="section" className="card service-area-map">
        <div ref={mapRef} className="map-root" role="img" aria-label="Map showing service area across Ottawa" />
      </Reveal>
    </div>
  );
}
