import { useMemo, useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ShinyButton } from "../ui/shiny-button";

// ──────── PAINTING ESTIMATOR ────────
const HOURLY_MIN = 65;
const HOURLY_MAX = 90;
const SETUP_OVERHEAD_HOURS = 3;

const BASE_HOURS_PER_ROOM = {
  Essentials: 5,
  Premium: 7,
  Luxe: 9,
} as const;

type FinishLevel = keyof typeof BASE_HOURS_PER_ROOM;

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}

function computePaintingEstimate(
  rooms: number,
  finish: FinishLevel,
  includeCeilings: boolean,
  includeTrim: boolean
) {
  const base = rooms * BASE_HOURS_PER_ROOM[finish];
  const ceilings = includeCeilings ? rooms * 1.5 : 0;
  const trim = includeTrim ? rooms * 2 : 0;
  const hours = base + ceilings + trim + SETUP_OVERHEAD_HOURS;
  const minHours = Math.max(4, Math.round(hours * 0.9));
  const maxHours = Math.max(minHours + 2, Math.round(hours * 1.2));
  const minCost = minHours * HOURLY_MIN;
  const maxCost = maxHours * HOURLY_MAX;
  return { minHours, maxHours, minCost, maxCost };
}

// ──────── RENOVATION ESTIMATOR ────────
const RENO_RANGES: Record<string, Record<string, [number, number]>> = {
  "Kitchen Renovation": { Small: [15000, 25000], Medium: [25000, 45000], Large: [45000, 80000] },
  "Bathroom Renovation": { Small: [8000, 15000], Medium: [15000, 30000], Large: [30000, 55000] },
  "Basement Finishing": { Small: [20000, 35000], Medium: [35000, 55000], Large: [55000, 90000] },
  "Flooring Installation": { Small: [3000, 6000], Medium: [6000, 12000], Large: [12000, 22000] },
  "General Renovation": { Small: [10000, 20000], Medium: [20000, 40000], Large: [40000, 75000] },
};

type RenoType = keyof typeof RENO_RANGES;
type RenoSize = "Small" | "Medium" | "Large";

// ──────── ANIMATED NUMBER ────────
function AnimatedNumber({
  value,
  formatter,
  suffix,
}: {
  value: number;
  formatter?: (v: number) => string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number | null>(null);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    const duration = 600;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const v = from + (to - from) * ease(t);
      setDisplay(v);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  useEffect(() => {
    fromRef.current = display;
  }, [display]);

  const txt = formatter ? formatter(display) : Math.round(display).toString();
  return <span className="tabular-nums">{txt}{suffix || ""}</span>;
}

// ──────── MAIN COMPONENT ────────
export default function EstimatorMiniTool() {
  const navigate = useNavigate();

  // Project type toggle
  const [projectType, setProjectType] = useState<"Painting" | "Renovation">("Painting");

  // Painting state
  const [rooms, setRooms] = useState(3);
  const [finish, setFinish] = useState<FinishLevel>("Premium");
  const [includeCeilings, setIncludeCeilings] = useState(true);
  const [includeTrim, setIncludeTrim] = useState(true);
  const [activeTab, setActiveTab] = useState<"scope" | "options" | "summary">("scope");

  // Renovation state
  const [renoType, setRenoType] = useState<RenoType>("Kitchen Renovation");
  const [renoSize, setRenoSize] = useState<RenoSize>("Medium");

  // Painting estimate
  const paintEst = useMemo(
    () => computePaintingEstimate(rooms, finish, includeCeilings, includeTrim),
    [rooms, finish, includeCeilings, includeTrim]
  );

  // Renovation estimate
  const renoEst = useMemo(() => {
    const range = RENO_RANGES[renoType]?.[renoSize] || [0, 0];
    return { minCost: range[0], maxCost: range[1] };
  }, [renoType, renoSize]);

  // Choose which estimate to show
  const minCost = projectType === "Painting" ? paintEst.minCost : renoEst.minCost;
  const maxCost = projectType === "Painting" ? paintEst.maxCost : renoEst.maxCost;

  const ctaLabel = useMemo(() => {
    const labelCost = `${formatCurrency(minCost)}–${formatCurrency(maxCost)}`;
    if (projectType === "Painting") {
      return `Request exact quote — ${rooms} room${rooms > 1 ? "s" : ""} • ${labelCost}`;
    }
    return `Request exact quote — ${renoType} • ${labelCost}`;
  }, [projectType, rooms, minCost, maxCost, renoType]);

  const contactUrl = useMemo(() => {
    if (projectType === "Painting") {
      return `/contact?rooms=${rooms}&finish=${finish}&ceilings=${includeCeilings ? 1 : 0}&trim=${includeTrim ? 1 : 0}&minHours=${paintEst.minHours}&maxHours=${paintEst.maxHours}&minCost=${Math.round(paintEst.minCost)}&maxCost=${Math.round(paintEst.maxCost)}`;
    }
    return `/contact?service=${encodeURIComponent(renoType)}&size=${renoSize}&minCost=${renoEst.minCost}&maxCost=${renoEst.maxCost}`;
  }, [projectType, rooms, finish, includeCeilings, includeTrim, paintEst, renoType, renoSize, renoEst]);

  return (
    <section id="estimator" className="section isolate">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="section-header"
        >
          <h2 className="section-title">Plan Your Project — Instant Estimate</h2>
          <p className="muted">A quick ballpark to help you plan. Final pricing after an on‑site consult.</p>
        </motion.div>

        {/* Project Type Switcher */}
        <div className="mb-6" role="tablist" aria-label="Project type">
          <div className="relative p-1 rounded-xl bg-slate-100/10 text-sm flex max-w-xs mx-auto" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <span
              aria-hidden
              className="absolute inset-y-1 left-1 rounded-lg bg-teal-600/80 shadow transition-all duration-300"
              style={{
                width: 'calc(50% - 4px)',
                transform: projectType === 'Painting' ? 'translateX(0)' : 'translateX(100%)',
              }}
            />
            <button
              type="button"
              role="tab"
              aria-selected={projectType === 'Painting'}
              className={`relative z-10 flex-1 py-2.5 rounded-lg font-semibold transition ${projectType === 'Painting' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
              onClick={() => setProjectType('Painting')}
            >
              🎨 Painting
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={projectType === 'Renovation'}
              className={`relative z-10 flex-1 py-2.5 rounded-lg font-semibold transition ${projectType === 'Renovation' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
              onClick={() => setProjectType('Renovation')}
            >
              🔨 Renovation
            </button>
          </div>
        </div>

        {/* Mobile quick summary */}
        <div className="lg:hidden mb-4">
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-black/10 bg-white/70 backdrop-blur px-3 py-2 text-xs">
            {projectType === "Painting" ? (
              <>
                <span className="px-2 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">Rooms: {rooms}</span>
                <span className="px-2 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">Finish: {finish}</span>
                {includeCeilings ? <span className="px-2 py-1 rounded-full bg-slate-50 border border-black/10">Ceilings</span> : null}
                {includeTrim ? <span className="px-2 py-1 rounded-full bg-slate-50 border border-black/10">Trim</span> : null}
              </>
            ) : (
              <>
                <span className="px-2 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">{renoType}</span>
                <span className="px-2 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">Size: {renoSize}</span>
              </>
            )}
          </div>
        </div>

        {/* Mobile segmented tabs (painting only) */}
        {projectType === "Painting" && (
          <div className="lg:hidden mb-4" role="tablist" aria-label="Estimator sections">
            <div className="relative p-1 rounded-xl bg-slate-100 text-sm flex">
              <span
                aria-hidden
                className="absolute inset-y-1 left-1 w-1/3 rounded-lg bg-white shadow transition-transform duration-300"
                style={{ transform: `translateX(${activeTab === 'scope' ? '0%' : activeTab === 'options' ? '100%' : '200%'})` }}
              />
              <button type="button" role="tab" aria-selected={activeTab === 'scope'} id="tab-scope" aria-controls="panel-scope" tabIndex={activeTab === 'scope' ? 0 : -1} className={`relative z-10 flex-1 py-2 rounded-lg transition ${activeTab === 'scope' ? 'text-slate-900' : 'text-slate-600'}`} onClick={() => setActiveTab('scope')}>Scope</button>
              <button type="button" role="tab" aria-selected={activeTab === 'options'} id="tab-options" aria-controls="panel-options" tabIndex={activeTab === 'options' ? 0 : -1} className={`relative z-10 flex-1 py-2 rounded-lg transition ${activeTab === 'options' ? 'text-slate-900' : 'text-slate-600'}`} onClick={() => setActiveTab('options')}>Options</button>
              <button type="button" role="tab" aria-selected={activeTab === 'summary'} id="tab-summary" aria-controls="panel-summary" tabIndex={activeTab === 'summary' ? 0 : -1} className={`relative z-10 flex-1 py-2 rounded-lg transition ${activeTab === 'summary' ? 'text-slate-900' : 'text-slate-600'}`} onClick={() => setActiveTab('summary')}>Summary</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.6 }}
            className="order-2 lg:order-1 lg:col-span-3 p-0 overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur shadow-sm"
          >
            <div className="p-6">
              {projectType === "Painting" ? (
                <>
                  {/* Scope panel */}
                  <div
                    className={`${activeTab === 'scope' ? 'block' : 'hidden'} lg:block`}
                    role="tabpanel" id="panel-scope" aria-labelledby="tab-scope" aria-hidden={activeTab !== 'scope'}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Your scope</h3>
                      <span className="text-sm opacity-60">Fine‑tune below</span>
                    </div>
                    {/* Quick presets */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        { label: 'Apartment', val: { rooms: 2, finish: 'Essentials' as FinishLevel, ceilings: false, trim: true } },
                        { label: 'Townhome', val: { rooms: 4, finish: 'Premium' as FinishLevel, ceilings: true, trim: true } },
                        { label: 'Detached', val: { rooms: 6, finish: 'Luxe' as FinishLevel, ceilings: true, trim: true } },
                      ].map(p => (
                        <button key={p.label} type="button" className="px-3 py-1.5 rounded-full text-xs border border-white/20 bg-white/10 hover:bg-teal-500/20 hover:border-teal-400/50 transition" onClick={() => { setRooms(p.val.rooms); setFinish(p.val.finish); setIncludeCeilings(p.val.ceilings); setIncludeTrim(p.val.trim); }}>
                          {p.label}
                        </button>
                      ))}
                    </div>
                    {/* Rooms slider */}
                    <div className="mt-6">
                      <label className="text-sm font-medium">Number of rooms</label>
                      <div className="mt-2 grid grid-cols-[1fr_auto] items-center gap-4">
                        <input type="range" min={1} max={8} step={1} value={rooms} onChange={(e) => setRooms(parseInt(e.target.value, 10))} className="w-full accent-teal-600" />
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))} aria-label="Decrease rooms" className="h-9 w-9 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 active:scale-95">-</button>
                          <div className="w-10 text-center tabular-nums font-semibold">{rooms}</div>
                          <button type="button" onClick={() => setRooms(Math.min(8, rooms + 1))} aria-label="Increase rooms" className="h-9 w-9 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 active:scale-95">+</button>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs opacity-60"><span>1</span><span>8</span></div>
                    </div>
                    {/* Finish level */}
                    <div className="mt-6">
                      <label className="text-sm font-medium">Finish level</label>
                      <div className="mt-2 flex gap-2">
                        {(["Essentials", "Premium", "Luxe"] as FinishLevel[]).map((lvl) => {
                          const active = finish === lvl;
                          return (
                            <button key={lvl} type="button" onClick={() => setFinish(lvl)} className={`px-3 py-1.5 rounded-full text-sm border transition transform hover:shadow-sm active:scale-95 ` + (active ? "bg-teal-600 text-white border-transparent shadow-md ring-2 ring-teal-500/50" : "bg-white/10 border-white/20 hover:border-teal-400/50 hover:bg-teal-500/20")} aria-pressed={active}>
                              <span className="inline-flex items-center gap-1.5">
                                {lvl === "Essentials" ? (<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /></svg>) : lvl === "Premium" ? (<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3 18 9 12 21 6 9 12 3Z" /></svg>) : (<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>)}
                                {lvl}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs mt-2 opacity-60">
                        {finish === "Essentials" && "Straightforward repaint, solid coverage, efficient timeline."}
                        {finish === "Premium" && "Upgraded prep & materials for a durable, refined finish."}
                        {finish === "Luxe" && "Meticulous prep, premium coatings, gallery‑grade result."}
                      </p>
                    </div>
                  </div>

                  {/* Options panel */}
                  <div
                    className={`${activeTab === 'options' ? 'block' : 'hidden'} lg:block`}
                    role="tabpanel" id="panel-options" aria-labelledby="tab-options" aria-hidden={activeTab !== 'options'}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Options</h3>
                      <span className="text-sm opacity-60">Extras</span>
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Toggle checked={includeCeilings} onChange={setIncludeCeilings} label="Include ceilings" hint="Standard height" />
                      <Toggle checked={includeTrim} onChange={setIncludeTrim} label="Include trim & doors" hint="Baseboards, casings, doors" />
                    </div>
                  </div>
                </>
              ) : (
                /* ─── RENOVATION CONTROLS ─── */
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Renovation Details</h3>
                    <span className="text-sm opacity-60">Select your project</span>
                  </div>
                  {/* Reno type */}
                  <div className="mt-4">
                    <label className="text-sm font-medium">Renovation Type</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(Object.keys(RENO_RANGES) as RenoType[]).map((rt) => {
                        const active = renoType === rt;
                        return (
                          <button key={rt} type="button" onClick={() => setRenoType(rt)} className={`px-3 py-1.5 rounded-full text-sm border transition transform hover:shadow-sm active:scale-95 ` + (active ? "bg-teal-600 text-white border-transparent shadow-md ring-2 ring-teal-500/50" : "bg-white/10 border-white/20 hover:border-teal-400/50 hover:bg-teal-500/20")} aria-pressed={active}>
                            {rt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {/* Project size */}
                  <div className="mt-6">
                    <label className="text-sm font-medium">Project Size</label>
                    <div className="mt-2 flex gap-2">
                      {(["Small", "Medium", "Large"] as RenoSize[]).map((sz) => {
                        const active = renoSize === sz;
                        return (
                          <button key={sz} type="button" onClick={() => setRenoSize(sz)} className={`px-4 py-2 rounded-full text-sm border transition transform hover:shadow-sm active:scale-95 flex-1 ` + (active ? "bg-teal-600 text-white border-transparent shadow-md ring-2 ring-teal-500/50" : "bg-white/10 border-white/20 hover:border-teal-400/50 hover:bg-teal-500/20")} aria-pressed={active}>{sz}</button>
                        );
                      })}
                    </div>
                    <p className="text-xs mt-2 opacity-60">
                      {renoSize === "Small" && "Minor updates — cosmetic refresh, smaller spaces."}
                      {renoSize === "Medium" && "Moderate scope — updated finishes, layout tweaks, standard fixtures."}
                      {renoSize === "Large" && "Full transformation — premium materials, structural changes, luxury finishes."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Subtle bottom gradient accent */}
            <div className="h-2 w-full bg-gradient-to-r from-teal-400/40 via-transparent to-teal-400/40" />
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className={`order-1 lg:order-2 lg:col-span-2 flex flex-col justify-between rounded-2xl border border-white/20 bg-white/10 backdrop-blur shadow-sm overflow-hidden lg:sticky lg:top-24 ${projectType === "Painting" && activeTab === 'summary' ? 'block' : projectType === "Renovation" ? 'block' : 'hidden'} lg:block`}
          >
            <div className="h-2 w-full bg-gradient-to-r from-teal-500/60 via-teal-400/30 to-transparent" />
            <div className="p-6">
              <h3 className="text-lg font-semibold">Estimate</h3>
              {/* Range bar */}
              <div className="mt-3">
                <div className="h-2 rounded-full overflow-hidden bg-gradient-to-r from-teal-200 via-teal-400 to-teal-600 relative">
                  <div className="absolute inset-0 opacity-30 animate-pulse bg-[radial-gradient(ellipse_at_center,white,transparent_60%)]" />
                </div>
                <div className="flex justify-between text-xs opacity-60 mt-1">
                  <span>{formatCurrency(minCost)}</span>
                  <span>{formatCurrency(maxCost)}</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {projectType === "Painting" ? (
                  <>
                    <Stat label="Estimated hours" value={<><AnimatedNumber value={paintEst.minHours} suffix="h" />–<AnimatedNumber value={paintEst.maxHours} suffix="h" /></>} />
                    <Stat label="Estimated cost" value={<><AnimatedNumber value={paintEst.minCost} formatter={formatCurrency} />–<AnimatedNumber value={paintEst.maxCost} formatter={formatCurrency} /></>} />
                    <Stat label="Rooms" value={`${rooms}`} />
                    <Stat label="Finish" value={finish} />
                  </>
                ) : (
                  <>
                    <Stat label="Renovation type" value={renoType.replace(' Renovation', '').replace(' Finishing', '').replace(' Installation', '')} />
                    <Stat label="Project size" value={renoSize} />
                    <Stat label="Budget range" value={<><AnimatedNumber value={renoEst.minCost} formatter={formatCurrency} />–<AnimatedNumber value={renoEst.maxCost} formatter={formatCurrency} /></>} />
                    <Stat label="Type" value="Renovation" />
                  </>
                )}
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className="sticky bottom-0 -m-6 p-6 pt-3 pb-[env(safe-area-inset-bottom)] bg-gradient-to-t from-white/10 via-white/5 to-transparent md:static md:m-0 md:p-0">
                <ShinyButton
                  className="w-full"
                  onClick={() => navigate(contactUrl)}
                  aria-label={ctaLabel}
                  style={{ ["--shiny-cta-bg" as any]: "#0f766e", ["--shiny-cta-bg-subtle" as any]: "#115e59", ["--shiny-cta-fg" as any]: "#ffffff", ["--shiny-cta-highlight" as any]: "#2dd4bf", ["--shiny-cta-highlight-subtle" as any]: "#99f6e4" } as CSSProperties}
                >
                  {ctaLabel}
                </ShinyButton>
                <div className="mt-3 text-sm text-slate-100/90">
                  Prefer to talk? <a href="tel:+13432545205" className="underline text-teal-200">Call (343) 254-5205</a> for fast advice and scheduling — no obligation.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="p-4 rounded-xl border border-white/20 bg-white/5">
      <div className="text-xs opacity-60">{label}</div>
      <div className="text-base font-semibold mt-1 tabular-nums" aria-live="polite">{value}</div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={
        `flex items-center justify-between w-full p-4 rounded-xl border border-white/20 transition transform hover:shadow-sm active:scale-[.99] ` +
        (checked ? "bg-teal-500/20 border-teal-400/50" : "bg-white/5 hover:border-white/30")
      }
      aria-pressed={checked}
    >
      <div className="text-left">
        <div className="text-sm font-medium">{label}</div>
        {hint ? <div className="text-xs opacity-60 mt-0.5">{hint}</div> : null}
      </div>
      <span
        className={
          `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ` +
          (checked ? "bg-teal-600" : "bg-slate-300")
        }
        role="switch"
        aria-checked={checked}
      >
        <span
          className={
            `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ` +
            (checked ? "translate-x-5" : "translate-x-0")
          }
        />
      </span>
    </button>
  );
}
