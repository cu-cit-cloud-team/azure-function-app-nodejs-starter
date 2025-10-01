# About

This is a TypeScript-based Azure Function App that serves as a proxy for Microsoft Teams webhooks. The app is designed to handle incoming webhook requests and forward them to the appropriate Teams team and channel as an AdaptiveCard message.

The project includes configurations for local development, linting, and testing (`tsconfig.json`, `biome.json`, `vitest.config.ts`, etc.).

The project uses npm as the package manager and includes a `package.json` file with all necessary dependencies and scripts.

## Code Style

The code style for this project follows standard TypeScript conventions. Please ensure that your code is well-formatted and adheres to the following guidelines:

- Use `camelCase` for variable and function names.
- Use `PascalCase` for class and interface names.
- Use `kebab-case` for file names.
- Use 2 spaces for indentation.
- Limit lines to a maximum of 80 characters.
- Use single quotes for strings.
- Always use semicolons at the end of statements.
- Use template literals for string interpolation.
- Use `const` for variables that are not reassigned and `let` for variables that are reassigned.
- Avoid using `any` type; prefer specific types or generics.

Code should be clean, readable, and maintainable. Abstract any reusable or complex logic into separate functions or modules. Please include comments where necessary to explain complex logic or decisions.

### File Structure

All Azure Functions code is located in root of the `./src` directory. Helper functions and utilities are located in the `./src/lib` directory and are named/organized according to their functionality.

Sometimes scratch files are used for testing out ideas or code snippets. These files are named `scratch-*.ts` and are located in the root of the `./src` directory.

When analyzing the codebase, only look at files that are in the `./src` directory unless a task requires otherwise. Ignore all files named `scratch-*.ts` when analyzing the codebase.

## Linting

Linting for this project is done using Biome (https://biomejs.dev/) and TypeScript (https://www.typescriptlang.org/).

The command to run linting is `npm run lint` (which will run both linters).

## Testing

Testing for this project is done using Vitest. You can find the Vitest documentation at https://vitest.dev/ or using the Context7 MCP Tools. The library ID for the Vitest docs at Context7 is vitest-dev/vitest and you can use the get-library-docs tool to search the docs. If you have any trouble accessing the docs, you can try using the resolve-library-id tool to make sure you have the correct library ID for Vitest and then use the get-library-docs tool again. If there are still issues, please let me know.

The command to run unit tests is `npm test` which runs `npx vitest run --coverage --silent` under the hood.

### File Structure

Tests should be placed adjacent to the files they are testing with a `.test.ts` suffix. For example, if you have a file named `example.ts`, the test file should be named `example.test.ts`.

### Writing Tests

When writing or refactoring tests:

- Use modern/current Vitest features and best practices.
- Aim for 100% test coverage, especially for critical and complex parts of the codebase.
- Please ensure that you cover both positive and negative scenarios.
- Use descriptive names for your test cases to clearly indicate what each test is verifying.
- Make use of Vitest's built-in matchers and utilities to create robust and maintainable tests.
- Be as straight forward as possible and avoid unnecessary complexity.
  - If you find that a test is becoming too complex, consider breaking it down into smaller, more focused tests.
- Tests should be self-contained and not rely on external services or state.
  - Use mocking and stubbing as necessary to isolate the code being tested.
- Make sure they are well typed, leveraging TypeScript's type system to catch potential issues at compile time.
- Document them well, with comments explaining the purpose of each test and any non-obvious logic.

Tests should be reviewed and updated as the codebase evolves to ensure they remain relevant and effective.



