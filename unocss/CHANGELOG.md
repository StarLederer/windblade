# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- .

### Fixed

- .

### Changed

- .

### Removed

- .

## 2.0.0-alpha - 2023-02-06

### Added

- NPM package metadata.
- Bundle scripts using unbuild.
- Dynamic size calculations using mathematical expressions inside `()` (e.g `m-(-s)`, `inset-(m/2)`).
- `getCSSProperties` to `core/color` (ex. `external`).
- `core/variant`.
- `scheme-dark` and `scheme-light` rules.
- `scheme-initial` class (not a rule; does not work in @apply).
- `objToCSS` to `core`.
- Text transform rules.
- New `def` color variations.
- Logical `rounded` (ex. `round`) rule variuants.
- Time units to theme.
- All fitting Tailwind v3.2.4 rules.

### Fixed

- Overwriting light variant color alpha inside the theme not working.

### Changed

- Renamed preset to Windblade.
- Moved source code to `src` directory.
- Renamed `external` to `core`.
- `getSLA` and `getHSLA` in `core` (ex. `external`) now return values for all variants.
- Renamed all size units.
- Size units are now sorted between `units` and `misc` in theme.
- Renamed and improved colors.
- Renamed `theme.sizes.tokens` to `theme.proportions`.
- Renamed `theme.sizes.misc` to `theme.miscSizes`.
- Changed `theme.proportions` (ex. `theme.sizes.tokens`) to match Tailwind.
- Renamed `round` to `rounded`.
- Static and interactive colors are now merged and have optional `interactive` property.
- Renamed `mg` and `pd` to `m` and `p`.
- Renamed `grid-auto-fit` and `grid-auto-fill` to `grid-fit-cols` and `grid-fill-cols`.
- Renamed `min` size to `px`.
- Default transition now matches tailwind.
- Renamed `*-fg-0` to `*-fg-1`, `*-fg-1` to `*-fg-2` etc.

### Removed

- `getColor` from `core` (ex. `external`).
- `width` and `height` rules in favor of `size`.

## 1.1.0 - 2023-01-06

### Added

- full (100%), half (50%) and auto size units.
- fill and fill-fg color rules for SVGs.

## 1.0.0 - 2023-01-06

### Added

- The first version of this UnoCSS preset.
- This changelog.
