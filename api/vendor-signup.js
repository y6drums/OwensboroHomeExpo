/* POST /api/vendor-signup — exhibitor booth application → Resend
   Field set mirrors the 2027 Exhibitor Sign-Up & Booth Reservation contract.
   NOTE: card details are deliberately NOT collected here — payment is taken by
   phone or invoice once space is confirmed. */
const { clean, looksLikeEmail, rowsToHtml, rowsToText, emailShell, sendEmail, guard } = require('./_send');

/* Booth rates from the contract, used to restate the estimate server-side
   rather than trusting a total posted by the browser. */
const BOOTH_RATES = {
  'Single 10x10':     { member: 650,  nonmember: 900  },
  'Four-booth 20x20': { member: 1950, nonmember: 2400 }
};
const UTILITY_PRICES = [
  { match: '110V',  price: 60  },
  { match: '220V',  price: 115 },
  { match: 'Water', price: 120 }
];

function money(n) {
  return '$' + n.toLocaleString('en-US');
}

module.exports = async function handler(req, res) {
  const body = await guard(req, res);
  if (!body) return;

  const company     = clean(body.company);
  const contactName = clean(body.contactName);
  const email       = clean(body.email);
  const phone       = clean(body.phone);
  const cellPhone   = clean(body.cellPhone);
  const website     = clean(body.website);
  const address     = clean(body.address);
  const city        = clean(body.city);
  const state       = clean(body.state).toUpperCase();
  const zip         = clean(body.zip);
  const product     = clean(body.product);
  const category    = clean(body.category);
  const demo        = clean(body.demo);
  const demoDetail  = clean(body.demoDetail);
  const member      = clean(body.member);
  const boothType   = clean(body.boothType);
  const boothQty    = clean(body.boothQty);
  const tables      = clean(body.tables);
  const utilities   = clean(body.utilities);
  const notes       = clean(body.notes);
  const blurb       = clean(body.blurb);
  const payment     = clean(body.payment);
  const sponsorship = clean(body.sponsorship);
  const heardFrom   = clean(body.heardFrom);

  const required = {
    company, contactName, email, phone, address, city, state, zip,
    product, category, demo, member, boothType, payment,
    insurance: clean(body.insurance),
    agree: clean(body.agree)
  };
  const missing = Object.keys(required).filter((k) => !required[k]);
  if (missing.length) {
    return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` });
  }
  if (!looksLikeEmail(email)) {
    return res.status(400).json({ error: 'That email address does not look valid.' });
  }

  /* Recompute the estimate here — never trust a total from the client. */
  const rate = BOOTH_RATES[boothType];
  const qty = parseInt(boothQty, 10);
  const qtyKnown = String(qty) === boothQty && qty > 0;
  let boothTotal = null;
  if (rate) {
    const unit = member === 'Member' ? rate.member : rate.nonmember;
    boothTotal = unit * (qtyKnown ? qty : 1);
  }
  const utilTotal = UTILITY_PRICES
    .filter((u) => utilities.includes(u.match))
    .reduce((sum, u) => sum + u.price, 0);

  let estimate;
  if (boothTotal === null) {
    estimate = utilTotal
      ? `${money(utilTotal)} in utilities + booth to be confirmed`
      : 'To be confirmed — exhibitor is unsure which space they need';
  } else {
    estimate = `${money(boothTotal + utilTotal)}` +
      ` (booth ${money(boothTotal)} + utilities ${money(utilTotal)})` +
      (qtyKnown ? '' : ' — based on one space, quantity to confirm');
  }

  const rows = [
    ['Company', company],
    ['Contact', contactName],
    ['Email', email],
    ['Phone', phone],
    ['Cell phone', cellPhone],
    ['Website', website],
    ['Address', [address, [city, state].filter(Boolean).join(', '), zip].filter(Boolean).join('\n')],
    ['— Exhibit —', ' '],
    ['Product or service', product],
    ['Directory category', category],
    ['Demonstrating products', demo === 'Yes' && demoDetail ? `Yes — ${demoDetail}` : demo],
    ['— Booth —', ' '],
    ['Membership', member],
    ['Booth option', boothType],
    ['Quantity', boothQty],
    ['8ft skirted tables', tables],
    ['Utilities', utilities || 'None'],
    ['Placement notes', notes],
    ['ESTIMATED TOTAL', estimate],
    ['— Admin —', ' '],
    ['Payment preference', payment],
    ['Directory blurb', blurb],
    ['Sponsorship interest', sponsorship],
    ['Heard about us via', heardFrom],
    ['Insurance requirement', 'Acknowledged'],
    ['Received', new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'full', timeStyle: 'short' })]
  ];

  try {
    await sendEmail({
      subject: `Booth application — ${company} (${boothType}${member === 'Member' ? ', member' : ''})`,
      html: emailShell({
        kicker: 'Owensboro Home Expo 2027',
        heading: 'New exhibitor application',
        rows: rowsToHtml(rows),
        footNote: 'Submitted through owensborohomeexpo.com. Reply directly to reach the applicant. ' +
                  'The total is an estimate generated from the published rates — confirm it before invoicing. ' +
                  'No card details are collected online; take payment by phone or invoice.'
      }),
      text: rowsToText(rows),
      replyTo: email
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[vendor-signup] send failed:', err && err.message);
    return res.status(502).json({ error: 'We could not submit that application. Please try again or email adam@greenriverbia.com.' });
  }
};
