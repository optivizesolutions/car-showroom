"use client";

import { useState } from "react";
import Showroom from "@/components/Showroom";

const finishes = [
  { name: "Glacier", hex: "#c5ced5", label: "01" },
  { name: "Rosso", hex: "#9e302d", label: "02" },
  { name: "Verde", hex: "#52685d", label: "03" },
  { name: "Midnight", hex: "#202a39", label: "04" },
];

export default function Home() {
  const [finish, setFinish] = useState(finishes[0]);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Aurel home">AUREL<span>®</span></a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#craft">The craft</a>
          <a href="#specifications">Specifications</a>
          <a href="#configure">Configure</a>
        </nav>
        <a className="header-cta" href="mailto:studio@aurel.example">Request a private viewing <span>↗</span></a>
        <button className="menu-button" aria-label="Open menu"><i /><i /></button>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> THE GRAND TOURING COLLECTION · 2026</p>
          <h1>Made for<br />the <em>feeling.</em></h1>
          <p className="hero-description">A new expression of grand touring.<br />Unmistakably composed. Entirely your own.</p>
          <a className="text-link" href="#configure">Discover GT—01 <span>↓</span></a>
        </div>

        <div className="hero-index"><span>01</span><i />04</div>
        <div className="scene-wrap"><Showroom color={finish.hex} /></div>
        <div className="scene-caption"><span className="caption-dot" /> INTERACTIVE 3D · DRAG TO EXPLORE</div>

        <div className="hero-bottom" id="configure">
          <div className="model-title"><span className="eyebrow">AUREL AUTOMOTIVE</span><h2>GT—01 <span>GRAND TOURER</span></h2></div>
          <div className="finish-picker" aria-label="Choose exterior finish">
            <span className="eyebrow">EXTERIOR FINISH</span>
            <div className="finish-options">
              {finishes.map((item) => (
                <button key={item.name} className={`finish-swatch ${finish.name === item.name ? "is-active" : ""}`} style={{ "--swatch": item.hex } as React.CSSProperties} onClick={() => setFinish(item)} aria-label={`Select ${item.name}`} aria-pressed={finish.name === item.name} title={item.name} />
              ))}
              <span className="finish-name">{finish.name}</span>
            </div>
          </div>
          <a className="build-link" href="mailto:studio@aurel.example?subject=GT-01%20configuration">Begin your commission <span>↗</span></a>
        </div>
      </section>

      <section className="details" id="craft">
        <div className="details-heading"><p className="eyebrow">A STUDY IN PURPOSE</p><h2>Every line has<br />a <em>destination.</em></h2></div>
        <p className="details-copy">Sculpted by the wind, refined by hand. GT—01 brings the spirit of the open road into focus—with considered materials, a balanced stance, and performance engineered around the pleasure of the journey.</p>
        <div className="spec-row" id="specifications">
          <div><span className="eyebrow">POWERTRAIN</span><strong>V8 <small>BITURBO</small></strong></div>
          <div><span className="eyebrow">OUTPUT</span><strong>612 <small>PS</small></strong></div>
          <div><span className="eyebrow">0—100 KM/H</span><strong>3.6 <small>SEC</small></strong></div>
          <div><span className="eyebrow">TOP SPEED</span><strong>315 <small>KM/H</small></strong></div>
        </div>
      </section>

      <footer className="footer"><a className="wordmark" href="#home">AUREL<span>®</span></a><span>CRAFTED FOR THE LONG WAY HOME.</span><span>© 2026 AUREL MOTOR COMPANY</span></footer>
    </main>
  );
}
