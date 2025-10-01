import { afterEach, describe, expect, it, vi } from 'vitest';

import { createMockContext } from './test-helpers.js';
import {
  handleError,
  isProd,
  isTest,
} from './utils.js';

describe('utils', () => {
  describe('isProd', () => {
    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it.each([
      ['production', true],
      ['development', false],
      ['test', false],
      ['', false],
      [undefined, false],
    ])('returns %s when NODE_ENV is "%s"', (nodeEnv, expected) => {
      if (nodeEnv !== undefined) {
        vi.stubEnv('NODE_ENV', nodeEnv);
      }
      expect(isProd()).toBe(expected);
    });
  });

  describe('isTest', () => {
    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it.each([
      ['1', 'true', true, 'both environment variables are set'],
      ['', 'true', false, 'VITEST is empty'],
      ['1', '', false, 'VITEST_MODE is empty'],
      ['', '', false, 'both variables are empty'],
    ])('returns %s when %s', (vitest, vitestMode, expected, _description) => {
      vi.stubEnv('VITEST', vitest);
      vi.stubEnv('VITEST_MODE', vitestMode);
      expect(isTest()).toBe(expected);
    });
  });

  describe('handleError', () => {
    it('logs error to context.error when context is provided', () => {
      const error = new Error('test error');
      const context = createMockContext();

      handleError(error, context);

      expect(context.error).toHaveBeenCalledOnce();
      expect(context.error).toHaveBeenCalledWith(error);
    });

    it('logs error to console.error when context is null', () => {
      const error = new Error('console error');
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      handleError(error, null);

      expect(consoleSpy).toHaveBeenCalledOnce();
      expect(consoleSpy).toHaveBeenCalledWith(error);

      consoleSpy.mockRestore();
    });

    it('preserves the original error object', () => {
      const error = new Error('original error');
      error.stack = 'original stack trace';
      const context = createMockContext();

      handleError(error, context);

      const calledError = (context.error as ReturnType<typeof vi.fn>).mock.calls[0][0] as Error;
      expect(calledError.message).toBe('original error');
      expect(calledError.stack).toBe('original stack trace');
    });
  });
});
