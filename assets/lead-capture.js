(function () {
  var FORM_NAME = "future-studio-leads";
  var CONSENT_EN = "By submitting, you agree to receive follow-up emails from The Future Studio. You can unsubscribe anytime.";
  var CONSENT_ES = "Al enviar, aceptas recibir emails de seguimiento de The Future Studio. Puedes darte de baja en cualquier momento.";
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function getLang() {
    var active = document.querySelector(".lang-btn.active");
    return (active && active.getAttribute("data-lang")) || document.documentElement.lang || "en";
  }

  function qs(name) {
    try {
      return new URLSearchParams(window.location.search).get(name) || "";
    } catch (e) {
      return "";
    }
  }

  function detectFunnelPath() {
    var path = window.location.pathname;
    if (path.indexOf("/audit") !== -1) return "audit";
    if (path.indexOf("/learn") !== -1) return "learn";
    if (path.indexOf("/build") !== -1) return "build";
    if (path.indexOf("/client-intake") !== -1) return "client-intake";
    if (path.indexOf("/checkout") !== -1) return "checkout";
    if (path.indexOf("/shop") !== -1) return "shop";
    return "main-site";
  }

  function detectProductName() {
    var productParam = qs("product") || qs("products") || qs("series") || qs("serieses") || qs("industry") || qs("industries");
    var jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (jsonLd) {
      try {
        var data = JSON.parse(jsonLd.textContent);
        if (data && data.name) return data.name;
      } catch (e) {}
    }
    var checkoutTitle = document.querySelector(".payment-row strong, #series-checkout-title, .hero-title, h1");
    return productParam || (checkoutTitle ? checkoutTitle.textContent.trim().replace(/\s+/g, " ") : "");
  }

  function detectLeadType(sourceForm) {
    if (sourceForm && sourceForm.indexOf("checkout") !== -1) return "checkout-lead";
    if (sourceForm && sourceForm.indexOf("intake") !== -1) return "client-intake";
    if (sourceForm && sourceForm.indexOf("gate") !== -1) return "free-tool-lead";
    if (sourceForm && sourceForm.indexOf("audit") !== -1) return "audit-lead";
    return "funnel-lead";
  }

  function getInputValue(ids) {
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el && el.value) return el.value.trim();
    }
    return "";
  }

  function collectCommonFields(payload) {
    var params = new URLSearchParams(window.location.search);
    var lang = getLang();
    return Object.assign({
      "form-name": FORM_NAME,
      subject: "New Funnel Lead - The Future Studio",
      "bot-field": "",
      source_form: payload.source_form || "unknown",
      lead_type: payload.lead_type || detectLeadType(payload.source_form || ""),
      funnel_path: payload.funnel_path || detectFunnelPath(),
      product_name: payload.product_name || detectProductName(),
      product_interest: payload.product_interest || detectProductName(),
      industry: payload.industry || qs("industry") || qs("industries"),
      preferred_language: payload.preferred_language || lang,
      page_url: window.location.href,
      page_title: document.title || "",
      timestamp: new Date().toISOString(),
      consent: payload.consent || "email_follow_up",
      tags: payload.tags || "",
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || ""
    }, payload);
  }

  function submitLead(payload) {
    payload = collectCommonFields(payload || {});
    if (!payload.email || !EMAIL_RE.test(payload.email)) return Promise.resolve(false);

    var body = new URLSearchParams();
    Object.keys(payload).forEach(function (key) {
      body.append(key, payload[key] == null ? "" : String(payload[key]));
    });

    return fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      keepalive: true
    }).then(function () {
      return true;
    }).catch(function () {
      return false;
    });
  }

  function addOrUpdateHidden(form, name, value) {
    if (!form) return;
    var input = form.querySelector('[name="' + name + '"]');
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      form.appendChild(input);
    }
    input.value = value == null ? "" : String(value);
  }

  function enrichVisibleForm(form, sourceForm) {
    var common = collectCommonFields({ source_form: sourceForm || form.getAttribute("name") || form.id || "visible-form" });
    ["page_url", "page_title", "product_name", "product_interest", "funnel_path", "preferred_language", "timestamp", "consent", "lead_type"].forEach(function (key) {
      addOrUpdateHidden(form, key, common[key]);
    });
  }

  function injectConsentLines() {
    document.querySelectorAll('input[type="email"]').forEach(function (input) {
      if (input.getAttribute("data-consent-added") === "true") return;
      input.setAttribute("data-consent-added", "true");
      var line = document.createElement("p");
      line.className = "tfs-consent-line";
      line.setAttribute("data-en", CONSENT_EN);
      line.setAttribute("data-es", CONSENT_ES);
      line.textContent = getLang() === "es" ? CONSENT_ES : CONSENT_EN;
      input.insertAdjacentElement("afterend", line);
    });
  }

  function updateConsentLanguage() {
    var text = getLang() === "es" ? CONSENT_ES : CONSENT_EN;
    document.querySelectorAll(".tfs-consent-line").forEach(function (line) {
      line.textContent = text;
    });
  }

  function installCheckoutCapture() {
    document.addEventListener("submit", function (event) {
      var form = event.target;
      if (!form || !(form.id === "checkout-form" || form.classList.contains("payment-form") || form.getAttribute("name") === "future-studio-client-intake")) return;
      enrichVisibleForm(form, form.id === "checkout-form" ? "checkout-form" : form.getAttribute("name"));
      var email = getInputValue(["checkout-email", "gate-email", "input-email"]);
      var name = getInputValue(["checkout-name", "gate-name", "input-name"]);
      if (email) {
        submitLead({
          source_form: form.id === "checkout-form" ? "checkout-form" : form.getAttribute("name"),
          name: name,
          email: email,
          business_name: getInputValue(["input-biz"]),
          tags: "email-consent,auto-capture"
        });
      }
    }, true);
  }

  function installFunctionWrappers() {
    ["submitEmail", "submitGate"].forEach(function (fnName) {
      var original = window[fnName];
      if (typeof original !== "function" || original.__tfsWrapped) return;
      var wrapped = function () {
        var email = getInputValue(["input-email", "gate-email"]);
        var name = getInputValue(["input-name", "gate-name"]);
        var businessName = getInputValue(["input-biz"]);
        var result = original.apply(this, arguments);
        if (email && EMAIL_RE.test(email)) {
          submitLead({
            source_form: fnName === "submitEmail" ? "audit-email-gate" : "tool-results-gate",
            name: name,
            email: email,
            business_name: businessName,
            score: window.quizData && window.quizData.score ? window.quizData.score : "",
            result_summary: window.resultData ? JSON.stringify(window.resultData).slice(0, 900) : "",
            monthly_revenue_at_risk: getInputValue(["g-monthly"]),
            annual_revenue_at_risk: getInputValue(["g-annual"]),
            tags: "email-consent,free-tool"
          });
        }
        return result;
      };
      wrapped.__tfsWrapped = true;
      window[fnName] = wrapped;
    });
  }

  function injectStyles() {
    if (document.getElementById("tfs-lead-capture-styles")) return;
    var style = document.createElement("style");
    style.id = "tfs-lead-capture-styles";
    style.textContent = ".tfs-consent-line{margin:6px 0 0;font-size:11px;line-height:1.45;color:rgba(255,255,255,.52)}.hero-panel .tfs-consent-line,.gate-card .tfs-consent-line{color:var(--text-muted, #757575)}.payment-panel .tfs-consent-line,.gate-action-card .tfs-consent-line{color:rgba(255,255,255,.58)}";
    document.head.appendChild(style);
  }

  function init() {
    injectStyles();
    injectConsentLines();
    updateConsentLanguage();
    installCheckoutCapture();
    setTimeout(installFunctionWrappers, 0);
    document.addEventListener("click", function (event) {
      if (event.target && event.target.closest && event.target.closest(".lang-btn")) {
        setTimeout(updateConsentLanguage, 0);
      }
    });
    document.querySelectorAll("form").forEach(function (form) {
      enrichVisibleForm(form, form.getAttribute("name") || form.id || "visible-form");
    });
  }

  window.TFSLeadCapture = {
    submitLead: submitLead,
    enrichVisibleForm: enrichVisibleForm,
    consentEnglish: CONSENT_EN,
    consentSpanish: CONSENT_ES
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
