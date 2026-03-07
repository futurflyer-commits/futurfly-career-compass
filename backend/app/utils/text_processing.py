from fastapi import UploadFile, HTTPException
import io
import PyPDF2
from docx import Document

async def extract_text_from_upload(file: UploadFile) -> str:
    """
    Reads an uploaded file buffer in memory and attempts to extract raw text 
    from PDF, DOCX, or basic TXT formats.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="Filename missing from upload.")

    filename = file.filename.lower()
    content_bytes = await file.read()
    buffer = io.BytesIO(content_bytes)

    try:
        if filename.endswith(".pdf"):
            return extract_from_pdf(buffer)
        elif filename.endswith(".docx"):
            return extract_from_docx(buffer)
        elif filename.endswith(".txt"):
            return content_bytes.decode("utf-8")
        else:
            # Attempt to decode as generic text anyway, or fail
            try:
                return content_bytes.decode("utf-8")
            except Exception:
                raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF, DOCX, or TXT.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to extract text from file: {str(e)}")


def extract_from_pdf(buffer: io.BytesIO) -> str:
    reader = PyPDF2.PdfReader(buffer)
    extracted_text = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            extracted_text.append(text)
    return "\n".join(extracted_text)


def extract_from_docx(buffer: io.BytesIO) -> str:
    doc = Document(buffer)
    extracted_text = []
    for para in doc.paragraphs:
        if para.text:
            extracted_text.append(para.text)
    return "\n".join(extracted_text)
