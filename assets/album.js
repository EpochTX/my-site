(() => {
  const grid = document.querySelector('#photo-grid');
  const photos = Array.isArray(window.LIFE_PHOTOS) ? window.LIFE_PHOTOS.filter(p => p && typeof p.src === 'string' && p.src.trim()) : [];
  if (!photos.length) return;
  document.querySelector('#album-empty').hidden = true;
  const dialog = document.querySelector('#photo-dialog');
  const largeImage = document.querySelector('#dialog-image');
  let current; const captions = [];
  const label = p => Site.lang === 'en' ? (p.captionEn || p.caption || p.altEn || p.alt || 'A little moment') : (p.caption || p.alt || '生活瞬间');
  function refreshLabels() {
    captions.forEach(({p,button,img,title}) => {
      title.textContent = label(p);
      img.alt = Site.lang === 'en' ? (p.altEn || p.alt || label(p)) : (p.alt || label(p));
      button.setAttribute('aria-label', Site.text('查看照片：','View photo: ') + label(p));
    });
    if (current) document.querySelector('#dialog-caption').textContent = label(current);
  }
  photos.forEach(p => {
    const card = document.createElement('article'); card.className = 'photo-card';
    const button = document.createElement('button'); button.type = 'button'; button.className = 'photo-button';
    const img = document.createElement('img'); img.src = p.src; img.loading = 'lazy'; img.decoding = 'async';
    if (p.position) img.style.objectPosition = p.position;
    img.addEventListener('error', () => { button.disabled = true; const message=document.createElement('p');message.textContent=Site.text('照片暂时无法显示','Photo unavailable');button.replaceChildren(message); });
    button.append(img);
    button.addEventListener('click', () => {current=p;largeImage.src=p.src;largeImage.alt=img.alt;document.querySelector('#dialog-caption').textContent=label(p);dialog.showModal();});
    const caption=document.createElement('div');caption.className='photo-caption';
    const title=document.createElement('span'), date=document.createElement('span');date.textContent=p.date||'';
    caption.append(title,date);card.append(button,caption);grid.append(card);captions.push({p,button,img,title});
  });
  refreshLabels();document.addEventListener('site:language',refreshLabels);
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
})();
