/* UCS Command Center runtime — theme, nav, KPIs, 9-section modals, charts, simulator, checklist, 3D map. */
(function () {
  'use strict';

  var CC = window.CC;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var THEME_KEY = 'ucs-boomi-cc-theme';
  var CHK_KEY = 'ucs-boomi-cc-checklist';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* private mode or blocked */ } }
  };
  function bindOpen(el, fn) {
    el.addEventListener('click', fn);
    el.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); fn(ev); }
    });
  }

  /* ------------------------------------------------------------------ modal */
  var SECTION_DEFS = [
    ['what', 'What it is'], ['how', 'How it works'], ['where', 'Where used'], ['uses', 'Use cases'], ['examples', 'Examples'],
    ['deps', 'Dependencies'], ['inter', 'Interdependencies'], ['when', 'When to use'], ['future', 'Future thinking']
  ];
  var lastFocus = null;
  var back = $('#modalBack');

  function openModal(o) {
    lastFocus = document.activeElement;
    $('#modalKicker').textContent = o.kicker || '';
    $('#modalTitle').textContent = o.title || '';
    $('#modalSub').textContent = o.sub || '';
    var toc = '';
    var body = '';
    SECTION_DEFS.forEach(function (d, i) {
      var v = o.sections && o.sections[d[0]];
      toc += '<a href="#msec-' + d[0] + '" data-target="msec-' + d[0] + '">' + (i + 1) + ' · ' + d[1] + '</a>';
      body += '<div class="msec' + (v ? '' : ' na') + '" id="msec-' + d[0] + '"><h4>' + (i + 1) + ' · ' + d[1] + '</h4><p>' +
        esc(v || 'Not applicable for this layer.') + '</p></div>';
    });
    $('#modalToc').innerHTML = toc;
    $('#modalBody').innerHTML = body;
    back.classList.add('open');
    back.setAttribute('aria-hidden', 'false');
    back.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    $('#modalClose').focus();
  }
  function closeModal() {
    if (!back.classList.contains('open')) { return; }
    back.classList.remove('open');
    back.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
  }
  $('#modalClose').addEventListener('click', closeModal);
  back.addEventListener('mousedown', function (ev) { if (ev.target === back) { closeModal(); } });
  $('#modalToc').addEventListener('click', function (ev) {
    var a = ev.target.closest('a[data-target]');
    if (!a) { return; }
    ev.preventDefault();
    var t = document.getElementById(a.getAttribute('data-target'));
    if (t) { t.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' }); }
  });
  document.addEventListener('keydown', function (ev) {
    if (!back.classList.contains('open')) { return; }
    if (ev.key === 'Escape') { closeModal(); return; }
    if (ev.key === 'Tab') {
      var f = $$('a[href], button:not([disabled])', $('#modal'));
      if (!f.length) { return; }
      var first = f[0];
      var last = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
    }
  });

  /* registry so any element (tile, row, 3D node) can open a detail by id */
  var REG = {};
  function register(id, kicker, title, sub, m) {
    REG[id] = function () { openModal({ kicker: kicker, title: title, sub: sub, sections: m }); };
    return REG[id];
  }
  window.UCS = { openModal: openModal, closeModal: closeModal, open: function (id) { if (REG[id]) { REG[id](); } } };

  /* ------------------------------------------------------------------ theme */
  var themeListeners = [];
  function currentTheme() { return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
  function paintThemeBtn() { $('#themeBtn').textContent = currentTheme() === 'dark' ? '☾ Dark' : '☀ Light'; }
  $('#themeBtn').addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    store.set(THEME_KEY, next);
    paintThemeBtn();
    themeListeners.forEach(function (fn) { fn(next); });
  });
  paintThemeBtn();

  /* ------------------------------------------------------------------ nav */
  var NAV = [
    ['Overview', [['overview', 'Role and fit'], ['crosswalk', 'JD crosswalk']]],
    ['Delivery', [['platforms', 'Platforms'], ['lifecycle', 'Delivery lifecycle'], ['simulator', 'Error-handling simulator'], ['checklist', 'Deployment checklist']]],
    ['AI and agents', [['usecases', 'AI integration patterns'], ['agentic', 'Agentic integration'], ['controls', 'Controls']]],
    ['Pursuit', [['plan', 'First 90 days'], ['interview', 'Interview questions'], ['sources', 'Sources and method']]]
  ];
  (function buildNav() {
    var nav = $('#nav');
    var html = '';
    NAV.forEach(function (g, gi) {
      html += '<div class="nav-group" aria-expanded="true"><button type="button" aria-controls="navg' + gi + '">' + esc(g[0]) + '</button><div class="nav-items" id="navg' + gi + '">';
      g[1].forEach(function (it) {
        html += '<a href="#' + it[0] + '" data-sec="' + it[0] + '"><span class="nav-dot"></span>' + esc(it[1]) + '</a>';
      });
      html += '</div></div>';
    });
    nav.innerHTML = html;
    $$('.nav-group > button', nav).forEach(function (b) {
      b.addEventListener('click', function () {
        var g = b.parentNode;
        g.setAttribute('aria-expanded', g.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
      });
    });
    function setDrawer(open) {
      document.body.classList.toggle('nav-open', open);
      $('#navToggle').setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    $('#navToggle').addEventListener('click', function () { setDrawer(!document.body.classList.contains('nav-open')); });
    $('#scrim').addEventListener('click', function () { setDrawer(false); });
    nav.addEventListener('click', function (ev) { if (ev.target.closest('a')) { setDrawer(false); } });

    var links = {};
    $$('a[data-sec]', nav).forEach(function (a) { links[a.getAttribute('data-sec')] = a; });
    function activate(id) {
      Object.keys(links).forEach(function (k) { links[k].classList.toggle('active', k === id); });
      if (links[id]) { links[id].closest('.nav-group').setAttribute('aria-expanded', 'true'); }
    }
    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { activate(e.target.id); } });
      }, { rootMargin: '-18% 0px -72% 0px', threshold: 0 });
      Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) { spy.observe(s); } });
    }
    activate('overview');
  })();

  /* ------------------------------------------------------------------ KPIs */
  var TOTAL = CC.REQS.length;
  var VERIFY = CC.REQS.filter(function (r) { return r[4] === 'verify'; }).length;
  (function buildKpis() {
    var K = [
      { n: 8, suf: ' yrs', label: 'Boomi · MuleSoft · Apigee', sub: 'Role asks 3+ years of Boomi', pct: 100, mark: 37.5 },
      { n: 30, suf: '+ yrs', label: 'Integration and application development', sub: 'Role asks 5–8 years', pct: 100, mark: 26.7 },
      { n: TOTAL, suf: '/' + TOTAL, label: 'Job-description lines mapped', sub: VERIFY + ' to verify before submission', pct: Math.round((TOTAL - VERIFY) / TOTAL * 100) },
      { n: CC.USECASES.length, suf: '/6', label: 'AI use cases with a reference pattern', sub: 'All six named in the role', pct: 100 },
      { n: 5, suf: '/5', label: 'Responsibility areas covered', sub: 'Design · test · deploy · AI · knowledge', pct: 100 },
      { n: 400, suf: '+', label: 'Enterprise engagements', sub: 'UCS Solutions, since 1993' }
    ];
    $('#kpis').innerHTML = K.map(function (k) {
      return '<div class="kpi glass reveal"><div class="kpi-val"><span data-count="' + k.n + '">0</span><small>' + esc(k.suf) + '</small></div>' +
        '<div class="kpi-label">' + esc(k.label) + '</div><div class="kpi-sub">' + esc(k.sub) + '</div>' +
        (k.pct === undefined ? '' : '<div class="bar" aria-hidden="true"><i data-pct="' + k.pct + '"></i>' +
          (k.mark ? '<b style="left:' + k.mark + '%" title="Asked"></b>' : '') + '</div>') + '</div>';
    }).join('');
    function finish() {
      $$('[data-count]').forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
      $$('.bar > i[data-pct]').forEach(function (el) { el.style.width = el.getAttribute('data-pct') + '%'; });
    }
    if (REDUCED) { finish(); return; }
    $$('[data-count]').forEach(function (el) {
      var to = +el.getAttribute('data-count');
      var t0 = null;
      function frame(ts) {
        if (t0 === null) { t0 = ts; }
        var p = Math.min(1, (ts - t0) / 1100);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) { window.requestAnimationFrame(frame); }
      }
      window.requestAnimationFrame(frame);
    });
    window.setTimeout(function () {
      $$('.bar > i[data-pct]').forEach(function (el) { el.style.width = el.getAttribute('data-pct') + '%'; });
    }, 120);
    window.setTimeout(finish, 1700); /* background tabs do not fire animation frames */
  })();

  /* ------------------------------------------------------------------ crosswalk */
  (function buildCrosswalk() {
    var cat = 'all';
    var query = '';
    var tbody = $('#xwTable tbody');
    var filters = $('#xwFilters');
    var cats = [['all', 'All sections']].concat(Object.keys(CC.CATS).map(function (k) { return [k, CC.CATS[k]]; }));
    filters.innerHTML = cats.map(function (c) {
      var n = c[0] === 'all' ? TOTAL : CC.REQS.filter(function (r) { return r[0] === c[0]; }).length;
      return '<button type="button" class="fbtn" data-cat="' + c[0] + '" aria-pressed="' + (c[0] === 'all') + '">' + esc(c[1]) + ' · ' + n + '</button>';
    }).join('');
    $('#xwCount').textContent = (TOTAL - VERIFY) + ' of ' + TOTAL + ' mapped';
    $('#xwVerify').textContent = VERIFY + ' to verify';
    if (!VERIFY) { $('#xwVerify').hidden = true; }

    CC.REQS.forEach(function (r, i) {
      var t = CC.CAT_TEMPLATES[r[0]];
      register('req-' + i, CC.CATS[r[0]], r[1], r[4] === 'verify' ? 'Status: verify before submission' : 'Status: mapped to evidence', {
        what: 'A line from the "' + CC.CATS[r[0]] + '" part of the job description: ' + r[1],
        how: r[2], where: r[3], uses: t.uses, examples: t.examples, deps: t.deps, inter: t.inter, when: t.when, future: t.future
      });
    });

    function draw() {
      var q = query.toLowerCase();
      var html = '';
      CC.REQS.forEach(function (r, i) {
        if (cat !== 'all' && r[0] !== cat) { return; }
        if (q && (r[1] + ' ' + r[2] + ' ' + r[3]).toLowerCase().indexOf(q) === -1) { return; }
        var ver = r[4] === 'verify';
        html += '<tr class="rowlink" tabindex="0" role="button" data-id="req-' + i + '"><td class="cat">' + esc(CC.CATS[r[0]]) + '</td><td>' + esc(r[1]) +
          '</td><td class="dim">' + esc(r[2]) + '</td><td><span class="pill ' + (ver ? 'warn' : 'ok') + '">' + (ver ? 'Verify' : 'Mapped') + '</span></td></tr>';
      });
      tbody.innerHTML = html;
      $('#xwEmpty').hidden = !!html;
    }
    filters.addEventListener('click', function (ev) {
      var b = ev.target.closest('button[data-cat]');
      if (!b) { return; }
      cat = b.getAttribute('data-cat');
      $$('button', filters).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      draw();
    });
    $('#xwSearch').addEventListener('input', function (ev) { query = ev.target.value.trim(); draw(); });
    function rowOpen(ev) {
      var tr = ev.target.closest('tr[data-id]');
      if (tr) { window.UCS.open(tr.getAttribute('data-id')); }
    }
    tbody.addEventListener('click', rowOpen);
    tbody.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); rowOpen(ev); }
    });
    draw();
  })();

  /* ------------------------------------------------------------------ tiles */
  function tile(cls, id, inner) {
    return '<div class="card clickable ' + cls + '" role="button" tabindex="0" data-open="' + id + '">' + inner + '<span class="more">Open detail →</span></div>';
  }
  function wireTiles(root) {
    $$('[data-open]', root).forEach(function (el) {
      bindOpen(el, function () { window.UCS.open(el.getAttribute('data-open')); });
    });
  }

  (function buildPlatforms() {
    $('#platformGrid').innerHTML = CC.PLATFORMS.map(function (p) {
      register(p.id, 'Platform', p.name, p.tag + ' · ' + p.years, p.m);
      return tile('c3', p.id, '<h3>' + esc(p.name) + '</h3><p class="note">' + esc(p.tag) + '</p><p><span class="pill ok">' + esc(p.years) + '</span></p>' +
        '<div class="tags">' + p.caps.map(function (c) { return '<span class="tag">' + esc(c) + '</span>'; }).join('') + '</div>');
    }).join('');
    wireTiles($('#platformGrid'));
  })();

  (function buildLifecycle() {
    $('#lifecycleSteps').innerHTML = CC.LIFECYCLE.map(function (s) {
      register(s.id, 'Delivery lifecycle', s.name, s.line, s.m);
      return '<div class="card step clickable" role="button" tabindex="0" data-open="' + s.id + '"><h3>' + esc(s.name) + '</h3><p>' + esc(s.line) + '</p><span class="more">Open detail →</span></div>';
    }).join('');
    wireTiles($('#lifecycleSteps'));
  })();

  (function buildAgentic() {
    $('#agenticGrid').innerHTML = CC.AGENTIC.map(function (a) {
      register(a.id, 'Agentic integration · ' + a.vendor, a.name, a.line, a.m);
      return tile('c3', a.id, '<p class="note">' + esc(a.vendor) + '</p><h3>' + esc(a.name) + '</h3><p>' + esc(a.line) + '</p>');
    }).join('');
    wireTiles($('#agenticGrid'));
  })();

  (function buildControls() {
    var tb = $('#ctlTable tbody');
    tb.innerHTML = CC.CONTROLS.map(function (c) {
      register(c.id, 'Enterprise AI control', c.name, c.fw, c.m);
      return '<tr class="rowlink" tabindex="0" role="button" data-open="' + c.id + '"><td><strong>' + esc(c.name) + '</strong></td><td class="dim">' + esc(c.risk) +
        '</td><td>' + esc(c.layer) + '</td><td class="dim">' + esc(c.fw) + '</td></tr>';
    }).join('');
    wireTiles(tb);
  })();

  /* ------------------------------------------------------------------ AI use cases */
  (function buildUseCases() {
    var tabs = $('#ucTabs');
    var detail = $('#ucDetail');
    CC.USECASES.forEach(function (u) { register(u.id, 'AI integration pattern', u.name, u.line, u.m); });
    tabs.innerHTML = CC.USECASES.map(function (u, i) {
      return '<button type="button" class="fbtn" role="tab" data-i="' + i + '" aria-selected="' + (i === 0) + '" aria-pressed="' + (i === 0) + '">' + esc(u.name) + '</button>';
    }).join('');
    function show(i) {
      var u = CC.USECASES[i];
      var flow = u.flow.map(function (n, k) {
        return (k ? '<span class="flow-arrow" aria-hidden="true">→</span>' : '') + '<div class="flow-node ' + n[2] + '"><b>' + esc(n[0]) + '</b><span>' + esc(n[1]) + '</span></div>';
      }).join('');
      detail.innerHTML = '<h3>' + esc(u.name) + '</h3><p class="sec-lede" style="margin-bottom:4px">' + esc(u.line) + '</p>' +
        '<div class="flow" aria-label="Flow">' + flow + '</div>' +
        '<div class="grid"><div class="c4"><h4>Boomi building blocks</h4><ul class="tight">' + u.blocks.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="c4"><h4>Controls</h4><ul class="tight">' + u.controls.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' +
        '<h4>Techniques</h4><div class="tags">' + u.tech.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div></div>' +
        '<div class="c4"><h4>Example request (illustrative)</h4><pre class="code">' + esc(u.payload) + '</pre></div></div>' +
        '<p style="margin:12px 0 0"><button type="button" class="btn" data-open="' + u.id + '">Open nine-part detail</button></p>';
      wireTiles(detail);
      $$('button', tabs).forEach(function (b, k) {
        b.setAttribute('aria-selected', k === i ? 'true' : 'false');
        b.setAttribute('aria-pressed', k === i ? 'true' : 'false');
      });
    }
    tabs.addEventListener('click', function (ev) {
      var b = ev.target.closest('button[data-i]');
      if (b) { show(+b.getAttribute('data-i')); }
    });
    show(0);

    var head = '<thead><tr><th>Use case</th>' + CC.TECHNIQUES.map(function (t) { return '<th class="rot">' + esc(t) + '</th>'; }).join('') + '</tr></thead>';
    var rows = CC.USECASES.map(function (u) {
      return '<tr class="rowlink" tabindex="0" role="button" data-open="' + u.id + '"><td>' + esc(u.name) + '</td>' + CC.TECHNIQUES.map(function (t) {
        var hit = u.tech.indexOf(t) !== -1;
        return '<td class="' + (hit ? 'hit' : 'miss') + '">' + (hit ? '✓' : '·') + '</td>';
      }).join('') + '</tr>';
    }).join('');
    $('#ucMatrix').innerHTML = head + '<tbody>' + rows + '</tbody>';
    wireTiles($('#ucMatrix'));
  })();

  /* ------------------------------------------------------------------ charts */
  var charts = {};
  function buildCharts() {
    if (!window.Chart) {
      $$('.chart-box').forEach(function (b) {
        b.innerHTML = '<div class="chart-fallback">The chart library did not load (it comes from a CDN). The tables on this page carry the same figures.</div>';
      });
      return;
    }
    Object.keys(charts).forEach(function (k) { charts[k].destroy(); });
    charts = {};
    var C = window.Chart;
    var text = cssVar('--text-dim');
    var grid = cssVar('--border');
    var a = cssVar('--accent');
    var b = cssVar('--accent-2');
    var c = cssVar('--accent-3');
    var w = cssVar('--warn');
    C.defaults.color = text;
    C.defaults.borderColor = grid;
    C.defaults.font.family = 'Inter, system-ui, sans-serif';
    C.defaults.font.size = 12;
    var anim = REDUCED ? false : { duration: 900 };
    var legend = { position: 'bottom', labels: { boxWidth: 12, color: text } };
    function axis(extra) {
      var o = { grid: { color: grid }, ticks: { color: text } };
      Object.keys(extra || {}).forEach(function (k) { o[k] = extra[k]; });
      return o;
    }

    var keys = Object.keys(CC.CATS);
    var mapped = keys.map(function (k) { return CC.REQS.filter(function (r) { return r[0] === k && r[4] !== 'verify'; }).length; });
    var verify = keys.map(function (k) { return CC.REQS.filter(function (r) { return r[0] === k && r[4] === 'verify'; }).length; });
    charts.coverage = new C($('#chartCoverage'), {
      type: 'bar',
      data: { labels: keys.map(function (k) { return CC.CATS[k]; }), datasets: [
        { label: 'Mapped to evidence', data: mapped, backgroundColor: a, borderRadius: 5 },
        { label: 'Verify before submission', data: verify, backgroundColor: w, borderRadius: 5 }] },
      options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, animation: anim, plugins: { legend: legend },
        scales: { x: axis({ stacked: true, beginAtZero: true, ticks: { color: text, precision: 0 } }), y: axis({ stacked: true, grid: { display: false } }) } }
    });

    charts.experience = new C($('#chartExperience'), {
      type: 'bar',
      data: { labels: ['Overall integration / application development', 'Hands-on Boomi'], datasets: [
        { label: 'Asked (upper end)', data: [8, 3], backgroundColor: w, borderRadius: 5 },
        { label: 'Offered', data: [30, 8], backgroundColor: c, borderRadius: 5 }] },
      options: { responsive: true, maintainAspectRatio: false, animation: anim, plugins: { legend: legend },
        scales: { x: axis({ grid: { display: false } }), y: axis({ beginAtZero: true, title: { display: true, text: 'Years', color: text } }) } }
    });

    charts.tech = new C($('#chartTech'), {
      type: 'bar',
      data: { labels: CC.TECHNIQUES, datasets: [{ label: 'Use cases using it (of 6)',
        data: CC.TECHNIQUES.map(function (t) { return CC.USECASES.filter(function (u) { return u.tech.indexOf(t) !== -1; }).length; }),
        backgroundColor: b, borderRadius: 5 }] },
      options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, animation: anim, plugins: { legend: legend },
        scales: { x: axis({ beginAtZero: true, max: 6, ticks: { color: text, precision: 0 } }), y: axis({ grid: { display: false } }) } }
    });
  }
  buildCharts();
  themeListeners.push(buildCharts);

  /* ------------------------------------------------------------------ simulator */
  (function buildSimulator() {
    var sel = 0;
    var timers = [];
    var LABEL = { ok: 'Passed', warn: 'Handled', crit: 'Failed', idle: 'Skipped', run: 'Running' };
    var box = $('#simSteps');
    var log = $('#simLog');
    var result = $('#simResult');
    var scen = $('#simScenarios');
    scen.innerHTML = CC.SIMS.map(function (s, i) {
      return '<button type="button" class="fbtn" data-i="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(s.name) + '</button>';
    }).join('');
    function reset() {
      timers.forEach(window.clearTimeout);
      timers = [];
      box.innerHTML = CC.SIM_STEPS.map(function (n) {
        return '<div class="sim-step"><b>' + esc(n) + '</b><span class="pill idle">Waiting</span><small></small></div>';
      }).join('');
      log.textContent = 'Scenario: ' + CC.SIMS[sel].name + '. Select Run scenario.';
      result.className = 'pill idle';
      result.textContent = 'Not run';
      $('#simRun').disabled = false;
    }
    function setStep(i, status, msg) {
      var el = box.children[i];
      el.className = 'sim-step is-' + status;
      var pill = $('.pill', el);
      pill.className = 'pill ' + status;
      pill.textContent = LABEL[status];
      $('small', el).textContent = msg || '';
    }
    function run() {
      reset();
      var s = CC.SIMS[sel];
      var gap = REDUCED ? 0 : 620;
      var lines = ['Scenario: ' + s.name];
      $('#simRun').disabled = true;
      result.className = 'pill run';
      result.textContent = 'Running';
      s.steps.forEach(function (st, i) {
        timers.push(window.setTimeout(function () { setStep(i, 'run', ''); }, i * gap));
        timers.push(window.setTimeout(function () {
          setStep(i, st[0], st[1]);
          lines.push('[' + (i + 1) + '] ' + CC.SIM_STEPS[i] + ' — ' + LABEL[st[0]].toUpperCase() + ': ' + st[1]);
          log.textContent = lines.join('\n');
          if (i === s.steps.length - 1) {
            result.className = 'pill ' + s.result[0];
            result.textContent = s.result[1];
            lines.push('Result: ' + s.result[1]);
            log.textContent = lines.join('\n');
            $('#simRun').disabled = false;
          }
        }, i * gap + gap * 0.6));
      });
    }
    scen.addEventListener('click', function (ev) {
      var b = ev.target.closest('button[data-i]');
      if (!b) { return; }
      sel = +b.getAttribute('data-i');
      $$('button', scen).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      reset();
    });
    $('#simRun').addEventListener('click', run);
    $('#simReset').addEventListener('click', reset);
    reset();
  })();

  /* ------------------------------------------------------------------ checklist */
  (function buildChecklist() {
    var state = {};
    try { state = JSON.parse(store.get(CHK_KEY) || '{}') || {}; } catch (e) { state = {}; }
    var grid = $('#chkGrid');
    var total = 0;
    grid.innerHTML = CC.CHECKLIST.map(function (g, gi) {
      return '<div class="card c4 chk-group"><h3>' + esc(g[0]) + '</h3>' + g[1].map(function (it, ii) {
        total += 1;
        var key = gi + '-' + ii;
        return '<label class="chk-item' + (state[key] ? ' done' : '') + '"><input type="checkbox" data-key="' + key + '"' + (state[key] ? ' checked' : '') + '><span>' + esc(it) + '</span></label>';
      }).join('') + '</div>';
    }).join('');
    function paint() {
      var done = $$('input:checked', grid).length;
      var pill = $('#chkPill');
      pill.textContent = done + ' of ' + total + ' complete';
      pill.className = 'pill ' + (done === total ? 'ok' : (done ? 'warn' : 'idle'));
      $('#chkBar').style.width = Math.round(done / total * 100) + '%';
    }
    grid.addEventListener('change', function (ev) {
      var cb = ev.target;
      if (!cb.matches('input[data-key]')) { return; }
      state[cb.getAttribute('data-key')] = cb.checked;
      cb.parentNode.classList.toggle('done', cb.checked);
      store.set(CHK_KEY, JSON.stringify(state));
      paint();
    });
    $('#chkReset').addEventListener('click', function () {
      state = {};
      store.set(CHK_KEY, '{}');
      $$('input', grid).forEach(function (cb) { cb.checked = false; cb.parentNode.classList.remove('done'); });
      $('#chkMsg').textContent = 'Cleared.';
      paint();
    });
    $('#chkCopy').addEventListener('click', function () {
      var md = '# Deployment checklist\n\n' + CC.CHECKLIST.map(function (g, gi) {
        return '## ' + g[0] + '\n' + g[1].map(function (it, ii) { return '- [' + (state[gi + '-' + ii] ? 'x' : ' ') + '] ' + it; }).join('\n');
      }).join('\n\n') + '\n';
      var msg = $('#chkMsg');
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = md;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        msg.textContent = ok ? 'Copied as Markdown.' : 'Copy is blocked in this browser.';
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(md).then(function () { msg.textContent = 'Copied as Markdown.'; }, fallback);
      } else { fallback(); }
    });
    paint();
  })();

  /* ------------------------------------------------------------------ plan, Q&A, sources */
  $('#planGrid').innerHTML = CC.PLAN.map(function (p) {
    return '<div class="card"><div class="sec-kicker">' + esc(p[0]) + '</div><h3 style="margin-top:4px">' + esc(p[1]) + '</h3><ul class="tight">' +
      p[2].map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
  }).join('');
  $('#qaList').innerHTML = CC.QA.map(function (q) {
    return '<details class="qa"><summary>' + esc(q[0]) + '</summary><div class="qa-body">' + esc(q[1]) + '</div></details>';
  }).join('');
  $('#srcList').innerHTML = CC.SOURCES.map(function (s) {
    return '<li><a href="' + esc(s[1]) + '" target="_blank" rel="noopener noreferrer">' + esc(s[0]) + '</a></li>';
  }).join('');

  /* ------------------------------------------------------------------ 3D topology (Three.js r128) */
  (function buildTopology() {
    var host = $('#topo');
    var T = CC.TOPO;
    $('#topoLegend').innerHTML = Object.keys(T.kinds).map(function (k) {
      return '<span><i style="background:' + T.kinds[k][1] + '"></i>' + esc(T.kinds[k][0]) + '</span>';
    }).join('');

    function fallback() {
      host.style.height = 'auto';
      host.style.cursor = 'default';
      host.innerHTML = '<div style="padding:16px"><p class="note">The 3D map needs WebGL and the Three.js CDN. The same nodes are listed here.</p><div class="tags">' +
        T.nodes.map(function (n) {
          return '<span class="tag clickable" style="width:auto;display:inline-block" role="button" tabindex="0" data-open="' + n.ref + '">' + esc(n.label) + '</span>';
        }).join('') + '</div></div>';
      wireTiles(host);
    }
    if (!window.THREE) { fallback(); return; }
    var THREE = window.THREE;
    var renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { fallback(); return; }
    if (!renderer.getContext()) { fallback(); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    host.insertBefore(renderer.domElement, host.firstChild);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    var CAM = new THREE.Vector3(0, 9.4, 11.6);
    camera.position.copy(CAM);
    camera.lookAt(0, -1.3, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    var sun = new THREE.DirectionalLight(0xffffff, 0.75);
    sun.position.set(4, 8, 6);
    scene.add(sun);
    var group = new THREE.Group();
    scene.add(group);

    var radii = [0, 3.0, 5.6];
    var heights = [2.2, 0.3, -0.6];
    var sizes = [0.56, 0.42, 0.34];
    var byRing = {};
    T.nodes.forEach(function (n) { (byRing[n.ring] = byRing[n.ring] || []).push(n); });
    var pos = {};
    var meshes = [];
    var labels = [];
    Object.keys(byRing).forEach(function (r) {
      byRing[r].forEach(function (n, i) {
        var ang = (i / byRing[r].length) * Math.PI * 2 + (+r === 2 ? 0.35 : 0.9);
        pos[n.id] = new THREE.Vector3(Math.cos(ang) * radii[r], heights[r], Math.sin(ang) * radii[r]);
        var col = new THREE.Color(T.kinds[n.kind][1]);
        var mesh = new THREE.Mesh(new THREE.SphereGeometry(sizes[r], 28, 20),
          new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.32, roughness: 0.38, metalness: 0.15 }));
        mesh.position.copy(pos[n.id]);
        mesh.userData = n;
        group.add(mesh);
        meshes.push(mesh);
        var lab = document.createElement('div');
        lab.className = 'topo-label';
        lab.textContent = n.label;
        host.appendChild(lab);
        labels.push([lab, mesh]);
      });
    });
    var lineMat = new THREE.LineBasicMaterial({ color: new THREE.Color(cssVar('--text-faint') || '#7f8db0'), transparent: true, opacity: 0.55 });
    T.links.forEach(function (l) {
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([pos[l[0]], pos[l[1]]]), lineMat));
    });
    var ringMat = new THREE.LineBasicMaterial({ color: new THREE.Color(cssVar('--text-faint') || '#7f8db0'), transparent: true, opacity: 0.22 });
    [1, 2].forEach(function (r) {
      var pts = [];
      for (var k = 0; k <= 96; k += 1) {
        var t = (k / 96) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(t) * radii[r], heights[r], Math.sin(t) * radii[r]));
      }
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat));
    });
    themeListeners.push(function () {
      lineMat.color.set(cssVar('--text-faint') || '#7f8db0');
      ringMat.color.set(cssVar('--text-faint') || '#7f8db0');
    });

    var W = 0;
    var H = 0;
    var v = new THREE.Vector3();
    var ready = false;
    function resize() {
      W = host.clientWidth;
      H = host.clientHeight;
      if (!W || !H) { return; }
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.position.copy(CAM).multiplyScalar(W < 560 ? 1.6 : (W < 900 ? 1.2 : 1));
      camera.lookAt(0, -1.3, 0);
      camera.updateProjectionMatrix();
      if (ready && REDUCED) { draw(); }
    }
    resize();
    if ('ResizeObserver' in window) { new ResizeObserver(resize).observe(host); } else { window.addEventListener('resize', resize); }

    function draw() {
      renderer.render(scene, camera);
      labels.forEach(function (pair) {
        pair[1].getWorldPosition(v);
        var far = camera.position.distanceTo(v) > camera.position.length() + 1.2;
        v.project(camera);
        pair[0].style.left = ((v.x * 0.5 + 0.5) * W) + 'px';
        pair[0].style.top = ((-v.y * 0.5 + 0.5) * H) + 'px';
        pair[0].style.zIndex = String(Math.round((1 - v.z) * 1000));
        pair[0].style.opacity = far ? (W < 560 ? '0' : '0.5') : '0.96';
      });
    }

    var dragging = false;
    var moved = 0;
    var px = 0;
    var py = 0;
    var visible = true;
    host.addEventListener('pointerdown', function (ev) {
      dragging = true; moved = 0; px = ev.clientX; py = ev.clientY;
      if (host.setPointerCapture) { try { host.setPointerCapture(ev.pointerId); } catch (e) { /* ignore */ } }
    });
    host.addEventListener('pointermove', function (ev) {
      if (!dragging) { return; }
      var dx = ev.clientX - px;
      var dy = ev.clientY - py;
      moved += Math.abs(dx) + Math.abs(dy);
      group.rotation.y += dx * 0.008;
      group.rotation.x = Math.max(-0.55, Math.min(0.45, group.rotation.x + dy * 0.005));
      px = ev.clientX; py = ev.clientY;
      if (REDUCED) { draw(); }
    });
    var ray = new THREE.Raycaster();
    var ptr = new THREE.Vector2();
    function pick(ev) {
      var r = renderer.domElement.getBoundingClientRect();
      ptr.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
      ptr.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(ptr, camera);
      var hit = ray.intersectObjects(meshes, false)[0];
      return hit ? hit.object.userData : null;
    }
    host.addEventListener('pointerup', function (ev) {
      var wasDrag = moved > 6;
      dragging = false;
      if (wasDrag) { return; }
      var n = pick(ev);
      if (n) { window.UCS.open(n.ref); }
    });
    host.addEventListener('pointerleave', function () { dragging = false; });
    host.addEventListener('pointercancel', function () { dragging = false; });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.02 }).observe(host);
    }
    function loop() {
      if (visible && W && H) {
        if (!dragging && !REDUCED && !back.classList.contains('open')) { group.rotation.y += 0.0022; }
        draw();
      }
      window.requestAnimationFrame(loop);
    }
    ready = true;
    if (REDUCED) { draw(); themeListeners.push(draw); } else { loop(); }
    window.UCS.topology = { nodes: T.nodes.length, links: T.links.length, renderer: 'webgl' };
  })();

  /* ------------------------------------------------------------------ mount reveal */
  (function reveal() {
    var els = $$('.reveal');
    function showAll() { els.forEach(function (e) { e.classList.add('in'); }); }
    if (REDUCED || !('IntersectionObserver' in window)) { showAll(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.02 });
    els.forEach(function (e, i) { e.style.transitionDelay = Math.min(i, 6) * 40 + 'ms'; io.observe(e); });
    window.setTimeout(showAll, 2600);
  })();
})();
