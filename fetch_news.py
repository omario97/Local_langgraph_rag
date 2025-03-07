from ib_insync import *
import time

def ib_connect():
    ib = IB()
    ib.connect('127.0.0.1', 7496, clientId=1)
    time.sleep(1)
    print("Connected to Interactive Brokers")
    return ib

def fetch_news_code(ib: IB):
    '''
    example from api: client.reqHistoricalNews(12003, 8314, "BZ+FLY", "", "", 10, null);
    get the BZ etc.. from our brokerer
    '''
    news_providers = ib.reqNewsProviders()
    print(news_providers)
    codes = '+'.join(news_provider.code for news_provider in news_providers)
    print(codes)
    return codes


def fetch_news_and_save(ib: IB, ticker ,codes: str):
    stock = Stock(ticker, 'SMART', 'USD')
    ib.qualifyContracts(stock)
    headlines = ib.reqHistoricalNews(stock.conId, codes, '', '', 100)
    #print(headlines)
    ib.sleep(2)  # Wait for data to arrive


    for headline in headlines:
        article_date = headline.time.date()
        article = ib.reqNewsArticle(headline.providerCode, headline.articleId)

        article_filename = f"articles/{article_date}-{ticker}-{headline.articleId}.html"

        with open(article_filename, 'w') as f:
            f.write(article.articleText)



if __name__ == "__main__":
    ib = ib_connect()
    fetch_news_code(ib)
    fetch_news_and_save(ib, 'TSLA', fetch_news_code(ib))