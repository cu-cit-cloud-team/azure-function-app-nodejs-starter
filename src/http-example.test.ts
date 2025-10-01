import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { httpExampleHandler } from './http-example.js';
import { createMockContext } from './lib/test-helpers.js';
import * as utils from './lib/utils.js';

describe('httpExampleHandler', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns 200 and body with joke when fetch succeeds', async () => {
    const fakeJoke = 'Why did the scarecrow win an award? He was outstanding in his field!';

    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({ id: '123', joke: fakeJoke, status: 200 }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const context = createMockContext({ invocationId: 'test-1' });

    const result = await httpExampleHandler(null, context);

    expect(result.status).toBe(200);
    expect(result.body).toBe(JSON.stringify({ joke: fakeJoke }));
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it('calls handleError and returns 500 when fetch throws', async () => {
    const error = new Error('Network failure');
    const mockFetch = vi.fn().mockRejectedValue(error);
    vi.stubGlobal('fetch', mockFetch);

    const handleErrorSpy = vi.spyOn(utils, 'handleError').mockImplementation(() => {});

    const context = createMockContext({ invocationId: 'test-2' });

    const result = await httpExampleHandler(null, context);

    expect(handleErrorSpy).toHaveBeenCalledOnce();
    expect(handleErrorSpy).toHaveBeenCalledWith(error, context);
    expect(result.status).toBe(500);

    const parsed = JSON.parse(result.body);
    expect(parsed.status).toBe(500);
    expect(parsed).toHaveProperty('error');
    // Error objects serialize to empty objects in JSON, so just verify it exists
    expect(parsed.error).toBeDefined();

    handleErrorSpy.mockRestore();
  });
});
