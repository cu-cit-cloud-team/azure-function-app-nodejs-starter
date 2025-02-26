import { app } from '@azure/functions';

import { handleError } from '../lib/helpers.js';

app.http('http-example', {
  methods: ['GET'],
  handler: async (request, context) => {
    try {
      const joke = await fetch('https://icanhazdadjoke.com/', {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Azure Function App - HTTP Endpoint Demo',
        },
      })
        .then(async (response) => {
          const { joke } = await response.json();
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
