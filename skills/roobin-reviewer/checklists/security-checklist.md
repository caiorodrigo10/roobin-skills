# Security Checklist

> 8-point security vulnerability scan for code review

## 1. Injection Vulnerabilities

- [ ] **SQL Injection** - No raw SQL with user input
  - Use parameterized queries / prepared statements
  - Use ORM methods instead of raw queries
  - Validate and sanitize all inputs

- [ ] **Command Injection** - No shell commands with user input
  - Avoid `exec()`, `eval()`, `system()`
  - If necessary, use allowlists for commands

- [ ] **NoSQL Injection** - No unsanitized queries
  - Validate object structures
  - Use schema validation

## 2. Cross-Site Scripting (XSS)

- [ ] **Stored XSS** - User content is escaped before storage
- [ ] **Reflected XSS** - URL parameters are sanitized
- [ ] **DOM XSS** - `innerHTML` and `dangerouslySetInnerHTML` avoided
  - Use text content instead
  - If HTML needed, sanitize with DOMPurify or similar

## 3. Authentication

- [ ] Passwords hashed with bcrypt/argon2 (not MD5/SHA1)
- [ ] Session tokens are cryptographically secure
- [ ] No credentials in URL parameters
- [ ] Logout invalidates session properly
- [ ] Rate limiting on login endpoints

## 4. Authorization

- [ ] Every endpoint checks user permissions
- [ ] Object-level authorization (can't access other users' data)
- [ ] Admin functions properly protected
- [ ] No privilege escalation paths

## 5. Sensitive Data Exposure

- [ ] **Hardcoded Secrets** - No API keys, passwords in code
  - Use environment variables
  - Use secret managers

- [ ] **Logs** - No sensitive data logged
  - Filter passwords, tokens, PII
  - Mask credit card numbers

- [ ] **Error Messages** - Don't expose internal details
  - Generic errors for users
  - Detailed logs server-side only

## 6. Insecure Dependencies

- [ ] No known vulnerable packages (`npm audit`)
- [ ] Dependencies are up to date
- [ ] Lock files committed (package-lock.json)

## 7. Transport Security

- [ ] HTTPS enforced
- [ ] Cookies have Secure flag
- [ ] HSTS headers present
- [ ] No mixed content

## 8. Input Validation

- [ ] All user input validated at boundary
- [ ] File uploads validated (type, size, content)
- [ ] Request size limits in place
- [ ] JSON schema validation where appropriate

---

## Severity Classification

| Finding | Severity | Score Impact |
|---------|----------|--------------|
| SQL/Command Injection | Critical | -20 |
| XSS vulnerability | Critical | -20 |
| Hardcoded secrets | Critical | -20 |
| Missing auth check | Major | -10 |
| Missing input validation | Major | -10 |
| Outdated dependency (critical vuln) | Major | -10 |
| Missing HTTPS | Minor | -5 |
| Weak password hashing | Critical | -20 |

---

## Quick Commands

```bash
# Check for hardcoded secrets
grep -rn "password\|secret\|api_key\|token" --include="*.ts" --include="*.tsx"

# Check npm vulnerabilities
npm audit

# Check for dangerous patterns
grep -rn "eval\|exec\|innerHTML\|dangerouslySetInnerHTML" --include="*.ts" --include="*.tsx"
```

---

*Part of roobin-reviewer security analysis*
