# EpochTX

个人网站 / Personal website: <https://epochtxhub.com>

静态 HTML、CSS、JavaScript；无需构建，无需外部字体或图标 CDN。支持中文 / English、深浅模式，语言与主题选择在页面间保留。

## 页面 / Pages

- `index.html`：个人介绍与精简入口。首页不加载照片。
- `projects.html`：天气、IP 查询、抽签、Step-keeper 与原有导出项目。
- `tools.html`：工具目录。
- `life.html`：独立相册；照片配置见 `assets/photos/README.md`。
- `ip.html`：IP 查询与地图，保留原查询和备用接口逻辑。
- `chouqian.html` / `cq.html`：抽签工具，保留列表、数字、是非、权重和历史功能。
- `classic.html`：最初的完整旧版首页，其原样式与脚本保留。

## 本地预览 / Preview

```bash
python -m http.server 8000
```

访问 / Open `http://localhost:8000`。

## 内容与标识 / Content & identity

页面的 `data-zh` / `data-en` 属性提供双语文字。工具动态翻译在 `assets/tool-language.js`；用户自行输入的抽签内容保持原样。

新标识：`assets/logo.svg`（EpochTX 矢量字标）、`assets/mark.svg`（E / X 几何符号及 favicon）。以横向三笔表现 E，以交叉笔画表现 X；墨绿与浅苔绿用于深浅背景。网站样式集中在 `assets/home.css`。

邮箱：`admin@epochtxhub.com`。`CNAME` 保留原自定义域名。

## 设计参考 / Design references

主要参考 [yizhixuanzhu/homepage-template](https://github.com/yizhixuanzhu/homepage-template) 的柔和背景、玻璃卡片、悬浮导航与双语交互；辅助参考 [wzsyyh/luka-homepage-template](https://github.com/wzsyyh/luka-homepage-template) 的克制介绍与内容层级。页面、标识、样式和交互按 EpochTX 内容重新实现。
