from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoModel, AutoTokenizer, AutoProcessor, AutoModelForCTC
import numpy as np
import os
import torchaudio
import logging

app = FastAPI()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],  # Allow requests from this origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load models
logger.info("Loading models...")
try:
    tokenizer = AutoTokenizer.from_pretrained("ai4bharat/indic-bert")
    model = AutoModel.from_pretrained("ai4bharat/indic-bert")
    asr_processor = AutoProcessor.from_pretrained("facebook/wav2vec2-base-960h")
    asr_model = AutoModelForCTC.from_pretrained("facebook/wav2vec2-base-960h")
    logger.info("Models loaded successfully.")
except Exception as e:
    logger.error(f"Error loading models: {str(e)}")

@app.post("/check-grammar/")
async def check_grammar(user_input: str):
    logger.debug(f"Received grammar check request: {user_input}")
    
    # Tokenize and process the input
    inputs = tokenizer(user_input, return_tensors="pt")
    outputs = model(**inputs)

    # Mock accuracy and feedback for demo purpose
    accuracy = np.random.rand() * 100  # Simulated accuracy
    feedback = "Great job! Your sentence structure is correct." if accuracy > 80 else "Please check your grammar."
    
    logger.info(f"Grammar check result: accuracy={accuracy}, feedback={feedback}")

    return JSONResponse(content={
        "accuracy": accuracy,
        "feedback": feedback
    })

@app.post("/check-pronunciation/")
async def check_pronunciation(file: UploadFile = File(...)):
    logger.debug("Received pronunciation check request.")
    
    # Check file type
    if file.content_type != "audio/wav":
        logger.warning("Invalid file type received: %s", file.content_type)
        raise HTTPException(status_code=400, detail="Invalid file type. Only WAV files are accepted.")

    # Save uploaded file temporarily
    file_location = f"./recordings/{file.filename}"
    os.makedirs(os.path.dirname(file_location), exist_ok=True)

    try:
        with open(file_location, "wb") as f:
            f.write(await file.read())
        logger.info(f"File saved: {file_location}")

        # Load the audio file and transcribe
        waveform, sample_rate = torchaudio.load(file_location)
        logger.info("Audio file loaded successfully.")

        inputs = asr_processor(waveform.squeeze(0), sampling_rate=sample_rate, return_tensors="pt")
        logits = asr_model(inputs.input_values).logits
        predicted_ids = np.argmax(logits.detach().numpy(), axis=-1)
        recognized_text = asr_processor.batch_decode(predicted_ids)[0]  # Assuming single input
        
        logger.info(f"Transcribed text: {recognized_text}")

        # Mock accuracy and feedback for demo purpose
        accuracy = np.random.rand() * 100  # Simulated accuracy
        feedback = "Well done! Your pronunciation is clear." if accuracy > 80 else "Try to pronounce the words more clearly."
        
        logger.info(f"Pronunciation check result: accuracy={accuracy}, feedback={feedback}")

    except Exception as e:
        logger.error(f"Error during transcription: {str(e)}")
        raise HTTPException(status_code=500, detail="Error during transcription.")
    finally:
        if os.path.exists(file_location):
            os.remove(file_location)
            logger.info(f"Temporary file deleted: {file_location}")

    return JSONResponse(content={
        "recognized_text": recognized_text,
        "accuracy": accuracy,
        "feedback": feedback
    })

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting server...")
    uvicorn.run(app)
