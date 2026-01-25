# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2026-01-25

### Added
- **Composable Architecture** - Component-first design for true plug-and-play
- `src/composables/` folder for reusable composition functions
- `src/router/` folder with Vue Router 4 configuration
- Example composable (`useCounter`) demonstrating composition patterns
- Example Pinia store with Composition API
- Home view with project information
- Index files for clean component imports
- Co-located test files with components
- Vitest configuration for testing

### Changed
- **BREAKING**: Project structure now focuses on composability
- `create-component` now creates components with index.js and co-located tests
- `create-module` intelligently creates composables (if name starts with 'use') or Pinia stores
- `create-test` supports both co-located and standalone tests
- Components are now truly plug-and-play with clean imports

### Improved
- Better component organization for reusability
- Cleaner imports using index files: `import Button from '@/components/Button'`
- Tests co-located with components for better maintainability
- Example implementations to guide development
- Enhanced README with composable architecture documentation

## [1.0.3] - 2026-01-25

### Changed
- **Updated all stubs to Vue 3 standards**
- Component stub now uses Composition API with `<script setup>` syntax
- Store stub now uses Pinia instead of Vuex
- Routes stub updated for Vue Router 4 with meta fields and props support
- Test stub now uses Vitest instead of Jest
- Component stub now includes scoped SCSS styles within the .vue file

### Improved
- Components no longer create separate .scss files (styles are scoped in component)
- Test files now use modern Vitest syntax with comprehensive examples
- Store files use Pinia's Composition API pattern
- Better TypeScript compatibility with modern Vue 3 patterns

### Fixed
- Test command now properly passes component name to test template
- Test files now have correct `.spec.js` extension

## [1.0.2] - 2026-01-25

### Changed
- **BREAKING**: Replaced git clone approach with local project generation in `init` command
- `init` command now creates a complete Vue 3 + Vite project structure locally
- Removed dependency on external repository (previously inaccessible)

### Added
- Complete Vue 3 project scaffolding with Vite
- Organized SCSS architecture (abstract, base, components, layout, pages, vendor)
- HTTP utility for API requests
- Pinia state management setup
- Comprehensive project README with structure documentation
- Vite configuration with path aliases and SCSS support

### Improved
- Faster project initialization (no git clone required)
- More reliable initialization process
- Better error handling and user feedback

## [1.0.1] - 2026-01-25

### Added
- Command-line interface for automating development tasks
- `create-component` command for scaffolding components
- `create-module` command for generating modules
- `create-test` command for creating test cases
- `init` command for initializing new projects
- `add-config` command for adding rollup configurations
- `extract-module` command for extracting modules
- `add-linting` command for adding ESLint rules
- Support for standalone components and modules
- Support for global components
- Support for view components

### Documentation
- Comprehensive README with usage examples
- MIT License
- Contributing guidelines

## [1.0.0] - Initial Release

### Added
- Initial release of Genie CLI
