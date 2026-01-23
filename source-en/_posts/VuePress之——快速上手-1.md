---
title: VuePress之——快速上手(1)
categories:
  - 站点
  - VuePress
tags:
  - VuePress
abbrlink: 13c79ecb
date: 2025-08-11 08:02:41
---
## 一 概述

```
VuePress 是一个由 Vue.js 驱动的静态网站生成器，
常用于搭建文档、博客或知识库，
默认支持简体中文环境，并且内置了一些中文友好的排版优化
```

<!--more-->

## 二 前提条件

```
Node.js >=8.6
```

## 三 开发步骤

### 3.1 创建并进入一个新目录

```
mkdir vuepress-starter && cd vuepress-starter
```

### 3.2 包管理器进行初始化

```
npm init
```

### 3.3 全局安装 VuePress

```
npm install -D vuepress
```

### 3.4 创建你的第一篇文档

```
mkdir docs && echo '# Hello VuePress' > docs/README.md
```

### 3.5 在package.json中添加一些 scripts

```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

### 3.6 启动本地服务器

```
1、启动指令
npm run docs:dev

2、打开网页
 http://localhost:8080
```

效果图

![][1]

## 四 参考

* [VuePress中文官网](https://www.vuepress.cn/guide/getting-started.html)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/vuepress-1-open-1.png