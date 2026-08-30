# enrich.py
from datetime import datetime
import re

def clean_number(value):
    if isinstance(value, str):
        return float(re.sub(r',', '', value))
    return value

def enrich_data(extracted_data):
    enriched_records = []
    crawl_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    for data in extracted_data:
        try:
            ticker = data.get("ticker")
            date_val = data.get("Date")
            
            open_val = float(clean_number(data.get("Open")))
            high_val = float(clean_number(data.get("High")))
            low_val = float(clean_number(data.get("Low")))
            close_val = float(clean_number(data.get("Close")))
            volume_val = int(clean_number(data.get("Volume")))
            
            record = {
                "ticker": ticker,
                "date": date_val,
                "open": open_val,
                "high": high_val,
                "low": low_val,
                "close": close_val,
                "volume": volume_val,
                "crawl_timestamp": crawl_time
            }
            enriched_records.append(record)
        except Exception as e:
            print(f"Error enriching data for {data.get('ticker')}: {e}")
            
    return enriched_records
