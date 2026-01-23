---
title: VuePress之——使用三方主题(3)
categories:
  - 站点
  - VuePress
tags:
  - VuePress
abbrlink: ca476de9
date: 2025-08-11 08:04:18
---
## 一 概述

```
本文介绍使用官方的vuepress-theme-reco 主题(VuePress 博客主题)搭建站点
```

<!--more-->

## 二 vuepress-theme-reco介绍

### 2.1 介绍

```
这是一个： VuePress 2 + Reco 博客模板
包含首页、导航、分类、标签、搜索等配置
```

### 2.2 项目地址

```
https://github.com/vuepress-reco/vuepress-theme-reco
```

## 三 步骤(1.x)

### 3.1 安装依赖

```
npm install vuepress@1.9.10 vuepress-theme-reco@1.6.17
```

### 3.2 项目结构

```
vuepress-blog/
├─ docs/
│  ├─ .vuepress/
│  │   ├─ config.js
│  │   ├─ styles/
│  │   │   └─ index.styl
│  ├─ README.md
│  ├─ about/
│  │   └─ README.md
│  ├─ blog/
│  │   ├─ first-post.md
│  │   └─ second-post.md
├─ package.json
```

### 3.3 源代码

1、package.json

```
{
  "name": "vuepress-blog",
  "version": "1.0.0",
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  },
  "devDependencies": {
    "vuepress": "1.9.10",
    "vuepress-theme-reco": "1.6.17"
  }
}
```

2、docs/.vuepress/config.js

```
module.exports = {
  title: '我的博客',
  description: '基于 VuePress 1.x + Reco 主题的博客',
  theme: 'reco',
  themeConfig: {
    type: 'blog', // 博客类型
    author: '你的名字',
    authorAvatar: '/avatar.png', // 放到 .vuepress/public/ 下
    nav: [
      { text: '首页', link: '/' },
      { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
      { text: '关于我', link: '/about/', icon: 'reco-account' }
    ],
    blogConfig: {
      category: {
        location: 2,
        text: '分类'
      },
      tag: {
        location: 3,
        text: '标签'
      }
    },
    sidebar: 'auto',
    lastUpdated: '最后更新时间',
    record: '备案号信息',
    startYear: '2025'
  },
  markdown: {
    lineNumbers: true // 代码行号
  }
}
```

3、docs/README.md(首页)

```
---
home: true
heroText: 欢迎来到我的博客
tagline: 分享技术与生活
bgImage: '/bg.jpg' # .vuepress/public/bg.jpg
bgImageStyle: { height: '450px' }
---
```

4、docs/about/README.md

```
# 关于我

这里写你的个人介绍。
```

5、docs/blog/first-post.md

```
---
title: 我的第一篇文章
date: 2025-08-09
tags:
  - VuePress
  - 博客
categories:
  - 技术
---

这里是第一篇博客内容。
```

## 四 运行及查看

### 4.1 安装及运行

```
npm install && npm run dev
```

### 4.2 打开浏览器

```
localhost:8080
```

### 4.3 效果图

![][1]

## 五 参考

* [Github—vuepress-theme-reco](https://github.com/vuepress-reco/vuepress-theme-reco)





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/vuepress-3-theme-1.png