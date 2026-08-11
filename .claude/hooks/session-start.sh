#!/bin/bash
# SessionStart hook for Claude Code on the web.
# Prepares a fresh remote container so tests/linters run without manual setup.
set -euo pipefail

# Only run in the remote (web) environment. Local devs manage their own setup.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"

# 1. Install JS dependencies (Bun workspace monorepo).
bun install

# 2. Build the CLI — integration tests run against packages/cli/dist/.
#    The build script lives in the cli package, not the workspace root.
(cd packages/cli && bun run build)

# 3. Install Deno, required by `exec`/`dev` and their tests.
#    deno.land is blocked by the egress policy, so use the npm-published binary.
export PATH="$HOME/.bun/bin:$PATH"
if ! command -v deno >/dev/null 2>&1; then
  bun add -g deno-bin
fi
# Warm up so the binary is fetched now (cached), not lazily mid-session.
deno --version >/dev/null 2>&1 || true

# 4. Persist the Bun global bin (where Deno lives) on PATH for the session.
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export PATH="$HOME/.bun/bin:$PATH"' >> "$CLAUDE_ENV_FILE"
fi
