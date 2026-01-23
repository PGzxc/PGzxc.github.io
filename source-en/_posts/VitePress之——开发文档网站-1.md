---
title: VitePress之——开发文档网站(1)
categories:
  - 站点
  - VitePress
tags:
  - VitePress
abbrlink: b2f26e53
date: 2025-08-10 08:37:23
---
## 一 概述

```
VitePress 是一个基于 Vite + Vue3 的轻量级静态文档站点生成器，专为编写文档和技术博客设计。

-官网地址：https://vitepress.dev
-GitHub：https://github.com/vuejs/vitepress
```

<!--more-->

## 二 快速开始：用 VitePress 搭建一个文档站点

### 2.1 创建项目目录

```
mkdir my-docs && cd my-docs
npm init -y
npm install vitepress
```

### 2.2 创建文档目录结构

```
mkdir -p docs/.vitepress
touch docs/index.md
touch docs/.vitepress/config.ts

目录结构如下
my-docs/
├── docs/
│   ├── index.md             # 主页
│   └── .vitepress/
│       └── config.ts        # 站点配置
└── package.json
```

## 三 示例内容

### 3.1 docs/index.md

```
# 欢迎来到我的文档站

这是使用 VitePress 搭建的静态文档网站。

- 支持 Markdown
- 支持 Vue 组件
- 支持暗色模式
```

### 3.2 docs/.vitepress/config.ts

```
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "我的文档站",
  description: "这是一个基于 VitePress 的项目",
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide' },
      { text: 'GitHub', link: 'https://github.com/你的项目' }
    ],
    sidebar: [
      {
        text: '文档',
        items: [
          { text: '快速开始', link: '/' },
          { text: '使用指南', link: '/guide' },
        ]
      }
    ]
  }
})
```

### 3.3 新建一个文档页面(可选)

```
1、创建指令
touch docs/guide.md

2、内容如下
# 使用指南

这是指南页，支持 Markdown、代码高亮、提示框等。
```

### 3.4 package.json

```
{
  "name": "my-vitepress",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "vitepress": "^1.6.4"
  }
}
```

## 四 启动本地开发服务器

1、启动服务

```
1、指令
npx vitepress dev docs

2、浏览器访问：
http://localhost:5173
```

2、效果图

![][1]

## 五 构建生产站点

```
1、指令
npx vitepress build docs

2、构建输出位于：
docs/.vitepress/dist
```

##  六  部署(推荐 GitHub Pages / Vercel)

```
1、GitHub Pages 示例
cd docs/.vitepress/dist
git init
git remote add origin https://github.com/yourname/yourrepo.git
git checkout -b gh-pages
git add .
git commit -m "deploy"
git push --force origin gh-pages

2、或使用自动化 GitHub Actions 部署。
```

## 七 高级特性一览

|     特性      |                    说明                    |
| :-----------: | :----------------------------------------: |
| Vue 组件支持  |    在 `.md` 中直接写 `<MyComponent />`     |
| 暗色模式切换  |           自动适配系统或手动切换           |
| Markdown 扩展 |     代码组、提示框、脚注、表格、图标等     |
|   搜索功能    | 内置 Fuzzy Search / 支持 Algolia DocSearch |
|    多语言     |            支持 i18n 多语言站点            |
|    SEO优化    |           自动生成 `<meta>` 标签           |
|   SSR 支持    |         可结合 Vite 使用服务端渲染         |
|   插件生态    |        支持部分 vite 插件和主题定制        |

## 八 使用场景推荐

```
Vue 项目的文档站
技术博客 / 教程网站
产品说明书
内部文档站（配合 Git 私有部署）
将旧 GitBook/VuePress 项目迁移过来
```

## 九 推荐集成(可选)

|     工具     |             用法             |
| :----------: | :--------------------------: |
|   Mermaid    | 支持流程图、时序图、甘特图等 |
| LaTeX(KaTeX) |       数学公式渲染支持       |
| TailwindCSS  |  让 Markdown 页更具样式美观  |
| Vue 组件集成 | 实现交互组件、demo 代码块等  |



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/vitepress-1-website-1.png