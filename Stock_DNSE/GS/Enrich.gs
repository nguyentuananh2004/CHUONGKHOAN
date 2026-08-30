// Enrich.gs
/**
 * Làm sạch và ép kiểu dữ liệu số
 */
function cleanNumber(valueStr) {
  if (typeof valueStr !== 'string') {
    return valueStr;
  }
  // Xóa dấu phẩy định dạng
  return valueStr.replace(/,/g, '');
}

function enrichData(extractedData) {
  var enrichedRecords = [];
  var crawlTime = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
  
  for (var ticker in extractedData) {
    if (extractedData.hasOwnProperty(ticker)) {
      var data = extractedData[ticker];
      try {
        var dateVal = data.Date;
        var openVal = parseFloat(cleanNumber(data.Open));
        var closeVal = parseFloat(cleanNumber(data.Close));
        var highVal = parseFloat(cleanNumber(data.High));
        var lowVal = parseFloat(cleanNumber(data.Low));
        var volumeVal = parseInt(cleanNumber(data.Volume), 10);
        
        var record = new StockRecord(
          ticker,
          dateVal,
          openVal,
          highVal,
          lowVal,
          closeVal,
          volumeVal,
          crawlTime
        );
        
        enrichedRecords.push(record);
      } catch (e) {
        logError("Enrich exception for " + ticker + ": " + e.message);
      }
    }
  }
  
  return enrichedRecords;
}
