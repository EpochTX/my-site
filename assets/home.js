(() => {
  const root = document.documentElement;
  let lang = 'zh'; let theme;
  try { lang = localStorage.getItem('epochtx-lang') || 'zh'; theme = localStorage.getItem('epochtx-home-theme'); } catch (_) {}
  if (!['zh', 'en'].includes(lang)) lang = 'zh';
  const media = matchMedia('(prefers-color-scheme: dark)');
  const langButton = document.querySelector('#lang-toggle');
  const themeButton = document.querySelector('#theme-toggle');
  window.Site = { lang, text: (zh, en) => window.Site.lang === 'en' ? en : zh };
  function applyLanguage(next) {
    lang = next; window.Site.lang = next; root.lang = lang === 'en' ? 'en' : 'zh-CN';
    document.querySelectorAll('[data-zh][data-en]').forEach(el => {
      const value = el.dataset[lang];
      if (el.tagName === 'META') el.content = value;
      else el.textContent = value;
    });
    document.querySelectorAll('[data-zh-label]').forEach(el => el.setAttribute('aria-label', el.dataset[lang + 'Label']));
    document.querySelectorAll('[data-lang-option]').forEach(el => el.classList.toggle('active', el.dataset.langOption === lang));
    langButton.setAttribute('aria-label', lang === 'en' ? '切换到中文' : 'Switch to English');
    updateThemeLabel();
    document.dispatchEvent(new CustomEvent('site:language', { detail: lang }));
  }
  function updateThemeLabel() {
    const dark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', window.Site.text(dark ? '切换浅色模式' : '切换深色模式', dark ? 'Switch to light mode' : 'Switch to dark mode'));
  }
  function applyTheme(value) {
    root.dataset.theme = value;
    document.querySelector('.brand img').src = value === 'dark' ? 'assets/logo-dark.svg' : 'assets/logo.svg';
    document.querySelector('meta[name="theme-color"]').content = value === 'dark' ? '#1b2e29' : '#edeae2';
    updateThemeLabel();
  }
  applyTheme(theme || (media.matches ? 'dark' : 'light'));
  applyLanguage(lang);
  langButton.addEventListener('click', () => {
    applyLanguage(lang === 'zh' ? 'en' : 'zh');
    try { localStorage.setItem('epochtx-lang', lang); } catch (_) {}
  });
  themeButton.addEventListener('click', () => {
    theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; applyTheme(theme);
    try { localStorage.setItem('epochtx-home-theme', theme); } catch (_) {}
  });
  media.addEventListener('change', e => { if (!theme) applyTheme(e.matches ? 'dark' : 'light'); });
  document.querySelector('#year').textContent = new Date().getFullYear();
  const group = document.querySelector('.nav-group');
  document.addEventListener('click', e => { if (!group.contains(e.target)) group.open = false; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && group.open) { group.open = false; group.querySelector('summary').focus(); } });
  group.querySelectorAll('a').forEach(a => a.addEventListener('click', () => group.open = false));
})();
