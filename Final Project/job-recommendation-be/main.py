from fastapi import FastAPI, File, UploadFile,Form
from fastapi.middleware.cors import CORSMiddleware
from pdf2image import convert_from_path, exceptions as pdf2image_exceptions
from typing import Optional
import pytesseract
from pytesseract import image_to_string
import os
pytesseract.pytesseract.tesseract_cmd = r'lib\Tesseract-OCR\tesseract.exe'

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the API"}

@app.post("/upload")
async def upload_file(file_data: UploadFile = File(...)):
    text = ""
    with open(os.path.join('uploads', 'temp.pdf'), "wb") as buffer:
        buffer.write(await file_data.read())
    pdf_path = os.path.join('uploads', 'temp.pdf')
    try:
        # Chuyển đổi từ PDF thành hình ảnh
        images = convert_from_path(pdf_path,poppler_path=r'lib\poppler-24.02.0\Library\bin')
    except pdf2image_exceptions.PDFPageCountError:
        return {"error": "Failed to get page count"}
    except pdf2image_exceptions.PDFSyntaxError:
        return {"error": "PDF syntax error"}

    for img in images:
        text += image_to_string(img)
    if(text == ""):
        return {"text": "Failed to extract text"}
    return {"text": text}
@app.post("/techskills")
async def upload_techskills(text_data: str = Form(...)):
    return {"text": text_data}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)
