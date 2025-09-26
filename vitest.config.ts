import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.test.ts', 'src/**/__tests__/**/*.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: [
        '**/.devcontainer/**',
        '**/.github/**',
        '**/.history/**',
        '**/.vscode/**',
        '**/coverage/**',
        '**/dist/**',
        '**/node_modules/**',
        '**/types/**',
        './**/vitest.config.ts',
      ],
    },
  },
});
