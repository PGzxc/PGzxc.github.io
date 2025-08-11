---
title: VuePress之——修改与配置(2)
categories:
  - 站点
  - VuePress
tags:
  - VuePress
abbrlink: bae834f9
date: 2025-08-11 08:03:43
---
## 一 概述

```
本文对默认站点进行修改与配置，也是对默认主题进行配置
```

<!--more-->

## 二 基本配置

### 2.1 配置格式

```
.
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
└─ package.json
```

### 2.2 .vuepress/config.js如下

```
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around'
}
```

## 三 修改与配置

### 3.1 修改首页

1、修改配置

```
1、文件位置
docs/README.md

2、文件内容
---
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

2、效果图

![][1]

### 3.2 导航栏链接

1、修改配置

```
1、位置
docs/.vuepress/config.js

2、修改
module.exports = {
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Bar', link: '/bar/' },
      { text: 'Foo', link: '/foo/' },
    ]
  }
}
```

2、效果图

![][2]

### 3.3 多个侧边栏

1、目录结构(仅docs下侧边栏)

```
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar/
   ├─ README.md
   ├─ three.md
   └─ four.md
```

2、配置

```
1、位置
docs/.vuepress/config.js

2、配置nav和sidebar
 themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Bar', link: '/bar/' },
      { text: 'Foo', link: '/foo/' },
      { text: '联系我', link: '/contact' },
      { text: '关于', link: '/about' },
    ],
    sidebar: {
      '/foo/': [
        '',     /* /foo/ */
        'one',  /* /foo/one.html */
        'two'   /* /foo/two.html */
      ],

      '/bar/': [
        '',      /* /bar/ */
        'three', /* /bar/three.html */
        'four'   /* /bar/four.html */
      ],

      // fallback
      '/': [
        '',        /* / */
        'contact', /* /contact.html */
        'about'    /* /about.html */
      ]
    }
  },
```

3、效果图

![][3]

## 四 参考

* [VuePress中文文档—默认主题配置](https://www.vuepress.cn/theme/default-theme-config.html)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/vuepress-2-home-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/vuepress-2-nav-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/vuepress-2-bar-3.png