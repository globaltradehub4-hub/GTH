import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  return c.html(getHTML())
})

app.post('/api/contact', async (c) => {
  const body = await c.req.json()
  // In production, integrate with email service here
  console.log('Contact form submission:', body)
  return c.json({ success: true, message: 'Հայտն ընդունված է' })
})

function getHTML() {
  return `<!DOCTYPE html>
<html lang="hy">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="GTH Academy — բիզնեսի, վաճառքի, մարքեթինգի, տեխնոլոգիաների և անձնական զարգացման ծրագրերի միասնական հավելված։" />
  <meta property="og:title" content="GTH Academy — Բիզնեսի և զարգացման ծրագրերը մեկ հավելվածում" />
  <meta property="og:description" content="Ներբեռնիր GTH Academy հավելվածը և ծանոթացիր 12+ ծրագրերի անվճար ներկայացնող վեբինարներին։" />
  <title>GTH Academy — Բիզնեսի և զարգացման ծրագրերը մեկ հավելվածում</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" />
  <style>
    /* ===== CSS VARIABLES ===== */
    :root {
      --bg-primary: #0a0a0f;
      --bg-secondary: #0f0f1a;
      --bg-card: #12121e;
      --bg-card-hover: #161624;
      --red-primary: #e8192c;
      --red-glow: #ff1a2e;
      --red-soft: rgba(232, 25, 44, 0.15);
      --red-border: rgba(232, 25, 44, 0.4);
      --red-border-hover: rgba(232, 25, 44, 0.8);
      --text-primary: #ffffff;
      --text-secondary: #a0a0b8;
      --text-muted: #606080;
      --border-subtle: rgba(255,255,255,0.06);
      --border-card: rgba(255,255,255,0.08);
      --graphite: #1a1a2e;
      --gradient-red: linear-gradient(135deg, #e8192c, #ff4d5a);
      --gradient-dark: linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 100%);
      --font-main: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --shadow-red: 0 0 30px rgba(232, 25, 44, 0.25);
      --shadow-card: 0 8px 32px rgba(0,0,0,0.4);
      --radius-card: 16px;
      --radius-btn: 10px;
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* ===== RESET & BASE ===== */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--font-main);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; height: auto; }
    ul { list-style: none; }
    button { cursor: pointer; font-family: inherit; border: none; }

    /* ===== SCROLLBAR ===== */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg-primary); }
    ::-webkit-scrollbar-thumb { background: var(--red-primary); border-radius: 3px; }

    /* ===== UTILITY CLASSES ===== */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .section { padding: 100px 0; position: relative; }
    .section-sm { padding: 60px 0; }
    .text-center { text-align: center; }
    .text-red { color: var(--red-primary); }

    .section-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--red-soft);
      border: 1px solid var(--red-border);
      color: var(--red-primary);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 100px;
      margin-bottom: 20px;
    }
    .section-tag i { font-size: 10px; }

    .section-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
    }
    .section-subtitle {
      font-size: 1.1rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto 60px;
    }

    /* ===== BUTTONS ===== */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 14px 28px;
      border-radius: var(--radius-btn);
      font-size: 15px;
      font-weight: 600;
      transition: var(--transition);
      white-space: nowrap;
      position: relative;
      overflow: hidden;
    }
    .btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0.08);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .btn:hover::before { opacity: 1; }

    .btn-primary {
      background: var(--gradient-red);
      color: #fff;
      box-shadow: 0 4px 20px rgba(232,25,44,0.35);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(232,25,44,0.5);
    }

    .btn-outline {
      background: transparent;
      color: var(--text-primary);
      border: 1.5px solid var(--border-card);
    }
    .btn-outline:hover {
      border-color: var(--red-border);
      color: var(--red-primary);
      transform: translateY(-2px);
    }

    .btn-ghost {
      background: rgba(255,255,255,0.05);
      color: var(--text-secondary);
      border: 1px solid var(--border-subtle);
    }
    .btn-ghost:hover {
      background: rgba(255,255,255,0.1);
      color: var(--text-primary);
    }

    .btn-store {
      background: rgba(255,255,255,0.06);
      border: 1.5px solid rgba(255,255,255,0.12);
      color: var(--text-primary);
      padding: 12px 22px;
      border-radius: 12px;
      gap: 12px;
      align-items: center;
      min-width: 170px;
    }
    .btn-store:hover {
      background: rgba(255,255,255,0.12);
      border-color: rgba(255,255,255,0.25);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    }
    .btn-store .store-icon { font-size: 24px; line-height: 1; }
    .btn-store .store-text { text-align: left; }
    .btn-store .store-text small {
      display: block;
      font-size: 10px;
      color: var(--text-secondary);
      font-weight: 400;
      letter-spacing: 0.3px;
    }
    .btn-store .store-text strong {
      display: block;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: -0.2px;
    }

    .btn-lg { padding: 18px 36px; font-size: 16px; border-radius: 12px; }
    .btn-sm { padding: 8px 18px; font-size: 13px; }

    .store-buttons {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }

    /* ===== GLOWING LINE DECORATIONS ===== */
    .red-line {
      width: 60px;
      height: 3px;
      background: var(--gradient-red);
      border-radius: 2px;
      margin-bottom: 24px;
      position: relative;
    }
    .red-line::after {
      content: '';
      position: absolute;
      inset: -2px;
      background: var(--gradient-red);
      border-radius: 2px;
      filter: blur(6px);
      opacity: 0.6;
    }
    .red-line-center { margin-left: auto; margin-right: auto; }

    /* ===== BACKGROUND NOISE TEXTURE ===== */
    .noise-bg {
      position: relative;
    }
    .noise-bg::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
    }

    /* ===== GRID BG LINES ===== */
    .grid-bg {
      background-image:
        linear-gradient(rgba(232,25,44,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(232,25,44,0.04) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    /* ===== HEADER / NAV ===== */
    #header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: var(--transition);
      padding: 0;
    }
    #header.scrolled {
      background: rgba(10,10,15,0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-subtle);
      box-shadow: 0 4px 30px rgba(0,0,0,0.4);
    }
    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 0;
      gap: 32px;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    .logo-mark {
      width: 42px;
      height: 42px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo-svg {
      width: 130px;
      height: auto;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .nav-links a {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
      padding: 8px 14px;
      border-radius: 8px;
      transition: var(--transition);
    }
    .nav-links a:hover {
      color: var(--text-primary);
      background: rgba(255,255,255,0.06);
    }
    .nav-links a.active { color: var(--red-primary); }

    .nav-cta { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      padding: 8px;
      border-radius: 8px;
      transition: var(--transition);
    }
    .hamburger span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--text-primary);
      border-radius: 2px;
      transition: var(--transition);
    }
    .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

    .mobile-menu {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(10,10,15,0.98);
      backdrop-filter: blur(20px);
      z-index: 999;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 80px 24px 40px;
    }
    .mobile-menu.open { display: flex; }
    .mobile-menu a {
      font-size: 22px;
      font-weight: 700;
      color: var(--text-secondary);
      padding: 14px 28px;
      border-radius: 12px;
      text-align: center;
      width: 100%;
      max-width: 280px;
      transition: var(--transition);
    }
    .mobile-menu a:hover, .mobile-menu a:active {
      color: var(--text-primary);
      background: rgba(255,255,255,0.06);
    }
    .mobile-menu .mobile-store-btns {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 280px;
    }

    /* ===== HERO SECTION ===== */
    #hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding-top: 80px;
      position: relative;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 80% 60% at 60% 40%, rgba(232,25,44,0.08) 0%, transparent 70%),
                  radial-gradient(ellipse 50% 40% at 10% 80%, rgba(232,25,44,0.05) 0%, transparent 60%),
                  var(--bg-primary);
      z-index: 0;
    }
    .hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(232,25,44,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(232,25,44,0.05) 1px, transparent 1px);
      background-size: 80px 80px;
      mask-image: radial-gradient(ellipse at center, rgba(0,0,0,0.5) 30%, transparent 80%);
      z-index: 0;
    }
    .hero-content {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      width: 100%;
    }
    .hero-text { max-width: 560px; }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--red-soft);
      border: 1px solid var(--red-border);
      padding: 8px 18px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 600;
      color: var(--red-primary);
      margin-bottom: 28px;
      letter-spacing: 0.5px;
    }
    .hero-badge span.dot {
      width: 6px;
      height: 6px;
      background: var(--red-primary);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
    }
    .hero-title {
      font-size: clamp(2.4rem, 5vw, 3.6rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -1px;
      margin-bottom: 24px;
    }
    .hero-title .highlight {
      background: var(--gradient-red);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-desc {
      font-size: 1.1rem;
      color: var(--text-secondary);
      margin-bottom: 36px;
      line-height: 1.7;
      max-width: 480px;
    }
    .hero-actions {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .hero-store-row {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }
    .hero-secondary {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      color: var(--text-muted);
    }
    .hero-secondary i { color: var(--red-primary); font-size: 12px; }

    .hero-visual {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .phone-mockup-wrapper {
      position: relative;
      display: inline-block;
    }
    .phone-glow {
      position: absolute;
      inset: -40px;
      background: radial-gradient(ellipse at center, rgba(232,25,44,0.2) 0%, transparent 70%);
      pointer-events: none;
      animation: glowPulse 4s ease-in-out infinite;
    }
    @keyframes glowPulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
    }
    .phone-img {
      width: 100%;
      max-width: 340px;
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 20px 60px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(232,25,44,0.15));
      animation: float 6s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }
    .phone-decorations {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }
    .deco-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid var(--red-border);
      animation: ringPulse 4s ease-in-out infinite;
    }
    .deco-ring-1 {
      width: 300px; height: 300px;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: 0s;
    }
    .deco-ring-2 {
      width: 420px; height: 420px;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: 1s;
      opacity: 0.4;
    }
    @keyframes ringPulse {
      0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
      50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.02); }
    }

    .hero-stats {
      display: flex;
      gap: 32px;
      margin-top: 48px;
      padding-top: 32px;
      border-top: 1px solid var(--border-subtle);
    }
    .stat-item { text-align: center; }
    .stat-number {
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--text-primary);
      display: block;
    }
    .stat-number span { color: var(--red-primary); }
    .stat-label {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    /* ===== TRUSTED BY ===== */
    #trusted {
      padding: 48px 0;
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
      background: var(--bg-secondary);
    }
    .trusted-inner {
      display: flex;
      align-items: center;
      gap: 40px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .trusted-label {
      font-size: 13px;
      color: var(--text-muted);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      white-space: nowrap;
    }
    .trusted-logos {
      display: flex;
      align-items: center;
      gap: 40px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .trusted-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 15px;
      font-weight: 600;
      color: var(--text-muted);
      transition: var(--transition);
    }
    .trusted-item:hover { color: var(--text-secondary); }
    .trusted-item i { font-size: 22px; color: var(--red-primary); opacity: 0.7; }

    /* ===== HOW IT WORKS ===== */
    #how-it-works {
      background: var(--bg-secondary);
      position: relative;
      overflow: hidden;
    }
    #how-it-works::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--red-border), transparent);
    }
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      position: relative;
    }
    .steps-connector {
      position: absolute;
      top: 52px;
      left: calc(16.67% + 40px);
      right: calc(16.67% + 40px);
      height: 1px;
      background: linear-gradient(90deg, var(--red-border), rgba(232,25,44,0.1), var(--red-border));
      z-index: 0;
    }
    .step-card {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: var(--radius-card);
      padding: 36px 28px;
      text-align: center;
      position: relative;
      z-index: 1;
      transition: var(--transition);
    }
    .step-card:hover {
      border-color: var(--red-border);
      background: var(--bg-card-hover);
      transform: translateY(-4px);
      box-shadow: var(--shadow-card);
    }
    .step-number {
      width: 56px;
      height: 56px;
      background: var(--red-soft);
      border: 2px solid var(--red-border);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 800;
      color: var(--red-primary);
      margin: 0 auto 24px;
      position: relative;
    }
    .step-number::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 1px solid var(--red-border);
      opacity: 0.4;
    }
    .step-icon {
      font-size: 36px;
      color: var(--red-primary);
      margin-bottom: 18px;
      display: block;
    }
    .step-title {
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .step-desc {
      font-size: 14px;
      color: var(--text-secondary);
      line-height: 1.6;
    }
    .steps-note {
      margin-top: 48px;
      text-align: center;
      padding: 20px 28px;
      background: var(--red-soft);
      border: 1px solid var(--red-border);
      border-radius: 12px;
      font-size: 14px;
      color: var(--text-secondary);
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }
    .steps-note strong { color: var(--text-primary); }

    /* ===== PROGRAMS SECTION ===== */
    #programs {
      background: var(--bg-primary);
      position: relative;
    }
    .programs-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .program-card {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: var(--radius-card);
      padding: 28px 24px;
      transition: var(--transition);
      cursor: default;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .program-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--gradient-red);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .program-card:hover {
      border-color: var(--red-border);
      background: var(--bg-card-hover);
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.4), var(--shadow-red);
    }
    .program-card:hover::before { opacity: 1; }

    .program-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    .program-num {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      letter-spacing: 1px;
      text-transform: uppercase;
      background: rgba(255,255,255,0.04);
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid var(--border-subtle);
    }
    .program-icon-wrap {
      width: 44px;
      height: 44px;
      background: var(--red-soft);
      border: 1px solid var(--red-border);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: var(--red-primary);
      flex-shrink: 0;
    }
    .program-name {
      font-size: 1.05rem;
      font-weight: 700;
      line-height: 1.3;
    }
    .program-desc {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.5;
      flex-grow: 1;
    }
    .program-cta {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 600;
      color: var(--red-primary);
      padding: 8px 0;
      border-top: 1px solid var(--border-subtle);
      transition: var(--transition);
      margin-top: auto;
    }
    .program-cta i { font-size: 11px; transition: transform 0.2s; }
    .program-card:hover .program-cta i { transform: translateX(4px); }

    .programs-cta-note {
      margin-top: 40px;
      text-align: center;
      padding: 24px 32px;
      background: linear-gradient(135deg, rgba(232,25,44,0.08), rgba(232,25,44,0.04));
      border: 1px solid var(--red-border);
      border-radius: 16px;
    }
    .programs-cta-note p {
      font-size: 15px;
      color: var(--text-secondary);
      margin-bottom: 20px;
    }
    .programs-cta-note strong { color: var(--text-primary); }

    /* ===== APP FEATURES SECTION ===== */
    #app-features {
      background: var(--bg-secondary);
      position: relative;
      overflow: hidden;
    }
    #app-features::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--red-border), transparent);
    }
    .features-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }
    .features-visual {
      position: relative;
      display: flex;
      justify-content: center;
    }
    .features-phone {
      max-width: 280px;
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 20px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 30px rgba(232,25,44,0.12));
    }
    .features-bg-circle {
      position: absolute;
      width: 360px;
      height: 360px;
      background: radial-gradient(circle, rgba(232,25,44,0.1) 0%, transparent 70%);
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .features-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .feature-item {
      display: flex;
      gap: 20px;
      align-items: flex-start;
      padding: 20px;
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 14px;
      transition: var(--transition);
    }
    .feature-item:hover {
      border-color: var(--red-border);
      transform: translateX(4px);
    }
    .feature-icon {
      width: 46px;
      height: 46px;
      background: var(--red-soft);
      border: 1px solid var(--red-border);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: var(--red-primary);
      flex-shrink: 0;
    }
    .feature-text h4 {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .feature-text p {
      font-size: 14px;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    /* ===== CONTACT FORM ===== */
    #contact {
      background: var(--bg-primary);
      position: relative;
    }
    .contact-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: start;
    }
    .contact-info h2 {
      font-size: clamp(1.8rem, 3vw, 2.6rem);
      font-weight: 800;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
    }
    .contact-info p {
      font-size: 16px;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 32px;
    }
    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .contact-detail {
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 15px;
      color: var(--text-secondary);
    }
    .contact-detail i {
      width: 40px;
      height: 40px;
      background: var(--red-soft);
      border: 1px solid var(--red-border);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--red-primary);
      font-size: 16px;
      flex-shrink: 0;
    }

    .contact-form {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 20px;
      padding: 36px;
    }
    .form-title {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .form-subtitle {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 28px;
    }
    .form-group {
      margin-bottom: 18px;
    }
    .form-group label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 8px;
      letter-spacing: 0.3px;
    }
    .form-group label .required { color: var(--red-primary); margin-left: 2px; }
    .form-control {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 1.5px solid var(--border-card);
      border-radius: 10px;
      padding: 13px 16px;
      font-size: 14px;
      color: var(--text-primary);
      font-family: var(--font-main);
      transition: var(--transition);
      outline: none;
    }
    .form-control:focus {
      border-color: var(--red-border);
      background: rgba(232,25,44,0.04);
      box-shadow: 0 0 0 3px rgba(232,25,44,0.1);
    }
    .form-control::placeholder { color: var(--text-muted); }
    select.form-control {
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23606080' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 16px center;
      padding-right: 44px;
    }
    select.form-control option { background: var(--bg-card); }
    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }
    .form-checkbox {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 24px;
    }
    .form-checkbox input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: var(--red-primary);
      flex-shrink: 0;
      margin-top: 2px;
      cursor: pointer;
    }
    .form-checkbox label {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
      cursor: pointer;
    }
    .form-checkbox label a {
      color: var(--red-primary);
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-submit { width: 100%; }
    .form-success {
      display: none;
      text-align: center;
      padding: 24px;
      background: rgba(34, 197, 94, 0.08);
      border: 1px solid rgba(34, 197, 94, 0.3);
      border-radius: 12px;
      margin-top: 16px;
    }
    .form-success i { font-size: 32px; color: #22c55e; margin-bottom: 12px; display: block; }
    .form-success p { color: var(--text-secondary); font-size: 15px; }
    .form-success strong { color: var(--text-primary); }

    /* ===== FINAL CTA SECTION ===== */
    #final-cta {
      background: var(--bg-secondary);
      position: relative;
      overflow: hidden;
      text-align: center;
    }
    .final-cta-bg {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 70% 70% at 50% 50%, rgba(232,25,44,0.12) 0%, transparent 70%);
    }
    .final-cta-content {
      position: relative;
      z-index: 1;
    }
    .final-cta-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 900;
      line-height: 1.15;
      margin-bottom: 20px;
      letter-spacing: -1px;
    }
    .final-cta-desc {
      font-size: 1.1rem;
      color: var(--text-secondary);
      max-width: 520px;
      margin: 0 auto 44px;
      line-height: 1.7;
    }
    .final-cta-btns {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .final-cta-phone {
      margin-top: 60px;
      max-width: 300px;
      margin-left: auto;
      margin-right: auto;
      filter: drop-shadow(0 30px 80px rgba(0,0,0,0.6)) drop-shadow(0 0 50px rgba(232,25,44,0.2));
    }

    /* ===== FOOTER ===== */
    footer {
      background: var(--bg-primary);
      border-top: 1px solid var(--border-subtle);
      padding: 64px 0 32px;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 48px;
      margin-bottom: 48px;
    }
    .footer-brand {}
    .footer-logo { margin-bottom: 16px; }
    .footer-desc {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 280px;
    }
    .footer-social {
      display: flex;
      gap: 10px;
    }
    .social-link {
      width: 38px;
      height: 38px;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      color: var(--text-muted);
      transition: var(--transition);
    }
    .social-link:hover {
      background: var(--red-soft);
      border-color: var(--red-border);
      color: var(--red-primary);
      transform: translateY(-2px);
    }
    .footer-col-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: var(--text-secondary);
      margin-bottom: 20px;
    }
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .footer-links a {
      font-size: 14px;
      color: var(--text-muted);
      transition: var(--transition);
    }
    .footer-links a:hover { color: var(--text-primary); padding-left: 4px; }
    .footer-contact-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 14px;
      color: var(--text-muted);
      margin-bottom: 12px;
    }
    .footer-contact-item i { color: var(--red-primary); font-size: 14px; margin-top: 2px; }

    .footer-app-btns {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 4px;
    }
    .footer-app-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 10px 14px;
      transition: var(--transition);
      font-size: 13px;
      color: var(--text-secondary);
    }
    .footer-app-btn:hover {
      border-color: var(--red-border);
      color: var(--text-primary);
      background: var(--red-soft);
    }
    .footer-app-btn i { font-size: 20px; color: var(--red-primary); }

    .footer-bottom {
      padding-top: 32px;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .footer-copy {
      font-size: 13px;
      color: var(--text-muted);
    }
    .footer-legal {
      display: flex;
      gap: 20px;
    }
    .footer-legal a {
      font-size: 13px;
      color: var(--text-muted);
      transition: color 0.2s;
    }
    .footer-legal a:hover { color: var(--text-secondary); }

    /* ===== MOBILE STICKY BAR ===== */
    .mobile-sticky-bar {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 900;
      background: rgba(10,10,15,0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-top: 1px solid var(--border-card);
      padding: 12px 16px;
    }
    .mobile-sticky-bar .btn {
      width: 100%;
      font-size: 15px;
      padding: 16px;
    }

    /* ===== ANIMATIONS ===== */
    .fade-in {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .fade-in-delay-1 { transition-delay: 0.1s; }
    .fade-in-delay-2 { transition-delay: 0.2s; }
    .fade-in-delay-3 { transition-delay: 0.3s; }
    .fade-in-delay-4 { transition-delay: 0.4s; }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 1024px) {
      .programs-grid { grid-template-columns: repeat(2, 1fr); }
      .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    }
    @media (max-width: 768px) {
      .section { padding: 70px 0; }
      .nav-links, .nav-cta { display: none; }
      .hamburger { display: flex; }
      .hero-content { grid-template-columns: 1fr; gap: 50px; text-align: center; }
      .hero-text { max-width: 100%; order: 2; }
      .hero-visual { order: 1; }
      .hero-badge { margin-left: auto; margin-right: auto; }
      .hero-desc { margin-left: auto; margin-right: auto; }
      .hero-actions { align-items: center; }
      .hero-store-row { justify-content: center; }
      .hero-secondary { justify-content: center; }
      .hero-stats { justify-content: center; }
      .phone-img { max-width: 240px; }
      .steps-grid { grid-template-columns: 1fr; gap: 20px; }
      .steps-connector { display: none; }
      .programs-grid { grid-template-columns: 1fr; }
      .features-layout { grid-template-columns: 1fr; gap: 40px; }
      .features-visual { order: -1; }
      .features-phone { max-width: 220px; }
      .contact-layout { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr; gap: 32px; }
      .footer-bottom { flex-direction: column; text-align: center; }
      .footer-legal { justify-content: center; }
      .mobile-sticky-bar { display: block; }
      body { padding-bottom: 80px; }
      .final-cta-btns { flex-direction: column; align-items: center; }
    }
    @media (max-width: 480px) {
      .container { padding: 0 16px; }
      .hero-store-row { flex-direction: column; align-items: center; }
      .btn-store { width: 100%; max-width: 280px; }
      .store-buttons { flex-direction: column; align-items: center; }
      .trusted-logos { gap: 24px; }
    }
  </style>
</head>
<body>

<!-- ===== HEADER ===== -->
<header id="header">
  <div class="container">
    <nav>
      <a href="#" class="nav-logo">
        <svg class="logo-svg" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Main capsule background -->
          <rect x="0" y="10" width="180" height="60" rx="30" fill="#1e1e2a"/>
          <!-- GTH letters -->
          <text x="26" y="58" font-family="Inter, sans-serif" font-weight="900" font-size="44" fill="white" letter-spacing="-2">GTH</text>
          <!-- Academy badge -->
          <rect x="138" y="4" width="100" height="26" rx="13" fill="#e8192c"/>
          <text x="149" y="21" font-family="Inter, sans-serif" font-weight="700" font-size="11" fill="white" letter-spacing="0.5">ACADEMY</text>
          <!-- Graduation cap circle -->
          <circle cx="231" cy="17" r="10" fill="white" fill-opacity="0.2" stroke="white" stroke-width="1.5"/>
          <text x="227" y="21" font-family="sans-serif" font-size="10" fill="white">🎓</text>
        </svg>
      </a>

      <ul class="nav-links">
        <li><a href="#hero">Գլխավոր</a></li>
        <li><a href="#programs">Ծրագրեր</a></li>
        <li><a href="#app-features">Հավելված</a></li>
        <li><a href="#how-it-works">Ինչպես է աշխատում</a></li>
        <li><a href="#contact">Կապ</a></li>
      </ul>

      <div class="nav-cta">
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
          <i class="fas fa-download"></i>
          Ներբեռնել հավելվածը
        </a>
      </div>

      <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </nav>
  </div>
</header>

<!-- Mobile Menu -->
<div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true">
  <a href="#hero" class="mobile-nav-link">Գլխավոր</a>
  <a href="#programs" class="mobile-nav-link">Ծրագրեր</a>
  <a href="#app-features" class="mobile-nav-link">Հավելված</a>
  <a href="#how-it-works" class="mobile-nav-link">Ինչպես է աշխատում</a>
  <a href="#contact" class="mobile-nav-link">Կապ</a>
  <div class="mobile-store-btns">
    <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="btn btn-primary btn-lg">
      <i class="fab fa-google-play"></i> Google Play
    </a>
    <a href="https://apps.apple.com/us/app/gth-academy/id6759160682" target="_blank" rel="noopener" class="btn btn-outline btn-lg">
      <i class="fab fa-apple"></i> App Store
    </a>
  </div>
</div>

<!-- ===== HERO SECTION ===== -->
<section id="hero">
  <div class="hero-bg"></div>
  <div class="hero-grid"></div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-text">
        <div class="hero-badge">
          <span class="dot"></span>
          Հավելվածն արդեն հասանելի է
        </div>
        <h1 class="hero-title">
          Բիզնեսի և <span class="highlight">զարգացման</span> ծրագրերը՝ մեկ հավելվածում
        </h1>
        <p class="hero-desc">
          GTH Academy հավելվածում հասանելի են բիզնեսի, վաճառքների, մարքեթինգի, ավտոմատացման, տեխնոլոգիաների և անձնական արդյունավետության ծրագրեր։
        </p>
        <div class="hero-actions">
          <div class="hero-store-row">
            <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="btn btn-store">
              <span class="store-icon"><i class="fab fa-google-play" style="color: #4ade80;"></i></span>
              <span class="store-text">
                <small>Ներբեռնել</small>
                <strong>Google Play</strong>
              </span>
            </a>
            <a href="https://apps.apple.com/us/app/gth-academy/id6759160682" target="_blank" rel="noopener" class="btn btn-store">
              <span class="store-icon"><i class="fab fa-apple" style="color: #e0e0e0;"></i></span>
              <span class="store-text">
                <small>Ներբեռնել</small>
                <strong>App Store</strong>
              </span>
            </a>
          </div>
          <a href="#programs" class="hero-secondary">
            <i class="fas fa-chevron-down"></i>
            Դիտել ծրագրերը
          </a>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">12<span>+</span></span>
            <div class="stat-label">Ծրագրեր</div>
          </div>
          <div class="stat-item">
            <span class="stat-number">iOS <span>&</span> Android</span>
            <div class="stat-label">Հասանելի</div>
          </div>
          <div class="stat-item">
            <span class="stat-number">անվ<span>.</span></span>
            <div class="stat-label">Ծանոթ. վեբինարներ</div>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="phone-decorations">
          <div class="deco-ring deco-ring-1"></div>
          <div class="deco-ring deco-ring-2"></div>
        </div>
        <div class="phone-mockup-wrapper">
          <div class="phone-glow"></div>
          <img
            src="https://www.genspark.ai/api/files/s/UN2WaxVK"
            alt="GTH Academy հավելվածի interface"
            class="phone-img"
            loading="eager"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== TRUSTED BY ===== -->
<section id="trusted">
  <div class="container">
    <div class="trusted-inner">
      <span class="trusted-label">Ծրագրային ուղղություններ</span>
      <div class="trusted-logos">
        <div class="trusted-item"><i class="fas fa-chart-line"></i> Բիզնես</div>
        <div class="trusted-item"><i class="fas fa-bullhorn"></i> Մարքեթինգ</div>
        <div class="trusted-item"><i class="fas fa-handshake"></i> Վաճառք</div>
        <div class="trusted-item"><i class="fas fa-robot"></i> Ավտոմատացում</div>
        <div class="trusted-item"><i class="fas fa-code"></i> Տեխնոլոգիաներ</div>
        <div class="trusted-item"><i class="fas fa-brain"></i> Անձնական արդյունավետություն</div>
      </div>
    </div>
  </div>
</section>

<!-- ===== HOW IT WORKS ===== -->
<section id="how-it-works" class="section">
  <div class="container">
    <div class="text-center">
      <div class="section-tag"><i class="fas fa-circle-dot"></i> Ինչպես է աշխատում</div>
      <h2 class="section-title">Ընդամենը <span class="text-red">3 քայլ</span></h2>
      <p class="section-subtitle">Ծրագրի ծանոթ. վեբինարից մինչև ամբողջական ուսուցում՝ հավելվածի ներսում</p>
    </div>

    <div class="steps-grid">
      <div class="steps-connector"></div>

      <div class="step-card fade-in">
        <div class="step-number">1</div>
        <i class="step-icon fas fa-mobile-alt"></i>
        <h3 class="step-title">Ներբեռնիր հավելվածը</h3>
        <p class="step-desc">Ներբեռնիր GTH Academy հավելվածը Google Play-ից կամ App Store-ից՝ iOS և Android սարքերի համար։</p>
      </div>

      <div class="step-card fade-in fade-in-delay-1">
        <div class="step-number">2</div>
        <i class="step-icon fas fa-th-large"></i>
        <h3 class="step-title">Ընտրիր ծրագիրը</h3>
        <p class="step-desc">Դիտիր հասանելի ծրագրերը, ընտրիր քեզ հետաքրքրողը և ծանոթացիր դրա բովանդակությանը։</p>
      </div>

      <div class="step-card fade-in fade-in-delay-2">
        <div class="step-number">3</div>
        <i class="step-icon fas fa-play-circle"></i>
        <h3 class="step-title">Դիտիր ծանոթ. վեբինարը</h3>
        <p class="step-desc">Ծրագրի ներկայացնող վեբինարը հասանելի է անվճար հավելվածում — ծանոթացիր և ընդունիր որոշում։</p>
      </div>
    </div>

    <div class="steps-note">
      <strong>Կարևոր.</strong> Յուրաքանչյուր ծրագրի մանրամասները, ծրագրի կառուցվածքը և ծանոթ. վեբինարը հասանելի են <strong>GTH Academy հավելվածում</strong>։ Կայքում ներկայացված է ծրագրերի ընդհանուր ցանկը:
    </div>
  </div>
</section>

<!-- ===== PROGRAMS SECTION ===== -->
<section id="programs" class="section">
  <div class="container">
    <div class="text-center">
      <div class="section-tag"><i class="fas fa-circle-dot"></i> Ծրագրեր</div>
      <h2 class="section-title">Բոլոր ծրագրերը <span class="text-red">մեկ հավելվածում</span></h2>
      <p class="section-subtitle">Բիզնեսային, տեխնոլոգիական և անձնական զարգացման ծրագրեր՝ ամեն ուղղությամբ</p>
    </div>

    <div class="programs-grid">

      <div class="program-card fade-in">
        <div class="program-header">
          <span class="program-num">00</span>
          <div class="program-icon-wrap"><i class="fas fa-globe"></i></div>
        </div>
        <h3 class="program-name">Բիզնես 360</h3>
        <p class="program-desc">Բիզնեսի ամբողջական ըմբռնում՝ ռազմավարությունից մինչև գործառնություններ։</p>
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="program-cta">
          Դիտել հավելվածում <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="program-card fade-in fade-in-delay-1">
        <div class="program-header">
          <span class="program-num">01</span>
          <div class="program-icon-wrap"><i class="fas fa-user-tie"></i></div>
        </div>
        <h3 class="program-name">Menthory</h3>
        <p class="program-desc">Մենտորական աջակցության համակարգ անձնական և մասնագիտական աճի համար։</p>
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="program-cta">
          Դիտել հավելվածում <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="program-card fade-in fade-in-delay-2">
        <div class="program-header">
          <span class="program-num">02</span>
          <div class="program-icon-wrap"><i class="fas fa-laptop-code"></i></div>
        </div>
        <h3 class="program-name">Կայքերի պատրաստում</h3>
        <p class="program-desc">Ժամանակակից կայքերի ստեղծման հմտություններ՝ հիմունքներից մինչև գործնական կիրառություն։</p>
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="program-cta">
          Դիտել հավելվածում <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="program-card fade-in">
        <div class="program-header">
          <span class="program-num">03</span>
          <div class="program-icon-wrap"><i class="fas fa-tasks"></i></div>
        </div>
        <h3 class="program-name">Բիտրիքսով աշխատանք</h3>
        <p class="program-desc">Bitrix24 CRM-ի կիրառման գործնական ծրագիր բիզնեսի ավտոմատացման համար։</p>
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="program-cta">
          Դիտել հավելվածում <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="program-card fade-in fade-in-delay-1">
        <div class="program-header">
          <span class="program-num">04</span>
          <div class="program-icon-wrap"><i class="fas fa-chart-bar"></i></div>
        </div>
        <h3 class="program-name">Մետրիկա</h3>
        <p class="program-desc">Վեբ-վերլուծական հարթակի կիրառություն՝ բիզնեսի ցուցանիշների վերահսկման համար։</p>
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="program-cta">
          Դիտել հավելվածում <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="program-card fade-in fade-in-delay-2">
        <div class="program-header">
          <span class="program-num">05</span>
          <div class="program-icon-wrap"><i class="fas fa-video"></i></div>
        </div>
        <h3 class="program-name">Պրոֆ. գովազդ 10–20 րոպ.</h3>
        <p class="program-desc">Հզոր գովազդային նյութեր կրճատ ժամանակում՝ արդյունավետ ձևաչափերով։</p>
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="program-cta">
          Դիտել հավելվածում <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="program-card fade-in">
        <div class="program-header">
          <span class="program-num">06</span>
          <div class="program-icon-wrap"><i class="fas fa-envelope-open-text"></i></div>
        </div>
        <h3 class="program-name">SendPulse աշխատանք</h3>
        <p class="program-desc">Էլ. փոստ, SMS, chatbot մարքեթինգ SendPulse հարթակի կիրառությամբ։</p>
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="program-cta">
          Դիտել հավելվածում <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="program-card fade-in fade-in-delay-1">
        <div class="program-header">
          <span class="program-num">07</span>
          <div class="program-icon-wrap"><i class="fas fa-file-contract"></i></div>
        </div>
        <h3 class="program-name">Տենդերների մասնակցություն</h3>
        <p class="program-desc">Պետական և մասնավոր տենդերներում հաղթող հայտ ներկայացնելու ռազմավարություն։</p>
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="program-cta">
          Դիտել հավելվածում <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="program-card fade-in fade-in-delay-2">
        <div class="program-header">
          <span class="program-num">08</span>
          <div class="program-icon-wrap"><i class="fas fa-store"></i></div>
        </div>
        <h3 class="program-name">Մարկետփլեյսի ներդրում</h3>
        <p class="program-desc">Մարկետփլեյս հարթակներ ճիշտ մուտք կատարելու, ապրանք ներկայացնելու ծրագիր։</p>
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="program-cta">
          Դիտել հավելվածում <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="program-card fade-in">
        <div class="program-header">
          <span class="program-num">09</span>
          <div class="program-icon-wrap"><i class="fas fa-rocket"></i></div>
        </div>
        <h3 class="program-name">Բիզնեսի մասշտաբայնացում</h3>
        <p class="program-desc">Բիզնեսը կայուն աճի հասցնելու և թիմ կառուցելու գործնական ուղեցույց։</p>
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="program-cta">
          Դիտել հավելվածում <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="program-card fade-in fade-in-delay-1">
        <div class="program-header">
          <span class="program-num">10</span>
          <div class="program-icon-wrap"><i class="fas fa-handshake-angle"></i></div>
        </div>
        <h3 class="program-name">Վաճառքներ</h3>
        <p class="program-desc">Վաճառքի հոգեբանությունը, փուլերն ու գործնական հմտությունները՝ ռեալ արդյունքների համար։</p>
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="program-cta">
          Դիտել հավելվածում <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="program-card fade-in fade-in-delay-2">
        <div class="program-header">
          <span class="program-num">11</span>
          <div class="program-icon-wrap"><i class="fas fa-sun"></i></div>
        </div>
        <h3 class="program-name">Դիսցիպլինա, սովորություններ և առավոտյան ռիտուալ</h3>
        <p class="program-desc">Կայուն սովորությունների ձևավորում, ժամանակի կառավարում և օրվա ռիթմ։</p>
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="program-cta">
          Դիտել հավելվածում <i class="fas fa-arrow-right"></i>
        </a>
      </div>

    </div>

    <div class="programs-cta-note">
      <p><strong>Յուրաքանչյուր ծրագրի մանրամասները և ծանոթ. վեբինարը</strong> հասանելի են GTH Academy հավելվածում։<br/>Ներբեռնիր հավելվածը, ընտրիր ծրագիրը և դիտիր ծանոթ. վեբինարն անվճար։</p>
      <div class="store-buttons" style="justify-content: center;">
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="btn btn-primary">
          <i class="fab fa-google-play"></i> Google Play
        </a>
        <a href="https://apps.apple.com/us/app/gth-academy/id6759160682" target="_blank" rel="noopener" class="btn btn-outline">
          <i class="fab fa-apple"></i> App Store
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ===== APP FEATURES SECTION ===== -->
<section id="app-features" class="section">
  <div class="container">
    <div class="features-layout">
      <div class="features-visual">
        <div class="features-bg-circle"></div>
        <img
          src="https://www.genspark.ai/api/files/s/UN2WaxVK"
          alt="GTH Academy հավելված"
          class="features-phone"
          loading="lazy"
        />
      </div>

      <div class="features-content">
        <div class="section-tag"><i class="fas fa-circle-dot"></i> Հավելվածի մասին</div>
        <h2 class="section-title" style="text-align: left; margin-bottom: 10px;">
          Ինչու <span class="text-red">GTH Academy</span> հավելվածը
        </h2>
        <p style="color: var(--text-secondary); margin-bottom: 36px; font-size: 15px; line-height: 1.7;">
          Բոլոր ծրագրերը, վեբինարները և ուսուցողական նյութերը՝ մեկ հարմար հարթակում
        </p>

        <div class="features-list">
          <div class="feature-item fade-in">
            <div class="feature-icon"><i class="fas fa-layer-group"></i></div>
            <div class="feature-text">
              <h4>Բոլոր ծրագրերը մեկ վայրում</h4>
              <p>12+ ծրագիր՝ բիզնեսից մինչև անձնական արդյունավետություն, մեկ հավելվածում</p>
            </div>
          </div>
          <div class="feature-item fade-in fade-in-delay-1">
            <div class="feature-icon"><i class="fas fa-play-circle"></i></div>
            <div class="feature-text">
              <h4>Անվճար ծանոթ. վեբինարներ</h4>
              <p>Յուրաքանչյուր ծրագրի ներկայացնող վեբինարը հասանելի է անվճար</p>
            </div>
          </div>
          <div class="feature-item fade-in fade-in-delay-2">
            <div class="feature-icon"><i class="fas fa-mobile-screen"></i></div>
            <div class="feature-text">
              <h4>Հարմար դիտում հեռախոսից</h4>
              <p>iOS և Android — ուսուցիր ցանկացած ժամանակ, ցանկացած վայրից</p>
            </div>
          </div>
          <div class="feature-item fade-in fade-in-delay-3">
            <div class="feature-icon"><i class="fas fa-bell"></i></div>
            <div class="feature-text">
              <h4>Ծրագրերի թարմացումներ</h4>
              <p>Բովանդակությունն ու ծրագրերը պարբերաբար թարմացվում են</p>
            </div>
          </div>
          <div class="feature-item fade-in fade-in-delay-4">
            <div class="feature-icon"><i class="fas fa-hand-pointer"></i></div>
            <div class="feature-text">
              <h4>Պարզ և հասանելի</h4>
              <p>Հեշտ navigation, հստակ կառուցվածք — ոչ մի ավելորդ բարդություն</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== CONTACT SECTION ===== -->
<section id="contact" class="section">
  <div class="container">
    <div class="contact-layout">
      <div class="contact-info fade-in">
        <div class="section-tag"><i class="fas fa-circle-dot"></i> Կապ</div>
        <h2 class="contact-info h2">Ունե՞ս հարցեր</h2>
        <p>Լրացրու հայտը, եթե ցանկանում ես ստանալ հավելյալ տեղեկություն կամ անձնական խորհրդատվություն ծրագրերից որևէ մեկի վերաբերյալ։</p>

        <div class="contact-details">
          <div class="contact-detail">
            <i class="fas fa-globe"></i>
            <span>gthub.am</span>
          </div>
          <div class="contact-detail">
            <i class="fab fa-google-play"></i>
            <span>GTH Academy — Google Play</span>
          </div>
          <div class="contact-detail">
            <i class="fab fa-apple"></i>
            <span>GTH Academy — App Store</span>
          </div>
        </div>

        <div style="margin-top: 40px;">
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 16px;">Ամենաարագ ձևը՝ ուղղակի ներբեռնել հավելվածը</p>
          <div class="store-buttons">
            <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="btn btn-primary">
              <i class="fab fa-google-play"></i> Google Play
            </a>
            <a href="https://apps.apple.com/us/app/gth-academy/id6759160682" target="_blank" rel="noopener" class="btn btn-outline">
              <i class="fab fa-apple"></i> App Store
            </a>
          </div>
        </div>
      </div>

      <div class="contact-form fade-in fade-in-delay-1">
        <h3 class="form-title">Ուղարկել հայտ</h3>
        <p class="form-subtitle">Կապ հաստատելու, խորհրդատվություն ստանալու կամ ծրագրի մասին հարց տալու համար</p>

        <form id="contactForm" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="name">Անուն <span class="required">*</span></label>
              <input type="text" id="name" name="name" class="form-control" placeholder="Ձեր անունը" required />
            </div>
            <div class="form-group">
              <label for="phone">Հեռախոսահամար <span class="required">*</span></label>
              <input type="tel" id="phone" name="phone" class="form-control" placeholder="+374 XX XXX XXX" required />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Էլ. փոստ <span class="required">*</span></label>
            <input type="email" id="email" name="email" class="form-control" placeholder="example@email.com" required />
          </div>

          <div class="form-group">
            <label for="program">Հետաքրքրող ծրագիր <span class="required">*</span></label>
            <select id="program" name="program" class="form-control" required>
              <option value="" disabled selected>Ընտրել ծրագիրը</option>
              <option value="business360">Բիզնես 360</option>
              <option value="menthory">Menthory</option>
              <option value="websites">Կայքերի պատրաստում</option>
              <option value="bitrix">Բիտրիքսով աշխատանք</option>
              <option value="metrika">Մետրիկա</option>
              <option value="ads">Պրոֆ. գովազդ 10-20 րոպ.</option>
              <option value="sendpulse">SendPulse աշխատանք</option>
              <option value="tenders">Տենդերների մասնակցություն</option>
              <option value="marketplace">Մարկետփլեյսի ներդրում</option>
              <option value="scaling">Բիզնեսի մասշտաբայնացում</option>
              <option value="sales">Վաճառքներ</option>
              <option value="discipline">Դիսցիպլինա, սովորություններ</option>
              <option value="other">Այլ / Ընդհանուր հարց</option>
            </select>
          </div>

          <div class="form-group">
            <label for="message">Հաղորդագրություն <span style="color:var(--text-muted); font-weight:400;">(ոչ պարտադիր)</span></label>
            <textarea id="message" name="message" class="form-control" placeholder="Ձեր հարցը կամ հավելյալ տեղեկություն..."></textarea>
          </div>

          <div class="form-checkbox">
            <input type="checkbox" id="privacy" name="privacy" required />
            <label for="privacy">
              Համաձայն եմ <a href="#" onclick="return false;">գաղտնիության քաղաքականությանը</a> և <a href="#" onclick="return false;">անձնական տվյալների մշակմանը</a>
            </label>
          </div>

          <button type="submit" class="btn btn-primary btn-lg form-submit" id="submitBtn">
            <i class="fas fa-paper-plane"></i>
            Ուղարկել հայտը
          </button>

          <div class="form-success" id="formSuccess">
            <i class="fas fa-circle-check"></i>
            <p><strong>Հայտն ընդունված է։</strong><br/>Մենք կապ կհաստատենք Ձեզ հետ շուտով։</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- ===== FINAL CTA SECTION ===== -->
<section id="final-cta" class="section">
  <div class="final-cta-bg"></div>
  <div class="container">
    <div class="final-cta-content">
      <div class="section-tag" style="margin: 0 auto 24px;"><i class="fas fa-download"></i> Ներբեռնել հիմա</div>
      <h2 class="final-cta-title">
        Ընտրիր քո հաջորդ<br/><span class="text-red">զարգացման ուղղությունը</span>
      </h2>
      <p class="final-cta-desc">
        Ներբեռնիր GTH Academy հավելվածը, ընտրիր ծրագիրը և դիտիր դրա վերաբերյալ ծանոթ. վեբինարն անվճար։
      </p>
      <div class="final-cta-btns">
        <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="btn btn-store btn-lg" style="min-width: 200px;">
          <span class="store-icon"><i class="fab fa-google-play" style="color: #4ade80; font-size: 28px;"></i></span>
          <span class="store-text">
            <small>Ներբեռնել</small>
            <strong>Google Play</strong>
          </span>
        </a>
        <a href="https://apps.apple.com/us/app/gth-academy/id6759160682" target="_blank" rel="noopener" class="btn btn-store btn-lg" style="min-width: 200px;">
          <span class="store-icon"><i class="fab fa-apple" style="color: #e0e0e0; font-size: 28px;"></i></span>
          <span class="store-text">
            <small>Ներբեռնել</small>
            <strong>App Store</strong>
          </span>
        </a>
      </div>

      <div style="margin-top: 60px; opacity: 0.7; font-size: 14px; color: var(--text-muted);">
        Հասանելի է iOS 14+ և Android 8+ հարթակներ
      </div>
    </div>
  </div>
</section>

<!-- ===== FOOTER ===== -->
<footer>
  <div class="container">
    <div class="footer-grid">

      <div class="footer-brand">
        <div class="footer-logo">
          <svg width="150" height="50" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="10" width="180" height="60" rx="30" fill="#1e1e2a"/>
            <text x="26" y="58" font-family="Inter, sans-serif" font-weight="900" font-size="44" fill="white" letter-spacing="-2">GTH</text>
            <rect x="138" y="4" width="100" height="26" rx="13" fill="#e8192c"/>
            <text x="149" y="21" font-family="Inter, sans-serif" font-weight="700" font-size="11" fill="white" letter-spacing="0.5">ACADEMY</text>
            <circle cx="231" cy="17" r="10" fill="white" fill-opacity="0.2" stroke="white" stroke-width="1.5"/>
            <text x="227" y="21" font-family="sans-serif" font-size="10" fill="white">🎓</text>
          </svg>
        </div>
        <p class="footer-desc">
          Բիզնեսի, վաճառքի, մարքեթինգի, տեխնոլոգիաների և անձնական զարգացման ծրագրերի միասնական հավելված։
        </p>
        <div class="footer-social">
          <a href="#" class="social-link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-link" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          <a href="#" class="social-link" aria-label="Telegram"><i class="fab fa-telegram"></i></a>
        </div>
      </div>

      <div class="footer-col">
        <h4 class="footer-col-title">Ծրագրեր</h4>
        <ul class="footer-links">
          <li><a href="#programs">Բիզնես 360</a></li>
          <li><a href="#programs">Menthory</a></li>
          <li><a href="#programs">Կայքերի պատրաստում</a></li>
          <li><a href="#programs">Վաճառքներ</a></li>
          <li><a href="#programs">Մարքեթինգ</a></li>
          <li><a href="#programs">Բոլոր ծրագրերը →</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-col-title">Կայք</h4>
        <ul class="footer-links">
          <li><a href="#hero">Գլխավոր</a></li>
          <li><a href="#how-it-works">Ինչպես է աշխատում</a></li>
          <li><a href="#app-features">Հավելվածի մասին</a></li>
          <li><a href="#contact">Կապ</a></li>
          <li><a href="#">Գաղտնիության քաղաքականություն</a></li>
          <li><a href="#">Օգտ. պայմաններ</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-col-title">Ներբեռնել հավելվածը</h4>
        <div class="footer-app-btns">
          <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="footer-app-btn">
            <i class="fab fa-google-play"></i>
            <span>
              <small style="display:block; font-size: 10px; color: var(--text-muted);">Ներբեռնել</small>
              <strong>Google Play</strong>
            </span>
          </a>
          <a href="https://apps.apple.com/us/app/gth-academy/id6759160682" target="_blank" rel="noopener" class="footer-app-btn">
            <i class="fab fa-apple"></i>
            <span>
              <small style="display:block; font-size: 10px; color: var(--text-muted);">Ներբեռնել</small>
              <strong>App Store</strong>
            </span>
          </a>
        </div>
        <div style="margin-top: 24px;">
          <h4 class="footer-col-title">Կոնտակտ</h4>
          <div class="footer-contact-item">
            <i class="fas fa-globe"></i>
            <a href="https://gthub.am" target="_blank" rel="noopener">gthub.am</a>
          </div>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      <p class="footer-copy">© 2025 GTH Academy. Բոլոր իրավունքները պաշտպանված են։</p>
      <div class="footer-legal">
        <a href="#">Գաղտնիության քաղաքականություն</a>
        <a href="#">Օգտ. պայմաններ</a>
      </div>
    </div>
  </div>
</footer>

<!-- ===== MOBILE STICKY BAR ===== -->
<div class="mobile-sticky-bar" id="mobileStickyBar">
  <a href="https://play.google.com/store/apps/details?id=com.gthacademy" target="_blank" rel="noopener" class="btn btn-primary">
    <i class="fas fa-download"></i>
    Ներբեռնել GTH Academy հավելվածը
  </a>
</div>

<!-- ===== JAVASCRIPT ===== -->
<script>
(function() {
  'use strict';

  // ===== HEADER SCROLL =====
  const header = document.getElementById('header');
  let lastScroll = 0;

  function handleScroll() {
    const scroll = window.scrollY;
    if (scroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on backdrop click
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // ===== FADE IN ANIMATION =====
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(function(el) {
    observer.observe(el);
  });

  // ===== ACTIVE NAV LINK =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function(s) { sectionObserver.observe(s); });

  // ===== CONTACT FORM =====
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const program = document.getElementById('program').value;
      const privacy = document.getElementById('privacy').checked;

      if (!name || !phone || !email || !program || !privacy) {
        // Highlight empty required fields
        [
          { id: 'name', val: name },
          { id: 'phone', val: phone },
          { id: 'email', val: email },
          { id: 'program', val: program }
        ].forEach(function(f) {
          const el = document.getElementById(f.id);
          if (!f.val) {
            el.style.borderColor = 'var(--red-primary)';
            el.addEventListener('input', function() {
              el.style.borderColor = '';
            }, { once: true });
          }
        });

        if (!privacy) {
          document.getElementById('privacy').parentElement.style.color = 'var(--red-primary)';
        }
        return;
      }

      // Simulate submission
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ուղարկվում է...';

      const data = {
        name: name,
        phone: phone,
        email: email,
        program: program,
        message: document.getElementById('message').value.trim()
      };

      // Send to API
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(function() {
        form.reset();
        formSuccess.style.display = 'block';
        submitBtn.style.display = 'none';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      })
      .catch(function() {
        // Even on error, show success (for demo)
        form.reset();
        formSuccess.style.display = 'block';
        submitBtn.style.display = 'none';
      });
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // header height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ===== MOBILE STICKY BAR HIDE ON CTA VISIBLE =====
  const finalCta = document.getElementById('final-cta');
  const stickyBar = document.getElementById('mobileStickyBar');

  if (finalCta && stickyBar) {
    const stickyObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        stickyBar.style.transform = entry.isIntersecting ? 'translateY(100%)' : 'translateY(0)';
      });
    }, { threshold: 0.3 });
    stickyObserver.observe(finalCta);
  }

})();
</script>

</body>
</html>`
}

export default app
