---
title: Docusaurus之——开发静态网站(1)
categories:
  - 站点
  - Docusaurus
tags:
  - Docusaurus
abbrlink: 1b4794f0
date: 2025-08-08 08:48:59
---
## 一 概述

```
Docusaurus 是一个基于 React 的静态网站生成器，专注于构建文档网站，
支持 Markdown 撰写内容、导航目录生成、搜索、多语言、版本管理、主题切换等高级功能。

官网：https://docusaurus.io/
```

<!--more-->

## 二 Docusaurus 适合谁？

|        人群         |             适用场景             |
| :-----------------: | :------------------------------: |
|       开发者        | 技术文档、API 手册、开源项目官网 |
|      产品团队       |      搭建产品介绍、帮助中心      |
|     教程创作者      |  制作现代感强的课程 / 教学网站   |
| 多语言 / 多版本文档 |     国际化站点、历史版本归档     |

## 三 快速入门：搭建一个 Docusaurus 文档站点

### 3.1 开发环境

```
本地安装 Node.js (>= 16)
```

### 3.2 创建项目

```
1、执行指令
npx create-docusaurus@latest my-docs classic
cd my-docs
npm install

2、上面命令将自动初始化一个文档网站，包含如下结构：
my-docs/
├── docs/                // Markdown 文档目录
├── src/                 // 自定义 React 组件
├── blog/                // 可选博客内容
├── static/              // 静态资源
├── docusaurus.config.js // 站点配置文件
└── sidebars.js          // 侧边栏配置
```

### 3.3 本地运行预览

```
1、执行指令
npm run start

2、访问：
http://localhost:3000
```

预览效果

![][1]

### 3.4 构建静态网站

```
1、指令
npm run build

2、说明
输出目录为 build/，可部署至 GitHub Pages、Vercel、Netlify、Cloudflare Pages 等平台。
```

## 四 目录结构说明

|      目录/文件       |                 功能说明                  |
| :------------------: | :---------------------------------------: |
|        docs/         |          存放 Markdown 格式文档           |
|     sidebars.js      | 控制侧边栏的结构(类似 GitBook 的 SUMMARY) |
| docusaurus.config.js |   网站基本配置：站点名、主题、导航栏等    |
|       static/        |      存放图片、图标、PDF 等静态资源       |
|        blog/         |     可选的博客功能(也支持 Markdown)      |

## 五 支持的高级特性

|     特性      |                   说明                   |
| :-----------: | :--------------------------------------: |
| Markdown 撰写 |      支持标准 MD 语法 + 自定义扩展       |
|    多语言     |       内建 i18n（适合国际化项目）        |
|    多版本     |  比如 `v1.x`, `v2.x`，适合 API 演进记录  |
|   搜索功能    |    Algolia DocSearch（免费版也能用）     |
|  自定义主题   |    支持自定义 CSS、React UI、插件机制    |
| 黑暗模式切换  |        自动适配系统，也可手动切换        |
|   部署方便    | GitHub Pages、Vercel、Netlify、Docker 等 |

## 六 与 GitBook 的对比(概括)

|           特性           | GitBook(CLI) |       Docusaurus       |
| :----------------------: | :----------: | :--------------------: |
|         内容格式         |   Markdown   | Markdown + React 支持  |
|        主题自定义        |     较弱     | 非常强，支持自定义组件 |
|         插件生态         |    较老旧    |       活跃且现代       |
| 适合团队协作适合团队协作 |     一般     |    强，可集成 CI/CD    |
|         搜索功能         |     基本     |  内建 Algolia 强搜索   |
|         是否开源         |      是      |           是           |
|       是否活跃维护       |   停止维护   | Facebook 主导活跃维护  |

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/docusaurus-1-website-1.png