import { describe, it, expect, vi, beforeEach } from 'vitest';

import { timerExampleHandler, type TimerBinding } from './timer-example.js';
import { createMockContext } from './lib/test-helpers.js';
import * as utils from './lib/utils.js';

describe('timerExampleHandler', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('logs run message when isPastDue is false', async () => {
    const context = createMockContext();
    const binding: TimerBinding = { isPastDue: false };

    const result = await timerExampleHandler(binding, context);

    expect(context.log).toHaveBeenCalledOnce();
    expect(context.log).toHaveBeenCalledWith(expect.stringContaining('[timer-example] Azure Function "Timer Trigger" ran at'));
    expect(result).toBeUndefined();
  });

  it('logs run message when isPastDue is undefined', async () => {
    const context = createMockContext();
    const binding: TimerBinding = {};

    const result = await timerExampleHandler(binding, context);

    expect(context.log).toHaveBeenCalledOnce();
    expect(context.log).toHaveBeenCalledWith(expect.stringContaining('[timer-example] Azure Function "Timer Trigger" ran at'));
    expect(result).toBeUndefined();
  });

  it('logs past due message and run message when isPastDue is true', async () => {
    const context = createMockContext();
    const binding: TimerBinding = { isPastDue: true };

    const result = await timerExampleHandler(binding, context);

    expect(context.log).toHaveBeenCalledTimes(2);
    expect(context.log).toHaveBeenNthCalledWith(1, '[timer-example] Timer trigger is running behind');
    expect(context.log).toHaveBeenNthCalledWith(2, expect.stringContaining('[timer-example] Azure Function "Timer Trigger" ran at'));
    expect(result).toBeUndefined();
  });

  it('calls handleError and returns 500 when an error is thrown', async () => {
    const error = new Error('Unexpected error in timer handler');
    const context = createMockContext({
      log: vi.fn(() => {
        throw error;
      }),
    });
    const binding: TimerBinding = {};

    const handleErrorSpy = vi.spyOn(utils, 'handleError').mockImplementation(() => {});

    const result = await timerExampleHandler(binding, context);

    expect(handleErrorSpy).toHaveBeenCalledOnce();
    expect(handleErrorSpy).toHaveBeenCalledWith(error, context);
    expect(result).toEqual({
      status: 500,
      body: expect.stringContaining('"status":500'),
    });

    const parsed = JSON.parse(result.body);
    expect(parsed.status).toBe(500);
    // Error objects serialize to empty objects in JSON, so just verify it exists
    expect(parsed).toHaveProperty('error');
    expect(parsed.error).toBeDefined();

    handleErrorSpy.mockRestore();
  });
});
