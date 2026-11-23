#!/usr/bin/env node
// Pre-ship checks for the built command center. No dependencies.
//   node scripts/check.mjs
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const meta = JSON.parse(readFileSync(join(root, 'src/meta.json'), 'utf8'));
const file = join(root, 'dist', `${meta.file}-${meta.version}.html`);

const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });

if (!existsSync(file)) {
  console.error(`check: ${file} is missing — run "node scripts/build.mjs" first`);
  process.exit(1);
}
const html = readFileSync(file, 'utf8');
const index = readFileSync(join(root, 'index.html'), 'utf8');

// --- single file, CDN only -------------------------------------------------
const CDN = ['cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'unpkg.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
const head = html.slice(0, html.indexOf('</head>'));
const tail = html.slice(html.lastIndexOf('</footer>'));
const assetRefs = [...(head + tail).matchAll(/<(?:script|link)\b[^>]*?\b(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
const badAssets = assetRefs.filter((u) => {
  try { return !CDN.includes(new URL(u).hostname); } catch { return true; }
});
check('external assets load from an approved CDN only', badAssets.length === 0, badAssets.join(', '));
check('index.html matches the dist file', index === html);
check('no network calls to private services', !/\bfetch\s*\(|XMLHttpRequest|WebSocket\s*\(/.test(html));
check('Three.js pinned to r128', /three\.js\/r128\/three\.min\.js/.test(html));

// --- required content --------------------------------------------------------
const need = ['Kenneth P. Barnes', 'UCS Solutions', 'KBarnes@ucsolutions.com', '815-713-4151', '804-356-5505', 'est. 1993'];
const footer = html.slice(html.lastIndexOf('<footer'), html.lastIndexOf('</footer>'));
const missing = need.filter((s) => !footer.includes(s));
check('attribution footer is complete', missing.length === 0, missing.join(', '));
check('version stamp is visible', html.includes(`id="verChip">${meta.version}<`) && footer.includes(meta.version));
check('client name is in the header', /class="hdr-client">Wipro/.test(html));
check('theme toggle and no-flash bootstrap present', html.includes('id="themeBtn"') && head.includes('ucs-boomi-cc-theme'));
check('no placeholder text', !/lorem ipsum|\bTODO\b|\bTBD\b|\{\{|__[A-Z]+__/i.test(html));
const lines = html.split('\n').length;
check('at least 500 lines', lines >= 500, `${lines} lines`);

// --- scripts parse -----------------------------------------------------------
const inline = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
let parseError = '';
for (const code of inline) {
  try { new vm.Script(code); } catch (e) { parseError = String(e.message); }
}
check('inline scripts parse', inline.length >= 3 && !parseError, parseError);

// --- data integrity ----------------------------------------------------------
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(root, 'src/data.js'), 'utf8'), sandbox);
const CC = sandbox.window.CC;
const NINE = ['what', 'how', 'where', 'uses', 'examples', 'deps', 'inter', 'when', 'future'];

const badReq = CC.REQS.filter((r) => r.length < 4 || !CC.CATS[r[0]] || !r[1] || !r[2] || !r[3]);
check('every job-description line has a section, evidence and location', badReq.length === 0, `${badReq.length} incomplete`);
const badTpl = Object.keys(CC.CATS).filter((k) => !CC.CAT_TEMPLATES[k] || ['uses', 'examples', 'deps', 'inter', 'when', 'future'].some((s) => !CC.CAT_TEMPLATES[k][s]));
check('every section has detail templates', badTpl.length === 0, badTpl.join(', '));

const detailed = [...CC.PLATFORMS, ...CC.LIFECYCLE, ...CC.USECASES, ...CC.AGENTIC, ...CC.CONTROLS];
const badModal = detailed.filter((d) => !d.m || NINE.some((k) => !d.m[k])).map((d) => d.id);
check('every drill-down has all nine sections', badModal.length === 0, badModal.join(', '));

const ids = new Set(detailed.map((d) => d.id));
check('drill-down ids are unique', ids.size === detailed.length);
const badRef = CC.TOPO.nodes.filter((n) => !ids.has(n.ref)).map((n) => n.id);
check('3D map nodes link to a drill-down', badRef.length === 0, badRef.join(', '));
const nodeIds = new Set(CC.TOPO.nodes.map((n) => n.id));
const badLink = CC.TOPO.links.filter((l) => !nodeIds.has(l[0]) || !nodeIds.has(l[1]));
check('3D map links join known nodes', badLink.length === 0);
const badTech = CC.USECASES.flatMap((u) => u.tech.filter((t) => !CC.TECHNIQUES.includes(t)));
check('use-case techniques are known', badTech.length === 0, badTech.join(', '));
check('each simulator scenario covers every step', CC.SIMS.every((s) => s.steps.length === CC.SIM_STEPS.length));
check('six AI use cases', CC.USECASES.length === 6);

// --- navigation targets --------------------------------------------------------
const navBlock = html.slice(html.indexOf('var NAV = ['), html.indexOf('(function buildNav()'));
const navIds = [...navBlock.matchAll(/\['([a-z]+)', '[^']+'\]/g)].map((m) => m[1]);
const badNav = navIds.filter((id) => !new RegExp(`<section[^>]*\\bid="${id}"`).test(html));
check('every navigation item has a section', navIds.length >= 6 && badNav.length === 0, badNav.join(', '));

// --- report --------------------------------------------------------------------
let failed = 0;
for (const r of results) {
  if (!r.ok) { failed += 1; }
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? `  (${r.detail})` : ''}`);
}
console.log(`\ncheck: ${results.length - failed} of ${results.length} passed · ${CC.REQS.length} job-description lines · ${detailed.length} drill-downs`);
process.exit(failed ? 1 : 0);
