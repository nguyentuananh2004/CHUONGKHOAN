# extract.py
from datetime import datetime

def extract_fields(raw_json):
    extracted_data = []
    
    for ticker, data in raw_json.items():
        try:
            # DNSE TradingView format
            times = data.get("t", [])
            opens = data.get("o", [])
            highs = data.get("h", [])
            lows = data.get("l", [])
            closes = data.get("c", [])
            volumes = data.get("v", [])
            
            for i in range(len(times)):
                date_str = datetime.fromtimestamp(times[i]).strftime("%Y-%m-%d")
                extracted = {
                    "ticker": ticker,
                    "Date": date_str,
                    "Open": opens[i],
                    "High": highs[i],
                    "Low": lows[i],
                    "Close": closes[i],
                    "Volume": volumes[i]
                }
                extracted_data.append(extracted)
        except Exception as e:
            print(f"Error extracting data for {ticker}: {e}")
            
    return extracted_data
