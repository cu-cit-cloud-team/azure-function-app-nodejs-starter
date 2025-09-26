import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  buildAdaptiveCard,
  handleError,
  isProd,
  isTest,
  isValidAdaptiveCard,
} from './utils.js';

describe('utils', () => {
  describe('isProd', () => {
    const originalEnv = process.env.NODE_ENV;
    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });
    it('returns true if NODE_ENV is production', () => {
      process.env.NODE_ENV = 'production';
      expect(isProd()).toBe(true);
    });
    it('returns false if NODE_ENV is not production', () => {
      process.env.NODE_ENV = 'development';
      expect(isProd()).toBe(false);
      process.env.NODE_ENV = '';
      expect(isProd()).toBe(false);
      delete process.env.NODE_ENV;
      expect(isProd()).toBe(false);
    });
  });

  describe('isTest', () => {
    const originalVITEST = process.env.VITEST;
    const originalVITEST_MODE = process.env.VITEST_MODE;
    afterEach(() => {
      process.env.VITEST = originalVITEST;
      process.env.VITEST_MODE = originalVITEST_MODE;
    });

    it('returns true when VITEST and VITEST_MODE are set', () => {
      process.env.VITEST = '1';
      process.env.VITEST_MODE = 'true';
      expect(isTest()).toBe(true);
    });

    it('returns false when either variable is missing', () => {
      delete process.env.VITEST;
      process.env.VITEST_MODE = 'true';
      expect(isTest()).toBe(false);

      process.env.VITEST = '1';
      delete process.env.VITEST_MODE;
      expect(isTest()).toBe(false);
    });

    it('returns false when both variables are falsy', () => {
      process.env.VITEST = '';
      process.env.VITEST_MODE = '';
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
