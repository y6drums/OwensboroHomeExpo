/* ==========================================================================
   Shared helpers for the two form endpoints.
   Files in /api prefixed with "_" are not routed by Vercel.
   ========================================================================== */

const MAX_FIELD = 5000;

/** Escape a value for safe interpolation into the HTML email body. */
function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Normalise a submitted value to a trimmed, length-capped string. */
function clean(value) {
  if (Array.isArray(value)) return value.map(clean).filter(Boolean).join(', ');
  return String(value == null ? '' : value).trim().slice(0, MAX_FIELD);
}

/** Read and JSON-parse the request body across Vercel/Node runtimes. */
async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body) {
    try { return JSON.parse(req.body); } catch { return null; }
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 100_000) throw new Error('Payload too large');
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return null; }
}

/** Very loose email sanity check — real validation is Resend's job. */
function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/** Render an array of [label, value] pairs as an HTML definition table. */
function rowsToHtml(rows) {
  return rows
    .filter(([, v]) => v)
    .map(([label, value]) => `
      <tr>
        <td style="padding:10px 16px 10px 0;vertical-align:top;color:#6B808B;font-size:13px;
                   white-space:nowrap;border-bottom:1px solid #EBF1F4;">${esc(label)}</td>
        <td style="padding:10px 0;vertical-align:top;color:#0E1A20;font-size:14px;
                   border-bottom:1px solid #EBF1F4;">${esc(value).replace(/\n/g, '<br>')}</td>
      </tr>`)
    .join('');
}

/** Wrap the rows in a branded email shell. */
function emailShell({ heading, kicker, rows, footNote }) {
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#F6F9FA;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:12px;
                border:1px solid #DDE6EA;overflow:hidden;">
    <tr>
      <td style="background:#134252;padding:24px 28px;">
        <div style="color:#67B8E5;font-size:11px;letter-spacing:.16em;text-transform:uppercase;
                    font-weight:700;margin-bottom:6px;">${esc(kicker)}</div>
        <div style="color:#ffffff;font-size:21px;font-weight:800;line-height:1.25;">${esc(heading)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 28px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
        ${footNote ? `<p style="margin:22px 0 0;color:#6B808B;font-size:12px;line-height:1.6;">${esc(footNote)}</p>` : ''}
      </td>
    </tr>
  </table>
</body></html>`;
}

/** Plain-text fallback body. */
function rowsToText(rows) {
  return rows.filter(([, v]) => v).map(([l, v]) => `${l}: ${v}`).join('\n');
}

/**
 * Send via the Resend REST API.
 * Requires RESEND_API_KEY. MAIL_FROM must be a verified sending domain.
 */
async function sendEmail({ subject, html, text, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured');

  const payload = {
    from: process.env.MAIL_FROM || 'Owensboro Home Expo <noreply@owensborohomeexpo.com>',
    to: (process.env.MAIL_TO || 'adam@greenriverbia.com').split(',').map((s) => s.trim()),
    subject,
    html,
    text
  };
  if (replyTo && looksLikeEmail(replyTo)) payload.reply_to = replyTo;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 400)}`);
  }
  return res.json();
}

/**
 * Shared request guard. Returns the parsed body, or null once it has already
 * written an error response.
 */
async function guard(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return null;
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    res.status(413).json({ error: 'Payload too large' });
    return null;
  }

  if (!body || typeof body !== 'object') {
    res.status(400).json({ error: 'Expected a JSON body' });
    return null;
  }

  /* Honeypot — pretend everything went fine so bots stop retrying. */
  if (clean(body._gotcha)) {
    res.status(200).json({ ok: true });
    return null;
  }

  return body;
}

module.exports = {
  esc, clean, looksLikeEmail, rowsToHtml, rowsToText, emailShell, sendEmail, guard
};
