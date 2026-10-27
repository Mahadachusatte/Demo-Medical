# Design system

## Concept: the ledger page

Umbrella companies run on ledgers, rota sheets, and timesheets. The interface should look like a well-kept ledger page: a cool paper ground, ruled rows, and ink-blue text. Status is shown with a left-edge rule and a text label, not with coloured pills.

AI output gets its own ink. Anything an agent wrote appears in **agent ink** (violet), in a margin column beside the data, like a note written in the margin of a ledger. A viewer should always be able to tell at a glance what a machine proposed and what a person decided.

This is the one memorable device in the product: the margin. Keep everything else quiet.

## Avoid these (they are common defaults and will read as generic)

- Cream background with a terracotta accent
- Near-black background with an acid-green or vermilion accent
- Identical rounded cards in a grid, with grey shadows
- Gradient washes or decorative blobs
- All-caps eyebrow labels above headings
- Meta strings joined with middle dots ("Ward 4 · Night · 12h")
- "WORD — fragment" headings with a spaced em dash
- An arrow appended to every link or button ("See all →")
- Numbered markers (01, 02, 03) unless the content is truly a sequence
- Fade-and-slide-up on every section, and hover-lift on every card

## Palette

| Token | Hex | Use |
|---|---|---|
| `paper` | `#EEF2EF` | Page background |
| `ink` | `#15243A` | Primary text, headings, primary buttons |
| `rule` | `#C5D0CB` | Borders, table lines, dividers |
| `ready` | `#1E6B52` | Approved, filled, valid |
| `hold` | `#A86A12` | Needs a human decision, expiring soon |
| `stop` | `#A3322B` | Blocked, expired, rejected |
| `agent` | `#5A3FC0` | Agent-written text, margin notes, agent badges only |

Rules for colour:
- Never use colour alone to convey status. Each status also has a text label and a left-edge rule of 3px.
- `agent` is reserved. Do not use it for decorative purposes.
- Text on `paper` must meet 4.5:1 contrast. Check `hold` and `agent` against the paper ground before shipping.
- No dark mode in the demo. Light only, on purpose.

## Typography

- One family for the whole interface: **Schibsted Grotesk**, loaded with `next/font/google`.
- Money, hours, and dates use `font-variant-numeric: tabular-nums` and are right-aligned in tables.
- Type scale (px): 13 (table and meta), 15 (body), 17 (panel titles), 22 (section titles), 30 (page titles), 44 (landing headline only).
- Weights: 400 for body, 500 for labels and table headers, 700 for titles and totals.
- Maximum line length 72 characters for prose blocks.
- Do not use a monospace face for small labels. Use tabular figures instead.

## Layout

- **Desktop (1024px and up):** left rail (220px) with plain text navigation, main ledger column, and a right margin column (300px) for agent notes.
- **Tablet (768px to 1023px):** the margin column collapses under the row it refers to.
- **Phone (under 640px):** only `/worker` is designed for phones. Ops screens show a short message asking the user to open them on a larger screen. The dashboard still reads on a phone.
- Alignment: everything left-aligned except numbers, which are right-aligned.
- Spacing: 4px base unit. Panels are separated by a single 1px rule, not by shadow or card borders.

## Components to build (do not use stock component looks)

1. **Ledger table:** ruled rows, sticky header, right-aligned numeric columns, status shown by left-edge rule plus text.
2. **Status rule:** a 3px left border and a label. Variants: `ready`, `hold`, `stop`, `neutral`.
3. **Margin note:** a block in the right column, written in `agent` ink, with the agent's name at the top, a one-line summary, and a link to the activity log entry.
4. **Approval bar:** sticky to the bottom of the main column. Shows the count of items waiting, for example "3 items ready to approve", with "Approve all ready" and "Review" buttons.
5. **Diff view:** side-by-side before and after, with changed values highlighted by a rule, not by colour alone.
6. **Confidence bar:** a thin bar under each extracted field. Under 0.85 turns `hold`, with the label "Check this".
7. **Phone frame:** a plain rounded rectangle with a 1px rule. No bezel, no device illustration.
8. **Chat panel with record chips:** answers show chips such as `PR-2401` that open the source record in a side panel.
9. **Toast:** appears after an action. The text repeats the button's verb: "Approve" produces "Approved. Logged to activity."
10. **Confirm sheet:** used before any action that sends a message or releases money. Shows exactly what will be sent, to whom, and how many.

## Copy voice

Write from the user's point of view, in plain English, in sentence case, with active verbs.

- Buttons use the verb of the action: "Approve", "Reject", "Send offer", "Send reminder", "Import 118 rows", "Release run".
- The button name is the same name the toast uses. "Send reminder" produces "Reminder sent (demo)."
- Errors explain what happened and how to fix it: "Column 'Hours' not found. Choose the column that holds hours."
- Empty states invite an action: "No timesheets waiting. New photos from workers appear here."
- Do not apologise in error messages. Do not write "Oops."
- Always say "demo" when a message would be real in production: "Reminder sent (demo, nothing was sent)."

## Motion

One orchestrated moment only. When the user presses "Play the Friday night scenario", margin notes write in one after another, about 400ms apart, and stop. Everything else changes instantly or with a short opacity change of 150ms. No looping animation, no parallax, no hover-lift.

Respect `prefers-reduced-motion`: when set, the margin notes appear all at once.

## Focus and accessibility

- Visible focus: 2px `ink` outline with 2px offset on every interactive element.
- Every icon-only button has an accessible name.
- Tables use real `<table>` markup with `scope` on headers.
- Status is announced in text, not colour alone.
- Keyboard: every action reachable with Tab, and Enter or Space to activate.
- Target: no axe-core violations on any screen, and a Lighthouse accessibility score of at least 90.

## Brand marks

- Wordmark: "Ops Desk" in Schibsted Grotesk 700, `ink`. No logo mark in the demo.
- Favicon: a single `agent`-coloured square with the letter "O" in `paper`.
- Demo banner: a 1px `hold`-ruled strip at the top of every page, text "Demo: fictional data, no real messages or payments".
