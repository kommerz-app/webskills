# CLAUDE.md

- Angular Material components shall be used when ever possible
- Design concepts (e.g. floorplans) are taken from SAP Fiori design
- Avoid scss file when possible. We prefer tailwind.

## Coding Standards

1. Clean Code Principles (Robert C. Martin)

- Meaningful Names: Use clear, searchable, and pronounceable names for variables, functions, and classes. Avoid
  abbreviations and encodings.
- Small Functions: Functions should be small (ideally < 20 lines) and perform exactly one thing (Single Responsibility
  Principle).
- Command-Query Separation: Functions should either do something or answer something, but not both.
- Dry & Self-Documenting: Keep code DRY (Don't Repeat Yourself). Write code that explains its intent through naming and
  structure rather than comments.
- Minimal Arguments: Limit function parameters to 3 or fewer whenever possible.

2. Documentation Strategy

- Self-Explaining Code: Do NOT write redundant comments that restate what the code does.
- Document Only What is Necessary: Limit comments exclusively to "Why" decisions (e.g., non-obvious business rules,
  complex algorithms, or workaround justifications). Omit trivial docstrings.

3. Testing Protocol

- Specification: All unit and integration tests MUST follow the Given/When/Then structure (Arrange, Act, Assert).
- Business Behavior First: Tests must verify business requirements and functional behavior, never private implementation
  details.
- Structure: Explicitly separate the test setup (Given), execution (When), and assertions (Then) using clear block
  comments or naming conventions.
- Single Concept Per Test: Each test should test only one concept or scenario.
- All new features must be tested.
- All fixed bugs need a regression test.
- Use red/green TDD when fixing bugs.
