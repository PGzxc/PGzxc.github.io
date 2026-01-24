---
title: Hexo站点建设之——多语言集成
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: c2a82925
date: 2026-01-23 19:23:07
---
## 一 概述

```
适用场景：
-Hexo + NexT(v8.x)
-存在自定义页面（如navs）
-需要中 / 英 / 日多语言
-追求 稳定、可维护、可扩展
```

<!--more-->

## 二 为什么不直接用 Hexo 内置 i18n

```
Hexo 内置 i18n + language_switcher 在博客文章场景尚可，但在以下情况会频繁踩坑：

-自定义 page(navs/tools)
-include_markdown / scripts 扩展
-路由前缀错乱(/en 页面 404)
-菜单/标签/分类无法跟随语言
```

## 三 设计思路

### 3.1 设计思路

1个语言 = 1个 source 目录 + 1个配置文件 + 1个输出目录

| 语言 |  source   |     config     | root |   public   |
| :--: | :-------: | :------------: | :--: | :--------: |
| 中文 |  source   |  _config.yml   |  /   |  public/   |
| 英文 | source-en | _config.en.yml | /en/ | public/en/ |
| 日文 | source-ja | _config.ja.yml | /ja/ | public/ja/ |

### 3.2 说明

```
不依赖 Hexo i18n 路由
不魔改 NexT
路由 100% 可控
```

### 3.3 项目结构

```
hexo博客/
├─ source/                # 中文
│  ├─ resume/
│  │  ├─ index.md
│  │  └─ _parts/zh/
│  ├─ navs/
│  ├─ _posts/
│  └─ ...
├─ source-en/             # 英文
│  ├─ resume/
│  │  ├─ index.md
│  │  └─ _parts/en/
│  └─ ...
├─ source-ja/             # 日文
│  ├─ resume/
│  │  ├─ index.md
│  │  └─ _parts/ja/
│  └─ ...
├─ public/
│  ├─ en/
│  └─ ja/
├─ scripts/
├─ themes/hexo-theme-next/
├─ _config.yml
├─ _config.en.yml
├─ _config.ja.yml
├─ _config.next.yml
└─ package.json
```

## 四 多语言配置文件设计

### 4.1 中文主配置 _config.yml

```
language: zh-CN
source_dir: source
root: /
public_dir: public
```

### 4.2 英文配置 _config.en.yml

```
language: en
source_dir: source-en
root: /en/
public_dir: public/en

# 关闭 Hexo 内置多语言
i18n:
  enable: false
language_switcher:
  enable: false
```

### 4.3 日文配置 _config.ja.yml

```
language: ja
source_dir: source-ja
root: /ja/
public_dir: public/ja

i18n:
  enable: false
language_switcher:
  enable: false
```

说明：其余配置(theme / plugins / deploy)全部继承主配置，避免重复维护

## 五 语言切换按钮

### 5.1 自定义语言切换

```
不再使用 language_switcher，直接固定链接

推荐放在 NexT footer / header：
<div class="lang-switch">
  <a href="/">简体中文</a> |
  <a href="/en/">EN</a> |
  <a href="/ja/">日本語</a>
</div>
```

### 5.2 为什么这样最好

```
不依赖 Hexo 内部状态
不会跳错语言
SEO 友好
GitHub Pages / CDN 零坑
```

## 六 本地构建与脚本优化

### 6.1 package.json 脚本

```
{
  "scripts": {
    "generate:all": "npm run generate:zh && npm run generate:en && npm run generate:ja",
    "generate:all-parallel": "npm run generate:zh & npm run generate:en & npm run generate:ja && wait",
    "generate:zh": "hexo clean && hexo generate",
    "generate:en": "hexo clean --config _config.yml,_config.en.yml && hexo generate --config _config.yml,_config.en.yml",
    "generate:ja": "hexo clean --config _config.yml,_config.ja.yml && hexo generate --config _config.yml,_config.ja.yml"
  }
}
```

### 6.2 构建原则

```
只 clean 一次
每个语言输出到独立 public_dir
不 copy、不 merge、不 hack
```

## 七 GitHub Actions 自动部署

### 7.1 位置

```
.github/workflows/deploy.yml
```

### 7.2 内容

```
name: Deploy Hexo Multi-lang

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - run: npm install

      - name: Generate all languages
        run: npm run generate:all

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

说明(多语言替换)：

```
1-之前
 # 5. Generate public files (build Hexo)
 - name: Generate public files
   run: |
     npx hexo clean
     npx hexo generate
     npx hexo generate --config _config.yml,_config.en.yml
     npx hexo generate --config _config.yml,_config.ja.yml
     
2、现在
 - name: Generate all languages
     run: npm run generate:all
```

### 7.3 部署后访问

```
https://yougithub.github.io/
https://yougithub.github.io/en/
https://yougithub.github.io/ja/
```

## 八 优化经验

### 8.1 构建慢

```
不重复 clean
使用 npm-run-all --parallel
精简不必要插件
```

### 8.2 内容一致性

```
各语言目录结构保持一致
技术术语统一维护（推荐对照 _parts/en / _parts/ja）
```

