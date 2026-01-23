---
title: 前端构建工具Vite——Vite.config.js配置详解3
categories:
  - 开发
  - T-构建
  - Vite
tags:
  - Vite
abbrlink: 80b05ce8
date: 2025-07-15 09:23:38
---
## 一 概述

```
在上一节中，我们已经成功创建并运行了一个 Vite 项目。

接下来，让我们深入了解 Vite 的配置文件 `vite.config.js`，
看看如何通过灵活配置提升开发效率、优化打包效果以及满足项目定制化需求。
```

<!--more-->

## 二 、vite.config.js 是什么？

### 2.1 基本写法

```
`vite.config.js` 是 Vite 项目的核心配置文件，
它通过导出一个配置对象或函数，定义了开发服务器、插件、构建行为、路径别名等功能。

// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 配置项...
})
```

### 2.2 ESM 格式(推荐)

```
// vite.config.mjs
export default {
  // 配置项...
}
```

## 三、 常用配置项分类讲解

### 3.1 root(项目根目录)

```
默认是项目根目录，可以指定为子目录：

root: 'src'
```

### 3.2 base(公共基础路径)

```
部署到子目录时必须设置该项，否则资源路径会错误
适用于 GitHub Pages、Netlify 等部署场景

base: '/my-project/' // 默认是 '/'
```

### 3.3 plugins(插件系统)

```
Vite 的灵魂是插件机制，支持官方和社区插件，也兼容 Rollup 插件。

import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
```

### 3.4 server(开发服务器配置)

```
server: {
  host: true,           // 本地局域网可访问
  port: 3000,           // 指定端口
  open: true,           // 启动时自动打开浏览器
  https: false,         // 启用 HTTPS（需配置证书）
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}
```

### 3.5 resolve(路径别名与模块扩展)

```
1、设置路径别名，简化模块导入路径：

import path from 'path'

resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  extensions: ['.js', '.vue', '.ts'] // 可省略的后缀
}

2、在组件中使用
import MyComponent from '@/components/MyComponent.vue'
```

### 3.6 css(样式相关配置)

```
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `$color: red;`
    }
  },
  modules: {
    scopeBehaviour: 'local'
  }
}
```

### 3.7 define(全局变量注入)

```
1、在源码中注入全局变量

define: {
  __APP_VERSION__: '"1.0.0"'
}

2、在代码中可直接使用：
console.log(__APP_VERSION__)
```

### 3.8 build(构建相关配置)

```
build: {
  outDir: 'dist',              // 输出目录
  sourcemap: false,            // 是否生成 source map
  minify: 'esbuild',           // 使用 esbuild 压缩（也可设为 terser）
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['vue', 'vue-router'] // 拆分依赖
      }
    }
  }
}
```

## 四 实用插件推荐(Vue/React 通用)

### 4.1 实用插件

|         插件名          |       功能       |
| :---------------------: | :--------------: |
|   @vitejs/plugin-vue    |     Vue 支持     |
|  @vitejs/plugin-react   |    React 支持    |
|    vite-plugin-pages    |   文件自动路由   |
|     vite-plugin-pwa     |     PWA 支持     |
| vite-plugin-compression |  Gzip 打包压缩   |
|  unplugin-auto-import   |   API 自动导入   |
| unplugin-vue-components | Vue 组件自动引入 |

### 4.2 插件安装

```
npm install vite-plugin-pages -D
```

## 五 环境变量的使用(.env)

### 5.1 Vite 支持多环境变量

```
.env：通用环境
.env.development：开发环境
.env.production：生产环境
```

### 5.2 变量使用

```
1、变量必须以 VITE_ 开头
VITE_API_URL=https://api.example.com

2、在代码中使用
console.log(import.meta.env.VITE_API_URL)
```

## 六 配置拆分建议

```
//可以根据环境动态修改配置

export default defineConfig(({ command, mode }) => {
  return {
    base: mode === 'production' ? '/my-app/' : '/',
    plugins: [...],
    define: {
      __APP_ENV__: `"${mode}"`
    }
  }
})
```

## 七 配置文件最佳实践总结

|      场景      |                    推荐配置                    |
| :------------: | :--------------------------------------------: |
| 多模块路径简化 |              设置 `resolve.alias`              |
|    跨域调试    |              使用 `server.proxy`               |
|    CDN 部署    |                配置 `base` 路径                |
| 路由懒加载优化 | 拆分 `build.rollupOptions.output.manualChunks` |
|  项目版本控制  |         使用 `define.__APP_VERSION__`          |
|  快速组件开发  |        使用 `unplugin-auto-import` 插件        |

## 八 参考

* [Vite官方中文文档](https://cn.vitejs.dev/guide/)

