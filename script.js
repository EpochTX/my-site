window.Site = {lang:'zh',text:(zh,en)=>window.Site.lang==='en'?en:zh};
const zhTranslations = {
  "brand.subtitle": "个人主页",
  "nav.experience": "关于",
  "nav.skillkit": "探索",
  "nav.education": "工具",
  "nav.projects": "项目",
  "nav.leadership": "联系",
  "nav.highlights": "生活",
  "submenu.0": "全部项目",
  "submenu.1": "观天 · 天气",
  "submenu.2": "IP 查询",
  "submenu.3": "幸运抽签",
  "submenu.4": "工具目录",
  "footer.text": "EpochTX · 保持好奇。",
  "footer.classic": "旧版主页",
  "footer.top": "回到顶部",
  "hero.eyebrow": "EpochTX / 代码、工具与好奇心",
  "hero.name": "Epoch<wbr>TX",
  "hero.line1": "折腾 AI 工作流，也探索现代 Web。",
  "hero.line2": "从天气到网络，把想法做成顺手的工具。",
  "hero.line3": "保留一点好奇，也留一点日常。",
  "hero.email": "邮件",
  "hero.caption.location": "EpochTX / 互联网里的小小据点",
  "hero.caption.role": "写点代码，看看世界。",
  "hero.card.one": "AI 工作流与现代 Web，持续探索中。",
  "hero.card.automation": "观天 · NET SIGHT · 幸运抽签",
  "hero.card.strategy": "给屏幕之外的生活，也留一个小角落。",
  "snapshot.eyebrow": "快速看看",
  "snapshot.title": "一些小折腾。",
  "snapshot.one": "把不同来源的天气放在一起看。",
  "snapshot.automation": "查看 IP、网络信息与地图。",
  "snapshot.report": "列表、数字与权重抽签。",
  "snapshot.fund": "生活中的片刻，慢慢记录。",
  "experience.eyebrow": "关于这里",
  "experience.title": "动手，探索，慢慢来。",
  "experience.copy": "关注 AI 工作流与现代 Web，也喜欢做自己用得上的小工具。这里放我的项目、折腾过的想法，以及生活的一小片。",
  "skill.eyebrow": "随便逛逛",
  "skill.title": "给每个想法，一个位置。",
  "skill.quant.title": "观天",
  "skill.quant.copy": "把多个天气来源放在一起比较。",
  "skill.data.title": "网络工具",
  "skill.data.copy": "IP 查询、网络信息与地图。",
  "skill.finance.title": "小小决定",
  "skill.finance.copy": "列表、数字，或一个简单的是与否。",
  "skill.visual.title": "生活切片",
  "skill.visual.copy": "点进独立相册，看看屏幕之外的片刻。",
  "contact.eyebrow": "联系",
  "contact.title": "一个想法，或一句问候。",
  "contact.email": "邮件",
  "snapshot.value1": "观天",
  "snapshot.value2": "NET SIGHT",
  "snapshot.value3": "抽签",
  "snapshot.value4": "生活",
  "experience.label1": "日常工具",
  "experience.job1.title": "天气与网络",
  "experience.job1.1": "把多个来源的天气并排查看。",
  "experience.job1.2": "查询公网 IP 与网络信息。",
  "experience.job1.3": "把常用工具收在随手可及的地方。",
  "experience.job1.4": "从项目菜单直接进入。",
  "experience.label2": "项目",
  "experience.job2.title": "从一个想法，到一件顺手的工具。",
  "experience.job2.1": "观天看天气，NET SIGHT 看网络。",
  "experience.job2.2": "偶尔拿不定主意，就交给幸运抽签。",
  "experience.job2.3": "Step-keeper 与 ChatGPT Exporter 收在项目目录。",
  "experience.job2.4": "在使用中慢慢打磨细节。",
  "experience.label3": "探索",
  "experience.job3.title": "AI 工作流与现代 Web。",
  "experience.job3.1": "探索 AI 能怎样融入日常工作流。",
  "experience.job3.2": "把网页当成试验想法的地方。",
  "experience.job3.3": "让日常使用方便一点。",
  "experience.job3.4": "一次做好一个小步骤。",
  "experience.label4": "生活",
  "experience.job4.title": "生活的一小片。",
  "experience.job4.1": "给照片留一个独立空间。",
  "experience.job4.2": "记录普通日子里的风景。",
  "experience.job4.3": "照片以后慢慢添加。",
  "experience.job4.4": "从生活入口打开相册。",
  "contact.github": "GitHub",
  "contact.telegram": "Telegram",
  "contact.address": "admin@epochtxhub.com",
  "projects.eyebrow": "项目与工具",
  "projects.title": "一些实用的小东西。",
  "project.0.label": "天气",
  "project.0.title": "观天",
  "project.0.desc": "比较不同来源的天气预报。",
  "project.open": "打开项目 ↗",
  "project.1.label": "网络",
  "project.1.title": "IP 查询 · NET SIGHT",
  "project.1.desc": "公网 IP、自定义查询与地图。",
  "project.2.label": "选择",
  "project.2.title": "幸运抽签",
  "project.2.desc": "列表、数字、是非、权重抽签与历史记录。",
  "project.3.label": "项目",
  "project.3.title": "Step-keeper",
  "project.3.desc": "源码和使用信息保留在 GitHub。",
  "project.4.label": "原有入口",
  "project.4.title": "ChatGPT Exporter",
  "project.4.desc": "原有的对话导出项目。",
  "highlights.eyebrow": "生活切片",
  "highlights.title": "屏幕之外，生活的一小片。",
  "album.empty": "照片还在路上。",
  "album.copy": "先留一个位置，给以后的风景与日常。"
};

window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const originals = new Map();
  document.querySelectorAll("[data-i18n], [data-i18n-html]").forEach((node) => {
    const key = node.dataset.i18n || node.dataset.i18nHtml;
    originals.set(key, node.dataset.i18nHtml ? node.innerHTML : node.textContent);
  });

  const toggle = document.querySelector("[data-lang-toggle]");
  const getStoredLanguage = () => {
    try {
      return localStorage.getItem("siteLanguage") || localStorage.getItem("epochtx-lang") || "zh";
    } catch {
      return "zh";
    }
  };

  const setStoredLanguage = (lang) => {
    try {
      localStorage.setItem("siteLanguage", lang);
    } catch {
      /* Language switching still works for the current page without storage. */
    }
  };

  const preferred = getStoredLanguage();

  const applyLanguage = (lang) => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      node.textContent = lang === "zh" && zhTranslations[key] ? zhTranslations[key] : originals.get(key);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((node) => {
      const key = node.dataset.i18nHtml;
      node.innerHTML = lang === "zh" && zhTranslations[key] ? zhTranslations[key] : originals.get(key);
    });
    document.querySelectorAll("[data-lang-option]").forEach((node) => {
      node.classList.toggle("active", node.dataset.langOption === lang);
    });
    if (toggle) {
      toggle.setAttribute("aria-label", lang === "zh" ? "切换到英文" : "Switch to Chinese");
    }
    window.Site.lang = lang;
    document.dispatchEvent(new CustomEvent('site:language', {detail: lang}));
    setStoredLanguage(lang);
  };

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = getStoredLanguage();
      applyLanguage(current === "zh" ? "en" : "zh");
    });
  }

  applyLanguage(preferred);

  document.querySelectorAll("[data-snapshot-carousel]").forEach((carousel) => {
    const cards = Array.from(carousel.querySelectorAll("[data-snapshot-card]"));
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const dotsWrap = carousel.querySelector("[data-carousel-dots]");
    let active = 0;

    const dots = cards.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Show snapshot ${index + 1}`);
      dot.addEventListener("click", () => {
        active = index;
        render();
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    const render = () => {
      cards.forEach((card, index) => {
        const offset = (index - active + cards.length) % cards.length;
        let state = "far";
        if (offset === 0) state = "active";
        if (offset === 1) state = "next";
        if (offset === cards.length - 1) state = "prev";
        card.dataset.cardState = state;
        if (card.tagName === "A") card.tabIndex = state === "active" ? 0 : -1;
        card.setAttribute("aria-hidden", state === "far" ? "true" : "false");
      });
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === active);
      });
    };

    prev.addEventListener("click", () => {
      active = (active - 1 + cards.length) % cards.length;
      render();
    });

    next.addEventListener("click", () => {
      active = (active + 1) % cards.length;
      render();
    });

    render();
  });
});

document.addEventListener('click',event=>{document.querySelectorAll('.template-project-menu[open]').forEach(menu=>{if(!menu.contains(event.target))menu.open=false;});});
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('.template-project-menu[open]').forEach(menu=>{menu.open=false;menu.querySelector('summary').focus();});});
