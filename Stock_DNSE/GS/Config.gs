// Config.gs
/**
 * Cấu hình tham số hệ thống
 */
var CONFIG = {
  TICKERS: ["VNM", "VCB", "FPT"],
  DNSE_API_BASE_URL: "https://services.entrade.com.vn/chart-api/v2/ohlcs/stock",
  HEADERS: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  SHEET_NAME: "CRAWL_STOCK_DNSE" // Tên sheet để ghi dữ liệu
};
