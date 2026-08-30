// Log.gs
/**
 * Ghi log quá trình chạy
 */
function logInfo(message) {
  var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
  Logger.log("[INFO] " + timestamp + " - " + message);
}

function logError(message) {
  var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
  Logger.log("[ERROR] " + timestamp + " - " + message);
}
