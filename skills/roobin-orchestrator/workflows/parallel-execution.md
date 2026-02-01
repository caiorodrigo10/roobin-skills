# Parallel Execution Guide

## Core Principle

```
MAXIMIZE PARALLELIZATION WITHOUT CONFLICTS
```

Parallel execution reduces total time but requires careful coordination to avoid:
- File conflicts (multiple subagents editing same file)
- Dependency violations (subtask starts before its dependency completes)
- Context fragmentation (subagents making inconsistent decisions)

## Token Optimization

### The 40k Rule

```
Each subagent should use ~40k tokens (one focused task)
Above 100k tokens, quality degrades significantly
```

### Why One Task Per Subagent

| Approach | Tokens Used | Quality |
|----------|-------------|---------|
| 1 task per subagent | ~20-40k | Optimal |
| 3 tasks per subagent | ~80-120k | Degraded |
| 5+ tasks per subagent | ~150k+ | Poor |

**Rule:** Better to have 5 parallel subagents with 1 task each than 1 subagent with 5 tasks.

## Dependency Analysis

### Step 1: Map Dependencies

Before parallelizing, identify:

```
For each subtask:
  - What files does it modify?
  - What files does it read?
  - Does it depend on output from another subtask?
```

### Step 2: Build Dependency Graph

```
Example - Feature with 5 subtasks:

A: Create component (writes: ComponentA.tsx)
B: Create hook (writes: useHook.ts)
C: Create styles (writes: styles.css)
D: Integrate component (reads: ComponentA.tsx, useHook.ts, styles.css)
E: Add tests (reads: ComponentA.tsx, useHook.ts)

Dependencies:
- A: none
- B: none
- C: none
- D: A, B, C
- E: A, B
```

### Step 3: Group for Parallel Execution

```
Turn 1: A, B, C (all independent)
Turn 2: Wait
Turn 3: D, E (dependencies satisfied)
Turn 4: Wait
```

## Conflict Detection

### File Conflict Matrix

Before delegating, check:

| Subtask | Writes | Reads |
|---------|--------|-------|
| A | file1.ts | - |
| B | file2.ts | - |
| C | file1.ts | file2.ts |

**Conflict:** A and C both write to file1.ts → cannot parallelize.

### Resolution Strategies

| Conflict Type | Resolution |
|---------------|------------|
| Write-Write (same file) | Sequence subtasks |
| Write-Read (same file) | Writer first, then reader |
| Read-Read (same file) | Safe to parallelize |

## Execution Patterns

### Pattern 1: Full Parallel (No Dependencies)

```
Subtasks: A, B, C, D (all independent)

Turn 1:
  Task tool 1: Delegate A
  Task tool 2: Delegate B
  Task tool 3: Delegate C
  Task tool 4: Delegate D

Turn 2:
  Wait for all returns
```

### Pattern 2: Wave Execution (Layered Dependencies)

```
Subtasks:
  Layer 1: A, B (independent)
  Layer 2: C, D (depend on Layer 1)
  Layer 3: E (depends on C)

Turn 1: Delegate A, B
Turn 2: Wait
Turn 3: Delegate C, D
Turn 4: Wait
Turn 5: Delegate E
Turn 6: Wait
```

### Pattern 3: Pipeline (Sequential with Parallel Branches)

```
Subtasks:
  A → B → C (main path)
  A → D (branch)

Turn 1: Delegate A
Turn 2: Wait for A
Turn 3: Delegate B, D (both depend only on A)
Turn 4: Wait for B
Turn 5: Delegate C
```

### Pattern 4: Hybrid (Mixed Dependencies)

```
Subtasks:
  A, B: independent
  C: depends on A
  D: depends on B
  E: depends on C, D

Execution:
  Turn 1: A, B
  Turn 2: Wait
  Turn 3: C, D
  Turn 4: Wait
  Turn 5: E
```

## Practical Limits

### Maximum Parallel Subagents

```
Recommended: 3-4 parallel subagents per turn
Maximum: 5-6 (diminishing returns beyond)
```

### Why Limit Parallelism

1. **Orchestrator overhead** - Managing too many returns gets complex
2. **Context switches** - Each return requires processing
3. **Error handling** - More subagents = more potential failures
4. **Token budget** - Orchestrator also consumes tokens

## Error Handling

### Subagent Failure

```
If subagent fails:
  1. Read error message
  2. Decide: retry vs. escalate
  3. If retry: new subagent with adjusted context
  4. If escalate: report to user
```

### Cascade Failure

```
If subagent A fails and B, C depend on A:
  1. Cancel/ignore B, C delegation
  2. Fix A first
  3. Resume B, C after A succeeds
```

### Partial Success

```
If some subagents succeed, others fail:
  1. Keep successful results
  2. Retry failed ones
  3. Don't re-run successful ones
```

## Quick Reference

### Decision Flow

```
1. List all subtasks
2. Map dependencies (writes/reads)
3. Check for conflicts
4. Group into waves
5. Execute wave by wave
6. Handle failures
7. Proceed to review
```

### Parallelization Checklist

- [ ] All subtasks identified
- [ ] Dependencies mapped
- [ ] No write-write conflicts in same wave
- [ ] Each subtask has single focused goal
- [ ] Context provided for each subagent
- [ ] Error handling planned

### Timing Heuristics

| Scenario | Waves | Subagents/Wave |
|----------|-------|----------------|
| Simple feature (3 subtasks) | 1-2 | 2-3 |
| Medium feature (5-7 subtasks) | 2-3 | 2-4 |
| Complex feature (8+ subtasks) | 3-4 | 3-4 |

## Anti-Patterns

### Don't Do This

```
# BAD: Same file in parallel
Turn 1:
  Task 1: "Add function to utils.ts"
  Task 2: "Refactor utils.ts"
# Result: Merge conflict, lost work

# BAD: Ignoring dependencies
Turn 1:
  Task 1: "Create component"
  Task 2: "Add tests for component"
# Result: Tests fail because component doesn't exist yet

# BAD: Too many parallel
Turn 1:
  Task 1-10: All subtasks at once
# Result: Orchestrator overwhelmed, context lost
```

### Do This Instead

```
# GOOD: Wave execution
Turn 1: Independent subtasks
Turn 2: Wait
Turn 3: Dependent subtasks
Turn 4: Wait

# GOOD: Explicit dependency handling
Turn 1: Create component
Turn 2: Wait for component
Turn 3: Add tests (component exists)

# GOOD: Reasonable parallelism
Turn 1: 3-4 independent subtasks
Turn 2: Wait and process
Turn 3: Next batch
```
