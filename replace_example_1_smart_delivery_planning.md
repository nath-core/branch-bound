# CONTINUATION PROMPT — REPLACE PRACTICAL EXAMPLE 1 DATA

Continue working on the existing Branch & Bound + LC Search seminar website.

## PRIMARY TASK

Replace the CURRENT **Example 1 — “Smart Delivery Planning”** content/data with the new short Smart Delivery Planning example below.

IMPORTANT:

- Do NOT create a new example section.
- Do NOT add another example below it.
- Do NOT change the overall website structure.
- Do NOT change the animation style.
- Do NOT redesign the section.
- Keep the existing **Example 1 animation exactly as the visual/interaction template**.
- Only replace the graph, node names, distances, calculations, labels, and explanatory values with the new data below.
- The new example must behave with the SAME step-by-step animation sequence as the current/default Example 1.
- Preserve the existing Apple-inspired design, typography, transitions, scroll behavior, and visual language.
- Preserve all other examples and sections.

The goal is to make the new data fit naturally into the existing Example 1 animation.

---

# NEW EXAMPLE 1

## Smart Delivery Planning

Problem:

> Find the least-cost route from the Warehouse to the Tech Park.

The graph represents possible delivery routes.

Each edge value represents the distance in meters.

The algorithm should demonstrate:

1. First complete solution → 61 m
2. Better solution → 53 m
3. Airport branch → pruned before reaching Tech Park because its current cost becomes 56 m > 53 m

This should clearly demonstrate:

> Branch and Bound does not need to explore the entire state-space tree.

---

# 1. NEW GRAPH DATA

Replace the existing Example 1 graph with this exact graph:

```text
                         WAREHOUSE
                        /         \
                     18 m          11 m
                      /              \
                  CAMPUS           HOSPITAL
                    |              /     \
                  20 m           15 m     25 m
                    |            /          \
                 LIBRARY       MALL       AIRPORT
                    |           |            |
                  15 m         20 m         20 m
                    |           |            |
                TECH PARK   BUS TERMINAL    CARGO
                                |             |
                              15 m           15 m
                                |             |
                            TECH PARK      TECH PARK
```

Render this using the EXISTING Example 1 graph implementation.

Do NOT replace the existing graph system with a new visualization system.

Only update the graph data.

---

# 2. EXACT EDGES

Use these exact edges and distances.

### Warehouse

```text
Warehouse → Campus = 18 m
Warehouse → Hospital = 11 m
```

### Campus branch

```text
Campus → Library = 20 m
Library → Tech Park = 15 m
```

### Hospital → Mall branch

```text
Hospital → Mall = 15 m
Mall → Bus Terminal = 20 m
Bus Terminal → Tech Park = 15 m
```

### Hospital → Airport branch

```text
Hospital → Airport = 25 m
Airport → Cargo = 20 m
Cargo → Tech Park = 15 m
```

Do not alter these values.

---

# 3. COMPLETE ROUTES

The animation should use these route calculations.

## Route 1 — Campus

```text
Warehouse → Campus → Library → Tech Park

18 + 20 + 15
= 53 m
```

This is the final best route.

---

## Route 2 — Hospital → Mall

```text
Warehouse → Hospital → Mall → Bus Terminal → Tech Park

11 + 15 + 20 + 15
= 61 m
```

This should be the FIRST complete solution.

Therefore:

```text
BEST = 61 m
```

---

## Route 3 — Hospital → Airport

```text
Warehouse → Hospital → Airport → Cargo → Tech Park

11 + 25 + 20 + 15
= 71 m
```

However, DO NOT complete this route during the Branch & Bound animation.

It must be pruned before reaching Cargo/Tech Park.

At Airport:

```text
11 + 25
= 36 m
```

After reaching Cargo:

```text
11 + 25 + 20
= 56 m
```

At this point:

```text
CURRENT COST = 56 m
CURRENT BEST = 53 m

56 > 53
```

Therefore:

```text
PRUNE
```

The final `Cargo → Tech Park = 15 m` edge must remain unexplored.

---

# 4. VERY IMPORTANT — ANIMATION MUST MATCH EXISTING EXAMPLE 1

Use the CURRENT/default Example 1 animation sequence as the exact template.

Do NOT invent a new animation sequence.

If the current Example 1 currently does something like:

```text
Full graph
↓
Highlight starting node
↓
Generate branches
↓
Calculate/update values
↓
Select a branch
↓
Move along the route
↓
Find first solution
↓
Update Best
↓
Explore another promising branch
↓
Find better solution
↓
Compare current cost with Best
↓
Prune
↓
Show final result
```

then preserve that exact sequence.

Only substitute the new Smart Delivery Planning graph/data.

The visual pacing, scroll triggers, node highlighting, path animation, number transitions, cards, and status indicators should remain consistent with the existing Example 1.

---

# 5. ANIMATION STORY

The new data should produce this story.

## STAGE 1 — START

Show:

```text
WAREHOUSE
```

Then reveal the two first-level choices:

```text
Warehouse → Campus = 18 m

Warehouse → Hospital = 11 m
```

Use the existing Example 1 interaction for revealing these branches.

Do not introduce additional UI styles.

---

# 6. FIRST COMPLETE SOLUTION — 61 m

The first complete solution should be:

```text
Warehouse
   ↓ 11 m
Hospital
   ↓ 15 m
Mall
   ↓ 20 m
Bus Terminal
   ↓ 15 m
Tech Park
```

Animate the path step by step.

Show the accumulated distance:

```text
11 m
↓
11 + 15 = 26 m
↓
11 + 15 + 20 = 46 m
↓
11 + 15 + 20 + 15 = 61 m
```

Then show:

```text
FIRST COMPLETE SOLUTION

61 m
```

Update:

```text
BEST = 61 m
```

This should use the existing Example 1 “first solution found” animation.

---

# 7. SECOND COMPLETE SOLUTION — 53 m

Next, explore the Campus branch.

Path:

```text
Warehouse
   ↓ 18 m
Campus
   ↓ 20 m
Library
   ↓ 15 m
Tech Park
```

Animate it step by step.

Show:

```text
18 m
↓
18 + 20 = 38 m
↓
18 + 20 + 15 = 53 m
```

Then:

```text
SECOND COMPLETE SOLUTION

53 m
```

Update:

```text
OLD BEST = 61 m
NEW BEST = 53 m
```

Main indicator:

```text
BEST = 53 m
```

Use the same existing Example 1 animation used when a better solution replaces the previous best.

---

# 8. THIRD BRANCH — EARLY PRUNING

Now explore:

```text
Warehouse → Hospital → Airport
```

Distances:

```text
Warehouse → Hospital = 11 m
Hospital → Airport = 25 m
```

Accumulated:

```text
11 + 25
= 36 m
```

Then move to:

```text
Airport → Cargo = 20 m
```

Accumulated:

```text
11 + 25 + 20
= 56 m
```

At Cargo:

```text
CURRENT COST = 56 m
CURRENT BEST = 53 m
```

Compare:

```text
56 > 53
```

Then immediately:

```text
✕ PRUNE
```

IMPORTANT:

Do NOT continue:

```text
Cargo → Tech Park = 15 m
```

The branch must stop at Cargo.

The final edge to Tech Park should remain visibly unexplored.

This is the key teaching animation.

---

# 9. PRUNING VISUAL

At the moment the algorithm reaches:

```text
Cargo
```

show a clear comparison:

```text
CURRENT COST
56 m

CURRENT BEST
53 m
```

Then animate:

```text
56 m > 53 m
```

Then:

```text
CANNOT IMPROVE BEST
```

Then:

```text
✕ PRUNED
```

The remaining:

```text
Cargo → Tech Park = 15 m
```

edge should fade/dim/become dashed to communicate:

> This part of the branch was never explored.

Do NOT calculate:

```text
56 + 15 = 71 m
```

as part of the main pruning demonstration.

The whole point is to show that the branch is stopped before completion.

---

# 10. FINAL RESULT

After the animation finishes, show the final best route:

```text
Warehouse
   ↓ 18 m
Campus
   ↓ 20 m
Library
   ↓ 15 m
Tech Park
```

Total:

```text
18 + 20 + 15
= 53 m
```

Show:

```text
OPTIMAL ROUTE
53 m
```

The first route should remain visually secondary:

```text
Warehouse → Hospital → Mall → Bus Terminal → Tech Park
61 m
```

The pruned route should show:

```text
Warehouse → Hospital → Airport → Cargo
56 m > 53 m
✕ PRUNED
```

---

# 11. FINAL THREE-STAGE STORY

Use the existing Example 1 summary animation, but update its content to:

```text
01
FIRST SOLUTION

61 m
```

↓

```text
02
BETTER SOLUTION

53 m
```

↓

```text
03
EARLY PRUNING

56 m > 53 m
```

↓

```text
✕ PRUNED
```

Final message:

> The algorithm found a better route and then avoided completing a branch that was already more expensive than the current best.

---

# 12. KEY CONCEPT

Keep the explanation concise.

Show:

```text
Current Cost = 56 m
Current Best = 53 m

56 > 53
     ↓
PRUNE
```

Then:

> Because all remaining distances are non-negative, this branch cannot produce a better solution.

Also show the general Branch & Bound rule:

```text
If Bound ≥ Current Best
        ↓
      PRUNE
```

Keep this aligned with the existing site's explanation.

---

# 13. DO NOT CHANGE THE EXISTING EXAMPLE 1 DESIGN

This is critical.

The current Example 1 already has an animation and visual style.

Use it as the template.

Preserve:

- Existing section layout
- Existing graph rendering
- Existing node style
- Existing edge style
- Existing labels
- Existing scroll behavior
- Existing sticky/pinned behavior
- Existing animation timing
- Existing transitions
- Existing number counters
- Existing status cards
- Existing typography
- Existing responsive behavior
- Existing Apple-inspired visual language

Only replace the underlying example data and corresponding explanatory text.

---

# 14. DO NOT USE THE OLD DATA

Remove/replace old Example 1 data such as:

- Previous Warehouse/Airport route values
- Old Campus values
- Old Hospital values
- Old Mall/Airport values
- Old End Route nodes
- Any old Tech Park distances

The new graph must use ONLY the values specified in this prompt.

---

# 15. IMPORTANT — GOAL CONDITION

The goal is:

```text
Warehouse → Tech Park
```

Every complete route must end at Tech Park.

Do NOT use:

```text
End Route
```

as a terminal goal.

The three conceptual routes are:

```text
Route A:
Warehouse → Hospital → Mall → Bus Terminal → Tech Park
61 m

Route B:
Warehouse → Campus → Library → Tech Park
53 m

Route C:
Warehouse → Hospital → Airport → Cargo → Tech Park
71 m
```

Route C is intentionally NOT completed because it is pruned at:

```text
Cargo
Current Cost = 56 m
Best = 53 m
```

---

# 16. FINAL TECHNICAL CHECK

Before finishing, verify:

- [ ] This modifies the existing Example 1 only.
- [ ] No new duplicate Example 1 section is created.
- [ ] Existing Example 1 animation style is preserved.
- [ ] New graph contains Warehouse, Campus, Hospital, Library, Emergency/Mall branch as specified, Airport, Cargo, Bus Terminal, and Tech Park.
- [ ] Warehouse → Campus = 18 m.
- [ ] Campus → Library = 20 m.
- [ ] Library → Tech Park = 15 m.
- [ ] Warehouse → Hospital = 11 m.
- [ ] Hospital → Mall = 15 m.
- [ ] Mall → Bus Terminal = 20 m.
- [ ] Bus Terminal → Tech Park = 15 m.
- [ ] Hospital → Airport = 25 m.
- [ ] Airport → Cargo = 20 m.
- [ ] Cargo → Tech Park = 15 m.
- [ ] First complete solution = 61 m.
- [ ] Best becomes 61 m.
- [ ] Second complete solution = 53 m.
- [ ] Best changes 61 m → 53 m.
- [ ] Airport branch reaches Cargo.
- [ ] Current Cost at Cargo = 11 + 25 + 20 = 56 m.
- [ ] Current Best = 53 m.
- [ ] 56 > 53.
- [ ] Airport branch is pruned at Cargo.
- [ ] Cargo → Tech Park is NOT traversed.
- [ ] Final optimal route = Warehouse → Campus → Library → Tech Park.
- [ ] Final distance = 53 m.
- [ ] All other website sections remain unchanged.

---

# FINAL TEACHING MESSAGE

The viewer should understand this story:

> LC explores the promising delivery routes step by step.
>
> The first complete route reaches Tech Park with a distance of 61 meters.
>
> A different route through Campus reaches Tech Park in only 53 meters, so the current best changes to 53 meters.
>
> Later, the Airport branch reaches Cargo after already travelling 56 meters.
>
> Since 56 meters is already greater than the current best of 53 meters, the algorithm prunes the branch immediately.
>
> It never needs to travel the final 15 meters to Tech Park.
>
> This demonstrates how Branch and Bound avoids unnecessary exploration.

Make the result feel like the SAME Example 1 animation with NEW data, not like a newly designed section.
