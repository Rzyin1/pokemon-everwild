# Pokémon Everwild — Ideas

This page records game concepts and decisions for future development. Ideas are not necessarily implemented.

## Starter Pokémon system

**Status:** Concept approved; implementation deferred until game development.

### Confirmed design
- Create **18 original starter Pokémon**, one representing each of the 18 Pokémon types.
- Plan **three evolutionary stages** for each starter line (54 Pokémon across all starter lines).
- At the professor's laboratory, display **three Poké Balls** in the traditional starter-selection setup.
- For each new adventure, randomly choose **three distinct starters** from the pool of 18.
- The three offered starters must represent **three different primary types**.
- The player may inspect the Pokémon in each Poké Ball and **choose one of the three**.
- With one starter per primary type and equal selection probability, there are **816 possible unordered groups** of three starters.

### Decisions to make later
- Exactly when the random selection is generated and stored.
- Whether saving/reloading can change the offered starters.
- How the rival's starter is determined.
- Whether other starters can be obtained later.
- Final presentation, dialogue, and animations in the lab.

### Implementation note
The intended game-development tools are Pokémon Essentials and RPG Maker XP, with Eevee Expo as a community/resource. The random selection and lab events can be implemented later; this document is design planning only.

## Pokédex scope
- Regional Pokédex size is **open-ended**; decide as species are designed.
- Design the original Pokémon before implementing the playable game.
