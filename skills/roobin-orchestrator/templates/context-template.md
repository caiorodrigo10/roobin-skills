# Context Template for Subagents

## Why Context Matters

**CRITICAL:** Subagents have ZERO conversation history. They start fresh with only:
1. Their skill instructions
2. The delegation prompt you provide
3. Access to tools (file system, MCP, etc.)

If you don't provide context, the subagent will:
- Not know what project they're working on
- Not understand existing patterns
- Make inconsistent decisions
- Waste tokens re-discovering information

## Minimal Context (Quick Tasks)

For simple, focused tasks:

```markdown
## Task
{one_line_description}

## File
{single_file_path}

## Change
{specific_change_needed}
```

## Standard Context (Most Tasks)

For typical implementation tasks:

```markdown
## Task
{task_description}

## Identifiers
- Task ID: {task_id}
- Project ID: {project_id}

## Files
- Modify: {files_to_change}
- Reference: {files_to_read}

## Patterns
- Component style: {component_pattern}
- State management: {state_pattern}
- API calls: {api_pattern}

## Constraints
- {constraint_1}
- {constraint_2}

## Success Criteria
- [ ] {criterion_1}
- [ ] {criterion_2}
```

## Full Context (Complex Tasks)

For tasks requiring deep understanding:

```markdown
## Task Overview
{detailed_description}

## Background
{why_this_task_exists}
{what_problem_it_solves}

## Identifiers
- Task ID: {task_id}
- Subtask IDs: {subtask_ids}
- Project ID: {project_id}

## Scope
### In Scope
- {in_scope_1}
- {in_scope_2}

### Out of Scope
- {out_scope_1}
- {out_scope_2}

## Files
### Primary (will be modified)
- {file_1}: {what_changes}
- {file_2}: {what_changes}

### Secondary (reference only)
- {ref_1}: {why_relevant}
- {ref_2}: {why_relevant}

## Architecture Context
{relevant_architecture_decisions}

## Existing Patterns
### Components
{component_patterns}

### State Management
{state_patterns}

### API Integration
{api_patterns}

## Dependencies
- External: {external_deps}
- Internal: {internal_deps}

## Constraints
- Technical: {tech_constraints}
- Business: {business_constraints}

## Success Criteria
- [ ] Functional: {functional_criteria}
- [ ] Quality: {quality_criteria}
- [ ] Performance: {perf_criteria}

## Edge Cases
- {edge_case_1}: {how_to_handle}
- {edge_case_2}: {how_to_handle}

## After Completion
- Status update: {next_status}
- Notification: {who_to_notify}
```

## Project-Specific Context (Roobin Web)

For Roobin Web tasks, always include:

```markdown
## Project Context
- Project: Roobin Web
- Project ID (Roobin MCP): 2d8b0db7-a0ca-4976-b526-b64442cc3831
- Supabase Project: sqkbqdwmxhsqspaiztgd

## Tech Stack
- Frontend: React 19 + TypeScript + Vite 7
- Backend: Hono 4.9
- State: React Context + TanStack Query 5
- UI: Radix UI + Tailwind CSS 4 + shadcn/ui

## Code Style
- No comments unless requested
- Avoid `any` and `as any`
- Never use non-null assertions (!)
- Use kebab-case for filenames
- Prefer non-default exports

## Verification Commands
- Type check: pnpm check:types
- Lint: pnpm lint
- Build: pnpm build
```

## Anti-Patterns

### Too Little Context
```markdown
# BAD
Fix the button.
```

### Too Much Context
```markdown
# BAD
[Entire conversation history pasted]
[All 50 files in the project listed]
[Every design decision ever made]
```

### Wrong Context
```markdown
# BAD
Here's how I solved a similar problem last week...
[Irrelevant narrative]
```

### Ambiguous Context
```markdown
# BAD
Make it work like the other one.
Use the usual pattern.
You know what I mean.
```

## Quick Reference

| Task Complexity | Context Type | Token Budget |
|-----------------|--------------|--------------|
| Trivial (1 file, obvious) | Minimal | ~50 tokens |
| Simple (few files, clear) | Standard | ~150 tokens |
| Medium (multiple files) | Standard+ | ~300 tokens |
| Complex (architectural) | Full | ~500 tokens |

**Rule of thumb:** If subagent asks clarifying questions, your context was insufficient. Add more next time.
