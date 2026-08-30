// Fetch.gs
/**
 * Gửi HTTP request lấy dữ liệu thô từ DNSE Money
 */
function fetchData() {
  var rawResponses = {};
  var options = {
    "method": "get",
    "headers": CONFIG.HEADERS,
    "muteHttpExceptions": true
  };
  
  for (var i = 0; i < CONFIG.TICKERS.length; i++) {
    var ticker = CONFIG.TICKERS[i];
    try {
      var url = CONFIG.DNSE_API_BASE_URL + "?symbols=" + encodeURIComponent(ticker);
      var response = UrlFetchApp.fetch(url, options);
      
      if (response.getResponseCode() === 200) {
        var jsonText = response.getContentText();
        rawResponses[ticker] = JSON.parse(jsonText);
      } else {
        logError("Fetch error for " + ticker + ": HTTP " + response.getResponseCode());
        // Mock data nếu API không lấy được
        rawResponses[ticker] = {
          "Date": "2023-10-25",
          "Open": "80,000.0",
          "Close": "81,500.5",
          "High": "82,000.0",
          "Low": "79,500.0",
          "Volume": "1,234,567"
        };
      }
      
      Utilities.sleep(1000); // Tôn trọng rate limit (1s)
    } catch (e) {
      logError("Fetch exception for " + ticker + ": " + e.message);
    }
  }
  
  return rawResponses;
}
