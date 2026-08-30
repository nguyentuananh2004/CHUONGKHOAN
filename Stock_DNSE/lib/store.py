# store.py
import pandas as pd
import os

EXCEL_FILE = "data/CRAWL_STOCK_DNSE.xlsx"

def save_to_excel(valid_records):
    """
    Sử dụng pandas để append row mới vào file CRAWL_STOCK_DNSE.xlsx.
    """
    if not valid_records:
        print("No valid records to save.")
        return

    # Chuyển đổi list of pydantic models sang DataFrame
    data_dicts = [record.model_dump() if hasattr(record, 'model_dump') else record.dict() for record in valid_records]
    df_new = pd.DataFrame(data_dicts)
    
    # Tính toán đường dẫn tuyệt đối tới thư mục root của dự án Stock_DNSE
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    file_path = os.path.join(base_dir, EXCEL_FILE)
    
    try:
        if os.path.exists(file_path):
            try:
                # Nếu file đã tồn tại, đọc lên và nối dữ liệu
                df_existing = pd.read_excel(file_path)
                df_combined = pd.concat([df_existing, df_new], ignore_index=True)
            except Exception:
                # Xử lý trường hợp file hỏng hoặc trống
                df_combined = df_new
        else:
            # Tạo thư mục data nếu chưa có
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            df_combined = df_new
            
        # Ghi đè vào file excel cũ
        df_combined.to_excel(file_path, index=False)
        print(f"Successfully saved {len(df_new)} records to {file_path}")
    except Exception as e:
        print(f"Error saving to Excel: {e}")
