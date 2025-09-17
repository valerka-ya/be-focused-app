# Changelog

## 0.1.0 - 2025-09-17

### Added

- FSD instruction: FSD-instruction.md (ignored by git)
- Auth feature: features/auth (hook useAuth, UI AuthForm)
- User entity: entities/user with AppUser and mapper

### Changed

- Reorganized project to Feature-Sliced Design
- Moved Appwrite client to shared/api/appwrite.ts
- Simplified app/auth/page.tsx to render AuthForm

### Removed

- Legacy src/services/appwrite.ts
