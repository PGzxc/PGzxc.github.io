---
title: Docusaurus之——开始写文章(5)
categories:
  - 站点
  - Docusaurus
tags:
  - Docusaurus
abbrlink: 3943cb62
date: 2025-08-08 08:53:21
---
## 一 概述

```
本文开始编写 Docusaurus v3 的文档或博客内容
```

<!--more-->

## 二 写作建议

| 内容类型 |  放置路径  |           适合内容           |
| :------: | :--------: | :--------------------------: |
|   文档   |   docs/    |   技术文档、教程、开发说明   |
|   博客   |   blog/    |   更新日志、项目动态、观点   |
| 自定义页 | src/pages/ | 关于页、招聘页、嵌入式页面等 |

## 三 开始写作

### 3.1 写文档内容(docs)

```
1、说明
默认在 docs/ 文件夹中，使用 Markdown 格式书写

2、示例：docs/intro.md
---
id: intro
title: 项目简介
sidebar_position: 1
---

# 欢迎使用 Docusaurus v3

本项目使用 Docusaurus v3 构建，支持 Markdown 编写、React 扩展、多语言、搜索等功能。

3、配置侧边栏显示顺序(在 sidebars.js 中)
export default {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '入门',
      items: ['quick-start', 'config'],
    },
  ],
};
```

### 3.2 写博客内容(blog)

```
1、位置
如果你启用了 blog 功能（在 docusaurus.config.mjs 中），博客文章位于 blog/ 文件夹。

2、示例：blog/2025-08-07-my-first-blog.md
---
title: 我写的第一篇博客
authors: [zxc]
tags: [Docusaurus, 博客]
---

欢迎阅读我的第一篇博客文章！你可以在这里使用 Markdown，也可以插入图片、代码块等内容。

3、博客自动按日期排序，会显示在 /blog 页面
```

### 3.3 写页面(自定义 React 页面)

```
1、位置
自定义页面写在 src/pages/ 文件夹。

2、示例：src/pages/about.js
import React from 'react';
import Layout from '@theme/Layout';

export default function AboutPage() {
  return (
    <Layout title="关于我们">
      <div style={{ padding: 32 }}>
        <h1>关于我们</h1>
        <p>这是一个用 Docusaurus 构建的静态网站。</p>
      </div>
    </Layout>
  );
}

3、index.js内容替换
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AboutPage from './about';
export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
      <AboutPage />
  );
}
```

## 四 效果图

| 1-修改前 | ![][1] |
| :------: | :----: |
| 2-修改后 | ![][2] |




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/docusaurus-5-modify-before-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/docusaurus-5-modify-after-2.png