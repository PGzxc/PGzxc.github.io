---
title: 前端构建工具Vite——插件与模板6
categories:
  - 开发
  - T-构建
  - Vite
tags:
  - Vite
abbrlink: 113dfdc4
date: 2025-07-18 06:32:26
---
## 一 概述

```
Vite 不仅是一个极快的前端构建工具，它还拥有非常丰富的插件生态和社区模板，
能显著提升你的开发效率、扩展能力与工程规模适应性。

本篇将为你推荐 Vite 常用插件分类与优秀模板项目，助你快速启动现代化应用！
```

<!--more-->

## 二 Vite 插件机制简介

```
1、说明
Vite 插件机制基于 Rollup 插件系统构建，
并扩展了更多开发阶段相关的钩子（如 dev server、热更新、模块解析等）。

2、常见用途包括：

- 自动导入 / 自动注册
- API 代理 / Mock 数据
- 国际化、多语言支持
- PWA 支持
- 打包压缩 / 分析工具
- 文件路由、图标、SVG 等自动处理
```

## 三 官方推荐插件

| 插件 | 功能 |
|------|------|
| @vitejs/plugin-vue | 支持 Vue 单文件组件 |
| @vitejs/plugin-react | 支持 React JSX |
| @vitejs/plugin-legacy | 支持旧浏览器兼容 |
| @vitejs/plugin-basic-ssl | 一键开启 HTTPS |
| @vitejs/plugin-vue-jsx | Vue 支持 JSX |

## 四 开发提效类插件推荐

### 4.1 unplugin-auto-import

```
1、自动导入 `ref`, `reactive`, `defineStore` 等常用 API。
npm i -D unplugin-auto-import

2、配合 vite.config.js：

AutoImport({
  imports: ['vue', 'vue-router', 'pinia'],
  dts: 'src/auto-imports.d.ts'
})
```

### 4.2 unplugin-vue-components

```
自动注册 Vue 组件，无需手动 import。

Components({
  dirs: ['src/components'],
  extensions: ['vue'],
  dts: 'src/components.d.ts'
})
```

### 4.3 vite-plugin-pages

```
1、基于文件结构生成路由（如 Nuxt 风格）
npm i vite-plugin-pages -D

2、示例
import Pages from 'vite-plugin-pages'

plugins: [
  Pages({
    dirs: 'src/pages',
    extensions: ['vue']
  })
]
```

### 4.4 vite-plugin-svg-icons

```
SVG 图标自动加载为组件，适合图标库管理。
npm i vite-plugin-svg-icons -D
```

### 4.5 vite-plugin-pwa

```
1、将 Vite 项目升级为渐进式 Web 应用（PWA）
npm i vite-plugin-pwa -D

2、配置：
import { VitePWA } from 'vite-plugin-pwa'

plugins: [
  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg'],
    manifest: {
      name: 'My App',
      short_name: 'App',
      theme_color: '#ffffff',
      icons: [...]
    }
  })
]
```

### 4.6 rollup-plugin-visualizer

```
1、构建打包可视化分析图
npm i rollup-plugin-visualizer -D

2、配置
visualizer({ open: true })
```

## 五 实用功能类插件推荐

|          插件           |            功能            |
| :---------------------: | :------------------------: |
| vite-plugin-compression |  启用 gzip / brotli 压缩   |
|   vite-plugin-inspect   | 插件调试工具，展示调用顺序 |
|    vite-plugin-mock     |   本地 Mock 服务模拟 API   |
|    vite-plugin-html     |   动态注入变量到 HTML 中   |
|   vite-plugin-eslint    |  开发期间实时 ESLint 校验  |

## 六 测试、调试与质量工具

|        插件         |                功能                |
| :-----------------: | :--------------------------------: |
|       Vitest        |         原生 Vite 测试工具         |
| vite-plugin-checker | 启用 TypeScript/ESLint/Vue TS 检查 |
|   cypress + vite    |     配置 E2E 测试工具兼容 Vite     |

## 七 优质模板项目推荐(Vue / React)

### 7.1 Vue 系列

```
1. Vitesse
地址：https://github.com/antfu/vitesse
作者：Anthony Fu（Vue 核心贡献者）
特点：最火的 Vite + Vue3 + Tailwind + 自动导入 + 文件路由组合模板

2. Vben Admin
地址：https://github.com/vbenjs/vue-vben-admin
企业级后台模板，功能齐全，基于 Vue3 + Vite + TypeScript + Pinia

3. Nuxt3
地址：https://nuxt.com/
虽然不是直接基于 Vite，但其底层构建工具正是 Vite，适合大型项目。
```

### 7.2 React 系列

```
1. Vite React TS Template
地址：https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts
Vite 官方的 React + TypeScript 模板，轻量简洁

2. React Vite Admin
地址：https://github.com/anncwb/react-vite-admin
React 企业级后台管理模板，集成了 Redux、AntD、权限控制等
```

## 八 如何开发自己的插件？

```
1、插件
//插件本质是一个对象，支持 Vite 插件钩子
export default function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      if (id.endsWith('.js')) {
        return code.replace('__VERSION__', '1.0.0')
      }
    }
  }
}
2、你也可以发布到 NPM 并共享到社区
```

## 九 总结

### 9.1 说明

```
Vite 插件生态已经非常活跃，无论是 Vue、React，
还是企业管理后台、PWA、小项目原型设计，都有成熟的模板和插件支持。
你可以按需选型、自由组合，快速搭建高效的前端开发环境。
```

### 9.2 快速插件选择建议

|     场景      |           插件           |
| :-----------: | :----------------------: |
|   自动引入    |   unplugin-auto-import   |
| 组件自动注册  | unplugin-vue-components  |
|   图标管理    |  vite-plugin-svg-icons   |
| 路由自动生成  |    vite-plugin-pages     |
| 本地 API 模拟 |     vite-plugin-mock     |
|      PWA      |     vite-plugin-pwa      |
|   构建分析    | rollup-plugin-visualizer |


## 十 参考

* [Vite官方中文文档](https://cn.vitejs.dev/guide/)

