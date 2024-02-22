import axios from 'axios';
import { client, publicSDK } from "@devrev/typescript-sdk";

const rapidApiKey = '9d6e6bf9ddmsh8422d38c504cb8fp1b8683jsn71ba8eefbe72';

export async function handleEvent(event: any, query: string) {
  const devrevPAT = event.context.secrets.service_account_token;
  const APIBase = event.execution_metadata.devrev_endpoint;
  const devrevSDK = client.setup({
    endpoint: APIBase,
    token: devrevPAT,
  });

  try {
    const searchResponse = await axios.get('https://twitter154.p.rapidapi.com/search/search', {
      params: {
        query: query,
        limit: 5,
        section: "top",
        language: "en",
        min_likes: 0,
        min_retweets: 0,
        start_date: "2022-01-01"
      },
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'twitter154.p.rapidapi.com'
      }
    });

    const searchResponseData = searchResponse.data;
    console.log('Search Response Data:', searchResponseData);

    const tweets = searchResponseData.results;
    if (!Array.isArray(tweets)) {
      console.log('No tweets found.');
      return;
    }
  } catch (error) {
    console.error('Error handling event:', error);
    throw error;
  }
}

export const run = async (events: any[]) => {
  for (let event of events) {
    // Example usage: Pass the query 'YOUR_SEARCH_QUERY' as a parameter
    await handleEvent(event, '#python');
  }
};

export default run;
