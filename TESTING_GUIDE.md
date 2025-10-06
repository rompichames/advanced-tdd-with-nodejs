# Testing Guide (Jest)

## TL;DR
- Unit tests: fast, deterministic, no I/O, live in tests/unit/**.
- Integration tests: exercise adapters/boundaries, live in tests/integration/**.
- Use Arrange-Act-Assert (AAA), one behavior per test, clear names.
- Cover success, boundary, and failure. Prefer fakes over mocks.

## Unit tests (tests/unit/**)
- Test public API of entities/value objects/services; avoid testing internals.
- Arrange-Act-Assert. One main expectation per test; related follow-ups allowed.
- Ensure determinism. Avoid timers and randomness; inject or fix inputs instead.
- Prefer custom builders/factories for setup to reduce duplication.

## Integration tests (tests/integration/**)
- Validate real behavior of repositories/adapters against interfaces.
- Use real infrastructure where feasible (e.g., containers) or faithful fakes.
- Keep isolation: unique resources per test, clean up after.

## Naming and structure
- Describe: suite per unit/feature. test/it: human-readable behavior statements.
- Example: "updateEmail() returns a new User with updated email and timestamp".
- Co-locate helpers/builders under tests/** if they are test-only.

## Mocking policy
- Mock only external boundaries (network, filesystem, clock) or expensive resources.
- Prefer fakes/stubs over deep mocks. Keep assertions about observable behavior.
- Verify error paths: use toThrow/toThrowError with specific messages where appropriate.

## Assertions and value objects
- Use value object equality methods when provided (e.g., equals) rather than deep equals.
- For timestamps, compare numeric getTime() or ISO strings.

## Coverage and quality
- Keep meaningful coverage; avoid chasing 100% if it adds brittle tests.
- Always include boundary cases (min/max lengths, empty values, invalid formats).
- Avoid snapshot tests unless for stable, structured output.

## Tooling
- Run tests with npm test.
- Use jest.useFakeTimers only when necessary and restore timers after the test.
- Use beforeAll/afterAll for expensive setup/teardown; prefer beforeEach/afterEach for isolation.

## PR checklist for tests
- Tests fail without the change and pass with it.
- Clear names, minimal fixtures, no hidden dependencies.
- Unit tests for domain changes; integration tests when infra or boundaries change.


# BDD Testing Guide (Cucumber)

## TL;DR
- BDD tests: stakeholder communication, acceptance criteria, user behavior validation.
- Use Gherkin syntax, natural language, and step definitions.
- Use BDD for acceptance criteria, user journeys, and cross-cutting concerns.
- Use step definitions to bridge Gherkin scenarios to actual domain code.

## BDD tests (tests/bdd/**)
- Write executable specifications using Gherkin syntax in .feature files.
- Focus on business behavior and user stories, not implementation details.
- Use natural language that stakeholders can understand and validate.
- Step definitions bridge Gherkin scenarios to actual domain code.

## BDD structure and purpose
- Feature files (tests/bdd/features/**): Business-readable scenarios in Gherkin.
- Step definitions (tests/bdd/steps/**): TypeScript implementations of Gherkin steps.
- Support files (tests/bdd/support/**): Setup, hooks, and shared utilities.
- Use BDD for acceptance criteria, user journeys, and cross-cutting concerns.

## Writing effective BDD scenarios
- Start with "Feature" describing business capability, not technical implementation.
- Write scenarios as "Given-When-Then" focusing on observable behavior.
- Use "Background" for common setup across scenarios in a feature.
- Prefer "Scenario Outline" with examples for data-driven tests.
- Keep scenarios independent - no hidden dependencies between tests.

## Step definition best practices
- Write reusable steps that can be composed across different scenarios.
- Import and use actual domain entities/services, not mocks or stubs.
- Use descriptive parameter names and types for better maintainability.
- Group related steps in the same file (e.g., user-management.steps.ts).
- Prefer assertion messages that relate back to business requirements.

## BDD vs Unit/Integration testing
- BDD: Stakeholder communication, acceptance criteria, user behavior validation.
- Unit: Fast feedback on individual components, edge cases, algorithmic logic.  
- Integration: Adapter contracts, infrastructure concerns, boundary validation.
- Use all three: BDD for "what", Unit for "how", Integration for "works together".

Running BDD tests
- npm run test:bdd: Run all BDD scenarios with automatic TypeScript compilation.
- npm run test:bdd:report: Generate HTML reports for stakeholder review.
- npm run test:bdd:watch: Continuous testing during BDD development.
- BDD tests complement, don't replace, unit and integration test suites.
