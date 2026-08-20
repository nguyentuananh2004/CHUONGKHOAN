"""
Script này có chức năng tương tự như update_config.py nhưng được dùng để sửa đổi file cấu hình của Google Apps Script (GS/Config.gs).
Các bước hoạt động:
1. Đọc nội dung file GS/Config.gs
2. Sử dụng Regex (re.sub) và thay thế chuỗi cơ bản (replace) để sửa thông tin mảng JavaScript cũ.
3. Ghi đè lại nội dung mới vào file GS/Config.gs
"""
import re

# Đường dẫn tuyệt đối tới file Config.gs
config_path = r"c:\Users\Admin\Downloads\Do-An-2-main\Nhom_BĐS-XayDung\GS\Config.gs"

# Đọc toàn bộ nội dung file
with open(config_path, "r", encoding="utf-8") as f:
    content = f.read()

# --- 1. THAY THẾ MÃ CHỨNG KHOÁN (STOCK_CODES) ---
# Trong Javascript (của file .gs), mảng được định nghĩa là var STOCK_CODES = [...];
content = re.sub(
    r'var STOCK_CODES = \[.*?\];',
    'var STOCK_CODES = ["VIC", "VHM", "VRE", "NVL", "KDH", "NLG", "DIG", "DXG", "PDR", "VCG", "HBC", "CTD", "CII", "HUT", "LCG"];',
    content,
    flags=re.DOTALL
)

# Replace COMPANY_KEYWORDS
new_company_keywords = '''var COMPANY_KEYWORDS = {
  VIC: ["Tập đoàn Vingroup", "Vingroup", "VIC"],
  VHM: ["Vinhomes", "VHM"],
  VRE: ["Vincom Retail", "Vincom", "VRE"],
  NVL: ["Novaland", "Tập đoàn Novaland", "NVL"],
  KDH: ["Nhà Khang Điền", "Khang Điền", "KDH"],
  NLG: ["Nam Long", "Tập đoàn Nam Long", "NLG"],
  DIG: ["DIC Corp", "Tập đoàn DIC", "DIG"],
  DXG: ["Đất Xanh", "Tập đoàn Đất Xanh", "DXG"],
  PDR: ["Phát Đạt", "Bất động sản Phát Đạt", "PDR"],
  VCG: ["Vinaconex", "Tổng CTCP Xuất nhập khẩu và Xây dựng Việt Nam", "VCG"],
  HBC: ["Hòa Bình", "Xây dựng Hòa Bình", "HBC"],
  CTD: ["Coteccons", "Xây dựng Coteccons", "CTD"],
  CII: ["Đầu tư Hạ tầng Kỹ thuật TP.HCM", "CII"],
  HUT: ["Tasco", "HUT"],
  LCG: ["Lizen", "CTCP Lizen", "LCG"]
};'''
content = re.sub(r'var COMPANY_KEYWORDS = \{.*?\n\};', new_company_keywords, content, flags=re.DOTALL)

# Replace COMPANY_INFO
new_company_info = '''var COMPANY_INFO = [
  {code: "VIC", full_name: "Tập đoàn Vingroup - CTCP", english_name: "Vingroup", former_name: "", exchange: "HOSE", industry: "Bất động sản", website: "vingroup.net", established: "1993", employees: "40.000+", business: "Bất động sản, công nghiệp, công nghệ", keywords: "Vingroup, VIC"},
  {code: "VHM", full_name: "CTCP Vinhomes", english_name: "Vinhomes", former_name: "", exchange: "HOSE", industry: "Bất động sản", website: "vinhomes.vn", established: "2008", employees: "10.000+", business: "Phát triển bất động sản nhà ở", keywords: "Vinhomes, VHM"},
  {code: "VRE", full_name: "CTCP Vincom Retail", english_name: "Vincom Retail", former_name: "", exchange: "HOSE", industry: "Bất động sản", website: "vincom.com.vn", established: "2012", employees: "2.000+", business: "Phát triển bất động sản bán lẻ", keywords: "Vincom, Vincom Retail"},
  {code: "NVL", full_name: "CTCP Tập đoàn Đầu tư Địa ốc No Va", english_name: "Novaland", former_name: "", exchange: "HOSE", industry: "Bất động sản", website: "novaland.com.vn", established: "1992", employees: "2.000+", business: "Phát triển bất động sản", keywords: "Novaland, NVL"},
  {code: "KDH", full_name: "CTCP Đầu tư và Kinh doanh Nhà Khang Điền", english_name: "Khang Dien", former_name: "", exchange: "HOSE", industry: "Bất động sản", website: "khangdien.com.vn", established: "2001", employees: "500+", business: "Phát triển bất động sản", keywords: "Khang Điền, KDH"},
  {code: "NLG", full_name: "CTCP Đầu tư Nam Long", english_name: "Nam Long", former_name: "", exchange: "HOSE", industry: "Bất động sản", website: "namlongvn.com", established: "1992", employees: "600+", business: "Phát triển bất động sản", keywords: "Nam Long, NLG"},
  {code: "DIG", full_name: "Tổng CTCP Đầu tư Phát triển Xây dựng", english_name: "DIC Corp", former_name: "", exchange: "HOSE", industry: "Bất động sản", website: "dic.vn", established: "1990", employees: "1.000+", business: "Phát triển bất động sản", keywords: "DIC Corp, DIG"},
  {code: "DXG", full_name: "CTCP Tập đoàn Đất Xanh", english_name: "Dat Xanh Group", former_name: "", exchange: "HOSE", industry: "Bất động sản", website: "datxanh.vn", established: "2003", employees: "3.000+", business: "Phát triển và môi giới bất động sản", keywords: "Đất Xanh, DXG"},
  {code: "PDR", full_name: "CTCP Phát triển Bất động sản Phát Đạt", english_name: "Phat Dat", former_name: "", exchange: "HOSE", industry: "Bất động sản", website: "phatdat.com.vn", established: "2004", employees: "500+", business: "Phát triển bất động sản", keywords: "Phát Đạt, PDR"},
  {code: "VCG", full_name: "Tổng CTCP Xuất nhập khẩu và Xây dựng Việt Nam", english_name: "Vinaconex", former_name: "", exchange: "HOSE", industry: "Xây dựng", website: "vinaconex.com.vn", established: "1988", employees: "5.000+", business: "Xây dựng, bất động sản", keywords: "Vinaconex, VCG"},
  {code: "HBC", full_name: "CTCP Tập đoàn Xây dựng Hòa Bình", english_name: "Hoa Binh Construction", former_name: "", exchange: "HOSE", industry: "Xây dựng", website: "hbcg.vn", established: "1987", employees: "3.000+", business: "Xây dựng dân dụng và công nghiệp", keywords: "Hòa Bình, HBC"},
  {code: "CTD", full_name: "CTCP Xây dựng Coteccons", english_name: "Coteccons", former_name: "", exchange: "HOSE", industry: "Xây dựng", website: "coteccons.vn", established: "2004", employees: "2.500+", business: "Xây dựng dân dụng và công nghiệp", keywords: "Coteccons, CTD"},
  {code: "CII", full_name: "CTCP Đầu tư Hạ tầng Kỹ thuật TP.HCM", english_name: "CII", former_name: "", exchange: "HOSE", industry: "Xây dựng - Hạ tầng", website: "cii.com.vn", established: "2001", employees: "1.000+", business: "Đầu tư hạ tầng, bất động sản", keywords: "CII"},
  {code: "HUT", full_name: "CTCP Tasco", english_name: "Tasco", former_name: "", exchange: "HNX", industry: "Xây dựng - Hạ tầng", website: "tasco.com.vn", established: "1971", employees: "2.000+", business: "Đầu tư hạ tầng, thu phí BOT", keywords: "Tasco, HUT"},
  {code: "LCG", full_name: "CTCP Lizen", english_name: "Lizen", former_name: "Licogi 16", exchange: "HOSE", industry: "Xây dựng - Hạ tầng", website: "lizen.vn", established: "2001", employees: "1.000+", business: "Thi công xây lắp hạ tầng", keywords: "Lizen, LCG"}
];'''
content = re.sub(r'var COMPANY_INFO = \[.*?\];', new_company_info, content, flags=re.DOTALL)

# Replace SOURCE_INFO notes
content = content.replace('Tin DN bán lẻ, báo cáo tài chính', 'Tin DN, báo cáo tài chính')
content = content.replace('Nhiều insight về chuỗi, chiến lược', 'Nhiều insight về dự án, chiến lược')
content = content.replace('Tin tức thị trường, bán lẻ', 'Tin tức thị trường, bất động sản')
content = content.replace('Phân tích sức mua, báo cáo thị trường', 'Phân tích dự án, báo cáo thị trường')
content = content.replace('Trang chuyên về doanh nghiệp, tiêu dùng', 'Trang chuyên về doanh nghiệp, bất động sản')
content = content.replace('Cực tốt cho mảng Dược phẩm và Thực phẩm', 'Cực tốt cho mảng Xây dựng và Bất động sản')
content = content.replace('Tin tức thị trường tiêu dùng', 'Tin tức thị trường bất động sản')
content = content.replace('Nhịp đập thị trường, FMCG', 'Nhịp đập thị trường')
content = content.replace('Tin kinh tế, bán lẻ hàng ngày', 'Tin kinh tế, bất động sản hàng ngày')
content = content.replace('Kinh doanh, Tiêu dùng', 'Kinh doanh, Bất động sản')

# Replace SEARCH_TERMS
new_search_terms = '''var SEARCH_TERMS = {
  "VIC": ["Vingroup dự án", "VIC lợi nhuận", "Vingroup phát hành trái phiếu"],
  "VHM": ["Vinhomes mở bán", "VHM doanh thu", "Vinhomes Ocean Park"],
  "VRE": ["Vincom Retail mặt bằng", "VRE kết quả kinh doanh"],
  "NVL": ["Novaland tái cấu trúc", "NVL dự án", "Novaland trái phiếu"],
  "KDH": ["Khang Điền mở bán", "KDH lợi nhuận", "Dự án Khang Điền"],
  "NLG": ["Nam Long bàn giao", "NLG doanh thu", "Dự án Nam Long"],
  "DIG": ["DIC Corp đấu giá", "DIG lợi nhuận", "Dự án DIC Corp"],
  "DXG": ["Đất Xanh môi giới", "DXG lợi nhuận", "Đất Xanh dự án"],
  "PDR": ["Phát Đạt pháp lý", "PDR trái phiếu", "Phát Đạt dự án"],
  "VCG": ["Vinaconex trúng thầu", "VCG cao tốc", "Vinaconex lợi nhuận"],
  "HBC": ["Hòa Bình trúng thầu", "HBC thi công", "Xây dựng Hòa Bình"],
  "CTD": ["Coteccons trúng thầu", "CTD lợi nhuận", "Xây dựng Coteccons"],
  "CII": ["CII hạ tầng", "CII thu phí", "CII BOT"],
  "HUT": ["Tasco thu phí", "HUT VETC", "Tasco dự án"],
  "LCG": ["Lizen trúng thầu", "LCG cao tốc", "Lizen thi công"]
};'''
content = re.sub(r'var SEARCH_TERMS = \{.*?\n\};', new_search_terms, content, flags=re.DOTALL)

# Replace INDUSTRY_SEARCH
new_industry_search = '''var INDUSTRY_SEARCH = [
  "thị trường bất động sản phục hồi",
  "giải ngân đầu tư công",
  "lãi suất vay mua nhà",
  "luật đất đai sửa đổi",
  "dự án cao tốc",
  "trúng thầu xây dựng",
  "giá vật liệu xây dựng",
  "thanh khoản bất động sản"
];'''
content = re.sub(r'var INDUSTRY_SEARCH = \[.*?\];', new_industry_search, content, flags=re.DOTALL)

# --- 4. THAY THẾ NHÓM NGÀNH (REPLACE STRING) ---
# Dùng chuỗi replace cơ bản để cập nhật thông tin tên ngành Bất động sản / Xây dựng
content = content.replace('Bán lẻ / Tiêu dùng', 'Bất động sản / Xây dựng')
content = content.replace('Bán lẻ / FMCG', 'Bất động sản / Xây dựng')
content = content.replace('Bán lẻ - Tiêu dùng - Thực phẩm - Dược phẩm', 'Bất động sản - Xây dựng')

# --- 5. GHI VÀO FILE ---
# Ghi đè toàn bộ thay đổi vào file gốc
with open(config_path, "w", encoding="utf-8") as f:
    f.write(content)

# Thông báo hoàn tất
print("GS/Config.gs updated")
