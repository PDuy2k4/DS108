from fastapi import FastAPI, File, UploadFile,Form
from fastapi.middleware.cors import CORSMiddleware
from pdf2image import convert_from_path, exceptions as pdf2image_exceptions
import pytesseract
import numpy as np
from pytesseract import image_to_string
import pandas as pd
import pickle
import re
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
def text_preprocessing(text):
    text=re.sub(r'\W',' ',text)
    text=text.strip()
    text=re.sub(r'[^\w\s]','',text)
    text = list(set([word for word in text.lower().split()]))
    return " ".join(text)


def prediction(text):
    text=re.sub(r'\W',' ',text)
    text=re.sub(r'\s+',' ',text)
    text=re.sub(r'[^\w\s]','',text)
    text=text.lower()
    if(text == ""):
        return "Failed to extract text"
    
    data=pd.read_csv("./Data/final_data_clustered.csv")
    cv_model=pickle.load(open('./ML_models/cv_model.pkl','rb'))

    pl_model=pickle.load(open('./ML_models/pl_model.pkl','rb'))
    text_transformed=cv_model.transform([text])
    idx_pred=pl_model.predict(text_transformed)[0]
    data_res=data[data['cluster']==idx_pred][['title','company','location','image_url','job_url','technical_skill']].reset_index(drop=True)
    nearest_jobs=[]
    for vec in cv_model.transform(data_res['technical_skill'].apply(text_preprocessing)).toarray():
        nearest_jobs.append(np.linalg.norm(vec-text_transformed[0]))
    nearest_jobs=np.array(nearest_jobs)
    final_rs=data_res.iloc[np.argsort(nearest_jobs)[:10],:].drop('technical_skill',axis=1).to_dict(orient='records') #Lấy 10 công việc gần nhất
    return final_rs
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
    return {"text":prediction(text)}
@app.post("/techskills")
async def upload_techskills(text_data: str = Form(...)):
     return {"text":prediction(text_data)}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)
