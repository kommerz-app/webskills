# Webskills Frontend Libraries

```shell
npm install @webskills/logging
npm install @webskills/ng-components
npm install @webskills/ng-utils
npm install @webskills/ts-utils
```

## Development

This repository uses **pnpm** (version pinned in `package.json#packageManager`). Enable it via
`corepack enable`, then:

```shell
pnpm install
pnpm run prepare   # one-time: installs the husky git hooks
```

The second step is required because `ignoreScripts` is enabled in `pnpm-workspace.yaml`, so no
lifecycle script — including `prepare` — runs during install. That file also sets
`minimumReleaseAge`, which makes pnpm refuse package versions published within the last 4 days.
