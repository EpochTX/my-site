const $ = (s,r=document) => r.querySelector(s);
const $$ = (s,r=document) => Array.from(r.querySelectorAll(s));
function escapeHTML(v){return String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));}
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
    document.querySelector('.query-details')?.setAttribute('open', '');
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
  output.textContent = toolText(output.textContent);
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
    historyBox.innerHTML = history.length ? history.slice(0, 12).map((item) => `<span class="tag">${escapeHTML(item)}</span>`).join('') : '<span class="tag">'+escapeHTML(toolText('暂无历史'))+'</span>';
    countEl.textContent = String(history.length);
    uniqueEl.textContent = String(new Set(history).size);
  };
  const setMode = (mode) => {
    tabs.forEach((tab) => {tab.classList.toggle('active', tab.dataset.mode === mode); tab.setAttribute('aria-selected', String(tab.dataset.mode === mode));});
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
    if (mode === 'yesno') return [toolText('是'), toolText('否'), toolText('再想想')];
    if (mode === 'weight') {
      const parsed = splitList($('#weight-items').value).map((line) => {
        const [name, rawWeight] = line.split(/\||：|:/).map((part) => part.trim());
        const weight = Math.max(0.01, Number(rawWeight || 1));
        return name ? { name, weight } : null;
      }).filter(Boolean);
      return parsed.length ? parsed : [{ name: toolText('选项 A'), weight: 1 }, { name: toolText('选项 B'), weight: 1 }];
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
      output.textContent = choose() || toolText('先写选项');
      tick += 1;
      if (tick >= 26) {
        clearInterval(rollingTimer);
        const result = choose() || toolText('先写选项');
        output.classList.remove('rolling');
        output.textContent = result;
        if (result !== toolText('先写选项')) {
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
    output.textContent = toolText('准备开始');
  });
  $('#draw-copy')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.textContent || '');
      output.textContent = toolText('已复制');
      setTimeout(() => { if (output.textContent === toolText('已复制')) output.textContent = history[0] || toolText('准备开始'); }, 700);
    } catch {
      output.textContent = toolText('复制失败');
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
  document.addEventListener('site:language', () => {
    const dict=window.TOOL_TRANSLATIONS;
    const key=Object.keys(dict).find(k=>output.textContent===k||output.textContent===dict[k]);
    if(key)output.textContent=toolText(key);
    renderHistory();
  });
  renderHistory();
}



document.addEventListener('DOMContentLoaded',()=>{initIpLookup();initDrawTool();});
