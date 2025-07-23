---
title: Hexo站点建设之——优化
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo
abbrlink: 8316792a
date: 2025-07-23 23:52:46
---
## 一 概述

```
将Github Page部署到Cloudflare Page显示构建失败，单个文件和总文件大小均超过限制
因此对单个文件如：源码下的db.json(105M)和public下的search.json(29.1M)
```

<!--more-->

## 二 search.json优化

### 2.1 由哪个插件生成

```
-通常是由搜索插件(如 hexo-generator-searchdb)生成的，用于提供站内搜索功能
-这个文件包含了文章标题、内容、标签、分类等元数据，供前端搜索算法使用
```

### 2.2 _config.yml默认配置

```
# _config.yml 配置示例
search:
  path: search.json
  field: post  # 或 'all' 搜索所有类型
  content: true  # 包含文章内容
```

### 2.3 优化配置

```
search:
  path: search.json
  field: post  # 仅搜索文章，而非所有内容
  content: false  # 不包含文章正文（只搜索标题和摘要）
  format: html  # 使用HTML格式而非纯文本
```

### 2.4 排除不必要的内容(在生成时排除特定类型的文章或页面)

```
search:
  exclude:
    - archive/**
    - categories/**
    - tags/**
```

### 2.5 压缩 JSON(package.json 中添加压缩脚本)

```
# package.json 中添加压缩脚本
{
  "scripts": {
    "compress-search": "json-minify public/search.json > public/search.min.json"
  }
}
```

## 三 db.json优化

### 3.1 介绍

```
Hexo的db.json文件是一个临时数据库，由Hexo在生成静态网站时自动创建，主要用于存储网站的元数据。

这个文件包含了以下内容：
-文章和页面数据：标题、日期、标签、分类等
-模板渲染所需的变量
-插件和主题的缓存信息
```

### 3.2 从版本控制和部署中排除 `db.json`

```
1、从版本控制中排除(在.gitignore 中添加)：
db.json
public/
.deploy*/

2、 Cloudflare Pages 部署中排除(在 .pagesignore 中添加)
db.json

3、清理并重新生成
# 清理缓存和生成的文件
hexo clean

# 重新生成静态文件
hexo generate
```

### 3.3 优化 Hexo 配置

```
1、减少不必要的数据存储
# _config.yml
skip_render:  # 排除无需渲染的文件/目录
  - '*.pdf'
  - '*.zip'
  - 'large-directory/**'

theme_config:
  # 禁用不需要的功能（如评论、分享）
  comments:
    enable: false
  share:
    enable: false
    
    
2、 禁用或优化插件(某些插件可能会向 db.json 添加额外数据) 
# _config.yml
# 禁用未使用的插件
# plugins:
#   - hexo-some-plugin

# 优化搜索插件配置（减少 search.json 体积）
search:
  field: post  # 只搜索文章，而非所有内容
  content: false  # 不包含文章正文
  
3、 限制文章数量（针对大型网站）—仅处理最近的文章  
# _config.yml
# 只处理最近的 100 篇文章（根据需求调整）
archive_generator:
  per_page: 100
  yearly: false
  monthly: false
  daily: false
```

## 四 .pagesignore

### 4.1 介绍

```
.pagesignore是Cloudflare Pages专用的忽略文件，作用类似于Git的.gitignore，
用于指定在部署过程中需要排除的文件或目录，
从而减小构建包体积、避免不必要的文件被部署到生产环境
```

### 4.2 核心作用

```
-告诉 Cloudflare Pages：“这些文件 / 目录不需要包含在最终部署的网站中”
-减少构建和部署时间，避免因文件过大触发 Cloudflare 的 25MiB 单个文件或总容量限制
```

### 4.3 如何使用 `.pagesignore`

```
-创建文件：在Hexo项目的根目录（与 _config.yml、.gitignore 同级）创建 .pagesignore 文件。
-添加规则：按行写入需要排除的文件或目录路径（支持通配符）。
```

### 4.4 Hexo 项目常用 `.pagesignore` 配置

```
# 排除临时数据库（无需部署）
db.json

# 排除搜索文件（如果不需要搜索功能）
public/search.json

# 排除本地开发相关文件
node_modules/
.git/
.gitignore
.DS_Store
Thumbs.db

# 排除 Hexo 生成的缓存和冗余文件
public/**/*.map  # 排除 sourcemap（如果有的话）
.deploy_git/
.tmp/
```

