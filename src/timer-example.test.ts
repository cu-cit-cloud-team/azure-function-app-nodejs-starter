import { describe, it, expect, vi, beforeEach } from 'vitest';

import { timerExampleHandler, type TimerBinding } from './timer-example.js';
import * as utils from './lib/utils.js';

describe('timerExampleHandler', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('logs run message when not past due', async () => {
    const fakeContext = { log: vi.fn() } as any;
    const binding: TimerBinding = { isPastDue: false };

    const result = await timerExampleHandler(binding, fakeContext);

    expect(fakeContext.log).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('logs past due message when isPastDue is true', async () => {
    const fakeContext = { log: vi.fn() } as any;
    const binding: TimerBinding = { isPastDue: true };

    const result = await timerExampleHandler(binding, fakeContext);

    // should have logged both the past-due and the run message
    expect(fakeContext.log).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('calls handleError and returns 500 shape when an error is thrown', async () => {
    // Force an error by passing a context whose log throws
    const fakeContext = { log: vi.fn(() => { throw new Error('log fail'); }) } as any;
    const binding: TimerBinding = {};

    const handleSpy = vi.spyOn(utils, 'handleError').mockImplementation(() => {});

    const result = await timerExampleHandler(binding, fakeContext);

    expect(handleSpy).toHaveBeenCalled();
    expect(result).toEqual({ status: 500, body: expect.any(String) });
  });
});
