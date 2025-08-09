---
title: Docsify之——Docsify的修改与配置(2)
categories:
  - 站点
  - Docsify
tags:
  - Docsify
abbrlink: 129ce579
date: 2025-08-09 08:17:54
---
## 一 概述

```
本文介绍对Docsify 的修改与配置
让Docsfify站点更加美观！
```

<!--more-->

## 二 Docsify 修改与配置总览

|   分类   |             修改内容              |         示例 / 描述         |
| :------: | :-------------------------------: | :-------------------------: |
| 基础配置 | 网站标题 / 仓库链接 / logo / 首页 |      name、repo、logo       |
|  导航栏  |           顶部导航菜单            |  loadNavbar` + `_navbar.md  |
|  侧边栏  |      自动 / 手动配置目录结构      | loadSidebar` + `_sidebar.md |
|   主题   |        主题颜色 / 样式文件        |  替换 CSS，使用自定义主题   |
|   插件   |   搜索 / 代码复制 / 分页导航等    |      引入对应 JS 插件       |
|  封面页  |            首页引导页             | coverpage` + `_coverpage.md |
|  多语言  |       多语言目录 + 多套配置       |  `/zh/`, `/en/` 等目录结构  |
|   PWA    |           离线访问支持            |   引入 `docsify-pwa` 插件   |

## 三 项目说明

### 3.1 目录结构

```
docsify-template/
├── index.html              # 入口 HTML（含 Docsify 配置）
├── README.md               # 首页内容
├── _sidebar.md             # 侧边栏配置
├── _navbar.md              # 顶部导航配置
├── _coverpage.md           # 封面页面
├── guide/                  # 示例文档目录
│   ├── install.md
│   ├── config.md
│   └── plugins.md
└── assets/
    └── logo.png            # LOGO 示例
```

### 3.2 特性列表

```
-顶部导航栏（_navbar.md）
-左侧侧边栏目录（_sidebar.md）
-首页封面（_coverpage.md）
-搜索插件（中文支持）
-代码复制插件
-分页导航
-自定义主题色（绿色风格）
-支持 GitHub Pages 等部署
```

### 3.3 内容包含

```
index.html：已配置完 Docsify 所需功能（搜索、封面页、复制按钮、分页）
_sidebar.md & _navbar.md：已配置目录和导航结构
_coverpage.md：简洁首页封面页（带 logo）
guide/*.md：示例文档页面
assets/custom.css：主题色自定义样式（绿色风格）
assets/logo.png：logo 占位文件（可自行替换）
```

## 四 项目代码

### 4.1 项目根目录下

1、README.md

```
# 🎉 欢迎使用 Docsify 文档模板

这是一个基于 Docsify 构建的静态文档站点模板，开箱即用。

- 支持导航栏、侧边栏、封面页
- 支持搜索、分页、复制代码等插件
```

2、index.html

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Docsify 示例文档</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/lib/themes/vue.css">
  <link rel="stylesheet" href="assets/custom.css">
</head>
<body>
  <div id="app">加载中…</div>

  <script>
    window.$docsify = {
      name: 'Docsify 示例文档',
      repo: '',
      logo: 'assets/logo.png',
      loadSidebar: true,
      subMaxLevel: 2,
      loadNavbar: true,
      coverpage: true,
      search: {
        maxAge: 86400000,
        placeholder: '搜索文档',
        noData: '未找到结果',
        depth: 2,
      },
    };
  </script>

  <!-- Docsify 核心 -->
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>

  <!-- 插件：搜索 -->
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>

  <!-- 插件：代码复制 -->
  <script src="//cdn.jsdelivr.net/npm/docsify-copy-code/dist/docsify-copy-code.min.js"></script>

  <!-- 插件：分页导航 -->
  <script src="//cdn.jsdelivr.net/npm/docsify-pagination/dist/docsify-pagination.min.js"></script>
</body>
</html>
```

3、_sidebar.md

```
- 文档
  - [介绍](/README.md)
  - [安装指南](/guide/install.md)
  - [配置说明](/guide/config.md)
  - [常用插件](/guide/plugins.md)
```

4、_navbar.md

```
* [首页](/)
* [指南](/guide/install.md)
* [GitHub](https://github.com/)
```

5、_coverpage.md

```
<!-- _coverpage.md -->

![logo](assets/logo.png)

# Docsify 示例文档

> 一个简洁、快速的文档站点解决方案

[GitHub](https://github.com/)
[开始使用](/README.md)
```

### 4.2 guide目录

1、config.md

```
# 配置说明

常见配置如下：

​```js
window.$docsify = {
  name: '文档名称',
  repo: '仓库地址',
  loadSidebar: true
}
​```
```

2、install.md

```
# 安装指南

你可以通过以下方式启动本地 Docsify 服务：

​```bash
npm i -g docsify-cli
mkdir docs && cd docs
docsify init
​```
```

3、plugins.md

```
# 常用插件

- 搜索：`search.min.js`
- 分页：`docsify-pagination.min.js`
- 复制代码：`docsify-copy-code.min.js`
```

### 4.3 assets目录

1、custom.css

```
:root {
  --theme-color: #42b983;
}

.app-name {
  font-size: 20px;
  font-weight: bold;
}
```

## 五 运行项目及效果

### 5.1 启动本地预览(如果未安装 docsify-cli)

```
npm i -g docsify-cli
docsify serve .
```

### 5.2 浏览器访问

```
http://localhost:3000
```

### 5.3 效果图

![][1]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/docsify-2-modify-1.png