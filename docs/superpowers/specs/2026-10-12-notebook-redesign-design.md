# Notebook redesign (Oct 2026)

Goal: cut homepage density roughly in half and give the site a distinctive, warm "research notebook" identity instead of a generic dark dev-portfolio look. Approved direction A ("Lab notebook").

## Visual system
- Paper `#F4EFE6`, ink `#1F1E1B`, one clay accent (links, entry numbers, figure labels). Dark mode: dark paper `#1A1915`, cream ink, same accent family.
- Newsreader serif for all reading text; a monospace (JetBrains Mono) for labels, dates, numbers, nav. No sans, no cards, no tech chips on the homepage. Hairline rules and whitespace for structure.
- One centered column (~42rem) with a right margin column (~12rem) on wide screens for notes (dates, headline numbers, "try it →"). Margin notes fall inline on mobile.
- Figures as captioned plates: `Fig. n — caption` in mono.
- Motion: clay underline on hover only. Demos are the only moving parts.
- Token names (`bg`, `bg-elev`, `fg`, `fg-muted`, `fg-faint`, `line`, `accent`, `accent-soft`) are kept so demos and project pages restyle automatically.

## Homepage (order kept from user's request)
1. Header: mono line — name · nav (experience, research, work, about, résumé) · theme toggle.
2. Opening: one large serif sentence + two short lines linking Forge (playground), Anvil, the poker bot; email / GitHub / LinkedIn / résumé inline. Small portrait in the margin.
3. Experience: one row per role (dates · role · company); bullets in a `<details>`.
4. Research: same rows for Zanette lab, CMSX, REUSE; then Papers as single lines (title · venue · PDF).
5. Selected work: 01 Forge, 02 Anvil, 03 Atlas, 04 Poker CFR — one line, one figure, 1–2 margin numbers, links.
6. More work: one-line index of 8 (C-Torch, dX, MNIST, Snake DQN, Text2Code, English2Logic, SASyLF, ObsidianDB) with a dot for live demos; "All projects →".
7. About: education (2 rows), all 8 awards one line each.

## Project pages and /projects
Same notebook style: title, question, date/role in mono, results as margin numbers, demos and figures as plates, then the markdown body. `/projects` is a one-line index grouped by area.

## Out of scope
Content changes beyond trimming the homepage; new demos; deployment.
