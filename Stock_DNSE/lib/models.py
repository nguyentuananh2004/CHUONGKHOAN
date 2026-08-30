# models.py
from pydantic import BaseModel, Field
from datetime import date

class StockRecord(BaseModel):
    """
    Pydantic model để chuẩn hóa dữ liệu trước khi lưu.
    Đảm bảo không có record nào bị thiếu trường quan trọng như Close hay Volume.
    """
    ticker: str
    date: date
    open: float
    high: float
    low: float
    close: float = Field(..., description="Giá đóng cửa bắt buộc phải có")
    volume: int = Field(..., description="Khối lượng bắt buộc phải có")
    crawl_timestamp: str = Field(description="Timestamp lúc crawl dữ liệu")
