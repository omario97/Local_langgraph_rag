from langchain_community.document_loaders import DirectoryLoader, BSHTMLLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv
from pathlib import Path
import re
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize embeddings
embeddings = OpenAIEmbeddings()

# Load all HTML files from articles directory
loader = DirectoryLoader('./articles', glob="*.html", loader_cls=BSHTMLLoader)
documents = loader.load()

# Add metadata with dates
for doc in documents:
    filename = Path(doc.metadata['source']).name
    # Extract date from filename (format: 2025-03-03-TSLA-DJ...)
    date_match = re.match(r'(\d{4}-\d{2}-\d{2})', filename)
    if date_match:
        doc.metadata['date'] = date_match.group(1)
        doc.metadata['timestamp'] = datetime.strptime(date_match.group(1), '%Y-%m-%d').timestamp()

# Split into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = text_splitter.split_documents(documents)

print(f"Loaded {len(documents)} documents")
print(f"Created {len(chunks)} chunks")

# Create vector store with metadata
db = FAISS.from_documents(chunks, embeddings)
# Save the vector store
db.save_local("faiss_index")
