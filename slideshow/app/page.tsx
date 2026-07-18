"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  Check,
  CreditCard,
  Clock3,
  MapPin,
  Menu,
  Phone,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";

const slides = ["One Number", "The problem", "The product", "Live demo", "Why now", "Start local"];

const demoSteps = [
  { label: "Customer calls", detail: "A homeowner needs help today.", icon: Phone },
  { label: "AI voice agent", detail: "Issue, location, urgency, and details captured.", icon: Sparkles },
  { label: "Nearby providers", detail: "Verified providers filtered by service area.", icon: MapPin },
  { label: "Customer confirms", detail: "Customer selects a provider and books.", icon: BadgeCheck },
  { label: "Payment", detail: "Customer pays securely through Stripe.", icon: CreditCard },
  { label: "Provider notified", detail: "Job details sent by SMS or email.", icon: Bell },
  { label: "Provider confirms", detail: "Provider accepts and shares job status.", icon: UserRound },
  { label: "Job completed", detail: "Customer confirms resolution and rates.", icon: Check },
];

function Eyebrow({ children, number }: { children: React.ReactNode; number: string }) {
  return <p className="eyebrow"><span>{number}</span>{children}</p>;
}

function SlideOne() {
  return <section className="slide slide-one" aria-labelledby="slide-one-title">
    <div className="grid-wash" />
    <div className="slide-content hero-content">
      <Eyebrow number="01 / 06">A local dispatch service</Eyebrow>
      <div className="hero-grid">
        <div>
          <h1 id="slide-one-title">One number<br /><em>when home breaks.</em></h1>
          <p className="hero-copy">Call once. Tell us what’s wrong. We find an available local pro who can help today.</p>
          <div className="hero-actions"><span className="hero-route"><Phone size={15} /> Call <i /> <Sparkles size={15} /> Understand <i /> <UserRound size={15} /> Connect</span></div>
        </div>
        <div className="phone-orbit" aria-hidden="true">
          <div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" />
          <div className="orbit-core"><Phone size={38} strokeWidth={1.5} /><span>CALL<br /><strong>ONE</strong></span></div>
          <div className="orbit-node node-top"><MapPin size={15} /> San Ramon</div>
          <div className="orbit-node node-right"><Wrench size={15} /> Local pros</div>
          <div className="orbit-node node-bottom"><ShieldCheck size={15} /> Vetted supply</div>
          <div className="outcome-card"><span className="outcome-check"><Check size={13} /></span><div><small>Help confirmed</small><strong>Blue Wave Plumbing</strong><span>Kitchen sink leak · today</span></div></div>
        </div>
      </div>
    </div>
    <div className="hero-foot"><span>Built for the urgent, non-emergency moment</span><span>One Number / 2026</span></div>
  </section>;
}

function SlideTwo() {
  const fragments = ["Search", "Explain again", "Compare", "Hope"];
  return <section className="slide slide-problem" aria-labelledby="slide-two-title">
    <div className="slide-content">
      <Eyebrow number="02 / 06">The current experience</Eyebrow>
      <div className="split-heading"><div><h2 id="slide-two-title">Finding help becomes<br /><em>a second job.</em></h2></div><p className="lede">A leaking sink should not require a research project, five phone calls, and a guess about who is actually available.</p></div>
      <div className="journey-track">{fragments.map((item, index) => <div className="journey-step" key={item}><span className="fragment-index">0{index + 1}</span><div className={`journey-mark journey-mark-${index}`}><span /><span /></div><div><strong>{item}</strong><small>{["Who can help?", "To every provider", "Quality, price, time", "Someone is available"][index]}</small></div>{index < fragments.length - 1 && <span className="journey-connector" />}</div>)}</div>
      <div className="callout"><span className="callout-mark">→</span><p>The customer doesn’t want another listing.<br /><strong>They want a person who can solve it.</strong></p></div>
    </div>
  </section>;
}

function SlideThree() {
  const flow = ["Call", "Voice agent", "Find nearby", "Confirm + book", "Payment", "Notify", "Provider", "Complete"];
  return <section className="slide slide-product" aria-labelledby="slide-three-title">
    <div className="slide-content">
      <Eyebrow number="03 / 06">The product</Eyebrow>
      <div className="split-heading"><div><h2 id="slide-three-title">Say it once.<br /><em>We do the sorting.</em></h2></div><p className="lede">One conversation turns an ordinary description into a clear, human-reviewed service request.</p></div>
      <div className="flow-track">{flow.map((item, index) => <div className="flow-item" key={item}><div className={`flow-icon ${index === 7 ? "flow-icon-final" : ""}`}>{index === 0 ? <Phone size={21} /> : index === 1 ? <Sparkles size={21} /> : index === 2 ? <MapPin size={21} /> : index === 3 ? <BadgeCheck size={21} /> : index === 4 ? <CreditCard size={21} /> : index === 5 ? <Bell size={21} /> : index === 6 ? <UserRound size={21} /> : <Check size={21} />}</div><strong>{item}</strong>{index < flow.length - 1 && <span className="flow-line" />}</div>)}</div>
      <div className="product-stage"><div className="request-card"><div className="card-top"><span className="live-dot" /> New request <span className="time-stamp">just now</span></div><h3>“My kitchen sink is leaking<br />and I need help today.”</h3><div className="request-tags"><span><Wrench size={13} /> Plumbing</span><span><MapPin size={13} /> 94583</span><span className="urgent"><Clock3 size={13} /> Urgent</span></div></div><div className="annotation-rail"><div><ShieldCheck size={18} /><span><strong>Safety first</strong><small>Emergency language routes away.</small></span></div><div><Bell size={18} /><span><strong>Consent-led updates</strong><small>SMS only when the customer says yes.</small></span></div><div><UserRound size={18} /><span><strong>Human fallback</strong><small>Uncertain requests get reviewed.</small></span></div></div></div>
    </div>
  </section>;
}

function SlideFour() {
  const [step, setStep] = useState(-1);
  const active = step >= 0 ? demoSteps[step] : null;
  useEffect(() => {
    if (step < 0 || step >= demoSteps.length - 1) return;
    const timer = window.setTimeout(() => setStep((current) => current + 1), 1150);
    return () => window.clearTimeout(timer);
  }, [step]);
  return <section className="slide demo-slide" aria-labelledby="slide-four-title">
    <div className="slide-content">
      <Eyebrow number="04 / 06">The product moment</Eyebrow>
      <div className="split-heading"><div><h2 id="slide-four-title">From one sentence<br /><em>to help confirmed.</em></h2></div><p className="lede">Watch the messy part disappear: intake, eligibility, availability, and a clear next step.</p></div>
      <div className="demo-grid"><div className="demo-call"><div className="demo-call-top"><span className="demo-avatar"><Phone size={18} /></span><div><strong>One Number intake</strong><small>Customer request · now</small></div><span className="demo-live"><i /> {step >= 7 ? "DONE" : "LIVE"}</span></div><div className="quote-bubble">“My kitchen sink is leaking and I need help today.”</div><div className="demo-transcript"><span>Structured request</span><div><b>PLUMBING</b><b>URGENT</b><b>94583</b></div></div>{step >= 5 && <div className="customer-outcome"><div className="outcome-check"><Check size={14} /></div><div><small>Job lifecycle</small><strong>{step >= 7 ? "Job completed" : "Provider notified"}</strong><span>{step >= 7 ? "Customer confirms resolution" : "Blue Wave Plumbing accepted · SMS sent"}</span></div></div>}<div className="demo-buttons"><button className="button button-primary" onClick={() => setStep(step === -1 || step === demoSteps.length - 1 ? 0 : step)}>{step === -1 ? <><Play size={15} /> Start demo</> : step === demoSteps.length - 1 ? <><RotateCcw size={15} /> Replay</> : <><span className="button-pulse" /> Playing automatically</>}</button><button className="button button-quiet" onClick={() => setStep(-1)} disabled={step === -1}>Reset</button></div></div><div className="demo-rail">{demoSteps.map((item, index) => { const Icon = item.icon; return <div className={`timeline-step ${index <= step ? "is-active" : ""} ${index === step ? "is-current" : ""}`} key={item.label}><div className="timeline-icon"><Icon size={16} /></div><div><strong>{item.label}</strong><small>{index <= step ? item.detail : "Waiting for the next signal"}</small></div></div> })}<div className="demo-status">{active ? <><span className="live-dot" /> {active.label} <strong>{step + 1}/8</strong></> : <><span className="status-ring" /> Press start to play the workflow</>}</div></div></div>
    </div>
  </section>;
}

function SlideFive() {
  const pillars = [{ icon: Sparkles, title: "Voice AI layer", detail: "Speech-to-text, intent, location, urgency, and the right follow-up questions." }, { icon: MapPin, title: "Matching engine", detail: "Nearby providers filtered by category, service area, verification, and availability." }, { icon: Bell, title: "Job lifecycle", detail: "Payment, SMS updates, acceptance, completion, rating, and follow-up all stay connected." }];
  return <section className="slide slide-why" aria-labelledby="slide-five-title"><div className="slide-content"><Eyebrow number="05 / 06">The system behind the call</Eyebrow><div className="split-heading"><div><h2 id="slide-five-title">One request.<br /><em>Every handoff visible.</em></h2></div><p className="lede">The workflow is simple for the customer because the system keeps the complicated parts connected behind the scenes.</p></div><div className="safeguard-list">{pillars.map(({ icon: Icon, title, detail }, index) => <div className="safeguard" key={title}><span className="safeguard-number">0{index + 1}</span><Icon size={20} /><div><h3>{title}</h3><p>{detail}</p></div></div>)}</div><div className="tech-line"><span>FASTEST BUILD PATH</span><strong>Twilio</strong><i /> <strong>ElevenLabs</strong><i /> <strong>Next.js</strong><i /> <strong>Supabase</strong><i /> <strong>Stripe</strong></div><div className="metric-strip"><div><strong>Resolved requests</strong><span>North-star metric</span></div><div><strong>Fill rate</strong><span>Can we keep the promise?</span></div><div><strong>Provider response</strong><span>Minutes, not days</span></div><div><strong>Completion rate</strong><span>Did the problem end?</span></div></div></div></section>;
}

function SlideSix({ onRestart }: { onRestart: () => void }) {
  return <section className="slide final-slide" aria-labelledby="slide-six-title">
    <div className="final-grid-mark" aria-hidden="true"><span /><span /><span /></div>
    <div className="slide-content final-content">
      <div className="final-topline"><Eyebrow number="06 / 06">The first move</Eyebrow><span className="final-topline-note">THE NEXT TEST</span></div>
      <div className="closing-editorial">
        <div className="closing-lead">
          <div className="final-mark"><span className="final-mark-line" /><Phone size={22} /></div>
          <p className="closing-index">ONE NUMBER / 01</p>
          <h2 id="slide-six-title">Start local.<br /><em>Learn fast.</em></h2>
          <p className="final-copy">Prove the promise in one neighborhood: a customer describes a problem once and reaches the right person.</p>
          <button className="button button-primary closing-replay" onClick={onRestart}><RotateCcw size={15} /> Replay deck</button>
        </div>
        <div className="pilot-ledger" aria-label="San Ramon pilot plan">
          <p className="closing-kicker">SAN RAMON PILOT</p>
          <div className="ledger-row"><strong>01</strong><span><b>Launch city</b><small>Keep the service area tight enough to operate personally.</small></span></div>
          <div className="ledger-row"><strong>10–15</strong><span><b>Verified providers</b><small>Recruit dependable supply before promoting demand.</small></span></div>
          <div className="ledger-row"><strong>20</strong><span><b>Observed requests</b><small>Route the first jobs manually and measure the handoffs.</small></span></div>
        </div>
      </div>
      <div className="success-line"><Check size={16} /><span><b>Success condition</b> A customer describes a problem once and reaches an available provider.</span></div>
    </div>
    <div className="hero-foot"><span>One Number / San Ramon pilot</span><span>Thank you</span></div>
  </section>;
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const goTo = useCallback((index: number) => { setCurrent(Math.max(0, Math.min(slides.length - 1, index))); setMenuOpen(false); }, []);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const previous = useCallback(() => goTo(current - 1), [current, goTo]);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (["ArrowRight", " ", "PageDown"].includes(event.key)) { event.preventDefault(); next(); } if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); previous(); } if (event.key === "Home") goTo(0); if (event.key === "End") goTo(slides.length - 1); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [goTo, next, previous]);
  const Slide = useMemo(() => [SlideOne, SlideTwo, SlideThree, SlideFour, SlideFive, () => <SlideSix onRestart={() => goTo(0)} />][current], [current, goTo]);
  return <main className="deck-shell"><header className="deck-nav"><div className="brand"><span className="brand-icon"><Phone size={15} /></span><span>ONE NUMBER</span><small>LOCAL DISPATCH</small></div><nav className={`slide-nav ${menuOpen ? "is-open" : ""}`} aria-label="Presentation slides">{slides.map((slide, index) => <button key={slide} onClick={() => goTo(index)} className={index === current ? "is-current" : ""} aria-label={`Go to slide ${index + 1}: ${slide}`} aria-current={index === current ? "step" : undefined}><span>0{index + 1}</span><i /><b>{slide}</b></button>)}</nav><div className="nav-controls"><span className="slide-counter">0{current + 1} <small>/ 06</small></span><button className="icon-button mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close slide menu" : "Open slide menu"} aria-expanded={menuOpen}><Menu size={17} /></button><button className="icon-button" onClick={previous} disabled={current === 0} aria-label="Previous slide"><ArrowLeft size={17} /></button><button className="icon-button" onClick={next} disabled={current === slides.length - 1} aria-label="Next slide"><ArrowRight size={17} /></button></div></header><div className="slide-viewport" aria-live="polite"><Slide /></div><div className="bottom-hint"><span><kbd>←</kbd><kbd>→</kbd> navigate</span><span>ONE NUMBER / PITCH DECK</span></div></main>;
}
