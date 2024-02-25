from flask import Flask, json, jsonify, request
from pymongo import MongoClient
import requests
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

mongo_uri = os.getenv("MONGO_URI")

client = MongoClient(mongo_uri)
db = client.get_database("pymongo")
collection = db.get_collection("tweets")

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
RAPIDAPI_HOST = os.getenv("RAPIDAPI_HOST")

FIREWORKS_API_KEY = os.getenv("FIREWORKS_API_KEY")

def extract_text_from_tweet(tweet):
    return tweet.get('text', '')

def analyze_sentiment(tweets):
    text_to_analyze = "\n".join([tweet.get('text', '') for tweet in tweets])
    url = "https://api.fireworks.ai/inference/v1/chat/completions"
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {FIREWORKS_API_KEY}'
    }
    payload = {
        'model': 'accounts/fireworks/models/mixtral-8x7b-instruct',
        'max_tokens': 4096,
        'top_p': 1,
        'top_k': 40,
        'presence_penalty': 0,
        'frequency_penalty': 0,
        'temperature': 0.6,
        "messages": [
            {"role": "system", "content": "Preprocess the data, identify if it is noisy or not. Classify the sentiments of these tweets (Neutral, Negative, Positive), Nature of Feedback (feature request/ bug report/ general feedback etc.):"},
            {"role": "user", "content": text_to_analyze}
        ]
    }
    json_payload = json.dumps(payload)
    response = requests.post(url, headers=headers, data=json_payload)
    if response.status_code == 200:
        result = response.json()
        return result['choices'][0]['message']['content']
    else:
        return 'Failed to analyze sentiment'

def identify_feedback(tweet_texts):
    feedback_types = {
        'Feature Request': 0,
        'Bug Report': 0,
        'General Feedback': 0,
        'No Feedback': 0
    }
    for text in tweet_texts:
        if 'feature request' in text.lower():
            feedback_types['Feature Request'] += 1
        elif 'bug report' in text.lower():
            feedback_types['Bug Report'] += 1
        elif 'general feedback' in text.lower():
            feedback_types['General Feedback'] += 1
        else:
            feedback_types['No Feedback'] += 1
    return feedback_types

def identify_sentiment(bot_responses):
    sentiment_types = {
        'Positive': 0,
        'Neutral': 0,
        'Negative': 0
    }
    for response in bot_responses:
        sentiment = response.get('Sentiment', 'Neutral')
        sentiment_types[sentiment] += 1
    return sentiment_types

@app.route('/search', methods=['POST'])
def search_tweets():
    url = 'https://twitter154.p.rapidapi.com/search/search'
    headers = {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
    }
    data = request.json
    query = data.get('query', '') 
    limit = min(data.get('limit', 10), 100)  
    section = data.get('section', 'top')
    language = data.get('language', 'en')
    min_likes = data.get('min_likes', 0)
    min_retweets = data.get('min_retweets', 0)
    start_date = data.get('start_date', '2022-01-01')
    
    if query.startswith('#'):
        url = 'https://twitter154.p.rapidapi.com/hashtag/hashtag'
        payload = {
            'hashtag': query,
            'limit': limit,
            'section': section,
            'language': language
        }
    else:
        payload = {
            'query': query,
            'limit': limit,
            'section': section,
            'language': language,
            'min_likes': min_likes,
            'min_retweets': min_retweets,
            'start_date': start_date
        }

    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        tweets = response.json().get('results', [])
        bot_responses = []
        for tweet in tweets:
            sentiment = analyze_sentiment([tweet])
            bot_responses.append({'sentiment': sentiment})
        tweet_texts = [extract_text_from_tweet(tweet) for tweet in tweets]
        feedback = identify_feedback(tweet_texts)
        sentiment = identify_sentiment(bot_responses)
        collection.insert_one({
            'tweets': tweet_texts,
            'sentiment': sentiment,
            'feedback': feedback,
            'bot_responses': bot_responses
        })
        return jsonify({'tweets': tweet_texts, 'sentiment': sentiment, 'feedback': feedback})
    else:
        return jsonify({'error': 'Failed to fetch tweets'}), response.status_code

@app.route('/sentiment', methods=['GET'])
def get_sentiment():
    sentiments = collection.find({}, {'_id': 0, 'sentiment': 1})
    sentiment_list = [sentiment['sentiment'] for sentiment in sentiments]
    return jsonify(sentiment_list)

@app.route('/feedback', methods=['GET'])
def get_feedback():
    feedbacks = collection.find({}, {'_id': 0, 'feedback': 1})
    feedback_list = [feedback['feedback'] for feedback in feedbacks]
    return jsonify(feedback_list)

if __name__ == '__main__':
    app.run(debug=True)
