# fetch.py
import requests
import time
from datetime import datetime
from lib.config import TICKERS, HEADERS, DNSE_API_BASE_URL, START_DATE, END_DATE

def get_unix_timestamp(date_str):
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    return int(dt.timestamp())

def fetch_data():
    raw_responses = {}
    
    start_unix = get_unix_timestamp(START_DATE)
    end_unix = get_unix_timestamp(END_DATE)
    
    for ticker in TICKERS:
        try:
            params = {
                "from": start_unix,
                "to": end_unix,
                "symbol": ticker,
                "resolution": "1D"
            }
            print(f"Fetching {ticker} from {START_DATE} to {END_DATE}...")
            response = requests.get(DNSE_API_BASE_URL, headers=HEADERS, params=params)
            
            if response.status_code == 200:
                raw_responses[ticker] = response.json()
            else:
                print(f"Warning: DNSE API returned {response.status_code} for {ticker}")
            
            time.sleep(0.5) # Rate limiting
        except Exception as e:
            print(f"Error fetching data for {ticker}: {e}")
            
    return raw_responses
