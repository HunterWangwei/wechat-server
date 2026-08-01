# Changelog

## v0.1.6 - 2026-08-01

### Changed

- Redesign the React administration interface with a responsive application shell.
- Replace the public landing page at `/` with a service overview dashboard.
- Add desktop sidebar navigation and a mobile drawer for users and settings.
- Display real service metadata and configuration status from `/api/status`.
- Refresh tables, forms, tabs, cards, authentication pages, and footer styling.
- Restore the signed-in user display from local storage after a page refresh.

## v0.1.5 - 2026-08-01

### Changed

- Replace project UI branding and repository links with `HunterWangwei`.
- Display the current version directly on Settings > Check for updates.
- Check updates against `HunterWangwei/wechat-server` releases.

## v0.1.4 - 2026-08-01

### Fixed

- Grant release workflows permission to create and upload GitHub Release assets.

## v0.1.3 - 2026-08-01

### Fixed

- Fix frontend production builds by disabling the incompatible Create React App ESLint build plugin in release environments.
- Upgrade release build environments to Node.js 20 and current GitHub Actions versions.

## v0.1.2 - 2026-08-01

### Changed

- Publish container images only to GitHub Container Registry: `ghcr.io/hunterwangwei/wechat-server`.
- Upgrade GitHub Actions used by the Docker publishing workflow.

## v0.1.1 - 2026-08-01

### Added

- Clicking the official-account menu item with key `USER_VERIFICATION` now immediately returns a six-digit login verification code.
- Existing support for sending the text `验证码` to request a code remains available.

### Technical details

- Added XML parsing for WeChat `Event` and `EventKey` fields and handles `CLICK` events.
