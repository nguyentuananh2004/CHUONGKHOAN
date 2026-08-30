// Extract.gs
/**
 * Bóc tách dữ liệu số từ payload JSON
 */
function extractFields(rawJson) {
  var extractedData = {};
  
  for (var ticker in rawJson) {
    if (rawJson.hasOwnProperty(ticker)) {
      var data = rawJson[ticker];
      try {
        extractedData[ticker] = {
          "Date": data.Date || null,
          "Open": data.Open || null,
          "Close": data.Close || null,
          "High": data.High || null,
          "Low": data.Low || null,
          "Volume": data.Volume || null
        };
      } catch (e) {
        logError("Extract exception for " + ticker + ": " + e.message);
      }
    }
  }
  
  return extractedData;
}
