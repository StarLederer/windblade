# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- Dynamic size calculations using mathematical expressions inside `()` (e.g `mg-(-s)`, `inset-(m/2)`).
- `getCSSProperties` to `core/color` (ex. `external`).
- `core/variant`.
- `theme-dark` and `theme-light` rules.
- `theme-initial` class (not a rule; does not work in @apply).
- `objToCSS` to `core`.
- Text transform rules.
- `flex-row-reverse` and `flex-col-reverse`.
- New `def` color variations.

### Fixed

- Overwriting light variant color alpha inside the theme not working.

### Changed

- Renamed preset to Windblade.
- Renamed `external` to `core`.
- `getSLA` and `getHSLA` in `core` (ex. `external`) now return values for all variants.
- Renamed all size units.
- Size units are now sorted between `units` and `misc` in theme.
- Renamed `def` to `def3` and `def2` to `def4`
- Improved light variants of `def3` (ex. `def`), `def4` (ex. `def2`) and `srf` colors.

### Removed

- `getColor` from `core` (ex. `external`).

## 1.1.0 - 2023-01-06

### Added

- full (100%), half (50%) and auto size units.
- fill and fill-fg color rules for SVGs.

## 1.0.0 - 2023-01-06

### Added

- The first version of this UnoCSS preset.
- This changelog.
