const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const templatePath = path.join(root, 'systems', 'voice-agent.html');
const academyHref = '../academy/';
const calendlyHref = 'https://calendly.com/thefuturestudio-info/30min';
const whatsappHref = 'https://wa.me/50766753870?text=Hola%2C%20vi%20su%20sitio%20y%20me%20interesa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20IA%20para%20mi%20negocio.';

const template = fs.readFileSync(templatePath, 'utf8');

function writeFile(relativePath, html) {
  const fullPath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, html);
  console.log(`Wrote ${relativePath}`);
}

function dual(valueEn, valueEs = valueEn) {
  return { en: valueEn, es: valueEs };
}

function attrPair(content) {
  return `data-en="${escapeAttr(content.en)}" data-es="${escapeAttr(content.es)}"`;
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceSection(html, marker, replacement) {
  const start = html.indexOf(marker);
  if (start === -1) {
    throw new Error(`Marker not found: ${marker}`);
  }
  const end = html.indexOf('</section>', start);
  if (end === -1) {
    throw new Error(`Section end not found for marker: ${marker}`);
  }
  return html.slice(0, start) + replacement + html.slice(end + '</section>'.length);
}

function replaceDiv(html, marker, replacement) {
  const start = html.indexOf(marker);
  if (start === -1) {
    throw new Error(`Div marker not found: ${marker}`);
  }
  const end = html.indexOf('</div>', start);
  if (end === -1) {
    throw new Error(`Div end not found for marker: ${marker}`);
  }
  return html.slice(0, start) + replacement + html.slice(end + '</div>'.length);
}

function processHtmlText(value) {
  return String(value).replace(/\n/g, '<br>');
}

function heroTitleHtml(title) {
  return title
    .split('\n')
    .map((line) => `<div class="line"><span>${line}</span></div>`)
    .join('');
}

function demoMessages(items) {
  return items.map((item) => `
          <div class="voice-message ${item.role}">
            <div class="voice-avatar">${item.role === 'assistant' ? 'AI' : 'YOU'}</div>
            <div class="voice-bubble" ${attrPair(dual(item.text))}>${item.text}</div>
          </div>`).join('');
}

function heroStats(items) {
  return `
      <div class="hero-full-strip">
        <div class="hero-stats">
          ${items.map((item) => `
          <div class="stat-cell">
            <div class="stat-num ${item.className}">${item.value}</div>
            <div class="stat-label">${item.label}</div>
          </div>`).join('')}
        </div>
        <div class="hero-benefits">
          ${items.map((item) => `
          <div class="hero-benefit">
            <span class="hero-benefit-dot" aria-hidden="true"></span>
            <span>${item.benefit}</span>
          </div>`).join('')}
        </div>
      </div>`;
}

function renderFeatureCards(cards) {
  return cards.map((card, index) => `
        <article class="feature-card">
          <div class="feature-num">${String(index + 1).padStart(2, '0')}</div>
          <h3 class="feature-title" ${attrPair(dual(card.title))}>${card.title}</h3>
          <p class="body-md" ${attrPair(dual(card.body))}>${card.body}</p>
        </article>`).join('');
}

function removeSectionById(html, id) {
  const marker = `<section class="section" id="${id}">`;
  let start = html.indexOf(marker);
  while (start !== -1) {
    const end = html.indexOf('</section>', start);
    if (end === -1) break;
    html = html.slice(0, start) + html.slice(end + '</section>'.length);
    start = html.indexOf(marker);
  }
  return html;
}

function injectFlowCleanupCss(html) {
  if (html.includes('tfs-flow-cleanup')) return html;

  const css = `
/* tfs-flow-cleanup: five-step flow cards without empty grid tiles */
#call-flow .feature-grid {
  display: grid !important;
  grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  gap: 20px !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  align-items: stretch !important;
}
#call-flow .feature-card {
  min-height: 250px !important;
  position: relative !important;
  border: 2px solid var(--cyan) !important;
  box-shadow: 8px 8px 0 rgba(0, 209, 199, .85) !important;
}
#call-flow .feature-card:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -21px;
  width: 20px;
  height: 2px;
  background: linear-gradient(90deg, var(--cyan), var(--blue), var(--violet));
  transform: translateY(-50%);
  z-index: 2;
}
#call-flow .feature-card:not(:last-child)::before {
  content: "";
  position: absolute;
  top: 50%;
  right: -27px;
  width: 0;
  height: 0;
  border-left: 8px solid var(--violet);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  transform: translateY(-50%);
  z-index: 3;
}
#call-flow .feature-card:hover {
  box-shadow: 10px 10px 0 rgba(0, 209, 199, .95), 0 0 28px rgba(0, 209, 199, .34) !important;
}
@media (max-width: 1320px) {
  #call-flow .feature-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  #call-flow .feature-card::before,
  #call-flow .feature-card::after { display: none !important; }
}
@media (max-width: 760px) {
  #call-flow .feature-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
  #call-flow .feature-card { min-height: auto !important; }
}
`;

  const styleClose = html.lastIndexOf('</style>');
  if (styleClose !== -1) {
    return html.slice(0, styleClose) + css + '\n' + html.slice(styleClose);
  }

  return html.replace('</head>', `<style>${css}</style>\n</head>`);
}

function renderProcessRows(rows) {
  return rows.map((row, index) => `
        <div class="process-row">
          <div class="process-num">${String(index + 1).padStart(2, '0')}</div>
          <div>
            <h3 class="process-title" ${attrPair(dual(row.title))}>${row.title}</h3>
            <div class="process-time"><span class="grad">${row.stage}</span></div>
          </div>
          <p class="body-md" ${attrPair(dual(row.body))}>${row.body}</p>
          <div class="process-arrow"><span class="grad">/</span></div>
        </div>`).join('');
}

function renderPricingCards(cards) {
  return cards.map((card) => `
        <article class="pricing-card${card.featured ? ' featured' : ''}">
          <span class="badge" ${attrPair(dual(card.badge))}>${card.badge}</span>
          <h3 ${attrPair(dual(card.title))}>${card.title}</h3>
          <div class="from" ${attrPair(dual(card.price))}>${card.price}</div>
          <ul>
            ${card.bullets.map((bullet) => `<li ${attrPair(dual(bullet))}>${bullet}</li>`).join('')}
          </ul>
          <a href="${card.href || calendlyHref}" target="_blank" rel="noopener" class="btn btn-grad" ${attrPair(dual(card.cta))}>${card.cta}</a>
        </article>`).join('');
}

function renderFaqs(faqs) {
  return faqs.map((faq) => `
        <details class="faq-item">
          <summary><span ${attrPair(dual(faq.q))}>${faq.q}</span><span class="faq-plus">+</span></summary>
          <p ${attrPair(dual(faq.a))}>${faq.a}</p>
        </details>`).join('');
}

function buildSystemSections(config) {
  const hero = `<section class="hero" id="hero">
    <div class="hero-body">
      <div class="orb hero-orb-1"></div>
      <div class="orb hero-orb-2"></div>
      <div class="orb hero-orb-3"></div>
      <div class="wrap hero-content">
        <div class="hero-eyebrow">
          <div class="hero-eyebrow-line"></div>
          <p class="eyebrow" ${attrPair(dual(config.heroEyebrow))}>${config.heroEyebrow}</p>
        </div>
        <h1 class="headline-xl hero-h1">${heroTitleHtml(config.heroTitle)}</h1>
        <div class="hero-bottom">
          <div class="hero-desc">
            <p ${attrPair(dual(config.heroBody))}>${config.heroBody}</p>
          </div>
          <div class="hero-actions">
            <a href="${config.primaryHref || calendlyHref}" target="_blank" rel="noopener" class="btn btn-grad" ${attrPair(dual(config.primaryCta))}>${config.primaryCta}</a>
            <a href="${config.secondaryHref || whatsappHref}" target="_blank" rel="noopener" class="btn btn-outline btn-whatsapp" ${attrPair(dual(config.secondaryCta))}>${config.secondaryCta}</a>
          </div>
        </div>
      </div>
    </div>
    ${heroStats(config.stats)}
  </section>`;

  const liveDemo = `<section class="live-demo-section" id="live-demo">
    <div class="wrap live-demo-grid">
      <div class="live-demo-copy">
        <p class="eyebrow" ${attrPair(dual(config.demoEyebrow))}>${config.demoEyebrow}</p>
        <h2 class="headline-lg" ${attrPair(dual(config.demoTitle))}>${processHtmlText(config.demoTitle)}</h2>
        <p class="body-lg" ${attrPair(dual(config.demoBody))}>${config.demoBody}</p>
        <div class="live-demo-note">
          ${config.demoNotes.map((note) => `<span ${attrPair(dual(note))}>${note}</span>`).join('')}
        </div>
      </div>
      <div class="voice-demo-shell" aria-label="${escapeAttr(config.demoShellLabel)}">
        <div class="voice-demo-topbar">
          <div class="voice-live-meta">
            <span class="voice-live-dot" aria-hidden="true"></span>
            <div class="voice-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
            <span class="voice-live-title" ${attrPair(dual(config.demoTopTitle))}>${config.demoTopTitle}</span>
          </div>
          <span class="voice-timer-pill">${config.demoTopPill}</span>
        </div>
        <div class="voice-transcript" aria-live="polite">
          ${demoMessages(config.demoMessages)}
        </div>
        <div class="voice-demo-footer">
          <div class="voice-demo-status">
            <span ${attrPair(dual(config.demoFooterTitle))}>${config.demoFooterTitle}</span>
            <div class="voice-progress" aria-hidden="true"><div></div></div>
          </div>
          <a href="${config.primaryHref || calendlyHref}" target="_blank" rel="noopener" class="btn btn-grad voice-call-btn" ${attrPair(dual(config.demoFooterCta))}>${config.demoFooterCta}</a>
        </div>
      </div>
    </div>
  </section>`;

  const video = '';

  const marquee = `<div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      ${[...config.marquee, ...config.marquee].map((item) => `<span class="${item.accent ? 'accent' : ''}">${item.text}</span>`).join('')}
    </div>
  </div>`;

  const featureIsUseCaseSection = /use cases/i.test(config.featureEyebrow || '') || /where this/i.test(config.featureTitle || '');
  const features = featureIsUseCaseSection ? '' : `<section class="section" id="features">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow" ${attrPair(dual(config.featureEyebrow))}>${config.featureEyebrow}</p>
          <h2 class="headline-lg" ${attrPair(dual(config.featureTitle))}>${processHtmlText(config.featureTitle)}</h2>
        </div>
      </div>
      <div class="feature-grid">
        ${renderFeatureCards((config.featureCards || []).slice(0, 5))}
      </div>
      <div class="image-row">
        <div class="image-frame">
          <img src="${config.trustImage}" alt="${escapeAttr(config.trustImageAlt)}">
        </div>
        <div class="black-box">
          <p class="eyebrow" ${attrPair(dual(config.trustEyebrow))}>${config.trustEyebrow}</p>
          <h2 class="headline-md" style="margin-top:18px" ${attrPair(dual(config.trustTitle))}>${processHtmlText(config.trustTitle)}</h2>
          <p class="body-md" style="margin-top:22px" ${attrPair(dual(config.trustBody))}>${config.trustBody}</p>
        </div>
      </div>
    </div>
  </section>`;

  const process = `<section class="section process-section" id="process">
    <div class="wrap">
      <div class="process-head">
        <div>
          <p class="eyebrow" ${attrPair(dual(config.processEyebrow))}>${config.processEyebrow}</p>
          <h2 class="headline-lg" ${attrPair(dual(config.processTitle))}>${processHtmlText(config.processTitle)}</h2>
        </div>
      </div>
      <div class="process-list">
        ${renderProcessRows(config.processRows)}
      </div>
    </div>
  </section>`;

  const pricing = `<section class="pricing-dark" id="buy">
    <div class="wrap">
      <div class="price-intro">
        <p class="eyebrow" ${attrPair(dual(config.pricingEyebrow))}>${config.pricingEyebrow}</p>
        <h2 class="headline-lg" ${attrPair(dual(config.pricingTitle))}>${processHtmlText(config.pricingTitle)}</h2>
        <p class="body-lg" style="margin:24px auto 0" ${attrPair(dual(config.pricingBody))}>${config.pricingBody}</p>
      </div>
      <div class="pricing-grid">
        ${renderPricingCards(config.pricingCards)}
      </div>
    </div>
  </section>`;

  const bonus = `<section class="section" id="bonus">
    <div class="wrap">
      <div class="bonus-strip">
        <div>
          <p class="eyebrow" data-en="${escapeAttr(config.bonusEyebrow)}" data-es="${escapeAttr(config.bonusEyebrow)}" style="-webkit-text-fill-color:var(--black);color:var(--black)">${config.bonusEyebrow}</p>
          <h2 class="headline-md" ${attrPair(dual(config.bonusTitle))}>${processHtmlText(config.bonusTitle)}</h2>
        </div>
        <div>
          <p class="body-md" ${attrPair(dual(config.bonusBody))}>${config.bonusBody}</p>
          <div class="cta-row-inline" style="justify-content:flex-start;margin-top:24px">
            <a href="${config.bonusHref || calendlyHref}" target="_blank" rel="noopener" class="btn btn-dark" ${attrPair(dual(config.bonusCta))}>${config.bonusCta}</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  const faq = `<section class="faq-section" id="faq">
    <div class="wrap">
      <div class="faq-head">
        <p class="eyebrow" ${attrPair(dual(config.faqEyebrow))}>${config.faqEyebrow}</p>
        <h2 class="headline-lg" ${attrPair(dual(config.faqTitle))}>${processHtmlText(config.faqTitle)}</h2>
      </div>
      <div class="faq-list">
        ${renderFaqs(config.faqs)}
      </div>
    </div>
  </section>`;

  const cta = `<section class="final-cta">
    <div class="wrap-narrow">
      <p class="eyebrow" style="-webkit-text-fill-color:var(--black);color:var(--black)" ${attrPair(dual(config.finalEyebrow))}>${config.finalEyebrow}</p>
      <h2 class="headline-lg" ${attrPair(dual(config.finalTitle))}>${processHtmlText(config.finalTitle)}</h2>
      <p class="body-lg" ${attrPair(dual(config.finalBody))}>${config.finalBody}</p>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
        <a href="${config.primaryHref || calendlyHref}" target="_blank" rel="noopener" class="btn btn-dark" ${attrPair(dual(config.finalPrimaryCta))}>${config.finalPrimaryCta}</a>
        <a href="${config.secondaryHref || whatsappHref}" target="_blank" rel="noopener" class="btn btn-outline btn-whatsapp" ${attrPair(dual(config.finalSecondaryCta))}>${config.finalSecondaryCta}</a>
      </div>
      <p class="body-sm" style="margin-top:22px;color:#0b3a38" data-en="Or email info@thefuturestudio.online" data-es="Or email info@thefuturestudio.online">Or email info@thefuturestudio.online</p>
    </div>
  </section>`;

  return { hero, liveDemo, video, marquee, features, process, pricing, bonus, faq, cta };
}

function applyPageConfig(baseHtml, config) {
  let html = baseHtml;

  const sections = buildSystemSections(config);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${config.pageTitle}</title>`);
  html = html.replace(/<meta name="description" content="[\s\S]*?">/, `<meta name="description" content="${escapeAttr(config.metaDescription)}">`);
  html = html.replace(/<meta property="og:title" content="[\s\S]*?">/g, '');
  html = html.replace(/<meta property="og:description" content="[\s\S]*?">/g, '');
  html = html.replace(/<meta name="twitter:title" content="[\s\S]*?">/g, '');
  html = html.replace(/<meta name="twitter:description" content="[\s\S]*?">/g, '');

  html = html.replace(/>\s*Courses\s*</g, '>Academy<');
  html = html.replace(/data-en="Courses"/g, 'data-en="Academy"');
  html = html.replace(/data-es="Cursos"/g, 'data-es="Academia"');
  html = html.replace(/data-en="AI Courses"/g, 'data-en="Academy"');
  html = html.replace(/data-es="Cursos IA"/g, 'data-es="Academia"');
  html = html.replace(/\.\.\/#courses-section/g, academyHref);

  html = replaceSection(html, '<section class="hero" id="hero">', sections.hero);
  html = replaceSection(html, '<section class="live-demo-section" id="live-demo">', sections.liveDemo);
  html = replaceSection(html, '<section class="video-section" id="walkthrough">', sections.video);
  html = replaceDiv(html, '<div class="marquee" aria-hidden="true">', sections.marquee);
  html = replaceSection(html, '<section class="section" id="features">', sections.features);
  html = replaceSection(html, '<section class="section process-section" id="process">', sections.process);
  html = replaceSection(html, '<section class="pricing-dark" id="buy">', sections.pricing);
  html = replaceSection(html, '<section class="section" id="bonus">', sections.bonus);
  html = replaceSection(html, '<section class="faq-section" id="faq">', sections.faq);
  html = replaceSection(html, '<section class="final-cta">', sections.cta);
  html = removeSectionById(html, 'fit');
  html = injectFlowCleanupCss(html);

  return html;
}

const sharedFaqs = {
  system: [
    { q: 'How tailored is the system to our business?', a: 'Each build starts by mapping your real offer, bottlenecks, handoff logic, and team workflow. The page shows a product category, but the installed system is shaped around how your business actually sells, books, or follows up.' },
    { q: 'Can this connect to tools we already use?', a: 'Usually yes. We prefer working with the tools already inside your business where possible, then only adding new layers when they solve a clear problem.' },
    { q: 'Is this bilingual?', a: 'Yes. We can shape the system in English, Spanish, or a bilingual handoff flow depending on your audience and team.' },
    { q: 'How long does the first version usually take?', a: 'Most first versions are scoped, built, and launched in roughly 7-21 days once the workflow, assets, and integrations are confirmed.' },
    { q: 'Will we own what gets built?', a: 'Yes. The Future Studio builds practical systems that your business can run, refine, and expand rather than trapping you inside a black-box setup.' },
    { q: 'What happens after launch?', a: 'We review performance, refine weak points, and can continue with optimisation, reporting, or the next layer once the first version is live.' },
    { q: 'Can we start small first?', a: 'Yes. Most clients start with the smallest version that solves the clearest bottleneck, then expand once the first layer proves itself.' },
  ],
  package: [
    { q: 'Who is each package best for?', a: 'Starter is for businesses that need a strong first digital front door. Growth is for businesses that need a fuller website and assistant layer. Premium is for businesses ready for a more complete AI front office.' },
    { q: 'Can we upgrade later?', a: 'Yes. These package pages are designed to show a clear starting point, not force you into the biggest build immediately.' },
    { q: 'Do packages include strategy?', a: 'Yes. Every package starts with discovery so the pages, assistant flows, and system structure fit the business instead of acting like a generic template.' },
    { q: 'What if we already have part of this?', a: 'That is fine. We can review what you already use, keep the parts that are strong, and only build the missing layers.' },
    { q: 'How long does launch take?', a: 'Most package builds begin with a 7-21 day first phase, then expand depending on content, integrations, and the scope selected.' },
    { q: 'Will this be bilingual?', a: 'It can be. The Future Studio supports English, Spanish, or bilingual structures depending on the market you serve.' },
    { q: 'What happens after the first launch?', a: 'After launch, we can optimise, add new flows, improve reporting, and move into the next build layer only when it makes sense.' },
  ],
  academy: [
    { q: 'Is the Academy for beginners or advanced teams?', a: 'Both. The Academy is designed so founders, operators, creatives, and teams can enter at the right level and keep building practical AI skills from there.' },
    { q: 'Do I need technical experience?', a: 'No. The Academy is designed around real-world application, not coding-first complexity.' },
    { q: 'Are sessions live or self-paced?', a: 'The Academy page presents live formats first: single workshop, studio pass, and full studio program. Recordings and materials depend on the chosen format.' },
    { q: 'Can I join in English or Spanish?', a: 'Yes. The Academy is structured for EN, ES, and bilingual delivery where needed.' },
    { q: 'Will I leave with practical assets?', a: 'Yes. The goal is not abstract inspiration. It is practical workflows, templates, examples, and next steps you can apply immediately.' },
    { q: 'Can a company book team training?', a: 'Yes. Teams can use the Academy as a learning layer for internal capability building before or alongside implementation work.' },
    { q: 'Which format should I choose first?', a: 'Single Workshop is best for focused questions. Studio Pass fits people who want repeated guided sessions. Full Studio Program is best for deeper transformation.' },
  ],
};

const systemPages = [
  {
    output: 'systems/website-ai-assistant/index.html',
    pageTitle: 'Website + AI Assistant | The Future Studio',
    metaDescription: 'A conversion-focused website paired with an AI assistant that answers questions, captures leads, and moves visitors into the next step.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'WEBSITE +\nAI ASSISTANT',
    heroBody: 'A strong front door for businesses that need a clear website, better enquiry handling, and an assistant that keeps people moving instead of dropping off.',
    primaryCta: 'Watch the Website Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      { value: '24/7', label: 'site guidance', benefit: 'Always-on visitor answers', className: 'count-cyan' },
      { value: 'EN/ES', label: 'assistant flow', benefit: 'Bilingual by design', className: 'count-violet' },
      { value: '7-21', label: 'launch window', benefit: 'Live in weeks', className: 'count-dark' },
      { value: 'SEO', label: 'search layer', benefit: 'Built for visibility', className: 'count-cyan' },
      { value: 'YOURS', label: 'owned asset', benefit: 'No lock-in website base', className: 'count-violet' },
    ],
    demoEyebrow: 'Product snapshot',
    demoTitle: 'SEE THE\nWEBSITE +\nASSISTANT\nFLOW',
    demoBody: 'This page type is built for businesses that need a clearer digital first impression and a faster way to answer common questions before a human steps in.',
    demoNotes: ['Conversion-focused structure', 'Assistant-trained FAQs', 'Lead capture + WhatsApp handoff'],
    demoShellLabel: 'Website and AI assistant system snapshot',
    demoTopTitle: 'Website + assistant stack',
    demoTopPill: 'LIVE READY',
    demoMessages: [
      { role: 'assistant', text: 'Homepage, services, FAQs, lead capture, and next-step logic are mapped together so the website sells while the assistant supports.' },
      { role: 'user', text: 'Use this as the first build if your website looks fine on the surface but still leaves people confused or unqualified.' },
    ],
    demoFooterTitle: 'Best when trust and clarity are the first bottleneck',
    demoFooterCta: 'Book a Free Demo',
    videoEyebrow: 'Website walkthrough',
    videoTitle: 'WATCH THE\nSYSTEM STORY',
    videoBody: 'See how a stronger homepage, clearer service structure, and an enquiry assistant can work together before you move into more advanced automation.',
    videoImage: '../assets/funnel-images/digital-product-dashboard-mockup-wide.png',
    videoAlt: 'Website and AI assistant system preview across laptop and mobile devices.',
    videoKicker: 'System overview',
    videoHeading: 'Website + AI Assistant',
    marquee: [
      { text: 'Clearer first impression', accent: true },
      { text: 'Answers before drop-off', accent: false },
      { text: 'Faster lead capture', accent: true },
      { text: 'SEO-ready structure', accent: false },
      { text: 'Built for service businesses', accent: true },
    ],
    featureEyebrow: 'Use cases',
    featureTitle: 'WHERE THIS\nSYSTEM FITS',
    featureCards: [
      { title: 'Clinics', body: 'Give new patients a clearer understanding of services, timing, location, and next steps before they call.' },
      { title: 'Consultants', body: 'Answer fit questions, explain offers more clearly, and qualify discovery calls before the calendar fills.' },
      { title: 'Education', body: 'Guide families or students toward the right program, workshop, or intake flow without losing trust.' },
      { title: 'Real estate', body: 'Support property enquiries, capture context faster, and hand leads into the right callback path.' },
      { title: 'Beauty brands', body: 'Clarify services, pricing expectations, and booking steps so fewer enquiries stall at the first question.' },
      { title: 'Professional firms', body: 'Turn a static website into a more useful front door that explains, qualifies, and routes.' },
    ],
    trustImage: '../assets/funnel-images/team-client-automation-strategy-wide.png',
    trustImageAlt: 'Business team reviewing website and assistant planning on laptop and phone.',
    trustEyebrow: 'Why it matters',
    trustTitle: 'YOUR WEBSITE\nSHOULD HANDLE\nMORE OF THE FIRST ASK',
    trustBody: 'Many service businesses do not need more traffic first. They need a front door that explains the offer, handles the first layer of questions, and gives people a confident next step.',
    processEyebrow: 'The process',
    processTitle: 'FROM WEBSITE\nCONFUSION TO\nCLEARER DEMAND',
    processRows: [
      { title: 'Offer map', stage: 'Discovery', body: 'We clarify what the business sells, what confuses visitors today, and what the assistant should answer first.' },
      { title: 'Page structure', stage: 'Design', body: 'We map the homepage, service pages, FAQs, and lead paths so the site works like a guided sales layer.' },
      { title: 'Assistant logic', stage: 'Implementation', body: 'We train the AI assistant on your offer, objections, and next-step logic so it supports real enquiries.' },
      { title: 'Handoff setup', stage: 'Quality control', body: 'We define where qualified questions go next: WhatsApp, email, calendar, form, or CRM.' },
      { title: 'Launch + refine', stage: 'Go live', body: 'Once live, we review behaviour, tighten weak answers, and improve what the site and assistant do together.' },
    ],
    pricingEyebrow: 'Build options',
    pricingTitle: 'CUSTOM WEB.\nGUIDED BY AI.',
    pricingBody: 'Start with the level that gives your business a stronger front door now, then expand once the website and assistant are already performing.',
    pricingCards: [
      { badge: 'Starter', title: 'One-Page Website + Assistant', price: 'from $1,500', bullets: ['One clear homepage', 'Core copy structure', 'Website AI assistant', 'Lead capture + WhatsApp handoff'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'Multi-Page Website + Assistant', price: 'from $2,500', bullets: ['Homepage + service pages', 'Clearer SEO structure', 'Expanded assistant knowledge', 'Stronger enquiry routing'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Web + Assistant + Visibility Layer', price: 'from $3,800', bullets: ['Multi-page build', 'Assistant + FAQs + handoffs', 'Search-ready architecture', 'Ongoing optimisation roadmap'], cta: 'Discuss Scope', href: calendlyHref },
    ],
    bonusEyebrow: 'Limited bonus',
    bonusTitle: 'FREE WEBSITE\nMESSAGE MAP\nTHIS WEEK',
    bonusBody: 'Book your demo this week and we will outline the homepage message path your business should use before we even discuss the full build.',
    bonusCta: 'Book the Free Demo',
    faqEyebrow: 'Common questions',
    faqTitle: 'QUESTIONS\nBEFORE YOU\nREBUILD',
    faqs: sharedFaqs.system,
    finalEyebrow: 'Ready to start?',
    finalTitle: "LET'S BUILD\nYOUR DIGITAL\nFRONT DOOR.",
    finalBody: 'Book a free demo and we will show you what the website and assistant should solve first.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'systems/whatsapp-automation-agent/index.html',
    pageTitle: 'WhatsApp Automation Agent | The Future Studio',
    metaDescription: 'A WhatsApp automation system for first response, qualification, follow-up, booking support, and cleaner lead handoff.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'WHATSAPP\nAUTOMATION\nAGENT',
    heroBody: 'Built for businesses that already receive enquiries in WhatsApp but need faster replies, stronger qualification, and a cleaner way to protect hot leads.',
    primaryCta: 'Watch the WhatsApp Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      { value: '24/7', label: 'message coverage', benefit: 'Instant first response', className: 'count-cyan' },
      { value: 'EN/ES', label: 'chat flow', benefit: 'Bilingual by design', className: 'count-violet' },
      { value: '7-21', label: 'launch window', benefit: 'Live in weeks', className: 'count-dark' },
      { value: 'CRM', label: 'handoff ready', benefit: 'Sales team notified', className: 'count-cyan' },
      { value: 'YOURS', label: 'owned logic', benefit: 'No lock-in flows', className: 'count-violet' },
    ],
    demoEyebrow: 'Product snapshot',
    demoTitle: 'SEE THE\nWHATSAPP\nFLOW LIVE',
    demoBody: 'Use this build when your enquiries already arrive through WhatsApp but the first response, qualification, or follow-up still depends too much on manual chasing.',
    demoNotes: ['Auto-replies with context', 'Qualification before human handoff', 'Follow-up flow built in'],
    demoShellLabel: 'WhatsApp automation system snapshot',
    demoTopTitle: 'WhatsApp automation stack',
    demoTopPill: 'ALWAYS ON',
    demoMessages: [
      { role: 'assistant', text: 'The agent greets the lead, asks what matters, sorts urgency, and keeps the conversation moving toward the right next step.' },
      { role: 'user', text: 'This is best for missed follow-up, after-hours messages, repetitive questions, and teams that need cleaner lead handling.' },
    ],
    demoFooterTitle: 'Best when message speed is the sales bottleneck',
    demoFooterCta: 'Book a Free Demo',
    videoEyebrow: 'WhatsApp walkthrough',
    videoTitle: 'WATCH THE\nFOLLOW-UP\nLOGIC',
    videoBody: 'See how the system handles first response, qualification, FAQ answers, and the handoff into booking, sales, or human follow-up.',
    videoImage: '../assets/funnel-images/team-whatsapp-automation-consulting-wide.png',
    videoAlt: 'Team reviewing WhatsApp automation and response flow on laptop and phone.',
    videoKicker: 'WhatsApp overview',
    videoHeading: 'WhatsApp Automation Agent',
    marquee: [
      { text: 'Reply faster', accent: true },
      { text: 'Qualify before handoff', accent: false },
      { text: 'Protect after-hours demand', accent: true },
      { text: 'Follow-up without chasing', accent: false },
      { text: 'Keep hot leads warm', accent: true },
    ],
    featureEyebrow: 'Use cases',
    featureTitle: 'WHERE THIS\nSYSTEM EARNS\nITS KEEP',
    featureCards: [
      { title: 'Clinics', body: 'Respond faster to patient enquiries, booking questions, and follow-up without stretching the front desk.' },
      { title: 'Beauty & wellness', body: 'Reduce reply delays, collect service intent earlier, and stop losing bookings between messages.' },
      { title: 'Real estate', body: 'Handle property questions quickly, capture lead context, and route serious buyers faster.' },
      { title: 'Consultants', body: 'Filter fit, answer common questions, and send discovery-ready leads into the right calendar flow.' },
      { title: 'Service teams', body: 'Keep after-hours demand warm and stop manual follow-up from becoming the main bottleneck.' },
      { title: 'Education', body: 'Give families or applicants an immediate response and route them cleanly into the next step.' },
    ],
    trustImage: '../assets/funnel-images/team-whatsapp-automation-consulting-wide.png',
    trustImageAlt: 'Business team reviewing WhatsApp automation and message-based lead handling.',
    trustEyebrow: 'Why it matters',
    trustTitle: 'THE FIRST\nMESSAGE\nSETS THE TONE',
    trustBody: 'A lot of demand is lost because the first message sits too long, gets answered inconsistently, or never turns into a clean next step. This system fixes that layer first.',
    processEyebrow: 'The process',
    processTitle: 'FROM INCOMING\nMESSAGE TO\nNEXT STEP',
    processRows: [
      { title: 'Message map', stage: 'Discovery', body: 'We map the most common inbound scenarios, business rules, and what should happen after each message type.' },
      { title: 'Reply logic', stage: 'Design', body: 'We design greetings, FAQ answers, qualification prompts, and handoff rules around your business tone.' },
      { title: 'Automation build', stage: 'Implementation', body: 'We connect the WhatsApp layer, route the right leads, and build the first follow-up logic.' },
      { title: 'Scenario testing', stage: 'Quality control', body: 'We test urgent enquiries, objections, bilingual flows, booking requests, and edge cases before launch.' },
      { title: 'Launch + optimise', stage: 'Go live', body: 'After launch, we review conversations, tighten weak replies, and improve what moves leads forward fastest.' },
    ],
    pricingEyebrow: 'Build options',
    pricingTitle: 'CUSTOM AI.\nBUILT FOR\nWHATSAPP.',
    pricingBody: 'Choose the level that fits your current enquiry volume now, then expand once the first WhatsApp layer is already converting better.',
    pricingCards: [
      { badge: 'Starter', title: 'WhatsApp First Response Flow', price: 'from $900', bullets: ['Greeting + FAQ layer', 'Basic qualification', 'Human handoff path', 'Bilingual option'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'WhatsApp + Follow-Up Agent', price: 'from $1,800', bullets: ['Qualification logic', 'Follow-up sequence', 'Booking or CRM handoff', 'Performance-ready structure'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'WhatsApp Sales + Support Flow', price: 'from $3,000', bullets: ['Multiple message scenarios', 'Advanced routing', 'Team notifications', 'Expansion-ready logic'], cta: 'Discuss Scope', href: calendlyHref },
    ],
    bonusEyebrow: 'Limited bonus',
    bonusTitle: 'FREE WHATSAPP\nRESPONSE AUDIT\nTHIS WEEK',
    bonusBody: 'Book your demo and we will review the first-response bottleneck inside your current WhatsApp flow before we scope the full build.',
    bonusCta: 'Book the Free Demo',
    faqEyebrow: 'Common questions',
    faqTitle: 'QUESTIONS\nBEFORE YOU\nAUTOMATE',
    faqs: sharedFaqs.system,
    finalEyebrow: 'Ready to start?',
    finalTitle: "LET'S BUILD\nYOUR WHATSAPP\nAGENT.",
    finalBody: 'Book a free demo and we will show you the first message flow your business should automate.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'systems/booking-agent/index.html',
    pageTitle: 'Booking Agent | The Future Studio',
    metaDescription: 'An AI booking agent for appointment businesses that need clearer scheduling, confirmation, rescheduling, and fewer missed opportunities.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'BOOKING\nAGENT',
    heroBody: 'For appointment-driven businesses that need booking logic, confirmations, reminders, and rescheduling to feel cleaner without adding more admin load.',
    primaryCta: 'Watch the Booking Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      { value: '24/7', label: 'booking coverage', benefit: 'Book outside office hours', className: 'count-cyan' },
      { value: 'LESS', label: 'admin load', benefit: 'Fewer manual back-and-forths', className: 'count-violet' },
      { value: '7-21', label: 'launch window', benefit: 'Live in weeks', className: 'count-dark' },
      { value: 'SYNC', label: 'calendar handoff', benefit: 'Cleaner scheduling flow', className: 'count-cyan' },
      { value: 'YOURS', label: 'owned rules', benefit: 'Custom booking logic', className: 'count-violet' },
    ],
    demoEyebrow: 'Product snapshot',
    demoTitle: 'SEE THE\nBOOKING\nJOURNEY',
    demoBody: 'Use this when your business is losing momentum between first enquiry and confirmed appointment, especially after hours or during busy periods.',
    demoNotes: ['Booking logic + reminders', 'Reschedule-aware flows', 'Cleaner calendar handoff'],
    demoShellLabel: 'Booking agent system snapshot',
    demoTopTitle: 'Booking flow system',
    demoTopPill: 'ACTIVE',
    demoMessages: [
      { role: 'assistant', text: 'The booking agent helps collect timing intent, confirms what matters, and routes the lead into the right appointment path.' },
      { role: 'user', text: 'It is best for clinics, beauty brands, consultative services, and businesses where back-and-forth scheduling slows conversion.' },
    ],
    demoFooterTitle: 'Best when admin time is blocking conversion',
    demoFooterCta: 'Book a Free Demo',
    videoEyebrow: 'Booking walkthrough',
    videoTitle: 'WATCH THE\nSCHEDULING\nLOGIC',
    videoBody: 'See how the system handles availability questions, confirmation flow, reminders, rescheduling, and cleaner handoff into the calendar layer.',
    videoImage: '../assets/funnel-images/calendar-dashboard-workspace-wide.png',
    videoAlt: 'Calendar dashboard and booking system workspace across desktop and tablet.',
    videoKicker: 'Booking overview',
    videoHeading: 'Booking Agent',
    marquee: [
      { text: 'Reduce manual scheduling', accent: true },
      { text: 'Protect after-hours bookings', accent: false },
      { text: 'Cleaner reminders', accent: true },
      { text: 'Fewer no-shows', accent: false },
      { text: 'Built for appointment businesses', accent: true },
    ],
    featureEyebrow: 'Use cases',
    featureTitle: 'WHO THIS\nBOOKING LAYER\nHELPS MOST',
    featureCards: [
      { title: 'Clinics', body: 'Handle intake questions, appointment requests, and confirmations without forcing staff to chase every booking manually.' },
      { title: 'Beauty & wellness', body: 'Protect bookings during busy periods and make reschedules feel cleaner instead of chaotic.' },
      { title: 'Consultants', body: 'Route serious discovery bookings faster and reduce admin drag between interest and confirmed call.' },
      { title: 'Education', body: 'Coordinate meetings, consultations, or parent calls with less back-and-forth.' },
      { title: 'Professional services', body: 'Keep scheduling professional, clear, and structured before the first live conversation.' },
      { title: 'High-volume enquiry teams', body: 'Use booking automation to reduce repetitive calendar friction and keep lead response faster.' },
    ],
    trustImage: '../assets/funnel-images/calendar-dashboard-workspace-wide.png',
    trustImageAlt: 'Team reviewing booking calendar automation and scheduling system.',
    trustEyebrow: 'Why it matters',
    trustTitle: 'SCHEDULING\nSHOULD NOT BE\nTHE BOTTLENECK',
    trustBody: 'A lot of businesses lose easy wins in the gap between enquiry and confirmed booking. A cleaner booking flow protects revenue and saves admin energy at the same time.',
    processEyebrow: 'The process',
    processTitle: 'FROM ENQUIRY\nTO CONFIRMED\nBOOKING',
    processRows: [
      { title: 'Booking scenarios', stage: 'Discovery', body: 'We map appointment types, timing rules, reschedule patterns, and the admin friction that slows bookings today.' },
      { title: 'Scheduling logic', stage: 'Design', body: 'We define the questions, guardrails, reminders, and handoff rules that should shape the booking journey.' },
      { title: 'Calendar integration', stage: 'Implementation', body: 'We connect the system to the right booking layer, calendar path, or lead handoff depending on your stack.' },
      { title: 'Reminder testing', stage: 'Quality control', body: 'We test confirmations, cancellations, after-hours requests, and reschedules before launch.' },
      { title: 'Launch + improve', stage: 'Go live', body: 'After launch, we review no-show patterns, booking drop-off, and the reminders that improve show-up rate.' },
    ],
    pricingEyebrow: 'Build options',
    pricingTitle: 'CUSTOM AI.\nBUILT TO\nBOOK.',
    pricingBody: 'Start with the booking layer your business needs now, then expand once your confirmations and next-step flow are already working better.',
    pricingCards: [
      { badge: 'Starter', title: 'Booking Flow Foundation', price: 'from $1,100', bullets: ['One booking path', 'Core confirmation logic', 'Reminder-ready structure', 'Admin-friendly handoff'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'Booking + Reminder System', price: 'from $2,100', bullets: ['Scheduling logic', 'Reschedule-aware flow', 'Reminder layer', 'Calendar connection'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Multi-Service Booking Layer', price: 'from $3,400', bullets: ['Multiple appointment types', 'Advanced rules', 'Team notifications', 'Performance visibility'], cta: 'Discuss Scope', href: calendlyHref },
    ],
    bonusEyebrow: 'Limited bonus',
    bonusTitle: 'FREE BOOKING\nBOTTLENECK MAP\nTHIS WEEK',
    bonusBody: 'Book your demo and we will show you where bookings currently slow down before we scope the full scheduling system.',
    bonusCta: 'Book the Free Demo',
    faqEyebrow: 'Common questions',
    faqTitle: 'QUESTIONS\nBEFORE YOU\nAUTOMATE BOOKINGS',
    faqs: sharedFaqs.system,
    finalEyebrow: 'Ready to start?',
    finalTitle: "LET'S BUILD\nYOUR BOOKING\nAGENT.",
    finalBody: 'Book a free demo and we will map the first scheduling flow your business should automate.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'systems/lead-pipeline-automation/index.html',
    pageTitle: 'Lead Pipeline Automation | The Future Studio',
    metaDescription: 'A lead pipeline automation system for capture, qualification, follow-up, scoring, and clearer visibility across enquiries.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'LEAD PIPELINE\nAUTOMATION',
    heroBody: 'For businesses that are already generating interest but need a cleaner pipeline, stronger follow-up rhythm, and a better way to see what should happen next.',
    primaryCta: 'Watch the Pipeline Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      { value: '24/7', label: 'lead capture', benefit: 'No silent drop-off', className: 'count-cyan' },
      { value: 'FAST', label: 'response layer', benefit: 'Speed before competitors', className: 'count-violet' },
      { value: '7-21', label: 'launch window', benefit: 'Live in weeks', className: 'count-dark' },
      { value: 'VIEW', label: 'pipeline clarity', benefit: 'See what needs action', className: 'count-cyan' },
      { value: 'YOURS', label: 'owned workflow', benefit: 'No locked pipeline logic', className: 'count-violet' },
    ],
    demoEyebrow: 'Product snapshot',
    demoTitle: 'SEE THE\nPIPELINE\nLOGIC',
    demoBody: 'Use this when leads are arriving but follow-up is inconsistent, warm opportunities sit too long, or nobody can clearly see what is moving and what is leaking.',
    demoNotes: ['Capture + score + route', 'Follow-up automation', 'Cleaner opportunity visibility'],
    demoShellLabel: 'Lead pipeline automation snapshot',
    demoTopTitle: 'Lead pipeline stack',
    demoTopPill: 'IN MOTION',
    demoMessages: [
      { role: 'assistant', text: 'The system captures interest, sorts urgency or fit, routes the lead, and keeps follow-up moving without relying on memory alone.' },
      { role: 'user', text: 'This works best for teams that know demand exists already but need a more ordered system to recover and convert it.' },
    ],
    demoFooterTitle: 'Best when follow-up is the missing layer',
    demoFooterCta: 'Book a Free Demo',
    videoEyebrow: 'Pipeline walkthrough',
    videoTitle: 'WATCH THE\nLEAD FLOW',
    videoBody: 'See how the pipeline layer captures enquiries, scores opportunities, triggers follow-up, and creates a clearer next-action view for the team.',
    videoImage: '../assets/funnel-images/team-automation-dashboard-review-wide.png',
    videoAlt: 'Team reviewing lead pipeline automation and performance dashboard.',
    videoKicker: 'Pipeline overview',
    videoHeading: 'Lead Pipeline Automation',
    marquee: [
      { text: 'Capture every enquiry', accent: true },
      { text: 'Qualify before chasing', accent: false },
      { text: 'Follow-up with structure', accent: true },
      { text: 'See what recovers revenue', accent: false },
      { text: 'Built for service sales flows', accent: true },
    ],
    featureEyebrow: 'Use cases',
    featureTitle: 'WHERE THIS\nPIPELINE BUILD\nWORKS BEST',
    featureCards: [
      { title: 'Sales teams', body: 'Give the team a clearer way to sort, score, and follow opportunities instead of relying on scattered manual updates.' },
      { title: 'Clinics', body: 'Track consultation requests, callbacks, and follow-up timing so patient demand does not vanish after first contact.' },
      { title: 'Real estate', body: 'Keep inquiries visible, route viewings or callbacks faster, and stop warm leads from cooling in the gap.' },
      { title: 'Consultants', body: 'Move discovery prospects through a cleaner qualification and follow-up path.' },
      { title: 'Education', body: 'Manage applicant or family interest with more structure across forms, calls, and messages.' },
      { title: 'Service businesses', body: 'Turn lead handling from an improvised admin task into a system the team can actually trust.' },
    ],
    trustImage: '../assets/funnel-images/team-automation-dashboard-review-wide.png',
    trustImageAlt: 'Business team reviewing lead pipeline dashboard and automation metrics.',
    trustEyebrow: 'Why it matters',
    trustTitle: 'A LOT OF\nREVENUE IS LOST\nIN THE MIDDLE',
    trustBody: 'The business often does not lose leads at the first touch. It loses them in the messy middle where nobody knows who should reply, when to follow up, or which opportunities matter most.',
    processEyebrow: 'The process',
    processTitle: 'FROM LEAD\nNOISE TO\nPIPELINE CLARITY',
    processRows: [
      { title: 'Leak map', stage: 'Discovery', body: 'We map where leads arrive, where they stall, and which follow-up gaps cost the business the most.' },
      { title: 'Pipeline rules', stage: 'Design', body: 'We define stages, urgency markers, next actions, and the logic for when follow-up should trigger.' },
      { title: 'Automation build', stage: 'Implementation', body: 'We connect capture, routing, qualification, and notifications into one cleaner pipeline view.' },
      { title: 'Scenario testing', stage: 'Quality control', body: 'We test hot leads, missed replies, no-shows, delayed callbacks, and weak handoffs before launch.' },
      { title: 'Launch + measure', stage: 'Go live', body: 'After launch, we review what gets recovered, which triggers work best, and where the pipeline should deepen next.' },
    ],
    pricingEyebrow: 'Build options',
    pricingTitle: 'CUSTOM AI.\nBUILT TO\nMOVE LEADS.',
    pricingBody: 'Choose the level of pipeline build your business needs now, then deepen the system once the first recovery layer is already visible.',
    pricingCards: [
      { badge: 'Starter', title: 'Lead Capture Foundation', price: 'from $1,400', bullets: ['Lead intake structure', 'Basic qualification', 'Notification handoff', 'Cleaner first follow-up'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'Follow-Up + Pipeline System', price: 'from $2,600', bullets: ['Lead stages + scoring', 'Automated follow-up logic', 'Team handoff rules', 'Clearer visibility layer'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Sales Recovery Dashboard', price: 'from $4,200', bullets: ['Multi-channel capture', 'Advanced scoring', 'Dashboard layer', 'Ongoing optimisation'], cta: 'Discuss Scope', href: calendlyHref },
    ],
    bonusEyebrow: 'Limited bonus',
    bonusTitle: 'FREE LEAD\nLEAK MAP\nTHIS WEEK',
    bonusBody: 'Book your demo this week and we will map the first pipeline leak your business should fix before we scope the full system.',
    bonusCta: 'Book the Free Demo',
    faqEyebrow: 'Common questions',
    faqTitle: 'QUESTIONS\nBEFORE YOU\nAUTOMATE FOLLOW-UP',
    faqs: sharedFaqs.system,
    finalEyebrow: 'Ready to start?',
    finalTitle: "LET'S BUILD\nYOUR LEAD\nPIPELINE.",
    finalBody: 'Book a free demo and we will show you the first part of the pipeline your business should automate.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'systems/ai-content-agent/index.html',
    pageTitle: 'AI Content Agent | The Future Studio',
    metaDescription: 'An AI content agent that turns internal clarity into content planning, production support, and more consistent publishing.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'AI CONTENT\nAGENT',
    heroBody: 'For businesses that know they need stronger authority content but do not want to rely on random posting, weak prompts, or a full in-house content team.',
    primaryCta: 'Watch the Content Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      { value: '90D', label: 'content rhythm', benefit: 'Plan with structure', className: 'count-cyan' },
      { value: 'FAST', label: 'idea turn', benefit: 'Less blank-page delay', className: 'count-violet' },
      { value: '7-21', label: 'launch window', benefit: 'Live in weeks', className: 'count-dark' },
      { value: 'EN/ES', label: 'publishing flow', benefit: 'Bilingual support', className: 'count-cyan' },
      { value: 'YOURS', label: 'owned system', benefit: 'Brand-aware logic', className: 'count-violet' },
    ],
    demoEyebrow: 'Product snapshot',
    demoTitle: 'SEE THE\nCONTENT\nSYSTEM',
    demoBody: 'Use this build when content matters for trust, but the business needs a clearer process for ideas, messaging, repurposing, and consistent output.',
    demoNotes: ['Topic planning support', 'Offer-aligned prompts', 'Authority content flow'],
    demoShellLabel: 'AI content agent snapshot',
    demoTopTitle: 'Content agent stack',
    demoTopPill: 'PLANNING',
    demoMessages: [
      { role: 'assistant', text: 'The content agent turns business clarity into ideas, prompts, post angles, and publishing support without losing the brand voice.' },
      { role: 'user', text: 'This works best when the team knows content matters but still struggles to create consistently or strategically.' },
    ],
    demoFooterTitle: 'Best when consistency and relevance are the gap',
    demoFooterCta: 'Book a Free Demo',
    videoEyebrow: 'Content walkthrough',
    videoTitle: 'WATCH THE\nCONTENT\nLOGIC',
    videoBody: 'See how the system helps structure themes, generate publishable ideas, repurpose stronger content, and keep the brand visible more consistently.',
    videoImage: '../assets/funnel-images/content-calendar-devices-wide.png',
    videoAlt: 'Content calendar and device mockups showing structured publishing workflow.',
    videoKicker: 'Content overview',
    videoHeading: 'AI Content Agent',
    marquee: [
      { text: 'Turn clarity into content', accent: true },
      { text: 'Less random posting', accent: false },
      { text: 'Plan with authority', accent: true },
      { text: 'Repurpose stronger ideas', accent: false },
      { text: 'Built for visible trust', accent: true },
    ],
    featureEyebrow: 'Use cases',
    featureTitle: 'WHERE THIS\nCONTENT LAYER\nHELPS MOST',
    featureCards: [
      { title: 'Clinics', body: 'Translate internal expertise into simpler educational content that builds trust before the visit.' },
      { title: 'Consultants', body: 'Turn discovery patterns, objections, and insights into more authority-led public content.' },
      { title: 'Education', body: 'Support program promotion, parent reassurance, and regular content planning with less content stress.' },
      { title: 'Real estate', body: 'Create more consistent market-facing content without reinventing the message every week.' },
      { title: 'Beauty & wellness', body: 'Support launches, treatments, and educational posts with a stronger content rhythm.' },
      { title: 'Professional services', body: 'Build visibility with clearer messaging, repeated themes, and less wasted production effort.' },
    ],
    trustImage: '../assets/funnel-images/content-calendar-devices-wide.png',
    trustImageAlt: 'AI-driven content planning shown across laptop, tablet, and phone.',
    trustEyebrow: 'Why it matters',
    trustTitle: 'CONTENT SHOULD\nCOME FROM CLARITY,\nNOT PANIC',
    trustBody: 'The businesses that stay visible consistently usually are not posting more at random. They are using stronger internal clarity, clearer themes, and better systems around content creation.',
    processEyebrow: 'The process',
    processTitle: 'FROM IDEA CHAOS\nTO A CLEARER\nCONTENT RHYTHM',
    processRows: [
      { title: 'Theme map', stage: 'Discovery', body: 'We map the offers, audience questions, objections, and authority themes the business should publish around.' },
      { title: 'Content logic', stage: 'Design', body: 'We design a content system around formats, prompts, repurposing, and what should be easiest to produce consistently.' },
      { title: 'Agent setup', stage: 'Implementation', body: 'We configure the AI content workflow, planning support, and reusable prompt logic for your brand.' },
      { title: 'Output testing', stage: 'Quality control', body: 'We test quality, tone, relevance, repurposing flow, and how well the content connects back to the offer.' },
      { title: 'Launch + refine', stage: 'Go live', body: 'After launch, we refine what performs, expand the content system, and improve consistency across the next cycle.' },
    ],
    pricingEyebrow: 'Build options',
    pricingTitle: 'CUSTOM AI.\nBUILT FOR\nCONTENT FLOW.',
    pricingBody: 'Start with the content planning layer your business needs now, then expand into deeper repurposing, production, or publishing support once the first cycle is working.',
    pricingCards: [
      { badge: 'Starter', title: 'Content Planning Agent', price: 'from $900', bullets: ['Theme mapping', 'Core prompts', 'Publishing structure', 'Offer-aligned topics'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'Content + Repurposing System', price: 'from $1,800', bullets: ['Planning layer', 'Repurposing workflow', 'Platform-aware prompts', 'Visibility rhythm'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Authority Content Engine', price: 'from $3,200', bullets: ['Multi-format logic', 'Publishing system', 'Campaign support', 'Ongoing optimisation'], cta: 'Discuss Scope', href: calendlyHref },
    ],
    bonusEyebrow: 'Limited bonus',
    bonusTitle: 'FREE CONTENT\nTHEME MAP\nTHIS WEEK',
    bonusBody: 'Book your demo and we will map the first three content themes your business should build around before we scope the full system.',
    bonusCta: 'Book the Free Demo',
    faqEyebrow: 'Common questions',
    faqTitle: 'QUESTIONS\nBEFORE YOU\nBUILD A CONTENT SYSTEM',
    faqs: sharedFaqs.system,
    finalEyebrow: 'Ready to start?',
    finalTitle: "LET'S BUILD\nYOUR CONTENT\nAGENT.",
    finalBody: 'Book a free demo and we will show you the first content workflow your business should build.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'systems/marketing-video-system/index.html',
    pageTitle: 'Marketing Video System | The Future Studio',
    metaDescription: 'An AI-assisted marketing video system for short-form video production, scripting, asset planning, and campaign support.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'MARKETING\nVIDEO\nSYSTEM',
    heroBody: 'For brands that need more consistent short-form video without building a full production team from scratch every time content is needed.',
    primaryCta: 'Watch the Video System Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      { value: 'FAST', label: 'video turn', benefit: 'Short-form output faster', className: 'count-cyan' },
      { value: 'REELS', label: 'campaign formats', benefit: 'Built for modern distribution', className: 'count-violet' },
      { value: '2-4', label: 'week launch', benefit: 'Live in weeks', className: 'count-dark' },
      { value: 'AI', label: 'production assist', benefit: 'Smarter scripting support', className: 'count-cyan' },
      { value: 'YOURS', label: 'owned workflow', benefit: 'Reusable creative system', className: 'count-violet' },
    ],
    demoEyebrow: 'Product snapshot',
    demoTitle: 'SEE THE\nVIDEO\nWORKFLOW',
    demoBody: 'This build is for brands that need campaign assets, authority clips, educational content, or recurring short-form output without the usual video bottleneck.',
    demoNotes: ['Concept + script layer', 'Short-form production logic', 'Repurposing-ready workflow'],
    demoShellLabel: 'Marketing video system snapshot',
    demoTopTitle: 'Video system stack',
    demoTopPill: 'CONTENT READY',
    demoMessages: [
      { role: 'assistant', text: 'The system helps shape concepts, scripts, AI visuals, and repeatable short-form output around your offer and audience.' },
      { role: 'user', text: 'It is best for businesses that need visible authority content but do not want production to stay stuck in chaos.' },
    ],
    demoFooterTitle: 'Best when video matters but production is too slow',
    demoFooterCta: 'Book a Free Demo',
    videoEyebrow: 'Video system walkthrough',
    videoTitle: 'WATCH THE\nASSET FLOW',
    videoBody: 'See how the system supports content ideas, scripts, production logic, and campaign asset creation across repeated short-form output.',
    videoImage: '../assets/funnel-images/course-video-planning-workspace-wide.png',
    videoAlt: 'Video planning workspace with production notes and device screens.',
    videoKicker: 'Video overview',
    videoHeading: 'Marketing Video System',
    marquee: [
      { text: 'Short-form at speed', accent: true },
      { text: 'Concept to script faster', accent: false },
      { text: 'Campaign assets with structure', accent: true },
      { text: 'Less production drag', accent: false },
      { text: 'Built for visibility', accent: true },
    ],
    featureEyebrow: 'Use cases',
    featureTitle: 'WHERE THIS\nVIDEO BUILD\nFITS BEST',
    featureCards: [
      { title: 'Personal brands', body: 'Create more consistent authority content without building every video from scratch.' },
      { title: 'Service businesses', body: 'Turn expertise into educational reels, ads, and trust-building clips faster.' },
      { title: 'Course creators', body: 'Support launch content, lessons, promo clips, and social distribution with one clearer workflow.' },
      { title: 'Agencies', body: 'Add a repeatable AI-assisted production layer to campaign work and recurring client content.' },
      { title: 'Founders', body: 'Stay visible with a stronger short-form publishing system even if you do not have a full media team.' },
      { title: 'Campaign launches', body: 'Build a cleaner flow for scripts, assets, and production support around the offer window.' },
    ],
    trustImage: '../assets/funnel-images/course-video-planning-workspace-wide.png',
    trustImageAlt: 'Planning desk for video production workflow with laptop and notes.',
    trustEyebrow: 'Why it matters',
    trustTitle: 'VIDEO WORKS\nBETTER WHEN THE\nSYSTEM IS CLEAR',
    trustBody: 'The bottleneck is rarely only editing. It is usually the lack of a repeatable system for ideas, scripting, production priorities, and where each video should fit inside the bigger sales story.',
    processEyebrow: 'The process',
    processTitle: 'FROM IDEA JAM\nTO A REPEATABLE\nVIDEO FLOW',
    processRows: [
      { title: 'Content angle map', stage: 'Discovery', body: 'We map offers, audience questions, campaign goals, and the types of videos the brand needs most.' },
      { title: 'Creative logic', stage: 'Design', body: 'We define the scripting structure, platform direction, production style, and output rhythm for the system.' },
      { title: 'System build', stage: 'Implementation', body: 'We build the planning, prompt, script, and asset workflow around the chosen video scope.' },
      { title: 'Output review', stage: 'Quality control', body: 'We test whether concepts, scripts, and assets feel usable, strategic, and visually aligned.' },
      { title: 'Launch + refine', stage: 'Go live', body: 'After launch, we refine the strongest-performing angles and improve the production flow over time.' },
    ],
    pricingEyebrow: 'Build options',
    pricingTitle: 'CUSTOM AI.\nBUILT FOR\nVIDEO OUTPUT.',
    pricingBody: 'Choose the level of video system your brand needs now, then expand into deeper production or campaign layers once the first output flow is active.',
    pricingCards: [
      { badge: 'Starter', title: 'Short-Form Video Starter', price: 'from $1,500', bullets: ['Content angle planning', 'Script support', 'Short-form system', 'Repurposing-ready flow'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'Video + Campaign Support', price: 'from $2,800', bullets: ['Script + asset workflow', 'Campaign-ready structure', 'Authority content support', 'Repeatable production logic'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Video Content Engine', price: 'from $4,500', bullets: ['Advanced production workflow', 'Multi-format system', 'Campaign asset layer', 'Ongoing optimisation'], cta: 'Discuss Scope', href: calendlyHref },
    ],
    bonusEyebrow: 'Limited bonus',
    bonusTitle: 'FREE VIDEO\nCONTENT MAP\nTHIS WEEK',
    bonusBody: 'Book your demo and we will map the first short-form video sequence your brand should build before we scope the full system.',
    bonusCta: 'Book the Free Demo',
    faqEyebrow: 'Common questions',
    faqTitle: 'QUESTIONS\nBEFORE YOU\nBUILD VIDEO SYSTEMS',
    faqs: sharedFaqs.system,
    finalEyebrow: 'Ready to start?',
    finalTitle: "LET'S BUILD\nYOUR VIDEO\nSYSTEM.",
    finalBody: 'Book a free demo and we will show you the first video workflow your business should build.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'systems/custom-apps-dashboards/index.html',
    pageTitle: 'Custom Apps & Dashboards | The Future Studio',
    metaDescription: 'Custom business apps and dashboards for tracking, admin flow, reporting, and the practical tools around your AI system.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'CUSTOM APPS\n& DASHBOARDS',
    heroBody: 'For businesses that need a more practical operating layer around enquiries, bookings, reporting, or AI workflows instead of living inside scattered tools.',
    primaryCta: 'Watch the App Demo',
    secondaryCta: 'WhatsApp About This Build',
    stats: [
      { value: 'CLEAR', label: 'data view', benefit: 'See what matters faster', className: 'count-cyan' },
      { value: 'OPS', label: 'workflow layer', benefit: 'Admin made easier', className: 'count-violet' },
      { value: '2-5', label: 'week build', benefit: 'Live in weeks', className: 'count-dark' },
      { value: 'SYNC', label: 'tool handoff', benefit: 'Connected to real workflows', className: 'count-cyan' },
      { value: 'YOURS', label: 'owned system', benefit: 'No template lock-in', className: 'count-violet' },
    ],
    demoEyebrow: 'Product snapshot',
    demoTitle: 'SEE THE\nAPP LAYER\nIN ACTION',
    demoBody: 'Use this when the business needs a clearer internal tool, dashboard, or workflow system around operations, reporting, bookings, or lead handling.',
    demoNotes: ['Internal workflow support', 'Custom reporting views', 'Built around real admin use'],
    demoShellLabel: 'Custom apps and dashboards snapshot',
    demoTopTitle: 'Operations app stack',
    demoTopPill: 'CONNECTED',
    demoMessages: [
      { role: 'assistant', text: 'The app layer gives the business a cleaner place to manage data, view performance, and act on what matters instead of juggling scattered tabs.' },
      { role: 'user', text: 'This fits best when spreadsheets, inboxes, or disconnected tools are slowing daily execution down.' },
    ],
    demoFooterTitle: 'Best when the team needs one clearer operating view',
    demoFooterCta: 'Book a Free Demo',
    videoEyebrow: 'App walkthrough',
    videoTitle: 'WATCH THE\nDASHBOARD\nLOGIC',
    videoBody: 'See how a custom app or dashboard can support real workflows around leads, bookings, reporting, reminders, or internal execution.',
    videoImage: '../assets/funnel-images/digital-product-dashboard-mockup-wide.png',
    videoAlt: 'Custom dashboard and app interface shown across devices.',
    videoKicker: 'App overview',
    videoHeading: 'Custom Apps & Dashboards',
    marquee: [
      { text: 'One clearer operating view', accent: true },
      { text: 'Less tab chaos', accent: false },
      { text: 'Practical dashboard logic', accent: true },
      { text: 'Built around real admin work', accent: false },
      { text: 'Custom, not generic', accent: true },
    ],
    featureEyebrow: 'Use cases',
    featureTitle: 'WHERE THIS\nAPP LAYER\nHELPS MOST',
    featureCards: [
      { title: 'Lead teams', body: 'See follow-up status, owner, urgency, and next action in one cleaner view.' },
      { title: 'Booking businesses', body: 'Track scheduling, no-shows, reminders, and operational handoff in one place.' },
      { title: 'Service operations', body: 'Reduce daily admin friction with an internal app built around the way the team really works.' },
      { title: 'Founders', body: 'Get a clearer performance layer without depending on five disconnected tools to tell one story.' },
      { title: 'Agencies', body: 'Create practical internal dashboards for client management, automation results, or campaign visibility.' },
      { title: 'Growing teams', body: 'Build a more stable internal layer before complexity forces the team into chaotic workaround systems.' },
    ],
    trustImage: '../assets/funnel-images/digital-product-dashboard-mockup-wide.png',
    trustImageAlt: 'Custom dashboard and business app interface displayed across devices.',
    trustEyebrow: 'Why it matters',
    trustTitle: 'A GOOD SYSTEM\nNEEDS A CLEARER\nOPERATING LAYER',
    trustBody: 'Many businesses do not need more software. They need a smarter internal layer that turns data, tasks, and handoffs into something easier to act on every day.',
    processEyebrow: 'The process',
    processTitle: 'FROM TOOL CHAOS\nTO A CLEANER\nAPP LAYER',
    processRows: [
      { title: 'Workflow map', stage: 'Discovery', body: 'We map the real process, the admin friction, and what the team actually needs to see or do faster.' },
      { title: 'System design', stage: 'Design', body: 'We define the app views, fields, dashboard logic, and user actions around real operations.' },
      { title: 'Build + connect', stage: 'Implementation', body: 'We build the app layer, connect the key data sources, and shape the tool around actual usage.' },
      { title: 'QA + review', stage: 'Quality control', body: 'We test the views, interactions, dashboard clarity, and daily-use logic before launch.' },
      { title: 'Launch + refine', stage: 'Go live', body: 'After launch, we refine usability, reporting quality, and the next features that make the tool more useful.' },
    ],
    pricingEyebrow: 'Build options',
    pricingTitle: 'CUSTOM AI.\nBUILT FOR\nOPERATIONS.',
    pricingBody: 'Choose the level of app or dashboard your business needs now, then expand once the first operating layer is already reducing friction.',
    pricingCards: [
      { badge: 'Starter', title: 'Internal Dashboard Starter', price: 'from $1,800', bullets: ['One focused dashboard', 'Practical reporting view', 'Core workflow support', 'Cleaner data visibility'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'Custom App + Dashboard', price: 'from $3,200', bullets: ['Custom workflow view', 'Operational actions', 'Connected data layer', 'Usability-first structure'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Multi-Team Operations System', price: 'from $5,200', bullets: ['Multiple user views', 'Advanced reporting', 'Operational routing', 'Expansion-ready app logic'], cta: 'Discuss Scope', href: calendlyHref },
    ],
    bonusEyebrow: 'Limited bonus',
    bonusTitle: 'FREE WORKFLOW\nMAP REVIEW\nTHIS WEEK',
    bonusBody: 'Book your demo and we will map the first dashboard or app layer your business should build before we scope the full system.',
    bonusCta: 'Book the Free Demo',
    faqEyebrow: 'Common questions',
    faqTitle: 'QUESTIONS\nBEFORE YOU\nBUILD A CUSTOM APP',
    faqs: sharedFaqs.system,
    finalEyebrow: 'Ready to start?',
    finalTitle: "LET'S BUILD\nYOUR APP\nLAYER.",
    finalBody: 'Book a free demo and we will show you the first dashboard or workflow view your business should build.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
];

const packagePages = [
  {
    output: 'packages/starter/index.html',
    pageTitle: 'Starter Package | The Future Studio',
    metaDescription: 'The Starter Package pairs a premium one-page website with a web and WhatsApp AI assistant for businesses building their first AI-enabled front door.',
    heroEyebrow: 'Product package',
    heroTitle: 'STARTER\nPACKAGE',
    heroBody: 'Best for businesses that need a premium one-page website, a web assistant, and a WhatsApp assistant as their first practical AI front door.',
    primaryCta: 'Book a Free Demo',
    secondaryCta: 'WhatsApp About Starter',
    stats: [
      { value: '1 PAGE', label: 'website core', benefit: 'Clear digital front door', className: 'count-cyan' },
      { value: 'AI', label: 'assistant layer', benefit: 'Web + WhatsApp support', className: 'count-violet' },
      { value: '4-7', label: 'week window', benefit: 'Fast first build', className: 'count-dark' },
      { value: 'CLEAR', label: 'offer path', benefit: 'Built for enquiries', className: 'count-cyan' },
      { value: 'START', label: 'best fit', benefit: 'First AI step for service businesses', className: 'count-violet' },
    ],
    demoEyebrow: 'Package snapshot',
    demoTitle: 'SEE WHAT\nSTARTER\nINSTALLS',
    demoBody: 'Starter is designed for businesses that need a clean public front door, stronger message clarity, and their first assistant layer without overbuilding too early.',
    demoNotes: ['Premium one-page website', 'Web AI assistant', 'WhatsApp AI assistant'],
    demoShellLabel: 'Starter package snapshot',
    demoTopTitle: 'Starter package stack',
    demoTopPill: 'ENTRY BUILD',
    demoMessages: [
      { role: 'assistant', text: 'Starter is the cleanest way to turn a weak or outdated front door into something clearer, more useful, and AI-supported.' },
      { role: 'user', text: 'It is best for businesses that want a practical first AI layer without jumping straight into a full front-office build.' },
    ],
    demoFooterTitle: 'Best for first-stage implementation',
    demoFooterCta: 'Book a Free Demo',
    videoEyebrow: 'Starter walkthrough',
    videoTitle: 'WATCH THE\nFIRST BUILD\nPATH',
    videoBody: 'See how Starter combines a stronger public-facing page with AI assistance that handles first questions and supports enquiries more clearly.',
    videoImage: '../assets/funnel-images/team-client-automation-strategy-wide.png',
    videoAlt: 'Team reviewing a client-facing website and assistant strategy.',
    videoKicker: 'Package overview',
    videoHeading: 'Starter Package',
    marquee: [
      { text: 'Professional first impression', accent: true },
      { text: 'AI support without overbuilding', accent: false },
      { text: 'One-page website clarity', accent: true },
      { text: 'WhatsApp + web assistant', accent: false },
      { text: 'Best for first-stage growth', accent: true },
    ],
    featureEyebrow: 'Included',
    featureTitle: 'WHAT STARTER\nPUTS IN PLACE',
    featureCards: [
      { title: 'One-page website', body: 'A premium one-page website designed to explain the offer clearly and capture stronger enquiries.' },
      { title: 'Conversion structure', body: 'Clear copy structure so the website acts like a guided sales layer rather than a static brochure.' },
      { title: 'Web AI assistant', body: 'An assistant on the site to answer questions, reduce confusion, and move visitors toward the next step.' },
      { title: 'WhatsApp AI assistant', body: 'A basic assistant layer for message handling and cleaner first response after the visitor leaves the site.' },
      { title: 'Brand-aware setup', body: 'The package is shaped around your actual offer, not dropped in as a generic template.' },
      { title: 'Expansion-ready base', body: 'Starter gives you a cleaner platform for adding call, booking, or deeper automation later.' },
    ],
    trustImage: '../assets/funnel-images/team-client-automation-strategy-wide.png',
    trustImageAlt: 'Business team reviewing foundational website and AI assistant strategy.',
    trustEyebrow: 'Why it matters',
    trustTitle: 'STARTER IS\nABOUT GETTING\nTHE FRONT DOOR RIGHT',
    trustBody: 'If the business still lacks a clear website, strong messaging, or a simple AI response layer, the smartest move is often to install the first practical system before buying more complexity.',
    processEyebrow: 'The process',
    processTitle: 'FROM OUTDATED\nPRESENCE TO\nA STRONGER START',
    processRows: [
      { title: 'Offer review', stage: 'Discovery', body: 'We review what the business sells, where people get confused, and what the website should do first.' },
      { title: 'Page design', stage: 'Design', body: 'We structure the page, message order, and enquiry flow around a clearer conversion path.' },
      { title: 'Assistant setup', stage: 'Implementation', body: 'We add the first AI response layers for the website and WhatsApp so first questions are handled better.' },
      { title: 'QA + fit check', stage: 'Quality control', body: 'We test the message flow, CTA path, and assistant behaviour so the package feels useful from day one.' },
      { title: 'Launch', stage: 'Go live', body: 'Once live, Starter becomes the base you can grow from without rebuilding your entire front door again.' },
    ],
    pricingEyebrow: 'Package pricing',
    pricingTitle: 'CLEAR AI.\nBUILT TO\nSTART WELL.',
    pricingBody: 'Starter is the right first move when your business needs a stronger website and practical AI support before investing in the larger front-office layers.',
    pricingCards: [
      { badge: 'Starter', title: 'Starter Package', price: 'from $1,500', bullets: ['Premium one-page website', 'Conversion-focused structure', 'Web AI assistant', 'WhatsApp AI assistant'], cta: 'Start This Package', href: calendlyHref, featured: true },
      { badge: 'Next step', title: 'Growth Package', price: 'from $2,500', bullets: ['Multi-page website', 'SEO structure', 'Expanded assistant layer', 'More authority support'], cta: 'See Growth', href: calendlyHref },
      { badge: 'Advanced', title: 'Premium Package', price: 'from $4,500', bullets: ['Full front office', 'Call agent layer', 'Video support', 'Broader AI stack'], cta: 'See Premium', href: calendlyHref },
    ],
    bonusEyebrow: 'Limited bonus',
    bonusTitle: 'FREE STARTER\nMESSAGE MAP\nTHIS WEEK',
    bonusBody: 'Book your demo and we will outline the first homepage and assistant message flow your business should use before we scope the package.',
    bonusCta: 'Book the Free Demo',
    faqEyebrow: 'Common questions',
    faqTitle: 'QUESTIONS\nBEFORE YOU\nSTART WITH AI',
    faqs: sharedFaqs.package,
    finalEyebrow: 'Ready to start?',
    finalTitle: "LET'S BUILD\nYOUR STARTER\nPACKAGE.",
    finalBody: 'Book a free demo and we will show you whether Starter is the right first move for your business.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'packages/growth/index.html',
    pageTitle: 'Growth Package | The Future Studio',
    metaDescription: 'The Growth Package combines a multi-page website, AI assistant, and SEO structure for businesses ready for a stronger digital front office.',
    heroEyebrow: 'Product package',
    heroTitle: 'GROWTH\nPACKAGE',
    heroBody: 'Best for businesses that need a stronger website, clearer service pages, search-ready structure, and an AI assistant working across a wider public-facing system.',
    primaryCta: 'Book a Free Demo',
    secondaryCta: 'WhatsApp About Growth',
    stats: [
      { value: 'MULTI', label: 'page depth', benefit: 'More complete website structure', className: 'count-cyan' },
      { value: 'SEO', label: 'visibility layer', benefit: 'Built for discovery', className: 'count-violet' },
      { value: '4-7', label: 'week window', benefit: 'Active in weeks', className: 'count-dark' },
      { value: 'AI', label: 'assistant support', benefit: 'Broader enquiry coverage', className: 'count-cyan' },
      { value: 'GROW', label: 'best fit', benefit: 'For businesses ready to scale trust', className: 'count-violet' },
    ],
    demoEyebrow: 'Package snapshot',
    demoTitle: 'SEE WHAT\nGROWTH\nINSTALLS',
    demoBody: 'Growth is built for businesses that have outgrown the smallest front door and now need stronger structure, service depth, and better support for search and enquiry flow.',
    demoNotes: ['Multi-page website', 'SEO-aware structure', 'Expanded AI assistant'],
    demoShellLabel: 'Growth package snapshot',
    demoTopTitle: 'Growth package stack',
    demoTopPill: 'EXPANSION BUILD',
    demoMessages: [
      { role: 'assistant', text: 'Growth turns the website into a fuller business layer, with clearer service pages, stronger structure, and better assistant support across the journey.' },
      { role: 'user', text: 'It is the right package when the business needs more than a homepage but still wants a practical, staged build.' },
    ],
    demoFooterTitle: 'Best for stronger digital visibility and trust',
    demoFooterCta: 'Book a Free Demo',
    videoEyebrow: 'Growth walkthrough',
    videoTitle: 'WATCH THE\nNEXT BUILD\nLAYER',
    videoBody: 'See how Growth adds website depth, AI assistant coverage, and SEO structure so the public-facing layer feels more complete and easier to trust.',
    videoImage: '../assets/funnel-images/team-automation-dashboard-review-wide.png',
    videoAlt: 'Team reviewing multi-page website and AI assistant growth strategy.',
    videoKicker: 'Package overview',
    videoHeading: 'Growth Package',
    marquee: [
      { text: 'More page depth', accent: true },
      { text: 'Search-ready structure', accent: false },
      { text: 'AI assistant across the journey', accent: true },
      { text: 'Built for service businesses', accent: false },
      { text: 'Clearer next-stage trust', accent: true },
    ],
    featureEyebrow: 'Included',
    featureTitle: 'WHAT GROWTH\nADDS TO THE\nSYSTEM',
    featureCards: [
      { title: 'Multi-page website', body: 'A fuller public-facing structure with homepage, service pages, and supporting business pages.' },
      { title: 'SEO structure', body: 'A stronger site architecture so the business is more discoverable and easier for search to understand.' },
      { title: 'Broader AI assistant', body: 'The assistant supports more questions across more pages instead of only handling a small first layer.' },
      { title: 'Authority support', body: 'Growth is better suited to businesses that need more credibility, clearer explanation, and wider public trust.' },
      { title: 'Service clarity', body: 'More space to explain what you do, who it is for, and how the next step should work.' },
      { title: 'Expansion-ready base', body: 'Growth gives the business a cleaner platform for adding call, booking, or content systems later.' },
    ],
    trustImage: '../assets/funnel-images/team-automation-dashboard-review-wide.png',
    trustImageAlt: 'Team reviewing growth-stage website and AI assistant system planning.',
    trustEyebrow: 'Why it matters',
    trustTitle: 'GROWTH IS\nFOR BUSINESSES\nREADY TO LOOK BIGGER',
    trustBody: 'When the business needs more authority, stronger search visibility, and a fuller front door, Growth creates a better platform than trying to stretch a starter build too far.',
    processEyebrow: 'The process',
    processTitle: 'FROM BASIC\nWEB PRESENCE TO\nA STRONGER SYSTEM',
    processRows: [
      { title: 'Structure review', stage: 'Discovery', body: 'We review the website, service structure, and where more public-facing clarity is required.' },
      { title: 'Page architecture', stage: 'Design', body: 'We map the expanded page set, search structure, and assistant coverage across the website.' },
      { title: 'System build', stage: 'Implementation', body: 'We build the multi-page site, assistant logic, and supporting layers that make Growth feel complete.' },
      { title: 'Quality review', stage: 'Quality control', body: 'We test the page flow, service clarity, assistant behaviour, and CTA pathways across the site.' },
      { title: 'Launch + refine', stage: 'Go live', body: 'Once live, Growth becomes the stronger foundation for content, booking, call, or deeper AI expansion.' },
    ],
    pricingEyebrow: 'Package pricing',
    pricingTitle: 'CLEAR AI.\nBUILT TO\nGROW SMARTER.',
    pricingBody: 'Growth is the right next step for businesses that need a more complete digital front office without jumping straight into the largest package.',
    pricingCards: [
      { badge: 'Previous step', title: 'Starter Package', price: 'from $1,500', bullets: ['One-page website', 'First assistant layer', 'Basic front door', 'Best for first-stage builds'], cta: 'See Starter', href: calendlyHref },
      { badge: 'Recommended', title: 'Growth Package', price: 'from $2,500', bullets: ['Multi-page website', 'Homepage + service pages', 'SEO structure', 'Expanded AI assistant'], cta: 'Start This Package', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Premium Package', price: 'from $4,500', bullets: ['Everything in Growth', 'Call agent layer', 'Authority video support', 'Broader automation stack'], cta: 'See Premium', href: calendlyHref },
    ],
    bonusEyebrow: 'Limited bonus',
    bonusTitle: 'FREE GROWTH\nSTRUCTURE REVIEW\nTHIS WEEK',
    bonusBody: 'Book your demo and we will outline which pages, visibility layers, and assistant logic your next-stage website should include.',
    bonusCta: 'Book the Free Demo',
    faqEyebrow: 'Common questions',
    faqTitle: 'QUESTIONS\nBEFORE YOU\nMOVE INTO GROWTH',
    faqs: sharedFaqs.package,
    finalEyebrow: 'Ready to start?',
    finalTitle: "LET'S BUILD\nYOUR GROWTH\nPACKAGE.",
    finalBody: 'Book a free demo and we will show you whether Growth is the right next-stage build for your business.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'packages/premium/index.html',
    pageTitle: 'Premium Package | The Future Studio',
    metaDescription: 'The Premium Package brings together website, AI assistant, call agent, and authority content for a more complete AI-powered front office.',
    heroEyebrow: 'Product package',
    heroTitle: 'PREMIUM\nPACKAGE',
    heroBody: 'Best for businesses that want a more complete AI-powered front office: stronger website, assistant support, call handling, and monthly authority content working together.',
    primaryCta: 'Book a Free Demo',
    secondaryCta: 'WhatsApp About Premium',
    stats: [
      { value: 'FULL', label: 'front office', benefit: 'Most complete package', className: 'count-cyan' },
      { value: 'CALL', label: 'voice layer', benefit: 'AI call support included', className: 'count-violet' },
      { value: '4-7', label: 'week window', benefit: 'System active in weeks', className: 'count-dark' },
      { value: 'VIDEO', label: 'authority layer', benefit: 'Monthly visibility support', className: 'count-cyan' },
      { value: 'PREM', label: 'best fit', benefit: 'For businesses ready to scale fully', className: 'count-violet' },
    ],
    demoEyebrow: 'Package snapshot',
    demoTitle: 'SEE WHAT\nPREMIUM\nUNLOCKS',
    demoBody: 'Premium is for businesses that want the website, assistant, call layer, and authority content working together as one stronger operating front office.',
    demoNotes: ['Multi-page web + assistant', 'Call agent included', 'Monthly authority content support'],
    demoShellLabel: 'Premium package snapshot',
    demoTopTitle: 'Premium package stack',
    demoTopPill: 'FULL SYSTEM',
    demoMessages: [
      { role: 'assistant', text: 'Premium is built for businesses that want the most complete front office version from the start instead of layering everything slowly over time.' },
      { role: 'user', text: 'It is ideal when website, enquiries, calls, and visibility all need to improve together rather than one by one.' },
    ],
    demoFooterTitle: 'Best for complete front-office transformation',
    demoFooterCta: 'Book a Free Demo',
    videoEyebrow: 'Premium walkthrough',
    videoTitle: 'WATCH THE\nFULL FRONT\nOFFICE LAYER',
    videoBody: 'See how Premium combines stronger digital trust, assistant support, call handling, and authority content into one more complete system.',
    videoImage: '../assets/funnel-images/ai-systems-workshop-presentation-wide.png',
    videoAlt: 'AI systems workshop and premium implementation presentation.',
    videoKicker: 'Package overview',
    videoHeading: 'Premium Package',
    marquee: [
      { text: 'Complete AI front office', accent: true },
      { text: 'Website + assistant + calls', accent: false },
      { text: 'Authority content support', accent: true },
      { text: 'Built for serious growth', accent: false },
      { text: 'Most complete package', accent: true },
    ],
    featureEyebrow: 'Included',
    featureTitle: 'WHAT PREMIUM\nBRINGS TOGETHER',
    featureCards: [
      { title: 'Multi-page website', body: 'A stronger public-facing website structure designed to explain, convert, and scale trust.' },
      { title: 'AI assistant layer', body: 'A broader assistant supporting visitors, enquiries, and the first phase of qualification.' },
      { title: 'Call agent logic', body: 'AI call support for missed calls, qualification, routing, and cleaner intake.' },
      { title: 'Authority content support', body: 'A monthly content or video layer so the business stays visible while the system keeps converting.' },
      { title: 'Integrated front office', body: 'Premium works best when the business wants these layers thinking together, not acting like disconnected tools.' },
      { title: 'Scale-ready foundation', body: 'This package creates the strongest base for future reporting, dashboards, or deeper automation.' },
    ],
    trustImage: '../assets/funnel-images/ai-systems-workshop-presentation-wide.png',
    trustImageAlt: 'Premium AI systems strategy and workshop presentation.',
    trustEyebrow: 'Why it matters',
    trustTitle: 'PREMIUM IS\nFOR BUSINESSES\nTHAT WANT IT CONNECTED',
    trustBody: 'Instead of fixing the website now, the calls later, and content someday, Premium gives the business a stronger front office in one coordinated move.',
    processEyebrow: 'The process',
    processTitle: 'FROM SEPARATE\nTOOLS TO A\nSTRONGER FRONT OFFICE',
    processRows: [
      { title: 'System review', stage: 'Discovery', body: 'We review website, enquiries, calls, content, and what should be connected first.' },
      { title: 'Architecture map', stage: 'Design', body: 'We define how the public-facing website, assistant, call, and content layers should work together.' },
      { title: 'Package build', stage: 'Implementation', body: 'We build the connected layers in a way that supports the business now and leaves room for future growth.' },
      { title: 'Cross-layer QA', stage: 'Quality control', body: 'We test how the website, assistants, calls, and message pathways connect before launch.' },
      { title: 'Launch + support', stage: 'Go live', body: 'Once live, Premium gives the business a more complete AI operating front office that can keep expanding.' },
    ],
    pricingEyebrow: 'Package pricing',
    pricingTitle: 'CLEAR AI.\nBUILT AS A\nFULL FRONT OFFICE.',
    pricingBody: 'Premium is the strongest option for businesses that already know they need the web, assistant, call, and authority layers working together.',
    pricingCards: [
      { badge: 'Previous step', title: 'Growth Package', price: 'from $2,500', bullets: ['Multi-page website', 'SEO structure', 'Expanded assistant', 'Great next-stage build'], cta: 'See Growth', href: calendlyHref },
      { badge: 'Recommended', title: 'Premium Package', price: 'from $4,500', bullets: ['Everything in Growth', 'AI call agent', 'Authority video/content support', 'More complete front office'], cta: 'Start This Package', href: calendlyHref, featured: true },
      { badge: 'Custom', title: 'Premium + Dashboards', price: 'from $6,500', bullets: ['Premium package base', 'Internal dashboard layer', 'Deeper automation logic', 'Custom reporting expansion'], cta: 'Discuss Scope', href: calendlyHref },
    ],
    bonusEyebrow: 'Limited bonus',
    bonusTitle: 'FREE PREMIUM\nSYSTEM MAP\nTHIS WEEK',
    bonusBody: 'Book your demo and we will outline the first front-office architecture your business should build before we scope the full package.',
    bonusCta: 'Book the Free Demo',
    faqEyebrow: 'Common questions',
    faqTitle: 'QUESTIONS\nBEFORE YOU\nBUILD PREMIUM',
    faqs: sharedFaqs.package,
    finalEyebrow: 'Ready to start?',
    finalTitle: "LET'S BUILD\nYOUR PREMIUM\nPACKAGE.",
    finalBody: 'Book a free demo and we will show you whether Premium is the right full front-office move for your business.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
];

const academyPage = {
  output: 'academy/index.html',
  pageTitle: 'Join The Future Studio Academy | The Future Studio',
  metaDescription: 'Join The Future Studio Academy for practical AI programs, workshops, studio passes, and full guided learning built around real business use.',
  heroEyebrow: 'AI programs & pricing',
  heroTitle: 'JOIN THE\nFUTURE STUDIO\nACADEMY',
  heroBody: 'Live programs designed to give you real AI skills, practical workflows, and studio-level guidance without generic fluff or abstract theory.',
  primaryCta: 'Book a Free Demo',
  secondaryCta: 'WhatsApp About The Academy',
  stats: [
    { value: 'LIVE', label: 'program format', benefit: 'Real-time guided learning', className: 'count-cyan' },
    { value: 'EN/ES', label: 'delivery mode', benefit: 'Bilingual by design', className: 'count-violet' },
    { value: 'REAL', label: 'skills focus', benefit: 'Built for practical use', className: 'count-dark' },
    { value: 'FLEX', label: 'entry options', benefit: 'Workshop, pass, or full program', className: 'count-cyan' },
    { value: 'YOURS', label: 'takeaways', benefit: 'Templates, workflows, and guidance', className: 'count-violet' },
  ],
  demoEyebrow: 'Academy snapshot',
  demoTitle: 'SEE THE\nLEARNING\nFORMAT',
  demoBody: 'The Academy is for people and teams who want to learn how to use AI practically, with the same design-led and implementation-aware thinking behind The Future Studio systems.',
  demoNotes: ['Single workshop', 'Studio pass', 'Full studio program'],
  demoShellLabel: 'Future Studio Academy snapshot',
  demoTopTitle: 'Academy program stack',
  demoTopPill: 'LIVE LEARNING',
  demoMessages: [
    { role: 'assistant', text: 'The Academy is designed to turn interest in AI into practical skills, clearer workflows, and stronger implementation confidence.' },
    { role: 'user', text: 'It works for founders, operators, creatives, and teams who want applied learning rather than generic surface-level content.' },
  ],
  demoFooterTitle: 'Best for practical AI skill-building',
  demoFooterCta: 'Book a Free Demo',
  videoEyebrow: 'Academy walkthrough',
  videoTitle: 'WATCH THE\nPROGRAM\nLOGIC',
  videoBody: 'See how the Academy is structured, which learning formats exist, and how each program is designed to help people apply AI in real work.',
  videoImage: '../assets/funnel-images/founder-ai-learning-workflow-wide.png',
  videoAlt: 'Founder teaching AI learning workflow at a desk with laptop and tablet.',
  videoKicker: 'Academy overview',
  videoHeading: 'The Future Studio Academy',
  marquee: [
    { text: 'Taught live', accent: true },
    { text: 'Bilingual', accent: false },
    { text: 'No templates', accent: true },
    { text: 'Real workflows', accent: false },
    { text: 'Practical AI guidance', accent: true },
    { text: 'Built for business and creative work', accent: false },
  ],
  featureEyebrow: 'Academy tracks',
  featureTitle: 'WHAT YOU\nCAN LEARN\nINSIDE',
  featureCards: [
    { title: 'AI: Design, Branding & AI', body: 'Create complete brand identities from concept to presentation using traditional design and AI tools.' },
    { title: 'AI for Creatives & Business', body: 'Build and launch your brand using AI to design visual identity, create websites, and automate marketing.' },
    { title: 'AI Portfolio & Personal Branding', body: 'Design, write, and build your professional creative identity using AI to refine presentation and craft narratives.' },
    { title: 'AI Visual Storytelling & Branding', body: 'Master AI-powered motion design with storyboarding, animation, and sound to craft cinematic brand narratives.' },
    { title: 'Workflow Design', body: 'Learn how to build practical AI workflows that connect prompts, systems, and business operations more intelligently.' },
    { title: 'Implementation Thinking', body: 'Understand how to move from AI curiosity into real systems, cleaner decisions, and stronger execution.' },
  ],
  trustImage: '../assets/funnel-images/founder-ai-learning-workflow-wide.png',
  trustImageAlt: 'Founder teaching AI workflow concepts with laptop and tablet.',
  trustEyebrow: 'Why it matters',
  trustTitle: 'THE ACADEMY\nIS BUILT FOR\nREAL APPLICATION',
  trustBody: 'A lot of AI education stays abstract. The Future Studio Academy is designed to make the learning useful fast, so the work, business, or creative practice actually changes after the session.',
  processEyebrow: 'The process',
  processTitle: 'HOW THE\nACADEMY\nWORKS',
  processRows: [
    { title: 'Choose your format', stage: 'Discovery', body: 'Start with a single workshop, a studio pass, or the full guided program depending on how much depth you need.' },
    { title: 'Select the right track', stage: 'Design', body: 'Pick the area that matters most now: design, business workflows, storytelling, branding, or implementation thinking.' },
    { title: 'Learn live', stage: 'Implementation', body: 'Sessions are built for real-time learning, practical examples, and guided application rather than passive theory.' },
    { title: 'Apply the work', stage: 'Quality control', body: 'Use the templates, frameworks, and studio guidance to shape your own outputs with clearer quality standards.' },
    { title: 'Keep building', stage: 'Go live', body: 'Move into deeper Academy formats or implementation work once the first learning layer is already active in your work.' },
  ],
  pricingEyebrow: 'Academy formats',
  pricingTitle: 'PICK THE\nFORMAT THAT\nFITS YOUR STAGE.',
  pricingBody: 'Choose the right level of access now: a focused workshop, a repeated studio learning format, or a deeper guided journey.',
  pricingCards: [
    { badge: 'Workshop', title: 'Single Workshop', price: 'from $175', bullets: ['1 live studio session', 'Topic-specific guidance', 'Session recording', 'Selected templates'], cta: 'Enroll Now', href: calendlyHref },
    { badge: 'Recommended', title: 'Studio Pass', price: 'from $499', bullets: ['4 live studio sessions', 'Session recordings', 'Module-specific templates', 'Community access'], cta: 'Enroll Now', href: calendlyHref, featured: true },
    { badge: 'Advanced', title: 'Full Studio Program', price: 'from $1,500', bullets: ['Up to 8-10 live sessions', 'Guided progression', 'Personalised feedback', 'All templates and resources'], cta: 'Enroll Now', href: calendlyHref },
  ],
  bonusEyebrow: 'Limited bonus',
  bonusTitle: 'FREE ACADEMY\nFIT CALL\nTHIS WEEK',
  bonusBody: 'Book a free call and we will help you choose the right Academy format, track, and next step before you enroll.',
  bonusCta: 'Book the Free Demo',
  faqEyebrow: 'Common questions',
  faqTitle: 'QUESTIONS\nABOUT THE\nACADEMY',
  faqs: sharedFaqs.academy,
  finalEyebrow: 'Ready to start?',
  finalTitle: "LET'S BUILD\nYOUR AI\nCAPABILITY.",
  finalBody: 'Book a free call and we will help you choose the right Academy format or point you toward the best next step.',
  finalPrimaryCta: 'Book a Free Demo',
  finalSecondaryCta: 'WhatsApp Us',
};

for (const config of [...systemPages, ...packagePages, academyPage]) {
  const html = applyPageConfig(template, config);
  writeFile(config.output, html);
}
