# EpochTX · Personal homepage

网站：<https://epochtxhub.com>

首页采用个人名片、简介、项目列表与轻量侧栏布局，融合蓝绿渐变和玻璃质感。默认中文，支持 EN / 中。内容仅使用现有项目和个人介绍。

## 页面

- `index.html`：新版简洁个人主页，独立样式 `assets/folio.css`。
- `panorama.html`：保留此前的大幅玻璃布局与轮播，可从首页「全景版主页」进入。
- `classic.html`：最初的旧版首页。
- `projects.html` / `tools.html`：项目与工具目录，保留天气、IP 查询、抽签、Step-keeper 和原导出项目入口。
- `life.html` / `highlights.html`：独立生活相册；首页不加载照片。添加方式见 `assets/photos/README.md`。
- `ip.html`、`chouqian.html`、`cq.html`：保留原有工具功能。

基础模板来自 [yizhixuanzhu/homepage-template](https://github.com/yizhixuanzhu/homepage-template)，`styles.css` 保留原文件；`assets/template-integration.css` 扩展蓝绿背景、二级菜单、工具和相册样式。新版主页 CSS 单独维护，不影响全景版与工具页。`script.js` 共用双语字典与原有轮播逻辑。

Logo 使用用户提供的地球小猫原图 `assets/epochtx-cat.jpeg`。联系邮箱：`admin@epochtxhub.com`。图标为本地 Lucide 子集，授权见 `assets/lucide-LICENSE`。

## 本地预览

```bash
python -m http.server 8000
```

打开 `http://localhost:8000`。无需构建、外部字体或图标 CDN。
