# zestful-frontend2

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/mtlynch/zestful-frontend2/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/mtlynch/zestful-frontend2/tree/master)

## Overview

Zestful homepage and demo.

## Dev Setup

```bash
# Optionally update the runtime config used by demo.js.
# (Default is http://localhost:8888)
BACKEND_URL='http://localhost:8888' ./dev-scripts/write-config

# Run the Hugo dev server.
./dev-scripts/serve
```

Open http://localhost:2323/

## Build

```bash
./dev-scripts/build
```

## Netlify

Netlify publishes `public/`. Set `BACKEND_URL` in Netlify, and the build runs
`./dev-scripts/build` and `./dev-scripts/write-config` to generate `/config.json`.

## Live Site

The live version of this project is at:

- https://zestfuldata.com
