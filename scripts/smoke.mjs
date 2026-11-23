#!/usr/bin/env node
// Browser smoke test for the built command center. Needs Playwright:
//   npm i -D playwright && npx playwright install chromium && npm run smoke
// Optional: SMOKE_SHOTS=<dir> saves screenshots; CHROME_PATH=<binary> uses an installed Chrome.
import { createRequire } from 'node:module';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const meta = JSON.parse(readFileSync(join(root, 'src/meta.json'), 'utf8'));
const url = pathToFileURL(join(root, 'dist', `${meta.file}-${meta.version}.html`)).href;
const shots = process.env.SMOKE_SHOTS;
if (shots) { mkdirSync(shots, { recursive: true }); }

const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok, detail: String(detail) }); };

const launch = { headless: true, args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] };
if (process.env.CHROME_PATH) { launch.executablePath = process.env.CHROME_PATH; }
if (process.env.HTTPS_PROXY) { launch.proxy = { server: process.env.HTTPS_PROXY }; }
const browser = await chromium.launch(launch);

async function open(viewport, opts = {}) {
  const ctx = await browser.newContext({ viewport, reducedMotion: opts.reducedMotion || 'no-preference' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') { errors.push(m.text()); } });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()}`));
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(2200);
  return { ctx, page, errors };
}

// ---------------------------------------------------------------- desktop
{
  const { ctx, page, errors } = await open({ width: 1440, height: 900 });
  const libs = await page.evaluate(() => ({ chart: !!window.Chart, three: !!window.THREE && window.THREE.REVISION }));
  check('Chart.js and Three.js r128 loaded from the CDN', libs.chart && libs.three === '128', JSON.stringify(libs));

  const kpis = await page.$$eval('[data-count]', (els) => els.map((e) => [e.textContent, e.getAttribute('data-count')]));
  check('six KPIs counted up to their values', kpis.length === 6 && kpis.every(([a, b]) => a === b), JSON.stringify(kpis));

  check('left nav lists 12 sections in 4 groups', (await page.$$('#nav a[data-sec]')).length === 12 && (await page.$$('#nav .nav-group')).length === 4);
  const rows = await page.$$('#xwTable tbody tr');
  check('crosswalk shows all 57 lines', rows.length === 57, rows.length);

  await page.click('#xwFilters button[data-cat="ai"]');
  check('section filter narrows the crosswalk', (await page.$$('#xwTable tbody tr')).length === 6);
  await page.click('#xwFilters button[data-cat="all"]');
  await page.fill('#xwSearch', 'OAuth');
  const found = (await page.$$('#xwTable tbody tr')).length;
  check('search narrows the crosswalk', found > 0 && found < 57, found);
  await page.fill('#xwSearch', '');

  // modal: nine sections, ESC, focus return
  await page.focus('#xwTable tbody tr:first-child');
  await page.keyboard.press('Enter');
  await page.waitForSelector('#modalBack.open');
  const secs = await page.$$eval('#modalBody .msec h4', (els) => els.map((e) => e.textContent));
  check('modal renders the nine-section template', secs.length === 9 && secs[0].includes('What it is') && secs[8].includes('Future thinking'), secs.join(' | '));
  check('modal jump-nav has nine links', (await page.$$('#modalToc a')).length === 9);
  await page.click('#modalToc a[data-target="msec-future"]');
  await page.waitForTimeout(500);
  if (shots) { await page.screenshot({ path: join(shots, 'modal-dark.png') }); }
  await page.keyboard.press('Escape');
  const afterEsc = await page.evaluate(() => ({ open: document.querySelector('#modalBack').classList.contains('open'), tag: document.activeElement.tagName }));
  check('ESC closes the modal and focus returns to the row', !afterEsc.open && afterEsc.tag === 'TR', JSON.stringify(afterEsc));

  await page.click('#platformGrid [data-open="boomi"]');
  await page.waitForSelector('#modalBack.open');
  check('platform tile opens its detail', (await page.textContent('#modalTitle')).includes('Boomi'));
  await page.mouse.click(5, 450);
  check('backdrop click closes the modal', !(await page.evaluate(() => document.querySelector('#modalBack').classList.contains('open'))));

  // every drill-down opens with nine filled sections
  const drill = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[data-open]')].map((e) => e.getAttribute('data-open'));
    const uniq = [...new Set(ids)];
    const bad = [];
    for (const id of uniq) {
      window.UCS.open(id);
      const n = document.querySelectorAll('#modalBody .msec:not(.na)').length;
      if (n !== 9) { bad.push(`${id}:${n}`); }
      window.UCS.closeModal();
    }
    return { count: uniq.length, bad };
  });
  check('all tiles and rows open a complete detail', drill.count >= 30 && drill.bad.length === 0, JSON.stringify(drill));

  // charts
  const charts = await page.$$eval('.chart-box canvas', (els) => els.map((c) => c.width > 100 && c.height > 100));
  check('three charts rendered', charts.length === 3 && charts.every(Boolean), JSON.stringify(charts));

  // simulator
  await page.click('#simScenarios button[data-i="2"]');
  await page.click('#simRun');
  await page.waitForFunction(() => document.querySelector('#simResult').textContent.startsWith('Stopped'), null, { timeout: 8000 });
  const sim = await page.$$eval('#simSteps .sim-step', (els) => els.map((e) => e.className.replace('sim-step is-', '')));
  check('simulator stops an invalid document before the AI call', sim.join(',') === 'ok,crit,idle,idle,idle,warn', sim.join(','));
  await page.click('#simScenarios button[data-i="1"]');
  await page.click('#simRun');
  await page.waitForFunction(() => document.querySelector('#simResult').textContent.includes('after retry'), null, { timeout: 8000 });
  check('simulator recovers from a rate limit', true);

  // use cases
  await page.click('#ucTabs button[data-i="3"]');
  const uc = await page.textContent('#ucDetail h3');
  check('use-case explorer switches pattern', uc.includes('Knowledge retrieval'), uc);
  check('technique matrix has six rows', (await page.$$('#ucMatrix tbody tr')).length === 6);

  // checklist persistence
  await page.check('#chkGrid input[data-key="0-0"]');
  await page.check('#chkGrid input[data-key="3-1"]');
  check('checklist counts ticks', (await page.textContent('#chkPill')).startsWith('2 of 18'));

  // 3D
  const topo = await page.evaluate(() => ({ canvas: !!document.querySelector('#topo canvas'), labels: document.querySelectorAll('#topo .topo-label').length, info: window.UCS.topology || null }));
  check('3D map rendered with 12 labelled nodes', topo.canvas && topo.labels === 12, JSON.stringify(topo));
  await page.locator('#agentic').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  if (topo.canvas) {
    const r1 = await page.evaluate(() => [...document.querySelectorAll('#topo .topo-label')].find((l) => l.textContent === 'Workday').style.left);
    await page.waitForTimeout(900);
    const r2 = await page.evaluate(() => [...document.querySelectorAll('#topo .topo-label')].find((l) => l.textContent === 'Workday').style.left);
    check('3D map drifts when idle', r1 !== r2, `${r1} -> ${r2}`);
    const hit = await page.evaluate(() => {
      const host = document.querySelector('#topo');
      const lab = [...host.querySelectorAll('.topo-label')].find((l) => l.textContent === 'Agent Control Tower');
      const hr = host.getBoundingClientRect();
      return { x: hr.left + parseFloat(lab.style.left), y: hr.top + parseFloat(lab.style.top) };
    });
    await page.mouse.click(hit.x, hit.y);
    await page.waitForTimeout(300);
    const opened = await page.evaluate(() => document.querySelector('#modalBack').classList.contains('open') && document.querySelector('#modalTitle').textContent);
    check('selecting a 3D node opens its detail', opened === 'Agent Control Tower', opened);
    await page.keyboard.press('Escape');
  }
  if (shots) { await page.screenshot({ path: join(shots, 'agentic-dark.png') }); }

  // theme toggle + persistence
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  if (shots) { await page.screenshot({ path: join(shots, 'desktop-dark.png') }); }
  await page.click('#themeBtn');
  await page.waitForTimeout(600);
  check('theme toggles to light', (await page.getAttribute('html', 'data-theme')) === 'light');
  if (shots) { await page.screenshot({ path: join(shots, 'desktop-light.png') }); await page.locator('#usecases').scrollIntoViewIfNeeded(); await page.waitForTimeout(500); await page.screenshot({ path: join(shots, 'usecases-light.png') }); }
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(1200);
  check('theme persists across reload', (await page.getAttribute('html', 'data-theme')) === 'light');
  check('checklist ticks persist across reload', (await page.textContent('#chkPill')).startsWith('2 of 18'));

  // scroll-spy
  await page.locator('#controls').scrollIntoViewIfNeeded();
  await page.evaluate(() => document.querySelector('#controls').scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(600);
  const active = await page.$eval('#nav a.active', (a) => a.getAttribute('data-sec'));
  check('scroll-spy follows the page', active === 'controls', active);

  check('no console errors on desktop', errors.length === 0, errors.slice(0, 3).join(' | '));
  await ctx.close();
}

// ---------------------------------------------------------------- mobile
{
  const { ctx, page, errors } = await open({ width: 390, height: 844 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('no horizontal overflow on a phone', overflow <= 1, overflow);
  await page.click('#navToggle');
  await page.waitForTimeout(400);
  check('nav opens as a drawer on a phone', await page.evaluate(() => document.body.classList.contains('nav-open')));
  if (shots) { await page.screenshot({ path: join(shots, 'mobile-nav.png') }); }
  await page.click('#nav a[data-sec="simulator"]');
  await page.waitForTimeout(700);
  check('drawer closes after choosing a section', !(await page.evaluate(() => document.body.classList.contains('nav-open'))));
  if (shots) { await page.screenshot({ path: join(shots, 'mobile-simulator.png') }); await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300); await page.screenshot({ path: join(shots, 'mobile-top.png') }); }
  check('no console errors on a phone', errors.length === 0, errors.slice(0, 3).join(' | '));
  await ctx.close();
}

// ---------------------------------------------------------------- reduced motion
{
  const { ctx, page, errors } = await open({ width: 1280, height: 800 }, { reducedMotion: 'reduce' });
  const state = await page.evaluate(() => ({
    kpi: [...document.querySelectorAll('[data-count]')].every((e) => e.textContent === e.getAttribute('data-count')),
    hidden: [...document.querySelectorAll('.reveal')].filter((e) => getComputedStyle(e).opacity !== '1').length
  }));
  check('reduced motion shows a calm, complete page', state.kpi && state.hidden === 0, JSON.stringify(state));
  check('no console errors with reduced motion', errors.length === 0, errors.slice(0, 3).join(' | '));
  await ctx.close();
}

await browser.close();
let failed = 0;
for (const r of results) {
  if (!r.ok) { failed += 1; }
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok || !r.detail ? '' : `  (${r.detail})`}`);
}
console.log(`\nsmoke: ${results.length - failed} of ${results.length} passed`);
process.exit(failed ? 1 : 0);
