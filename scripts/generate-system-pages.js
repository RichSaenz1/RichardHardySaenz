const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const templatePath = path.join(root, 'systems', 'voice-agent.html');
const calendlyHref = 'https://calendly.com/thefuturestudio-info/30min';
const whatsappHref = 'https://wa.me/50766753870?text=Hola%2C%20vi%20su%20sitio%20y%20me%20interesa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20IA%20para%20mi%20negocio.';
const emailHref = 'mailto:info@thefuturestudio.online';

const template = fs.readFileSync(templatePath, 'utf8');

function outputRootPrefix(relativeOutputPath) {
  const outputDir = path.dirname(relativeOutputPath).replace(/\\/g, '/');
  if (!outputDir || outputDir === '.') return './';
  const depth = outputDir.split('/').filter(Boolean).length;
  return '../'.repeat(depth);
}

function normalizeGeneratedPaths(html, config) {
  const rootPrefix = outputRootPrefix(config.output);
  const academyPath = `${rootPrefix}academy/`;

  return html
    .replace(/src="\.\.\/logo\.png"/g, `src="${rootPrefix}logo.png"`)
    .replace(/href="\.\.\/future-studio-favicon\.png"/g, `href="${rootPrefix}future-studio-favicon.png"`)
    .replace(/src="\.\.\/assets\//g, `src="${rootPrefix}assets/`)
    .replace(/poster="\.\.\/assets\//g, `poster="${rootPrefix}assets/`)
    .replace(/href="\.\.\/#([A-Za-z0-9_-]+)"/g, `href="${rootPrefix}#$1"`)
    .replace(/href="\.\.\/academy\/"/g, `href="${academyPath}"`)
    .replace(/href="\.\.\/systems\/voice-agent\.html"/g, `href="${rootPrefix}systems/voice-agent.html"`);
}

function injectGeneratedPolish(html) {
  const css = `

/* Generated subpage polish: keeps the system/package/academy pages aligned with the main landing page. */
.generated-subpage .hero{min-height:auto;overflow:hidden}
.generated-subpage .hero-body{padding:clamp(94px,10vw,148px) 0 72px}
.generated-subpage .hero-content{max-width:1220px;margin:0 auto}
.generated-subpage .hero-actions .btn-grad{background:linear-gradient(120deg,var(--cyan),var(--blue),var(--purple));color:var(--black);border:2px solid transparent}
.generated-subpage .hero-actions .btn-grad:hover,
.generated-subpage .final-cta .btn-dark:hover,
.generated-subpage .pricing-card .btn-grad:hover,
.generated-subpage .bonus-strip .btn-dark:hover{background:var(--white);color:var(--black);border-color:var(--black)}
.generated-subpage .section{padding:clamp(82px,8vw,132px) 0}
.generated-subpage .feature-grid{border-color:var(--cyan)}
.generated-subpage .feature-card{background:var(--white);color:var(--black);border-color:var(--cyan)}
.generated-subpage .feature-card:hover{background:linear-gradient(120deg,var(--cyan),var(--blue),var(--purple));box-shadow:10px 10px 0 var(--black)}
.generated-subpage .feature-card:hover .feature-num,
.generated-subpage .feature-card:hover .feature-title,
.generated-subpage .feature-card:hover .body-md{color:var(--black)}
.generated-subpage .btn-email-white{background:var(--white);color:var(--black);border:2px solid var(--black)}
.generated-subpage .btn-email-white:hover{background:var(--black);color:var(--white)}
.generated-subpage .site-footer{background:var(--black);color:var(--white)}
.generated-subpage .footer-logo img{height:92px;width:auto;object-fit:contain;filter:invert(1)}
@media (max-width: 760px){
  .generated-subpage .hero-body{padding:70px 0 44px}
  .generated-subpage .hero-content{text-align:center}
  .generated-subpage .hero-eyebrow{justify-content:center}
  .generated-subpage .hero-actions{justify-content:center}
  .generated-subpage .footer-logo img{height:76px}
}
`;

  let next = html.replace('</style>', `${css}\n</style>`);
  next = next.replace(/<body class="([^"]*)">/, '<body class="$1 generated-subpage">');
  next = next.replace('<body>', '<body class="generated-subpage">');
  return next;
}

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
  const lines = title.split('\n');
  return lines
    .map((line, index) => {
      const isLast = index === lines.length - 1;
      return `<span class="line"><span${isLast ? ' class="grad"' : ''}>${line}</span></span>`;
    })
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

function normalizedPrimaryCta(config) {
  if (!config.primaryCta) return 'Book a Free Demo';
  return /^watch\b/i.test(config.primaryCta) ? 'Book a Free Demo' : config.primaryCta;
}

function renderFeatureCards(cards) {
  return cards.map((card, index) => `
        <article class="feature-card">
          <div class="feature-num">${String(index + 1).padStart(2, '0')}</div>
          <h3 class="feature-title" ${attrPair(dual(card.title))}>${card.title}</h3>
          <p class="body-md" ${attrPair(dual(card.body))}>${card.body}</p>
        </article>`).join('');
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
  const primaryCta = normalizedPrimaryCta(config);
  const hero = `<section class="hero" id="hero">
    <div class="orb hero-orb-1"></div>
    <div class="orb hero-orb-2"></div>
    <div class="orb hero-orb-3"></div>
    <div class="hero-body">
      <div class="wrap">
        <div class="hero-content">
          <div class="hero-eyebrow">
            <span class="hero-eyebrow-line"></span>
            <span class="eyebrow" ${attrPair(dual(config.heroEyebrow))}>${config.heroEyebrow}</span>
          </div>
          <h1 class="hero-h1 headline-xl">${heroTitleHtml(config.heroTitle)}</h1>
          <div class="hero-bottom">
            <p class="hero-desc" ${attrPair(dual(config.heroBody))}>${config.heroBody}</p>
            <div class="hero-actions">
              <a href="${config.primaryHref || calendlyHref}" target="_blank" rel="noopener" class="btn btn-grad btn-lg" ${attrPair(dual(primaryCta))}>${primaryCta}</a>
              <a href="${config.secondaryHref || whatsappHref}" target="_blank" rel="noopener" class="btn btn-outline-dark btn-whatsapp" ${attrPair(dual(config.secondaryCta))}>${config.secondaryCta}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    ${heroStats(config.stats)}
  </section>`;

  const liveDemo = '';

  const video = '';

  const marquee = `<div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      ${[...config.marquee, ...config.marquee].map((item) => `<span class="${item.accent ? 'accent' : ''}">${item.text}</span>`).join('')}
    </div>
  </div>`;

  const features = `<section class="section" id="features">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow" ${attrPair(dual(config.featureEyebrow))}>${config.featureEyebrow}</p>
          <h2 class="headline-lg" ${attrPair(dual(config.featureTitle))}>${processHtmlText(config.featureTitle)}</h2>
        </div>
      </div>
      <div class="feature-grid">
        ${renderFeatureCards(config.featureCards)}
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
        <a href="${emailHref}" class="btn btn-email-white" data-en="Email Us" data-es="Escribenos">Email Us</a>
      </div>
    </div>
  </section>`;

  return { hero, liveDemo, video, marquee, features, process, pricing, bonus, faq, cta };
}

function applyPageConfig(baseHtml, config) {
  let html = baseHtml;
  const rootPrefix = outputRootPrefix(config.output);

  const sections = buildSystemSections(config);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${config.pageTitle}</title>`);
  html = html.replace(/<meta name="description" content="[\s\S]*?">/, `<meta name="description" content="${escapeAttr(config.metaDescription)}">`);
  html = html.replace(/<meta property="og:title" content="[\s\S]*?">/g, '');
  html = html.replace(/<meta property="og:description" content="[\s\S]*?">/g, '');
  html = html.replace(/<meta name="twitter:title" content="[\s\S]*?">/g, '');
  html = html.replace(/<meta name="twitter:description" content="[\s\S]*?">/g, '');

  html = html.replace(/>\s*Courses\s*</g, '>Academy<');
  html = html.replace(/>\s*AI Courses\s*</g, '>Academy<');
  html = html.replace(/data-en="Courses"/g, 'data-en="Academy"');
  html = html.replace(/data-es="Cursos"/g, 'data-es="Academia"');
  html = html.replace(/data-en="AI Courses"/g, 'data-en="Academy"');
  html = html.replace(/data-es="Cursos IA"/g, 'data-es="Academia"');
  html = html.replace(/\.\.\/#courses-section/g, `${rootPrefix}academy/`);

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

  return normalizeGeneratedPaths(injectGeneratedPolish(html), config);
}

const sharedFaqs = {
  system: [
    { q: 'What exactly do we receive?', a: 'You receive a working AI system built around one clear business bottleneck: response, booking, follow-up, content, reporting, or lead handling. The exact deliverables depend on the page, but every build includes discovery, system design, implementation, testing, and a launch handover.' },
    { q: 'How tailored is the system to our business?', a: 'Each build starts by mapping your real offer, current workflow, team handoff, customer questions, and the moments where leads usually stall. The category gives you a starting point; the installed system is shaped around how your business actually sells, books, or follows up.' },
    { q: 'Can this connect to tools we already use?', a: 'Usually yes. We prefer using your existing website, WhatsApp, forms, calendars, CRM, email, or spreadsheets where possible. New tools are only added when they make the system clearer, faster, or easier for your team to run.' },
    { q: 'Is this bilingual?', a: 'Yes. We can build in English, Spanish, or a bilingual flow so the system speaks to your market and hands information to your team in the format they need.' },
    { q: 'How long does the first version usually take?', a: 'Most first versions are scoped, built, tested, and launched in roughly 7-21 days once the workflow, assets, and integrations are confirmed. Larger systems can expand in phases after the first useful version is live.' },
    { q: 'Will we own what gets built?', a: 'Yes. The aim is to give your business a practical system it can run, understand, refine, and expand. We avoid black-box builds that leave you dependent on mystery logic or generic templates.' },
    { q: 'What happens after launch?', a: 'We review the system in real use, identify weak points, and recommend the next improvement layer. That can be optimisation, reporting, a second automation flow, or simply leaving the first version to work before adding more.' },
  ],
  package: [
    { q: 'What is the difference between the packages?', a: 'Starter gives you a professional front door and first AI response layer. Growth adds more website depth, search structure, and a stronger assistant. Premium combines the public website, AI assistant, call support, and authority content into a more complete AI front office.' },
    { q: 'What do we actually receive?', a: 'You receive the mapped pages, assistant logic, handoff structure, launch setup, and walkthrough needed for your team to use the package. Each package page shows the core deliverables, and the discovery call confirms what should be included for your specific business.' },
    { q: 'Can we upgrade later?', a: 'Yes. The packages are staged intentionally. You can start with the smallest useful version, prove the first layer, and then move into Growth or Premium when the next bottleneck is obvious.' },
    { q: 'Do packages include strategy?', a: 'Yes. Every package starts with discovery so the page structure, assistant flows, and system logic fit your business instead of acting like a generic template.' },
    { q: 'What if we already have part of this?', a: 'That is useful. We can keep the parts that already work, repair the weak points, and only build the missing layers instead of replacing everything for no reason.' },
    { q: 'How long does launch take?', a: 'Most package builds begin with a 7-21 day first phase, then expand depending on content, integrations, approvals, and the scope selected.' },
    { q: 'Will this be bilingual?', a: 'It can be. The Future Studio supports English, Spanish, or bilingual structures depending on the audience you serve and how your team works.' },
  ],
  academy: [
    { q: 'What do I receive inside the Academy?', a: 'You receive live instruction, practical examples, selected templates, workflow guidance, and a clearer way to apply AI to real creative or business work. The exact depth depends on whether you choose a workshop, studio pass, or full program.' },
    { q: 'Is the Academy for beginners or advanced teams?', a: 'Both. Beginners get a clear path into practical AI use, while more advanced users can focus on workflows, branding, content systems, automation thinking, and implementation quality.' },
    { q: 'Do I need technical experience?', a: 'No. The Academy is designed around applied use, creative direction, business workflows, and practical decision-making rather than coding-first complexity.' },
    { q: 'Are sessions live or self-paced?', a: 'The Academy focuses on live formats first: single workshop, studio pass, and full studio program. Recordings and materials depend on the chosen format.' },
    { q: 'Can I join in English or Spanish?', a: 'Yes. The Academy is structured for English, Spanish, and bilingual delivery where needed.' },
    { q: 'Can a company book team training?', a: 'Yes. Teams can use the Academy as a learning layer before, during, or after implementation so the people inside the business understand how to use AI properly.' },
    { q: 'Which format should I choose first?', a: 'Choose a Single Workshop if you want one focused result, Studio Pass if you want repeated guided sessions, and Full Studio Program if you want a deeper transformation across multiple workflows.' },
  ],
};

const systemPages = [
  {
    output: 'systems/website-ai-assistant/index.html',
    pageTitle: 'Website + AI Assistant | The Future Studio',
    metaDescription: 'A conversion-focused website paired with an AI assistant that answers questions, captures leads, and moves visitors into the next step.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'WEBSITE +\nAI ASSISTANT',
    heroBody: 'A conversion-focused website plus an AI assistant that explains your services, answers common questions, captures contact details, and routes serious enquiries into the right next step.',
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
    demoBody: 'This build gives your business a clearer digital front door: a website that explains the offer properly and an assistant that keeps visitors engaged when they need answers before contacting you.',
    demoNotes: ['Conversion-focused structure', 'Assistant-trained FAQs', 'Lead capture + WhatsApp handoff'],
    demoShellLabel: 'Website and AI assistant system snapshot',
    demoTopTitle: 'Website + assistant stack',
    demoTopPill: 'LIVE READY',
    demoMessages: [
      { role: 'assistant', text: 'Homepage, service pages, FAQs, lead capture, and next-step logic are mapped together so the website sells clearly while the assistant supports the first conversation.' },
      { role: 'user', text: 'Choose this if your current website looks fine but visitors still leave confused, unqualified, or unsure what to do next.' },
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
      { title: 'Clinics', body: 'Help patients understand services, insurance or appointment requirements, opening hours, and the right next step before the phone rings.' },
      { title: 'Consultants', body: 'Explain your offer, answer fit questions, and qualify discovery enquiries before your calendar fills with weak calls.' },
      { title: 'Education', body: 'Guide families, students, or applicants toward the right program, intake form, or conversation without losing trust.' },
      { title: 'Real estate', body: 'Answer property questions, collect buyer or renter context, and route serious enquiries into the correct callback path.' },
      { title: 'Beauty brands', body: 'Clarify treatments, pricing expectations, availability, and booking steps so fewer prospects stall at the first question.' },
      { title: 'Professional firms', body: 'Turn a static website into a guided front door that explains services, qualifies intent, and protects serious enquiries.' },
    ],
    trustImage: '../assets/funnel-images/team-client-automation-strategy-wide.png',
    trustImageAlt: 'Business team reviewing website and assistant planning on laptop and phone.',
    trustEyebrow: 'Why it matters',
    trustTitle: 'YOUR WEBSITE\nSHOULD HANDLE\nMORE OF THE FIRST ASK',
    trustBody: 'Many service businesses do not need more traffic first. They need the people already arriving to understand the offer, trust the business, and know exactly how to move forward.',
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
      { badge: 'Starter', title: 'One-Page Website + Assistant', price: 'from $1,500', bullets: ['One premium homepage built around your offer', 'Clear copy structure and CTA path', 'Website AI assistant for common questions', 'Lead capture with WhatsApp or email handoff'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'Multi-Page Website + Assistant', price: 'from $2,500', bullets: ['Homepage plus core service pages', 'Search-ready page structure', 'Expanded assistant knowledge base', 'Clear routing for enquiries, bookings, or calls'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Web + Assistant + Visibility Layer', price: 'from $3,800', bullets: ['Fuller website and assistant system', 'FAQ, service, and handoff logic', 'Search and content structure', 'Optimisation roadmap for the next growth layer'], cta: 'Discuss Scope', href: calendlyHref },
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
    finalBody: 'Book a free demo and we will show you which website, assistant, and enquiry flow should be fixed first so your front door starts converting more clearly.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'systems/whatsapp-automation-agent/index.html',
    pageTitle: 'WhatsApp Automation Agent | The Future Studio',
    metaDescription: 'A WhatsApp automation system for first response, qualification, follow-up, booking support, and cleaner lead handoff.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'WHATSAPP\nAUTOMATION\nAGENT',
    heroBody: 'A WhatsApp response and follow-up system that replies quickly, asks the right questions, captures lead context, and hands serious enquiries to your team before they go cold.',
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
    demoBody: 'This build gives your business a reliable first-response layer inside WhatsApp, so new enquiries are acknowledged, filtered, and moved forward even when the team is busy.',
    demoNotes: ['Auto-replies with context', 'Qualification before human handoff', 'Follow-up flow built in'],
    demoShellLabel: 'WhatsApp automation system snapshot',
    demoTopTitle: 'WhatsApp automation stack',
    demoTopPill: 'ALWAYS ON',
    demoMessages: [
      { role: 'assistant', text: 'The agent greets the lead, answers common questions, collects intent, sorts urgency, and sends the conversation toward booking, callback, or human support.' },
      { role: 'user', text: 'Choose this if good enquiries arrive in WhatsApp but replies are late, inconsistent, or too dependent on someone remembering to follow up.' },
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
    trustBody: 'A lot of demand is lost because the first WhatsApp message sits too long, gets answered inconsistently, or never turns into a clear next step. This system protects that first moment.',
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
    pricingBody: 'Choose the level that fits how much WhatsApp currently handles for your business: first response only, response plus follow-up, or a fuller sales and support flow.',
    pricingCards: [
      { badge: 'Starter', title: 'WhatsApp First Response Flow', price: 'from $900', bullets: ['Automated welcome and first reply', 'Answers to common customer questions', 'Basic qualification questions', 'Human handoff with lead context'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'WhatsApp + Follow-Up Agent', price: 'from $1,800', bullets: ['Everything in the first-response flow', 'Follow-up reminders for silent leads', 'Booking, CRM, or form routing', 'Conversation summary for your team'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'WhatsApp Sales + Support Flow', price: 'from $3,000', bullets: ['Multiple enquiry paths by service or intent', 'Sales and support routing rules', 'Team notifications and escalation logic', 'Optimisation based on real conversations'], cta: 'Discuss Scope', href: calendlyHref },
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
    finalBody: 'Book a free demo and we will show you exactly which WhatsApp replies, questions, and handoffs should be automated first so fewer enquiries slip away.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'systems/booking-agent/index.html',
    pageTitle: 'Booking Agent | The Future Studio',
    metaDescription: 'An AI booking agent for appointment businesses that need clearer scheduling, confirmation, rescheduling, and fewer missed opportunities.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'BOOKING\nAGENT',
    heroBody: 'A booking and reminder system that guides enquiries from interest to confirmed appointment, answers scheduling questions, and reduces the manual back-and-forth your team handles every week.',
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
    demoBody: 'This build helps convert interest into confirmed appointments by handling booking questions, reminders, reschedules, and calendar handoff with less back-and-forth.',
    demoNotes: ['Booking logic + reminders', 'Reschedule-aware flows', 'Cleaner calendar handoff'],
    demoShellLabel: 'Booking agent system snapshot',
    demoTopTitle: 'Booking flow system',
    demoTopPill: 'ACTIVE',
    demoMessages: [
      { role: 'assistant', text: 'The booking agent collects appointment intent, confirms key details, supports reminders, and routes the person into the correct scheduling path.' },
      { role: 'user', text: 'Choose this if your team spends too much time confirming, rescheduling, reminding, or chasing people who already wanted to book.' },
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
      { title: 'Clinics', body: 'Handle appointment requests, intake questions, confirmations, and reminders without forcing staff to chase every booking manually.' },
      { title: 'Beauty & wellness', body: 'Protect booking demand during busy periods, reduce missed confirmations, and make reschedules feel controlled instead of chaotic.' },
      { title: 'Consultants', body: 'Move serious discovery enquiries into confirmed calls faster and reduce admin drag between interest and meeting.' },
      { title: 'Education', body: 'Coordinate consultations, campus visits, parent calls, or enrolment conversations with less back-and-forth.' },
      { title: 'Professional services', body: 'Keep scheduling professional and structured before the first live conversation, especially when timing and preparation matter.' },
      { title: 'High-volume enquiry teams', body: 'Reduce repetitive calendar friction so the team can focus on higher-value conversations instead of constant scheduling admin.' },
    ],
    trustImage: '../assets/funnel-images/calendar-dashboard-workspace-wide.png',
    trustImageAlt: 'Team reviewing booking calendar automation and scheduling system.',
    trustEyebrow: 'Why it matters',
    trustTitle: 'SCHEDULING\nSHOULD NOT BE\nTHE BOTTLENECK',
    trustBody: 'Many businesses do the hard part and generate the enquiry, then lose momentum in the easy part: confirming a time. A cleaner booking flow protects revenue and saves admin energy.',
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
    pricingBody: 'Choose the level of booking support your business needs now: one clear booking path, booking plus reminders, or a deeper multi-service scheduling layer.',
    pricingCards: [
      { badge: 'Starter', title: 'Booking Flow Foundation', price: 'from $1,100', bullets: ['One primary booking path', 'Confirmation message flow', 'Reminder-ready structure', 'Admin handoff with appointment details'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'Booking + Reminder System', price: 'from $2,100', bullets: ['Multiple booking scenarios', 'Reschedule and cancellation logic', 'Reminder sequence to reduce no-shows', 'Calendar or booking tool connection'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Multi-Service Booking Layer', price: 'from $3,400', bullets: ['Multiple services, staff, or locations', 'Advanced rules and staff routing', 'No-show recovery prompts', 'Booking performance visibility'], cta: 'Discuss Scope', href: calendlyHref },
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
    finalBody: 'Book a free demo and we will map the booking, reminder, or rescheduling flow that would save your team the most time and protect the most appointments first.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'systems/lead-pipeline-automation/index.html',
    pageTitle: 'Lead Pipeline Automation | The Future Studio',
    metaDescription: 'A lead pipeline automation system for capture, qualification, follow-up, scoring, and clearer visibility across enquiries.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'LEAD PIPELINE\nAUTOMATION',
    heroBody: 'For businesses already generating enquiries but losing momentum because leads are not captured, qualified, followed up, or viewed in one clear pipeline.',
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
    pricingBody: 'Choose how much of the lead journey you want built: the first capture layer, the follow-up pipeline, or the recovery dashboard that shows what is happening across the full sales flow.',
    pricingCards: [
      { badge: 'Starter', title: 'Lead Capture Foundation', price: 'from $1,400', bullets: ['Lead intake form or message flow that captures details', 'Basic qualification so weak and strong leads are separated', 'Instant notification to the right person', 'First follow-up message so new enquiries do not go quiet'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'Follow-Up + Pipeline System', price: 'from $2,600', bullets: ['Lead stages that show where every enquiry sits', 'Simple scoring based on urgency, fit, and next action', 'Automated follow-up for leads that stop replying', 'Team handoff rules so ownership is clear'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Sales Recovery Dashboard', price: 'from $4,200', bullets: ['Capture from calls, forms, WhatsApp, and email', 'Advanced scoring and lost-lead visibility', 'Dashboard showing opportunities and follow-up status', 'Ongoing optimisation based on real pipeline data'], cta: 'Discuss Scope', href: calendlyHref },
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
    finalBody: 'Book a free demo and we will show you which part of your lead journey should be systemised first: capture, follow-up, or recovery visibility.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'systems/ai-content-agent/index.html',
    pageTitle: 'AI Content Agent | The Future Studio',
    metaDescription: 'An AI content agent that turns internal clarity into content planning, production support, and more consistent publishing.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'AI CONTENT\nAGENT',
    heroBody: 'For businesses that need consistent authority content but do not want content planning, prompts, post ideas, and publishing rhythm to depend on random inspiration.',
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
    demoBody: 'Use this build when content matters for trust, but the team needs a clearer system for ideas, messaging, repurposing, and consistent output that still sounds like the business.',
    demoNotes: ['Topic planning support', 'Offer-aligned prompts', 'Authority content flow'],
    demoShellLabel: 'AI content agent snapshot',
    demoTopTitle: 'Content agent stack',
    demoTopPill: 'PLANNING',
    demoMessages: [
      { role: 'assistant', text: 'The content agent turns business clarity into themes, post ideas, prompts, captions, repurposing angles, and publishing support without losing the brand voice.' },
      { role: 'user', text: 'This works best when the team knows content drives trust but still struggles to create consistently, strategically, or fast enough.' },
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
    pricingBody: 'Choose the level of content support your business needs now: planning and prompts, repurposing workflow, or a deeper authority content engine.',
    pricingCards: [
      { badge: 'Starter', title: 'Content Planning Agent', price: 'from $900', bullets: ['Audience and offer theme map', 'Reusable prompt library', 'Post angle and caption support', 'Simple publishing structure'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'Content + Repurposing System', price: 'from $1,800', bullets: ['Everything in the planning agent', 'Repurposing workflow for existing ideas', 'Platform-aware prompts and formats', 'Weekly or monthly visibility rhythm'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Authority Content Engine', price: 'from $3,200', bullets: ['Multi-format content logic', 'Campaign and launch support', 'Publishing system for recurring output', 'Ongoing optimisation of themes and prompts'], cta: 'Discuss Scope', href: calendlyHref },
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
    finalBody: 'Book a free demo and we will show you the first content workflow your business should build so the team can publish with more consistency and less blank-page stress.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'systems/marketing-video-system/index.html',
    pageTitle: 'Marketing Video System | The Future Studio',
    metaDescription: 'An AI-assisted marketing video system for short-form video production, scripting, asset planning, and campaign support.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'MARKETING\nVIDEO\nSYSTEM',
    heroBody: 'For brands that need more short-form video, stronger campaign assets, and a repeatable production workflow without rebuilding the process every time content is needed.',
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
    demoBody: 'This build is for brands that need campaign assets, authority clips, educational content, or recurring short-form output with clearer ideas, scripts, production priorities, and repurposing logic.',
    demoNotes: ['Concept + script layer', 'Short-form production logic', 'Repurposing-ready workflow'],
    demoShellLabel: 'Marketing video system snapshot',
    demoTopTitle: 'Video system stack',
    demoTopPill: 'CONTENT READY',
    demoMessages: [
      { role: 'assistant', text: 'The system helps shape concepts, hooks, scripts, AI visual prompts, shot priorities, and repeatable short-form output around your offer and audience.' },
      { role: 'user', text: 'It is best for businesses that need visible authority content but do not want production to stay slow, improvised, or unclear.' },
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
    pricingBody: 'Choose the level of video system your brand needs now: a starter short-form workflow, campaign support, or a deeper content engine for recurring output.',
    pricingCards: [
      { badge: 'Starter', title: 'Short-Form Video Starter', price: 'from $1,500', bullets: ['Video angle and hook planning', 'Script support for short-form clips', 'Production checklist and prompt flow', 'Repurposing-ready structure'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'Video + Campaign Support', price: 'from $2,800', bullets: ['Everything in the starter workflow', 'Campaign-ready script and asset structure', 'Authority content sequence support', 'Repeatable production logic for your team'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Video Content Engine', price: 'from $4,500', bullets: ['Advanced production workflow', 'Multi-format video and content system', 'Campaign asset layer across channels', 'Ongoing optimisation of angles and output'], cta: 'Discuss Scope', href: calendlyHref },
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
    finalBody: 'Book a free demo and we will show you the first video workflow your brand should build so content becomes easier to plan, produce, and repeat.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'systems/custom-apps-dashboards/index.html',
    pageTitle: 'Custom Apps & Dashboards | The Future Studio',
    metaDescription: 'Custom business apps and dashboards for tracking, admin flow, reporting, and the practical tools around your AI system.',
    heroEyebrow: 'Flagship system',
    heroTitle: 'CUSTOM APPS\n& DASHBOARDS',
    heroBody: 'For businesses that need a practical internal app or dashboard to manage enquiries, bookings, reporting, tasks, or AI workflow results without living inside scattered tools.',
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
    demoBody: 'Use this when the business needs one clearer internal place to see data, track work, manage handoffs, and act on leads, bookings, reports, or AI workflow outputs.',
    demoNotes: ['Internal workflow support', 'Custom reporting views', 'Built around real admin use'],
    demoShellLabel: 'Custom apps and dashboards snapshot',
    demoTopTitle: 'Operations app stack',
    demoTopPill: 'CONNECTED',
    demoMessages: [
      { role: 'assistant', text: 'The app layer gives the business a cleaner place to manage data, view performance, update records, and act on what matters instead of juggling scattered tabs.' },
      { role: 'user', text: 'This fits best when spreadsheets, inboxes, dashboards, or disconnected tools are slowing daily execution down.' },
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
    pricingBody: 'Choose the level of operating layer your business needs now: one focused dashboard, a custom workflow app, or a wider multi-team operations system.',
    pricingCards: [
      { badge: 'Starter', title: 'Internal Dashboard Starter', price: 'from $1,800', bullets: ['One focused dashboard for one key workflow', 'Practical reporting view for the team', 'Core fields and status tracking', 'Cleaner visibility without spreadsheet chaos'], cta: 'Reserve Build', href: whatsappHref },
      { badge: 'Recommended', title: 'Custom App + Dashboard', price: 'from $3,200', bullets: ['Custom workflow views and actions', 'Connected data layer where needed', 'Team-friendly update and handoff logic', 'Usability-first structure built around daily work'], cta: 'Book a Build Call', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Multi-Team Operations System', price: 'from $5,200', bullets: ['Multiple user views or departments', 'Advanced reporting and filters', 'Operational routing and permissions', 'Expansion-ready app logic for future systems'], cta: 'Discuss Scope', href: calendlyHref },
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
    finalBody: 'Book a free demo and we will show you the first dashboard or workflow view your business should build to reduce admin friction and make decisions clearer.',
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
    heroBody: 'Best for businesses that need a premium one-page website, a web assistant, and WhatsApp support so customers understand the offer and know exactly how to take the next step.',
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
    demoBody: 'Starter gives the business a cleaner public front door: one strong page, clearer sales structure, and first-response AI support on the website and WhatsApp without overbuilding too early.',
    demoNotes: ['Premium one-page website', 'Web AI assistant', 'WhatsApp AI assistant'],
    demoShellLabel: 'Starter package snapshot',
    demoTopTitle: 'Starter package stack',
    demoTopPill: 'ENTRY BUILD',
    demoMessages: [
      { role: 'assistant', text: 'Starter turns a weak or outdated digital front door into something clearer, more useful, and supported by practical AI responses.' },
      { role: 'user', text: 'It is best for businesses that want a professional first AI layer before investing in a larger front-office system.' },
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
    pricingBody: 'Starter is the right first move when the business needs a better website and first AI support before investing in deeper call, booking, content, or dashboard layers.',
    pricingCards: [
      { badge: 'Starter', title: 'Starter Package', price: 'from $1,500', bullets: ['Premium one-page website that explains the offer clearly', 'Conversion-focused page structure and CTA flow', 'Web AI assistant for first questions', 'WhatsApp AI assistant for first-response support'], cta: 'Start This Package', href: calendlyHref, featured: true },
      { badge: 'Next step', title: 'Growth Package', price: 'from $2,500', bullets: ['Multi-page website for more service depth', 'SEO-ready structure for stronger discovery', 'Expanded assistant layer across more pages', 'More authority and trust support'], cta: 'See Growth', href: calendlyHref },
      { badge: 'Advanced', title: 'Premium Package', price: 'from $4,500', bullets: ['Fuller AI front office', 'Call agent layer for missed calls and qualification', 'Authority video or content support', 'Broader AI stack working together'], cta: 'See Premium', href: calendlyHref },
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
    finalBody: 'Book a free demo and we will show you whether Starter is the right first move, what would be included, and what the business should avoid overbuilding too early.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'packages/growth/index.html',
    pageTitle: 'Growth Package | The Future Studio',
    metaDescription: 'The Growth Package combines a multi-page website, AI assistant, and SEO structure for businesses ready for a stronger digital front office.',
    heroEyebrow: 'Product package',
    heroTitle: 'GROWTH\nPACKAGE',
    heroBody: 'Best for businesses that need more than one page: clearer service pages, search-ready structure, and an AI assistant that supports visitors across a wider public-facing website.',
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
    demoBody: 'Growth is built for businesses that have outgrown the smallest front door and now need service depth, search structure, stronger trust, and better enquiry support across the site.',
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
    pricingBody: 'Growth is the right next step when the business needs a more complete website and AI assistant layer, but does not yet need the full call, video, and dashboard stack.',
    pricingCards: [
      { badge: 'Previous step', title: 'Starter Package', price: 'from $1,500', bullets: ['One-page website for a focused offer', 'First web and WhatsApp assistant layer', 'Clearer first digital front door', 'Best for first-stage builds'], cta: 'See Starter', href: calendlyHref },
      { badge: 'Recommended', title: 'Growth Package', price: 'from $2,500', bullets: ['Multi-page website with homepage and service pages', 'SEO-ready structure and clearer site architecture', 'Expanded AI assistant across the customer journey', 'More space for proof, FAQs, and conversion support'], cta: 'Start This Package', href: calendlyHref, featured: true },
      { badge: 'Advanced', title: 'Premium Package', price: 'from $4,500', bullets: ['Everything in Growth', 'AI call agent for missed calls and qualification', 'Authority video or content support', 'Broader front-office automation stack'], cta: 'See Premium', href: calendlyHref },
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
    finalBody: 'Book a free demo and we will show you whether Growth is the right next-stage build, which pages you actually need, and where the assistant should support visitors.',
    finalPrimaryCta: 'Book a Free Demo',
    finalSecondaryCta: 'WhatsApp Us',
  },
  {
    output: 'packages/premium/index.html',
    pageTitle: 'Premium Package | The Future Studio',
    metaDescription: 'The Premium Package brings together website, AI assistant, call agent, and authority content for a more complete AI-powered front office.',
    heroEyebrow: 'Product package',
    heroTitle: 'PREMIUM\nPACKAGE',
    heroBody: 'Best for businesses that want a more complete AI-powered front office: stronger website, assistant support, call handling, and authority content working together instead of as separate tools.',
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
    demoBody: 'Premium is for businesses that want the website, assistant, call layer, and authority content connected as one stronger front office for enquiries, trust, and follow-up.',
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
    pricingBody: 'Premium is the strongest option when the business already knows it needs the website, assistant, calls, and authority layer working together from the start.',
    pricingCards: [
      { badge: 'Previous step', title: 'Growth Package', price: 'from $2,500', bullets: ['Multi-page website and search structure', 'Expanded AI assistant', 'Stronger digital trust layer', 'Great next-stage build before calls and content'], cta: 'See Growth', href: calendlyHref },
      { badge: 'Recommended', title: 'Premium Package', price: 'from $4,500', bullets: ['Everything in Growth', 'AI call agent for missed calls and qualification', 'Authority video or content support', 'More complete AI front office'], cta: 'Start This Package', href: calendlyHref, featured: true },
      { badge: 'Custom', title: 'Premium + Dashboards', price: 'from $6,500', bullets: ['Premium package base', 'Internal dashboard or reporting layer', 'Deeper automation logic across the business', 'Custom reporting expansion for decision-making'], cta: 'Discuss Scope', href: calendlyHref },
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
    finalBody: 'Book a free demo and we will show you whether Premium is the right full front-office move, what should be included first, and what can wait.',
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
  heroBody: 'Live AI training for founders, creatives, and teams who want to use AI in real work: branding, websites, content, automation, visual storytelling, and implementation thinking.',
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
  demoBody: 'The Academy gives people a practical place to learn how The Future Studio thinks: clear workflows, useful AI tools, stronger creative systems, and business applications that can be used immediately.',
  demoNotes: ['Single workshop', 'Studio pass', 'Full studio program'],
  demoShellLabel: 'Future Studio Academy snapshot',
  demoTopTitle: 'Academy program stack',
  demoTopPill: 'LIVE LEARNING',
  demoMessages: [
    { role: 'assistant', text: 'The Academy turns AI interest into guided practice: live sessions, templates, examples, feedback, and clearer workflows for real creative or business output.' },
    { role: 'user', text: 'It works for founders, operators, creatives, and teams who want applied learning instead of another passive course they never finish.' },
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
    { title: 'AI: Design, Branding & AI', body: 'Learn how to shape a brand identity, visual direction, and presentation system using AI as a creative partner, not a shortcut.' },
    { title: 'AI for Creatives & Business', body: 'Use AI to design visual identity, plan a website, create launch assets, and turn ideas into practical business workflows.' },
    { title: 'AI Portfolio & Personal Branding', body: 'Build a clearer professional presence with portfolio structure, bio/story support, visual direction, and narrative refinement.' },
    { title: 'AI Visual Storytelling & Branding', body: 'Use AI-assisted motion, storyboarding, animation direction, and sound planning to create stronger brand narratives.' },
    { title: 'Workflow Design', body: 'Learn how to connect prompts, tools, assets, and repeatable steps into workflows that save time after the session ends.' },
    { title: 'Implementation Thinking', body: 'Understand how to move from experimentation into real systems, cleaner decisions, and outputs that can be used in the business.' },
  ],
  trustImage: '../assets/funnel-images/founder-ai-learning-workflow-wide.png',
  trustImageAlt: 'Founder teaching AI workflow concepts with laptop and tablet.',
  trustEyebrow: 'Why it matters',
  trustTitle: 'THE ACADEMY\nIS BUILT FOR\nREAL APPLICATION',
  trustBody: 'The Academy is designed so people leave with usable skills, not just inspiration. The goal is practical confidence: knowing what to build, what to ignore, and how to use AI with better taste and control.',
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
  pricingBody: 'Choose the learning format that matches your stage: one focused workshop, a repeated studio pass, or a deeper guided program with more feedback and progression.',
  pricingCards: [
    { badge: 'Workshop', title: 'Single Workshop', price: 'from $175', bullets: ['One focused live session on one AI use case', 'Topic-specific walkthrough and examples', 'Recording or recap where available', 'Selected prompts, templates, or next steps'], cta: 'Enroll Now', href: calendlyHref },
    { badge: 'Recommended', title: 'Studio Pass', price: 'from $499', bullets: ['Four live studio sessions', 'Guided progression across chosen modules', 'Recordings and module-specific templates', 'Community access and continued practice'], cta: 'Enroll Now', href: calendlyHref, featured: true },
    { badge: 'Advanced', title: 'Full Studio Program', price: 'from $1,500', bullets: ['Up to 8-10 live sessions', 'Guided learning journey and progression', 'Personalised feedback on your outputs', 'Full template and resource access'], cta: 'Enroll Now', href: calendlyHref },
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
  finalBody: 'Book a free demo and we will help you choose the right Academy format, track, and level of depth for the way you want to use AI.',
  finalPrimaryCta: 'Book a Free Demo',
  finalSecondaryCta: 'WhatsApp Us',
};

for (const config of [...systemPages, ...packagePages, academyPage]) {
  const html = applyPageConfig(template, config);
  writeFile(config.output, html);
}
