import os
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from your_pipeline import generate_annual_report

# Load environment variables
load_dotenv('.env')

# Create FastAPI app
app = FastAPI(
    title="Annual Report Extractor API",
    description="API for extracting and processing 10-K reports",
    version="1.0.0"
)

# CORS middleware - CRITICAL for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://one0-k-reportscraper-2.onrender.com",  # Your frontend URL
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # React dev server
        "http://localhost:8080",  # Alternative dev port
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Root endpoint for health check
@app.get("/")
async def root():
    return {
        "message": "Annual Report Extractor API is running",
        "status": "healthy",
        "version": "1.0.0",
        "endpoints": {
            "extract": "/extract",
            "reports": "/reports/",
            "health": "/"
        }
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Annual Report Extractor"}

# Serve generated PDFs
app.mount(
    "/reports",
    StaticFiles(directory=".", html=False),
    name="reports",
)

# Main extraction endpoint
@app.post("/extract")
async def extract_report(
    request: Request,
    report: UploadFile = File(...),
    model: str = Form("gemini-2.0-flash")
):
    """
    Extract and process a 10-K PDF report.
    
    Args:
        request: FastAPI request object
        report: Uploaded PDF file
        model: AI model to use for processing
    
    Returns:
        JSON response with download URL for processed report
    """
    # Validate file type
    if not report.filename.lower().endswith('.pdf'):
        raise HTTPException(400, "File must be a PDF")
    
    # Validate model selection
    valid_models = ["gemini-2.0-flash", "gemini-2.0-pro"]
    if model not in valid_models:
        raise HTTPException(400, f"Model must be one of: {valid_models}")
    
    # Save uploaded file to temporary location
    tmp_path = f"/tmp/{report.filename}"
    try:
        with open(tmp_path, "wb") as f:
            content = await report.read()
            f.write(content)
        
        print(f"Saved file: {report.filename} ({len(content)} bytes)")
        print(f"Using model: {model}")
        
    except Exception as e:
        raise HTTPException(500, f"Failed to save uploaded file: {str(e)}")
    
    try:
        # Process the report using your pipeline
        output_filename = generate_annual_report(tmp_path, model)
        print(f"Generated report: {output_filename}")
        
    except Exception as e:
        import traceback
        print(f"Pipeline error: {str(e)}")
        traceback.print_exc()
        raise HTTPException(500, f"Report extraction failed: {str(e)}")
    
    finally:
        # Clean up temporary file
        try:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
        except Exception as e:
            print(f"Warning: Could not remove temp file {tmp_path}: {e}")
    
    # Build download URL
    base_url = str(request.base_url).rstrip('/')
    download_url = f"{base_url}/reports/{output_filename}"
    
    return JSONResponse({
        "success": True,
        "message": "Report extracted successfully",
        "pdfUrl": download_url,
        "filename": output_filename,
        "model_used": model
    })

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={
            "error": "Endpoint not found",
            "message": f"The endpoint {request.url.path} does not exist",
            "available_endpoints": ["/", "/extract", "/reports/", "/health"]
        }
    )

@app.exception_handler(500)
async def internal_error_handler(request: Request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": "An unexpected error occurred while processing your request"
        }
    )
