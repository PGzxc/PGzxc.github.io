---
title: Docusaurus之——插件安装及使用(2)
categories:
  - 站点
  - Docusaurus
tags:
  - Docusaurus
abbrlink: ae52f63b
date: 2025-08-08 08:51:12
---
## 一 概述

```
本文介绍Docusaurus 插件的 获取地址(官方/NPM)、安装方式 和 使用配置方法
```

<!--more-->

## 二 插件列表

### 2.1  官方插件列表(带地址)

|              插件名称               |         功能          |                           NPM 链接                           |                           文档链接                           |
| :---------------------------------: | :-------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|   @docusaurus/plugin-content-docs   |  文档系统(支持版本)   | [NPM](https://www.npmjs.com/package/@docusaurus/plugin-content-docs) | [Docs](https://docusaurus.io/docs/api/plugins/plugin-content-docs) |
|   @docusaurus/plugin-content-blog   |       博客系统        | [NPM](https://www.npmjs.com/package/@docusaurus/plugin-content-blog) | [Docs](https://docusaurus.io/docs/api/plugins/plugin-content-blog) |
|  @docusaurus/plugin-content-pages   | 自定义页面(React 页)  | [NPM](https://www.npmjs.com/package/@docusaurus/plugin-content-pages) | [Docs](https://docusaurus.io/docs/api/plugins/plugin-content-pages) |
|     @docusaurus/plugin-sitemap      | 自动生成 sitemap.xml  | [NPM](https://www.npmjs.com/package/@docusaurus/plugin-sitemap) | [Docs](https://docusaurus.io/docs/api/plugins/plugin-sitemap) |
| @docusaurus/plugin-google-analytics | Google Analytics 统计 | [NPM](https://www.npmjs.com/package/@docusaurus/plugin-google-analytics) | [Docs](https://docusaurus.io/docs/api/plugins/plugin-google-analytics) |

### 2.2 第三方常用插件推荐(含中文搜索)

|              插件               |             功能              |                             地址                             |
| :-----------------------------: | :---------------------------: | :----------------------------------------------------------: |
| @cmfcmf/docusaurus-search-local |   本地搜索，支持中文(推荐)    | [GitHub](https://github.com/cmfcmf/docusaurus-search-local) / [NPM](https://www.npmjs.com/package/@cmfcmf/docusaurus-search-local) |
|  docusaurus-plugin-image-zoom   | 图片点击放大(像 Medium 效果)  | [GitHub](https://github.com/LeoHentschker/docusaurus-plugin-image-zoom) |
|    docusaurus-plugin-typedoc    | 自动生成 TypeScript API 文档  | [GitHub](https://github.com/tgreyuk/typedoc-plugin-markdown) |
|    docusaurus-plugin-openapi    | 用于 Swagger/OpenAPI 文档展示 | [GitHub](https://github.com/Cloud-Technology-Solutions/docusaurus-openapi) |

## 三 使用插件的通用步骤

### 3.1 步骤 1：安装插件(使用 npm 或 yarn)

```
npm install 插件名
# 例如：
npm install @docusaurus/plugin-sitemap
```

### 3.2 步骤 2：在 `docusaurus.config.js` 中配置插件

```
1、说明
大部分插件支持传参配置（每个插件文档都有参数说明）

2、配置
plugins: [
  [
    '@docusaurus/plugin-sitemap',
    {
      changefreq: 'weekly',
      priority: 0.5,
    },
  ],
]
```

## 四 示例

### 4.1 中文搜索插件完整示例

```
1、安装
npm install @cmfcmf/docusaurus-search-local

2、配置 `docusaurus.config.js`
plugins: [
  [
    require.resolve("@cmfcmf/docusaurus-search-local"),
    {
      indexDocs: true,
      indexPages: true,
      language: ["zh", "en"], // 支持中文、英文搜索
      hashed: true,
    },
  ],
]

3、效果
效果是自动为你的网站文档内容生成本地 JSON 索引文件，实现无需服务端的全文搜索
```

### 4.2 图片放大插件示例

```
1、安装
npm install docusaurus-plugin-image-zoom

2、配置
plugins: ['docusaurus-plugin-image-zoom'],
themeConfig: {
  zoom: {
    selector: '.markdown img',
    config: {
      background: 'rgba(0, 0, 0, 0.5)',
    },
  },
},
```

### 4.3 配置多个插件组合示例

```
plugins: [
  '@docusaurus/plugin-content-docs',
  '@docusaurus/plugin-content-blog',
  '@docusaurus/plugin-sitemap',
  [
    require.resolve('@cmfcmf/docusaurus-search-local'),
    {
      language: ['zh', 'en'],
    }
  ]
]
```

## 五 官方插件文档总入口

```
🔗 官网插件文档：https://docusaurus.io/docs/using-plugins
🔗 插件 API 参考文档：https://docusaurus.io/docs/api/plugins/introduction
🔗 所有官方插件（NPM）：https://www.npmjs.com/search?q=keywords:docusaurus-plugin
```

