from flask import Flask, json, jsonify, request
import requests

app = Flask(__name__)
import openai
OPENAI_API_KEY="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"
openai.api_key=OPENAI_API_KEY
print(openai.api_key)

RAPIDAPI_KEY = '9d6e6bf9ddmsh8422d38c504cb8fp1b8683jsn71ba8eefbe72'
RAPIDAPI_HOST = 'twitter154.p.rapidapi.com'

def extract_text_from_tweet(tweet):
    return tweet.get('text', '')

def analyze_sentiment(tweets):
    text_to_analyze = "\n".join([tweet.get('text', '') for tweet in tweets])
    url = "https://api.fireworks.ai/inference/v1/chat/completions"
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer dIbW2IMpPWB1kguO7XzcFASRQVoyW9GSjZHU36UFvqMCOP0H'
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
        {"role": "system", "content": "Preprocess the data, identify if it is noisy or not. Classify the sentiments of these tweets, Nature of Feedback (feature request/ bug report/ general feedback etc.):"},
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
    

@app.route('/search', methods=['POST'])
def search_tweets():
    url = 'https://twitter154.p.rapidapi.com/search/search'
    headers = {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
    }
    data = request.json
    query = data.get('query', '')  # Get query (optional)
    limit = min(data.get('limit', 10), 100)  # Get limit with max value of 100
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
        print(analyze_sentiment(tweets))
        return jsonify([extract_text_from_tweet(tweet) for tweet in tweets])
    else:
        return jsonify({'error': 'Failed to fetch tweets'}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)

