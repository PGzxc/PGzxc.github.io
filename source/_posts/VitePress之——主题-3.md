---
title: VitePress之——主题(3)
categories:
  - 站点
  - VitePress
tags:
  - VitePress
abbrlink: 626d9d29
date: 2025-08-10 08:41:13
---
## 一 概述

```
本文介绍VitePress主题相关内容
 -默认主题
 -自定义主题
 -第三方主题
```

<!--more-->

## 二 默认主题

### 2.1 说明

```
-VitePress 自带官方默认主题，功能齐全，支持导航栏(nav)、侧边栏(sidebar)、搜索、暗黑模式等。
-配置位于 docs/.vitepress/config.ts 中的 themeConfig
```

### 2.2 示例

```
export default defineConfig({
  themeConfig: {
    siteTitle: '文档站',
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        { text: '介绍', link: '/guide/' },
        { text: '安装', link: '/guide/install' },
      ],
    },
    footer: {
      message: 'MIT License',
      copyright: '2025 © YourName'
    },
    darkModeSwitchLabel: '外观切换',
    returnToTopLabel: '返回顶部',
  }
})
```

## 三 自定义主题

### 3.1 方式一：覆写默认主题样式

```
1、说明
 -在 docs/.vitepress/theme/index.ts 中引入默认主题，并扩展样式或组件
 -自定义样式写在 docs/.vitepress/theme/custom.css。
 
2、示例
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 自定义逻辑
  }
}
```

### 3.2 方式二：完全自定义主题

```
-在docs/.vitepress/theme目录下，自己写Vue组件，覆盖默认的布局(Layout.vue)、导航(Nav.vue)等。
-这适合高级定制。
```

## 四 第三方主题(vue-vben-admin)

### 4.1 介绍

```
1、介绍
Vue Vben Admin 是 Vue Vben Admin 的升级版本。
作为一个免费开源的中后台模板，它采用了最新的 Vue 3、Vite、TypeScript 等主流技术开发，
开箱即用，可用于中后台前端开发

2、项目地址
https://github.com/vbenjs/vue-vben-admin
```

### 4.2 使用步骤

```
1、克隆项目代码
git clone https://github.com/vbenjs/vue-vben-admin.git

2、安装依赖
cd vue-vben-admin
npm i -g corepack
pnpm install

3、运行
pnpm dev

4、Build
pnpm build
```

### 4.3 效果图

| 1-登录页 | ![][1] |
| :------: | :----: |
|  2-主页  | ![][2] |

## 五 常见定制点

```
导航栏(nav)：配置顶部菜单项和链接。
侧边栏(sidebar)：分目录配置不同侧边栏。
暗黑模式开关(darkModeSwitchLabel)：开关文字自定义。
页脚(footer)：版权和信息。
主题色：通过 CSS 变量或样式覆盖。
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/vitepress-3-vben-admin-login-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/vitepress-3-vben-admin-main-2.png