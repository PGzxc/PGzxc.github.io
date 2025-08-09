---
title: Docsify之——Docsify主题(3)
categories:
  - 站点
  - Docsify
tags:
  - Docsify
abbrlink: d34b0c38
date: 2025-08-09 08:18:44
---
## 一 概述

```
本文介绍对Docsify主题引用与修改
 - Docsify 官方内置主题
 - 自定义主题
 - 第三方主题
```

<!--more-->

## 二 Docsify 官方内置主题

### 2.1 使用官方内置主题

1、介绍

```
1、位置
index.html

2、默认
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/lib/themes/vue.css">

3、修改为
<!-- 切换为深色主题 -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/lib/themes/dark.css">
```

2、可选主题

|    主题名    |    引入地址     |
| :----------: | :-------------: |
|   Vue 风格   | `vue.css`(默认) |
|  Buble 风格  |    buble.css    |
|  Dark 风格   |    dark.css     |
|  Pure 风格   |    pure.css     |
| Dolphin 风格 |   dolphin.css   |
|  Light 风格  |    light.css    |

## 三 自定义主题

### 3.1 说明

```
你可以覆盖官方样式，实现自己想要的配色、字体、布局等
```

### 3.2 步骤

```
1、在 index.html 中引入你的样式文件
<link rel="stylesheet" href="assets/custom.css">

2、在 assets/custom.css 中修改主题变量或样式
:root {
  --theme-color: #007acc;
  --sidebar-width: 260px;
}

.app-name {
  font-size: 22px;
  color: var(--theme-color);
  font-weight: bold;
}

.sidebar {
  background-color: #f8f9fa;
}

.sidebar-nav > ul > li > a {
  font-size: 16px;
  padding: 8px 16px;
}

3、提示：
Docsify 使用 CSS 变量（例如 --theme-color）控制颜色，兼容性好、改起来方便
```

## 四 第三方主题(docsify-themeable)

### 4.1 项目地址

```
https://jhildenbiddle.github.io/docsify-themeable/
```

### 4.2 项目介绍

```
提供 40+ 可配置的主题变量
支持暗色 / 亮色切换
可通过 CSS 修改字体、字号、间距等
文档完整且支持自定义
```

