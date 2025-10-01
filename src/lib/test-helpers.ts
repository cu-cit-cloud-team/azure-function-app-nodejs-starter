import type { InvocationContext } from '@azure/functions';
import { vi } from 'vitest';

/**
 * Creates a mock InvocationContext for testing Azure Functions.
 * Provides type-safe mocks without needing 'as any' assertions.
 *
 * @param overrides - Optional properties to override default mock values
 * @returns A properly typed mock InvocationContext
 */
export function createMockContext(
  overrides: Partial<InvocationContext> = {}
): InvocationContext {
  return {
    invocationId: 'test-invocation-id',
    functionName: 'test-function',
    extraInputs: { get: vi.fn() },
    extraOutputs: { set: vi.fn() },
    retryContext: null,
    traceContext: {
      traceparent: 'test-traceparent',
      tracestate: 'test-tracestate',
      attributes: {},
    },
    triggerMetadata: {},
    options: {
      trigger: {
        name: 'test-trigger',
        type: 'httpTrigger',
      },
      return: null,
      extraInputs: [],
      extraOutputs: [],
    },
    log: vi.fn(),
    trace: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    ...overrides,
  } as InvocationContext;
}
