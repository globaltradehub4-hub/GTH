import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

app.post('/api/apply', async (c) => {
  const body = await c.req.json()
  // Handle application form submission
  return c.json({ success: true, message: 'Application received' })
})

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="hy">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GTH Academy — Բիզնես Կրթական Հարթակ</title>
  <meta name="description" content="GTH Academy — Բիզնես կրթական հարթակ և էկոհամակարգ: Սովորեք, կառուցեք և զարգացրեք ձեր բիզնեսը:" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg-primary: #111213;
      --bg-secondary: #1a1b1d;
      --bg-card: #1f2022;
      --bg-card-hover: #252628;
      --border: rgba(255,255,255,0.08);
      --border-light: rgba(255,255,255,0.12);
      --text-primary: #ffffff;
      --text-secondary: #a0a3a8;
      --text-muted: #666a72;
      --accent: #ffffff;
      --accent-dim: rgba(255,255,255,0.1);
      --gold: #c9a84c;
      --gold-dim: rgba(201,168,76,0.15);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      overflow-x: hidden;
    }

    /* ─── SCROLLBAR ─── */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg-primary); }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }

    /* ─── TYPOGRAPHY ─── */
    .tag {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--text-muted);
      border: 1px solid var(--border); border-radius: 100px;
      padding: 5px 14px; margin-bottom: 20px;
    }
    .tag span { width: 5px; height: 5px; background: var(--gold); border-radius: 50%; }

    h1, h2, h3 { font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; }

    .section-title {
      font-size: clamp(32px, 5vw, 52px);
      color: var(--text-primary);
      margin-bottom: 16px;
    }
    .section-subtitle {
      font-size: 16px; color: var(--text-secondary);
      max-width: 520px; line-height: 1.7;
    }

    /* ─── LAYOUT ─── */
    .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
    section { padding: 96px 0; }

    /* ─── BUTTONS ─── */
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 14px; font-weight: 600; letter-spacing: 0.01em;
      padding: 14px 28px; border-radius: 8px;
      border: none; cursor: pointer; transition: all 0.2s ease;
      text-decoration: none; white-space: nowrap;
    }
    .btn-primary {
      background: var(--text-primary); color: var(--bg-primary);
    }
    .btn-primary:hover { background: #e8e8e8; transform: translateY(-1px); }

    .btn-outline {
      background: transparent; color: var(--text-primary);
      border: 1px solid var(--border-light);
    }
    .btn-outline:hover { background: var(--accent-dim); border-color: rgba(255,255,255,0.25); }

    .btn-whatsapp {
      background: #25D366; color: #fff;
    }
    .btn-whatsapp:hover { background: #1dba57; transform: translateY(-1px); }

    .btn-gold {
      background: var(--gold); color: #111;
    }
    .btn-gold:hover { background: #d9b860; transform: translateY(-1px); }

    /* ─── NAVBAR ─── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 20px 0;
      transition: all 0.3s ease;
    }
    nav.scrolled {
      background: rgba(17,18,19,0.95);
      backdrop-filter: blur(20px);
      padding: 14px 0;
      border-bottom: 1px solid var(--border);
    }
    .nav-inner {
      display: flex; align-items: center; justify-content: space-between;
      max-width: 1180px; margin: 0 auto; padding: 0 24px;
    }
    .nav-logo img { height: 38px; display: block; }
    .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
    .nav-links a {
      font-size: 13px; font-weight: 500; color: var(--text-secondary);
      text-decoration: none; transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--text-primary); }
    .nav-cta { display: flex; align-items: center; gap: 12px; }
    .nav-mobile-btn {
      display: none; background: none; border: none;
      color: var(--text-primary); font-size: 20px; cursor: pointer;
    }

    /* ─── HERO ─── */
    #hero {
      min-height: 100vh; display: flex; align-items: center;
      padding: 120px 0 80px;
      position: relative; overflow: hidden;
    }
    .hero-bg {
      position: absolute; inset: 0; pointer-events: none;
    }
    .hero-bg-gradient {
      position: absolute; top: -30%; right: -10%;
      width: 700px; height: 700px; border-radius: 50%;
      background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    }
    .hero-bg-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent);
    }
    .hero-inner {
      display: grid; grid-template-columns: 1fr 1fr; gap: 60px;
      align-items: center; position: relative; z-index: 1;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--gold-dim); border: 1px solid rgba(201,168,76,0.3);
      border-radius: 100px; padding: 6px 16px; margin-bottom: 24px;
      font-size: 12px; font-weight: 600; color: var(--gold);
      letter-spacing: 0.08em; text-transform: uppercase;
    }
    .hero-badge i { font-size: 10px; }
    .hero-title {
      font-size: clamp(44px, 6vw, 72px);
      font-weight: 900; letter-spacing: -0.03em; line-height: 1.0;
      margin-bottom: 20px;
    }
    .hero-title .line-accent { color: var(--gold); }
    .hero-desc {
      font-size: 17px; color: var(--text-secondary);
      line-height: 1.75; margin-bottom: 36px; max-width: 480px;
    }
    .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 48px; }
    .hero-stats {
      display: flex; gap: 32px;
      padding-top: 32px; border-top: 1px solid var(--border);
    }
    .hero-stat-value {
      font-size: 28px; font-weight: 800; letter-spacing: -0.02em;
      color: var(--text-primary);
    }
    .hero-stat-value span { color: var(--gold); }
    .hero-stat-label { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

    /* Hero right — visual card */
    .hero-visual { position: relative; }
    .hero-card-main {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 16px; overflow: hidden;
      box-shadow: 0 40px 80px rgba(0,0,0,0.5);
    }
    .hero-card-main img {
      width: 100%; height: 360px; object-fit: cover; display: block;
      filter: brightness(0.85);
    }
    .hero-card-main .card-caption {
      padding: 20px 24px;
    }
    .hero-card-main .card-caption .cap-tag {
      font-size: 11px; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.1em; color: var(--gold); margin-bottom: 6px;
    }
    .hero-card-main .card-caption h3 {
      font-size: 16px; font-weight: 700; color: var(--text-primary);
    }
    .hero-card-float {
      position: absolute; bottom: 80px; left: -40px;
      background: var(--bg-secondary); border: 1px solid var(--border-light);
      border-radius: 12px; padding: 14px 18px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      display: flex; align-items: center; gap: 12px;
      min-width: 200px;
    }
    .float-icon {
      width: 40px; height: 40px; border-radius: 10px;
      background: var(--gold-dim); display: flex; align-items: center;
      justify-content: center; color: var(--gold); font-size: 16px; flex-shrink: 0;
    }
    .float-text-val { font-size: 18px; font-weight: 800; color: var(--text-primary); }
    .float-text-lbl { font-size: 11px; color: var(--text-muted); }
    .hero-card-float2 {
      position: absolute; top: 40px; right: -30px;
      background: var(--bg-secondary); border: 1px solid var(--border-light);
      border-radius: 12px; padding: 12px 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      display: flex; align-items: center; gap: 10px;
    }
    .dot-green { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; flex-shrink: 0; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .float2-text { font-size: 12px; font-weight: 600; color: var(--text-primary); white-space: nowrap; }

    /* ─── ABOUT / APPROACH ─── */
    #about { background: var(--bg-secondary); }
    .about-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
      align-items: center;
    }
    .about-images {
      position: relative; height: 520px;
    }
    .about-img-main {
      position: absolute; top: 0; left: 0; right: 60px; bottom: 60px;
      border-radius: 16px; overflow: hidden;
      border: 1px solid var(--border);
    }
    .about-img-main img {
      width: 100%; height: 100%; object-fit: cover;
      filter: brightness(0.8);
    }
    .about-img-secondary {
      position: absolute; bottom: 0; right: 0;
      width: 55%; height: 55%;
      border-radius: 12px; overflow: hidden;
      border: 1px solid var(--border);
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
    }
    .about-img-secondary img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8); }
    .about-img-label {
      position: absolute; bottom: -30px; left: 0;
      background: var(--gold); color: #111;
      font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
      padding: 6px 16px; border-radius: 6px;
    }
    .about-content .tag { margin-bottom: 20px; }
    .about-pillars {
      display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 32px;
    }
    .pillar {
      background: var(--bg-primary); border: 1px solid var(--border);
      border-radius: 12px; padding: 18px;
      transition: border-color 0.2s;
    }
    .pillar:hover { border-color: var(--border-light); }
    .pillar-icon { font-size: 18px; color: var(--gold); margin-bottom: 10px; }
    .pillar-title { font-size: 13px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
    .pillar-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; }

    /* ─── ECOSYSTEM ─── */
    #ecosystem { }
    .eco-header { text-align: center; margin-bottom: 60px; }
    .eco-header .section-subtitle { margin: 0 auto; }
    .eco-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
    }
    .eco-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 14px; padding: 28px;
      transition: all 0.25s ease; position: relative; overflow: hidden;
    }
    .eco-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: transparent; transition: background 0.25s;
    }
    .eco-card:hover { border-color: var(--border-light); background: var(--bg-card-hover); }
    .eco-card:hover::before { background: linear-gradient(90deg, var(--gold), transparent); }
    .eco-card-num {
      font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
      color: var(--text-muted); margin-bottom: 16px;
    }
    .eco-card-icon {
      width: 48px; height: 48px; border-radius: 12px;
      background: var(--gold-dim); border: 1px solid rgba(201,168,76,0.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; color: var(--gold); margin-bottom: 16px;
    }
    .eco-card-title {
      font-size: 17px; font-weight: 700; color: var(--text-primary);
      margin-bottom: 10px; line-height: 1.3;
    }
    .eco-card-desc { font-size: 13px; color: var(--text-muted); line-height: 1.65; }
    .eco-card-tag {
      display: inline-block; margin-top: 16px;
      font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
      color: var(--gold); background: var(--gold-dim);
      padding: 4px 10px; border-radius: 100px;
    }

    /* ─── STATS ─── */
    #stats {
      background: var(--bg-secondary);
      padding: 64px 0;
    }
    .stats-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
      border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
    }
    .stat-item {
      padding: 40px 32px; text-align: center;
      border-right: 1px solid var(--border);
      transition: background 0.2s;
    }
    .stat-item:last-child { border-right: none; }
    .stat-item:hover { background: var(--bg-card); }
    .stat-number {
      font-size: 48px; font-weight: 900; letter-spacing: -0.03em;
      color: var(--text-primary); line-height: 1;
    }
    .stat-number .stat-plus { color: var(--gold); }
    .stat-label {
      font-size: 13px; color: var(--text-muted); margin-top: 8px; line-height: 1.4;
    }

    /* ─── APP ─── */
    #app-section {
      background: var(--bg-primary);
    }
    .app-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
      align-items: center;
    }
    .app-mockup {
      position: relative; display: flex; justify-content: center; align-items: center;
    }
    .app-phone-wrap {
      position: relative; width: 260px;
    }
    .app-phone-bg {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 400px; height: 400px; border-radius: 50%;
      background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
    }
    .app-phone {
      position: relative; z-index: 1;
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 36px; overflow: hidden;
      box-shadow: 0 40px 100px rgba(0,0,0,0.6);
      width: 100%;
    }
    .app-phone-header {
      background: var(--bg-secondary); padding: 18px 20px 14px;
      border-bottom: 1px solid var(--border);
    }
    .app-phone-notch {
      width: 80px; height: 4px; background: var(--border-light);
      border-radius: 2px; margin: 0 auto 14px;
    }
    .app-phone-title { font-size: 14px; font-weight: 700; color: var(--text-primary); }
    .app-phone-sub { font-size: 11px; color: var(--text-muted); }
    .app-phone-body { padding: 16px; }
    .app-course-item {
      background: var(--bg-secondary); border: 1px solid var(--border);
      border-radius: 10px; padding: 14px; margin-bottom: 10px;
      display: flex; align-items: center; gap: 12px;
    }
    .app-course-icon {
      width: 36px; height: 36px; border-radius: 8px;
      background: var(--gold-dim); display: flex; align-items: center;
      justify-content: center; font-size: 14px; color: var(--gold); flex-shrink: 0;
    }
    .app-course-name { font-size: 11px; font-weight: 700; color: var(--text-primary); }
    .app-course-progress-bar {
      width: 100%; height: 3px; background: var(--border); border-radius: 2px; margin-top: 5px;
    }
    .app-course-progress-fill {
      height: 100%; background: var(--gold); border-radius: 2px;
    }
    .app-phone-float {
      position: absolute; bottom: 40px; right: -50px;
      background: var(--bg-secondary); border: 1px solid var(--border-light);
      border-radius: 12px; padding: 12px 16px;
      box-shadow: 0 16px 40px rgba(0,0,0,0.4);
      display: flex; align-items: center; gap: 10px;
    }
    .app-float-icon { font-size: 18px; color: var(--gold); }
    .app-float-val { font-size: 15px; font-weight: 800; color: var(--text-primary); }
    .app-float-lbl { font-size: 10px; color: var(--text-muted); }

    .app-content { }
    .app-features { margin-top: 32px; display: flex; flex-direction: column; gap: 16px; }
    .app-feature {
      display: flex; align-items: flex-start; gap: 16px;
      padding: 16px; background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 12px; transition: border-color 0.2s;
    }
    .app-feature:hover { border-color: var(--border-light); }
    .app-feature-icon {
      width: 40px; height: 40px; border-radius: 10px;
      background: var(--gold-dim); display: flex; align-items: center;
      justify-content: center; color: var(--gold); font-size: 16px; flex-shrink: 0;
    }
    .app-feature-title { font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 3px; }
    .app-feature-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; }
    .app-download-btns { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; }
    .btn-store {
      display: flex; align-items: center; gap: 10px;
      background: var(--bg-card); border: 1px solid var(--border-light);
      color: var(--text-primary); text-decoration: none;
      padding: 12px 20px; border-radius: 10px;
      transition: all 0.2s; cursor: pointer;
    }
    .btn-store:hover { background: var(--bg-card-hover); border-color: rgba(255,255,255,0.2); }
    .btn-store i { font-size: 22px; }
    .btn-store-text { }
    .btn-store-sub { font-size: 10px; color: var(--text-muted); line-height: 1; }
    .btn-store-name { font-size: 14px; font-weight: 700; line-height: 1.3; }

    /* ─── CTA SECTION ─── */
    #cta {
      background: var(--bg-secondary);
    }
    .cta-inner {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 24px; padding: 64px 80px;
      display: grid; grid-template-columns: 1fr auto; gap: 40px;
      align-items: center;
      position: relative; overflow: hidden;
    }
    .cta-inner::before {
      content: ''; position: absolute; top: -50%; right: -10%;
      width: 500px; height: 500px; border-radius: 50%;
      background: radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%);
      pointer-events: none;
    }
    .cta-title {
      font-size: clamp(28px, 4vw, 44px); font-weight: 800;
      letter-spacing: -0.02em; margin-bottom: 12px;
    }
    .cta-sub { font-size: 15px; color: var(--text-secondary); max-width: 460px; }
    .cta-actions { display: flex; flex-direction: column; gap: 12px; align-items: flex-end; }

    /* ─── FORM MODAL ─── */
    .modal-overlay {
      position: fixed; inset: 0; z-index: 9000;
      background: rgba(0,0,0,0.8); backdrop-filter: blur(10px);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none; transition: opacity 0.3s;
    }
    .modal-overlay.active { opacity: 1; pointer-events: all; }
    .modal-box {
      background: var(--bg-secondary); border: 1px solid var(--border-light);
      border-radius: 20px; padding: 40px; width: 100%; max-width: 480px;
      position: relative; transform: translateY(20px); transition: transform 0.3s;
    }
    .modal-overlay.active .modal-box { transform: translateY(0); }
    .modal-close {
      position: absolute; top: 16px; right: 16px;
      background: var(--bg-card); border: 1px solid var(--border);
      color: var(--text-muted); width: 32px; height: 32px;
      border-radius: 8px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; transition: all 0.2s;
    }
    .modal-close:hover { color: var(--text-primary); border-color: var(--border-light); }
    .modal-title { font-size: 24px; font-weight: 800; margin-bottom: 6px; }
    .modal-sub { font-size: 14px; color: var(--text-secondary); margin-bottom: 28px; }
    .form-group { margin-bottom: 16px; }
    .form-label { display: block; font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px; letter-spacing: 0.04em; text-transform: uppercase; }
    .form-input {
      width: 100%; background: var(--bg-card); border: 1px solid var(--border);
      color: var(--text-primary); font-family: inherit; font-size: 14px;
      padding: 12px 16px; border-radius: 8px; outline: none;
      transition: border-color 0.2s;
    }
    .form-input:focus { border-color: var(--border-light); }
    .form-input::placeholder { color: var(--text-muted); }
    .form-select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23666' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L1 4h14z'/%3E%3C/svg%3E");
      background-repeat: no-repeat; background-position: right 14px center;
    }
    .form-success {
      text-align: center; padding: 20px 0;
    }
    .form-success-icon { font-size: 48px; color: var(--gold); margin-bottom: 12px; }
    .form-success-title { font-size: 20px; font-weight: 800; margin-bottom: 6px; }
    .form-success-sub { font-size: 14px; color: var(--text-secondary); }

    /* ─── FOOTER ─── */
    footer {
      background: var(--bg-primary); border-top: 1px solid var(--border);
      padding: 48px 0 32px;
    }
    .footer-inner {
      display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px;
      margin-bottom: 40px;
    }
    .footer-brand img { height: 32px; margin-bottom: 16px; }
    .footer-brand p { font-size: 13px; color: var(--text-muted); line-height: 1.6; max-width: 240px; }
    .footer-col-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-secondary); margin-bottom: 14px; }
    .footer-links { list-style: none; }
    .footer-links li { margin-bottom: 8px; }
    .footer-links a { font-size: 13px; color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
    .footer-links a:hover { color: var(--text-primary); }
    .footer-bottom {
      border-top: 1px solid var(--border); padding-top: 24px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .footer-copyright { font-size: 12px; color: var(--text-muted); }
    .footer-socials { display: flex; gap: 10px; }
    .social-btn {
      width: 34px; height: 34px; border-radius: 8px;
      background: var(--bg-card); border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      color: var(--text-muted); font-size: 13px; text-decoration: none;
      transition: all 0.2s;
    }
    .social-btn:hover { color: var(--text-primary); border-color: var(--border-light); background: var(--bg-card-hover); }

    /* ─── DIVIDER ─── */
    .divider { width: 48px; height: 3px; background: var(--gold); border-radius: 2px; margin: 20px 0 28px; }

    /* ─── RESPONSIVE ─── */
    @media (max-width: 1024px) {
      .hero-inner { grid-template-columns: 1fr; gap: 40px; }
      .hero-visual { display: none; }
      .hero-title { font-size: 52px; }
      .about-grid { grid-template-columns: 1fr; }
      .about-images { height: 360px; }
      .eco-grid { grid-template-columns: repeat(2, 1fr); }
      .app-grid { grid-template-columns: 1fr; }
      .app-mockup { display: none; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .stats-grid .stat-item:nth-child(2) { border-right: none; }
      .stats-grid .stat-item:nth-child(3) { border-top: 1px solid var(--border); }
      .stats-grid .stat-item:last-child { border-top: 1px solid var(--border); }
      .cta-inner { grid-template-columns: 1fr; padding: 40px; }
      .cta-actions { align-items: flex-start; flex-direction: row; flex-wrap: wrap; }
      .footer-inner { grid-template-columns: 1fr 1fr; gap: 32px; }
    }
    @media (max-width: 768px) {
      section { padding: 64px 0; }
      .nav-links, .nav-cta { display: none; }
      .nav-mobile-btn { display: block; }
      .hero-title { font-size: 38px; }
      .eco-grid { grid-template-columns: 1fr; }
      .about-pillars { grid-template-columns: 1fr; }
      .stats-grid { grid-template-columns: 1fr 1fr; }
      .cta-inner { padding: 32px 24px; }
      .footer-inner { grid-template-columns: 1fr; }
    }

    /* ─── ANIMATIONS ─── */
    .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }

    /* ─── MOBILE MENU ─── */
    .mobile-menu {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999;
      background: var(--bg-primary); padding: 80px 24px 40px;
      transform: translateX(100%); transition: transform 0.35s ease;
      display: flex; flex-direction: column; gap: 24px;
    }
    .mobile-menu.open { transform: translateX(0); }
    .mobile-menu a {
      font-size: 20px; font-weight: 700; color: var(--text-secondary);
      text-decoration: none; padding: 12px 0;
      border-bottom: 1px solid var(--border);
    }
    .mobile-menu a:hover { color: var(--text-primary); }
    .mobile-menu-close {
      position: absolute; top: 20px; right: 20px;
      background: var(--bg-card); border: 1px solid var(--border);
      color: var(--text-primary); width: 40px; height: 40px;
      border-radius: 10px; cursor: pointer; font-size: 18px;
      display: flex; align-items: center; justify-content: center;
    }
    .mobile-menu-btns { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
  </style>
</head>
<body>

<!-- ─── NAVBAR ─── -->
<nav id="navbar">
  <div class="nav-inner">
    <a href="/" class="nav-logo">
      <img src="/static/logo1.png" alt="GTH Academy" />
    </a>
    <ul class="nav-links">
      <li><a href="#about">Մեր մոտեցումը</a></li>
      <li><a href="#ecosystem">Ուղղությունները</a></li>
      <li><a href="#app-section">Հավելված</a></li>
      <li><a href="#stats">Արդյունքներ</a></li>
    </ul>
    <div class="nav-cta">
      <a href="https://wa.me/37498000000" target="_blank" class="btn btn-outline" style="padding:10px 18px;font-size:13px;">
        <i class="fab fa-whatsapp"></i> WhatsApp
      </a>
      <button class="btn btn-primary" style="padding:10px 18px;font-size:13px;" onclick="openModal()">
        Թողնել հայտ
      </button>
    </div>
    <button class="nav-mobile-btn" onclick="openMobileMenu()" aria-label="Բացել ցանկը">
      <i class="fas fa-bars"></i>
    </button>
  </div>
</nav>

<!-- ─── MOBILE MENU ─── -->
<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-menu-close" onclick="closeMobileMenu()"><i class="fas fa-times"></i></button>
  <a href="#about" onclick="closeMobileMenu()">Մեր մոտեցումը</a>
  <a href="#ecosystem" onclick="closeMobileMenu()">Ուղղությունները</a>
  <a href="#app-section" onclick="closeMobileMenu()">Հավելված</a>
  <a href="#stats" onclick="closeMobileMenu()">Արդյունքներ</a>
  <div class="mobile-menu-btns">
    <a href="https://wa.me/37498000000" target="_blank" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> Գրել WhatsApp-ում</a>
    <button class="btn btn-primary" onclick="closeMobileMenu();openModal()">Թողնել հայտ</button>
  </div>
</div>

<!-- ─── HERO ─── -->
<section id="hero">
  <div class="hero-bg">
    <div class="hero-bg-gradient"></div>
    <div class="hero-bg-grid"></div>
  </div>
  <div class="container">
    <div class="hero-inner">
      <div class="hero-left fade-in">
        <div class="hero-badge">
          <i class="fas fa-graduation-cap"></i>
          Բիզնես Կրթական Հարթակ
        </div>
        <h1 class="hero-title">
          Կառուցիր<br/>
          <span class="line-accent">Բիզնես</span><br/>
          Համակարգ
        </h1>
        <p class="hero-desc">
          GTH Academy-ն կրթական հարթակ է, որտեղ ոչ միայն սովորում ես, այլ կառուցում ես
          քո բիզնես համակարգը: Ստանում ես գործնական գիտելիք, ճիշտ կառուցվածք և ամբողջ
          ճանապարհն ի մի էկոհամակարգ:
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary" onclick="openModal()">
            <i class="fas fa-arrow-right"></i> Թողնել հայտ
          </button>
          <a href="https://wa.me/37498000000" target="_blank" class="btn btn-whatsapp">
            <i class="fab fa-whatsapp"></i> Գրել WhatsApp-ում
          </a>
        </div>
        <div class="hero-stats">
          <div>
            <div class="hero-stat-value">3200<span>+</span></div>
            <div class="hero-stat-label">Ուսանող</div>
          </div>
          <div>
            <div class="hero-stat-value">150<span>+</span></div>
            <div class="hero-stat-label">Ծրագրեր</div>
          </div>
          <div>
            <div class="hero-stat-value">5<span>+</span></div>
            <div class="hero-stat-label">Ուղղություններ</div>
          </div>
        </div>
      </div>

      <div class="hero-visual fade-in" style="transition-delay:0.15s">
        <div class="hero-card-main">
          <img src="/static/photo2.jpg" alt="GTH Academy workshop" />
          <div class="card-caption">
            <div class="cap-tag">Live Session</div>
            <h3>Բիզնես Կառուցման Ինտենսիվ</h3>
          </div>
        </div>
        <div class="hero-card-float">
          <div class="float-icon"><i class="fas fa-users"></i></div>
          <div>
            <div class="float-text-val">3,200+</div>
            <div class="float-text-lbl">Ակտիվ ուսանող</div>
          </div>
        </div>
        <div class="hero-card-float2">
          <div class="dot-green"></div>
          <div class="float2-text">Live Դասընթաց Հիմա</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ─── ABOUT ─── -->
<section id="about">
  <div class="container">
    <div class="about-grid">
      <div class="about-images fade-in">
        <div class="about-img-main">
          <img src="/static/photo3.jpg" alt="GTH Academy session" />
          <div class="about-img-label">Live Sessionner</div>
        </div>
        <div class="about-img-secondary">
          <img src="/static/photo1.jpg" alt="GTH Academy team" />
        </div>
      </div>
      <div class="about-content fade-in" style="transition-delay:0.15s">
        <div class="tag"><span></span> Մեր Մոտեցումը</div>
        <h2 class="section-title">Ոչ թե Դաս — Այլ Համակարգ</h2>
        <div class="divider"></div>
        <p class="section-subtitle" style="max-width:100%">
          GTH Academy-ն ձևավորվել է իրական բիզնես պրակտիկայի հիմքի վրա: Մենք անցել ենք
          ամբողջ ճանապարհը՝ sourcing-ից մինչև fulfillment, վաճառք և մասշտաբ: Այս փորձը
          ձևավորում է ամեն ծրագրի հիմքը:
        </p>
        <div class="about-pillars">
          <div class="pillar">
            <div class="pillar-icon"><i class="fas fa-layer-group"></i></div>
            <div class="pillar-title">Համակարգային Մոտեցում</div>
            <div class="pillar-desc">Կառուցում ենք ամբողջ բիզնես համակարգ, ոչ թե առանձին հմտություններ</div>
          </div>
          <div class="pillar">
            <div class="pillar-icon"><i class="fas fa-briefcase"></i></div>
            <div class="pillar-title">Պրակտիկ Գիտելիք</div>
            <div class="pillar-desc">Ամեն բան, ինչ ասում ենք, անցել ենք ինքներս աշխատանքում</div>
          </div>
          <div class="pillar">
            <div class="pillar-icon"><i class="fas fa-users-cog"></i></div>
            <div class="pillar-title">Ամբողջ Էկոհամակարգ</div>
            <div class="pillar-desc">Logistic, sourcing, analysis — ամեն ինչ մի կտուրի տակ</div>
          </div>
          <div class="pillar">
            <div class="pillar-icon"><i class="fas fa-chart-line"></i></div>
            <div class="pillar-title">Արդյունքի Ուղղված</div>
            <div class="pillar-desc">Նպատակը ոչ թե դասընթաց ավարտելն է, այլ վաճառք անելը</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ─── ECOSYSTEM ─── -->
<section id="ecosystem">
  <div class="container">
    <div class="eco-header fade-in">
      <div class="tag" style="margin:0 auto 20px;display:inline-flex"><span></span> Ուղղությունները</div>
      <h2 class="section-title">Ամբողջ Էկոհամակարգ</h2>
      <p class="section-subtitle" style="margin:12px auto 0">
        GTH Academy-ն ոչ թե մեկ դասընթաց է, այլ ամբողջ ինֆրաստրուկտուրա, որը ծառայում
        է բիզնեսի բոլոր կարևոր ուղղություններում:
      </p>
    </div>
    <div class="eco-grid">
      <div class="eco-card fade-in">
        <div class="eco-card-num">01</div>
        <div class="eco-card-icon"><i class="fas fa-graduation-cap"></i></div>
        <div class="eco-card-title">Բիզնես Կրթություն</div>
        <div class="eco-card-desc">Ակադեմիա, ծրագրեր, դասընթացներ — ամեն ինչ մատչելի, կառուցվածքային ձևաչափով: Սկսնակից մինչև խորացված մակարդակ:</div>
        <span class="eco-card-tag">Ակադեմիա</span>
      </div>
      <div class="eco-card fade-in" style="transition-delay:0.08s">
        <div class="eco-card-num">02</div>
        <div class="eco-card-icon"><i class="fas fa-truck"></i></div>
        <div class="eco-card-title">Լոգիստիկա & Fulfillment</div>
        <div class="eco-card-desc">Ապրանքի փոխադրում, պահեստ, ուղարկում: Ամբողջ fulfillment գործընթացը կազմակերպված և կառավարելի:</div>
        <span class="eco-card-tag">Logistics</span>
      </div>
      <div class="eco-card fade-in" style="transition-delay:0.16s">
        <div class="eco-card-num">03</div>
        <div class="eco-card-icon"><i class="fas fa-search-dollar"></i></div>
        <div class="eco-card-title">Sourcing — Չինաստան</div>
        <div class="eco-card-desc">Ապրանքի որոնում Չինաստանի շուկայից: Ճիշտ մատակարարի ընտրություն, գնի բանակցություն, լոտի ձևավորում:</div>
        <span class="eco-card-tag">Sourcing</span>
      </div>
      <div class="eco-card fade-in" style="transition-delay:0.24s">
        <div class="eco-card-num">04</div>
        <div class="eco-card-icon"><i class="fas fa-chart-bar"></i></div>
        <div class="eco-card-title">Ապրանքի Վերլուծություն</div>
        <div class="eco-card-desc">Շուկայի վերլուծություն, պահանջարկ, մրցակիցներ, margin: Ճիշտ ապրանքի ընտրություն — բիզնեսի հիմքը:</div>
        <span class="eco-card-tag">Analytics</span>
      </div>
      <div class="eco-card fade-in" style="transition-delay:0.32s">
        <div class="eco-card-num">05</div>
        <div class="eco-card-icon"><i class="fas fa-handshake"></i></div>
        <div class="eco-card-title">Բիզնես Խորհրդատվություն</div>
        <div class="eco-card-desc">Անհատական աջակցություն, ռազմավարական խորհրդատվություն: Կողքի ուղեկից ամբողջ ճանապարհին:</div>
        <span class="eco-card-tag">Consulting</span>
      </div>
      <div class="eco-card fade-in" style="transition-delay:0.40s" style="background:var(--gold-dim);border-color:rgba(201,168,76,0.25);">
        <div class="eco-card-num" style="color:var(--gold)">GTH</div>
        <div class="eco-card-icon" style="background:rgba(201,168,76,0.2)"><i class="fas fa-infinity"></i></div>
        <div class="eco-card-title">Ամբողջ Էկոհամակարգ</div>
        <div class="eco-card-desc">Բոլոր ուղղությունները կապված են մեկ ամբողջ մոտեցմամբ: Ոչ թե մի ծառայություն — ամբողջ ճանապարհ:</div>
        <button class="btn btn-gold" style="margin-top:16px;padding:10px 20px;font-size:13px;" onclick="openModal()">
          Սկսել հիմա <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</section>

<!-- ─── STATS ─── -->
<section id="stats">
  <div class="container">
    <div class="stats-grid fade-in">
      <div class="stat-item">
        <div class="stat-number">3200<span class="stat-plus">+</span></div>
        <div class="stat-label">Ուսանող ամբողջ ծրագրերում</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">150<span class="stat-plus">+</span></div>
        <div class="stat-label">Իրականացված ծրագիր</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">5</div>
        <div class="stat-label">Հիմնական ուղղություն</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">1</div>
        <div class="stat-label">Ամբողջ Էկոհամակարգ</div>
      </div>
    </div>
  </div>
</section>

<!-- ─── APP SECTION ─── -->
<section id="app-section">
  <div class="container">
    <div class="app-grid">
      <div class="app-mockup fade-in">
        <div class="app-phone-bg"></div>
        <div class="app-phone-wrap">
          <div class="app-phone">
            <div class="app-phone-header">
              <div class="app-phone-notch"></div>
              <div class="app-phone-title">GTH Academy</div>
              <div class="app-phone-sub">Հարթակ</div>
            </div>
            <div class="app-phone-body">
              <div class="app-course-item">
                <div class="app-course-icon"><i class="fas fa-store"></i></div>
                <div style="flex:1">
                  <div class="app-course-name">Marketplaces Basics</div>
                  <div class="app-course-progress-bar"><div class="app-course-progress-fill" style="width:72%"></div></div>
                </div>
              </div>
              <div class="app-course-item">
                <div class="app-course-icon"><i class="fas fa-box"></i></div>
                <div style="flex:1">
                  <div class="app-course-name">Product Sourcing Pro</div>
                  <div class="app-course-progress-bar"><div class="app-course-progress-fill" style="width:45%"></div></div>
                </div>
              </div>
              <div class="app-course-item">
                <div class="app-course-icon"><i class="fas fa-chart-line"></i></div>
                <div style="flex:1">
                  <div class="app-course-name">Business Analytics</div>
                  <div class="app-course-progress-bar"><div class="app-course-progress-fill" style="width:20%"></div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="app-phone-float">
            <div class="app-float-icon"><i class="fas fa-fire"></i></div>
            <div>
              <div class="app-float-val">3,200+</div>
              <div class="app-float-lbl">Ուսանողներ</div>
            </div>
          </div>
        </div>
      </div>

      <div class="app-content fade-in" style="transition-delay:0.15s">
        <div class="tag"><span></span> Հավելված</div>
        <h2 class="section-title">Ամբողջ Կրթությունը — Ձեռքիդ Մեջ</h2>
        <div class="divider"></div>
        <p class="section-subtitle" style="max-width:100%">
          GTH Academy-ի հավելվածը հիմնական ուսուցման միջավայրն է: Ամբողջ կրթական գործընթացը,
          նյութերը, լայվ սեսիաները — ամեն ինչ մի վայրում:
        </p>
        <div class="app-features">
          <div class="app-feature">
            <div class="app-feature-icon"><i class="fas fa-play-circle"></i></div>
            <div>
              <div class="app-feature-title">Բոլոր Ծրագրերը</div>
              <div class="app-feature-desc">Վիդեո-դասընթացներ, materials, tasks — կառուցվածքային ձևաչափով</div>
            </div>
          </div>
          <div class="app-feature">
            <div class="app-feature-icon"><i class="fas fa-broadcast-tower"></i></div>
            <div>
              <div class="app-feature-title">Live Sessionner</div>
              <div class="app-feature-desc">Ուղիղ եթեր, հարց-պատասխան, group sessions</div>
            </div>
          </div>
          <div class="app-feature">
            <div class="app-feature-icon"><i class="fas fa-bell"></i></div>
            <div>
              <div class="app-feature-title">Ծանուցումներ & Թարմացումներ</div>
              <div class="app-feature-desc">Նոր բովանդակություն, live-ի ծանուցումներ, կարևոր թարմացումներ</div>
            </div>
          </div>
        </div>
        <div class="app-download-btns">
          <a href="#" class="btn-store" onclick="event.preventDefault();alert('iOS App Store — Շուտով!')">
            <i class="fab fa-apple"></i>
            <div class="btn-store-text">
              <div class="btn-store-sub">Ներբեռնել</div>
              <div class="btn-store-name">App Store</div>
            </div>
          </a>
          <a href="#" class="btn-store" onclick="event.preventDefault();alert('Google Play — Շուտով!')">
            <i class="fab fa-google-play"></i>
            <div class="btn-store-text">
              <div class="btn-store-sub">Ներբեռնել</div>
              <div class="btn-store-name">Google Play</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ─── CTA ─── -->
<section id="cta">
  <div class="container">
    <div class="cta-inner fade-in">
      <div>
        <div class="tag"><span></span> Հաջորդ քայլ</div>
        <h2 class="cta-title">Պատրա՞ստ ես Սկսել</h2>
        <p class="cta-sub">
          Ոչ ևս տեսություն — սկսիր կառուցել ճիշտ համակարգ: Թողիր հայտ, մենք կկապվենք
          ու կներկայացնենք ճիշտ ծրագիր:
        </p>
      </div>
      <div class="cta-actions">
        <button class="btn btn-primary" onclick="openModal()" style="font-size:15px;padding:16px 32px;">
          <i class="fas fa-paper-plane"></i> Թողնել Հայտ
        </button>
        <a href="https://wa.me/37498000000" target="_blank" class="btn btn-whatsapp" style="font-size:15px;padding:16px 32px;">
          <i class="fab fa-whatsapp"></i> WhatsApp
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ─── FOOTER ─── -->
<footer>
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="/static/logo2.png" alt="GTH Academy" />
        <p>Բիզնես կրթական հարթակ և էկոհամակարգ: Կառուցիր ճիշտ բիզնես — համակարգային մոտեցմամբ:</p>
      </div>
      <div>
        <div class="footer-col-title">Ուղղություններ</div>
        <ul class="footer-links">
          <li><a href="#ecosystem">Բիզնես Կրթություն</a></li>
          <li><a href="#ecosystem">Լոգիստիկա</a></li>
          <li><a href="#ecosystem">Sourcing</a></li>
          <li><a href="#ecosystem">Վերլուծություն</a></li>
          <li><a href="#ecosystem">Խորհրդատվություն</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Ակադեմիա</div>
        <ul class="footer-links">
          <li><a href="#about">Մեր Մոտեցումը</a></li>
          <li><a href="#app-section">Հավելված</a></li>
          <li><a href="#stats">Արդյունքներ</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Կապ</div>
        <ul class="footer-links">
          <li><a href="https://wa.me/37498000000" target="_blank"><i class="fab fa-whatsapp" style="width:14px"></i> WhatsApp</a></li>
          <li><a href="mailto:info@gthacademy.am"><i class="fas fa-envelope" style="width:14px"></i> Email</a></li>
        </ul>
        <div style="margin-top:20px;">
          <button class="btn btn-gold" style="width:100%;padding:12px;font-size:13px;text-align:center;" onclick="openModal()">
            <i class="fas fa-arrow-right"></i> Թողնել Հայտ
          </button>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copyright">© 2025 GTH Academy. Բոլոր իրավունքները պաշտպանված են:</div>
      <div class="footer-socials">
        <a href="#" class="social-btn" title="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="#" class="social-btn" title="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="social-btn" title="Telegram"><i class="fab fa-telegram-plane"></i></a>
        <a href="https://wa.me/37498000000" target="_blank" class="social-btn" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
      </div>
    </div>
  </div>
</footer>

<!-- ─── MODAL FORM ─── -->
<div class="modal-overlay" id="modalOverlay" onclick="handleOverlayClick(event)">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></button>
    <div id="formContent">
      <h2 class="modal-title">Թողնել Հայտ</h2>
      <p class="modal-sub">Լրացրու ձևը, մենք կկապվենք 24 ժամվա ընթացքում</p>
      <form id="applyForm" onsubmit="submitForm(event)">
        <div class="form-group">
          <label class="form-label">Անուն Ազգանուն</label>
          <input type="text" class="form-input" placeholder="Հովհաննես Հայկյան" required />
        </div>
        <div class="form-group">
          <label class="form-label">Հեռախոս</label>
          <input type="tel" class="form-input" placeholder="+374 XX XXX XXX" required />
        </div>
        <div class="form-group">
          <label class="form-label">Ուղղություն</label>
          <select class="form-input form-select">
            <option value="">Ընտրել ուղղություն</option>
            <option>Բիզնես Կրթություն</option>
            <option>Լոգիստիկա & Fulfillment</option>
            <option>Sourcing — Չինաստան</option>
            <option>Ապրանքի Վերլուծություն</option>
            <option>Բիզնես Խորհրդատվություն</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:14px;font-size:15px;margin-top:8px;">
          <i class="fas fa-paper-plane"></i> Ուղարկել Հայտ
        </button>
      </form>
    </div>
    <div id="formSuccess" class="form-success" style="display:none">
      <div class="form-success-icon"><i class="fas fa-check-circle"></i></div>
      <h3 class="form-success-title">Հայտն Ընդունված Է!</h3>
      <p class="form-success-sub">Մենք կկապվենք ձեզ հետ 24 ժամվա ընթացքում:<br/>Կարող ես նաև անմիջապես գրել WhatsApp-ում:</p>
      <a href="https://wa.me/37498000000" target="_blank" class="btn btn-whatsapp" style="margin-top:20px;">
        <i class="fab fa-whatsapp"></i> Գրել WhatsApp-ում
      </a>
    </div>
  </div>
</div>

<script>
  // ─── NAVBAR SCROLL ───
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ─── MODAL ───
  function openModal() {
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      document.getElementById('formContent').style.display = 'block';
      document.getElementById('formSuccess').style.display = 'none';
      document.getElementById('applyForm').reset();
    }, 300);
  }
  function handleOverlayClick(e) {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  }

  // ─── FORM SUBMIT ───
  function submitForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type=submit]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ուղարկվում...';
    btn.disabled = true;
    setTimeout(() => {
      document.getElementById('formContent').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }, 1200);
  }

  // ─── MOBILE MENU ───
  function openMobileMenu() { document.getElementById('mobileMenu').classList.add('open'); document.body.style.overflow='hidden'; }
  function closeMobileMenu() { document.getElementById('mobileMenu').classList.remove('open'); document.body.style.overflow=''; }

  // ─── FADE IN ON SCROLL ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ─── SMOOTH ANCHOR SCROLL ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── COUNTER ANIMATION ───
  function animateCounter(el, end, suffix = '') {
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();
    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * end).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = [
          { el: document.querySelectorAll('.stat-number')[0], val: 3200, suffix: '+' },
          { el: document.querySelectorAll('.stat-number')[1], val: 150, suffix: '+' },
          { el: document.querySelectorAll('.stat-number')[2], val: 5, suffix: '' },
          { el: document.querySelectorAll('.stat-number')[3], val: 1, suffix: '' },
        ];
        nums.forEach(n => {
          if (n.el) animateCounter(n.el, n.val, n.suffix);
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) statsObserver.observe(statsSection);
</script>
</body>
</html>`)
})

export default app
