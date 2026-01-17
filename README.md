# zestful-frontend2

## Overview

This is the Zestful frontend implemented as a static site (vanilla HTML/CSS/JS).

## Dev Setup

```bash
# Edit the runtime config used by demo.js.
# (Default is http://localhost:8888)
$EDITOR public/config.json

# Serve the static site locally.
python -m http.server 3800 --directory public
```

Open http://localhost:3800/index.html

## Netlify

Netlify publishes `public/`. Set `BACKEND_URL` in Netlify, and the app reads it
at runtime from `/config.json`.

## Live Site

The live version of this project is at:

- https://zestfuldata.com
