import React,{ useState, useEffect } from "react";

// ── Consistent SVG icon system (20×20 stroked) ───────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor", sw = 1.6 }) => {
  const s = { width: size, height: size, display: "block", flexShrink: 0 };
  const p = { fill: "none", stroke: color, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    scan:      <svg style={s} viewBox="0 0 24 24"><rect {...p} x="3" y="3" width="7" height="7" rx="1"/><rect {...p} x="14" y="3" width="7" height="7" rx="1"/><rect {...p} x="3" y="14" width="7" height="7" rx="1"/><path {...p} d="M14 14h2v2h-2zM18 14h3M14 18v3M18 18h3v3h-3z"/></svg>,
    chart:     <svg style={s} viewBox="0 0 24 24"><path {...p} d="M3 3v18h18"/><path {...p} d="M7 16V10M12 16V6M17 16v-4"/></svg>,
    zap:       <svg style={s} viewBox="0 0 24 24"><path {...p} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    shield:    <svg style={s} viewBox="0 0 24 24"><path {...p} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    upload:    <svg style={s} viewBox="0 0 24 24"><path {...p} d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline {...p} points="17 8 12 3 7 8"/><line {...p} x1="12" y1="3" x2="12" y2="15"/></svg>,
    file:      <svg style={s} viewBox="0 0 24 24"><path {...p} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline {...p} points="14 2 14 8 20 8"/><line {...p} x1="16" y1="13" x2="8" y2="13"/><line {...p} x1="16" y1="17" x2="8" y2="17"/></svg>,
    check:     <svg style={s} viewBox="0 0 24 24"><polyline {...p} points="20 6 9 17 4 12"/></svg>,
    x:         <svg style={s} viewBox="0 0 24 24"><line {...p} x1="18" y1="6" x2="6" y2="18"/><line {...p} x1="6" y1="6" x2="18" y2="18"/></svg>,
    alert:     <svg style={s} viewBox="0 0 24 24"><path {...p} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line {...p} x1="12" y1="9" x2="12" y2="13"/><line {...p} x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    scale:     <svg style={s} viewBox="0 0 24 24"><line {...p} x1="12" y1="2" x2="12" y2="22"/><path {...p} d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
    search:    <svg style={s} viewBox="0 0 24 24"><circle {...p} cx="11" cy="11" r="8"/><line {...p} x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    sliders:   <svg style={s} viewBox="0 0 24 24"><line {...p} x1="4" y1="21" x2="4" y2="14"/><line {...p} x1="4" y1="10" x2="4" y2="3"/><line {...p} x1="12" y1="21" x2="12" y2="12"/><line {...p} x1="12" y1="8" x2="12" y2="3"/><line {...p} x1="20" y1="21" x2="20" y2="16"/><line {...p} x1="20" y1="12" x2="20" y2="3"/><line {...p} x1="1" y1="14" x2="7" y2="14"/><line {...p} x1="9" y1="8" x2="15" y2="8"/><line {...p} x1="17" y1="16" x2="23" y2="16"/></svg>,
    download:  <svg style={s} viewBox="0 0 24 24"><path {...p} d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline {...p} points="7 10 12 15 17 10"/><line {...p} x1="12" y1="15" x2="12" y2="3"/></svg>,
    share:     <svg style={s} viewBox="0 0 24 24"><circle {...p} cx="18" cy="5" r="3"/><circle {...p} cx="6" cy="12" r="3"/><circle {...p} cx="18" cy="19" r="3"/><line {...p} x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line {...p} x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    refresh:   <svg style={s} viewBox="0 0 24 24"><polyline {...p} points="23 4 23 10 17 10"/><path {...p} d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
    arrow:     <svg style={s} viewBox="0 0 24 24"><line {...p} x1="5" y1="12" x2="19" y2="12"/><polyline {...p} points="12 5 19 12 12 19"/></svg>,
    users:     <svg style={s} viewBox="0 0 24 24"><path {...p} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle {...p} cx="9" cy="7" r="4"/><path {...p} d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    gavel:     <svg style={s} viewBox="0 0 24 24"><path {...p} d="M14.5 2.5l7 7-14 14-7-7z"/><line {...p} x1="3" y1="21" x2="9" y2="15"/></svg>,
    trending:  <svg style={s} viewBox="0 0 24 24"><polyline {...p} points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline {...p} points="17 6 23 6 23 12"/></svg>,
  };
  return icons[name] || null;
};

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:       #0b0c10;
    --ink-soft:  #3c4055;
    --ink-muted: #8b90a8;
    --surface:   #f5f6f9;
    --white:     #ffffff;
    --accent:    #1a56ff;
    --green:     #00c2a0;
    --red:       #ff4d6d;
    --amber:     #ff7c3a;
    --border:    rgba(11,12,16,0.08);
    --radius-sm: 10px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --shadow-sm: 0 2px 8px rgba(11,12,16,0.05);
    --shadow-md: 0 8px 32px rgba(11,12,16,0.09);
    --shadow-lg: 0 24px 56px rgba(11,12,16,0.13);
    --fh: 'Poppins', sans-serif;
    --fb: 'Inter', sans-serif;
    --ease: cubic-bezier(0.4,0,0.2,1);
    --t: 0.22s cubic-bezier(0.4,0,0.2,1);
  }

  html, body, #root { height: 100%; }
  body { font-family: var(--fb); background: var(--surface); color: var(--ink); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 62px;
    background: rgba(245,246,249,0.9); backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo { font-family: var(--fh); font-size: 0.97rem; font-weight: 700; letter-spacing: -0.02em; color: var(--ink); display: flex; align-items: center; gap: 9px; cursor: pointer; transition: opacity var(--t); }
  .nav-logo:hover { opacity: 0.6; }
  .nav-logo-mark { width: 30px; height: 30px; border-radius: 9px; background: var(--ink); display: flex; align-items: center; justify-content: center; color: white; }
  .nav-pills { display: flex; gap: 2px; }
  .nav-pill { font-family: var(--fb); font-size: 0.8rem; font-weight: 500; padding: 6px 13px; border-radius: 99px; border: none; background: transparent; color: var(--ink-muted); cursor: pointer; transition: all var(--t); }
  .nav-pill:hover { background: rgba(11,12,16,0.06); color: var(--ink); }
  .nav-pill.active { background: var(--ink); color: white; }

  /* PAGE */
  .page { min-height: 100vh; padding-top: 62px; animation: fadeUp 0.42s var(--ease) both; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }

  /* ─── LANDING ─── */
  .landing { display: grid; grid-template-rows: 1fr auto auto; min-height: 100vh; }
  .landing-hero {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 5.5rem 2rem 4rem; position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background: radial-gradient(ellipse 70% 55% at 50% 22%, rgba(26,86,255,0.07) 0%, transparent 68%),
                radial-gradient(ellipse 45% 40% at 88% 78%, rgba(0,194,160,0.05) 0%, transparent 68%);
  }
  .hero-grid {
    position: absolute; inset: 0; z-index: 0;
    background-image: linear-gradient(rgba(11,12,16,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(11,12,16,0.028) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(ellipse 90% 80% at 50% 32%, black 10%, transparent 80%);
  }
  .hero-kicker {
    position: relative; z-index: 1;
    display: inline-flex; align-items: center; gap: 7px;
    background: white; border: 1px solid var(--border); border-radius: 99px;
    padding: 5px 14px 5px 8px; margin-bottom: 2rem;
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ink-soft);
    box-shadow: var(--shadow-sm);
  }
  .kicker-icon { width: 22px; height: 22px; border-radius: 50%; background: rgba(0,194,160,0.12); display: flex; align-items: center; justify-content: center; color: var(--green); }
  .hero-title {
    position: relative; z-index: 1;
    font-family: var(--fh); font-size: clamp(2.6rem,7vw,5.8rem); font-weight: 800;
    letter-spacing: -0.04em; line-height: 1.02; color: var(--ink); margin-bottom: 1.4rem;
  }
  .hero-title em { font-style: normal; position: relative; }
  .hero-title em::after {
    content: ''; position: absolute; left: 0; bottom: 3px; right: 0; height: 5px;
    border-radius: 3px; background: linear-gradient(90deg, var(--accent), var(--green)); opacity: 0.28; z-index: -1;
  }
  .hero-title .grad {
    background: linear-gradient(130deg, var(--accent) 20%, var(--green) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hero-sub { position: relative; z-index: 1; font-size: 1rem; font-weight: 400; color: var(--ink-soft); max-width: 400px; line-height: 1.65; margin-bottom: 2.4rem; }
  .hero-cta-row { position: relative; z-index: 1; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }

  .btn-primary { font-family: var(--fb); font-size: 0.87rem; font-weight: 600; padding: 13px 24px; border-radius: var(--radius-sm); border: none; background: var(--ink); color: white; cursor: pointer; transition: all var(--t); box-shadow: 0 4px 14px rgba(11,12,16,0.18); display: inline-flex; align-items: center; gap: 8px; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(11,12,16,0.22); background: #181b28; }
  .btn-secondary { font-family: var(--fb); font-size: 0.87rem; font-weight: 500; padding: 13px 24px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: white; color: var(--ink); cursor: pointer; transition: all var(--t); }
  .btn-secondary:hover { box-shadow: var(--shadow-sm); transform: translateY(-1px); }

  /* feature strip */
  .landing-features { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--border); border-top: 1px solid var(--border); }
  .feature-card { background: white; padding: 2rem 1.75rem; display: flex; flex-direction: column; gap: 10px; }
  .ficon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
  .ficon.blue  { background: rgba(26,86,255,0.08);  color: var(--accent); }
  .ficon.green { background: rgba(0,194,160,0.08);  color: var(--green); }
  .ficon.amber { background: rgba(255,124,58,0.09); color: var(--amber); }
  .feature-title { font-family: var(--fh); font-size: 0.87rem; font-weight: 700; }
  .feature-desc  { font-size: 0.79rem; color: var(--ink-muted); line-height: 1.6; }

  /* WHY section */
  .why-section { background: var(--ink); padding: 4.5rem 2rem; display: flex; flex-direction: column; align-items: center; gap: 2.5rem; }
  .why-eyebrow { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--green); display: block; margin-bottom: 0.6rem; text-align: center; }
  .why-title { font-family: var(--fh); font-size: clamp(1.5rem,3.5vw,2.1rem); font-weight: 800; letter-spacing: -0.03em; color: white; line-height: 1.15; text-align: center; }
  .why-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; width: 100%; max-width: 840px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.07); border-radius: var(--radius-md); overflow: hidden; }
  .why-card { padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 10px; background: rgba(255,255,255,0.02); transition: background var(--t); }
  .why-card:hover { background: rgba(255,255,255,0.055); }
  .wicon { width: 36px; height: 36px; border-radius: 9px; background: rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: center; color: var(--green); }
  .why-stat  { font-family: var(--fh); font-size: 1.55rem; font-weight: 800; color: var(--green); }
  .why-ctitle{ font-family: var(--fh); font-size: 0.85rem; font-weight: 700; color: white; }
  .why-cdesc { font-size: 0.76rem; color: rgba(255,255,255,0.42); line-height: 1.6; }

  /* ─── UPLOAD ─── */
  .upload-page { display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 62px); padding: 3rem 1.5rem; }
  .upload-card { background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); padding: 2.75rem; width: 100%; max-width: 500px; border: 1px solid var(--border); }
  .upload-title { font-family: var(--fh); font-size: 1.55rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 4px; }
  .upload-sub   { font-size: 0.83rem; color: var(--ink-muted); margin-bottom: 2rem; line-height: 1.55; }

  .drop-zone { border: 2px dashed rgba(11,12,16,0.13); border-radius: var(--radius-md); padding: 2.25rem 1.5rem; text-align: center; cursor: pointer; transition: all var(--t); position: relative; background: var(--surface); }
  .drop-zone:hover            { border-color: var(--accent); background: rgba(26,86,255,0.03); }
  .drop-zone.dragging         { border-color: var(--accent); background: rgba(26,86,255,0.05); transform: scale(1.012); }
  .drop-zone.ready            { border-color: var(--green); background: rgba(0,194,160,0.04); }
  .drop-zone input[type=file] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }

  .drop-icon { width: 50px; height: 50px; border-radius: 13px; background: white; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem; box-shadow: var(--shadow-sm); transition: all var(--t); color: var(--ink-muted); }
  .drop-zone.dragging .drop-icon { background: rgba(26,86,255,0.08); border-color: rgba(26,86,255,0.25); color: var(--accent); }
  .drop-zone.ready    .drop-icon { background: rgba(0,194,160,0.10); border-color: rgba(0,194,160,0.3);  color: var(--green); }

  .drop-title { font-family: var(--fh); font-weight: 700; font-size: 0.9rem; color: var(--ink); margin-bottom: 4px; }
  .drop-sub   { font-size: 0.76rem; color: var(--ink-muted); line-height: 1.5; margin-bottom: 0; }
  .drop-hints { display: flex; justify-content: center; gap: 6px; margin-top: 12px; flex-wrap: wrap; }
  .hint-chip  { display: inline-flex; align-items: center; gap: 4px; background: white; border: 1px solid var(--border); border-radius: 99px; padding: 3px 9px; font-size: 0.68rem; font-weight: 500; color: var(--ink-soft); }

  .file-error { display: flex; align-items: center; gap: 6px; margin-top: 10px; padding: 9px 12px; border-radius: var(--radius-sm); background: rgba(255,77,109,0.07); border: 1px solid rgba(255,77,109,0.18); font-size: 0.78rem; color: #c52040; font-weight: 500; animation: fadeUp 0.25s var(--ease); }

  .file-chip { margin-top: 12px; display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 9px 12px; font-size: 0.81rem; transition: all 0.32s var(--ease); }
  .file-chip.ok { border-color: rgba(0,194,160,0.35); background: rgba(0,194,160,0.05); animation: chipPop 0.38s cubic-bezier(0.34,1.56,0.64,1); }
  @keyframes chipPop { from { transform:scale(0.95); opacity:0.4; } to { transform:scale(1); opacity:1; } }
  .chip-check { width: 20px; height: 20px; border-radius: 50%; background: var(--green); color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .chip-file  { color: var(--ink-muted); flex-shrink: 0; }
  .chip-name  { flex: 1; font-weight: 500; color: var(--ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chip-size  { font-size: 0.72rem; color: var(--ink-muted); white-space: nowrap; }
  .chip-rm    { background: none; border: none; cursor: pointer; color: var(--ink-muted); padding: 2px; display: flex; border-radius: 4px; transition: color var(--t); }
  .chip-rm:hover { color: var(--red); }

  .upload-options { margin-top: 1.25rem; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .opt-label { font-size: 0.74rem; font-weight: 600; color: var(--ink-soft); margin-bottom: 5px; display: block; letter-spacing: 0.01em; }
  .opt-select { width: 100%; padding: 9px 12px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); font-family: var(--fb); font-size: 0.81rem; color: var(--ink); appearance: none; cursor: pointer; transition: border-color var(--t); outline: none; }
  .opt-select:focus { border-color: var(--accent); }

  .analyze-btn { width: 100%; margin-top: 1.75rem; padding: 14px; font-family: var(--fh); font-size: 0.92rem; font-weight: 700; border: none; border-radius: var(--radius-sm); background: var(--ink); color: white; cursor: pointer; transition: all var(--t); display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(11,12,16,0.18); position: relative; overflow: hidden; }
  .analyze-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent); transform: translateX(-100%); transition: transform 0.55s var(--ease); }
  .analyze-btn:hover:not(:disabled)::after { transform: translateX(100%); }
  .analyze-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(11,12,16,0.22); }
  .analyze-btn:disabled { opacity: 0.38; cursor: not-allowed; transform: none; }

  /* ─── LOADING OVERLAY ─── */
  .overlay { position: fixed; inset: 0; z-index: 500; background: rgba(245,246,249,0.96); backdrop-filter: blur(14px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2rem; animation: fadeIn 0.3s var(--ease); }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

  .orb { width: 100px; height: 100px; border-radius: 50%; background: var(--ink); display: flex; align-items: center; justify-content: center; position: relative; animation: orbPulse 1.9s ease-in-out infinite; color: white; }
  @keyframes orbPulse { 0% { box-shadow: 0 0 0 0 rgba(26,86,255,0.28); } 70% { box-shadow: 0 0 0 26px rgba(26,86,255,0); } 100% { box-shadow: 0 0 0 0 rgba(26,86,255,0); } }
  .orb-r1 { position: absolute; inset: -11px; border-radius: 50%; border: 2px solid transparent; border-top-color: var(--accent); border-right-color: var(--green); animation: spin 1.25s linear infinite; }
  .orb-r2 { position: absolute; inset: -21px; border-radius: 50%; border: 1.5px solid transparent; border-bottom-color: rgba(26,86,255,0.22); animation: spin 2.6s linear infinite reverse; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .overlay-body { display: flex; flex-direction: column; align-items: center; gap: 7px; }
  .overlay-title { font-family: var(--fh); font-size: 1.1rem; font-weight: 700; color: var(--ink); letter-spacing: -0.02em; }
  .overlay-sub   { font-size: 0.8rem; color: var(--ink-muted); }
  .prog-track { width: 210px; height: 3px; background: var(--border); border-radius: 99px; overflow: hidden; margin-top: 6px; }
  .prog-fill  { height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--accent), var(--green)); animation: progFill 2.5s var(--ease) forwards; }
  @keyframes progFill { from { width:0%; } to { width:100%; } }
  .step-list  { display: flex; flex-direction: column; gap: 5px; margin-top: 6px; }
  .step-row   { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: var(--ink-muted); font-weight: 500; opacity: 0; transform: translateX(-5px); animation: stepIn 0.4s var(--ease) forwards; }
  .step-row:nth-child(1) { animation-delay: 0.05s; } .step-row:nth-child(2) { animation-delay: 0.55s; }
  .step-row:nth-child(3) { animation-delay: 1.05s;  } .step-row:nth-child(4) { animation-delay: 1.55s; }
  @keyframes stepIn { to { opacity:1; transform:translateX(0); } }
  .step-pip { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; animation: pip 1.5s ease-in-out infinite; }
  @keyframes pip { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.35; transform:scale(0.55); } }

  /* ─── RESULTS ─── */
  .results-page { padding: 2.5rem 1.5rem; max-width: 900px; margin: 0 auto; }

  .verdict-banner { border-radius: var(--radius-md); padding: 1rem 1.4rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem; }
  .verdict-icon  { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .verdict-label { font-family: var(--fh); font-weight: 700; font-size: 0.92rem; }
  .verdict-file  { font-size: 0.74rem; color: var(--ink-muted); margin-top: 2px; }

  .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 13px; border-radius: 99px; font-size: 0.74rem; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; }
  .badge-fair   { background: rgba(0,194,160,0.10); color: #009980;  border: 1px solid rgba(0,194,160,0.22); }
  .badge-biased { background: rgba(255,77,109,0.08); color: #d02048; border: 1px solid rgba(255,77,109,0.2); }
  .sdot { width: 6px; height: 6px; border-radius: 50%; }
  .badge-fair   .sdot { background: var(--green); }
  .badge-biased .sdot { background: var(--red); animation: pip 1.6s ease-in-out infinite; }

  .card { background: white; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.6rem; box-shadow: var(--shadow-sm); }
  .card-lbl { font-size: 0.69rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: var(--ink-muted); margin-bottom: 0.85rem; }

  .score-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 14px; margin-bottom: 14px; }
  .score-num  { font-family: var(--fh); font-size: 4.2rem; font-weight: 800; letter-spacing: -0.04em; line-height: 1; margin-bottom: 0.4rem; }
  .score-num.g { color: var(--green); } .score-num.w { color: var(--amber); } .score-num.r { color: var(--red); }
  .score-desc { font-size: 0.77rem; color: var(--ink-muted); line-height: 1.55; }

  .gauge-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
  .gauge-row  { display: flex; justify-content: space-between; width: 100%; font-size: 0.69rem; color: var(--ink-muted); font-weight: 500; }

  .breakdown-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .bar-header  { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
  .bar-name    { font-family: var(--fh); font-size: 0.84rem; font-weight: 700; }
  .bar-val     { font-size: 0.77rem; font-weight: 600; }
  .bar-track   { height: 6px; background: var(--surface); border-radius: 99px; overflow: hidden; margin-bottom: 6px; }
  .bar-fill    { height: 100%; border-radius: 99px; transition: width 1.3s cubic-bezier(0.4,0,0.2,1); }
  .bar-desc    { font-size: 0.72rem; color: var(--ink-muted); line-height: 1.5; }

  .metrics-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 14px; }
  .metric-card { background: white; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.2rem 1.4rem; box-shadow: var(--shadow-sm); }
  .m-icon { color: var(--ink-muted); margin-bottom: 7px; }
  .m-val  { font-family: var(--fh); font-size: 1.62rem; font-weight: 800; letter-spacing: -0.03em; }
  .m-lbl  { font-size: 0.69rem; color: var(--ink-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500; margin-top: 3px; }
  .m-delta { font-size: 0.71rem; font-weight: 600; margin-top: 5px; display: inline-flex; align-items: center; gap: 3px; padding: 2px 7px; border-radius: 99px; }
  .d-up { background: rgba(255,77,109,0.08); color: #d02048; } .d-dn { background: rgba(0,194,160,0.08); color: #009980; } .d-n { background: var(--surface); color: var(--ink-muted); }

  .rec-list { display: flex; flex-direction: column; gap: 9px; }
  .rec-item { display: flex; gap: 12px; align-items: flex-start; padding: 13px 14px; background: var(--surface); border-radius: var(--radius-sm); border: 1px solid var(--border); transition: border-color var(--t); }
  .rec-item:hover { border-color: rgba(11,12,16,0.16); }
  .rec-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .rec-title { font-size: 0.82rem; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
  .rec-desc  { font-size: 0.74rem; color: var(--ink-muted); line-height: 1.55; }

  .action-row { display: flex; gap: 9px; flex-wrap: wrap; margin-top: 0.5rem; }
  .btn-sm { font-family: var(--fb); font-size: 0.79rem; font-weight: 500; padding: 8px 15px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: white; color: var(--ink); cursor: pointer; transition: all var(--t); display: inline-flex; align-items: center; gap: 6px; }
  .btn-sm:hover { background: var(--surface); transform: translateY(-1px); }
  .btn-sm.primary { background: var(--ink); color: white; border-color: var(--ink); box-shadow: 0 2px 10px rgba(11,12,16,0.14); }
  .btn-sm.primary:hover { background: #181b28; }

  /* RESPONSIVE */
  @media (max-width: 700px) {
    .nav { padding: 0 1.25rem; }
    .landing-features, .why-grid { grid-template-columns: 1fr; }
    .score-grid, .breakdown-grid { grid-template-columns: 1fr; }
    .metrics-row { grid-template-columns: 1fr 1fr; }
    .upload-options { grid-template-columns: 1fr; }
    .upload-card { padding: 2rem 1.5rem; }
    .results-page { padding: 2rem 1rem; }
  }
  @media (max-width: 440px) {
    .metrics-row { grid-template-columns: 1fr; }
    .nav-pills { display: none; }
  }
`;

// ── Data ──────────────────────────────────────────────────────────────────────
const RESULT = {
  score: 67, status: "Biased",
  breakdown: [
    { name: "Gender Bias",        score: 74, color: "#ff4d6d", desc: "Female applicants approved at 31% lower rate. Significant disparity detected." },
    { name: "Age Bias",           score: 58, color: "#ff7c3a", desc: "Outcomes fall sharply for candidates under 24 and over 55." },
    { name: "Racial Bias",        score: 61, color: "#ff7c3a", desc: "Parity difference of 0.18. Equalized odds constraint not satisfied." },
    { name: "Socioeconomic Bias", score: 43, color: "#1a56ff", desc: "Mild disparity — within acceptable fairness thresholds." },
  ],
  metrics: [
    { icon: "users",   label: "Samples",        value: "14,820", delta: null,     dt: "n" },
    { icon: "trending",label: "Disparity Ratio", value: "0.69",   delta: "↑ High", dt: "up" },
    { icon: "shield",  label: "Accuracy",        value: "91.4%",  delta: "✓ Good", dt: "dn" },
    { icon: "sliders", label: "Features",        value: "28",     delta: null,     dt: "n" },
  ],
  recs: [
    { icon: "scale",   bg: "rgba(26,86,255,0.08)",   color: "#1a56ff", title: "Re-weight gender feature",         desc: "Apply sample re-weighting or adversarial debiasing before retraining." },
    { icon: "search",  bg: "rgba(255,124,58,0.09)",  color: "#ff7c3a", title: "Audit age-proxy features",          desc: "'years_experience' may encode age. Review correlations, consider capping." },
    { icon: "sliders", bg: "rgba(0,194,160,0.08)",   color: "#00c2a0", title: "Add fairness training constraints", desc: "Equalized odds or demographic parity directly in your model's loss function." },
  ],
};

// ── Gauge ─────────────────────────────────────────────────────────────────────
function Gauge({ score }) {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 260); return () => clearTimeout(t); }, []);
  const r = 70, sw = 9, cx = 90, cy = 90, sa = -210, tot = 240;
  const ea = sa + (score / 100) * tot;
  const rad = (d) => d * Math.PI / 180;
  const arc = (a1, a2) => {
    const s = { x: cx + r * Math.cos(rad(a1)), y: cy + r * Math.sin(rad(a1)) };
    const e = { x: cx + r * Math.cos(rad(a2)), y: cy + r * Math.sin(rad(a2)) };
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${e.x} ${e.y}`;
  };
  const col = score < 40 ? "#00c2a0" : score < 65 ? "#ff7c3a" : "#ff4d6d";
  return (
    <div className="gauge-wrap">
      <svg width="180" height="115" viewBox="0 0 180 115" style={{ overflow: "visible" }}>
        <path d={arc(sa, sa + tot)} fill="none" stroke="#ebebef" strokeWidth={sw} strokeLinecap="round" />
        <path d={arc(sa, on ? ea : sa)} fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round"
          style={{ transition: "d 1.3s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 5px ${col}55)` }} />
        <text x={cx} y={cy - 1} textAnchor="middle" fontSize="26" fontWeight="800" fontFamily="Poppins,sans-serif" fill={col}>{score}</text>
        <text x={cx} y={cy + 18} textAnchor="middle" fontSize="8" fontWeight="600" fontFamily="Inter,sans-serif" fill="#9ba0b8" letterSpacing="2.5">BIAS SCORE</text>
      </svg>
      <div className="gauge-row" style={{ width: 164 }}><span>0 · Fair</span><span>100 · Severe</span></div>
    </div>
  );
}

// ── BiasBar ───────────────────────────────────────────────────────────────────
function BiasBar({ name, score, color, desc }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(score), 360); return () => clearTimeout(t); }, [score]);
  return (
    <div className="card">
      <div className="bar-header">
        <span className="bar-name">{name}</span>
        <span className="bar-val" style={{ color }}>{score}/100</span>
      </div>
      <div className="bar-track"><div className="bar-fill" style={{ width: `${w}%`, background: color }} /></div>
      <p className="bar-desc">{desc}</p>
    </div>
  );
}

// ── Loading Overlay ───────────────────────────────────────────────────────────
function LoadingOverlay() {
  const steps = ["Parsing dataset structure…", "Detecting sensitive attributes…", "Computing fairness metrics…", "Generating bias report…"];
  return (
    <div className="overlay">
      <div className="orb">
        <div className="orb-r1" /><div className="orb-r2" />
        <Icon name="scan" size={28} color="white" sw={1.4} />
      </div>
      <div className="overlay-body">
        <div className="overlay-title">Analyzing your dataset</div>
        <div className="overlay-sub">Usually takes a few seconds</div>
        <div className="prog-track"><div className="prog-fill" /></div>
        <div className="step-list">
          {steps.map((s, i) => (
            <div className="step-row" key={i}>
              <span className="step-pip" style={{ animationDelay: `${i * 0.38}s` }} />{s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── LANDING ───────────────────────────────────────────────────────────────────
function LandingPage({ onNavigate }) {
  const WHY = [
    { icon: "users",   stat: "78%",  title: "of hiring AIs show gender bias",    desc: "A 2023 audit of 10 major HR platforms found 8 systematically underscored female candidates." },
    { icon: "gavel",   stat: "$4M+", title: "avg. regulatory fine for AI bias",  desc: "EU AI Act and US EEOC enforcement are escalating. Non-compliance is expensive." },
    { icon: "trending",stat: "3×",   title: "faster to fix when caught early",   desc: "Teams that detect bias in dev fix it 3× faster than those who find it post-launch." },
  ];
  return (
    <div className="page landing">
      <div className="landing-hero">
        <div className="hero-bg" /><div className="hero-grid" />
        <div className="hero-kicker">
          <span className="kicker-icon"><Icon name="shield" size={12} sw={2} /></span>
          Fairness Intelligence Platform
        </div>
        <h1 className="hero-title">
          Your model is <em>making</em><br />
          <span className="grad">decisions.</span> Is it fair?
        </h1>
        <p className="hero-sub">Upload a dataset. Get a complete bias audit — gender, age, race, socioeconomic — in seconds.</p>
        <div className="hero-cta-row">
          <button className="btn-primary" onClick={() => onNavigate("upload")}>
            Analyze Now <Icon name="arrow" size={16} sw={2} />
          </button>
          <button className="btn-secondary" onClick={() => onNavigate("results")}>View Sample Report</button>
        </div>
      </div>

      <div className="landing-features">
        {[
          { icon: "scan",  cls: "blue",  title: "Multi-Axis Detection",desc: "Gender, age, race, socioeconomic — scanned simultaneously across your full dataset." },
          { icon: "chart", cls: "green", title: "6 Fairness Metrics",  desc: "Equalized odds, demographic parity, disparate impact — computed automatically." },
          { icon: "zap",   cls: "amber", title: "Instant Remediation", desc: "Actionable fixes tailored to your model type. No jargon, just clear next steps." },
        ].map(({ icon, cls, title, desc }) => (
          <div className="feature-card" key={title}>
            <div className={`ficon ${cls}`}><Icon name={icon} size={18} sw={1.7} /></div>
            <div className="feature-title">{title}</div>
            <p className="feature-desc">{desc}</p>
          </div>
        ))}
      </div>

      <div className="why-section">
        <div>
          <span className="why-eyebrow">Why this matters</span>
          <div className="why-title">Bias in AI isn't theoretical.<br />It's measurable. And fixable.</div>
        </div>
        <div className="why-grid">
          {WHY.map(({ icon, stat, title, desc }) => (
            <div className="why-card" key={title}>
              <div className="wicon"><Icon name={icon} size={17} sw={1.6} /></div>
              <div className="why-stat">{stat}</div>
              <div className="why-ctitle">{title}</div>
              <div className="why-cdesc">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── UPLOAD ────────────────────────────────────────────────────────────────────
function UploadPage({ onNavigate }) {
  const [file, setFile]     = useState(null);
  const [drag, setDrag]     = useState(false);
  const [err, setErr]       = useState("");
  const [ok, setOk]         = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (f) => {
    setErr("");
    if (!f) return;
    const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
    if (![".csv", ".json"].includes(ext)) { setErr("Unsupported format. Please upload a .CSV or .JSON file."); return; }
    if (f.size > 50 * 1024 * 1024)       { setErr("File exceeds the 50 MB size limit."); return; }
    setFile(f); setOk(false); setTimeout(() => setOk(true), 350);
  };
  const onDrop = (e) => { e.preventDefault(); setDrag(false); validate(e.dataTransfer.files[0]); };
  const clear  = () => { setFile(null); setOk(false); setErr(""); };
  const run    = () => { setLoading(true); setTimeout(() => { setLoading(false); onNavigate("results"); }, 2700); };
  const fmt    = (n) => n > 1e6 ? `${(n/1e6).toFixed(1)} MB` : `${(n/1024).toFixed(0)} KB`;

  const dzClass = `drop-zone${drag ? " dragging" : ""}${file && !err ? " ready" : ""}`;

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="page upload-page">
        <div className="upload-card">
          <h2 className="upload-title">Upload Dataset</h2>
          <p className="upload-sub">Provide your model's output file with predictions and ground-truth labels to start the audit.</p>

          <div className={dzClass}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}>
            <input type="file" accept=".csv,.json" onChange={(e) => validate(e.target.files[0])} />
            <div className="drop-icon">
              {file && !err ? <Icon name="check" size={22} sw={2.2} /> : <Icon name="upload" size={20} sw={1.8} />}
            </div>
            <div className="drop-title">
              {file && !err ? "File attached — ready to analyze" : drag ? "Release to attach" : "Drag & drop your file here"}
            </div>
            <p className="drop-sub">{file && !err ? "Click to swap" : "or click to browse your computer"}</p>
            {!file && (
              <div className="drop-hints">
                <span className="hint-chip"><Icon name="file" size={10} sw={2} /> CSV</span>
                <span className="hint-chip"><Icon name="file" size={10} sw={2} /> JSON</span>
                <span className="hint-chip">Max 50 MB</span>
                <span className="hint-chip">UTF-8</span>
              </div>
            )}
          </div>

          {err && (
            <div className="file-error">
              <Icon name="alert" size={14} sw={2} color="#c52040" />{err}
            </div>
          )}

          {file && !err && (
            <div className={`file-chip${ok ? " ok" : ""}`}>
              <span className="chip-check"><Icon name="check" size={11} sw={2.5} /></span>
              <span className="chip-file"><Icon name="file" size={15} sw={1.6} /></span>
              <span className="chip-name">{file.name}</span>
              <span className="chip-size">{fmt(file.size)}</span>
              <button className="chip-rm" onClick={clear}><Icon name="x" size={13} sw={2} /></button>
            </div>
          )}

          <div className="upload-options">
            <div>
              <label className="opt-label">Model Type</label>
              <select className="opt-select"><option>Classification</option><option>Regression</option><option>Ranking</option></select>
            </div>
            <div>
              <label className="opt-label">Sensitive Attributes</label>
              <select className="opt-select"><option>Auto-detect</option><option>Gender, Age</option><option>Race, Ethnicity</option><option>All</option></select>
            </div>
          </div>

          <button className="analyze-btn" disabled={!file || !!err || loading} onClick={run}>
            Run Bias Analysis <Icon name="arrow" size={16} sw={2.2} />
          </button>
        </div>
      </div>
    </>
  );
}

// ── RESULTS ───────────────────────────────────────────────────────────────────
function ResultsPage({ onNavigate }) {
  const r = RESULT;
  const bad = r.status === "Biased";
  const rc  = bad ? "#ff4d6d" : "#00c2a0";
  const rbg = bad ? "rgba(255,77,109,0.06)" : "rgba(0,194,160,0.06)";
  const rbd = bad ? "rgba(255,77,109,0.18)" : "rgba(0,194,160,0.2)";
  const sc  = r.score < 40 ? "g" : r.score < 65 ? "w" : "r";

  return (
    <div className="page results-page">
      {/* Verdict */}
      <div className="verdict-banner" style={{ background: rbg, border: `1px solid ${rbd}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="verdict-icon" style={{ background: rc, color: "white" }}>
            <Icon name={bad ? "alert" : "check"} size={16} sw={2.2} color="white" />
          </div>
          <div>
            <div className="verdict-label" style={{ color: rc }}>{bad ? "Bias Detected" : "Model is Fair"}</div>
            <div className="verdict-file">loan_applications_2024.csv · Analyzed just now</div>
          </div>
        </div>
        <span className={`status-badge ${bad ? "badge-biased" : "badge-fair"}`}>
          <span className="sdot" />{r.status}
        </span>
      </div>

      {/* Score + Gauge */}
      <div className="score-grid">
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: `3px solid ${rc}` }}>
          <div className="card-lbl">Overall Bias Score</div>
          <div className={`score-num ${sc}`}>{r.score}</div>
          <p className="score-desc">Scores above 50 indicate measurable bias. Threshold is set to 40.</p>
        </div>
        <div className="card">
          <div className="card-lbl">Score Visualization</div>
          <Gauge score={r.score} />
        </div>
      </div>

      {/* Metrics */}
      <div className="metrics-row">
        {r.metrics.map((m) => (
          <div className="metric-card" key={m.label}>
            <div className="m-icon"><Icon name={m.icon} size={16} sw={1.6} /></div>
            <div className="m-val">{m.value}</div>
            <div className="m-lbl">{m.label}</div>
            {m.delta && <span className={`m-delta d-${m.dt}`}>{m.delta}</span>}
          </div>
        ))}
      </div>

      {/* Breakdown */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="card-lbl">Bias Breakdown by Attribute</div>
        <div className="breakdown-grid" style={{ marginTop: "0.6rem" }}>
          {r.breakdown.map((b) => <BiasBar key={b.name} {...b} />)}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="card-lbl" style={{ marginBottom: "0.85rem" }}>Remediation Recommendations</div>
        <div className="rec-list">
          {r.recs.map((rec, i) => (
            <div className="rec-item" key={i}>
              <div className="rec-icon" style={{ background: rec.bg, color: rec.color }}>
                <Icon name={rec.icon} size={15} sw={1.7} />
              </div>
              <div>
                <div className="rec-title">{rec.title}</div>
                <div className="rec-desc">{rec.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="action-row">
        <button className="btn-sm primary"><Icon name="download" size={14} sw={2} /> Export Report</button>
        <button className="btn-sm" onClick={() => onNavigate("upload")}><Icon name="refresh" size={14} sw={2} /> Analyze Another</button>
        <button className="btn-sm"><Icon name="share" size={14} sw={2} /> Share</button>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  return (
    <>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="nav-logo" onClick={() => setPage("landing")}>
          <span className="nav-logo-mark"><Icon name="shield" size={14} sw={1.8} /></span>
          AI Bias Detector
        </div>
        <div className="nav-pills">
          {[["landing","Home"],["upload","Upload"],["results","Results"]].map(([id, lbl]) => (
            <button key={id} className={`nav-pill${page===id?" active":""}`} onClick={() => setPage(id)}>{lbl}</button>
          ))}
        </div>
      </nav>
      {page==="landing" && <LandingPage  onNavigate={setPage} key="l" />}
      {page==="upload"  && <UploadPage   onNavigate={setPage} key="u" />}
      {page==="results" && <ResultsPage  onNavigate={setPage} key="r" />}
    </>
  );
}