import type { InvocationContext } from '@azure/functions';

/**
 * isProd
 * @summary returns true if NODE_ENV is set to 'production'
 * @returns {boolean}
 */
export const isProd = () => process.env.NODE_ENV === 'production';

/**
 * handleError
 * @summary helper function for handling errors
 * @example handleError(error, context);
 * @param {Error} error
 * @param {?context} [context=null] Azure Function context
 * @returns {void}
 */
export const handleError = (
  error: unknown,
  context: InvocationContext | null = null
) => (context ? context.error(error) : console.error(error));
