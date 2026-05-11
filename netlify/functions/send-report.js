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
    <section style="border:1px solid rgba(255,255,255,.16);padding:22px;background:rgba(255,255,255,.04);">
      <h3 style="margin:0 0 12px;font-family:'Barlow Condensed','Arial Narrow',Impact,Arial,sans-serif;font-size:26px;line-height:.95;font-weight:800;font-style:italic;letter-spacing:0;text-transform:uppercase;color:#ffffff;">${escapeHtml(section.title)}</h3>
      <ul style="margin:0;padding-left:20px;color:rgba(255,255,255,.76);font-family:'DM Sans',Arial,sans-serif;font-size:15px;line-height:1.65;">
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
  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#050505;color:#ffffff;font-family:Arial,sans-serif;">
        <div style="max-width:760px;margin:0 auto;padding:36px 20px;">
          <div style="border:2px solid rgba(0,229,204,.55);background:radial-gradient(circle at 8% 10%,rgba(0,229,204,.22),transparent 32%),radial-gradient(circle at 92% 16%,rgba(155,89,255,.34),transparent 38%),linear-gradient(135deg,#070707,#151020);padding:38px;">
            <p style="margin:0 0 16px;font-family:'Barlow Condensed','Arial Narrow',Impact,Arial,sans-serif;font-size:15px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:#00e5cc;">The Future Studio</p>
            <h1 style="margin:0 0 20px;font-family:'Barlow Condensed','Arial Narrow',Impact,Arial,sans-serif;font-size:64px;line-height:.86;font-weight:800;font-style:italic;letter-spacing:0;text-transform:uppercase;color:#ffffff;">${escapeHtml(report.title)}</h1>
            <p style="margin:0 0 26px;color:rgba(255,255,255,.72);font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.7;">Hi ${escapeHtml(name)}, ${escapeHtml(report.summary)}</p>
            <div style="display:block;border:1px solid rgba(255,255,255,.16);padding:18px;background:rgba(0,0,0,.28);margin-bottom:18px;">
              <span style="display:block;font-family:'Barlow Condensed','Arial Narrow',Impact,Arial,sans-serif;font-size:13px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.48);">Recommended system/path</span>
              <strong style="display:block;margin-top:8px;font-family:'Barlow Condensed','Arial Narrow',Impact,Arial,sans-serif;font-size:34px;line-height:.95;font-weight:800;font-style:italic;text-transform:uppercase;color:#00e5cc;">${escapeHtml(report.system)}</strong>
            </div>
            <div style="padding:18px 20px;border-left:4px solid #00e5cc;background:linear-gradient(90deg,rgba(0,229,204,.14),rgba(155,89,255,.10));color:rgba(255,255,255,.82);font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.65;">
              ${escapeHtml(report.value)}
            </div>
            <div style="display:grid;gap:16px;margin-top:22px;">
              ${(report.sections || []).map(sectionHtml).join("")}
            </div>
            <div style="margin-top:28px;">
              <a href="https://calendly.com/thefuturestudio-info/30min" target="_blank" rel="noopener" style="display:inline-block;padding:17px 26px;background:linear-gradient(90deg,#00e5cc,#3fb8ff,#9b59ff);color:#050505;text-decoration:none;font-family:'Barlow Condensed','Arial Narrow',Impact,Arial,sans-serif;font-size:18px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;">Book AI Systems Demo</a>
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
