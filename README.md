# EpochTX · Personal homepage

网站：<https://epochtxhub.com>

直接使用 [yizhixuanzhu/homepage-template](https://github.com/yizhixuanzhu/homepage-template) 的原版页面结构与设计。`styles.css` 与来源文件逐字节相同：原渐变、沙丘、胶囊导航、首屏三张浮动卡片、轮播、时间线、技能卡片和联系区均保留。

只替换个人内容与真实入口；`script.js` 保留模板的双语和轮播实现，更新翻译字典，并接入现有工具和相册。默认中文，支持 EN / 中。原版模板没有深色模式，此版本忠实采用模板原配色。

## 页面

- `index.html`：原模板首页，EpochTX 内容。
- `projects.html` / `tools.html`：使用原模板详情页，保留天气、IP 查询、抽签、Step-keeper 和原导出项目入口。
- `life.html` / `highlights.html`：独立生活相册；首页不加载照片。添加方式见 `assets/photos/README.md`。
- `ip.html`、`chouqian.html`、`cq.html`：原有功能，与模板统一导航、背景和玻璃卡片。
- `classic.html`：最初的旧版首页。

`assets/template-integration.css` 只扩展二级菜单、相册和工具页，不重写首页设计；另仅修复原模板 440px 以下导航溢出。图标使用本地 Lucide 子集，授权见 `assets/lucide-LICENSE`。

`profile_photo.svg` 是原模板的头像占位图，后续可替换；导航保留 EpochTX 标识。联系邮箱：`admin@epochtxhub.com`。

## 本地预览

```bash
python -m http.server 8000
```

打开 `http://localhost:8000`。无需构建、外部字体或图标 CDN。
