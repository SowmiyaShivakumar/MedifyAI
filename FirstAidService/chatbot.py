# app.py - Flask Backend
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import os
import sys 
# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Groq LLM
def create_llm():
    return ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0.7,
        api_key=os.getenv('GROQ_API_KEY'),
    )

# Create medical chatbot chain
def create_medical_bot():
    llm = create_llm()
    prompt_template = ChatPromptTemplate([
        ("system", """You are 24/7 first aid support also an AI-powered medical assistant designed to help users understand their health concerns.
         
         Guidelines:
         - Provide informative and educational responses about medical conditions
         - For symptom-related queries, offer possible conditions with approximate likelihoods
         - Clearly state that you are not a replacement for professional medical advice
         - Be compassionate and understanding about health concerns
         - Respond to general medical questions with factual information
         - For serious symptoms, always recommend seeking immediate medical attention
         - Format your responses in a clear, easy-to-read manner.
         
         Mainly suggest the answer in short sentences 2 or 3 lines"""),
        ("human", "{user_input}")
    ])
    
    chain = prompt_template | llm | StrOutputParser()
    return chain

if __name__ == "__main__":
    # Read user input from stdin
    user_input = sys.stdin.read().strip()
    
    try:
        # Create medical bot chain
        chat_chain = create_medical_bot()
        
        # Generate response
        response = chat_chain.invoke({"user_input": user_input})
        
        # Write response to stdout
        print(response)
    except Exception as e:
        # Send error to stderr
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)