---
title: Docusaurus之——站点配置(4)
categories:
  - 站点
  - Docusaurus
tags:
  - Docusaurus
abbrlink: dcd51eb0
date: 2025-08-08 08:52:26
---
## 一 概述

```
Docusaurus v3 的站点配置，可以从以下几个维度来处理，
包括标题、描述、首页、Logo、导航栏、文档路由、语言、颜色主题、搜索等等
```

<!--more-->

## 二 修改内容

### 2.1  修改网站基本信息

```
1、位置
打开 docusaurus.config.js（或 .mjs，v3 默认推荐用 ESM）：

2、修改
// docusaurus.config.js（或 docusaurus.config.mjs）
export default {
  title: '我的站点',                 // ✅ 网页标题（浏览器 tab 上显示）
  tagline: '我的项目描述',           // ✅ 描述（SEO 用）
  url: 'https://mydomain.com',       // ✅ 网站根域名
  baseUrl: '/',                      // ✅ 部署子路径（如 GitHub Pages 用 '/myproject/'）

  favicon: 'img/favicon.ico',        // ✅ 网站图标
};
```

### 2.2 修改 Logo 和导航栏

```
1、修改
themeConfig: {
  navbar: {
    title: '我的站点',               // 顶部标题
    logo: {
      alt: '站点 Logo',
      src: 'img/logo.svg',          // ✅ logo 路径，放在 static/img 下
    },
    items: [
      { to: '/docs/intro', label: '文档', position: 'left' },
      { to: '/blog', label: '博客', position: 'left' },
      { href: 'https://github.com/your-org', label: 'GitHub', position: 'right' },
    ],
  },
}

2、图标路径是：
static/img/logo.svg，替换成你自己的即可
```

### 2.3 修改首页内容

1、方法 1：使用 React 首页（默认）

```
1、修改这个文件：
src/pages/index.js

2、内容
import React from 'react';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout title="首页标题" description="首页描述">
      <main>
        <h1>你好，欢迎来到 Docusaurus v3！</h1>
        <p>这是你自定义的首页内容</p>
      </main>
    </Layout>
  );
}
```

2、方法 2：使用 Markdown 首页(更简单)

```
1、操作
 删除 src/pages/index.js
 新建 docs/index.md
 配置 routeBasePath: '/' 让文档首页成为站点首页。
 
 2、配置
 presets: [
  [
    'classic',
    {
      docs: {
        path: 'docs',
        routeBasePath: '/', // ✅ 文档就是首页
      },
    },
  ],
]
```

### 2.4  修改文档目录结构

```
1、文档 Markdown 放在：
/docs

2、修改文档目录结构 → 编辑 sidebars.js
export default {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '开始',
      items: ['doc1', 'doc2'],
    },
  ],
};
```

### 2.5 修改语言/本地化(i18n)

```
1、配置
i18n: {
  defaultLocale: 'zh-CN',
  locales: ['zh-CN', 'en'],
},

2、生成翻译 JSON 文件：
npm run write-translations

3、翻译路径在 /i18n/zh-CN/ 中，编辑其中的 .json 文件即可
```

### 2.6 修改主题样式 / 暗色模式

```
themeConfig: {
  colorMode: {
    defaultMode: 'light',
    disableSwitch: false,
    respectPrefersColorScheme: true,
  },
  prism: {
    theme: require('prism-react-renderer/themes/github'),
    darkTheme: require('prism-react-renderer/themes/dracula'),
  },
}
```

### 2.7 修改 Footer

```
footer: {
  style: 'dark',
  links: [
    {
      title: '文档',
      items: [
        { label: '入门', to: '/docs/intro' },
      ],
    },
    {
      title: '社区',
      items: [
        { label: 'GitHub', href: 'https://github.com/your-org' },
      ],
    },
  ],
  copyright: `Copyright © ${new Date().getFullYear()} 我的组织`,
},
```

### 2.8 配置中文搜索插件(本地，无需 Algolia)

```
1、安装
npm install @cmfcmf/docusaurus-search-local

2、配置
plugins: [
  [
    '@cmfcmf/docusaurus-search-local',
    {
      language: ['zh', 'en'],
    },
  ],
]
```

### 2.9 设置默认首页为文档首页(非自定义 React 页)

```
presets: [
  [
    'classic',
    {
      docs: {
        routeBasePath: '/', // 文档就是首页
      },
      blog: false, // 如果不需要博客
    },
  ],
]
```

### 2.10 快速预览修改结果

```
npm run start

修改配置文件后实时生效，刷新页面即可看到更改。
```

