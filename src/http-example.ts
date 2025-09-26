import {
  app,
  type HttpRequest,
  type InvocationContext,
} from '@azure/functions';
import { handleError } from './lib/utils.js';

export type JokeResponse = {
  id: string;
  joke: string;
  status: number;
};

export type HttpExampleResponse = {
  status: number;
  body: string;
};

export type HttpExampleHandler = (
  request: HttpRequest,
  context: InvocationContext
) => Promise<HttpExampleResponse>;

// Export the handler so tests can import and exercise it directly
export const httpExampleHandler: HttpExampleHandler = async (
  // biome-ignore lint/correctness/noUnusedFunctionParameters: intentionally left in example
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpExampleResponse> => {
  try {
    const joke = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Azure Function App - HTTP Endpoint Demo',
      },
    })
      .then(async (response) => {
        const { joke } = (await response.json()) as JokeResponse;
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
};

// Register the handler with the Azure Functions app exactly as before
app.http('http-example', {
  methods: ['GET'],
  handler: httpExampleHandler,
});
