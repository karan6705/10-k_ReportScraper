import os
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware  # Add this import
from dotenv import load_dotenv
from your_pipeline import generate_annual_report

# 1️⃣ Load env
load_dotenv('.env')

# 2️⃣ Create the app
app = FastAPI(
    title="Annual Report Extractor API"
)

# 🔥 ADD CORS MIDDLEWARE - This fixes the connection issue!
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://one0-k-reportscraper-2.onrender.com",  # Your frontend URL
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # React dev server (backup)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 ADD ROOT ENDPOINT - This fixes the 404 errors!
@app.get("/")
async def root():
    return {
        "message": "Annual Report Extractor API is running",
        "status": "healthy",
        "endpoints": {
            "extract": "/extract",
            "reports": "/reports/"
        }
    }

# 3️⃣ Serve any generated PDF from the backend root under /reports
#    (PDFs are written into this same folder by your_pipeline)
app.mount(
    "/reports",
    StaticFiles(directory=".", html=False),
    name="reports",
)

@app.post("/extract")
async def extract(
    request: Request,  # <-- Added to get the base URL
    report: UploadFile = File(...),
    model: str = Form("gemini-2.0-flash")
):
    """
    Accepts a 10-K PDF upload + model selector, runs the pipeline,
    writes out `annual_report_<Company>_<Year>.pdf` in this directory,
    and returns a full URL to download it.
    """
    # save upload to a temp file
    tmp_path = f"/tmp/{report.filename}"
    with open(tmp_path, "wb") as f:
        f.write(await report.read())
    try:
        # generate and return the filename
        out_name = generate_annual_report(tmp_path, model)
    except Exception as e:
        import traceback
        traceback.print_exc()  # Print full error to server log
        raise HTTPException(500, f"Extraction failed: {e}")
    
    # build the full URL for the client to download (works for both local and production)
    download_url = str(request.base_url) + f"reports/{out_name}"
    return JSONResponse({"pdfUrl": download_url})
