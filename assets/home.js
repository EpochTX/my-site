(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { preference = localStorage.getItem('epochtx-home-theme'); } catch (_) {}
  function applyTheme(theme) {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-label', theme === 'dark' ? '切换浅色模式' : '切换深色模式');
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#1d2722' : '#f5f4ee';
  }
  applyTheme(preference || (media.matches ? 'dark' : 'light'));
  themeButton.addEventListener('click', () => {
    preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(preference);
    try { localStorage.setItem('epochtx-home-theme', preference); } catch (_) {}
  });
  media.addEventListener('change', event => { if (!preference) applyTheme(event.matches ? 'dark' : 'light'); });
  document.querySelector('#year').textContent = new Date().getFullYear();
  const photos = Array.isArray(window.LIFE_PHOTOS) ? window.LIFE_PHOTOS.filter(photo => photo && typeof photo.src === 'string' && photo.src.trim()) : [];
  if (!photos.length) return;
  const grid = document.querySelector('#photo-grid');
  const dialog = document.querySelector('#photo-dialog');
  const largeImage = document.querySelector('#dialog-image');
  grid.replaceChildren();
  photos.forEach((photo, index) => {
    const card = document.createElement('article');
    card.className = `photo-card${index === 0 ? ' photo-large' : ''}`;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'photo-button';
    button.setAttribute('aria-label', `查看照片：${photo.caption || photo.alt || index + 1}`);
    const img = document.createElement('img');
    img.src = photo.src; img.alt = photo.alt || photo.caption || '生活照片'; img.loading = 'lazy'; img.decoding = 'async';
    if (photo.position) img.style.objectPosition = photo.position;
    img.addEventListener('error', () => {
      button.disabled = true;
      const message = document.createElement('p'); message.textContent = '照片暂时无法显示';
      button.replaceChildren(message);
    });
    button.append(img);
    button.addEventListener('click', () => {
      largeImage.src = photo.src; largeImage.alt = img.alt;
      document.querySelector('#dialog-caption').textContent = photo.caption || img.alt;
      dialog.showModal();
    });
    const caption = document.createElement('div'); caption.className = 'photo-caption';
    const title = document.createElement('span'); title.textContent = `${String(index + 1).padStart(2, '0')} — ${photo.caption || '生活瞬间'}`;
    const date = document.createElement('span'); date.textContent = photo.date || '';
    caption.append(title, date); card.append(button, caption); grid.append(card);
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
})();
