import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { httpExampleHandler } from './http-example.js';
import * as utils from './lib/utils.js';

describe('httpExampleHandler (direct import)', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('returns 200 and body with joke when fetch succeeds', async () => {
    const fakeJoke = 'a test dad joke';

    globalThis.fetch = vi.fn(async () => ({
      json: async () => ({ id: '1', joke: fakeJoke, status: 200 }),
    })) as unknown as typeof fetch;

    const fakeContext = { invocationId: '1', error: vi.fn() };

    const result = await httpExampleHandler(null, fakeContext as any);

    expect(result).toEqual({ status: 200, body: JSON.stringify({ joke: fakeJoke }) });
  });

  it('calls handleError and returns 500 when fetch throws', async () => {
    const err = new Error('boom');
    globalThis.fetch = vi.fn(async () => {
      throw err;
    }) as unknown as typeof fetch;

    const handleSpy = vi.spyOn(utils, 'handleError').mockImplementation(() => {});

    const fakeContext = { invocationId: '2', error: vi.fn() };

    const result = await httpExampleHandler(null, fakeContext as any);

    expect(handleSpy).toHaveBeenCalledWith(err, fakeContext);

    const parsed = JSON.parse(result.body);
    expect(result.status).toBe(500);
    expect(parsed.status).toBe(500);
    expect(Object.prototype.hasOwnProperty.call(parsed, 'error')).toBe(true);
  });
});
