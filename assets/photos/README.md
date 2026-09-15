# 添加生活照片

1. 把照片上传到这个目录，建议使用 JPG / WebP，长边 1600px 左右，单张尽量小于 500 KB。
2. 编辑 `assets/photos.js` 中的数组，例如：

```js
window.LIFE_PHOTOS = [
  { src: 'assets/photos/weekend.jpg', alt: '周末散步时的湖面', caption: '周末散步', date: '2026.09' },
  { src: 'assets/photos/daily.jpg', alt: '窗边的日常', caption: '平凡的一天', date: '2026.09', position: '50% 40%' }
];
```

第一张显示为大幅照片。可继续增加条目；点击照片能放大，Esc 关闭。数组为空时保留相册占位设计。照片路径区分大小写。照片会在公开网站展示，上传前可移除 EXIF 定位信息。
