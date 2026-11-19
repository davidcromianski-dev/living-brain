/**
 * Receives testimonials from the website form (docs/index.html) and appends them to a sheet.
 *
 * Setup, once:
 *   1. Create a Google Sheet. Open Extensions > Apps Script and replace the code with this file.
 *   2. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone.
 *   3. Copy the web app URL (it ends in /exec) into TESTIMONIAL_ENDPOINT in docs/index.html.
 * After editing this script, deploy a new version of the same deployment so the URL stays the same.
 *
 * Rows land in the "Relatos" tab. Nothing is published automatically: to show a testimonial on
 * the site, copy it into docs/testimonials.json, and only when "May publish" is "yes".
 */
const SHEET_NAME = 'Relatos';
const HEADER = ['Received at', 'Name', 'GitHub', 'Role or context', 'Testimonial', 'May publish', 'Page'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (data.website) return reply_({ ok: true }); // honeypot filled: a bot, drop it quietly

    const name = clean_(data.name, 80);
    const text = clean_(data.text, 800);
    if (!name || !text) return reply_({ ok: false, error: 'missing name or text' });

    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADER);
    sheet.appendRow([
      new Date(),
      name,
      clean_(String(data.github || '').replace(/^@/, ''), 40),
      clean_(data.role, 80),
      text,
      data.consent === true ? 'yes' : 'no',
      clean_(data.page, 200),
    ]);
    return reply_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

/** Trims, caps the length and stops a cell from being read as a formula. */
function clean_(value, max) {
  let s = String(value == null ? '' : value).trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function reply_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
