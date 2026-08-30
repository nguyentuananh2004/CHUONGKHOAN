// Models.gs
/**
 * Định nghĩa cấu trúc đối tượng dữ liệu
 */
class StockRecord {
  constructor(ticker, date, open, high, low, close, volume, crawlTimestamp) {
    if (close === undefined || close === null || isNaN(close)) {
      throw new Error(`Invalid or missing Close price for ${ticker}`);
    }
    if (volume === undefined || volume === null || isNaN(volume)) {
      throw new Error(`Invalid or missing Volume for ${ticker}`);
    }
    
    this.ticker = ticker;
    this.date = date;
    this.open = open;
    this.high = high;
    this.low = low;
    this.close = close;
    this.volume = volume;
    this.crawlTimestamp = crawlTimestamp;
  }
  
  // Trả về mảng để dễ dàng append vào Sheet
  toArray() {
    return [
      this.ticker,
      this.date,
      this.open,
      this.high,
      this.low,
      this.close,
      this.volume,
      this.crawlTimestamp
    ];
  }
}
