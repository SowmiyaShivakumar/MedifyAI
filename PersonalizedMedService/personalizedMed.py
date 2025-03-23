# # diagnose.py - Modified to work as API with Node.js
# from dotenv import load_dotenv
# load_dotenv()
# from langchain_groq import ChatGroq
# import os
# import json
# import sys

# # Initialize the LLM
# try:
#     llm = ChatGroq(
#         model="llama-3.3-70b-versatile",
#         temperature=0.7,
#         api_key=os.getenv('GROQ_API_KEY'),
#     )
# except Exception as e:
#     print(json.dumps({"error": f"Failed to initialize Groq LLM: {str(e)}"}))
#     sys.exit(1)

# from langchain.prompts import ChatPromptTemplate
# from langchain_core.output_parsers import StrOutputParser

# def diagnose_symptoms():
#     # Enhanced prompt template with medicine suggestions
#     promptTemplate = ChatPromptTemplate([
#         ("system", """You are a professional medical diagnostic assistant with knowledge of both conventional medications and natural remedies.
#         Your role is to provide a preliminary analysis based on symptoms, followed by potential treatment options."""),
        
#         ("human", """ Symptoms: {symptoms} 
#         Please provide:
#          Suggest:
#            - 2-3 conventional medications or treatments
#            - 2-3 natural remedies or lifestyle modifications
        
#         Important Guidelines:
#         - Base your diagnosis on established medical knowledge
#         - Use evidence-based reasoning
#         - Clarify that medication suggestions are for informational purposes only
#         - Emphasize that this is a preliminary screening, not a definitive diagnosis
#         - Recommend consulting a healthcare professional before taking any medication
#         - Include common dosage ranges for medications where appropriate but emphasize they vary by individual
        
#         Output Format:
#            - Conventional treatments: [list medications]
#            - Natural remedies: [list natural treatments ]
#          Don't add ** to the result. Also don't give description at the beginning and end.  
#         """)
#     ])
    
#     chain = promptTemplate | llm | StrOutputParser()
#     return chain

# def process_input(input_data):
#     """Process input from either CLI or API request"""
#     try:
#         # Parse input data
#         try:
#             data = json.loads(input_data)
#             symptoms = data.get('symptoms', '')
#         except json.JSONDecodeError:
#             # If not JSON, treat as direct symptom input
#             symptoms = input_data
        
#         if not symptoms.strip():
#             return {"error": "Please enter valid symptoms."}
        
#         # Get diagnosis
#         diagnosis_chain = diagnose_symptoms()
#         result = diagnosis_chain.invoke({"symptoms": symptoms})
        
#         # Format response
#         response = {
#             "diagnosis": result,
            
#         }
        
#         return response
        
#     except Exception as e:
#         return {"error": f"An error occurred: {str(e)}"}

# def main():
#     """CLI entry point"""
#     print("Personalized Medicine")
#     print("-----------------------------------------------------------")
    
#     symptoms = input("Please describe your symptoms or diseases in detail: ")
    
#     if not symptoms.strip():
#         print("Please enter valid symptoms.")
#         return
    
#     print("Symptoms given:", symptoms)
#     print("\nAnalyzing symptoms... Please wait.\n")
    
#     try:
#         # Process as direct input
#         response = process_input(symptoms)
        
#         if "error" in response:
#             print(response["error"])
#         else:
#             print("Preliminary Diagnostic Analysis & Treatment Options:")
#             print("-" * 50)
#             print(response["diagnosis"])
#             print("\n" + response["warning"])
    
#     except Exception as e:
#         print(f"An error occurred: {e}")

# if __name__ == "__main__":
#     # Check if this is being called from CLI or via stdin (from Node.js)
#     if len(sys.argv) > 1 and sys.argv[1] == "--api":
#         # API mode - read from stdin
#         input_data = sys.stdin.read().strip()
#         result = process_input(input_data)
#         print(json.dumps(result))
#     else:
#         # CLI mode
#         main()



# personalizedMed.py - Modified to work as API with Node.js
from dotenv import load_dotenv
load_dotenv()
from langchain_groq import ChatGroq
import os
import json
import sys

# Initialize the LLM
try:
    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0.7,
        api_key=os.getenv('GROQ_API_KEY'),
    )
except Exception as e:
    print(json.dumps({"error": f"Failed to initialize Groq LLM: {str(e)}"}))
    sys.exit(1)

from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

def diagnose_symptoms():
    # Enhanced prompt template with medicine suggestions
    promptTemplate = ChatPromptTemplate([
        ("system", """You are a professional medical diagnostic assistant with knowledge of both conventional medications and natural remedies.
        Your role is to provide a preliminary analysis based on symptoms, followed by potential treatment options."""),
        
        ("human", """ Symptoms: {symptoms} 
        Please provide:
         Suggest:
           - 2-3 conventional medications or treatments
           - 2-3 natural remedies or lifestyle modifications
        
        Important Guidelines:
        - Base your diagnosis on established medical knowledge
        - Use evidence-based reasoning
        - Clarify that medication suggestions are for informational purposes only
        - Emphasize that this is a preliminary screening, not a definitive diagnosis
        - Recommend consulting a healthcare professional before taking any medication
        - Include common dosage ranges for medications where appropriate but emphasize they vary by individual
        
        Output Format:
           - Conventional treatments: [list medications]
           - Natural remedies: [list natural treatments ]
         Don't add ** to the result. Also don't give description at the beginning and end.  
        """)
    ])
    
    chain = promptTemplate | llm | StrOutputParser()
    return chain

def process_input(input_data):
    """Process input from either CLI or API request"""
    try:
        # Parse input data
        try:
            data = json.loads(input_data)
            symptoms = data.get('symptoms', '')
        except json.JSONDecodeError:
            # If not JSON, treat as direct symptom input
            symptoms = input_data
        
        if not symptoms.strip():
            return {"error": "Please enter valid symptoms."}
        
        # Get diagnosis
        diagnosis_chain = diagnose_symptoms()
        result = diagnosis_chain.invoke({"symptoms": symptoms})
        
        # Format response
        response = {
            "diagnosis": result,
            "warning": "IMPORTANT: This is a preliminary analysis only. Please consult with a healthcare professional before taking any medication or treatment."
        }
        
        return response
        
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

def main():
    """CLI entry point"""
    print("Personalized Medicine")
    print("-----------------------------------------------------------")
    
    symptoms = input("Please describe your symptoms or diseases in detail: ")
    
    if not symptoms.strip():
        print("Please enter valid symptoms.")
        return
    
    print("Symptoms given:", symptoms)
    print("\nAnalyzing symptoms... Please wait.\n")
    
    try:
        # Process as direct input
        response = process_input(symptoms)
        
        if "error" in response:
            print(response["error"])
        else:
            print("Preliminary Diagnostic Analysis & Treatment Options:")
            print("-" * 50)
            print(response["diagnosis"])
            print("\n" + response["warning"])
    
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Check if this is being called from CLI or via stdin (from Node.js)
    if len(sys.argv) > 1 and sys.argv[1] == "--api":
        try:
            # API mode - read from stdin
            input_data = sys.stdin.read().strip()
            result = process_input(input_data)
            print(json.dumps(result))
        except Exception as e:
            print(json.dumps({"error": f"API mode error: {str(e)}"}))
            sys.exit(1)
    else:
        # CLI mode
        main()