from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain_core.messages import HumanMessage, AIMessage
from langgraph.graph import StateGraph, START, END, add_messages
from langgraph.checkpoint.memory import MemorySaver
from typing import Annotated, TypedDict
from dotenv import load_dotenv
from datetime import datetime
import os

# Load environment variables
load_dotenv()

# Initialize models
embeddings = OpenAIEmbeddings()
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.0)

# Load the saved index
db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

# Define state for conversation memory
class State(TypedDict):
    messages: Annotated[list, add_messages]
    context: str
    query: str

def analyze_news(query: str, k: int = 3):
    """Search and analyze news articles with chronological context and persistent memory."""
    # Get relevant articles with scores
    docs = db.similarity_search_with_score(query, k=k)
    
    # Sort documents by date (newest first)
    def get_doc_timestamp(doc_with_score):
        doc, _ = doc_with_score
        return doc.metadata.get('timestamp', 0)
        
    sorted_docs = sorted(docs, key=get_doc_timestamp, reverse=True)
    
    # Prepare content for analysis with dates
    context_parts = []
    for doc, score in sorted_docs:
        date = doc.metadata.get('date', 'Unknown date')
        context_parts.append(f"[Date: {date}]\n{doc.page_content}")
    context = "\n\n".join(context_parts)
    

    
    def prepare_prompt(state: State):
        # Get current date for time awareness
        current_date = datetime.now().strftime("%Y-%m-%d")
        
        # Create analysis prompt with conversation history
        prompt_template = """
        You are a financial analyst and a professional who has worked in the industry 20+ years.
        Today's date is {current_date}.
        
        Analyze these news articles (ordered from newest to oldest) and provide trading insights:
        
        {context}
        
        Please provide:
        1. Latest developments (most recent first)
        2. Market impact of recent events
        3. Trading implications based on the trend
        
        Keep it concise and professional.
        """
        
        # Add the current query to the messages
        return {
            "messages": [HumanMessage(content=state["query"])],
            "context": state["context"],
            "query": state["query"]
        }
    
    def generate_response(state: State):
        # Combine all previous messages with the current context
        messages = state["messages"]
        context = state["context"]
        current_date = datetime.now().strftime("%Y-%m-%d")
        
        # Create the full prompt with context
        prompt = PromptTemplate.from_template("""
        You are a financial analyst and a professional who has worked in the industry 20+ years.
        Today's date is {current_date}.
        
        Analyze these news articles (ordered from newest to oldest) and provide trading insights:
        
        {context}
        
        Please provide:
        1. Latest developments (most recent first)
        2. Market impact of recent events
        3. Trading implications based on the trend
        
        Keep it concise and professional.
        
        Take into account any previous conversation context if relevant.
        """)
        
        # Get LLM analysis
        response = llm.invoke(prompt.format(context=context, current_date=current_date))
        
        # Return the AI response to be added to the conversation
        return {"messages": [AIMessage(content=response.content)]}
    

    # Setup the conversation graph with memory
    builder = StateGraph(State)

    # Build the graph
    builder.add_node("prepare_prompt", prepare_prompt)
    builder.add_node("generate_response", generate_response)
    builder.add_edge(START, "prepare_prompt")
    builder.add_edge("prepare_prompt", "generate_response")
    builder.add_edge("generate_response", END)
    
    # Compile with memory persistence
    graph = builder.compile(checkpointer=MemorySaver())
    
    # Configure thread with fixed ID
    thread_config = {"configurable": {"thread_id": "1"}}
    
    # Run with the current query and context
    result = graph.invoke({"messages": [], "context": context, "query": query}, thread_config)
    
    # Return the latest response
    return result["messages"][-1].content

if __name__ == "__main__":
    # Use a fixed thread ID for simplicity
    thread_id = "1"
    
    while True:
        query = input("\nEnter your search query (or 'exit' to quit): ")
        if query.lower() == 'exit':
            break
            
        analysis = analyze_news(query)
        print("\nAnalysis:")
        print(analysis)
