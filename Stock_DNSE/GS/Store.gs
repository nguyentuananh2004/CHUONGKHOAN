// Store.gs
/**
 * Ghi dữ liệu vào Google Sheets
 */
function saveToSheet(validRecords) {
  if (!validRecords || validRecords.length === 0) {
    logInfo("No valid records to save.");
    return;
  }
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  
  // Nếu sheet chưa tồn tại, tạo sheet mới
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    // Thêm header
    var headers = ["Ticker", "Date", "Open", "High", "Low", "Close", "Volume", "Crawl Timestamp"];
    sheet.appendRow(headers);
    // Format header
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#d9ead3");
  }
  
  // Chuyển đổi list đối tượng thành list of arrays
  var rows = validRecords.map(function(record) {
    return record.toArray();
  });
  
  // Dùng getRange để ghi dữ liệu bulk thay vì appendRow trong vòng lặp để tối ưu hiệu suất
  var lastRow = sheet.getLastRow();
  var numRows = rows.length;
  var numCols = rows[0].length;
  
  sheet.getRange(lastRow + 1, 1, numRows, numCols).setValues(rows);
  logInfo("Successfully saved " + numRows + " records to Google Sheets.");
}
