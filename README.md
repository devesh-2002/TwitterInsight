# TwitterInsight
TwitterInsight is a web application that provides insights and analysis on tweets fetched from Twitter's API. It allows users to search for tweets based on specific queries, analyze the sentiment of the retrieved tweets, identify different types of feedback, and ask questions to an AI assistant trained on the retrieved tweet data.

## Features
1. **Search Tweets**: Users can search for tweets based on keywords, hashtags, or specific criteria such as minimum likes and retweets, and start date.
2. **Sentiment Analysis**: TwitterInsight analyzes the sentiment of the fetched tweets using an AI model and categorizes them.
3. **Preprocessing and Clustering** : The documents are preprocessed and clustered using LLMs like Mistral-7b.
4. **Feedback Identification**: The application identifies different types of feedback (e.g., feature requests, bug reports, general feedback) from the tweets retrieved.
5. **Question Answering**: Users can ask questions related to the tweets fetched, and the application provides answers based on the context of the tweets.
6. **Snap-In** : Integration with Snap-Ins. This integration enhances the application's functionality by leveraging the features and capabilities of Snap-Ins. 


## Technologies Used
1. DevRev Platform 
2. Flask
3. Next.js 
4. Chart.js
5. MongoDB
6. OpenAI
7. Twitter API
8. RapidAPI
9. Fireworks.ai

## Setup Instructions
1. Fork and Clone the Repository.
2. In the devrev-snapin folder do :
```
npm install
npm run build
npm run package
```
3. In the flask folder :
On CMD
```
virtualenv env
env/Scripts/activate
pip install -r requirements.txt
python app.py
```
On Git Bash/Shell : 
```
virtualenv env
source env/Scrpits/activate
pip install -r requirements.txt
python app.py
```
4. Make sure to refer to .env.example, and create a .env and add environment variables in it accordingly.
5. In the frontend folder :
```
yarn
yarn dev
```
