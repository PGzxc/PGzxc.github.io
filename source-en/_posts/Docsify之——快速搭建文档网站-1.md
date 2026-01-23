---
title: Docsify之——快速搭建文档网站(1)
categories:
  - 站点
  - Docsify
tags:
  - Docsify
abbrlink: dd9ac224
date: 2025-08-09 08:16:24
---
## 一 概述

```
Docsify 是一个基于 JavaScript 的文档生成工具，
可以将你已有的 Markdown 文档实时转换为漂亮的文档网站，不需要构建步骤。
它适合轻量级、快速部署的项目文档系统
```

<!--more-->

## 二 Docsify 特点

```
-无需构建：直接用 HTML + Markdown 即可，不像 Docusaurus、VuePress 需要构建。
-实时渲染：通过 JavaScript 动态渲染 .md 文件。
-支持自定义主题和插件。
-可以托管在 GitHub Pages 或任何静态服务器上。
-支持多语言、全文搜索、目录导航、PWA 等功能
```

## 三 应用场景

### 3.1 适合的场景

```
-GitHub 开源项目的文档页面
-快速构建产品说明文档
-内部项目文档系统
-简单的博客（结合 Markdown + 自定义插件）
```

### 3.2 不适合场景

```
-需要 SEO 优化的站点（动态渲染）
-太多文档或需要复杂逻辑的系统（推荐用 Docusaurus、VuePress）
```

## 四 快速开始

### 4.1 创建项目文件夹

```
mkdir my-docs
cd my-docs
```

### 4.2 新建一个 `index.html` 文件

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>My Docs</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/lib/themes/vue.css">
</head>
<body>
  <div id="app">加载中…</div>
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
</body>
</html>
```

### 4.3 新建一个 `README.md`

```
# 欢迎使用 Docsify

这是你的项目文档首页。

## 快速导航

- [简介](#欢迎使用-docsify)
- [安装](#快速开始)
```

### 4.4 启动本地服务器(推荐)

```
1、说明
你可以用 docsify-cli 启动本地开发服务器

2、指令
npm i -g docsify-cli
docsify init ./docs
cd docs
docsify serve

3、查看效果
默认在 http://localhost:3000 查看效果
```

2、效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/docsify-1-website-1.png