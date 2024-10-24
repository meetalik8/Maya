from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
import torch
from transformers import AutoProcessor, AutoModelForCTC
import soundfile as sf
import numpy as np

app = FastAPI()

# Load model directly
processor = AutoProcessor.from_pretrained("facebook/wav2vec2-base-960h")
model = AutoModelForCTC.from_pretrained("facebook/wav2vec2-base-960h")

class TranscriptionResponse(BaseModel):
    transcription: str
    accuracy: float  # Placeholder for now, but can be used for advanced analysis

@app.post("/analyze_audio")
async def analyze_audio(file: UploadFile = File(...)):
    try:
        # Save the uploaded audio file temporarily
        contents = await file.read()
        with open("./temp.wav", "wb") as f:
            f.write(contents)
        
        # Check if the file is actually saved and in the correct format
        if not contents:
            raise ValueError("No audio data received.")

        # Load and preprocess the audio
        audio_input, sample_rate = sf.read("./temp.wav")
        
        # Ensure audio is 1D array (mono)
        if audio_input.ndim > 1:
            audio_input = audio_input[:, 0]  # Take one channel if stereo
        
        # Check if sample rate matches expected
        if sample_rate != 16000:
            raise ValueError(f"Expected sample rate 16000, got {sample_rate}")

        inputs = processor(audio_input, sampling_rate=sample_rate, return_tensors="pt", padding=True)

        # Perform inference with the model
        with torch.no_grad():
            logits = model(inputs.input_values).logits

        # Get predicted transcription
        predicted_ids = torch.argmax(logits, dim=-1)
        transcription = processor.batch_decode(predicted_ids)

        # For now, we're setting a placeholder accuracy
        accuracy = 0.9

        return TranscriptionResponse(transcription=transcription[0], accuracy=accuracy)

    except Exception as e:
        # Log the error for debugging
        print(f"Error processing audio: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="192.168.29.231", port=8000)
