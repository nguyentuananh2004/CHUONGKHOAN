var STOCK_CODES = ["VIC", "VHM", "VRE", "NVL", "KDH", "NLG", "DIG", "DXG", "PDR", "VCG", "HBC", "CTD", "CII", "HUT", "LCG"];

var STOCK_PATTERN = new RegExp("\\b(" + STOCK_CODES.join("|") + ")\\b", "g");

var COMPANY_KEYWORDS = {
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
};

var COMPANY_INFO = [
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
];

var SOURCE_INFO = [
  {name: "CafeF", domain: "cafef.vn", categories: "Doanh nghiệp, Thị trường, Vĩ mô", type: "RSS+API", rss: "Có", articles: "50k+", note: "Tin DN, báo cáo tài chính", has_rss: true, has_api: true},
  {name: "CafeBiz", domain: "cafebiz.vn", categories: "Câu chuyện kinh doanh", type: "API", rss: "Không", articles: "20k+", note: "Nhiều insight về dự án, chiến lược", has_rss: false, has_api: true},
  {name: "VnExpress", domain: "vnexpress.net", categories: "Kinh doanh", type: "RSS", rss: "Có", articles: "15k+", note: "Tin tức thị trường, bất động sản", has_rss: true, has_api: false},
  {name: "VietnamNet", domain: "vietnamnet.vn", categories: "Kinh doanh, Doanh nghiệp, Thị trường", type: "RSS", rss: "Có", articles: "30k+", note: "Cập nhật tình hình kinh doanh", has_rss: true, has_api: false},
  {name: "VnEconomy", domain: "vneconomy.vn", categories: "Kinh doanh, Doanh nghiệp, Thị trường", type: "RSS", rss: "Có", articles: "15k+", note: "Phân tích dự án, báo cáo thị trường", has_rss: true, has_api: false},
  {name: "VnBusiness", domain: "vnbusiness.vn", categories: "Doanh nghiệp, Thị trường", type: "RSS", rss: "Có", articles: "5k+", note: "Phân tích doanh nghiệp", has_rss: true, has_api: false},
  {name: "Dân trí", domain: "dantri.com.vn", categories: "Kinh doanh", type: "RSS", rss: "Có", articles: "5k+", note: "Tin kinh doanh và sức mua", has_rss: true, has_api: false},
  {name: "Doanh nghiệp VN", domain: "doanhnghiepvn.vn", categories: "Kinh doanh, Bất động sản", type: "RSS", rss: "Có", articles: "5k+", note: "Trang chuyên về doanh nghiệp, bất động sản", has_rss: true, has_api: false},
  {name: "Sức Khỏe & Đời Sống", domain: "suckhoedoisong.vn", categories: "Kinh tế", type: "RSS", rss: "Có", articles: "5k+", note: "Cực tốt cho mảng Xây dựng và Bất động sản", has_rss: true, has_api: false},
  {name: "ZNEWS", domain: "znews.vn", categories: "Kinh doanh, Tài chính", type: "RSS", rss: "Có", articles: "5k+", note: "Báo cáo tài chính, mở rộng chuỗi", has_rss: true, has_api: false},
  {name: "Soha", domain: "soha.vn", categories: "Kinh doanh", type: "RSS", rss: "Có", articles: "5k+", note: "Tin tức thị trường bất động sản", has_rss: true, has_api: false},
  {name: "Đầu Tư VN", domain: "dautuvietnam.com.vn", categories: "Doanh nghiệp, Kinh doanh", type: "RSS", rss: "Có", articles: "5k+", note: "Kênh của Báo Đầu Tư", has_rss: true, has_api: false},
  {name: "Đời Sống VN", domain: "doisongvietnam.vn", categories: "Kinh doanh", type: "RSS", rss: "Có", articles: "2k+", note: "Nhịp đập thị trường", has_rss: true, has_api: false},
  {name: "Thanh Niên", domain: "thanhnien.vn", categories: "Kinh tế", type: "RSS", rss: "Có", articles: "10k+", note: "Chính sách, tình hình doanh nghiệp", has_rss: true, has_api: false}
];

var RSS_SOURCES = [
  {name: "Cafef DN", url: "https://cafef.vn/doanh-nghiep.rss", cat: "DN"},
  {name: "Cafef TT", url: "https://cafef.vn/thi-truong.rss", cat: "TT"},
  {name: "VnExpress KD", url: "https://vnexpress.net/rss/kinh-doanh.rss", cat: "KD"},
  {name: "Vietnamnet KD", url: "https://vietnamnet.vn/rss/kinh-doanh.rss", cat: "KD"},
  {name: "Vietnamnet DN", url: "https://vietnamnet.vn/rss/doanh-nghiep.rss", cat: "DN"},
  {name: "Vietnamnet TT", url: "https://vietnamnet.vn/rss/thi-truong.rss", cat: "TT"},
  {name: "VnEconomy KD", url: "https://vneconomy.vn/kinh-doanh.rss", cat: "KD"},
  {name: "VnEconomy DN", url: "https://vneconomy.vn/doanh-nhan.rss", cat: "DN"},
  {name: "VnEconomy TT", url: "https://vneconomy.vn/thi-truong.rss", cat: "TT"},
  {name: "VnBusiness DN", url: "https://vnbusiness.vn/rss/doanh-nghiep.rss", cat: "DN"},
  {name: "VnBusiness TT", url: "https://vnbusiness.vn/rss/thi-truong.rss", cat: "TT"},
  {name: "Dân trí KD", url: "https://dantri.com.vn/rss/kinh-doanh.rss", cat: "KD"},
  {name: "DOANH_NGHIEP_VN KD", url: "https://doanhnghiepvn.vn/rss/kinh-doanh-va-tieu-dung-1052.rss", cat: "KD"},
  {name: "SUC_KHOE_DS KT", url: "https://suckhoedoisong.vn/rss/kinh-te.rss", cat: "KD"},
  {name: "ZNEWS KD", url: "https://znews.vn/rss/kinh-doanh-tai-chinh.rss", cat: "KD"},
  {name: "Soha KD", url: "https://soha.vn/rss/kinh-doanh.rss", cat: "KD"},
  {name: "DAU_TU_VIET_NAM DN", url: "https://dautuvietnam.com.vn/rss/doanh-nghiep.rss", cat: "DN"},
  {name: "DAU_TU_VIET_NAM KD", url: "https://dautuvietnam.com.vn/rss/kinh-doanh.rss", cat: "KD"},
  {name: "DOI_SONG_VN KD", url: "https://doisongvietnam.vn/rss/kinh-doanh.rss", cat: "KD"},
  {name: "Thanh Niên KD", url: "https://thanhnien.vn/rss/kinh-te.rss", cat: "KD"}
];

var API_SOURCES = [
  {type: "cafef", name: "CafeF DN", cat: "DN", zone_id: 18836, domain: "https://cafef.vn"},
  {type: "cafef", name: "CafeF Vĩ mô", cat: "Vĩ mô", zone_id: 18833, domain: "https://cafef.vn"},
  {type: "cafebiz", name: "CafeBiz Câu chuyện KD", cat: "KD", zone_id: 176127, domain: "https://cafebiz.vn"}
];

var SITEMAP_SOURCES = [
  {name: "CafeF Sitemap", url: "https://cafef.vn/sitemap.xml", cat: "Kinh Doanh", url_pattern: "/kinh-doanh/|/doanh-nghiep/"},
  {name: "VnExpress Sitemap", url: "https://vnexpress.net/sitemap/1003159/sitemap.xml", cat: "Kinh Doanh", url_pattern: ""},
  {name: "VietnamNet Sitemap", url: "https://vietnamnet.vn/sitemap.xml", cat: "Kinh Doanh", url_pattern: "/kinh-doanh/"}
];

var SEARCH_TERMS = {
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
};

var INDUSTRY_SEARCH = [
  "thị trường bất động sản phục hồi",
  "giải ngân đầu tư công",
  "lãi suất vay mua nhà",
  "luật đất đai sửa đổi",
  "dự án cao tốc",
  "trúng thầu xây dựng",
  "giá vật liệu xây dựng",
  "thanh khoản bất động sản"
];

var CONFIG_KEYWORDS_DATA = [];
(function buildKwData() {
  var kwid = 0;
  for (var code in SEARCH_TERMS) {
    var terms = SEARCH_TERMS[code];
    for (var i = 0; i < terms.length; i++) {
      kwid++;
      CONFIG_KEYWORDS_DATA.push({
        keyword_id: "KW" + ("000" + kwid).slice(-3),
        keyword: terms[i],
        industry_group: "Bất động sản / Xây dựng",
        related_tickers: code,
        event_type_suggestion: "earnings, expansion, contraction",
        priority: "High",
        note: "Mã cổ phiếu " + code
      });
    }
  }
  for (var j = 0; j < INDUSTRY_SEARCH.length; j++) {
    kwid++;
    CONFIG_KEYWORDS_DATA.push({
      keyword_id: "KW" + ("000" + kwid).slice(-3),
      keyword: INDUSTRY_SEARCH[j],
      industry_group: "Bất động sản / Xây dựng",
      related_tickers: "ALL",
      event_type_suggestion: "macro_sentiment, industry_trend",
      priority: "Medium",
      note: "Tìm kiếm theo ngành"
    });
  }
})();

// LƯU Ý: HÃY THAY ID SHEET CỦA BẠN VÀO ĐÂY NHÉ!
var SPREADSHEET_ID = "1GXiwp5WFwehYJR53C9dyM3LzCTqwg6Bhj10z7uMX7H4";

function getSS() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

var HTTP_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
};

var REQUEST_TIMEOUT = 30;
var MAX_RETRIES = 2;

var BLOCKED_DOMAINS = [
  "wikipedia.org","hhs.gov","grokipedia","wikidata.org",
  "wikimedia.org","windy.com","pinterest","nordinvasion.com",
  "youtube.com","facebook.com"
];

var VIETNAMESE_CHARS_REGEX = new RegExp(
  "[ăâđêôơưàảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵ]", "i"
);

var COMPANY_NAME_PATTERNS = {};
(function buildNamePatterns() {
  for (var code in COMPANY_KEYWORDS) {
    var escaped = COMPANY_KEYWORDS[code].map(function(kw) {
      return kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    });
    COMPANY_NAME_PATTERNS[code] = new RegExp("(" + escaped.join("|") + ")", "i");
  }
})();