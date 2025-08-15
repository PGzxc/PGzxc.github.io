---
title: Hexo站点建设之——离线访问错误
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 6c081396
date: 2025-08-15 11:36:10
---
## 一 离线错误

```
fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Inconsolata:ital,wght@0,300;0,400;
0,700;1,300;1,400;1,700&display=swap&subset=latin,latin-ext:1 
Failed to load resource: net::ERR_NAME_NOT_RESOLVED cdnjs.cloudflare.com/ajax/libs/gitalk/1.8.0/gitalk.css:1 
Failed to load resource: net::ERR_NAME_NOT_RESOLVED cdnjs.cloudflare.com/ajax/libs/animate.css/3.1.1/animate.min.css:1 
Failed to load resource: net::ERR_NAME_NOT_RESOLVED cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css:1 
Failed to load resource: net::ERR_NAME_NOT_RESOLVED anime.min.js:1 
Failed to load resource: net::ERR_NAME_NOT_RESOLVED search.js:1 
Failed to load resource: net::ERR_NAME_NOT_RESOLVED medium-zoom.min.js:1 
Failed to load resource: net::ERR_NAME_NOT_RESOLVED pjax.min.js:1 
Failed to load resource: net::ERR_NAME_NOT_RESOLVED pjax.js:3 

Uncaught ReferenceError: Pjax is not defined at pjax.js:3:14 next-boot.js:46 
Uncaught TypeError: window.mediumZoom is not a function at NexT.boot.refresh (next-boot.js:46:31) at HTMLDocument.<anonymous> (next-boot.js:78:13) local-search.js:9 
Uncaught ReferenceError: LocalSearch is not defined at HTMLDocument.<anonymous> (local-search.js:9:23) cdnjs.cloudflare.com/ajax/libs/wavedrom/3.5.0/wavedrom.min.js:1 
Failed to load resource: net::ERR_NAME_NOT_RESOLVED （索引）:1 Uncaught (in promise) Event
```

<!--more-->

## 二 现象及原因分析

### 2.1 现象

```
其实就是主题依赖的外部 CDN 资源无法访问导致的。

目前看到的 net::ERR_NAME_NOT_RESOLVED、Pjax is not defined、
mediumZoom is not a function 都是因为 JS / CSS 文件没能加载到本地
```

### 2.2 原因

```
默认 NexT 等 Hexo 主题很多资源走 Google Fonts、cdnjs 等外网 CDN。
离线环境（或无外网）就会直接 404 / DNS 解析失败。
因为依赖文件没加载成功，所以后续 JS 调用就报 xxx is not defined
```

## 三 解决方案(hexo-offline v2配置方法)

### 3.1 安装插件

```
npm install hexo-offline --save
```

### 3.2 创建配置文件

```
1、在你的 Hexo 根目录(不是主题目录)新建：hexo-offline.config.cjs

2、内容
// hexo-offline v2 配置示例
module.exports = {
  // 是否启用插件
  enable: true,

  // 缓存的文件匹配规则（支持 glob）
  caches: [
    '**/*.css',
    '**/*.js',
    '**/*.woff2',
    '**/*.woff',
    '**/*.ttf',
    '**/*.svg',
    '**/*.png',
    '**/*.jpg',
    '**/*.gif',
    '**/*.webp',
    '**/*.ico'
  ],

  // 忽略缓存的文件
  ignores: [
    '**/drafts/**'
  ],

  // Workbox 配置（生成的 Service Worker 逻辑）
  workbox: {
    globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,woff2}'],
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5MB
  },

  // 额外要缓存的外部资源（可选）
  external: [
    '/lib/fontawesome/css/all.min.css',
    '/lib/animate/animate.min.css',
    '/lib/gitalk/gitalk.css',
    '/lib/gitalk/gitalk.min.js'
  ]
}
```

### 3.3 把外链资源换成本地路径(可不配置跳过)

```
1、说明
因为 hexo-offline 不会自动帮你下载外部 CDN 文件，
你需要先把这些资源（Google Fonts、cdnjs 等）手动下载到 source/lib 目录，
然后在主题 _config.yml 里把原外链改成本地引用，

2、示例
vendors:
  fontawesome: /lib/fontawesome/css/all.min.css
  animate: /lib/animate/animate.min.css
  gitalk_css: /lib/gitalk/gitalk.css
  gitalk_js: /lib/gitalk/gitalk.min.js
```

### 3.4 Google Fonts 处理(可不处理)

```
1、说明
如果你用 NexT 主题

2、配置
font:
  enable: false

3、或者改成本地 .woff2 引用，这样不会依赖外网
```

### 3.5 生成并测试

```
hexo clean && hexo g && hexo s
```

## 四 参考

* [Google Fonts](https://fonts.google.com/)
* [cdnjs](https://cdnjs.com/)