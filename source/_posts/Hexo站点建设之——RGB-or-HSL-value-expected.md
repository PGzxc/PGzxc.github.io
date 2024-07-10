---
title: Hexo站点建设之——RGB or HSL value expected
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 47c0ee99
date: 2022-02-09 09:49:24
---
## 一 现象

![][1]

<!--more-->

## 二 软件环境

### 2.1 hexo --version

```
hexo-cli: 4.3.0
os: win32 10.0.19043
node: 12.18.3
http_parser: 2.9.3
icu: 67.1
unicode: 13.0
```

### 2.2 主题(hexo-theme-next)

```
 "hexo-server": "2.0.0",
 "hexo-theme-next": "8.1.0"
 "hexo": "5.2.0",
```

## 三 原因分析

某些依赖导致`hexo-renderer-stylus`出现错误，导致`public/css/main.css`样式文件无法生成
![][2]

## 四 官方解释及解决办法

stylus 报错也是 highlight.js 的版本问题造成的，这一问题在 NexT 的 8.10.0 版本中被修复
![][3]

## 五 参考

* [Github——hexo-theme-next/issues/4](https://github.com/next-theme/hexo-theme-next/issues/4)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-error-rgb-expected.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-error-public-main-none.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-error-reason-stylus.png