# openai_backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import openai
import os

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Store PDF content
pdf_content = ""

def load_pdf():
    """Load and extract text from PDF"""
    global pdf_content
    pdf_path = "July-Sanad-final-20250816220419.pdf"
    
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            pdf_content += page.extract_text() + "\n"
    
    # Limit content to fit in context
    pdf_content = pdf_content[:12000]  # Adjust based on model context

@app.route('/ask', methods=['POST'])
def ask_question():
    try:
        data = request.json
        question = data.get('question', '')
        
        if not question:
            return jsonify({"error": "No question provided"}), 400
        
        # Create prompt with context
        prompt = f"""
        নিচে 'জুলাই জাতীয় সনদ ২০২৫' নথির কিছু অংশ দেওয়া হলো:
        
        {pdf_content[:8000]}
        
        প্রশ্ন: {question}
        
        দয়া করে নথির উপর ভিত্তি করে উত্তর দিন। যদি উত্তর নথিতে না থাকে, দয়া করে বলুন "এই তথ্য নথিতে নেই"।
        উত্তরটি বাংলায় দিন।
        """
        
        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "আপনি 'জুলাই জাতীয় সনদ ২০২৫' নথি সম্পর্কিত বিশেষজ্ঞ। বাংলায় উত্তর দিন।"},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=500
        )
        
        answer = response.choices[0].message.content
        
        return jsonify({
            "answer": answer,
            "sources": ["জুলাই জাতীয় সনদ ২০২৫ নথি থেকে"],
            "confidence": "high"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Loading PDF...")
    load_pdf()
    print("PDF loaded successfully!")
    app.run(debug=True, port=5000)