# EpochTX 的个人空间

网站：<https://epochtxhub.com>（GitHub Pages 仓库：`EpochTX/my-site`）

静态 HTML / CSS / JavaScript，无需构建或安装依赖。首页包括个人介绍、生活相册、小工具入口和联系信息，支持移动端与深浅模式。

## 本地预览

```bash
python -m http.server 8000
```

访问 http://localhost:8000 。

## 修改内容

- 首页文字与链接：`index.html`
- 首页样式：`assets/home.css`
- 生活照片：上传到 `assets/photos/`，在 `assets/photos.js` 登记。详见 `assets/photos/README.md`。
- 联系邮箱：`admin@epochtxhub.com`

旧版首页完整保留在 `classic.html`，底部可访问。原工具页及其 `assets/site.css`、`assets/site.js` 保留，首页使用独立样式避免影响工具功能。`CNAME` 保留原自定义域名。
