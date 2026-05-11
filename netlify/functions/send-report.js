const RESEND_API_URL = "https://api.resend.com/emails";

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
    <section style="border:1px solid rgba(255,255,255,.16);padding:24px 22px;background:rgba(255,255,255,.045);">
      <h3 style="margin:0 0 14px;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:30px;line-height:.9;font-weight:800;font-style:italic;letter-spacing:0;text-transform:uppercase;color:#ffffff;">${escapeHtml(section.title)}</h3>
      <ul style="margin:0;padding-left:20px;color:rgba(255,255,255,.74);font-family:'DM Sans',Arial,sans-serif;font-size:15px;line-height:1.7;">
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
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
    "Book a free AI systems demo: https://calendly.com/thefuturestudio-info/30min",
    "",
    "The Future Studio"
  );

  return lines.join("\n");
}

function htmlReport(report, payload) {
  const name = clean(payload.name, "there");
  const titleWords = clean(report.title, "Your Future Studio Report").split(" ");
  const accentTitle = titleWords.length > 2
    ? `${escapeHtml(titleWords.slice(0, -2).join(" "))} <span style="background:linear-gradient(90deg,#00e5cc,#44b8ff,#9b59ff);-webkit-background-clip:text;background-clip:text;color:#44b8ff;-webkit-text-fill-color:transparent;">${escapeHtml(titleWords.slice(-2).join(" "))}</span>`
    : escapeHtml(report.title);
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
      <body style="margin:0;background:#050505;color:#ffffff;font-family:'DM Sans',Arial,sans-serif;">
        <div style="max-width:780px;margin:0 auto;padding:38px 20px;">
          <div style="border:2px solid rgba(0,229,204,.55);background:radial-gradient(circle at 7% 9%,rgba(0,229,204,.28),transparent 34%),radial-gradient(circle at 96% 12%,rgba(155,89,255,.38),transparent 40%),linear-gradient(135deg,#050505 0%,#09090d 55%,#171022 100%);padding:42px 38px;">
            <p style="margin:0 0 16px;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:17px;font-weight:800;letter-spacing:.20em;text-transform:uppercase;color:#00e5cc;">The Future Studio</p>
            <h1 style="margin:0 0 22px;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:74px;line-height:.86;font-weight:800;font-style:italic;letter-spacing:0;text-transform:uppercase;color:#ffffff;">${accentTitle}</h1>
            <p style="margin:0 0 28px;color:rgba(255,255,255,.72);font-family:'DM Sans',Arial,sans-serif;font-size:17px;line-height:1.72;">Hi ${escapeHtml(name)}, ${escapeHtml(report.summary)}</p>
            <div style="display:block;border:1px solid rgba(255,255,255,.16);padding:22px 20px;background:rgba(0,0,0,.30);margin-bottom:18px;">
              <span style="display:block;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:14px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.50);">Recommended system/path</span>
              <strong style="display:block;margin-top:10px;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:42px;line-height:.92;font-weight:800;font-style:italic;text-transform:uppercase;color:#00e5cc;">${escapeHtml(report.system)}</strong>
            </div>
            <div style="padding:20px 22px;border-left:4px solid #00e5cc;background:linear-gradient(90deg,rgba(0,229,204,.16),rgba(155,89,255,.11));color:rgba(255,255,255,.84);font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.7;">
              ${escapeHtml(report.value)}
            </div>
            <div style="display:grid;gap:16px;margin-top:22px;">
              ${(report.sections || []).map(sectionHtml).join("")}
            </div>
            <div style="margin-top:28px;">
              <a href="https://calendly.com/thefuturestudio-info/30min" target="_blank" rel="noopener" style="display:inline-block;padding:18px 30px;background:linear-gradient(90deg,#00e5cc,#3fb8ff,#9b59ff);color:#050505;text-decoration:none;font-family:'Barlow Condensed','Arial Narrow','Roboto Condensed',Impact,Arial,sans-serif;font-size:20px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;">Book AI Systems Demo</a>
            </div>
          </div>
          <p style="margin:18px 0 0;color:rgba(255,255,255,.48);font-family:'DM Sans',Arial,sans-serif;font-size:12px;line-height:1.5;">You received this because you requested a report from The Future Studio. Reply to this email if you want us to map the next step.</p>
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
