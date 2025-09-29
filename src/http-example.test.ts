import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { httpExampleHandler } from './http-example.js';
import * as utils from './lib/utils.js';

describe('httpExampleHandler (direct import)', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns 200 and body with joke when fetch succeeds', async () => {
    const fakeJoke = 'a test dad joke';

    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({ id: '1', joke: fakeJoke, status: 200 }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const fakeContext = { invocationId: '1', error: vi.fn() };

    const result = await httpExampleHandler(null, fakeContext as any);

    expect(result).toEqual({ status: 200, body: JSON.stringify({ joke: fakeJoke }) });
  });

  it('calls handleError and returns 500 when fetch throws', async () => {
    const err = new Error('boom');
    const mockFetch = vi.fn().mockRejectedValue(err);
    vi.stubGlobal('fetch', mockFetch);

    const handleSpy = vi.spyOn(utils, 'handleError').mockImplementation(() => {});

    const fakeContext = { invocationId: '2', error: vi.fn() };

    const result = await httpExampleHandler(null, fakeContext as any);

    expect(handleSpy).toHaveBeenCalledWith(err, fakeContext);
    expect(result.status).toBe(500);

    const parsed = JSON.parse(result.body);
    expect(parsed.status).toBe(500);
    expect(parsed).toHaveProperty('error');
  });
});
