/**
 * Receives testimonials from the website form (docs/index.html) and appends them to a sheet.
 *
 * Works both as a standalone script (created at script.google.com) and as a script bound to a
 * sheet (Extensions > Apps Script). Standalone, it creates a sheet named "Living Brain Relatos" in
 * your Drive the first time it runs and keeps using it.
 *
 * Setup, once:
 *   1. Paste this file into the Apps Script editor and save.
 *   2. Pick "setup" in the function menu and click Run. Authorize when asked (Advanced > Go to
 *      ... (unsafe) > Allow). The log shows the link to the sheet.
 *   3. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone.
 *      Copy the web app URL (it ends in /exec) into TESTIMONIAL_ENDPOINT in docs/index.html.
 * After editing this script: Deploy > Manage deployments > edit (pencil) > Version: New version >
 * Deploy. The URL stays the same.
 *
 * Rows land in the "Relatos" tab. Nothing is published automatically: to show a testimonial on
 * the site, copy it into docs/testimonials.json, and only when "May publish" is "yes".
 */
const BOOK_NAME = 'Living Brain Relatos';
const SHEET_NAME = 'Relatos';
const HEADER = ['Received at', 'Name', 'GitHub', 'Role or context', 'Testimonial', 'May publish', 'Page'];

/** Run once from the editor: authorizes the script and creates the sheet. */
function setup() {
  const sheet = sheet_();
  Logger.log('Testimonials go to: ' + sheet.getParent().getUrl());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (data.website) return reply_({ ok: true }); // honeypot filled: a bot, drop it quietly

    const name = clean_(data.name, 80);
    const text = clean_(data.text, 280);
    if (!name || !text) return reply_({ ok: false, error: 'missing name or text' });

    sheet_().appendRow([
      new Date(),
      name,
      clean_(String(data.github || '').replace(/^@/, ''), 40),
      clean_(data.role, 80),
      text,
      data.consent === true ? 'yes' : 'no',
      clean_(data.page, 200),
    ]);
    return reply_({ ok: true });
  } catch (err) {
    return reply_({ ok: false, error: String(err && err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

/** The bound spreadsheet, or the one this script created and remembers in its properties. */
function sheet_() {
  let book = SpreadsheetApp.getActiveSpreadsheet();
  if (!book) {
    const props = PropertiesService.getScriptProperties();
    const id = props.getProperty('SHEET_ID');
    if (id) book = SpreadsheetApp.openById(id);
    if (!book) {
      book = SpreadsheetApp.create(BOOK_NAME);
      props.setProperty('SHEET_ID', book.getId());
    }
  }
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    const first = book.getSheets()[0];
    sheet = first && first.getLastRow() === 0 && book.getSheets().length === 1 ? first.setName(SHEET_NAME) : book.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADER);
  return sheet;
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
