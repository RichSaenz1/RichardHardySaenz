const RESEND_API_URL = "https://api.resend.com/emails";
const DEMO_URL = "https://calendly.com/thefuturestudio-info/30min";
const WHATSAPP_URL = "https://wa.me/50766753870?text=Hi%2C%20I%20received%20my%20Future%20Studio%20report%20and%20would%20like%20to%20map%20the%20best%20AI%20system%20for%20my%20business.";
const REPLY_EMAIL = "info@thefuturestudio.online";
const DEFAULT_LOGO_URL = "https://thefuturestudio.online/logo.png";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function clean(value, fallback = "") {
  if (value === undefined || value === null || value === "") return fallback;
  return String(value);
}

function escapeHtml(value) {
  return clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseJson(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
}

function reportFromPayload(payload) {
  return parseJson(payload.report_json, null) || {
    title: clean(payload.report_title, "Your Future Studio Report"),
    stage: clean(payload.report_stage, "Report ready"),
    system: clean(payload.recommended_system, "The Future Studio"),
    summary: clean(payload.result_summary, "Your report is ready."),
    value: clean(payload.report_value, "This report highlights the clearest next step for your business."),
    sections: [],
  };
}

function sectionHtml(section) {
  const items = Array.isArray(section.items) ? section.items : [];
  return `
    <div style="padding:2px;background:linear-gradient(135deg,rgba(0,229,204,.90),rgba(63,184,255,.78),rgba(155,89,255,.86));box-shadow:0 12px 34px rgba(155,89,255,.10);">
      <section style="padding:24px 22px;background:linear-gradient(135deg,rgba(255,255,255,.84),rgba(255,255,255,.58));box-shadow:inset 0 1px 0 rgba(255,255,255,.78);">
        <h3 style="margin:0 0 14px;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:30px;line-height:.9;font-weight:800;font-style:italic;letter-spacing:0;text-transform:uppercase;color:#0a0a0a;">${escapeHtml(section.title)}</h3>
        <ul style="margin:0;padding-left:20px;color:rgba(10,10,10,.70);font-family:'DM Sans',Arial,sans-serif;font-size:15px;line-height:1.7;">
          ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
    </div>
  `;
}

function plainTextReport(report, payload) {
  const lines = [
    report.title,
    "",
    `Hi ${clean(payload.name, "there")},`,
    "",
    clean(report.summary),
    "",
    `Current stage: ${clean(report.stage)}`,
    `Recommended system/path: ${clean(report.system)}`,
    "",
    clean(report.value),
    "",
  ];

  (report.sections || []).forEach((section) => {
    lines.push(clean(section.title), ...((section.items || []).map((item) => `- ${item}`)), "");
  });

  lines.push(
    "Next step:",
    `Book a free system call: ${DEMO_URL}`,
    `WhatsApp us: ${WHATSAPP_URL}`,
    `Reply by email: ${REPLY_EMAIL}`,
    "",
    "The Future Studio"
  );

  return lines.join("\n");
}

function htmlReport(report, payload) {
  const name = clean(payload.name, "there");
  const logoUrl = clean(process.env.REPORT_LOGO_URL, DEFAULT_LOGO_URL);
  const titleWords = clean(report.title, "Your Future Studio Report").split(" ");
  const accentTitle = titleWords.length > 2
    ? `${escapeHtml(titleWords.slice(0, -2).join(" "))} <span style="background:linear-gradient(90deg,#00e5cc,#44b8ff,#9b59ff);-webkit-background-clip:text;background-clip:text;color:#44b8ff;-webkit-text-fill-color:transparent;">${escapeHtml(titleWords.slice(-2).join(" "))}</span>`
    : escapeHtml(report.title);
  const titleHtml = clean(report.title).toLowerCase().startsWith("your ")
    ? `<span style="color:#0a0a0a;-webkit-text-fill-color:#0a0a0a;">Your</span> <span style="background:linear-gradient(90deg,#00cdb8,#3fb8ff,#9b59ff);-webkit-background-clip:text;background-clip:text;color:#3fb8ff;-webkit-text-fill-color:transparent;">${escapeHtml(clean(report.title).slice(5))}</span>`
    : `<span style="background:linear-gradient(90deg,#00cdb8,#3fb8ff,#9b59ff);-webkit-background-clip:text;background-clip:text;color:#3fb8ff;-webkit-text-fill-color:transparent;">${escapeHtml(report.title)}</span>`;
  const whyItems = [
    `Your answers point to ${clean(report.system, "a focused AI system")} as the clearest next move.`,
    clean(report.value, "There is a practical business opportunity if the right workflow is mapped and installed."),
    "The fastest next step is to review your current process, confirm the first automation to build, and estimate the likely value before you buy anything."
  ];
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;700;800&display=swap" rel="stylesheet">
      </head>
      <body style="margin:0;background:#fff8f5;color:#0a0a0a;font-family:'DM Sans',Arial,sans-serif;">
        <div style="max-width:780px;margin:0 auto;padding:38px 20px;">
          <div style="padding:3px;background:linear-gradient(135deg,#00e5cc 0%,#3fb8ff 38%,#9b59ff 72%,#e040fb 100%);box-shadow:0 26px 80px rgba(0,229,204,.18),0 22px 90px rgba(155,89,255,.22);">
          <div style="border:1px solid rgba(255,255,255,.72);background:radial-gradient(circle at 7% 9%,rgba(0,229,204,.30),transparent 34%),radial-gradient(circle at 96% 12%,rgba(155,89,255,.26),transparent 40%),radial-gradient(circle at 88% 88%,rgba(63,184,255,.18),transparent 36%),linear-gradient(135deg,rgba(255,255,255,.92) 0%,rgba(255,248,245,.88) 55%,rgba(245,239,255,.90) 100%);padding:42px 38px;">
            <img src="${escapeHtml(logoUrl)}" width="250" alt="The Future Studio" style="display:block;width:250px;max-width:78%;height:auto;margin:0 auto 24px;">
            <p style="margin:0 0 16px;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:17px;font-weight:800;letter-spacing:.20em;text-transform:uppercase;color:#0a0a0a;">The Future Studio</p>
            <h1 style="margin:0 0 22px;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:74px;line-height:.86;font-weight:800;font-style:italic;letter-spacing:0;text-transform:uppercase;color:#0a0a0a;">${titleHtml}</h1>
            <p style="margin:0 0 28px;color:rgba(10,10,10,.70);font-family:'DM Sans',Arial,sans-serif;font-size:17px;line-height:1.72;">Hi ${escapeHtml(name)}, ${escapeHtml(report.summary)}</p>
            <div style="padding:2px;background:linear-gradient(135deg,rgba(0,229,204,.92),rgba(63,184,255,.78),rgba(155,89,255,.88));box-shadow:0 14px 34px rgba(0,229,204,.10);margin-bottom:18px;">
            <div style="display:block;padding:22px 20px;background:linear-gradient(135deg,rgba(255,255,255,.78),rgba(255,255,255,.52));box-shadow:inset 0 1px 0 rgba(255,255,255,.74);">
              <span style="display:block;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:14px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:rgba(10,10,10,.48);">Your highest-impact fix</span>
              <strong style="display:block;margin-top:10px;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:42px;line-height:.92;font-weight:800;font-style:italic;text-transform:uppercase;color:#0a0a0a;">${escapeHtml(report.system)}</strong>
            </div>
            </div>
            <div style="padding:20px 22px;border-left:4px solid #00cdb8;background:linear-gradient(90deg,rgba(0,229,204,.16),rgba(155,89,255,.10));color:rgba(10,10,10,.78);font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.7;">
              ${escapeHtml(report.value)}
            </div>
            <div style="margin-top:18px;padding:2px;background:linear-gradient(135deg,rgba(0,229,204,.90),rgba(63,184,255,.75),rgba(155,89,255,.86));box-shadow:0 16px 38px rgba(155,89,255,.10);">
            <section style="padding:24px 22px;background:linear-gradient(135deg,rgba(255,255,255,.86),rgba(255,255,255,.60));box-shadow:inset 0 1px 0 rgba(255,255,255,.78);">
              <h2 style="margin:0 0 14px;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:36px;line-height:.9;font-weight:800;font-style:italic;text-transform:uppercase;color:#0a0a0a;">Why we came to this conclusion</h2>
              <ul style="margin:0;padding-left:20px;color:rgba(10,10,10,.72);font-family:'DM Sans',Arial,sans-serif;font-size:15px;line-height:1.7;">
                ${whyItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </section>
            </div>
            <div style="display:grid;gap:16px;margin-top:22px;">
              ${(report.sections || []).map(sectionHtml).join("")}
            </div>
            <div style="margin-top:22px;padding:2px;background:linear-gradient(135deg,rgba(0,229,204,.92),rgba(63,184,255,.76),rgba(155,89,255,.90),rgba(224,64,251,.70));box-shadow:0 18px 46px rgba(0,229,204,.10),0 16px 44px rgba(155,89,255,.10);">
            <section style="padding:24px 22px;background:linear-gradient(135deg,rgba(255,255,255,.84),rgba(255,255,255,.58));box-shadow:inset 0 1px 0 rgba(255,255,255,.76);">
              <h2 style="margin:0 0 12px;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:36px;line-height:.9;font-weight:800;font-style:italic;text-transform:uppercase;color:#0a0a0a;">Turn this into a system plan</h2>
              <p style="margin:0 0 18px;color:rgba(10,10,10,.70);font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.65;">On the call, we can map what to automate first, what tools it should connect to, what it could recover, and what it would cost to build.</p>
              <div style="display:block;">
                <a href="${DEMO_URL}" target="_blank" rel="noopener" style="display:inline-block;margin:0 10px 10px 0;padding:18px 30px;background:linear-gradient(90deg,#00e5cc,#3fb8ff,#9b59ff);color:#050505;text-decoration:none;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:20px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;">Book My Free System Call</a>
                <a href="${WHATSAPP_URL}" target="_blank" rel="noopener" style="display:inline-block;margin:0 10px 10px 0;padding:16px 24px;border:2px solid #0a0a0a;color:#0a0a0a;text-decoration:none;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:18px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;">Message Us On WhatsApp</a>
                <a href="mailto:${REPLY_EMAIL}?subject=My%20Future%20Studio%20Report" style="display:inline-block;margin:0 0 10px 0;padding:16px 24px;border:2px solid #0a0a0a;color:#0a0a0a;text-decoration:none;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:18px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;">Reply By Email</a>
              </div>
            </section>
            </div>
            <div style="margin-top:28px;">
              <a href="${DEMO_URL}" target="_blank" rel="noopener" style="display:inline-block;padding:18px 30px;background:linear-gradient(90deg,#00e5cc,#3fb8ff,#9b59ff);color:#050505;text-decoration:none;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:20px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;">Book My Free System Call</a>
            </div>
          </div>
          </div>
          <p style="margin:18px 0 0;color:rgba(10,10,10,.48);font-family:'DM Sans',Arial,sans-serif;font-size:12px;line-height:1.5;">You received this because you requested a report from The Future Studio. Reply to this email if you want us to map the next step.</p>
        </div>
      </body>
    </html>
  `;
}

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, error: "Method not allowed" }) };
  }

  const payload = parseJson(event.body, {});
  const email = clean(payload.email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Valid email is required" }) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 202,
      headers,
      body: JSON.stringify({ ok: true, emailSent: false, configured: false, message: "RESEND_API_KEY is not configured" }),
    };
  }

  const report = reportFromPayload(payload);
  const from = process.env.REPORT_FROM_EMAIL || "The Future Studio <reports@thefuturestudio.online>";
  const replyTo = process.env.REPORT_REPLY_TO || "info@thefuturestudio.online";
  const bcc = process.env.REPORT_BCC_EMAIL || "info@thefuturestudio.online";
  const subject = `${clean(report.title, "Your Future Studio Report")} - ${clean(report.system, "Next step")}`;

  const emailPayload = {
    from,
    to: [email],
    subject,
    html: htmlReport(report, payload),
    text: plainTextReport(report, payload),
    reply_to: replyTo,
  };

  if (bcc) emailPayload.bcc = [bcc];

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailPayload),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ ok: false, emailSent: false, error: "Email provider rejected the request", details: result }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ ok: true, emailSent: true, id: result.id || "" }),
  };
};
