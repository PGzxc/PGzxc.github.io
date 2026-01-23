---
title: VitePress之——修改与配置(2)
categories:
  - 站点
  - VitePress
tags:
  - VitePress
abbrlink: ff40901c
date: 2025-08-10 08:38:48
---
## 一 概述

```
本文介绍对默认项目的修改：
 -简体中文 UI
 -定制首页(Hero + 功能卡片)
 -替换品牌配色
 -支持中文搜索
 -加入 PWA
 -加入评论系统
```

<!--more-->

## 二 初始化项目

### 2.1 初始化指令

```
mkdir my-docs
cd my-docs
npm init -y
npm add -D vitepress
npx vitepress init
```

### 2.2 初始化过程中选择

```
✔ Site title: 我的文档站
✔ Site description: 基于 VitePress 构建
✔ Theme: Default theme
✔ Location of docs: ./docs
✔ Ready to start? Yes
```

### 2.3 启动查看

```
npx vitepress dev docs
```

## 三 调整与修改

### 3.1 调整后目录结构

```
docs/
├─ .vitepress/
│  ├─ config.ts         # 配置文件
│  ├─ theme/
│  │  ├─ index.ts       # 自定义主题入口
│  │  ├─ custom.css     # 自定义样式
├─ public/
│  ├─ logo.png
│  ├─ favicon.ico
├─ index.md             # 首页
├─ guide/
│  ├─ index.md
│  ├─ install.md
```

### 3.2 开始修改

1、配置简体中文 + 站点信息(编辑 `docs/.vitepress/config.ts`)

```
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '我的文档站',
  description: '基于 VitePress 构建的中文站点',
  lastUpdated: true,
  outDir: '../dist',

  themeConfig: {
    siteTitle: '文档站',
    logo: '/logo.png',

    nav: [
      { text: '指南', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com' }
    ],

    sidebar: {
      '/guide/': [
        { text: '介绍', link: '/guide/' },
        { text: '安装', link: '/guide/install' }
      ]
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',

    footer: {
      message: 'MIT 协议',
      copyright: 'Copyright © 2025'
    }
  }
})
```

2、定制首页(编辑 `docs/index.md`)

```
---
layout: home
hero:
  name: 我的文档站
  text: 极速、简洁、美观
  tagline: 基于 VitePress + Vue3 构建
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com
features:
  - icon: ⚡
    title: 极速热更
    details: Vite 驱动的开发体验，几乎零等待
  - icon: 🛠
    title: 易于配置
    details: 少量配置即可完成站点搭建
  - icon: 🌍
    title: 多语言支持
    details: 内置国际化，轻松切换语言
---
```

3、替换品牌配色

```
1、docs/.vitepress/theme/custom.css
:root {
  --vp-c-brand: #42b883;
  --vp-c-brand-light: #53c98d;
  --vp-c-brand-dark: #36896d;
}

2、docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  ...DefaultTheme
}
```

4、加入 PWA 支持

```
1、安装依赖
npm add vite-plugin-pwa -D

2、docs/.vitepress/config.ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: '我的文档站',
          short_name: 'Docs',
          icons: [
            { src: '/logo.png', sizes: '192x192', type: 'image/png' }
          ]
        }
      })
    ]
  }
})
```

5、加入评论系统(Giscus)

```
1、安装依赖
npm i @giscus/vue

2、docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import Giscus from '@giscus/vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Giscus', Giscus)
  }
}


3、在文章底部插入(markdown)
<Giscus
  repo="你的GitHub名/你的仓库名"
  repo-id="xxxx"
  category="Announcements"
  category-id="xxxx"
  mapping="pathname"
  reactions-enabled="1"
  emit-metadata="0"
  input-position="top"
  theme="light"
  lang="zh-CN"
/>
```

### 3.3 修改后效果

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/vitepress-2-modify-effect-1.png