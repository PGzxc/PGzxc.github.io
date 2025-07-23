---
title: Hexo站点建设之——Action构建失败stylus@undefined
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo
abbrlink: e75e55b6
date: 2025-07-24 07:16:40
---
## 一 异常信息

```
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: nib@1.2.0
npm warn Found: stylus@undefined
npm warn node_modules/stylus
npm warn
npm warn Could not resolve dependency:
npm warn peer overridden stylus@"0.58.1" (was "*") from nib@1.2.0
npm warn node_modules/nib
npm warn   nib@"^1.2.0" from hexo-renderer-stylus@3.0.1
npm warn   node_modules/hexo-renderer-stylus
npm error code ETARGET
npm error notarget No matching version found for stylus@0.58.1.
npm error notarget In most cases you or one of your dependencies are requesting
npm error notarget a package version that doesn't exist.
npm error A complete log of this run can be found in: /home/runner/.npm/_logs/2025-07-23T15_24_16_120Z-debug-0.log
Error: Process completed with exit code 1.
```

<!--more-->

## 二 package.json配置

### 2.1 修改前

```
  "dependencies": {
    "hexo": "7.3.0",
    "hexo-abbrlink": "^2.2.1",
    "hexo-blog-encrypt": "^3.1.9",
    "hexo-deployer-git": "^4.0.0",
    "hexo-generator-archive": "2.0.0",
    "hexo-generator-category": "^2.0.0",
    "hexo-generator-feed": "3.0.0",
    "hexo-generator-index": "4.0.0",
    "hexo-generator-searchdb": "1.5.0",
    "hexo-generator-tag": "^2.0.0",
    "hexo-renderer-ejs": "^2.0.0",
    "hexo-renderer-marked": "^7.0.1",
    "hexo-renderer-stylus": "3.0.1",
    "hexo-server": "3.0.0",
    "hexo-symbols-count-time": "^0.7.1",
    "hexo-theme-next": "8.23.2",
    "hexo-util": "^3.3.0",
    "hexo-wordcount": "^6.0.1"
  },
  "devDependencies": {
    "markdownlint-cli": "0.45.0"
  },
  "overrides": {
    "stylus": "0.58.1"
  }
```

### 2.2 修改为

```
  "overrides": {
    "stylus": "github:stylus/stylus#0.62.0"
  }
```

## 三 参考

* [Github— Stylus has been taken down for malicious code](https://github.com/hexojs/hexo/issues/5672)
* [Github—No matching version found for stylus@^0.62.0](https://github.com/hexojs/hexo-renderer-stylus/issues/174)