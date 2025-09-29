import { afterEach, describe, expect, it, vi } from 'vitest';

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

    it('returns true if NODE_ENV is production', () => {
      vi.stubEnv('NODE_ENV', 'production');
      expect(isProd()).toBe(true);
    });

    it('returns false if NODE_ENV is not production', () => {
      vi.stubEnv('NODE_ENV', 'development');
      expect(isProd()).toBe(false);
    });

    it('returns false if NODE_ENV is empty or undefined', () => {
      vi.stubEnv('NODE_ENV', '');
      expect(isProd()).toBe(false);
    });
  });

  describe('isTest', () => {
    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it('returns true when VITEST and VITEST_MODE are set', () => {
      vi.stubEnv('VITEST', '1');
      vi.stubEnv('VITEST_MODE', 'true');
      expect(isTest()).toBe(true);
    });

    it('returns false when either variable is missing', () => {
      vi.stubEnv('VITEST', '');
      vi.stubEnv('VITEST_MODE', 'true');
      expect(isTest()).toBe(false);

      vi.stubEnv('VITEST', '1');
      vi.stubEnv('VITEST_MODE', '');
      expect(isTest()).toBe(false);
    });

    it('returns false when both variables are falsy', () => {
      vi.stubEnv('VITEST', '');
      vi.stubEnv('VITEST_MODE', '');
      expect(isTest()).toBe(false);
    });
  });

  describe('handleError', () => {
    it('logs error to context.error if context is provided', () => {
      const error = new Error('test error');
      const context: { error: (e: unknown) => void } = { error: vi.fn() };
      handleError(error, context);
      expect(context.error).toHaveBeenCalledWith(error);
    });
    it('logs error to console.error if context is not provided', () => {
      const error = new Error('console error');
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      handleError(error, null);
      expect(spy).toHaveBeenCalledWith(error);
      spy.mockRestore();
    });
  });
});
