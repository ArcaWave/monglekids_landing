/**
 * MongleKids · Google Sheets subscriber sync
 * ------------------------------------------------------------
 * Pulls the subscriber list from the site's admin API into this
 * spreadsheet. The Supabase service-role key never touches Google —
 * only the ADMIN_TOKEN does, and it lives in Script Properties (not in
 * this code, so the script is safe to share/commit).
 *
 * SETUP (one-time)
 *   1. Open your Google Sheet → Extensions → Apps Script.
 *   2. Paste this whole file, replacing the default Code.gs.
 *   3. Project Settings (gear) → Script Properties → add two rows:
 *        API_URL   = https://www.monglekids.com/api/subscribers
 *        API_TOKEN = <the same value you set as ADMIN_TOKEN in Vercel>
 *   4. Run `syncSubscribers` once from the editor and approve the
 *      permission prompt (it needs to edit this sheet + fetch the URL).
 *   5. (Auto-refresh) Triggers ⏰ (left rail) → Add Trigger →
 *        function: syncSubscribers, event: Time-driven,
 *        e.g. Hour timer → every hour. Save.
 *
 * After setup: the sheet refreshes on the schedule, and the custom
 * "MongleKids ▸ Sync now" menu (added on open) refreshes on demand.
 */

var HEADERS = [
  "email",
  "name",
  "phone",
  "role",
  "child_age_range",
  "interests",
  "lang",
  "source",
  "consent_marketing",
  "created_at",
  "unsubscribed_at",
  "status",
];

function syncSubscribers() {
  var props = PropertiesService.getScriptProperties();
  var url = props.getProperty("API_URL");
  var token = props.getProperty("API_TOKEN");
  if (!url || !token) {
    throw new Error(
      "Set API_URL and API_TOKEN in Project Settings → Script Properties first."
    );
  }

  var res = UrlFetchApp.fetch(url, {
    method: "get",
    headers: { Authorization: "Bearer " + token },
    muteHttpExceptions: true,
  });
  var code = res.getResponseCode();
  if (code !== 200) {
    throw new Error("API returned " + code + ": " + res.getContentText());
  }

  var data = JSON.parse(res.getContentText());
  var subs = data.subscribers || [];

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Subscribers");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Subscribers");
  }
  sheet.clearContents();

  // A little status line up top, then the table.
  sheet
    .getRange(1, 1)
    .setValue(
      "Synced " +
        Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm") +
        "  ·  total " +
        (data.total || subs.length) +
        "  ·  active " +
        (data.active || 0)
    );

  sheet.getRange(2, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight("bold");

  if (subs.length) {
    var rows = subs.map(function (s) {
      return [
        s.email || "",
        s.name || "",
        s.phone || "",
        s.role || "",
        s.child_age_range || "",
        (s.interests || []).join(", "),
        s.lang || "",
        s.source || "",
        s.consent_marketing ? "yes" : "no",
        s.created_at || "",
        s.unsubscribed_at || "",
        s.unsubscribed_at ? "unsubscribed" : "active",
      ];
    });
    sheet.getRange(3, 1, rows.length, HEADERS.length).setValues(rows);
  }

  sheet.setFrozenRows(2);
  sheet.autoResizeColumns(1, HEADERS.length);
}

/** Adds a "Sync now" menu item when the sheet is opened. */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("MongleKids")
    .addItem("Sync now", "syncSubscribers")
    .addToUi();
}
