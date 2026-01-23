---
title: 前端构建工具Vite——开发技巧4
categories:
  - 开发
  - T-构建
  - Vite
tags:
  - Vite
abbrlink: '32372718'
date: 2025-07-16 09:01:43
---
## 一 概述

```
在你已经掌握 Vite 项目搭建与配置后，想进一步提升开发体验和效率吗？
这一篇我们将分享一些实用技巧、插件推荐和项目实践经验，帮你把 Vite 用得更顺手、更高效！
```

<!--more-->

## 二、 使用环境变量 .env

### 2.1  支持多环境配置

```
一、Vite 支持以下几种 `.env` 文件：

- .env：默认环境
- .env.development：开发环境
- .env.production：生产环境
- .env.staging：自定义环境（需通过命令指定）

二、变量必须以 `VITE_` 开头，示例：

VITE_APP_TITLE=My Awesome App
VITE_API_BASE=https://api.example.com
```

### 2.2  代码中读取方式

```
console.log(import.meta.env.VITE_API_BASE)

//你也可以将环境变量注入 define 配置项实现全局替换
```

## 三 自动导入常用 API(如 Vue 组件、Hooks)

### 3.1 使用插件 unplugin-auto-import

```
npm install -D unplugin-auto-import
```

### 3.2 使用示例

```
// vite.config.js
import AutoImport from 'unplugin-auto-import/vite'

plugins: [
  AutoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    dts: 'src/auto-imports.d.ts'
  })
]
```

### 3.3 支持的自动导入对象

```
-Vue：ref, reactive, computed...
-Vue Router：useRoute, useRouter...
-Pinia：defineStore, storeToRefs...
```

## 四 组件自动注册(按需引入)

### 4.1 使用插件：unplugin-vue-components

```
npm install -D unplugin-vue-components
```

### 4.2 配置方式

```
import Components from 'unplugin-vue-components/vite'

plugins: [
  Components({
    dirs: ['src/components'],
    extensions: ['vue'],
    dts: 'src/components.d.ts'
  })
]
```

说明：自动导入所有组件，无需每次手动 `import`

## 五 公共样式全局引入(如 SCSS 变量)

### 5.1 scss

```
// src/styles/_vars.scss
$primary-color: #42b983;
```

### 5.2 vite.config.js

```
// vite.config.js
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@import "src/styles/_vars.scss";`
    }
  }
}
```

## 六 静态资源使用建议

### 6.1 Vite 推荐将静态资源放在 `public/` 目录下

```
public/
├── logo.png
```

### 6.2 引用方式(不参与打包)

```
<img src="/logo.png" />
```

说明：对于小图标、字体等资源，推荐直接 `import` 到组件中，让它走模块构建流程

## 七 构建分析与性能优化

### 7.1 使用打包分析插件

```
1、安装
npm install -D rollup-plugin-visualizer

2、配置
import { visualizer } from 'rollup-plugin-visualizer'

build: {
  rollupOptions: {
    plugins: [visualizer({ open: true })]
  }
}

打包完后可打开图形化页面查看模块体积，识别大文件来源
```

### 7.2 构建缓存与优化

```
-启用缓存：默认自动使用 esbuild 缓存
-懒加载组件：动态导入路由组件 import() 配合 Vue Router 使用
-拆分 vendor 包（见 manualChunks 配置）
-减少大库引用：如只用 lodash 中部分方法，可使用 lodash-es
```

## 八 利用 alias 简化路径

### 8.1 在 vite.config.js 中设置

```
import path from 'path'

resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src')
  }
}
```

### 8.2 组件中使用

```
import MyComponent from '@/components/MyComponent.vue'
```

说明：这样可以避免层层 `../../../` 的路径问题

## 九 测试环境支持

### 9.1 Vite 推荐使用 Vitest

```
npm install -D vitest
```

### 9.2 配置示例

```
// vite.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
```

### 9.3 创建测试文件

```
// myComponent.test.ts
import { describe, expect, it } from 'vitest'

describe('simple test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2)
  })
})
```

### 9.4 运行测试

```
npx vitest
```

## 十 开发提效小技巧清单

|      技巧      |            推荐做法             |
| :------------: | :-----------------------------: |
|  自动引入 API  |   使用 `unplugin-auto-import`   |
|  自动注册组件  | 使用 `unplugin-vue-components`  |
| 全局 SCSS 变量 |   配置 `additionalData` 引入    |
| 本地 API 调试  |  使用 `server.proxy` 实现跨域   |
|  打包分析优化  | 使用 `rollup-plugin-visualizer` |
|    环境切换    |    利用 `.env` 文件按需设置     |

## 十一 参考

* [Vite官方中文文档](https://cn.vitejs.dev/guide/)

