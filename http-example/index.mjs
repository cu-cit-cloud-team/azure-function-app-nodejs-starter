import axios from 'axios';

import { handleError } from '../lib/helpers.js';

// eslint-disable-next-line no-unused-vars
export default async (context, req) => {
  try {
    await axios
      .get('https://icanhazdadjoke.com/', {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Cloud Team Azure Function App - HTTP Endpoint',
        },
      })
      .then((response) => {
        context.res = {
          status: 200,
          body: JSON.stringify({ joke: `${response.data.joke}` }),
        };
      })
      .catch((error) => {
        // bubble error up to try/catch so it throws 500
        throw error;
      });
  } catch (error) {
    handleError(error, context);
    context.res = {
      status: 500,
      body: JSON.stringify({
        status: 500,
        error,
      }),
    };
  }
};
