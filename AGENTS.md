# Workspace AGENTS.md

## Project Structure

This is a pnpm workspace for BetterNCM plugin projects, many of them as git submodules.

- `pnpm-workspace.yaml`: declares workspace packages: `packages/*` and `others/boilerplate`.
- `packages/*`: plugin packages; source code lives in each package's `src/`. Use `ls` other than `rg` when finding plugins, it's token efficient.
  - `manifest.json`: package metadata copied into `dist/` during builds.
  - `preview.png`: plugin preview asset copied into `dist/` when present.
- `others/boilerplate`: reusable example plugin package.
- `scripts/`: shared workspace scripts, including build post-processing and plugin apply helpers.
- `types/`: shared BetterNCM and global declaration files.
- `external/js-framework/`: BetterNCM framework submodule.

## Commands

- `pnpm install`: install workspace dependencies using the pinned pnpm version.
- `pnpm run lint`: run ESLint across the workspace.
- `pnpm run lint:fix`: apply safe ESLint fixes.
- `pnpm run format`: format files with Prettier.
- `pnpm run check`: run each package `check` script, then `tsc -b --noEmit`.
- `pnpm run test`: run Vitest once.
- `pnpm run test:watch`: run Vitest in watch mode.
- `pnpm run test:coverage`: generate V8 coverage reports in `coverage/`.
- `pnpm --filter <package-name> run build`: build one plugin, for example `pnpm --filter better-ncm-6k-labs run build`.
- `pnpm --filter <package-name> run apply`: copy a built plugin into `BETTERNCM_PROFILE` or `C:\betterncm`.

## Rules

- Keep `AGENTS.md`s updated (including sub-projects) when you make changes.
- If you need BetterNCM framework source, keep it at `private/references/BetterNCM`: make a depth-1 clone of `std-microblock/chromatic` with branch `v2` when missing.
- If you need InfLink-rs source, keep it at `private/references/inflink-rs`: make a depth-1 clone of `apoint123/inflink-rs` when missing.

## Commit

Use English conventional commit messages:

```text
type(optional scope): description

- List of change descriptions, focus one point per row

Optional footer(s)
```
