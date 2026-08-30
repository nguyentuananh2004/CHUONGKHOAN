# main.py
import sys
import os

# Thêm đường dẫn project vào sys.path để import lib
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from lib.fetch import fetch_data
from lib.extract import extract_fields
from lib.enrich import enrich_data
from lib.models import StockRecord
from lib.store import save_to_excel

def main():
    print("Starting DNSE Stock Data Pipeline...")
    
    # 1. Fetch
    raw_json = fetch_data()
    print(f"Fetched raw data for {len(raw_json)} tickers.")
    
    # 2. Extract
    extracted = extract_fields(raw_json)
    print("Extracted static fields.")
    
    # 3. Enrich
    enriched_dicts = enrich_data(extracted)
    print(f"Enriched {len(enriched_dicts)} records.")
    
    # 4. Validate with Pydantic Models
    valid_records = []
    for record_dict in enriched_dicts:
        try:
            valid_record = StockRecord(**record_dict)
            valid_records.append(valid_record)
        except Exception as e:
            print(f"Validation error for {record_dict.get('ticker')}: {e}")
            
    print(f"Validated {len(valid_records)} records.")
    
    # 5. Store
    save_to_excel(valid_records)
    print("Pipeline completed successfully.")

if __name__ == "__main__":
    main()
