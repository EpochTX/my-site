# 添加生活照片 / Add photos

相册独立位于 `life.html`，首页只保留入口，不会加载照片。

1. 把照片上传到 `assets/photos/`，建议 JPG / WebP，长边约 1600px。
2. 编辑 `assets/photos.js`：

```js
window.LIFE_PHOTOS = [
  {
    src: 'assets/photos/weekend.jpg',
    alt: '周末散步时的湖面',
    altEn: 'The lake on a weekend walk',
    caption: '周末散步',
    captionEn: 'A weekend walk',
    date: '2026.09',
    position: '50% 50%'
  }
];
```

支持任意数量的照片。点击照片放大，Esc 关闭。数组为空时显示相册留白；没有英文标题时会保留原文。路径区分大小写。

Upload images to this directory and register them in `assets/photos.js`. `captionEn` and `altEn` provide English text. Photos appear only on `life.html`; an empty array displays the designed empty state.
