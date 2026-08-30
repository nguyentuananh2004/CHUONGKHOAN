# Stock_DNSE Data Pipeline

Hệ thống thu thập, bóc tách và làm sạch dữ liệu tài chính (Giá cổ phiếu, Khối lượng giao dịch) từ DNSE Money. Dữ liệu được lấy thông qua các API ngầm (XHR JSON) nhằm tối ưu hóa hiệu suất, sau đó chuẩn hóa và lưu trữ tự động vào file Excel cục bộ hoặc đẩy thẳng lên Google Sheets.

## Kiến trúc & Luồng dữ liệu (Data Pipeline)

Hệ thống hỗ trợ cả môi trường chạy Python (local/server) lẫn tự động hoàn toàn trên Google Apps Script (GAS).

### 1. Python (Local / Server)
```text
main.py ──► lib/ (config, fetch, extract, enrich, models, store)
```
* **fetch.py**: Gửi request tới DNSE API (giả lập trình duyệt) để lấy JSON, bỏ qua HTML nặng nề.
* **extract.py**: Bóc tách các trường: `Date`, `Open`, `Close`, `High`, `Low`, `Volume`.
* **enrich.py**: Làm sạch số liệu (xóa dấu phẩy, ép kiểu) và gán thêm trường thời gian thực tế `crawl_timestamp`.
* **models.py**: Dùng `Pydantic` để validate đảm bảo tính toàn vẹn dữ liệu (không được phép thiếu Close hoặc Volume).
* **store.py**: Nạp dữ liệu vào DataFrame của pandas và append dòng mới vào file Excel (`data/CRAWL_STOCK_DNSE.xlsx`).

### 2. Google Apps Script - GAS (Cloud / Tự động hàng ngày)
```text
Code.gs (mainPipeline)
  ├── Fetch.gs   (Tải JSON)
  ├── Extract.gs (Bóc tách Data)
  ├── Enrich.gs  (Làm sạch & Validate qua Models.gs)
  └── Store.gs   (Ghi log bằng Log.gs & Ghi bulk vào Sheet CRAWL_STOCK_DNSE)
```
Toàn bộ quy trình sẽ tương tự Python nhưng được thiết kế dành riêng cho môi trường V8 của Google. GAS bao gồm Trigger `createDailyTrigger()` để hẹn giờ chạy tự động hàng ngày lúc 16:00.

## Cấu trúc thư mục

```
Stock_DNSE/
├── data/
│   └── CRAWL_STOCK_DNSE.xlsx       # Nơi lưu trữ dữ liệu dạng bảng (Python)
├── GS/                            # Toàn bộ mã nguồn dành cho Google Apps Script
│   ├── Code.gs                    # Main file & hẹn giờ Trigger
│   ├── Config.gs                  # Cấu hình danh sách Tickers
│   ├── Models.gs                  # Class validate dữ liệu
│   ├── Fetch.gs                   # Lấy dữ liệu API
│   ├── Extract.gs                 # Bóc tách
│   ├── Enrich.gs                  # Ép kiểu, làm sạch
│   ├── Store.gs                   # Ghi vào Sheets
│   └── Log.gs                     # Ghi chú tiến trình và lỗi
├── lib/                           # Logic chính cho Python
│   ├── __init__.py
│   ├── config.py                  # Cấu hình Tickers, URL, Headers
│   ├── fetch.py                   
│   ├── extract.py                 
│   ├── enrich.py                  
│   ├── models.py                  
│   └── store.py                   
├── main.py                        # Điểm khởi chạy (Entrypoint) cho Python
└── pipeline.py                    # Luồng định nghĩa schedule (Python)
```

## Hướng dẫn cài đặt và sử dụng

### Dành cho Python (Local)
1. **Cài đặt thư viện cần thiết**:
   ```bash
   pip install pydantic pandas openpyxl requests
   ```
2. **Cấu hình mã cổ phiếu**: Mở `lib/config.py` và sửa đổi mảng `TICKERS = ["VNM", "VCB", "FPT"]` theo nhu cầu của bạn.
3. **Khởi chạy**:
   ```bash
   python main.py
   ```
   Dữ liệu crawl được sẽ tự động nối (append) vào file `data/CRAWL_STOCK_DNSE.xlsx`.

### Dành cho Google Apps Script (GAS / Chạy tự động trên mây)
1. Truy cập vào bảng Google Sheets mà bạn muốn lưu dữ liệu.
2. Chọn Menu: **Extensions** > **Apps Script** (Tiện ích mở rộng > Apps Script).
3. Tạo các file tương ứng `.gs` trên trình duyệt và copy nội dung từ thư mục `Stock_DNSE/GS/` vào từng file.
4. Mở file `Code.gs`, có thể chọn chạy thử hàm `mainPipeline()` để lấy dữ liệu thủ công.
5. **Tự động hóa**: Chọn hàm `createDailyTrigger()` từ dropdown trên cùng và nhấn Run (chỉ cần chạy **1 lần duy nhất**). Hệ thống sẽ tự động lên lịch lấy dữ liệu từ DNSE Money vào lúc 16:00 mỗi ngày và đẩy thẳng lên trang tính.
