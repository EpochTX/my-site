# EpochTX 的个人主页

这里放的是我的个人站点：[epochtx.tech](https://epochtx.tech/)。

它不是一个很重的前端工程，更像是一块我自己打磨的网上名片：主页、实验室入口、一些小工具，还有一点偏玻璃质感的视觉实验。

## 现在有什么

- `index.html`：主页，放个人介绍、项目入口和联系方式。
- `tools.html`：实验室入口，把小工具收在一起。
- `ip.html`：IP 查询页面。
- `chouqian.html` / `cq.html`：幸运抽签小页面。
- `404.html`：迷路时看到的页面。
- `assets/site.css`：主要视觉样式，玻璃层、高光、动效都在这里。
- `assets/site.js`：导航、壁纸切换、命令面板和页面交互。

## 本地打开

这个站点没有复杂构建流程，直接打开 `index.html` 就能看。

如果想用本地服务跑，也可以在仓库目录里执行：

```bash
python -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

## 部署

站点通过 GitHub Pages 发布，仓库里保留了：

- `CNAME`：自定义域名 `epochtx.tech`
- `.nojekyll`：让 GitHub Pages 按纯静态文件发布，不走 Jekyll 处理

推送到 `main` 后，GitHub Pages 会自动构建并发布。

## 之后可能会加

- 更完整的项目展示
- 博客或笔记入口
- 更多实用小工具
- 更细一点的移动端体验

慢慢来，网站会跟着我一起变。
