# CONTINUATION PROMPT — ADD HOSPITAL LC BRANCH & BOUND EXAMPLE

Continue working on the existing Branch & Bound + LC (Least-Cost) Search Algorithm seminar website.

IMPORTANT:
- Do NOT rebuild the website from scratch.
- Do NOT create a separate page.
- Do NOT change the existing overall design language.
- Keep the existing Apple-inspired design/skill implementation.
- Preserve all existing sections and animations.
- Add this new example BELOW the existing practical example (the previous Warehouse/Airport example).
- Do NOT replace or delete the previous Warehouse/Airport example.
- Use the same visual storytelling and scroll-driven animation style.

## 1. NEW SECTION

Title:

## 🏥 Hospital → Laboratory
### Least-Cost Branch & Bound

Problem:

> Find the minimum-distance route from the Hospital to the Laboratory using Least-Cost Branch and Bound.

Every edge represents a distance in meters.

The example demonstrates:
1. First branch → complete solution = 70 m.
2. Second branch → better solution = 60 m.
3. Third branch → reaches 65 m before Laboratory, while Best = 60 m → prune immediately.
4. Therefore, the whole state-space tree is not explored.

Place this section DIRECTLY BELOW the existing Warehouse/Airport practical example. Leave that example unchanged.

## 2. SCROLL-DRIVEN ANIMATION

Make this a step-by-step scroll-driven algorithm animation, not a static diagram.

Keep the graph visually stable/pinned while scrolling and change its state progressively:

INTRO
→ FULL GRAPH
→ INITIAL BRANCHING
→ FIRST PATH
→ BEST = 70 m
→ SECOND PATH
→ BEST = 60 m
→ THIRD PATH
→ CURRENT COST = 65 m
→ COMPARE WITH BEST
→ 65 > 60
→ PRUNE
→ FINAL RESULT

Use the existing animation framework if available. Prefer SVG/CSS/Framer Motion already present in the project. Do not add unnecessary dependencies.

## 3. INTRO

Show:

🏥
HOSPITAL → LABORATORY

Least-Cost Branch & Bound

Problem:
> Find the minimum-distance route from the Hospital to the Laboratory.

Supporting text:
> Each edge represents distance in meters.

## 4. FULL GRAPH

Render an actual SVG/vector graph, not only a text block.

Use this exact graph:

```text
                              HOSPITAL
                           /      |                               20 m     25 m      30 m
                         /         |                                 ICU      EMERGENCY    PHARMACY
                      /  \        /  \          |
                   25m   30m   20m  30m       35m
                    /     \      |    |          |
                 WARD-A  WARD-B  ICU  PHARMACY  WARD-C
                   |       |      |     |         |
                 25m     20m    15m   10m       15m
                   |       |      |     |         |
                LAB      LAB    LAB   LAB       LAB
```

Exact edge distances:

- Hospital → ICU = 20 m
- Hospital → Emergency = 25 m
- Hospital → Pharmacy = 30 m
- ICU → Ward-A = 25 m
- ICU → Ward-B = 30 m
- Emergency → ICU = 20 m
- Emergency → Pharmacy = 30 m
- Pharmacy → Ward-C = 35 m
- Ward-A → Laboratory = 25 m
- Ward-B → Laboratory = 20 m
- ICU → Laboratory = 15 m
- Pharmacy → Laboratory = 10 m
- Ward-C → Laboratory = 15 m

Every edge must visibly display its distance.

## 5. INITIAL STATE

Show:
- Complete graph
- No highlighted route
- No pruned branch

Status cards:

CURRENT COST
—

BEST
∞

STATUS
READY

## 6. STEP 1 — INITIAL BRANCHING

Highlight the three first-level branches:

Hospital → ICU = 20 m
Hospital → Emergency = 25 m
Hospital → Pharmacy = 30 m

Then emphasize ICU as the first selected least-cost branch.

Short explanation:

> LC Search selects the least-cost promising live node for expansion.

## 7. STEP 2 — FIRST COMPLETE SOLUTION

Animate progressively:

```text
Hospital
   ↓ 20 m
ICU
   ↓ 25 m
Ward-A
   ↓ 25 m
Laboratory
```

Stage A:
Hospital → ICU
Current Cost = 20 m

Stage B:
ICU → Ward-A
20 + 25 = 45 m

Stage C:
Ward-A → Laboratory
20 + 25 + 25 = 70 m

Show:

FIRST COMPLETE SOLUTION
70 m

Update:

BEST
∞ → 70 m

Narration:
> The first complete solution becomes the current best solution.

## 8. STEP 3 — DO NOT STOP

Briefly show Emergency and Pharmacy as remaining live branches.

Show:

BEST = 70 m

Text:
> Finding a solution does not mean we can stop. Another live branch may still contain a shorter solution.

## 9. STEP 4 — SECOND COMPLETE SOLUTION

Animate:

```text
Hospital
   ↓ 25 m
Emergency
   ↓ 20 m
ICU
   ↓ 15 m
Laboratory
```

Progress:

25 m
→ 25 + 20 = 45 m
→ 25 + 20 + 15 = 60 m

Show:

SECOND COMPLETE SOLUTION
60 m

Animate:

OLD BEST = 70 m
NEW BEST = 60 m

Main indicator:

BEST
60 m

Narration:
> This route is shorter, so the current best changes from 70 m to 60 m.

## 10. STEP 5 — THIRD BRANCH

Now focus on:

Hospital → Pharmacy → Ward-C

Animate ONLY:

```text
Hospital
   ↓ 30 m
Pharmacy
   ↓ 35 m
Ward-C
```

Stop at Ward-C.

Calculate:

30 + 35 = 65 m

Show:

CURRENT COST
65 m

CURRENT BEST
60 m

Then:

65 m > 60 m

Pause briefly.

## 11. EARLY PRUNING

Show:

CANNOT BEAT CURRENT BEST

Then:

✕ PRUNE

IMPORTANT:
- Do NOT continue to Laboratory.
- Do NOT traverse Ward-C → Laboratory.
- Do NOT make the main calculation 65 + 15 = 80.
- The remaining 15 m edge should remain visibly unexplored/faded/dashed.

Visual:

```text
Hospital
   ↓ 30 m
Pharmacy
   ↓ 35 m
Ward-C
   ✕
   │
   │ unexplored
   ↓
Laboratory
```

Narration:
> We have already travelled 65 meters, while our best complete route is only 60 meters. Since the remaining distances cannot be negative, this branch cannot produce a better solution. We can prune it immediately.

## 12. FINAL STATE

Show the complete graph with search history.

First complete route:
Hospital → ICU → Ward-A → Laboratory
70 m
Keep it visually secondary.

Best route:
Hospital → Emergency → ICU → Laboratory
60 m
Make this the main highlighted route.

Pruned route:
Hospital → Pharmacy → Ward-C
65 m > 60 m
PRUNED

The Laboratory on the Pharmacy branch must remain unreached.

## 13. FINAL RESULT CARD

Show:

FINAL RESULT

Shortest Route

Hospital
↓ 25 m
Emergency
↓ 20 m
ICU
↓ 15 m
Laboratory

TOTAL = 60 m

Then:

2 complete solutions explored
1 branch pruned before completion

## 14. THREE-STAGE SUMMARY

Animate:

01
FIRST SOLUTION
70 m

↓

02
BETTER SOLUTION
60 m

↓

03
EARLY PRUNING
65 m > 60 m

↓

✕ PRUNED

## 15. KEY CONCEPT

Show:

Why didn't we explore the whole tree?

```text
Current Cost > Current Best
        ↓
Cannot improve the solution
        ↓
PRUNE
```

Main statement:

> Branch and Bound does not necessarily explore the entire state-space tree.

Then briefly connect to the general minimization rule:

```text
If Bound ≥ Current Best
        ↓
      PRUNE
```

Explain:
> In this example, the current cost itself is already greater than the best solution, so it is enough to prune immediately. In other Branch and Bound problems, an optimistic bound may include an estimate of the remaining cost.

## 16. LC SEARCH CONNECTION

Show:

```text
GENERATE
   ↓
CALCULATE COST / BOUND
   ↓
SELECT LEAST-COST LIVE NODE
   ↓
EXPAND
   ↓
FIND BETTER SOLUTION
   ↓
PRUNE NON-PROMISING BRANCH
   ↓
REPEAT
```

Keep this concise.

## 17. DESIGN

Continue the existing Apple-inspired design and visual language.

Use:
- Premium minimal UI
- SVG/vector graph
- Smooth path highlighting
- Animated edge traversal
- Animated distance accumulation
- Current Cost indicator
- Current Best indicator
- Selected-node state
- Pruned-node state
- Smooth number transitions
- Scroll-triggered animation
- Sticky/pinned graph where appropriate
- Responsive layout

Do not make it look like a generic flowchart or static textbook page.

## 18. RESPONSIVE

Desktop:
- Large graph
- Sticky graph during explanation
- Explanation cards beside/below graph

Mobile:
- Stack graph and explanation
- Keep edge labels readable
- Preserve scroll sequence
- Avoid overlapping labels

## 19. DO NOT MODIFY OTHER SECTIONS

Do NOT modify:
- Hero
- Introduction
- Why Branch and Bound
- Branch explanation
- Bound explanation
- Pruning theory
- LC Search theory
- Terminology
- Control abstraction
- Code section
- DFS/BFS/LC comparison
- Common mistakes
- KTU quick revision
- Thank-you section
- Existing Warehouse/Airport example

Only ADD this Hospital example below the existing practical example.

## 20. TECHNICAL CHECK

Verify:

- New example is below Warehouse/Airport example.
- Previous example is untouched.
- Graph uses all specified distances.
- First complete solution = 70 m.
- Best changes ∞ → 70 m.
- Second complete solution = 60 m.
- Best changes 70 m → 60 m.
- Third branch reaches Ward-C only.
- Current Cost = 30 + 35 = 65 m.
- Current Best = 60 m.
- 65 > 60.
- Third branch is pruned immediately.
- Laboratory is NOT reached on the third branch.
- The 15 m remaining edge is not traversed.
- Final best route = 60 m.
- Scroll controls the story.
- Animation clearly shows each algorithm step.
- Existing sections remain unchanged.

## FINAL TEACHING MESSAGE

The viewer should finish understanding:

> First, LC finds a complete solution of 70 meters.
>
> Then another branch gives a better solution of 60 meters.
>
> When the third branch reaches Ward-C, it has already travelled 65 meters.
>
> Since 65 meters is already greater than the current best of 60 meters, there is no reason to continue.
>
> The branch is pruned immediately, without reaching the Laboratory.
>
> This demonstrates how Branch and Bound avoids exploring unnecessary parts of the state-space tree.

Make this section feel like an interactive algorithm simulation and a natural continuation of the existing seminar website.
