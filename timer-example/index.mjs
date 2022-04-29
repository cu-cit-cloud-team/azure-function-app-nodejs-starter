import { handleError } from '../lib/helpers.js';

export default async (context, timerBinding) => {
  try {
    const timeStamp = new Date().toISOString();
    if (timerBinding.isPastDue) {
      context.log('[timer-example] Timer trigger is running behind');
    }
    context.log(`[timer-example] Azure Function ran at ${timeStamp}`);
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
