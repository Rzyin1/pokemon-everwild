# Everwild — Original Monster Universe

The Everwild project and its existing GitHub repository continue, but the active website is being rebuilt for a wholly original monster universe. The prior Pokémon roster, art files, Pokédex data, and former game-planning materials have been removed from the active branch. They remain recoverable through Git history.

**Live site:** https://rzyin1.github.io/pokemon-everwild/

## Included in the new site

- Interactive catalog of **20 types**
- Complete **20 × 20 matchup matrix** (400 interactions)
- Attacking and defending strengths, weaknesses, resistances and immunities
- Type-to-type effectiveness calculator
- Mobile-friendly design and accessible table labels

The chart uses **17 traditional elemental types plus Sound, Light, and Mist**, replacing Normal with Mist. This data is taken directly from the user's supplied type-chart source, not automatically rebalanced.

## Project files
- `index.html` — main website
- `css/everwild.css` — visual design and responsive styles
- `js/everwild.js` — interactive chart UI
- `data/monster_type_chart.js` — structured chart module
- `data/monster_type_chart.csv` — source chart in CSV

**Current phase:** worldbuilding and planning for original creatures.

## Game design reference

The confirmed rules, pending systems, removed systems, and 12-step core gameplay loop are captured in:
- [Ideas & Game Design](https://rzyin1.github.io/pokemon-everwild/ideas.html)
- [Full master design source](docs/master-game-design.md)

The master reference is maintained separately from the public homepage. Current game direction: medieval fantasy monster hunting, a Rift exploration realm, free-willed monster bonds, one type per monster, 20 starters via a 1d20 roll, and independent D&D 5e level progression.

## Interactive character and NPC sheets

- [Player Characters](https://rzyin1.github.io/pokemon-everwild/characters.html)
- [NPC Registry](https://rzyin1.github.io/pokemon-everwild/npcs.html)

Player sheets initialize with level 1, unassigned class rank and attributes, 20 current/max HP, 0 currency, no starter and no active quest. NPC dossiers maintain separate stat blocks. Both pages allow multiple records, automatic browser-local saving, HP damage and healing (including temporary HP), ability scores/modifiers, saving throws, skills, proficiency, dice expressions with advantage and disadvantage, initiative, attack rolls, notes, and JSON backup/restore. Player sheets additionally support death saving throws. Hit dice, optional rests and 5e XP thresholds are provided as tools, not locked campaign rules.

**Storage note:** Records are stored in `localStorage` on the user's current browser and origin. They are **not** synchronized across devices or saved to GitHub. Use **Export all JSON** to back up player and NPC sheets together, and **Import / restore JSON** to merge them into another browser.

- `characters.html`, `npcs.html` — sheet pages
- `css/sheets.css` — layout and styling
- `js/sheets.js` — local persistence and dice/mechanics

## Approved armor, shield, movement & initiative system

See [Ideas: Armor, Shields & Movement](https://rzyin1.github.io/pokemon-everwild/ideas.html#armor-shields-movement). Both player and NPC sheets calculate Defense, movement and initiative from the saved AGI ability modifier and equipped armor (Unarmored, Leather, Chainmail, or Plate); shields add +2 Defense but cannot be paired with two-handed weapons. The optional turn tracker enforces one action per turn and a movement allowance that can be split before and after the action. Armor penalties and rounding follow the approved master design table. Existing saved `dex` ability values are retained and displayed as **Agility (AGI)** for compatibility.
