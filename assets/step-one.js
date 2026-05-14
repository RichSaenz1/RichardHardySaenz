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

  function collectFormData(form) {
    const data = {};
    if (!form) return data;
    qsa("input, select, textarea", form).forEach((field) => {
      if (!field.name || field.type === "button" || field.type === "submit") return;
      data[field.name] = field.value ? field.value.trim() : "";
    });
    return data;
  }

  function clean(value, fallback = "Not provided") {
    return value == null || value === "" ? fallback : String(value);
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function listHtml(items) {
    return (items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function pickIntakeSystem(context) {
    const channel = (context.main_channel || "").toLowerCase();
    const problem = (context.biggest_problem || context.loss_cause || "").toLowerCase();
    const current = (context.current_system || "").toLowerCase();

    if (problem.includes("missed call") || channel.includes("phone")) {
      return {
        name: "Voice Agent",
        reason: "missed calls need instant capture, triage, callback routing, and transcripts so demand does not disappear."
      };
    }
    if (problem.includes("slow") || channel.includes("whatsapp") || current.includes("whatsapp")) {
      return {
        name: "WhatsApp Automation Agent",
        reason: "your fastest win is likely faster replies, qualification, and guided next steps inside the channel clients already use."
      };
    }
    if (problem.includes("booking")) {
      return {
        name: "Booking Flow Automation",
        reason: "the leak appears to be between interest and appointment, so reminders, confirmations, and self-booking should carry more of the work."
      };
    }
    if (problem.includes("scattered") || current.includes("disconnected") || current.includes("none")) {
      return {
        name: "Lead Pipeline Automation",
        reason: "leads need one reliable place, clear status, follow-up tasks, and routing before more advanced AI adds value."
      };
    }
    if (problem.includes("question")) {
      return {
        name: "Website + AI Assistant",
        reason: "repeated questions are a sign that prospects need clearer answers before a human spends time with them."
      };
    }
    return {
      name: "Custom Workflow Automation",
      reason: "the answers point to an operational bottleneck that should be mapped, connected, and automated around your actual workflow."
    };
  }

  function leadRangeValue(range) {
    const map = {
      "Under 25": 15,
      "25-75": 50,
      "76-150": 110,
      "151-300": 220,
      "300+": 350,
    };
    return map[range] || 50;
  }

  function clientValueRangeValue(range) {
    const map = {
      "Under $100": 75,
      "$100-$300": 200,
      "$301-$750": 500,
      "$751-$1,500": 1100,
      "$1,500+": 1800,
    };
    return map[range] || 250;
  }

  function buildAuditReport(summary, context) {
    const system = pickIntakeSystem(context);
    const estimatedLeads = leadRangeValue(context.monthly_enquiries);
    const estimatedValue = clientValueRangeValue(context.average_client_value_range);
    const riskBand = estimatedLeads * estimatedValue * 0.08;
    const stage = summary.result.title;

    return {
      title: "Your Intake Leak Report",
      stage,
      system: system.name,
      summary: `${stage}. Your answers suggest the main opportunity is to reduce ${clean(context.biggest_problem, "lead leakage").toLowerCase()} across ${clean(context.main_channel, "your intake channels").toLowerCase()}.`,
      value: `A conservative first-pass estimate puts ${money.format(riskBand)}+ per month in potentially protectable opportunity if faster response, qualification, and follow-up recover only a small share of enquiries.`,
      sections: [
        {
          title: "What your business may need",
          items: [
            `Primary system fit: ${system.name}`,
            `Why: ${system.reason}`,
            `Lead context: ${clean(context.monthly_enquiries)} enquiries/month through ${clean(context.main_channel).toLowerCase()}`,
          ],
        },
        {
          title: "Highest-value fixes",
          items: [
            "Capture every enquiry into one reliable lead record.",
            "Reply instantly with the right next step, even after hours.",
            "Route high-intent leads to booking or human follow-up before they cool down.",
          ],
        },
        {
          title: "Recommended 30-day action plan",
          items: [
            "Map the first response and follow-up path for your main lead channel.",
            "Create a simple qualification script and booking handoff.",
            `Pilot ${system.name} around the highest-leak step before expanding the system.`,
          ],
        },
      ],
    };
  }

  function buildLearnReport(summary, context) {
    const goal = (context.ai_goal || "").toLowerCase();
    const preference = (context.implementation_preference || "").toLowerCase();
    let system = "AI Starting Point Workshop";
    let reason = "the first win is choosing the right use case, examples, and review process before building.";

    if (preference.includes("teach")) {
      system = "Future Studio Academy";
      reason = "you want capability in-house, so the best next step is practical training and workflow design.";
    } else if (goal.includes("lead")) {
      system = "WhatsApp Automation Agent or Lead Pipeline Automation";
      reason = "lead response needs speed, qualification, and follow-up more than a generic AI tool.";
    } else if (goal.includes("booking")) {
      system = "Booking Flow Automation";
      reason = "booking and reminders are measurable, repeatable, and ideal for a contained first AI workflow.";
    } else if (goal.includes("content")) {
      system = "AI Content Agent";
      reason = "content systems need brand rules, repeatable prompts, approvals, and publishing handoff.";
    } else if (goal.includes("admin") || goal.includes("workflow")) {
      system = "Custom Workflow Automation";
      reason = "internal work needs process cleanup, tool connections, and clear ownership before AI is added.";
    }

    return {
      title: "Your AI Starting Point Report",
      stage: summary.result.title,
      system,
      summary: `${summary.result.title}. The strongest path is not simply whether you are ready for AI; it is choosing the next step that matches your goal, team skill, and process clarity.`,
      value: "The value is avoiding a messy AI build, reducing repeated manual work, and choosing a first use case that can produce a measurable business result.",
      sections: [
        {
          title: "Best-fit next path",
          items: [
            `Recommended path: ${system}`,
            `Why: ${reason}`,
            `Preference: ${clean(context.implementation_preference)}. Team level: ${clean(context.team_skill)}.`,
          ],
        },
        {
          title: "What to prepare",
          items: [
            "One clear business outcome in a single sentence.",
            "Real examples, scripts, answers, or documents the system can learn from.",
            "A human owner who reviews AI-assisted work before clients see it.",
          ],
        },
        {
          title: "Recommended 30-day action plan",
          items: [
            "Choose one process, not a broad AI transformation.",
            "Collect 10-20 real examples of the work or questions involved.",
            `Decide whether this should be training, workflow cleanup, or a ${system} pilot.`,
          ],
        },
      ],
    };
  }

  function buildCalculatorReport(latest, context) {
    const system = pickIntakeSystem({ loss_cause: context.loss_cause, current_system: context.current_system });
    const monthly = latest.monthlyOpportunity || 0;
    const annual = latest.annualOpportunity || 0;
    const conservative = monthly * 0.15;
    const focused = monthly * 0.30;

    return {
      title: "Your Revenue Opportunity Report",
      stage: `${money.format(monthly)} estimated monthly opportunity`,
      system: system.name,
      summary: `Your inputs estimate ${money.format(monthly)} in monthly opportunity and ${money.format(annual)} annualized opportunity across missed enquiries and admin cost.`,
      value: `If a first automation recovered only 15-30% of that opportunity, the range would be roughly ${money.format(conservative)} to ${money.format(focused)} per month.`,
      sections: [
        {
          title: "What your numbers suggest",
          items: [
            `${number.format(latest.missedMonthly || 0)} missed or delayed enquiries per month.`,
            `${number.format(latest.lostClients || 0)} potential clients lost from the current flow.`,
            `${money.format(latest.followupLoss || 0)} in follow-up, after-hours, and scattered-tool leakage.`,
            `${money.format(latest.delayAndBookingLoss || 0)} in delay, no-show, and reschedule leakage.`,
            `${money.format(latest.adminCost || 0)} in repetitive admin, repeated-question, and handoff cost that may be reduced or redirected.`,
          ],
        },
        {
          title: "Best-fit system",
          items: [
            `Recommended system: ${system.name}`,
            `Why: ${system.reason}`,
            `Current setup: ${clean(context.current_system)}. Main loss cause: ${clean(context.loss_cause)}.`,
          ],
        },
        {
          title: "Recommended 30-day action plan",
          items: [
            "Protect the highest-intent enquiries first.",
            "Automate reminders, qualification, and handoff before expanding.",
            "Track recovered enquiries and admin hours so ROI is visible quickly.",
          ],
        },
      ],
    };
  }

  function flattenReport(report) {
    return [
      report.title,
      `Stage: ${report.stage}`,
      `Recommended system: ${report.system}`,
      report.summary,
      report.value,
      ...(report.sections || []).flatMap((section) => [section.title, ...(section.items || [])]),
    ].join("\n");
  }

  function renderReport(report, node) {
    if (!node || !report) return;
    node.hidden = false;
    node.innerHTML = `
      <div class="report-kicker">Personalized report</div>
      <div class="report-head">
        <div>
          <h3>${escapeHtml(report.title)}</h3>
          <p>${escapeHtml(report.summary)}</p>
        </div>
        <div class="report-stage">
          <span>Recommended</span>
          <strong>${escapeHtml(report.system)}</strong>
        </div>
      </div>
      <div class="report-value">${escapeHtml(report.value)}</div>
      <div class="report-section-grid">
        ${(report.sections || []).map((section) => `
          <section class="report-section">
            <h4>${escapeHtml(section.title)}</h4>
            <ul>${listHtml(section.items)}</ul>
          </section>
        `).join("")}
      </div>
    `;
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
    setStatus(statusNode, "Saving your report...");
    saveLocalLead(payload);
    if (window.TFSLeadCapture && typeof window.TFSLeadCapture.submitLead === "function") {
      try {
        await window.TFSLeadCapture.submitLead(payload);
      } catch (error) {
        console.warn("Lead capture submit failed", error);
      }
    }
    const emailResult = await sendReportEmail(payload);
    if (emailResult && emailResult.emailSent) {
      setStatus(statusNode, "Saved. Your report is ready below and has been sent to your email.");
    } else if (emailResult && emailResult.configured === false) {
      setStatus(statusNode, "Saved. Your report is ready below. Email sending is wired, but the email API key still needs to be added in Netlify.");
    } else {
      setStatus(statusNode, "Saved. Your report is ready below. If the email does not arrive, reply through the contact links and we can resend it.");
    }
  }

  async function sendReportEmail(payload) {
    if (!payload || !payload.email || !payload.report_json) return { emailSent: false };
    try {
      const response = await fetch("/.netlify/functions/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        console.warn("Report email request failed", data);
        return { emailSent: false };
      }
      return data;
    } catch (error) {
      console.warn("Report email request unavailable", error);
      return { emailSent: false };
    }
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
    const reportNode = qs("[data-report-card]");
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
      const context = collectFormData(leadForm);
      const answersJson = config.questions.map((question, index) => ({
        question: question.text,
        answer: answers.get(index) ? "yes" : "no",
      }));
      const report = config.slug === "learn"
        ? buildLearnReport(summary, context)
        : buildAuditReport(summary, context);
      await submitStepLead({
        source_form: `${config.slug || "step-one"}-results-gate`,
        lead_type: "free-tool-lead",
        name: lead.name,
        email: lead.email,
        business_type: context.business_type,
        main_channel: context.main_channel,
        monthly_enquiries: context.monthly_enquiries,
        average_client_value_range: context.average_client_value_range,
        biggest_problem: context.biggest_problem,
        ai_goal: context.ai_goal,
        implementation_preference: context.implementation_preference,
        team_skill: context.team_skill,
        product_interest: config.title || document.title,
        analysis_type: config.title || "Step one analysis",
        analysis_request: `Email my ${report.title}`,
        score: `${summary.score}/${summary.total}`,
        result_summary: flattenReport(report).slice(0, 1400),
        report_title: report.title,
        report_stage: report.stage,
        recommended_system: report.system,
        report_json: JSON.stringify(report),
        answers_json: JSON.stringify(answersJson),
        tags: "email-consent,free-tool,step-one",
      }, statusNode);
      renderResult(summary);
      renderReport(report, reportNode);
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
    const reportNode = qs("[data-report-card]");
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
      const responseDelay = read("responseDelay");
      const followupGap = read("followupGap");
      const noShowRate = read("noShowRate");
      const repeatAdmin = read("repeatAdmin");
      const afterHoursShare = read("afterHoursShare");
      const toolScatter = read("toolScatter");
      const repeatQuestions = read("repeatQuestions");
      const followupTouches = read("followupTouches");
      const handoffPeople = read("handoffPeople");

      const monthlyInquiries = daily * 30;
      const missedMonthly = monthlyInquiries * (missed / 100);
      const lostClients = missedMonthly * (conversion / 100);
      const revenueLost = lostClients * value;
      const repeatQuestionCost = monthlyInquiries * (repeatQuestions / 100) * (4 / 60) * adminRate;
      const handoffCost = monthlyInquiries * Math.min(followupTouches, 8) * Math.max(handoffPeople, 1) * (2 / 60) * adminRate;
      const adminCost = (adminHours * 4 * adminRate * (repeatAdmin / 100)) + repeatQuestionCost + handoffCost;
      const afterHoursLoss = monthlyInquiries * (afterHoursShare / 100) * (conversion / 100) * value * 0.18;
      const toolScatterLoss = monthlyInquiries * (toolScatter / 100) * (conversion / 100) * value * 0.15;
      const followupLoss = (monthlyInquiries * (followupGap / 100) * (conversion / 100) * value * 0.35) + afterHoursLoss + toolScatterLoss;
      const delayLoss = monthlyInquiries * Math.min(responseDelay / 24, 1) * 0.08 * (conversion / 100) * value;
      const bookingLoss = monthlyInquiries * (conversion / 100) * (noShowRate / 100) * value * 0.5;
      const delayAndBookingLoss = delayLoss + bookingLoss;
      const monthlyOpportunity = revenueLost + adminCost + followupLoss + delayAndBookingLoss;
      const annualOpportunity = monthlyOpportunity * 12;
      latest = {
        daily,
        value,
        missed,
        conversion,
        adminHours,
        adminRate,
        responseDelay,
        followupGap,
        noShowRate,
        repeatAdmin,
        afterHoursShare,
        toolScatter,
        repeatQuestions,
        followupTouches,
        handoffPeople,
        monthlyInquiries,
        missedMonthly,
        lostClients,
        revenueLost,
        adminCost,
        repeatQuestionCost,
        handoffCost,
        afterHoursLoss,
        toolScatterLoss,
        followupLoss,
        delayLoss,
        bookingLoss,
        delayAndBookingLoss,
        monthlyOpportunity,
        annualOpportunity,
      };

      setText("[data-missed-month]", number.format(missedMonthly));
      setText("[data-lost-clients]", number.format(lostClients));
      setText("[data-revenue-lost]", money.format(revenueLost));
      setText("[data-admin-cost]", money.format(adminCost));
      setText("[data-followup-loss]", money.format(followupLoss));
      setText("[data-delay-loss]", money.format(delayAndBookingLoss));
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
        const context = collectFormData(leadForm);
        const report = buildCalculatorReport(latest, context);
        await submitStepLead({
          source_form: "build-calculator-results-gate",
          lead_type: "free-tool-lead",
          name: lead.name,
          email: lead.email,
          business_type: context.business_type,
          loss_cause: context.loss_cause,
          current_system: context.current_system,
          timeline: context.timeline,
          product_interest: "Business Revenue Calculator",
          analysis_type: "Revenue opportunity calculator",
          analysis_request: `Email my ${report.title}`,
          result_summary: flattenReport(report).slice(0, 1400),
          report_title: report.title,
          report_stage: report.stage,
          recommended_system: report.system,
          report_json: JSON.stringify(report),
          monthly_revenue_at_risk: money.format(latest.monthlyOpportunity || 0),
          annual_revenue_at_risk: money.format(latest.annualOpportunity || 0),
          calculator_inputs: JSON.stringify(latest),
          tags: "email-consent,free-tool,step-one,calculator",
        }, statusNode);
        renderReport(report, reportNode);
        if (reportNode) reportNode.scrollIntoView({ behavior: "smooth", block: "start" });
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
