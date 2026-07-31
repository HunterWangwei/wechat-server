# Changelog

## v0.1.1 - 2026-08-01

### Added

- Clicking the official-account menu item with key `USER_VERIFICATION` now immediately returns a six-digit login verification code.
- Existing support for sending the text `验证码` to request a code remains available.

### Technical details

- Added XML parsing for WeChat `Event` and `EventKey` fields and handles `CLICK` events.
