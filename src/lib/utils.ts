import type { InvocationContext } from '@azure/functions';

/**
 * Checks if the current environment is production.
 */
export const isProd = (): boolean => process.env.NODE_ENV === 'production';

/**
 * Checks to see if vitest is running the code.
 */
export const isTest = (): boolean =>
  Boolean(process.env.VITEST) && Boolean(process.env.VITEST_MODE);

/**
 * Handles errors by logging them to the provided context or console.
 */
export const handleError = (
  error: unknown,
  context: InvocationContext | null = null
): void => (context ? context.error(error) : console.error(error));
