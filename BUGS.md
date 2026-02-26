# Fakebook — Bug Documentation

**Total bugs: 15**

All bugs are intentional and designed for QA exam/testing purposes.

---

## Posts & Feed

| # | Bug | How to Reproduce | Expected | Actual |
|---|-----|-----------------|----------|--------|
| 1 | **HTML tag injection on post** | Type any text (e.g. `hello`) and click Post | Post shows: `hello` | Post shows: `<h1>hello</h2>` as literal text |
| 2 | **Resizable post textarea** | Open the post box, grab the bottom-right corner of the text area | Textarea should have fixed size | Textarea can be freely resized (dragged) |
| 3 | **Disabled button still submits** | Type 281+ characters in the post box, then click Post | Button should be truly disabled; post should not submit | Button looks disabled (grayed out, `cursor-not-allowed`) but click still fires and post is submitted |
| 4 | **Unlimited likes (no toggle)** | Click Like on any post multiple times | Like count increments once; clicking again unlikes | Like count increments on every click with no cap or toggle |
| 5 | **Share subtracts likes (goes negative)** | Click Share on any post | Share count increments | Like count decrements by 1; can go into negative numbers (shown in red as `-1 (negative?!)`) |
| 6 | **Comment count hardcoded** | Add a comment to any post | Comment count in the header increments | Comment count never changes regardless of how many comments are added |
| 7 | **Comment doubling** | Submit any comment | Comment appears once | Comment appears **twice** in the list immediately after submitting |

---

## Post Data / Display

| # | Bug | Where | Expected | Actual |
|---|-----|-------|----------|--------|
| 8 | **Invalid post date** | Alex Reyes' post | Valid calendar date | Timestamp shows `February 31, 2025` — a date that does not exist |
| 9 | **Broken avatar image** | Maria Santos' post | Profile avatar displays | Avatar fails to load (broken CDN URL: `fakebook-broken-cdn.xyz`) |

---

## Create Post

| # | Bug | How to Reproduce | Expected | Actual |
|---|-----|-----------------|----------|--------|
| 10 | **Privacy icon mismatch** | Open post box, look at the audience selector | Public should show a globe/public icon | Shows 🔒 (lock/private icon) next to the word "Public" |

---

## Navigation

| # | Bug | Where | Expected | Actual |
|---|-----|-------|----------|--------|
| 11 | **Nav typo** | Top navbar center tabs | "Friends" | Displays as `Freinds` |
| 12 | **Wrong notification badge** | Navbar bell icon | Badge count matches number of notifications | Badge shows `99` but clicking reveals only 3 notifications |
| 13 | **Active friends count mismatch** | Right sidebar Contacts section | Count matches listed friends | Says "3 friends active now" but only 2 friends are listed |

---

## Search

| # | Bug | How to Reproduce | Expected | Actual |
|---|-----|-----------------|----------|--------|
| 14 | **Search bar types random text** | Click the search bar and type anything | Typed characters appear in the field | A random character (letters/digits/symbols) is inserted instead of the actual keystroke |

---

## Dead Links

| # | Bug | How to Reproduce | Expected | Actual |
|---|-----|-----------------|----------|--------|
| 15 | **Dead links show stacking 404 toasts** | Click any nav tab (Freinds, Watch, Marketplace, Groups), any left sidebar item, Messenger, Share, ⋯, ✕, sponsored ads, Contacts | Page navigates or action completes | Red `404 — Page not found` toast appears bottom-right; multiple clicks stack multiple toasts, each auto-dismissing after 2.5s |

---

## Special Link

| Button | Behavior |
|--------|----------|
| 🎮 **Gaming** (left sidebar) | Redirects to `https://www.cliffianmurillo.site/bug-game` in a new tab |
