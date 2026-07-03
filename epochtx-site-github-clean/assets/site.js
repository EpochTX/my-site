const PROFILE = {
  name: 'EpochTX',
  github: 'https://github.com/epochtx',
  telegram: 'https://t.me/despairbad',
  projectRepo: 'https://github.com/zjt666666zjt/ChatGPT_Exporter',
  home: 'https://zjt666666zjt.github.io/'
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const FALLBACK_WALLPAPERS = [
  { title: 'Aurora Glass Field', css: 'radial-gradient(circle at 20% 18%, rgba(154,247,240,.22), transparent 30%), radial-gradient(circle at 78% 25%, rgba(184,255,247,.10), transparent 28%), linear-gradient(125deg, #011012, #032326 46%, #010506)' },
  { title: 'Deep Ocean Core', css: 'radial-gradient(circle at 70% 20%, rgba(184,255,247,.18), transparent 32%), radial-gradient(circle at 16% 78%, rgba(154,247,240,.12), transparent 36%), linear-gradient(135deg, #00090b, #062326 52%, #010606)' },
  { title: 'Midnight Prism', css: 'radial-gradient(circle at 45% 25%, rgba(223,253,252,.14), transparent 34%), radial-gradient(circle at 12% 42%, rgba(154,247,240,.10), transparent 34%), linear-gradient(145deg, #010507, #071c1f 48%, #02090a)' }
];

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function isNestedPage() {
  return location.pathname.includes('/Pages/');
}

function route(path) {
  return isNestedPage() ? `../${path}` : path;
}

function initNav() {
  const nav = $('#site-nav');
  const toggle = $('#menu-toggle');
  const panel = $('#mobile-panel');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '×' : '☰';
    });
    $$('a,button', panel).forEach((item) => item.addEventListener('click', () => {
      panel.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }
}

function initMouseGlow() {
  let raf = 0;
  let x = innerWidth / 2;
  let y = innerHeight / 2;
  const apply = () => {
    document.documentElement.style.setProperty('--mx', `${x}px`);
    document.documentElement.style.setProperty('--my', `${y}px`);
    raf = 0;
  };
  window.addEventListener('pointermove', (event) => {
    x = event.clientX;
    y = event.clientY;
    if (!raf) raf = requestAnimationFrame(apply);
  }, { passive: true });
}

function initOrbParallax() {
  const stage = $('#orb-stage');
  if (!stage || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let raf = 0;
  let dx = 0;
  let dy = 0;
  const apply = () => {
    stage.style.setProperty('--orb-x', `${dx * 11}px`);
    stage.style.setProperty('--orb-y', `${dy * 11}px`);
    raf = 0;
  };
  stage.addEventListener('pointermove', (event) => {
    const rect = stage.getBoundingClientRect();
    dx = (event.clientX - rect.left) / rect.width - 0.5;
    dy = (event.clientY - rect.top) / rect.height - 0.5;
    if (!raf) raf = requestAnimationFrame(apply);
  }, { passive: true });
  stage.addEventListener('pointerleave', () => {
    dx = 0;
    dy = 0;
    if (!raf) raf = requestAnimationFrame(apply);
  });
}

function initWallpaper() {
  const layer = $('#wallpaper-layer') || $('.wallpaper-layer');
  const title = $('#wallpaper-title');
  const buttons = $$('[data-action="change-wallpaper"]');
  if (!layer) return;
  const dayStamp = new Date().toISOString().slice(0, 10);
  const randSize = innerWidth < 680 ? 'rand_m.php' : 'rand.php';
  const sources = [
    { title: 'Bing Daily UHD', url: `https://bing.img.run/uhd.php?d=${dayStamp}` },
    { title: 'Bing Daily 1920', url: `https://bing.img.run/1920x1080.php?d=${dayStamp}` },
    { title: 'Bing Random UHD', url: `https://bing.img.run/rand_uhd.php?t=${Date.now()}` },
    { title: 'Bing Random', url: `https://bing.img.run/${randSize}?t=${Date.now()}` }
  ];
  const fallback = FALLBACK_WALLPAPERS.map((item) => ({ ...item, fallback: true }));
  const cacheKey = 'epochtx.wallpaper.choice.v5';
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(cacheKey) || 'null'); } catch {}
  let index = saved?.date === dayStamp ? Number(saved.index || 0) : 0;
  let active = sources;
  const label = (item) => {
    if (title) title.textContent = `Wallpaper · ${item?.title || 'Fallback'}`;
  };
  const setFallback = () => {
    active = fallback;
    const item = active[index % active.length];
    layer.style.backgroundImage = item.css;
    label(item);
    layer.classList.remove('is-changing');
  };
  const apply = (item) => {
    if (!item) return;
    layer.classList.add('is-changing');
    if (item.css) {
      layer.style.backgroundImage = item.css;
      label(item);
      setTimeout(() => layer.classList.remove('is-changing'), 90);
      return;
    }
    const image = new Image();
    image.decoding = 'async';
    image.referrerPolicy = 'no-referrer';
    image.onload = () => {
      layer.style.backgroundImage = `url("${item.url}")`;
      label(item);
      setTimeout(() => layer.classList.remove('is-changing'), 90);
    };
    image.onerror = () => setFallback();
    image.src = item.url;
  };
  const next = () => {
    if (active === sources) {
      sources[2].url = `https://bing.img.run/rand_uhd.php?t=${Date.now()}`;
      sources[3].url = `https://bing.img.run/${randSize}?t=${Date.now()}`;
    }
    index = (index + 1) % active.length;
    try { localStorage.setItem(cacheKey, JSON.stringify({ date: dayStamp, index })); } catch {}
    apply(active[index]);
  };
  buttons.forEach((button) => button.addEventListener('click', next));
  window.EpochTXChangeWallpaper = next;
  apply(active[index % active.length]);
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function jumpToHomeAnchor(anchor) {
  if ($('#' + anchor)) scrollToId(anchor);
  else location.href = route(`index.html#${anchor}`);
}

function initCommandPalette() {
  const backdrop = $('#palette-backdrop');
  if (!backdrop) return;
  const openBtn = $('#open-palette');
  const commands = {
    github: () => open(PROFILE.github, '_blank', 'noopener,noreferrer'),
    telegram: () => open(PROFILE.telegram, '_blank', 'noopener,noreferrer'),
    projects: () => jumpToHomeAnchor('projects'),
    wallpaper: () => window.EpochTXChangeWallpaper?.(),
    stack: () => jumpToHomeAnchor('stack'),
    labs: () => { location.href = route('tools.html'); },
    ip: () => { location.href = route('ip.html'); },
    draw: () => { location.href = route('chouqian.html'); }
  };
  const openPalette = () => {
    backdrop.classList.add('open');
    document.body.classList.add('palette-open');
    setTimeout(() => $('.command', backdrop)?.focus(), 20);
  };
  const closePalette = () => {
    backdrop.classList.remove('open');
    document.body.classList.remove('palette-open');
  };
  openBtn?.addEventListener('click', openPalette);
  document.addEventListener('keydown', (event) => {
    const isMac = navigator.platform.toUpperCase().includes('MAC');
    if ((isMac ? event.metaKey : event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      backdrop.classList.contains('open') ? closePalette() : openPalette();
    }
    if (event.key === 'Escape') closePalette();
  });
  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) closePalette();
  });
  $$('[data-command]', backdrop).forEach((button) => button.addEventListener('click', () => {
    const action = commands[button.dataset.command];
    closePalette();
    action?.();
  }));
}

function setMapFrame(frame, lat, lon, zoom = 0.08) {
  const safeLat = Number(lat);
  const safeLon = Number(lon);
  if (!frame || Number.isNaN(safeLat) || Number.isNaN(safeLon)) return;
  frame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${safeLon - zoom}%2C${safeLat - zoom * .62}%2C${safeLon + zoom}%2C${safeLat + zoom * .62}&layer=mapnik&marker=${safeLat}%2C${safeLon}`;
}

function renderRows(target, rows) {
  if (!target) return;
  target.innerHTML = rows.map(([label, value]) => `<div class="info-row"><span>${escapeHTML(label)}</span><strong>${escapeHTML(value || '-')}</strong></div>`).join('');
}

const IPAPI_KEY = 'e98a0946e625ab30381d';

function normalizeIpData(data) {
  const location = data.location || {};
  const company = data.company || {};
  const asn = data.asn || {};
  const lat = data.latitude ?? data.lat ?? location.latitude;
  const lon = data.longitude ?? data.lon ?? location.longitude;
  const countryCode = location.country_code || data.country_code || data.countryCode || '';
  const countryName = location.country || data.country_name || data.country || countryCode || '-';
  return {
    ip: data.ip || data.query || data.ipAddress || '-',
    country: countryName,
    region: location.state || data.region || data.regionName || '-',
    city: location.city || data.city || '-',
    isp: company.name || data.connection?.isp || data.isp || data.org || asn.org || '-',
    org: asn.org || company.name || data.org || '-',
    asn: asn.asn ? `AS${asn.asn}` : (data.asn || '-'),
    route: asn.route || company.network || '-',
    timezone: location.timezone || data.timezone?.id || data.timezone || '-',
    risk: data.is_proxy || data.is_vpn || data.is_tor ? '可能存在代理特征' : '未发现明显代理风险',
    coords: [lat, lon].filter((v) => v !== undefined && v !== null).join(', ') || '-',
    lat,
    lon,
    countryCode
  };
}

async function fetchIpApiIs(target = '') {
  const q = target ? `&q=${encodeURIComponent(target)}` : '';
  const response = await fetch(`https://api.ipapi.is/?key=${IPAPI_KEY}${q}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (data.error) throw new Error(data.message || 'IPAPI.IS lookup failed');
  return normalizeIpData(data);
}

async function fetchIpWhoIs(target = '') {
  const url = target ? `https://ipwho.is/${encodeURIComponent(target)}` : 'https://ipwho.is/';
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (data.success === false || data.error) throw new Error(data.message || data.reason || 'Lookup failed');
  return normalizeIpData(data);
}

async function fetchIpInfo(value = '') {
  const target = value.trim();
  let lastError;
  for (const fn of [fetchIpApiIs, fetchIpWhoIs]) {
    try {
      return await fn(target);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error('Lookup failed');
}

function extractIPv4(text) {
  const match = String(text || '').match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/);
  return match ? match[0] : '';
}

async function fetchLocalIpFromProvidedApi(timeout = 3600) {
  const services = [
    { name: 'my.ip.cn', url: 'https://my.ip.cn/?json=true', parser: async (res) => {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        return { ip: json.ip || extractIPv4(JSON.stringify(json)), raw: json.address || json.addr || text };
      } catch {
        return { ip: extractIPv4(text), raw: text };
      }
    }},
    { name: 'ipify', url: 'https://api.ipify.org?format=json', parser: async (res) => {
      const json = await res.json();
      return { ip: json.ip, raw: 'fallback' };
    }},
    { name: 'ifconfig.me', url: 'https://ifconfig.me/ip', parser: async (res) => ({ ip: (await res.text()).trim(), raw: 'fallback' }) },
    { name: 'db-ip', url: 'https://api.db-ip.com/v2/free/self', parser: async (res) => {
      const json = await res.json();
      return { ip: json.ipAddress, raw: json.city || 'fallback' };
    }}
  ];
  let lastError;
  for (const svc of services) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(svc.url, { cache: 'no-store', signal: controller.signal });
      clearTimeout(timer);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const parsed = await svc.parser(response);
      const ip = extractIPv4(parsed.ip || '');
      if (ip) return { ip, source: svc.name, raw: parsed.raw || '' };
    } catch (error) {
      clearTimeout(timer);
      lastError = error;
    }
  }
  throw lastError || new Error('Local IP service failed');
}

function initIpLookup() {
  const form = $('#ip-form');
  if (!form) return;
  const input = $('#ip-input');
  const status = $('#ip-status');
  const localResult = $('#local-ip-result');
  const exitResult = $('#exit-ip-result');
  const queryResult = $('#query-ip-result');
  const localMap = $('#local-map');
  const exitMap = $('#exit-map');
  const queryMap = $('#query-map');
  const localNote = $('#local-map-note');
  const renderIp = (target, data, extra = []) => renderRows(target, [
    ['IP', data.ip],
    ['国家 / 地区', data.country],
    ['省州', data.region],
    ['城市', data.city],
    ['ISP', data.isp],
    ['组织', data.org],
    ['ASN', data.asn],
    ['路由', data.route],
    ['时区', data.timezone],
    ['风险', data.risk],
    ['坐标', data.coords],
    ...extra
  ]);
  const loadLocal = async () => {
    renderRows(localResult, [['状态', '正在调用本地 IP 接口']]);
    try {
      const local = await fetchLocalIpFromProvidedApi();
      status.textContent = `本地 IP 接口返回：${local.ip}`;
      try {
        const data = await fetchIpInfo(local.ip);
        renderIp(localResult, data, [['接口', local.source], ['原始返回', local.raw]]);
        setMapFrame(localMap, data.lat, data.lon);
        if (localNote) localNote.textContent = `本地 / 直连 IP：${local.ip}，数据来自 ${local.source}，地图已按接口返回的公网地址定位。`;
      } catch {
        renderRows(localResult, [['本地 IP', local.ip], ['接口', local.source], ['原始返回', local.raw], ['说明', '接口已返回 IP，但详情接口暂时不可用']]);
        if (localNote) localNote.textContent = `本地 / 直连 IP：${local.ip}，详情接口暂时不可用。`;
      }
    } catch (error) {
      renderRows(localResult, [['状态', '本地 IP 接口不可用'], ['说明', error?.message || '网络请求失败']]);
      if (localNote) localNote.textContent = '本地 IP 接口请求失败，请检查网络分流或接口可用性。';
    }
  };
  const loadExit = async () => {
    status.textContent = '正在识别出口公网 IP...';
    try {
      const data = await fetchIpInfo('');
      renderIp(exitResult, data, [['接口', 'api.ipapi.is / ipwho.is']]);
      setMapFrame(exitMap, data.lat, data.lon);
      setMapFrame(queryMap, data.lat, data.lon);
      status.textContent = 'IP 信息已更新。你也可以输入 IP / 域名继续查询。';
    } catch (error) {
      status.textContent = `出口 IP 查询失败：${error?.message || '网络不可用'}`;
    }
  };
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const target = input.value.trim();
    status.textContent = target ? `正在查询 ${target}...` : '正在刷新当前出口 IP...';
    queryResult.innerHTML = '<div class="info-row"><span>状态</span><strong>查询中</strong></div>';
    try {
      const data = await fetchIpInfo(target);
      renderIp(queryResult, data, [['接口', 'api.ipapi.is / ipwho.is']]);
      setMapFrame(queryMap, data.lat, data.lon);
      status.textContent = target ? '自定义查询完成，右侧查询地图已更新。' : '当前出口 IP 已刷新。';
      if (!target) {
        renderIp(exitResult, data, [['接口', 'api.ipapi.is / ipwho.is']]);
        setMapFrame(exitMap, data.lat, data.lon);
      }
    } catch (error) {
      status.textContent = `查询失败：${error?.message || '网络不可用'}。`;
      renderRows(queryResult, [['状态', '查询失败'], ['说明', error?.message || '网络不可用']]);
    }
  });
  $('#refresh-ip')?.addEventListener('click', () => {
    loadLocal();
    loadExit();
  });
  $('#clear-ip')?.addEventListener('click', () => {
    input.value = '';
    queryResult.innerHTML = '<div class="info-row"><span>状态</span><strong>等待查询</strong></div>';
  });
  loadLocal();
  loadExit();
}

function weightedPick(items) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let point = Math.random() * total;
  for (const item of items) {
    point -= item.weight;
    if (point <= 0) return item.name;
  }
  return items[items.length - 1]?.name || '';
}

function initDrawTool() {
  const root = $('#draw-tool');
  if (!root) return;
  const tabs = $$('.draw-tab', root);
  const modes = $$('.draw-mode', root);
  const output = $('#draw-output');
  const historyBox = $('#draw-history');
  const countEl = $('#draw-count');
  const uniqueEl = $('#draw-unique');
  const storeKey = 'epochtx.draw.history.v2';
  let history = [];
  let rollingTimer = 0;
  try { history = JSON.parse(localStorage.getItem(storeKey) || '[]'); } catch {}
  const saveHistory = () => {
    history = history.slice(0, 30);
    try { localStorage.setItem(storeKey, JSON.stringify(history)); } catch {}
  };
  const renderHistory = () => {
    historyBox.innerHTML = history.length ? history.slice(0, 12).map((item) => `<span class="tag">${escapeHTML(item)}</span>`).join('') : '<span class="tag">暂无历史</span>';
    countEl.textContent = String(history.length);
    uniqueEl.textContent = String(new Set(history).size);
  };
  const setMode = (mode) => {
    tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.mode === mode));
    modes.forEach((panel) => panel.classList.toggle('active', panel.dataset.mode === mode));
  };
  tabs.forEach((tab) => tab.addEventListener('click', () => setMode(tab.dataset.mode)));
  const splitList = (value) => value.split(/\n|,|，|、/).map((item) => item.trim()).filter(Boolean);
  const getItems = () => {
    const mode = $('.draw-tab.active', root)?.dataset.mode || 'list';
    if (mode === 'list') {
      let items = splitList($('#draw-items').value);
      if ($('#dedupe-items').checked) items = Array.from(new Set(items));
      return items;
    }
    if (mode === 'number') {
      const min = Number($('#num-min').value || 1);
      const max = Number($('#num-max').value || 100);
      const start = Math.min(min, max);
      const end = Math.max(min, max);
      const size = Math.min(600, end - start + 1);
      return Array.from({ length: size }, (_, i) => String(start + i));
    }
    if (mode === 'yesno') return ['是', '否', '再想想'];
    if (mode === 'weight') {
      const parsed = splitList($('#weight-items').value).map((line) => {
        const [name, rawWeight] = line.split(/\||：|:/).map((part) => part.trim());
        const weight = Math.max(0.01, Number(rawWeight || 1));
        return name ? { name, weight } : null;
      }).filter(Boolean);
      return parsed.length ? parsed : [{ name: '选项 A', weight: 1 }, { name: '选项 B', weight: 1 }];
    }
    return [];
  };
  const choose = () => {
    const mode = $('.draw-tab.active', root)?.dataset.mode || 'list';
    const data = getItems();
    if (!data.length) return '';
    if (mode === 'weight') return weightedPick(data);
    return data[Math.floor(Math.random() * data.length)];
  };
  const spin = () => {
    clearInterval(rollingTimer);
    let tick = 0;
    output.classList.add('rolling');
    rollingTimer = setInterval(() => {
      output.textContent = choose() || '先写选项';
      tick += 1;
      if (tick >= 26) {
        clearInterval(rollingTimer);
        const result = choose() || '先写选项';
        output.classList.remove('rolling');
        output.textContent = result;
        if (result !== '先写选项') {
          history.unshift(result);
          saveHistory();
          renderHistory();
        }
      }
    }, 42);
  };
  $('#draw-start')?.addEventListener('click', spin);
  $('#draw-reset')?.addEventListener('click', () => {
    clearInterval(rollingTimer);
    output.classList.remove('rolling');
    output.textContent = '准备开始';
  });
  $('#draw-copy')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.textContent || '');
      output.textContent = '已复制';
      setTimeout(() => { if (output.textContent === '已复制') output.textContent = history[0] || '准备开始'; }, 700);
    } catch {
      output.textContent = '复制失败';
    }
  });
  $('#history-clear')?.addEventListener('click', () => {
    history = [];
    saveHistory();
    renderHistory();
  });
  $$('.sample-btn', root).forEach((button) => button.addEventListener('click', () => {
    const target = $('#draw-items');
    target.value = button.dataset.sample.split('|').join('\n');
  }));
  renderHistory();
}


function initCodeWindow() {
  const stage = $('#code-stage');
  const panel = $('#code-window');
  if (!stage || !panel) return;
  const tabs = $$('.code-tab-btn', stage);
  const panes = $$('.code-pane', stage);
  const copyBtn = $('#code-copy');
  const selectTab = (key) => {
    tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.codeTab === key));
    panes.forEach((pane) => pane.classList.toggle('active', pane.dataset.codePane === key));
  };
  tabs.forEach((tab) => tab.addEventListener('click', () => selectTab(tab.dataset.codeTab)));
  const paneText = () => {
    const active = $('.code-pane.active', stage);
    return active ? active.innerText.replace(/\n{2,}/g, '\n').trim() : '';
  };
  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(paneText());
      const old = copyBtn.textContent;
      copyBtn.textContent = '已复制';
      setTimeout(() => { copyBtn.textContent = old || '复制'; }, 900);
    } catch {}
  });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let raf = 0;
    let rx = 0;
    let ry = 0;
    const apply = () => {
      panel.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      panel.classList.add('is-tilting');
      raf = 0;
    };
    stage.addEventListener('pointermove', (event) => {
      const rect = stage.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rx = py * -5;
      ry = px * 7;
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });
    stage.addEventListener('pointerleave', () => {
      rx = 0; ry = 0;
      panel.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
      panel.classList.remove('is-tilting');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const boot = [
    initNav,
    initMouseGlow,
    initOrbParallax,
    initWallpaper,
    initCommandPalette,
    initCodeWindow,
    initIpLookup,
    initDrawTool
  ];
  boot.forEach((fn) => {
    try {
      fn();
    } catch (error) {
      console.error('[EpochTX]', fn.name, error);
    }
  });
});
