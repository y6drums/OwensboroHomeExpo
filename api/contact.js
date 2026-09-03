/* POST /api/contact — general contact form → Resend */
const { clean, looksLikeEmail, rowsToHtml, rowsToText, emailShell, sendEmail, guard } = require('./_send');

module.exports = async function handler(req, res) {
  const body = await guard(req, res);
  if (!body) return;

  const name    = clean(body.name);
  const email   = clean(body.email);
  const phone   = clean(body.phone);
  const company = clean(body.company);
  const topic   = clean(body.topic);
  const message = clean(body.message);
  const updates = clean(body.updates) ? 'Yes — add to the mailing list' : 'No';

  const missing = [];
  if (!name) missing.push('name');
  if (!email) missing.push('email');
  if (!topic) missing.push('topic');
  if (!message) missing.push('message');
  if (missing.length) {
    return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` });
  }
  if (!looksLikeEmail(email)) {
    return res.status(400).json({ error: 'That email address does not look valid.' });
  }

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone],
    ['Business', company],
    ['Topic', topic],
    ['Message', message],
    ['Wants updates', updates],
    ['Received', new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'full', timeStyle: 'short' })]
  ];

  try {
    await sendEmail({
      subject: `Home Expo enquiry — ${topic} — ${name}`,
      html: emailShell({
        kicker: 'Owensboro Home Expo',
        heading: 'New contact form message',
        rows: rowsToHtml(rows),
        footNote: 'Sent from the contact form on owensborohomeexpo.com. Reply directly to this email to respond.'
      }),
      text: rowsToText(rows),
      replyTo: email
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed:', err && err.message);
    return res.status(502).json({ error: 'We could not send that message. Please try again or email adam@greenriverbia.com.' });
  }
};
