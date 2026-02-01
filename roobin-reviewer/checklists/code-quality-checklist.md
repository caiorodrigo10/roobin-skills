# Code Quality Checklist

> Quick reference checklist for code quality review

## Security (Critical)

- [ ] No hardcoded secrets or credentials
- [ ] No SQL injection patterns
- [ ] No XSS vulnerabilities
- [ ] Input validation present at boundaries
- [ ] Proper authentication checks
- [ ] Proper authorization checks
- [ ] No sensitive data in logs

## Error Handling (Major)

- [ ] All async operations have try/catch
- [ ] Errors are logged appropriately
- [ ] User-facing errors are sanitized
- [ ] No swallowed exceptions
- [ ] Graceful degradation where appropriate

## Code Quality (Minor)

- [ ] Code follows project patterns
- [ ] No significant duplication
- [ ] Types are correct (TypeScript)
- [ ] No `any` or `as any` usage
- [ ] No non-null assertions (`!`)
- [ ] Naming follows conventions
- [ ] No magic numbers (use constants)
- [ ] No commented-out code

## Functionality (Major)

- [ ] Acceptance criteria met
- [ ] Edge cases handled
- [ ] No regressions introduced
- [ ] Business logic is correct
- [ ] State management is proper

## Tests (Major)

- [ ] Tests exist for new code
- [ ] Tests are passing
- [ ] Edge cases are tested
- [ ] Mocks/stubs are appropriate
- [ ] No console.log in tests

## Performance (Minor)

- [ ] No obvious N+1 queries
- [ ] No memory leaks
- [ ] No unnecessary re-renders (React)
- [ ] Efficient algorithms used
- [ ] Large data handled appropriately

## Maintainability (Minor)

- [ ] Code is extensible
- [ ] Dependencies are appropriate
- [ ] No unnecessary complexity
- [ ] Self-documenting code
- [ ] Complex logic has comments

---

## Quick Reference: Severity

| Severity | Points | Action |
|----------|--------|--------|
| Critical | -20 | Must fix before merge |
| Major | -10 | Should fix before merge |
| Minor | -5 | Can fix later |
| Suggestion | -2 | Nice to have |

---

*Use with ./data/scoring-rubric.yaml for full scoring details*
