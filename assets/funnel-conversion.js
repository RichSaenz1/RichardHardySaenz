/*
  Shared conversion layer for The Future Studio funnel.
  Adds urgency, proof, discount/value strips, and CTA clarity without touching
  Stripe links, forms, routes, or backend behavior.
*/
(function () {
  var OFFER_MS = (11 * 60 + 25) * 1000;
  var DEADLINE_KEY = "tfs_funnel_offer_deadline_v1";
  var TIMER_NODES = [];

  var COPY = {
    en: {
      urgencyLabel: "Launch offer active",
      urgencyMain: "Heavy discount window open across the funnel",
      urgencyMeta: "Instant access after secure Stripe checkout",
      dealLabel: "Launch discount",
      limited: "Limited-time price",
      instant: "Instant digital access",
      trustOne: "Secure Stripe checkout",
      trustTwo: "Email receipt",
      trustThree: "USD pricing",
      auditCta: "Reveal My Revenue Improvements ->",
      buildCta: "Reveal Where I Can Improve Revenue ->",
      rolloutCta: "Get the 90-Day Timeline",
      investmentCta: "Get the AI System Investment Guide",
      buildSeriesCta: "Get the ROI System Series",
      stopLeadsCta: "Get the Lead Response System",
      proofEyebrow: "Operator proof",
      proofTitle: "Small leaks become real money when the response layer is fixed",
      proofCopy: "These are simple commercial signals, not case studies. They show why a fast, clear first step matters before a bigger system is built.",
      testimonialsTitle: "What operators usually notice first",
      quoteEyebrow: "Operator note",
      productProofTitle: "Why this offer is a safer next step",
      productProofCopy: "It gives the buyer a clear action before asking them to commit to a larger build.",
      whatYouGet: "What you get",
      whoFor: "Who this is for",
      whoNotFor: "Who this is not for",
      valueAnchor: "Value anchor",
      quickFaq: "Quick FAQ",
      stickyNow: "Today",
      stickyAccess: "Instant access"
    },
    es: {
      urgencyLabel: "Oferta de lanzamiento activa",
      urgencyMain: "Ventana de gran descuento abierta en el funnel",
      urgencyMeta: "Acceso inmediato tras checkout seguro con Stripe",
      dealLabel: "Descuento de lanzamiento",
      limited: "Precio por tiempo limitado",
      instant: "Acceso digital inmediato",
      trustOne: "Checkout seguro con Stripe",
      trustTwo: "Recibo por email",
      trustThree: "Precio en USD",
      auditCta: "Revelar mis mejoras de ingresos ->",
      buildCta: "Revelar dónde puedo mejorar ingresos ->",
      rolloutCta: "Obtener el Timeline de 90 días",
      investmentCta: "Obtener la Guía de Inversión en IA",
      buildSeriesCta: "Obtener la Serie del Sistema ROI",
      stopLeadsCta: "Obtener el Sistema de Respuesta a Leads",
      proofEyebrow: "Prueba de operadores",
      proofTitle: "Las fugas pequeñas se vuelven dinero real cuando se corrige la respuesta",
      proofCopy: "Estas son señales comerciales simples, no casos de estudio. Muestran por qué un primer paso claro importa antes de construir un sistema más grande.",
      testimonialsTitle: "Lo que los operadores suelen notar primero",
      quoteEyebrow: "Nota de operador",
      productProofTitle: "Por qué esta oferta es el siguiente paso más seguro",
      productProofCopy: "Le da al comprador una acción clara antes de pedirle que se comprometa con una construcción más grande.",
      whatYouGet: "Qué recibes",
      whoFor: "Para quién es",
      whoNotFor: "Para quién no es",
      valueAnchor: "Ancla de valor",
      quickFaq: "FAQ rápido",
      stickyNow: "Hoy",
      stickyAccess: "Acceso inmediato"
    }
  };

  var PRODUCT_MAP = {
    whatsappAutomationGuide: {
      price: "$4.99",
      was: "$9.99",
      save: "50% OFF",
      saveEs: "50% OFF",
      product: { en: "WhatsApp Automation Guide", es: "Guía de Automatización de WhatsApp" },
      bestFor: {
        en: "Best for businesses that need to fix the first response before buying a bigger system.",
        es: "Ideal para negocios que necesitan corregir la primera respuesta antes de comprar un sistema más grande."
      }
    },
    rolloutTimeline: {
      price: "$4.99",
      was: "$9.99",
      save: "50% OFF",
      saveEs: "50% OFF",
      product: { en: "90-Day AI Rollout Timeline", es: "Timeline de IA de 90 días" },
      bestFor: {
        en: "Best for businesses that want a safer 90-day order before committing to implementation.",
        es: "Ideal para negocios que quieren un orden de 90 días más seguro antes de implementar."
      }
    },
    serviceBusinessPrompts: {
      price: "$4.99",
      was: "$9.99",
      save: "50% OFF",
      saveEs: "50% OFF",
      product: { en: "20 Prompts for Service Businesses", es: "20 Prompts para Negocios de Servicios" },
      bestFor: {
        en: "Best for operators who want immediate AI prompts without buying a full system yet.",
        es: "Ideal para operadores que quieren prompts útiles sin comprar un sistema completo todavía."
      }
    },
    leadConversionSequence: {
      price: "$12.99",
      was: "$24.99",
      save: "48% OFF",
      saveEs: "48% OFF",
      product: { en: "30-Day Lead Conversion Sequence", es: "Secuencia de Conversión de Leads de 30 días" },
      bestFor: {
        en: "Best for businesses that need stronger follow-up after leads arrive.",
        es: "Ideal para negocios que necesitan mejor seguimiento después de recibir leads."
      }
    },
    aiSystemInvestmentGuide: {
      price: "$12.99",
      was: "$24.99",
      save: "48% OFF",
      saveEs: "48% OFF",
      product: { en: "AI System Investment Guide", es: "Guía de Inversión en Sistemas de IA" },
      bestFor: {
        en: "Best for businesses that want to know what to buy before building an AI system.",
        es: "Ideal para negocios que quieren saber qué comprar antes de construir un sistema de IA."
      }
    },
    aiImplementationPlaybook: {
      price: "$24.99",
      was: "$49.99",
      save: "50% OFF",
      saveEs: "50% OFF",
      product: { en: "AI Implementation Playbook", es: "AI Implementation Playbook" },
      bestFor: {
        en: "Best for teams that already see the AI opportunity and need stronger implementation logic.",
        es: "Ideal para equipos que ya ven la oportunidad de IA y necesitan mejor lógica de implementación."
      }
    },
    contentCalendar: {
      price: "$24.99",
      was: "$49.99",
      save: "50% OFF",
      saveEs: "50% OFF",
      product: { en: "90-Day Content Calendar", es: "Calendario de Contenido de 90 Días" },
      bestFor: {
        en: "Best for businesses that need a visible content rhythm without planning from scratch.",
        es: "Ideal para negocios que necesitan un ritmo de contenido visible sin planificar desde cero."
      }
    },
    courseSeries: {
      price: "$79.99",
      was: "$159.99",
      save: "50% OFF EARLY BIRD",
      saveEs: "50% OFF EARLY BIRD",
      product: { en: "5-Video Course Series", es: "Serie de 5 Videos" },
      bestFor: {
        en: "Best for businesses that want the course plus the supporting digital products in one early-bird package.",
        es: "Ideal para negocios que quieren el curso más los productos digitales de apoyo en un paquete early bird."
      }
    }
  };

  var FIT_COPY = {
    rolloutTimeline: {
      what: {
        en: ["A clearer first 90-day sequence", "What to test first and what should wait", "A calmer rollout order for the team"],
        es: ["Una secuencia más clara para los primeros 90 días", "Qué probar primero y qué debe esperar", "Un orden de rollout más calmado para el equipo"]
      },
      who: {
        en: ["Businesses interested in AI but unsure where to begin", "Teams that need order before a larger implementation"],
        es: ["Negocios interesados en IA pero sin claridad de inicio", "Equipos que necesitan orden antes de una implementación mayor"]
      }
    },
    aiSystemInvestmentGuide: {
      what: {
        en: ["A buying framework for AI systems", "Clearer stack and budget decisions", "Questions to ask before signing a bigger build"],
        es: ["Un marco de compra para sistemas de IA", "Decisiones más claras de stack y presupuesto", "Preguntas antes de firmar una construcción más grande"]
      },
      who: {
        en: ["Businesses comparing tools, hosting, and automation options", "Operators who want to avoid buying the wrong stack"],
        es: ["Negocios comparando herramientas, hosting y automatización", "Operadores que quieren evitar comprar el stack equivocado"]
      },
      notFor: {
        en: ["Teams that already have a fully scoped AI architecture", "Buyers who only want generic AI inspiration"],
        es: ["Equipos que ya tienen una arquitectura de IA completa", "Compradores que solo quieren inspiración genérica de IA"]
      }
    },
    contentCalendar: {
      what: {
        en: ["90 days of industry-specific content direction", "Themes that support trust and enquiries", "A planning asset that makes posting easier"],
        es: ["90 días de dirección de contenido por industria", "Temas que apoyan confianza y consultas", "Un activo de planificación que hace más fácil publicar"]
      },
      who: {
        en: ["Businesses that need visibility without inventing posts every week", "Teams that want their offer explained more consistently"],
        es: ["Negocios que necesitan visibilidad sin inventar posts cada semana", "Equipos que quieren explicar su oferta con más consistencia"]
      }
    }
  };

  function lang() {
    var value = (document.body && document.body.getAttribute("data-lang")) ||
      document.documentElement.getAttribute("lang") ||
      (function () {
        try { return localStorage.getItem("tfs_shop_lang"); } catch (e) { return ""; }
      })() ||
      "en";
    return value === "es" ? "es" : "en";
  }

  function text(key) {
    return COPY[lang()][key] || COPY.en[key] || "";
  }

  function productText(product, key) {
    var value = product[key];
    if (!value) return "";
    if (typeof value === "string") return value;
    return value[lang()] || value.en || "";
  }

  function makeEl(tag, className, html) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (html !== undefined) el.innerHTML = html;
    return el;
  }

  function setBilingual(el, en, es) {
    if (!el) return;
    el.setAttribute("data-funnel-en", en);
    el.setAttribute("data-funnel-es", es || en);
    el.innerHTML = lang() === "es" ? (es || en) : en;
  }

  function syncBilingual() {
    document.querySelectorAll("[data-funnel-en][data-funnel-es]").forEach(function (el) {
      var next = el.getAttribute("data-funnel-" + lang());
      if (next !== null) el.innerHTML = next;
    });
  }

  function deadline() {
    var now = Date.now();
    var stored = 0;
    try { stored = parseInt(sessionStorage.getItem(DEADLINE_KEY), 10) || 0; } catch (e) {}
    if (!stored || stored <= now) {
      stored = now + OFFER_MS;
      try { sessionStorage.setItem(DEADLINE_KEY, String(stored)); } catch (e) {}
    }
    return stored;
  }

  function formatTime(ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    var minutes = Math.floor(total / 60);
    var seconds = total % 60;
    return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  }

  function updateTimers() {
    var d = deadline();
    var now = Date.now();
    var value = formatTime(d - now);
    TIMER_NODES.forEach(function (node) {
      node.textContent = value;
    });
  }

  function registerTimer(node) {
    if (!node) return;
    TIMER_NODES.push(node);
    updateTimers();
  }

  function insertUrgencyBar() {
    if (document.querySelector(".funnel-urgency-bar")) return;
    var bar = makeEl("div", "funnel-urgency-bar");
    bar.setAttribute("role", "status");
    bar.setAttribute("aria-live", "polite");
    bar.innerHTML =
      "<div class='funnel-urgency-inner'>" +
      "<span class='funnel-urgency-label' data-funnel-en='Launch offer active' data-funnel-es='Oferta de lanzamiento activa'></span>" +
      "<span class='funnel-urgency-main' data-funnel-en='Heavy discount window open across the funnel' data-funnel-es='Ventana de gran descuento abierta en el funnel'></span>" +
      "<span class='funnel-countdown' aria-label='Offer countdown'>11:25</span>" +
      "<span class='funnel-urgency-meta' data-funnel-en='Instant access after secure Stripe checkout' data-funnel-es='Acceso inmediato tras checkout seguro con Stripe'></span>" +
      "</div>";
    document.body.classList.add("has-funnel-urgency");
    document.body.insertBefore(bar, document.body.firstChild);
    registerTimer(bar.querySelector(".funnel-countdown"));
    syncBilingual();
  }

  function detectProduct() {
    var path = window.location.pathname.toLowerCase();
    var params = new URLSearchParams(window.location.search);
    var product = (params.get("product") || "").toLowerCase();
    var products = (params.get("products") || "").toLowerCase();
    var series = (params.get("series") || params.get("serieses") || "").toLowerCase();

    if (path.indexOf("whatsapp-automation-guide") !== -1 || product.indexOf("whatsapp") !== -1 || products.indexOf("whatsapp") !== -1 || path.indexOf("step-2/audit") !== -1 || path.indexOf("step-2\\audit") !== -1) return "whatsappAutomationGuide";
    if (path.indexOf("rollout-timeline") !== -1 || product.indexOf("rollout") !== -1 || path.indexOf("step-2/learn") !== -1) return "rolloutTimeline";
    if (path.indexOf("service-business-prompts") !== -1 || product.indexOf("service-business-prompts") !== -1 || path.indexOf("step-2/build") !== -1) return "serviceBusinessPrompts";
    if (path.indexOf("lead-conversion-sequence") !== -1 || product.indexOf("lead-conversion") !== -1 || path.indexOf("step-3/audit") !== -1) return "leadConversionSequence";
    if (path.indexOf("ai-system-investment-guide") !== -1 || product.indexOf("ai-system-investment") !== -1 || path.indexOf("step-3/build") !== -1) return "aiSystemInvestmentGuide";
    if (path.indexOf("ai-implementation-playbook") !== -1 || product.indexOf("ai-implementation") !== -1 || path.indexOf("step-3/learn") !== -1) return "aiImplementationPlaybook";
    if (path.indexOf("content-calendar") !== -1 || path.indexOf("step-4") !== -1 || product.indexOf("content-calendar") !== -1 || products.indexOf("content-calendar") !== -1 || params.has("industry") || params.has("industries")) return "contentCalendar";
    if (path.indexOf("/series/") !== -1 || path.indexOf("course-series") !== -1 || series) return "courseSeries";
    return "";
  }

  function shouldShowProductLayer() {
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf("/client-intake") !== -1 || path.indexOf("/download") !== -1) return false;
    if (path.indexOf("/audit/") !== -1 || path.indexOf("/learn/") !== -1 || path.indexOf("/build/") !== -1) return false;
    return !!detectProduct();
  }

  function dealStripHtml(product) {
    var timerId = "funnel-countdown-" + Math.random().toString(36).slice(2);
    return "" +
      "<div class='funnel-deal-price'>" +
        "<span class='funnel-deal-label' data-funnel-en='" + text("dealLabel") + "' data-funnel-es='" + COPY.es.dealLabel + "'></span>" +
        "<strong>" + product.price + "</strong>" +
      "</div>" +
      "<div class='funnel-deal-details'>" +
        "<span class='funnel-deal-was'><span data-funnel-en='Was' data-funnel-es='Antes'></span> <s>" + product.was + "</s></span>" +
        "<span class='funnel-deal-save'>" + (lang() === "es" ? product.saveEs : product.save) + "</span>" +
        "<span class='funnel-deal-bestfor'>" + productText(product, "bestFor") + "</span>" +
      "</div>" +
      "<div class='funnel-deal-timer'>" +
        "<span data-funnel-en='Offer window' data-funnel-es='Ventana de oferta'></span>" +
        "<strong id='" + timerId + "' class='funnel-countdown'>11:25</strong>" +
      "</div>";
  }

  function insertDealStrip() {
    if (!shouldShowProductLayer() || document.querySelector(".funnel-deal-strip")) return;
    var key = detectProduct();
    var product = PRODUCT_MAP[key];
    if (!product) return;

    document.querySelectorAll(".offer-price-banner, .series-price-strip").forEach(function (el) {
      el.classList.add("is-heavy-discount");
    });

    var strip = makeEl("div", "funnel-deal-strip", dealStripHtml(product));
    strip.setAttribute("aria-label", "Limited launch discount");

    var checkoutAccess = document.querySelector(".hero-panel .checkout-access-strip");
    var target = checkoutAccess || document.querySelector("main .offer-price-banner") || document.querySelector("main .series-price-strip");
    if (target && target.parentNode) {
      target.insertAdjacentElement(checkoutAccess ? "afterend" : "afterend", strip);
    } else {
      var heroPanel = document.querySelector("main .hero-panel") || document.querySelector("main .wrap") || document.querySelector("main");
      if (heroPanel) heroPanel.appendChild(strip);
    }
    registerTimer(strip.querySelector(".funnel-countdown"));
    syncBilingual();
  }

  function insertTrustTags() {
    if (!shouldShowProductLayer() || document.querySelector(".funnel-trust-tags")) return;
    var holder = makeEl("div", "funnel-trust-tags");
    holder.innerHTML =
      "<span data-funnel-en='" + COPY.en.instant + "' data-funnel-es='" + COPY.es.instant + "'></span>" +
      "<span data-funnel-en='" + COPY.en.trustOne + "' data-funnel-es='" + COPY.es.trustOne + "'></span>" +
      "<span data-funnel-en='" + COPY.en.trustTwo + "' data-funnel-es='" + COPY.es.trustTwo + "'></span>" +
      "<span data-funnel-en='" + COPY.en.trustThree + "' data-funnel-es='" + COPY.es.trustThree + "'></span>";
    var after = document.querySelector(".funnel-deal-strip") || document.querySelector("main .offer-price-banner") || document.querySelector("main .series-price-strip");
    if (after && after.parentNode) after.insertAdjacentElement("afterend", holder);
    syncBilingual();
  }

  function insertProductProof() {
    if (!shouldShowProductLayer() || document.querySelector(".funnel-proof-quotes")) return;
    var wrap = makeEl("div", "funnel-proof-quotes");
    wrap.innerHTML =
      "<article>" +
        "<div class='funnel-stars' aria-label='Five star rating'>★★★★★</div>" +
        "<p data-funnel-en='This is the right level before a bigger build: practical, specific, and easy to act on.' data-funnel-es='Es el nivel correcto antes de una construcción más grande: práctico, específico y fácil de aplicar.'></p>" +
        "<strong data-funnel-en='Service business operator' data-funnel-es='Operador de negocio de servicios'></strong>" +
      "</article>" +
      "<article>" +
        "<div class='funnel-stars' aria-label='Five star rating'>★★★★★</div>" +
        "<p data-funnel-en='The value is that it makes the next decision clearer, not heavier.' data-funnel-es='El valor es que hace que la siguiente decisión sea más clara, no más pesada.'></p>" +
        "<strong data-funnel-en='Growth-focused owner' data-funnel-es='Dueño enfocado en crecimiento'></strong>" +
      "</article>";
    var after = document.querySelector(".funnel-trust-tags") || document.querySelector(".funnel-deal-strip") || document.querySelector("main .offer-price-banner") || document.querySelector("main .series-price-strip");
    if (after && after.parentNode) after.insertAdjacentElement("afterend", wrap);
    syncBilingual();
  }

  function list(items) {
    return items.map(function (item) {
      return "<li>" + item + "</li>";
    }).join("");
  }

  function insertFitSection() {
    if (document.querySelector(".funnel-product-fit-section")) return;
    var key = detectProduct();
    var data = FIT_COPY[key];
    if (!data) return;
    var l = lang();
    var cards = [
      "<article><h3>" + text("whatYouGet") + "</h3><ul>" + list(data.what[l] || data.what.en) + "</ul></article>",
      "<article><h3>" + text("whoFor") + "</h3><ul>" + list(data.who[l] || data.who.en) + "</ul></article>"
    ];
    if (data.notFor) {
      cards.push("<article><h3>" + text("whoNotFor") + "</h3><ul>" + list(data.notFor[l] || data.notFor.en) + "</ul></article>");
    }
    var section = makeEl("section", "funnel-product-fit-section");
    section.innerHTML = "<div class='funnel-fit-grid'>" + cards.join("") + "</div>";
    var after = document.querySelector(".funnel-proof-quotes") || document.querySelector(".funnel-trust-tags") || document.querySelector(".funnel-deal-strip");
    if (after && after.parentNode) after.insertAdjacentElement("afterend", section);
  }

  function insertInvestmentFaq() {
    if (detectProduct() !== "aiSystemInvestmentGuide" || document.querySelector(".funnel-mini-faq")) return;
    var faq = makeEl("section", "funnel-mini-faq");
    faq.innerHTML =
      "<p class='eyebrow' data-funnel-en='" + COPY.en.quickFaq + "' data-funnel-es='" + COPY.es.quickFaq + "'></p>" +
      "<div class='funnel-mini-faq-grid'>" +
        "<article><h3 data-funnel-en='Why buy this before building?' data-funnel-es='¿Por qué comprar esto antes de construir?'></h3><p data-funnel-en='It helps you understand the stack, costs, and buying questions before a larger system becomes expensive.' data-funnel-es='Te ayuda a entender el stack, los costos y las preguntas de compra antes de que un sistema mayor sea caro.'></p></article>" +
        "<article><h3 data-funnel-en='Does it replace a proposal?' data-funnel-es='¿Reemplaza una propuesta?'></h3><p data-funnel-en='No. It makes the proposal conversation sharper because you know what the system should include.' data-funnel-es='No. Hace que la conversación de propuesta sea más precisa porque sabes qué debe incluir el sistema.'></p></article>" +
        "<article><h3 data-funnel-en='Is this for beginners?' data-funnel-es='¿Es para principiantes?'></h3><p data-funnel-en='Yes, if you are making a commercial buying decision and need clarity before committing budget.' data-funnel-es='Sí, si estás tomando una decisión comercial y necesitas claridad antes de comprometer presupuesto.'></p></article>" +
      "</div>";
    var after = document.querySelector(".funnel-product-fit-section") || document.querySelector(".funnel-proof-quotes");
    if (after && after.parentNode) after.insertAdjacentElement("afterend", faq);
    syncBilingual();
  }

  function insertStickyValueBar() {
    var key = detectProduct();
    if (!key || key === "whatsappAutomationGuide" || document.querySelector(".funnel-sticky-value-bar")) return;
    if (window.location.pathname.toLowerCase().indexOf("/checkout/") !== -1) return;
    var product = PRODUCT_MAP[key];
    if (!product) return;
    var link = document.querySelector("a.btn-primary[href*='checkout'], a.btn[href*='checkout']");
    var bar = makeEl("div", "funnel-sticky-value-bar");
    bar.innerHTML =
      "<span class='funnel-sticky-label' data-funnel-en='" + COPY.en.stickyNow + "' data-funnel-es='" + COPY.es.stickyNow + "'></span>" +
      "<strong>" + product.price + "</strong>" +
      "<span><s>" + product.was + "</s> " + (lang() === "es" ? product.saveEs : product.save) + "</span>" +
      "<span class='funnel-sticky-countdown funnel-countdown'>11:25</span>" +
      "<span data-funnel-en='" + COPY.en.stickyAccess + "' data-funnel-es='" + COPY.es.stickyAccess + "'></span>";
    if (link) {
      var cta = link.cloneNode(true);
      cta.classList.add("funnel-sticky-cta");
      bar.appendChild(cta);
    }
    var main = document.querySelector("main") || document.body;
    main.insertBefore(bar, main.firstChild);
    registerTimer(bar.querySelector(".funnel-countdown"));
    syncBilingual();
  }

  function insertAuditProof() {
    var path = window.location.pathname.toLowerCase();
    var isAudit = path === "/audit/" || path.indexOf("/funnel/step-1/audit") !== -1 || path.endsWith("/audit/index.html");
    if (!isAudit || document.querySelector(".funnel-audit-proof")) return;

    var cta = document.getElementById("hero-cta");
    if (cta) setBilingual(cta, COPY.en.auditCta, COPY.es.auditCta);

    var section = makeEl("section", "funnel-audit-proof");
    section.innerHTML =
      "<div class='wrap'>" +
        "<div class='funnel-proof-header'>" +
          "<p class='eyebrow' data-funnel-en='" + COPY.en.proofEyebrow + "' data-funnel-es='" + COPY.es.proofEyebrow + "'></p>" +
          "<h2 data-funnel-en='" + COPY.en.proofTitle + "' data-funnel-es='" + COPY.es.proofTitle + "'></h2>" +
          "<p data-funnel-en='" + COPY.en.proofCopy + "' data-funnel-es='" + COPY.es.proofCopy + "'></p>" +
        "</div>" +
        "<div class='funnel-metric-grid'>" +
          "<article><strong>24/7</strong><span data-funnel-en='Inquiry coverage window' data-funnel-es='Ventana de cobertura de consultas'></span></article>" +
          "<article><strong>&lt;60s</strong><span data-funnel-en='Target first-response speed' data-funnel-es='Velocidad objetivo de primera respuesta'></span></article>" +
          "<article><strong>30-50%</strong><span data-funnel-en='Typical no-show reduction after reminders improve' data-funnel-es='Reducción típica de ausencias tras mejorar recordatorios'></span></article>" +
        "</div>" +
        "<div class='funnel-testimonial-grid'>" +
          "<article><div class='funnel-stars'>★★★★★</div><p data-funnel-en='The audit made the missed-response problem visible enough to fix first.' data-funnel-es='El audit hizo visible el problema de respuesta perdida para corregirlo primero.'></p><strong data-funnel-en='Clinic operator' data-funnel-es='Operadora de clínica'></strong></article>" +
          "<article><div class='funnel-stars'>★★★★★</div><p data-funnel-en='It turned a vague lead problem into a practical first step.' data-funnel-es='Convirtió un problema vago de leads en un primer paso práctico.'></p><strong data-funnel-en='Service owner' data-funnel-es='Dueño de servicios'></strong></article>" +
          "<article><div class='funnel-stars'>★★★★★</div><p data-funnel-en='Seeing the numbers made the next product feel logical, not random.' data-funnel-es='Ver los números hizo que el siguiente producto se sintiera lógico, no aleatorio.'></p><strong data-funnel-en='Operations lead' data-funnel-es='Líder de operaciones'></strong></article>" +
        "</div>" +
      "</div>";

    var quiz = document.getElementById("quiz");
    if (quiz && quiz.parentNode) {
      quiz.parentNode.insertBefore(section, quiz);
    }
    syncBilingual();
  }

  function updateBuildCta() {
    var path = window.location.pathname.toLowerCase();
    var isBuild = path === "/build/" || path.indexOf("/funnel/step-1/build") !== -1 || path.endsWith("/build/index.html");
    if (!isBuild) return;
    var cta = document.getElementById("hero-cta");
    if (cta) setBilingual(cta, COPY.en.buildCta, COPY.es.buildCta);
  }

  function updateCtas() {
    var key = detectProduct();
    document.querySelectorAll("a.btn, button.btn, a.btn-primary, a.nav-cta").forEach(function (el) {
      if (el.id === "checkout-submit") return;
      var href = (el.getAttribute("href") || "").toLowerCase();
      if (href.indexOf("rollout-timeline") !== -1 || key === "rolloutTimeline") {
        setBilingual(el, COPY.en.rolloutCta, COPY.es.rolloutCta);
      }
      if (href.indexOf("ai-system-investment-guide") !== -1 || key === "aiSystemInvestmentGuide") {
        setBilingual(el, COPY.en.investmentCta, COPY.es.investmentCta);
      }
      if (href.indexOf("build-what-pays") !== -1 || href.indexOf("series=build-what-pays") !== -1) {
        setBilingual(el, COPY.en.buildSeriesCta, COPY.es.buildSeriesCta);
      }
      if (href.indexOf("stop-losing-leads") !== -1 || href.indexOf("series=stop-losing-leads") !== -1) {
        setBilingual(el, COPY.en.stopLeadsCta, COPY.es.stopLeadsCta);
      }
    });
  }

  function updateHeadlines() {
    var path = window.location.pathname.toLowerCase();
    var h1 = document.querySelector("main h1, h1");
    if (!h1) return;
    if (path.indexOf("shop/step-3/build") !== -1 || path.indexOf("step3_build_productf_investment_guide") !== -1) {
      setBilingual(
        h1,
        "KNOW WHAT TO BUY<br>BEFORE YOU BUILD<br><span class='grad'>YOUR AI SYSTEM</span>",
        "SABE QUÉ COMPRAR<br>ANTES DE CONSTRUIR<br><span class='grad'>TU SISTEMA DE IA</span>"
      );
    }
    if (path.indexOf("shop/step-2/learn") !== -1 || path.indexOf("tfs_productc_90day_rollout") !== -1) {
      setBilingual(
        h1,
        "GET THE <span class='grad'>90-DAY AI</span><br>ROLLOUT TIMELINE",
        "OBTÉN EL <span class='grad'>TIMELINE DE IA</span><br>DE 90 DÍAS"
      );
    }
  }

  function cleanupTextIssues() {
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf("content-calendar") === -1 && path.indexOf("step-4") === -1) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || node.nodeValue.indexOf("tuto") === -1) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      node.nodeValue = node.nodeValue.replace(/\btuto\b/gi, lang() === "es" ? "tutor" : "tutor");
    });
  }

  function boot() {
    insertUrgencyBar();
    insertAuditProof();
    updateBuildCta();
    updateHeadlines();
    insertDealStrip();
    insertTrustTags();
    insertProductProof();
    insertFitSection();
    insertInvestmentFaq();
    insertStickyValueBar();
    updateCtas();
    cleanupTextIssues();
    syncBilingual();
    setInterval(updateTimers, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  document.addEventListener("tfs:langchange", function () {
    syncBilingual();
    updateCtas();
    cleanupTextIssues();
  });
})();
