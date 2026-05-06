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
      urgencyMain: "Heavy discount window open across The Future Studio",
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
      proofTitle: "Small leaks become real money when missed opportunities affect the business",
      proofCopy: "These are simple commercial signals, not case studies. They show why slow replies, unclear follow-up, and admin gaps become missed opportunities before a bigger system is built.",
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
      urgencyMain: "Ventana de gran descuento abierta en The Future Studio",
      urgencyMeta: "Acceso inmediato tras checkout seguro con Stripe",
      dealLabel: "Descuento de lanzamiento",
      limited: "Precio por tiempo limitado",
      instant: "Acceso digital inmediato",
      trustOne: "Checkout seguro con Stripe",
      trustTwo: "Recibo por email",
      trustThree: "Precio en USD",
      auditCta: "Revelar mis mejoras de ingresos ->",
      buildCta: "Revelar donde puedo mejorar ingresos ->",
      rolloutCta: "Obtener el Timeline de 90 dias",
      investmentCta: "Obtener la Guia de Inversion en IA",
      buildSeriesCta: "Obtener la Serie del Sistema ROI",
      stopLeadsCta: "Obtener el Sistema de Respuesta a Leads",
      proofEyebrow: "Prueba de operadores",
      proofTitle: "Las fugas pequenas se vuelven dinero real cuando cada respuesta perdida se convierte en una oportunidad perdida",
      proofCopy: "Estas son senales comerciales simples, no casos de estudio. Muestran por que las respuestas lentas, el seguimiento poco claro y los huecos administrativos afectan al negocio antes de construir un sistema mas grande.",
      testimonialsTitle: "Lo que los operadores suelen notar primero",
      quoteEyebrow: "Nota de operador",
      productProofTitle: "Por que esta oferta es el siguiente paso mas seguro",
      productProofCopy: "Le da al comprador una accion clara antes de pedirle que se comprometa con una construccion mas grande.",
      whatYouGet: "Que recibes",
      whoFor: "Para quien es",
      whoNotFor: "Para quien no es",
      valueAnchor: "Ancla de valor",
      quickFaq: "FAQ rapido",
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
      product: { en: "WhatsApp Automation Guide", es: "Guia de Automatizacion de WhatsApp" },
      bestFor: {
        en: "Best for businesses that need to fix the first response before buying a bigger system.",
        es: "Ideal para negocios que necesitan corregir la primera respuesta antes de comprar un sistema mas grande."
      }
    },
    rolloutTimeline: {
      price: "$4.99",
      was: "$9.99",
      save: "50% OFF",
      saveEs: "50% OFF",
      product: { en: "90-Day AI Rollout Timeline", es: "Timeline de IA de 90 dias" },
      bestFor: {
        en: "Best for businesses that want a safer 90-day order before committing to implementation.",
        es: "Ideal para negocios que quieren un orden de 90 dias mas seguro antes de implementar."
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
        es: "Ideal para operadores que quieren prompts utiles sin comprar un sistema completo todavia."
      }
    },
    leadConversionSequence: {
      price: "$12.99",
      was: "$24.99",
      save: "48% OFF",
      saveEs: "48% OFF",
      product: { en: "30-Day Lead Conversion Sequence", es: "Secuencia de Conversion de Leads de 30 dias" },
      bestFor: {
        en: "Best for businesses that need stronger follow-up after leads arrive.",
        es: "Ideal para negocios que necesitan mejor seguimiento despues de recibir leads."
      }
    },
    aiSystemInvestmentGuide: {
      price: "$12.99",
      was: "$24.99",
      save: "48% OFF",
      saveEs: "48% OFF",
      product: { en: "AI System Investment Guide", es: "Guia de Inversion en Sistemas de IA" },
      bestFor: {
        en: "Best for businesses that want to know what to buy before building an AI system.",
        es: "Ideal para negocios que quieren saber que comprar antes de construir un sistema de IA."
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
        es: "Ideal para equipos que ya ven la oportunidad de IA y necesitan mejor logica de implementacion."
      }
    },
    contentCalendar: {
      price: "$24.99",
      was: "$49.99",
      save: "50% OFF",
      saveEs: "50% OFF",
      product: { en: "90-Day Content Calendar", es: "Calendario de Contenido de 90 Dias" },
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
        es: "Ideal para negocios que quieren el curso mas los productos digitales de apoyo en un paquete early bird."
      }
    }
  };

  var FIT_COPY = {
    rolloutTimeline: {
      what: {
        en: ["A clearer first 90-day sequence", "What to test first and what should wait", "A calmer rollout order for the team"],
        es: ["Una secuencia mas clara para los primeros 90 dias", "Que probar primero y que debe esperar", "Un orden de rollout mas calmado para el equipo"]
      },
      who: {
        en: ["Businesses interested in AI but unsure where to begin", "Teams that need order before a larger implementation"],
        es: ["Negocios interesados en IA pero sin claridad de inicio", "Equipos que necesitan orden antes de una implementacion mayor"]
      }
    },
    aiSystemInvestmentGuide: {
      what: {
        en: ["A buying framework for AI systems", "Clearer stack and budget decisions", "Questions to ask before signing a bigger build"],
        es: ["Un marco de compra para sistemas de IA", "Decisiones mas claras de stack y presupuesto", "Preguntas antes de firmar una construccion mas grande"]
      },
      who: {
        en: ["Businesses comparing tools, hosting, and automation options", "Operators who want to avoid buying the wrong stack"],
        es: ["Negocios comparando herramientas, hosting y automatizacion", "Operadores que quieren evitar comprar el stack equivocado"]
      },
      notFor: {
        en: ["Teams that already have a fully scoped AI architecture", "Buyers who only want generic AI inspiration"],
        es: ["Equipos que ya tienen una arquitectura de IA completa", "Compradores que solo quieren inspiracion generica de IA"]
      }
    },
    contentCalendar: {
      what: {
        en: ["90 days of industry-specific content direction", "Themes that support trust and enquiries", "A planning asset that makes posting easier"],
        es: ["90 dias de direccion de contenido por industria", "Temas que apoyan confianza y consultas", "Un activo de planificacion que hace mas facil publicar"]
      },
      who: {
        en: ["Businesses that need visibility without inventing posts every week", "Teams that want their offer explained more consistently"],
        es: ["Negocios que necesitan visibilidad sin inventar posts cada semana", "Equipos que quieren explicar su oferta con mas consistencia"]
      }
    }
  };

  var PRODUCT_TESTIMONIALS = {
    whatsappAutomationGuide: [
      {
        quote: { en: "The guide made our first WhatsApp reply feel professional instead of rushed, and the team finally had one clear intake flow to follow.", es: "La guia hizo que nuestra primera respuesta por WhatsApp se sintiera profesional en vez de improvisada, y el equipo por fin tuvo un flujo claro de intake." },
        name: { en: "Camila R. - Clinic Coordinator", es: "Camila R. - Coordinadora de Clinica" }
      },
      {
        quote: { en: "It helped us fix the first-response layer before spending money on a bigger system. That made the next decision much easier.", es: "Nos ayudo a corregir la primera respuesta antes de gastar en un sistema mas grande. Eso hizo la siguiente decision mucho mas facil." },
        name: { en: "Mateo S. - Service Business Owner", es: "Mateo S. - Dueno de Negocio de Servicios" }
      }
    ],
    rolloutTimeline: [
      {
        quote: { en: "The timeline gave us a realistic order for AI rollout instead of trying to automate everything at once.", es: "El timeline nos dio un orden realista para implementar IA en vez de intentar automatizar todo al mismo tiempo." },
        name: { en: "Isabella N. - Operations Director", es: "Isabella N. - Directora de Operaciones" }
      },
      {
        quote: { en: "It made the first 90 days feel controlled, with fewer random tools and a clearer implementation path.", es: "Hizo que los primeros 90 dias se sintieran controlados, con menos herramientas aleatorias y un camino de implementacion mas claro." },
        name: { en: "Hugo T. - Agency Partner", es: "Hugo T. - Socio de Agencia" }
      }
    ],
    serviceBusinessPrompts: [
      {
        quote: { en: "The prompts gave our team useful AI starting points without needing to understand the whole automation stack first.", es: "Los prompts dieron al equipo puntos de partida utiles con IA sin tener que entender primero todo el stack de automatizacion." },
        name: { en: "Valeria P. - Admin Lead", es: "Valeria P. - Lider Administrativa" }
      },
      {
        quote: { en: "We used it the same day to clean up replies, follow-ups, and simple admin messages.", es: "Lo usamos el mismo dia para mejorar respuestas, seguimientos y mensajes administrativos simples." },
        name: { en: "Nicolas D. - Studio Owner", es: "Nicolas D. - Dueno de Estudio" }
      }
    ],
    leadConversionSequence: [
      {
        quote: { en: "The sequence helped us stop relying on memory after the first reply. Warm enquiries had a clearer path forward.", es: "La secuencia nos ayudo a dejar de depender de la memoria despues de la primera respuesta. Las consultas tibias tuvieron un camino mas claro." },
        name: { en: "Andrea L. - Sales Coordinator", es: "Andrea L. - Coordinadora Comercial" }
      },
      {
        quote: { en: "It made follow-up feel less random and helped our team know exactly what to send next.", es: "Hizo que el seguimiento se sintiera menos aleatorio y ayudo al equipo a saber exactamente que enviar despues." },
        name: { en: "Julian M. - Clinic Manager", es: "Julian M. - Gerente de Clinica" }
      }
    ],
    aiSystemInvestmentGuide: [
      {
        quote: { en: "The guide helped us compare systems with better questions, instead of getting distracted by every tool demo.", es: "La guia nos ayudo a comparar sistemas con mejores preguntas, sin distraernos con cada demo de herramientas." },
        name: { en: "Paula G. - Managing Partner", es: "Paula G. - Socia Directora" }
      },
      {
        quote: { en: "It clarified what was worth buying now and what should wait until the business case was stronger.", es: "Aclaro que valia la pena comprar ahora y que debia esperar hasta que el caso de negocio fuera mas fuerte." },
        name: { en: "Rafael C. - Business Owner", es: "Rafael C. - Dueno de Negocio" }
      }
    ],
    aiImplementationPlaybook: [
      {
        quote: { en: "The playbook turned implementation into a sequence we could actually discuss with the team.", es: "El playbook convirtio la implementacion en una secuencia que si podiamos discutir con el equipo." },
        name: { en: "Elena B. - Growth Lead", es: "Elena B. - Lider de Crecimiento" }
      },
      {
        quote: { en: "It helped us move from AI ideas into practical operating steps without overcomplicating the first build.", es: "Nos ayudo a pasar de ideas de IA a pasos operativos practicos sin complicar demasiado la primera construccion." },
        name: { en: "Marco A. - Service Operator", es: "Marco A. - Operador de Servicios" }
      }
    ],
    contentCalendar: [
      {
        quote: { en: "The calendar made our content feel planned and specific to the way our clients actually choose.", es: "El calendario hizo que nuestro contenido se sintiera planificado y especifico a la forma en que nuestros clientes eligen." },
        name: { en: "Natalia F. - Clinic Marketing Lead", es: "Natalia F. - Lider de Marketing Clinico" }
      },
      {
        quote: { en: "It removed the weekly guessing. We finally had a rhythm for education, trust, and enquiries.", es: "Elimino la adivinanza semanal. Por fin tuvimos un ritmo para educacion, confianza y consultas." },
        name: { en: "Diego Q. - Real Estate Partner", es: "Diego Q. - Socio Inmobiliario" }
      }
    ],
    courseSeries: [
      {
        quote: { en: "The series made the build feel practical. We could see which system should recover revenue first.", es: "La serie hizo que la construccion se sintiera practica. Pudimos ver que sistema debia recuperar ingresos primero." },
        name: { en: "Fernanda V. - Operations Owner", es: "Fernanda V. - Duena de Operaciones" }
      },
      {
        quote: { en: "It gave our team a clearer order for leads, reminders, follow-up, and ROI before investing in a bigger build.", es: "Dio al equipo un orden mas claro para leads, recordatorios, seguimiento y ROI antes de invertir en una construccion mayor." },
        name: { en: "Oscar J. - Service Founder", es: "Oscar J. - Fundador de Servicios" }
      }
    ]
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
    if (!shouldShowGlobalUrgency()) return;
    var bar = makeEl("div", "funnel-urgency-bar");
    bar.setAttribute("role", "status");
    bar.setAttribute("aria-live", "polite");
    bar.innerHTML =
      "<div class='funnel-urgency-inner'>" +
      "<span class='funnel-urgency-label' data-funnel-en='Launch offer active' data-funnel-es='Oferta de lanzamiento activa'></span>" +
      "<span class='funnel-urgency-main' data-funnel-en='Heavy discount window open across The Future Studio' data-funnel-es='Ventana de gran descuento abierta en The Future Studio'></span>" +
      "<span class='funnel-countdown' aria-label='Offer countdown'>11:25</span>" +
      "<span class='funnel-urgency-meta' data-funnel-en='Instant access after secure Stripe checkout' data-funnel-es='Acceso inmediato tras checkout seguro con Stripe'></span>" +
      "</div>";
    document.body.classList.add("has-funnel-urgency");
    document.body.insertBefore(bar, document.body.firstChild);
    registerTimer(bar.querySelector(".funnel-countdown"));
    syncBilingual();
  }

  function shouldShowGlobalUrgency() {
    var path = window.location.pathname.toLowerCase();
    return path.indexOf("/client-intake") === -1 && path.indexOf("/download/") === -1;
  }

  function tagFunnelPage() {
    if (!document.body) return;
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf("/shop/step-3/") !== -1) document.body.classList.add("page-step-3-product");
    if (path.indexOf("/shop/step-4") !== -1) document.body.classList.add("page-step-4-product");
    document.body.setAttribute("data-funnel-product", detectProduct() || "");
  }

  function detectProduct() {
    var path = window.location.pathname.toLowerCase();
    var params = new URLSearchParams(window.location.search);
    var product = (params.get("product") || "").toLowerCase();
    var products = (params.get("products") || "").toLowerCase();
    var series = (params.get("series") || params.get("serieses") || "").toLowerCase();

    if (path.indexOf("/thank-you/audit.html") !== -1) return "whatsappAutomationGuide";
    if (path.indexOf("/thank-you/learn.html") !== -1) return "rolloutTimeline";
    if (path.indexOf("/thank-you/build.html") !== -1) return "serviceBusinessPrompts";
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
    if (
      path === "/audit/" ||
      path === "/learn/" ||
      path === "/build/" ||
      path.endsWith("/audit/index.html") ||
      path.endsWith("/learn/index.html") ||
      path.endsWith("/build/index.html") ||
      path.indexOf("/funnel/step-1/") !== -1
    ) return false;
    return !!detectProduct();
  }

  function dealStripHtml(product) {
    var timerId = "funnel-countdown-" + Math.random().toString(36).slice(2);
    return "" +
      "<div class='funnel-deal-price'>" +
        "<span class='funnel-deal-label' data-funnel-en='" + COPY.en.dealLabel + "' data-funnel-es='" + COPY.es.dealLabel + "'></span>" +
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
      target.insertAdjacentElement("afterend", strip);
    } else {
      var heroPanel = document.querySelector("main .hero-panel") ||
        document.querySelector("main .wrap") ||
        document.querySelector("main") ||
        document.querySelector(".hero-inner") ||
        document.querySelector(".hero") ||
        document.body;
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
    var after = document.querySelector(".funnel-deal-strip") ||
      document.querySelector("main .offer-price-banner") ||
      document.querySelector("main .series-price-strip") ||
      document.querySelector(".funnel-sticky-value-bar") ||
      document.querySelector(".hero");
    if (after && after.parentNode) after.insertAdjacentElement("afterend", holder);
    syncBilingual();
  }

  function insertProductProof() {
    if (!shouldShowProductLayer() || document.querySelector(".funnel-proof-quotes")) return;
    var key = detectProduct();
    var testimonials = PRODUCT_TESTIMONIALS[key] || PRODUCT_TESTIMONIALS.courseSeries;
    var wrap = makeEl("div", "funnel-proof-quotes");
    wrap.innerHTML = testimonials.map(function (item) {
      return "<article>" +
        "<div class='funnel-stars' aria-label='Five star rating'>&#9733;&#9733;&#9733;&#9733;&#9733;</div>" +
        "<p data-funnel-en='" + item.quote.en + "' data-funnel-es='" + item.quote.es + "'></p>" +
        "<strong data-funnel-en='" + item.name.en + "' data-funnel-es='" + item.name.es + "'></strong>" +
      "</article>";
    }).join("");
    var after = document.querySelector(".funnel-trust-tags") ||
      document.querySelector(".funnel-deal-strip") ||
      document.querySelector("main .offer-price-banner") ||
      document.querySelector("main .series-price-strip") ||
      document.querySelector(".funnel-sticky-value-bar") ||
      document.querySelector(".hero");
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
        "<article><h3 data-funnel-en='Why buy this before building' data-funnel-es='Por que comprar esto antes de construir'></h3><p data-funnel-en='It helps you understand the stack, costs, and buying questions before a larger system becomes expensive.' data-funnel-es='Te ayuda a entender el stack, los costos y las preguntas de compra antes de que un sistema mayor sea caro.'></p></article>" +
        "<article><h3 data-funnel-en='Does it replace a proposal' data-funnel-es='Reemplaza una propuesta'></h3><p data-funnel-en='No. It makes the proposal conversation sharper because you know what the system should include.' data-funnel-es='No. Hace que la conversacion de propuesta sea mas precisa porque sabes que debe incluir el sistema.'></p></article>" +
        "<article><h3 data-funnel-en='Is this for beginners' data-funnel-es='Es para principiantes'></h3><p data-funnel-en='Yes, if you are making a commercial buying decision and need clarity before committing budget.' data-funnel-es='Si, si estas tomando una decision comercial y necesitas claridad antes de comprometer presupuesto.'></p></article>" +
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
    var path = window.location.pathname.toLowerCase();
    var productHero = document.querySelector(".hero") || document.querySelector("main .hero-panel");
    if ((path.indexOf("/shop/step-3/") !== -1 || path.indexOf("/shop/step-4") !== -1) && productHero && productHero.parentNode) {
      productHero.insertAdjacentElement("afterend", bar);
    } else {
      var main = document.querySelector("main") || document.body;
      main.insertBefore(bar, main.firstChild);
    }
    registerTimer(bar.querySelector(".funnel-countdown"));
    syncBilingual();
  }

  function repositionProductDealStrip() {
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf("/shop/step-3/") === -1 && path.indexOf("/shop/step-4") === -1) return;
    var strip = document.querySelector(".funnel-deal-strip");
    var anchor = document.querySelector(".funnel-sticky-value-bar") || document.querySelector(".hero");
    if (strip && anchor && anchor.parentNode && strip.previousElementSibling !== anchor) {
      anchor.insertAdjacentElement("afterend", strip);
    }
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
          "<article><strong>60s</strong><span data-funnel-en='Target first-response speed' data-funnel-es='Velocidad objetivo de primera respuesta'></span></article>" +
          "<article><strong>50%</strong><span data-funnel-en='Typical no-show reduction after reminders improve' data-funnel-es='Reduccion tipica de ausencias tras mejorar recordatorios'></span></article>" +
        "</div>" +
        "<div class='funnel-testimonial-grid'>" +
          "<article><div class='funnel-stars'>&#9733;&#9733;&#9733;&#9733;&#9733;</div><p data-funnel-en='The audit made the missed-response problem visible enough to fix first.' data-funnel-es='El audit hizo visible el problema de respuesta perdida para corregirlo primero.'></p><strong data-funnel-en='Laura M. - Clinic Operator' data-funnel-es='Laura M. - Operadora de Clinica'></strong></article>" +
          "<article><div class='funnel-stars'>&#9733;&#9733;&#9733;&#9733;&#9733;</div><p data-funnel-en='It turned a vague lead problem into a practical first step.' data-funnel-es='Convirtio un problema vago de leads en un primer paso practico.'></p><strong data-funnel-en='Andres V. - Service Owner' data-funnel-es='Andres V. - Dueno de Servicios'></strong></article>" +
          "<article><div class='funnel-stars'>&#9733;&#9733;&#9733;&#9733;&#9733;</div><p data-funnel-en='Seeing the numbers made the next product feel logical, not random.' data-funnel-es='Ver los numeros hizo que el siguiente producto se sintiera logico, no aleatorio.'></p><strong data-funnel-en='Sofia C. - Operations Lead' data-funnel-es='Sofia C. - Lider de Operaciones'></strong></article>" +
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
      if (href.indexOf("rollout-timeline") !== -1) {
        setBilingual(el, COPY.en.rolloutCta, COPY.es.rolloutCta);
      }
      if (href.indexOf("ai-system-investment-guide") !== -1) {
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
        "SABE QUE COMPRAR<br>ANTES DE CONSTRUIR<br><span class='grad'>TU SISTEMA DE IA</span>"
      );
    }
    if (path.indexOf("shop/step-2/learn") !== -1 || path.indexOf("tfs_productc_90day_rollout") !== -1) {
      setBilingual(
        h1,
        "GET THE <span class='grad'>90-DAY AI</span><br>ROLLOUT TIMELINE",
        "OBTEN EL <span class='grad'>TIMELINE DE IA</span><br>DE 90 DIAS"
      );
    }
  }

  function simplifyCheckoutHeroTitles() {
    var path = window.location.pathname.toLowerCase();
    var isCheckout =
      path.indexOf("/checkout/") !== -1 ||
      document.body.classList.contains("page-checkout-clean") ||
      document.body.classList.contains("page-checkout") ||
      document.body.classList.contains("page-checkout-series") ||
      document.body.classList.contains("checkout-restored");
    if (!isCheckout) return;

    var h1 = document.querySelector("#series-checkout-title") || document.querySelector("main h1.hero-title") || document.querySelector("main h1, h1");
    if (!h1) return;
    setBilingual(h1, "COMPLETE YOUR ORDER", "COMPLETA TU ORDEN");
    h1.classList.add("checkout-hero-title");
  }

  function refineLeadHeroHeadline() {
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf("shop/step-3/audit") === -1) return;
    var h1 = document.querySelector("main h1, h1");
    if (!h1) return;
    setBilingual(
      h1,
      "<span class='plain'>YOUR FOLLOW-UP IS LOSING</span><br><span class='grad'>QUALIFIED LEADS</span><br><span class='plain'>AFTER FIRST CONTACT</span>",
      "<span class='plain'>TU SEGUIMIENTO ESTA PERDIENDO</span><br><span class='grad'>LEADS CALIFICADOS</span><br><span class='plain'>DESPUES DEL PRIMER CONTACTO</span>"
    );
  }

  function cleanupEncodingIssues() {
    function bad(codes) {
      return String.fromCharCode.apply(String, codes);
    }
    var replacements = [
      [bad([0xc3, 0xa2, 0xe2, 0x201a, 0xac, 0xe2, 0x20ac, 0x9d]), " - "],
      [bad([0xc3, 0xa2, 0xe2, 0x201a, 0xac, 0xe2, 0x20ac, 0x153]), "-"],
      [bad([0xc3, 0xa2, 0xe2, 0x20ac, 0xa0, 0xe2, 0x20ac, 0x2122]), "->"],
      [bad([0xc3, 0xa2, 0xc5, 0x201c, 0xe2, 0x20ac, 0x153]), "✓"],
      [bad([0xc3, 0xa2, 0xc5, 0x201c, 0xe2, 0x20ac, 0xa2]), "×"],
      [bad([0xc3, 0x201a, 0xc2, 0xb7]), "·"],
      [bad([0xc3, 0x201a, 0xc2, 0xa9]), "©"],
      [bad([0xc3, 0x201a, 0xc2, 0xbf]), "¿"],
      [bad([0xc3, 0xa1]), "a"],
      [bad([0xc3, 0xa9]), "e"],
      [bad([0xc3, 0xad]), "i"],
      [bad([0xc3, 0xb3]), "o"],
      [bad([0xc3, 0xba]), "u"],
      [bad([0xc3, 0xb1]), "n"],
      [bad([0xc3, 0x89]), "E"],
      [bad([0xc3, 0x8d]), "I"]
    ];
    function cleanValue(value) {
      if (!value) return value;
      replacements.forEach(function (pair) {
        value = value.split(pair[0]).join(pair[1]);
      });
      return value.replace(/\s+-\s+/g, " - ");
    }

    document.querySelectorAll("[data-funnel-en], [data-funnel-es], [data-en], [data-es]").forEach(function (el) {
      ["data-funnel-en", "data-funnel-es", "data-en", "data-es"].forEach(function (attr) {
        if (el.hasAttribute(attr)) el.setAttribute(attr, cleanValue(el.getAttribute(attr)));
      });
    });

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
        for (var i = 0; i < replacements.length; i += 1) {
          if (node.nodeValue.indexOf(replacements[i][0]) !== -1) return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      node.nodeValue = cleanValue(node.nodeValue);
    });
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
      node.nodeValue = node.nodeValue.replace(/\btuto\b/gi, "tutor");
    });
  }

  function forceCheckoutContrast() {
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf("/checkout/") === -1 && !document.querySelector(".payment-panel")) return;

    document.querySelectorAll(".payment-panel").forEach(function (panel) {
      panel.classList.add("visible");
      panel.style.background = "#050505";
      panel.style.color = "#fffdfa";
      panel.style.opacity = "1";
      panel.style.transform = "none";
      panel.style.filter = "none";

      var parent = panel.parentElement;
      while (parent && parent !== document.body) {
        if (parent.classList && parent.classList.contains("aos")) parent.classList.add("visible");
        parent.style.opacity = "1";
        parent.style.filter = "none";
        if (parent.tagName && parent.tagName.toLowerCase() === "main") break;
        parent = parent.parentElement;
      }
    });
  }

  function boot() {
    tagFunnelPage();
    cleanupEncodingIssues();
    insertUrgencyBar();
    insertAuditProof();
    updateBuildCta();
    updateHeadlines();
    refineLeadHeroHeadline();
    simplifyCheckoutHeroTitles();
    insertDealStrip();
    insertTrustTags();
    insertProductProof();
    insertFitSection();
    insertInvestmentFaq();
    insertStickyValueBar();
    repositionProductDealStrip();
    simplifyCheckoutHeroTitles();
    updateCtas();
    cleanupEncodingIssues();
    cleanupTextIssues();
    forceCheckoutContrast();
    syncBilingual();
    simplifyCheckoutHeroTitles();
    cleanupEncodingIssues();
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
    setTimeout(simplifyCheckoutHeroTitles, 0);
    cleanupEncodingIssues();
    cleanupTextIssues();
    syncBilingual();
    cleanupEncodingIssues();
  });
})();
