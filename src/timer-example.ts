import { app, type InvocationContext } from '@azure/functions';

import { handleError } from './lib/utils.js';

export type TimerBinding = { isPastDue?: boolean };

export type TimerExampleResult = { status: number; body: string } | undefined;

export type TimerExampleHandler = (
  timerBinding: TimerBinding,
  context: InvocationContext
) => Promise<TimerExampleResult>;

// Export the handler so tests can import and exercise it directly
export const timerExampleHandler: TimerExampleHandler = async (
  timerBinding,
  context
) => {
  try {
    const timeStamp = new Date().toISOString();
    if (timerBinding?.isPastDue) {
      context.log('[timer-example] Timer trigger is running behind');
    }
    context.log(
      `[timer-example] Azure Function "Timer Trigger" ran at ${timeStamp}`
    );
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

// Register the handler preserving original configuration
app.timer('timer-example', {
  handler: timerExampleHandler,
  useMonitor: false,
  runOnStartup: true,
  // schedule: '0 */1 * * * *', // every minute
  schedule: '0 0 */6 * * *', // every 6 hours
});
