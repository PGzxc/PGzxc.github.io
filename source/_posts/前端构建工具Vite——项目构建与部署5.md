---
title: 前端构建工具Vite——项目构建与部署5
categories:
  - 开发
  - T-构建
  - Vite
tags:
  - Vite
abbrlink: 99a90e4a
date: 2025-07-17 05:19:12
---
## 一 概述

```
经过前几篇文章的学习，我们已经掌握了 Vite 的基本使用、配置技巧与提效方法。
现在，是时候把开发完成的 Vite 项目构建并部署到线上环境了！

本篇将带你掌握从构建打包、资源优化到 GitHub Pages、Vercel、Netlify、Nginx 等部署方式的完整流程。
```

<!--more-->

## 二 Vite 构建基础命令

```
1、在根目录中执行以下命令即可开始构建
npm run build

2、等价于
vite build

3、默认构建输出目录为 dist/
```

## 三 构建目录结构说明

```
执行 npm run build 后生成的 dist/ 目录内容如下：

dist/
├── assets/                 # 静态资源（JS/CSS/图片等）
├── index.html              # HTML 入口文件
└── manifest.webmanifest    # 若启用 PWA

Vite 默认使用 Rollup 构建，资源均被优化压缩，并根据 hash 命名防止缓存问题
```

## 四 构建优化建议

```
可以在 vite.config.js 中自定义构建行为

export default defineConfig({
  build: {
    outDir: 'dist',        // 输出目录
    sourcemap: false,      // 是否生成 Source Map
    minify: 'esbuild',     // 压缩方式（esbuild / terser）
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router']
        }
      }
    }
  }
})
```

## 五 部署准备：设置base路径

```
若你打算部署到子路径（如 GitHub Pages），你必须设置 base

export default defineConfig({
  base: '/your-repo-name/', // 设置为仓库名
})

否则资源路径会 404
```

## 六 部署方式全解析

### 6.1 GitHub Pages 部署

```
1、安装部署工具
npm install -D gh-pages

2、在 package.json 添加脚本
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

3、执行部署
npm run deploy

确保你在 GitHub 仓库中启用了 Pages，并将分支设为 gh-pages
```

### 6.2 Netlify 部署

```
步骤如下：

1、登录 https://www.netlify.com/
2、选择你的 Git 项目
3、设置：
 -Build command：npm run build
 -Publish directory：dist
4、自动部署完成！

优势：无需设置域名和服务器，支持自动更新。
```

### 6.3  Vercel 部署

```
1、访问 https://vercel.com/
2、选择你的项目
3、自动检测为 Vite，默认配置即可：
 -Build command：npm run build
 -Output directory：dist
4、一键上线！
```

### 6.4 使用 Nginx 静态部署

```
1、若有服务器，可通过 Nginx 部署
server {
  listen 80;
  server_name yourdomain.com;
  root /var/www/html/dist;

  location / {
    try_files $uri $uri/ /index.html;
  }
}

2、部署步骤
scp -r dist/ user@your-server:/var/www/html/
```

## 七 构建预览本地运行

```
Vite 提供内置预览功能模拟生产环境运行

npm run preview

默认运行在 http://localhost:4173，你可以添加到 CI/CD 中进行自动测试
```

## 八 构建中常见问题汇总

|     问题      |               解决方法                |
| :-----------: | :-----------------------------------: |
| 打包路径错误  |           设置 `base` 路径            |
| 跨域请求失败  |       后端配置 CORS 或使用代理        |
| 图片/资源 404 | 确保资源路径正确或放入 `public/` 目录 |
| JS 报错未定义 |      检查是否正确导出模块或组件       |

## 九 总结

### 9.1 说明

```
Vite 的构建与部署流程非常现代化，结合平台服务可轻松实现一键部署上线。
对大多数项目来说，无论是个人博客还是中大型前端工程，Vite 都能胜任。
```

### 9.2 推荐部署方式速查表

|       场景       |     推荐方式     |
| :--------------: | :--------------: |
| 个人项目 / 简历  |   GitHub Pages   |
| 博客 / Demo 展示 | Netlify / Vercel |
|   企业生产环境   |   Nginx / CDN    |
|     预览测试     |   vite preview   |


## 十 参考

* [Vite官方中文文档](https://cn.vitejs.dev/guide/)

