## Usage

### Option 1: Direct Query (Without Vector Store)

For quick analysis without setting up the vector store, you can directly use the query script. This is recommended for simple queries or when you don't need historical context:

```bash
python query_news.py "Your question about recent financial news"
```

### Option 2: Full System with Vector Store

For advanced analysis with historical context and better retrieval capabilities:

1. Fetch latest news articles:
```bash
python fetch_news.py
```

2. Index articles into the vector store:
```bash
python index_articles.py
```

3. Run query and ask questions:
```bash
query.py
```



### Memory Persistence

The system uses LangGraph's MemorySaver for conversation persistence:
- Maintains context across multiple queries
- Uses a fixed thread ID ("1") for simplicity
- Enhances responses with time awareness
- Stores conversation history automatically

## Project Structure

- `fetch_news.py`: Retrieves articles from multiple news providers with rate limiting
- `index_articles.py`: Processes and stores articles in vector store
- `articles/`: Directory for storing fetched news articles
- `vector_store/`: FAISS index storage
- `query/`: Query (RAG) from vector store.  


## Contributing

Feel free to submit issues and pull requests.
