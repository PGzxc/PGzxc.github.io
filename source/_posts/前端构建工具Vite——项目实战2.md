---
title: 前端构建工具Vite——项目实战2
categories:
  - 开发
  - T-构建
  - Vite
tags:
  - Vite
abbrlink: 3e1373ed
date: 2025-07-14 08:46:09
---
## 一 概述

```
在上一节中，我们了解了 Vite 的原理和优势。
这一节，我们将通过实际操作，手把手教你使用 Vite 搭建一个 Vue 3 项目。
从创建项目到运行调试，一步到位！
```

<!--more-->

## 二 开发环境

* 系统：Win 11 专业版 24H2
* Node: v22.17.0
* npm：11.4.2 

## 三 创建 Vite + Vue 项目

### 3.1 执行如下指令

```
npm create vite@latest //npm环境
yarn create vite  //yarn环境
pnpm create vite //pnpm环境
```

![][1]

### 3.2 生成目录结构如下(项目名称+框架+语言)

```
vite-vue-app/
├── index.html         # 项目入口 HTML
├── vite.config.js     # Vite 配置文件
├── package.json
├── node_modules/
└── src/
    ├── main.js        # 应用入口
    ├── App.vue        # 根组件
    └── assets/        # 静态资源
```

### 3.3 安装依赖并启动

```
cd vite-vue-app
npm install
npm run dev
```

### 3.4 启动效果

```
默认会启动在 http://localhost:5173
```

![][2]

## 四 项目介绍

### 4.1 index.html文件

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

说明：Vite 会自动注入构建资源，`/src/main.js` 是你的入口模块。

### 4.2 main.js

```
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

说明：这是标准 Vue 3 的创建方式

### 4.3 App.vue

```
<template>
  <h1>Hello Vite + Vue!</h1>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
h1 {
  color: #42b983;
}
</style>
```

说明：你可以修改内容、保存，页面将热更新，无需手动刷新

## 五 开发调试常用命令

|      命令       |       作用       |
| :-------------: | :--------------: |
|   npm run dev   |  启动开发服务器  |
|  npm run build  |   打包生产资源   |
| npm run preview | 本地预览打包结果 |

## 六 支持 TypeScript / JSX(可选)

### 6.1 使用 TypeScript

```
npm create vite@latest # 在框架选择后选择 Vue + TypeScript
```

### 6.2  使用JSX

```
一、安装时
npm install -D @vitejs/plugin-vue-jsx

二、并在 vite.config.js 中添加插件
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()]
})
```

## 七 使用 CSS 预处理器(如 Sass)

```
一、安装 Sass

npm install -D sass

二、在组件中即可使用

<style lang="scss">
$color: #42b983;

h1 {
  color: $color;
}
</style>
```

## 八 参考

* [Nodejs官网](https://nodejs.org/)
* [Vite官方中文文档](https://cn.vitejs.dev/guide/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/vite-2-create-project-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-web/vite-2-pro-start-2.png