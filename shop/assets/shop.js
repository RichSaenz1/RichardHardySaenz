var PAYMENT_LINKS = window.PAYMENT_LINKS || {};
var WEBHOOK_URL = window.WEBHOOK_URL || "";

function getTfsEmailAddress() {
  return "info" + String.fromCharCode(64) + "thefuturestudio.online";
}

function ensureSharedFunnelAssets() {
  var head = document.head || document.getElementsByTagName("head")[0];
  if (!head) return;

  function hasAsset(selector) {
    return !!document.querySelector(selector);
  }

  function addStyle(href) {
    if (hasAsset('link[href^="' + href.split("?")[0] + '"]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    head.appendChild(link);
  }

  function addScript(src) {
    if (hasAsset('script[src^="' + src.split("?")[0] + '"]')) return;
    var script = document.createElement("script");
    script.src = src;
    script.defer = true;
    head.appendChild(script);
  }

  addStyle("/assets/funnel-layout.css?v=rebuild-20260506");
  addScript("/assets/funnel-conversion.js?v=rebuild-20260506");
  addScript("/assets/funnel-visuals.js?v=rebuild-20260506");
}

function currentLang() {
  try {
    return localStorage.getItem("tfs_shop_lang") || "en";
  } catch (e) {
    return "en";
  }
}

function setLang(lang) {
  var nextLang = lang === "es" ? "es" : "en";

  try {
    localStorage.setItem("tfs_shop_lang", nextLang);
  } catch (e) {}

  document.documentElement.lang = nextLang;
  document.body.setAttribute("data-lang", nextLang);

  document.querySelectorAll(".lang-btn").forEach(function(btn) {
    btn.classList.toggle("active", btn.dataset.lang === nextLang);
  });

  document.querySelectorAll("[data-en][data-es]").forEach(function(el) {
    var value = el.getAttribute("data-" + nextLang);
    if (value !== null) {
      el.innerHTML = value;
    }
  });

  document.querySelectorAll("[data-en-placeholder][data-es-placeholder]").forEach(function(el) {
    var placeholder = el.getAttribute("data-" + nextLang + "-placeholder");
    if (placeholder !== null) {
      el.placeholder = placeholder;
    }
  });

  document.dispatchEvent(new CustomEvent("tfs:langchange", { detail: { lang: nextLang } }));
}

function initLang() {
  setLang(currentLang());

  document.querySelectorAll(".lang-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      setLang(btn.dataset.lang);
    });
  });
}

function initCanvas() {
  var canvas = document.getElementById("bg-canvas");

  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "bg-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.insertBefore(canvas, document.body.firstChild);
  }

  var context = canvas.getContext("2d");
  if (!context) return;

  var nodes = [];
  var width = 0;
  var height = 0;
  var ratio = Math.min(window.devicePixelRatio || 1, 2);

  function buildNodes() {
    var count = Math.max(20, Math.min(74, Math.floor((width * height) / 25000)));
    nodes = [];

    for (var i = 0; i < count; i += 1) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: 1 + Math.random() * 1.7
      });
    }
  }

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    buildNodes();
  }

  function draw() {
    context.clearRect(0, 0, width, height);

    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      context.beginPath();
      context.fillStyle = "rgba(0,229,204,0.58)";
      context.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      context.fill();
    }

    for (var a = 0; a < nodes.length; a += 1) {
      for (var b = a + 1; b < nodes.length; b += 1) {
        var dx = nodes[a].x - nodes[b].x;
        var dy = nodes[a].y - nodes[b].y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 128) {
          var alpha = (1 - distance / 128) * 0.26;
          context.beginPath();
          context.strokeStyle = "rgba(0,229,204," + alpha.toFixed(3) + ")";
          context.lineWidth = 1;
          context.moveTo(nodes[a].x, nodes[a].y);
          context.lineTo(nodes[b].x, nodes[b].y);
          context.stroke();
        }
      }
    }

    window.requestAnimationFrame(draw);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  window.requestAnimationFrame(draw);
}

function initNav() {
  var nav = document.querySelector(".site-nav");
  if (!nav) return;

  var navInner = nav.querySelector(".site-nav-inner");
  var navPrimary = nav.querySelector(".nav-primary");
  var navActions = nav.querySelector(".nav-actions");
  if (!navInner || !navPrimary || !navActions) return;

  var hamburger = nav.querySelector(".nav-hamburger");
  if (!hamburger) {
    hamburger = document.createElement("button");
    hamburger.className = "nav-hamburger";
    hamburger.type = "button";
    hamburger.setAttribute("aria-label", "Toggle navigation");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.innerHTML = "<span></span><span></span><span></span>";
    navInner.appendChild(hamburger);
  }

  var mobileDrawer = nav.querySelector(".nav-mobile");
  if (!mobileDrawer) {
    mobileDrawer = document.createElement("div");
    mobileDrawer.className = "nav-mobile";
    nav.appendChild(mobileDrawer);
  }

  mobileDrawer.innerHTML = "";

  var mobilePrimary = navPrimary.cloneNode(true);
  var mobileActions = navActions.cloneNode(true);
  mobileDrawer.appendChild(mobilePrimary);
  mobileDrawer.appendChild(mobileActions);

  hamburger.addEventListener("click", function() {
    var open = mobileDrawer.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
  });

  mobileDrawer.querySelectorAll("a, button").forEach(function(target) {
    target.addEventListener("click", function() {
      mobileDrawer.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });

  function syncNav() {
    nav.classList.toggle("scrolled", window.scrollY > 10);
  }

  syncNav();
  window.addEventListener("scroll", syncNav, { passive: true });
}

function initReveals() {
  var elements = document.querySelectorAll(".aos");
  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach(function(el) { el.classList.add("visible"); });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  elements.forEach(function(el) {
    observer.observe(el);
  });
}

function initFaqs() {
  document.querySelectorAll(".faq-item").forEach(function(item, index) {
    var button = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!button || !answer) return;

    if (!answer.id) {
      answer.id = "faq-answer-" + index;
    }

    button.setAttribute("aria-controls", answer.id);
    button.setAttribute("aria-expanded", "false");
    answer.hidden = true;

    button.addEventListener("click", function() {
      var open = item.classList.toggle("open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
      answer.hidden = !open;
    });
  });
}

function activateCheckout(trigger) {
  var checkout = document.getElementById("checkout-slot");
  if (!checkout) return;

  var productName = trigger.getAttribute("data-product-name") || "This product";
  var priceLabel = trigger.getAttribute("data-price-label") || "$0";
  var productDetail = trigger.getAttribute("data-product-detail") || "";
  var nextStep = trigger.getAttribute("data-next-step") || "";
  var productNote = trigger.getAttribute("data-product-note") || "";
  var emailAddress = getTfsEmailAddress();
  var emailHref = "mailto:" + emailAddress +
    "?subject=" + encodeURIComponent("Reserve: " + productName) +
    "&body=" + encodeURIComponent("Hi The Future Studio,\n\nI want to reserve access to \"" + productName + "\" (" + priceLabel + ").\n\nPlease send me the manual payment link.\n");
  var whatsappText = encodeURIComponent("Hi The Future Studio - I want to reserve access to \"" + productName + "\" (" + priceLabel + "). Please send me the payment link.");

  var nameEl = document.getElementById("checkout-product-name");
  var priceEl = document.getElementById("checkout-product-price");
  var detailEl = document.getElementById("checkout-product-detail");
  var nextEl = document.getElementById("checkout-next-step");
  var noteEl = document.getElementById("checkout-product-note");
  var emailEl = document.getElementById("manual-order-email");
  var waEl = document.getElementById("manual-order-whatsapp");

  if (nameEl) nameEl.textContent = productName;
  if (priceEl) priceEl.textContent = priceLabel;
  if (detailEl && productDetail) detailEl.textContent = productDetail;
  if (nextEl && nextStep) nextEl.textContent = nextStep;
  if (noteEl && productNote) noteEl.textContent = productNote;
  if (emailEl) emailEl.href = emailHref;
  if (waEl) waEl.href = "https://wa.me/50766753870?text=Hola%2C%20vi%20su%20sitio%20y%20me%20interesa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20IA%20para%20mi%20negocio." + whatsappText;

  checkout.classList.add("active");
  checkout.scrollIntoView({ behavior: "smooth", block: "start" });
}

function initBuyTriggers() {
  document.querySelectorAll(".buy-trigger").forEach(function(link) {
    link.addEventListener("click", function(event) {
      var paymentKey = link.getAttribute("data-payment-key") || "";
      var mappedPayment = PAYMENT_LINKS[paymentKey] || "";
      var checkoutUrl = link.getAttribute("data-checkout-url") || mappedPayment;

      if (checkoutUrl && checkoutUrl !== "TODO") {
        return;
      }

      event.preventDefault();
      activateCheckout(link);
    });
  });
}

function initWaitlists() {
  document.querySelectorAll(".waitlist-form").forEach(function(form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault();

      var input = form.querySelector('input[type="email"]');
      var message = form.querySelector(".waitlist-message");
      var product = form.getAttribute("data-product") || "coming-soon";
      var email = input ? input.value.trim() : "";

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (message) {
          message.textContent = "Please enter a valid email.";
        }
        return;
      }

      var payload = {
        product: product,
        email: email,
        timestamp: new Date().toISOString()
      };

      try {
        var existing = JSON.parse(localStorage.getItem("tfs_waitlist_interest") || "[]");
        existing.push(payload);
        localStorage.setItem("tfs_waitlist_interest", JSON.stringify(existing));
      } catch (e) {}

      if (WEBHOOK_URL) {
        fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).catch(function() {});
      }

      form.reset();

      if (message) {
        message.textContent = "You are on the list. We will notify you first.";
      }
    });
  });
}

function initStep4() {
  if (!window.TFS_INDUSTRY_DATA) return;

  var picker = document.getElementById("industry-picker");
  if (!picker) return;

  var titleEl = document.getElementById("industry-title");
  var copyEl = document.getElementById("industry-copy");
  var sideEl = document.getElementById("industry-side-copy");
  var trustEls = [
    document.getElementById("trust-1"),
    document.getElementById("trust-2"),
    document.getElementById("trust-3")
  ];
  var noteEl = document.getElementById("checkout-product-note");
  var nextEl = document.getElementById("checkout-next-step");
  var detailEl = document.getElementById("checkout-product-detail");
  var trigger = document.getElementById("main-buy-trigger");

  function renderIndustry(slug) {
    var lang = currentLang() === "es" ? "es" : "en";
    var key = window.TFS_INDUSTRY_DATA[slug] ? slug : "clinic";
    var data = window.TFS_INDUSTRY_DATA[key];

    if (titleEl) titleEl.textContent = data.title[lang];
    if (copyEl) copyEl.textContent = data.copy[lang];
    if (sideEl) sideEl.textContent = data.side[lang];
    if (trustEls[0]) trustEls[0].textContent = data.trust[0][lang];
    if (trustEls[1]) trustEls[1].textContent = data.trust[1][lang];
    if (trustEls[2]) trustEls[2].textContent = data.trust[2][lang];
    if (noteEl) noteEl.textContent = data.note[lang];
    if (nextEl) nextEl.textContent = data.next[lang];
    if (detailEl) detailEl.textContent = data.detail[lang];
    if (trigger) {
      trigger.setAttribute("data-product-name", data.product[lang]);
      trigger.setAttribute("data-product-detail", data.detail[lang]);
      trigger.setAttribute("data-product-note", data.note[lang]);
      trigger.setAttribute("data-next-step", data.next[lang]);
    }

    document.querySelectorAll("#industry-picker button").forEach(function(btn) {
      btn.classList.toggle("active", btn.dataset.industry === key);
    });

    document.querySelectorAll(".industry-card").forEach(function(card) {
      card.classList.toggle("active", card.dataset.industry === key);
    });

    window.currentIndustry = key;
  }

  document.querySelectorAll("#industry-picker button").forEach(function(btn) {
    btn.addEventListener("click", function() {
      renderIndustry(btn.dataset.industry);
    });
  });

  document.querySelectorAll(".industry-card").forEach(function(card) {
    card.addEventListener("click", function() {
      renderIndustry(card.dataset.industry);
    });
  });

  document.addEventListener("tfs:langchange", function() {
    renderIndustry(window.currentIndustry || "clinic");
  });

  var params = new URLSearchParams(window.location.search);
  renderIndustry(params.get("industry") || "clinic");
}

document.addEventListener("DOMContentLoaded", function() {
  ensureSharedFunnelAssets();
  initCanvas();
  initNav();
  initLang();
  initBuyTriggers();
  initWaitlists();
  initFaqs();
  initReveals();
  initStep4();
});
