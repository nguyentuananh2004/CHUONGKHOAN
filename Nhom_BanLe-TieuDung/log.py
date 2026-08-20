import sys
from datetime import datetime

def info(msg):
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] [INFO] {msg}")

def warn(msg):
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] [WARN] {msg}")

def error(msg):
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] [ERROR] {msg}", file=sys.stderr)

def fetch_result(url, status, size):
    print(f"[FETCH] {status} | Size: {size} | URL: {url}")

def rss_fetch(name, url, added):
    print(f"[RSS] {name} | Added: {added} | URL: {url}")
