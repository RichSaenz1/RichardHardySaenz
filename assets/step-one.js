(function () {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const money = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const number = new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  });

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function readConfig() {
    const data = qs("#flow-data");
    if (!data) return null;
    try {
      return JSON.parse(data.textContent);
    } catch (error) {
      console.warn("Could not parse step one config", error);
      return null;
    }
  }

  function setText(selector, value, root = document) {
    const element = qs(selector, root);
    if (element) element.textContent = value;
  }

  function getLeadDetails(form) {
    if (!form) return { name: "", email: "" };
    const name = qs('[name="name"]', form);
    const email = qs('[name="email"]', form);
    return {
      name: name ? name.value.trim() : "",
      email: email ? email.value.trim() : "",
    };
  }

  function hasValidEmail(form) {
    return EMAIL_RE.test(getLeadDetails(form).email);
  }

  function setStatus(node, message) {
    if (node) node.textContent = message || "";
  }

  function saveLocalLead(payload) {
    try {
      const key = "tfs_step_one_leads";
      const saved = JSON.parse(localStorage.getItem(key) || "[]");
      saved.push(Object.assign({ saved_at: new Date().toISOString() }, payload));
      localStorage.setItem(key, JSON.stringify(saved).slice(0, 60000));
    } catch (error) {
      console.warn("Local lead fallback failed", error);
    }
  }

  async function submitStepLead(payload, statusNode) {
    setStatus(statusNode, "Sending your analysis...");
    saveLocalLead(payload);
    if (window.TFSLeadCapture && typeof window.TFSLeadCapture.submitLead === "function") {
      try {
        await window.TFSLeadCapture.submitLead(payload);
      } catch (error) {
        console.warn("Lead capture submit failed", error);
      }
    }
    setStatus(statusNode, "Saved. Your analysis is ready below and queued for follow-up.");
  }

  function initQuiz(config) {
    const list = qs("[data-question-list]");
    const progressFill = qs("[data-progress-fill]");
    const progressText = qs("[data-progress-text]");
    const resultButton = qs("[data-show-result]");
    const resultPanel = qs("#result-panel");
    const scoreNode = qs("[data-score]");
    const resultTitle = qs("[data-result-title]");
    const resultDescription = qs("[data-result-description]");
    const strengthsList = qs("[data-strengths]");
    const gapsList = qs("[data-gaps]");
    const retakeButton = qs("[data-retake]");
    const leadForm = qs("[data-lead-gate]");
    const statusNode = qs("[data-gate-status]");

    if (!list || !config.questions) return;

    const answers = new Map();

    list.innerHTML = config.questions
      .map((question, index) => {
        const count = String(index + 1).padStart(2, "0");
        return `
          <article class="question-card" data-question="${index}">
            <div class="q-number">${count}</div>
            <p class="q-text">${question.text}</p>
            <div class="q-actions" role="group" aria-label="Answer question ${index + 1}">
              <button class="q-btn" type="button" data-answer="yes">Yes</button>
              <button class="q-btn" type="button" data-answer="no">No</button>
            </div>
          </article>
        `;
      })
      .join("");

    function updateProgress() {
      const answered = answers.size;
      const total = config.questions.length;
      const percentage = Math.round((answered / total) * 100);
      if (progressFill) progressFill.style.width = `${percentage}%`;
      if (progressText) progressText.textContent = `${answered}/${total} answered`;
      if (resultButton) resultButton.disabled = answered !== total || !hasValidEmail(leadForm);
    }

    function pickResult(score) {
      const levels = config.results || [];
      return (
        levels.find((level) => score >= level.min && score <= level.max) ||
        levels[levels.length - 1] || {
          title: "Result ready",
          description: "Your answers show where the strongest next move is.",
        }
      );
    }

    function buildResult() {
      const total = config.questions.length;
      const score = Array.from(answers.values()).filter(Boolean).length;
      const result = pickResult(score);
      const strengths = config.questions.filter((_, index) => answers.get(index));
      const gaps = config.questions.filter((_, index) => !answers.get(index));
      return { total, score, result, strengths, gaps };
    }

    function renderResult(summary) {
      const { total, score, result, strengths, gaps } = summary;

      setText("[data-score]", `${score}/${total}`, resultPanel || document);
      setText("[data-result-title]", result.title, resultPanel || document);
      setText("[data-result-description]", result.description, resultPanel || document);
      if (scoreNode) scoreNode.style.setProperty("--score", `${Math.round((score / total) * 100)}%`);
      if (resultTitle) resultTitle.textContent = result.title;
      if (resultDescription) resultDescription.textContent = result.description;

      if (strengthsList) {
        strengthsList.innerHTML = strengths.length
          ? strengths.map((item) => `<li>${item.strength || item.text}</li>`).join("")
          : "<li>No strengths selected yet. That is useful clarity, not a dead end.</li>";
      }

      if (gapsList) {
        gapsList.innerHTML = gaps.length
          ? gaps.map((item) => `<li>${item.gap || item.text}</li>`).join("")
          : "<li>No obvious gaps from this first pass. The next step is precision.</li>";
      }

      if (resultPanel) {
        resultPanel.classList.add("visible");
        resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    async function submitAndShow(event) {
      if (event) event.preventDefault();
      if (answers.size !== config.questions.length || !hasValidEmail(leadForm)) {
        setStatus(statusNode, "Answer every question and add a valid email to receive your analysis.");
        return;
      }
      const summary = buildResult();
      const lead = getLeadDetails(leadForm);
      const answersJson = config.questions.map((question, index) => ({
        question: question.text,
        answer: answers.get(index) ? "yes" : "no",
      }));
      await submitStepLead({
        source_form: `${config.slug || "step-one"}-results-gate`,
        lead_type: "free-tool-lead",
        name: lead.name,
        email: lead.email,
        product_interest: config.title || document.title,
        analysis_type: config.title || "Step one analysis",
        analysis_request: "Email my results and analysis",
        score: `${summary.score}/${summary.total}`,
        result_summary: `${summary.result.title}: ${summary.result.description}`,
        answers_json: JSON.stringify(answersJson),
        tags: "email-consent,free-tool,step-one",
      }, statusNode);
      renderResult(summary);
    }

    list.addEventListener("click", (event) => {
      const button = event.target.closest("[data-answer]");
      if (!button) return;
      const card = button.closest("[data-question]");
      const index = Number(card.dataset.question);
      const answer = button.dataset.answer === "yes";
      answers.set(index, answer);
      card.classList.toggle("yes", answer);
      card.classList.toggle("no", !answer);
      qsa(".q-btn", card).forEach((item) => item.classList.toggle("active", item === button));
      updateProgress();
    });

    if (leadForm) leadForm.addEventListener("submit", submitAndShow);
    if (leadForm) leadForm.addEventListener("input", updateProgress);
    if (resultButton && !leadForm) resultButton.addEventListener("click", submitAndShow);
    if (retakeButton) {
      retakeButton.addEventListener("click", () => {
        answers.clear();
        qsa(".question-card", list).forEach((card) => {
          card.classList.remove("yes", "no");
          qsa(".q-btn", card).forEach((button) => button.classList.remove("active"));
        });
        if (resultPanel) resultPanel.classList.remove("visible");
        setStatus(statusNode, "");
        updateProgress();
        list.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    updateProgress();
  }

  function initCalculator() {
    const form = qs("[data-calculator]");
    const leadForm = qs("[data-calculator-gate]");
    const statusNode = qs("[data-gate-status]");
    if (!form) return;
    let latest = {};

    const read = (name) => {
      const input = qs(`[name="${name}"]`, form);
      return input ? Number(input.value || 0) : 0;
    };

    function update() {
      const daily = read("daily");
      const value = read("value");
      const missed = read("missed");
      const conversion = read("conversion");
      const adminHours = read("adminHours");
      const adminRate = read("adminRate");

      const monthlyInquiries = daily * 30;
      const missedMonthly = monthlyInquiries * (missed / 100);
      const lostClients = missedMonthly * (conversion / 100);
      const revenueLost = lostClients * value;
      const adminCost = adminHours * 4 * adminRate;
      const monthlyOpportunity = revenueLost + adminCost;
      const annualOpportunity = monthlyOpportunity * 12;
      latest = {
        daily,
        value,
        missed,
        conversion,
        adminHours,
        adminRate,
        monthlyInquiries,
        missedMonthly,
        lostClients,
        revenueLost,
        adminCost,
        monthlyOpportunity,
        annualOpportunity,
      };

      setText("[data-missed-month]", number.format(missedMonthly));
      setText("[data-lost-clients]", number.format(lostClients));
      setText("[data-revenue-lost]", money.format(revenueLost));
      setText("[data-admin-cost]", money.format(adminCost));
      setText("[data-monthly-opportunity]", money.format(monthlyOpportunity));
      setText("[data-annual-opportunity]", money.format(annualOpportunity));
    }

    form.addEventListener("input", update);
    if (leadForm) {
      leadForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!hasValidEmail(leadForm)) {
          setStatus(statusNode, "Add a valid email to receive your calculator analysis.");
          return;
        }
        const lead = getLeadDetails(leadForm);
        await submitStepLead({
          source_form: "build-calculator-results-gate",
          lead_type: "free-tool-lead",
          name: lead.name,
          email: lead.email,
          product_interest: "Business Revenue Calculator",
          analysis_type: "Revenue opportunity calculator",
          analysis_request: "Email my calculator results and analysis",
          result_summary: `Estimated monthly opportunity: ${money.format(latest.monthlyOpportunity || 0)}. Estimated annual opportunity: ${money.format(latest.annualOpportunity || 0)}.`,
          monthly_revenue_at_risk: money.format(latest.monthlyOpportunity || 0),
          annual_revenue_at_risk: money.format(latest.annualOpportunity || 0),
          calculator_inputs: JSON.stringify(latest),
          tags: "email-consent,free-tool,step-one,calculator",
        }, statusNode);
      });
    }
    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const config = readConfig();
    if (config && config.type === "quiz") initQuiz(config);
    initCalculator();
  });
})();
