# from flask import Flask, request, jsonify
# from langchain_groq import ChatGroq
# import os

# app = Flask(__name__)

# # Load environment variables
# from dotenv import load_dotenv
# load_dotenv()

# # Initialize the model
# llm = ChatGroq(
#     model="llama-3.3-70b-versatile",
#     temperature=0.7,
#     api_key=os.getenv('GROQ_API_KEY'),
# )

# from langchain.prompts import ChatPromptTemplate
# from langchain_core.output_parsers import StrOutputParser

# def diagnose_symptoms(symptoms):
#     promptTemplate = ChatPromptTemplate([
#         ("system", """You are a professional medical diagnostic assistant. 
#             Given the following symptoms, provide a comprehensive analysis:"""),
#         ("human", f""" Symptoms: {symptoms} 

#             Please provide:
#             1. Top 3 most likely diseases/conditions
#             2. Probability percentage for each condition
            
#             Important Guidelines:
#             - Base your diagnosis on established medical knowledge
#             - Use evidence-based reasoning
#             - DO NOT provide medical treatment advice
#             - Emphasize that this is a preliminary screening, not a definitive diagnosis
#             - Recommend consulting a healthcare professional for accurate diagnosis

#             Output Format:
#             1. Disease Name: [Probability%]
               
#             2. Disease Name: [Probability%]
               
#             3. Disease Name: [Probability%]
               
#            """)
#     ])
#     chain = promptTemplate | llm | StrOutputParser()
#     return chain.invoke()

# @app.route('/diagnose', methods=['POST'])
# def diagnose():
#     data = request.json
#     symptoms = data.get('symptoms')
#     if not symptoms:
#         return jsonify({"error": "Please enter valid symptoms."}), 400
#     try:
#         diagnosis = diagnose_symptoms(symptoms)
#         print(diagnosis)
#         return jsonify({"diagnosis": diagnosis})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)

from dotenv import load_dotenv
load_dotenv()
from langchain_groq import ChatGroq
import os
import sys

# Initialize the LLM
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.7,
    api_key=os.getenv('GROQ_API_KEY'),
)

from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

def diagnose_symptoms(symptoms):
    promptTemplate = ChatPromptTemplate([
        ("system", """You are a professional medical diagnostic assistant. 
        Given the following symptoms, provide a comprehensive analysis:"""),
        ("human", f"""Symptoms: {symptoms} 
        Please provide:
        1. Top 3 most likely diseases/conditions
        2. Probability percentage for each condition
        
        Important Guidelines:
        - Base your diagnosis on established medical knowledge
        - Use evidence-based reasoning
        - DO NOT provide medical treatment advice
        - Emphasize that this is a preliminary screening, not a definitive diagnosis
        - Recommend consulting a healthcare professional for accurate diagnosis
        
        Output Format:
        1. Disease Name: [Probability%]
        
        2. Disease Name: [Probability%]
        
        3. Disease Name: [Probability%]
         Also don't add any ** around the texts. I need only the disease names not anyother text below.
        """)
    ])
    
    chain = promptTemplate | llm | StrOutputParser()
    return chain.invoke({})

if __name__ == "__main__":
    # Read symptoms from stdin
    symptoms = sys.stdin.read().strip()
    
    if not symptoms:
        print("Error: No symptoms provided")
        sys.exit(1)
    
    try:
        result = diagnose_symptoms(symptoms)
        print(result)
    except Exception as e:
        print(f"Error in diagnosis: {str(e)}", file=sys.stderr)
        sys.exit(1)
