import { app } from '@azure/functions';
import { handleError } from '../lib/helpers.js';

app.timer('timer-example', {
  runOnStartup: true,
  useMonitor: false,
  schedule: '0 */1 * * * *',
  handler: async (timerBinding, context) => {
    try {
      const timeStamp = new Date().toISOString();
      if (timerBinding.isPastDue) {
        context.log('[timer-example] Timer trigger is running behind');
      }
      context.log(`[timer-example] Azure Function ran at ${timeStamp}`);
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
