# Wipro · Boomi AI & Intelligent Integration Command Center

Command center for the Wipro role **Boomi Developer – AI & Intelligent Integration**, prepared by Kenneth P. Barnes (UCS Solutions).

| What | Where |
|---|---|
| Command center, one self-contained HTML file | `dist/Wipro-Boomi-AI-Intelligent-Integration-CommandCenter-v1.html` (same file as `index.html`) |
| Sources the command center is built from | `src/` |

Open the HTML file in any modern browser. There is nothing to install and no server.

## What the command center shows

- **JD crosswalk** — all 57 lines of the posting mapped to evidence, filterable and searchable
- **Platforms** — Boomi, MuleSoft, Apigee and the AI services the role connects them to
- **Delivery lifecycle** — design, build, test, deploy, hand over, improve
- **Error-handling simulator** — an AI-enabled integration run under five conditions
- **Deployment checklist** — the six areas the posting names, tickable, copy as Markdown
- **Six AI integration patterns** — flow, Boomi building blocks, controls and an example request for each
- **Agentic integration** — a 3D map and detail on Boomi Agentstudio, Agent Control Tower, MCP Registry, Boomi Companion, MuleSoft Agent Fabric, Apigee AI gateway, MCP and A2A
- **Controls** — AI security, privacy, access, hallucination management, responsible AI, token and cost governance
- **First 90 days**, **interview questions**, **sources**

Every tile, row and 3D node opens a nine-part detail: what it is, how it works, where used, use cases, examples, dependencies, interdependencies, when to use, future thinking. Dark and light themes; the choice is remembered in the browser.

## Build

Needs Node 18 or later. No packages to install.

```bash
npm run build    # src/ -> dist/…-v1.html and index.html
npm run check    # 21 pre-ship checks
npm test         # build, then check
```

`scripts/build.mjs` inlines `src/styles.css`, `src/data.js` and `src/app.js` into `src/index.template.html`. Version and date come from `src/meta.json`; to cut v2, change them there and rebuild.

The browser test is optional and needs Playwright:

```bash
npm i -D playwright && npx playwright install chromium
npm run smoke    # 32 checks: desktop, phone, reduced motion
```

GitHub Actions runs the build and the checks on every push (`.github/workflows/build.yml`).

## Editing content

All text lives in `src/data.js`: job-description lines and evidence (`REQS`), platforms, lifecycle steps, AI use cases, agentic items, controls, simulator scenarios, checklist, plan, interview questions and sources. Change it there, then `npm test`.

## Notes on the content

- Evidence statements are taken from the candidate resume, which is kept outside this repository. One line is flagged **Verify**: the posting names the Boomi Professional Developer certification, and the resume states Boomi certification without the certificate title and ID.
- Platform statements for 2026 come from the vendor pages listed under Sources in the command center.
- Flows, payloads and simulator results are illustrative. No client data is used.
- Chart.js 4.4.1 and Three.js r128 load from cdnjs; fonts from Google Fonts. If a CDN is unreachable the page still works, with tables and a node list in place of the charts and the 3D map.

Kenneth P. Barnes · UCS Solutions (Ultimate Computer Solutions, Inc.) · est. 1993 · KBarnes@ucsolutions.com
