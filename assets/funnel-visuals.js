(function () {
  "use strict";

  var ROOT = "/assets/funnel-images/";
  var assets = {
    auditTrust: ROOT + "team-whatsapp-automation-consulting-wide.png?v=audit-trust-20260424",
    aiReadinessTrust: ROOT + "team-client-automation-strategy-wide.png",
    productMockup: ROOT + "digital-product-dashboard-mockup-wide.png",
    whatsappGuide: ROOT + "team-whatsapp-automation-consulting-wide.png",
    leadSequence: ROOT + "client-operations-checklist-workshop-wide.png",
    rolloutTimeline: ROOT + "calendar-dashboard-workspace-wide.png",
    playbook: ROOT + "ai-systems-workshop-presentation-wide.png",
    investmentGuide: ROOT + "founder-tablet-operations-dashboard-wide.png",
    prompts: ROOT + "digital-product-dashboard-mockup-wide.png",
    calendarDefault: ROOT + "content-calendar-devices-wide.png",
    calendarBundlePortrait: ROOT + "founder-dashboard-portrait.png?v=calendar-bundle-portrait-20260430",
    checkoutTrust: ROOT + "beauty-client-calendar-automation-wide.png?v=checkout-trust-20260427",
    courseInstructor: ROOT + "ai-systems-workshop-presentation-wide.png",
    founderPortrait: ROOT + "founders-trust-portrait-square.png",
    clinicCalendar: ROOT + "clinic-front-desk-automation-wide.png",
    beautyCalendar: ROOT + "beauty-client-calendar-automation-wide.png",
    dentalCalendar: ROOT + "clinic-front-desk-automation-wide.png",
    educationCalendar: ROOT + "ai-systems-workshop-presentation-wide.png",
    legalCalendar: ROOT + "legal-calendar-automation-wide.png",
    realEstateCalendar: ROOT + "real-estate-content-calendar-wide.png",
    clientIntakeTeam: ROOT + "founders-trust-portrait-alt-square.png",
    buildSystems: ROOT + "team-analytics-planning-wide.png"
  };

  var productImages = {
    "whatsapp-automation-guide": {
      src: assets.whatsappGuide,
      alt: "Business owners reviewing WhatsApp automation and follow-up dashboards.",
      position: "center 36%"
    },
    "lead-conversion-sequence": {
      src: assets.leadSequence,
      alt: "Business team reviewing a lead follow-up checklist and conversion workflow.",
      position: "center 38%"
    },
    "rollout-timeline": {
      src: assets.rolloutTimeline,
      alt: "Workspace showing a digital rollout timeline and planning dashboard.",
      position: "center center"
    },
    "ai-implementation-playbook": {
      src: assets.playbook,
      alt: "Instructor explaining an AI workflow during a business workshop.",
      position: "44% 36%"
    },
    "ai-system-investment-guide": {
      src: assets.investmentGuide,
      alt: "Business owner reviewing an AI system dashboard on a tablet.",
      position: "center 35%"
    },
    "service-business-prompts": {
      src: assets.checkoutTrust,
      alt: "Service business owner reviewing an AI-assisted workflow and planning dashboard.",
      position: "62% 36%"
    },
    "content-calendar": {
      src: assets.calendarDefault,
      alt: "Digital content calendar and campaign planning workspace.",
      position: "center center"
    }
  };

  var seriesImages = {
    "stop-losing-leads": {
      src: assets.clientIntakeTeam,
      alt: "The Future Studio founders ready to guide a business through lead response automation.",
      position: "center center",
      portrait: true
    },
    "first-ai-system": {
      src: assets.courseInstructor,
      alt: "Instructor explaining an AI system workflow during a business workshop.",
      position: "44% 36%"
    },
    "build-what-pays": {
      src: assets.buildSystems,
      alt: "Strategy team reviewing analytics and system planning dashboards.",
      position: "center 38%"
    }
  };

  var calendarImages = {
    clinic: {
      src: assets.clinicCalendar,
      alt: "Clinic manager reviewing appointments and content planning from the front desk.",
      position: "64% 36%"
    },
    beauty: {
      src: assets.beautyCalendar,
      alt: "Beauty business owner reviewing a content calendar and client automation dashboard.",
      position: "62% 36%"
    },
    dental: {
      src: assets.dentalCalendar,
      alt: "Dental clinic manager reviewing appointments and content planning.",
      position: "64% 36%"
    },
    education: {
      src: assets.educationCalendar,
      alt: "Education leader reviewing an AI-supported planning workflow.",
      position: "44% 36%"
    },
    legal: {
      src: assets.legalCalendar,
      alt: "Legal office team reviewing a content calendar and client follow-up workflow.",
      position: "62% 36%"
    },
    realestate: {
      src: assets.realEstateCalendar,
      alt: "Real estate professional reviewing a property marketing content calendar.",
      position: "58% 36%"
    },
    "real-estate": {
      src: assets.realEstateCalendar,
      alt: "Real estate professional reviewing a property marketing content calendar.",
      position: "58% 36%"
    }
  };

  var videoMap = {
    "/thank-you/audit.html": {
      src: "/shop/assets/videos/whatsapp-setup-guide-for-service-businesses.mp4",
      title: "WATCH THIS BEFORE YOUR NEXT STEP",
      titleEs: "MIRA ESTO ANTES DEL SIGUIENTE PASO",
      intro: "A short walkthrough of how the WhatsApp guide helps clean up the first response layer before bigger automation decisions.",
      introEs: "Un recorrido corto de como la guia de WhatsApp ayuda a ordenar la primera respuesta antes de decisiones de automatizacion mas grandes.",
      label: "WhatsApp Automation Guide video"
    },
    "/thank-you/learn.html": {
      src: "/shop/assets/videos/90-day-ai-rollout-timeline.mp4",
      title: "WATCH THIS BEFORE PLANNING THE ROLLOUT",
      titleEs: "MIRA ESTO ANTES DE PLANIFICAR EL ROLLOUT",
      intro: "A short walkthrough of how the timeline gives the first 90 days a calmer order.",
      introEs: "Un recorrido corto de como el timeline da mas orden a los primeros 90 dias.",
      label: "90-Day AI Rollout Timeline video"
    },
    "/thank-you/build.html": {
      src: "/shop/assets/videos/20-ai-prompts-for-service-businesses.mp4",
      title: "WATCH THIS BEFORE USING THE PROMPTS",
      titleEs: "MIRA ESTO ANTES DE USAR LOS PROMPTS",
      intro: "A short walkthrough of how the prompt pack helps service businesses improve replies, follow-up, and admin messages.",
      introEs: "Un recorrido corto de como el pack de prompts ayuda a mejorar respuestas, seguimiento y mensajes administrativos.",
      label: "20 Prompts for Service Businesses video"
    },
    "/shop/step-2/build/": {
      src: "/shop/assets/videos/20-ai-prompts-for-service-businesses.mp4",
      title: "WATCH THIS BEFORE USING THE PROMPTS",
      titleEs: "MIRA ESTO ANTES DE USAR LOS PROMPTS",
      intro: "See how the prompts help turn common service business tasks into cleaner AI-assisted workflows.",
      introEs: "Mira como los prompts convierten tareas comunes de negocios de servicios en flujos mas claros con IA.",
      label: "20 Prompts for Service Businesses video"
    },
    "/shop/step-3/audit/": {
      src: "/shop/assets/videos/30-day-lead-conversion-sequence.mp4",
      title: "WATCH THIS BEFORE BUILDING FOLLOW-UP",
      titleEs: "MIRA ESTO ANTES DE CONSTRUIR EL SEGUIMIENTO",
      intro: "A short walkthrough of how the sequence keeps qualified leads moving after the first reply.",
      introEs: "Un recorrido corto de como la secuencia mantiene los leads calificados avanzando despues de la primera respuesta.",
      label: "30-Day Lead Conversion Sequence video"
    },
    "/shop/step-3/learn/": {
      src: "/shop/assets/videos/ai-implementation-playbook.mp4",
      title: "WATCH THIS BEFORE IMPLEMENTATION",
      titleEs: "MIRA ESTO ANTES DE IMPLEMENTAR",
      intro: "A short walkthrough of how the playbook turns AI planning into a practical implementation order.",
      introEs: "Un recorrido corto de como el playbook convierte la planificacion de IA en un orden practico de implementacion.",
      label: "AI Implementation Playbook video"
    },
    "/shop/series/first-ai-system.html": {
      src: "/shop/assets/videos/your-first-ai-system.mp4",
      title: "WATCH THIS BEFORE RESERVING THE SERIES",
      titleEs: "MIRA ESTO ANTES DE RESERVAR LA SERIE",
      intro: "A short preview of the five-video path from AI curiosity into a working first system.",
      introEs: "Una vista previa corta del camino de cinco videos desde curiosidad de IA hasta un primer sistema funcionando.",
      label: "From Zero to Your First AI System video"
    }
  };

  function normalizePath() {
    return window.location.pathname.replace(/\/index\.html$/, "/");
  }

  function params() {
    return new URLSearchParams(window.location.search);
  }

  function firstParam(names) {
    var search = params();
    for (var i = 0; i < names.length; i += 1) {
      var value = search.get(names[i]);
      if (value) return value.split(",")[0];
    }
    return "";
  }

  function hasMultipleParam(name) {
    var value = params().get(name);
    return !!(value && value.split(",").filter(Boolean).length > 1);
  }

  function createFrame(config) {
    if (!config || !config.src) return null;

    var figure = document.createElement("figure");
    figure.className = [
      "funnel-image-frame",
      "funnel-image-frame--" + (config.variant || "product"),
      config.dark ? "funnel-image-frame--dark" : "",
      config.portrait ? "funnel-image-frame--portrait" : ""
    ].filter(Boolean).join(" ");
    figure.setAttribute("data-funnel-visual", config.id);

    if (config.position) {
      figure.style.setProperty("--funnel-image-position", config.position);
    }

    var image = document.createElement("img");
    image.src = config.src;
    image.alt = config.alt || "The Future Studio business systems preview.";
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", function () {
      figure.remove();
    });

    figure.appendChild(image);
    return figure;
  }

  function alreadyRendered(id) {
    return !!document.querySelector('[data-funnel-visual="' + id + '"]');
  }

  function insertAfterHero(config) {
    if (alreadyRendered(config.id)) return;
    var hero = document.querySelector("main .hero, #audit-hero, #learn-hero, #build-hero, #hero");
    if (!hero) return;
    var frame = createFrame(config);
    if (!frame) return;
    var section = document.createElement("section");
    section.className = "funnel-image-section";
    section.setAttribute("aria-label", "The Future Studio visual preview");
    var wrap = document.createElement("div");
    wrap.className = "wrap";
    wrap.appendChild(frame);
    section.appendChild(wrap);
    hero.parentNode.insertBefore(section, hero.nextSibling);
  }

  function appendInside(selector, config) {
    if (alreadyRendered(config.id)) return;
    var target = document.querySelector(selector);
    if (!target) return;
    var frame = createFrame(config);
    if (frame) target.appendChild(frame);
  }

  function hasVideoPreview() {
    return !!document.querySelector(".video-preview-card, .video-showcase-card, .hero-video-inline, video");
  }

  function createVideoSection(config) {
    if (!config || !config.src || hasVideoPreview()) return null;
    var section = document.createElement("section");
    section.className = "funnel-video-recovery-section";
    section.setAttribute("aria-label", config.label || "The Future Studio video preview");
    section.innerHTML =
      "<div class='wrap'>" +
        "<div class='hero-video-inline visible'>" +
          "<p class='eyebrow' data-en='Watch this before buying' data-es='Mira esto antes de comprar'>Watch this before buying</p>" +
          "<h2 class='video-showcase-title' data-en='" + config.title + "' data-es='" + (config.titleEs || config.title) + "'>" + config.title + "</h2>" +
          "<p class='video-showcase-intro' data-en='" + config.intro + "' data-es='" + (config.introEs || config.intro) + "'>" + config.intro + "</p>" +
          "<div class='video-showcase-frame'>" +
            "<video class='video-showcase-player' controls preload='metadata' playsinline aria-label='" + (config.label || "The Future Studio video") + "'>" +
              "<source src='" + config.src + "' type='video/mp4'>" +
              "Your browser does not support the video tag." +
            "</video>" +
          "</div>" +
        "</div>" +
      "</div>";
    return section;
  }

  function insertVideoAfterHero(config) {
    if (!config || alreadyRendered("video-recovery")) return;
    var hero = document.querySelector("main .hero, #audit-hero, #learn-hero, #build-hero, #hero");
    if (!hero) return;
    var section = createVideoSection(config);
    if (!section) return;
    section.setAttribute("data-funnel-visual", "video-recovery");
    hero.parentNode.insertBefore(section, hero.nextSibling);
  }

  function checkoutConfig(path) {
    var sharedCheckoutImage = {
      src: assets.checkoutTrust,
      alt: "Service business owner reviewing an AI-assisted workflow and planning dashboard.",
      position: "62% 36%"
    };
    if (path.indexOf("/checkout/whatsapp-automation-guide.html") === 0) return sharedCheckoutImage;
    if (path.indexOf("/checkout/lead-conversion-sequence.html") === 0) return sharedCheckoutImage;
    if (path.indexOf("/checkout/rollout-timeline.html") === 0) return sharedCheckoutImage;
    if (path.indexOf("/checkout/ai-implementation-playbook.html") === 0) return sharedCheckoutImage;
    if (path.indexOf("/checkout/ai-system-investment-guide.html") === 0) return sharedCheckoutImage;
    if (path.indexOf("/checkout/service-business-prompts.html") === 0) return sharedCheckoutImage;
    if (path.indexOf("/checkout/content-calendar.html") === 0) {
      return calendarImages[firstParam(["industry", "industries"])] || productImages["content-calendar"];
    }
    if (path.indexOf("/checkout/course-series.html") === 0) {
      return seriesImages[firstParam(["series", "serieses"])] || { src: assets.courseInstructor, alt: "Business instructor reviewing an AI implementation workflow." };
    }
    return null;
  }

  function thankYouConfig(path) {
    if (path.indexOf("/thank-you/product.html") === 0) {
      var product = firstParam(["product", "products"]);
      return productImages[product] || { src: assets.productMockup, alt: "Digital product dashboard preview across devices." };
    }
    if (path.indexOf("/thank-you/content-calendar.html") === 0) {
      if (hasMultipleParam("industries")) {
        return {
          src: assets.calendarBundlePortrait,
          alt: "Founder reviewing a business dashboard after multiple content calendar purchases.",
          position: "center 36%",
          portrait: true
        };
      }
      return calendarImages[firstParam(["industry", "industries"])] || productImages["content-calendar"];
    }
    if (path.indexOf("/thank-you/course-series.html") === 0) {
      return seriesImages[firstParam(["series", "serieses"])] || { src: assets.courseInstructor, alt: "Instructor explaining an AI workflow during a business workshop." };
    }
    return null;
  }

  function init() {
    var path = normalizePath();

    if (path === "/audit/" || path === "/funnel/step-1/audit/") {
      insertAfterHero({
        id: "audit-trust",
        src: assets.auditTrust,
        alt: "Business owners reviewing missed inquiries and follow-up dashboards.",
        variant: "hero",
        position: "center 38%"
      });
      return;
    }

    if (path === "/learn/" || path === "/funnel/step-1/learn/") {
      insertAfterHero({
        id: "learn-trust",
        src: assets.aiReadinessTrust,
        alt: "Business team reviewing AI opportunity and readiness dashboards.",
        variant: "hero",
        position: "center 38%"
      });
      return;
    }

    if (path === "/build/" || path === "/funnel/step-1/build/") {
      insertAfterHero({
        id: "build-trust",
        src: assets.buildSystems,
        alt: "Business team reviewing revenue recovery and automation planning dashboards.",
        variant: "hero",
        position: "center 38%"
      });
      return;
    }

    if (path === "/client-intake/") {
      insertAfterHero({
        id: "client-intake-team",
        src: assets.clientIntakeTeam,
        alt: "The Future Studio team in a strategy session before a client meeting.",
        variant: "trust",
        portrait: true,
        position: "center 34%"
      });
      return;
    }

    if (path.indexOf("/checkout/") === 0) {
      var checkout = checkoutConfig(path);
      if (checkout) {
        appendInside(".hero-panel", {
          id: "checkout-visual",
          src: checkout.src,
          alt: checkout.alt,
          variant: "checkout",
          position: checkout.position || "center 38%"
        });
      }
      return;
    }

    if (videoMap[path]) {
      insertVideoAfterHero(videoMap[path]);
      return;
    }

    if (path.indexOf("/shop/step-3/") === 0 && !hasVideoPreview()) {
      var productVisual = null;
      if (path.indexOf("/audit/") !== -1) productVisual = productImages["lead-conversion-sequence"];
      if (path.indexOf("/learn/") !== -1) productVisual = productImages["ai-implementation-playbook"];
      if (path.indexOf("/build/") !== -1) productVisual = productImages["ai-system-investment-guide"];
      if (productVisual) {
        insertAfterHero({
          id: "step3-product-visual",
          src: productVisual.src,
          alt: productVisual.alt,
          variant: "product",
          position: productVisual.position || "center 38%"
        });
      }
      return;
    }

    if (path.indexOf("/shop/series/") === 0 && !hasVideoPreview()) {
      var seriesSlug = path.split("/").pop().replace(".html", "");
      var seriesVisual = seriesImages[seriesSlug];
      if (seriesVisual) {
        insertAfterHero({
          id: "series-visual",
          src: seriesVisual.src,
          alt: seriesVisual.alt,
          variant: "course",
          position: seriesVisual.position || "center 38%",
          portrait: !!seriesVisual.portrait
        });
      }
      return;
    }

    if (path.indexOf("/shop/calendar/") === 0) {
      var match = path.match(/\/shop\/calendar\/([^\/.]+)/);
      var calendar = match && calendarImages[match[1]];
      if (calendar) {
        insertAfterHero({
          id: "industry-calendar-visual",
          src: calendar.src,
          alt: calendar.alt,
          variant: "industry",
          position: calendar.position || "center 38%"
        });
      }
      return;
    }

    if (path.indexOf("/thank-you/") === 0 && !hasVideoPreview()) {
      var thankYou = thankYouConfig(path);
      if (thankYou) {
        insertAfterHero({
          id: "thank-you-visual",
          src: thankYou.src,
          alt: thankYou.alt,
          variant: "product",
          position: thankYou.position || "center 38%",
          portrait: !!thankYou.portrait
        });
      }
      return;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
