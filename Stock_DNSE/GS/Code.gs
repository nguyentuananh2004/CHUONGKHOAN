// Code.gs
/**
 * File chính (Main) định nghĩa luồng chạy và Trigger (Hẹn giờ)
 */
function mainPipeline() {
  logInfo("Starting DNSE Stock Data Pipeline on Apps Script...");
  
  // 1. Fetch
  var rawJson = fetchData();
  logInfo("Fetched raw data.");
  
  // 2. Extract
  var extracted = extractFields(rawJson);
  logInfo("Extracted static fields.");
  
  // 3. Enrich & Validate (thông qua Models)
  var validRecords = enrichData(extracted);
  logInfo("Enriched and validated " + validRecords.length + " records.");
  
  // 4. Store
  saveToSheet(validRecords);
  logInfo("Pipeline completed successfully.");
}

/**
 * Hàm khởi tạo Trigger hẹn giờ chạy hàng ngày vào lúc 16:00
 * Bạn chỉ cần chạy hàm này 1 lần duy nhất từ Editor
 */
function createDailyTrigger() {
  // Xóa các trigger cũ cùng tên nếu có để tránh trùng lặp
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "mainPipeline") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // Tạo trigger mới chạy mỗi ngày lúc 16:00
  ScriptApp.newTrigger("mainPipeline")
           .timeBased()
           .everyDays(1)
           .atHour(16)
           .create();
           
  logInfo("Daily trigger created successfully for 16:00.");
}
