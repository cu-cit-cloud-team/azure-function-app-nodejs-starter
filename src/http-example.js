import { app } from '@azure/functions';
import axios from 'axios';

import { handleError } from '../lib/helpers.js';

app.http('http-example', {
  methods: ['GET'],
  handler: async (request, context) => {
    try {
      const joke = await axios
        .get('https://icanhazdadjoke.com/', {
          headers: {
            Accept: 'application/json',
            'User-Agent': 'Azure Function App - HTTP Endpoint Demo',
          },
        })
        .then((response) => {
          const { joke } = response.data;
          return joke;
        })
        .catch((error) => {
          // bubble error up to try/catch so it throws 500
          throw error;
        });
      return {
        status: 200,
        body: JSON.stringify({
          joke,
        }),
      };
    } catch (error) {
      handleError(error, context);
      return {
        status: 500,
        body: JSON.stringify({
          status: 500,
          error,
        }),
      };
    }
  },
});
