---
title: Docusaurus之——主题安装及使用(3)
categories:
  - 站点
  - Docusaurus
tags:
  - Docusaurus
abbrlink: 3ffa610c
date: 2025-08-08 08:51:51
---
## 一 概述

```
Docusaurus 的主题(Theme)控制网站的 UI 外观和基础样式结构，
比如：配色、导航栏、代码高亮样式、页面布局等
```

<!--more-->

## 二 主题地址

### 2.1 官方插件列表(带地址)

|             插件名称             |                           功能                           |                           NPM 链接                           |                          文档链接                           |
| :------------------------------: | :------------------------------------------------------: | :----------------------------------------------------------: | :---------------------------------------------------------: |
|    @docusaurus/theme-classic     | 默认经典主题，包含 Navbar、Sidebar、暗色模式、代码高亮等 | [NPM](https://www.npmjs.com/package/@docusaurus/theme-classic) | [Docs](https://docusaurus.io/docs/api/themes/theme-classic) |
| @docusaurus/theme-search-algolia |                   Algolia 搜索 UI 主题                   | [NPM](https://www.npmjs.com/package/@docusaurus/theme-search-algolia) |          [Docs](https://docusaurus.io/docs/search)          |

### 2.2 非官方社区主题(推荐探索)

1、说明

```
虽然 Docusaurus 主要靠 swizzle 自定义经典主题，但社区中也有人开发一些美化主题
这些一般作为插件+主题组合使用。
```

2、主题

|                             名称                             | GitHub 地址  |           简介           |
| :----------------------------------------------------------: | :----------: | :----------------------: |
|  [docusaurus-theme-redoc](https://github.com/Redocly/redoc)  | Redocly 出品 |    用于 OpenAPI 文档     |
| [docusaurus-theme-live-codeblock](https://github.com/FormidableLabs/docusaurus-theme-live-codeblock) |  Formidable  | 支持代码块在线编辑和运行 |
| [docusaurus-lunaria](https://github.com/M0nica/docusaurus-lunaria) |    M0nica    |   一款极简个人博客主题   |

## 三 使用步骤

### 3.1 安装主题

```
1、说明
以 @docusaurus/theme-classic 为例，
默认 create-docusaurus 项目就已内置，无需手动安装。
但若需重装：

2、指令
npm install @docusaurus/theme-classic
```

### 3.2 使用主题

```
1、在 docusaurus.config.js 中配置 themes
module.exports = {
  themes: ['@docusaurus/theme-classic'],
};

2、若是配置主题选项，则在 themeConfig 中进行设置
module.exports = {
  themeConfig: {
    navbar: {
      title: 'My Site',
      items: [...],
    },
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} My Site`,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
  }
}
```

## 四 自定义主题组件

### 4.1 Swizzle主题

```
Swizzle 是 Docusaurus 提供的主题组件覆盖机制。
```

### 4.2 修改

```
如果你想修改默认的 UI 组件（比如 Navbar、Footer、DocItem 等），可以执行：
npm run swizzle @docusaurus/theme-classic Navbar

然后你会看到
src/theme/Navbar/index.js

此时你就可以自定义组件了（它会替代原来的主题组件）

你还可以列出所有可 swizzle 的组件
npm run swizzle @docusaurus/theme-classic --list
```

## 五 自定义主题(高级)

### 5.1 配置

```
如果你希望开发自己的主题，可以像开发插件一样配置本地路径：
themes: [require.resolve('./src/themes/my-theme')]
```

### 5.2 结构图

```
并提供
src/themes/my-theme/
├── index.js
├── theme/
│   └── Layout.js

index.js 示例
module.exports = function myTheme(context, options) {
  return {
    name: 'my-theme',
    getThemePath() {
      return './theme';
    },
  };
};
```

## 六 常见主题配置(在 `themeConfig` 中)

```
themeConfig: {
  navbar: {
    title: '文档标题',
    logo: { alt: 'Logo', src: 'img/logo.svg' },
    items: [ ... ],
  },
  footer: {
    style: 'dark',
    links: [ ... ],
  },
  colorMode: {
    defaultMode: 'dark',
    disableSwitch: false,
  },
  prism: {
    theme: require('prism-react-renderer/themes/github'),
    darkTheme: require('prism-react-renderer/themes/dracula'),
  },
}
```

## 七 主题 vs 插件 区别一览

|     比较项     | 主题(Theme) |      插件(Plugin)      |
| :------------: | :---------: | :--------------------: |
| 控制 UI 和样式 |    ✅ 是     |          ❌ 否          |
|  控制功能行为  |    ❌ 否     |          ✅ 是          |
| 是否可 swizzle |    ✅ 是     | ❌ 否（需写自定义插件） |
| 自定义扩展方式 | src/theme/* |     src/plugins/*      |

## 八 总结

|           想要实现            |                  推荐方法                  |
| :---------------------------: | :----------------------------------------: |
|      修改默认样式、组件       |  Swizzle `@docusaurus/theme-classic` 组件  |
|          用中文搜索           |          使用搜索插件而非主题控制          |
|         想换视觉风格          | 基于 `theme-classic` 扩展 / 开发自己的主题 |
| 想迁移风格类似 Hugo、VuePress |   Swizzle 组件 + Tailwind 重写布局可实现   |

