# AGENTS.md

This document defines the guidelines and commands for agentic coding agents operating in this repository.

## Build & Lint Commands

- `npm run build` - Build the project
- `npm run lint` - Run linter (ESLint)
- `npm run test:unit` - Run a single unit test (use `npm run test:unit -- <test-file>`)
- `npm run test:unit:all` - Run all unit tests
- `npm run test:ci` - Run tests for CI pipeline (includes coverage)

## Code Style Guidelines

### Imports

- Alphabetical order (by module name)
- Single-line imports for each module (no multi-line)
- No wildcard imports
- Imports grouped by type (e.g., standard library, third-party, project)

### Formatting

- 2-space indentation
- 80-character line width (maximum)
- No trailing whitespace
- Space after opening parenthesis (e.g., `function(a) { ... }`)
- Consistent spacing around operators (e.g., `a + b`)

### Types

- TypeScript interfaces for data structures
- Strict typing (e.g., `strict: true` in tsconfig.json)
- Type annotations for all function parameters and return values
- Avoid type assertions (use `as` only for necessary cases)

### Naming Conventions

- Variables: camelCase
- Functions: camelCase
- Classes: PascalCase
- Interfaces: PascalCase
- Enums: PascalCase
- Type aliases: PascalCase

### Error Handling

- Use try/catch for async operations
- Log errors with context (e.g., `console.error('Error:', error.message)`)
- Avoid silent failures
- Critical errors should throw exceptions with clear messages

## Cursor Rules

- Cursor rules are defined in `.cursor/rules/`
- Update rules with `npm run cursor:revalidate` after changes
- Cursor uses the following rules: [link to rules]

## Copilot Rules

- Copilot instructions are defined in `.github/copilot-instructions.md`
- Update rules with `git add .github/copilot-instructions.md` and commit
- Copilot uses the following rules: [link to instructions]

## Testing Best Practices

- Write tests for all new features
- Test edge cases (empty inputs, invalid data)
- Use mock data for tests
- Test both positive and negative cases
- Run tests in parallel where possible

## Example: Running a Single Test

```bash
npx ts-node src/tests/user.test.ts
```

## Common Mistakes

1. Skipping `npm run lint` before committing
2. Using `console.log` for debugging
3. Not handling async errors
4. Using wildcard imports
5. Missing type annotations

## Verification Steps

1. Run `npm run lint` to check style
2. Run `npm run test:unit` to verify tests
3. Run `npm run build` to ensure build succeeds
4. Check coverage with `npm run coverage`
