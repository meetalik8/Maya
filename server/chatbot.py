from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain.chains import LLMChain
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain_core.messages import SystemMessage
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Pydantic model for request body
class UserQuestion(BaseModel):
    question: str


groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise Exception("GROQ_API_KEY is not set in the environment variables.")

model = "llama3-70b-8192"
groq_chat = ChatGroq(groq_api_key=groq_api_key, model_name=model)
system_prompt = "You are a Marathi tutor. You will answer questions and correct mistakes."
conversational_memory_length = 5  
memory = ConversationBufferWindowMemory(
    k=conversational_memory_length, memory_key="chat_history", return_messages=True
)

@app.post("/ask")
def ask_question(user_question: UserQuestion):
    """
    Endpoint to handle user questions and generate chatbot responses.
    """
    print(f"Received question: {user_question.question}") 
    try:
        # Construct the prompt
        prompt = ChatPromptTemplate.from_messages(
            [
                SystemMessage(content=system_prompt),
                MessagesPlaceholder(variable_name="chat_history"),
                HumanMessagePromptTemplate.from_template("{human_input}"),
            ]
        )

        # Create the conversation chain
        conversation = LLMChain(
            llm=groq_chat,
            prompt=prompt,
            verbose=False,
            memory=memory,
        )

        # Generate response
        response = conversation.predict(human_input=user_question.question)
        return {"response": response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
