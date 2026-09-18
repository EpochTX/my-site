(() => {
  const tabs = [...document.querySelectorAll('[data-view]')];
  const sections = [...document.querySelectorAll('[data-views]')];
  const views = new Set(tabs.map(tab => tab.dataset.view));
  const aliases = {skillkit:'about',contact:'about'};
  let albumBuilt = false;
  function buildAlbum() {
    if (albumBuilt) return;
    albumBuilt = true;
    const photos = Array.isArray(window.LIFE_PHOTOS) ? window.LIFE_PHOTOS.filter(p => p && typeof p.src === 'string' && p.src.trim()) : [];
    if (!photos.length) return;
    const grid = document.querySelector('#life-masonry');
    const columns = [...grid.querySelectorAll('.masonry-column')];
    columns.forEach(column => column.replaceChildren());
    grid.classList.add('has-photos');
    document.querySelector('.album-empty-copy').hidden = true;
    const dialog = document.querySelector('#life-dialog');
    photos.forEach((photo,index) => {
      const card = document.createElement('figure'); card.className = 'life-photo';
      const button = document.createElement('button'); button.type = 'button';
      const img = document.createElement('img'); img.loading = 'lazy'; img.decoding = 'async'; img.src = photo.src;
      const label = document.createElement('figcaption');
      label.dataset.copyZh = photo.caption || photo.alt || '生活瞬间';
      label.dataset.copyEn = photo.captionEn || photo.altEn || photo.caption || photo.alt || 'A little moment';
      const update = () => {
        const english = document.documentElement.lang === 'en';
        label.textContent = english ? label.dataset.copyEn : label.dataset.copyZh;
        img.alt = english ? (photo.altEn || label.textContent) : (photo.alt || label.textContent);
        button.setAttribute('aria-label', (english ? 'View photo: ' : '查看照片：') + label.textContent);
      };
      update(); document.addEventListener('site:language',update);
      button.addEventListener('click',() => {
        dialog.querySelector('img').src = photo.src;
        dialog.querySelector('img').alt = img.alt;
        dialog.querySelector('p').textContent = label.textContent;
        dialog.showModal();
      });
      button.append(img); card.append(button,label); columns[index % columns.length].append(card);
    });
    dialog.querySelector('button').addEventListener('click',() => dialog.close());
  }
  function render() {
    const hash = location.hash.slice(1);
    const view = views.has(hash) ? hash : (aliases[hash] || 'home');
    tabs.forEach(tab => {
      const selected = tab.dataset.view === view;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    sections.forEach(section => {section.hidden = !section.dataset.views.split(' ').includes(view);});
    document.querySelector('.folio-content').setAttribute('aria-labelledby', 'tab-' + view);
    if (view === 'life') buildAlbum();
    tabs.find(tab => tab.dataset.view === view)?.scrollIntoView({block:'nearest',inline:'nearest'});
  }
  function select(tab) {
    history.pushState(null, '', '#' + tab.dataset.view);
    render();
    window.scrollTo({top:0,behavior:'instant'});
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener('click',()=>select(tab));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight') next=(index+1)%tabs.length;
      if(event.key==='ArrowLeft') next=(index+tabs.length-1)%tabs.length;
      if(event.key==='Home') next=0;
      if(event.key==='End') next=tabs.length-1;
      if(next!==undefined){event.preventDefault();tabs[next].focus();select(tabs[next]);}
    });
  });
  function translate() {
    const english=document.documentElement.lang==='en';
    document.querySelectorAll('[data-copy-zh]').forEach(node=>{
      // Copy is authored in this document; only the heading contains a line break.
      const value=english?node.dataset.copyEn:node.dataset.copyZh;
      if(node.tagName==='H2' && value.includes('<br>')) {
        node.replaceChildren(...value.split('<br>').flatMap((part,i)=>i?[document.createElement('br'),document.createTextNode(part)]:[document.createTextNode(part)]));
      } else node.textContent=value;
    });
  }
  addEventListener('hashchange',render);
  addEventListener('popstate',render);
  document.addEventListener('site:language',translate);
  document.addEventListener('DOMContentLoaded',()=>{render();translate();});
})();
