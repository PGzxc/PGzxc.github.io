---
title: Jekyll之——写文章(4)
categories:
  - 站点
  - Jekyll
tags:
  - Jekyll
abbrlink: 75c714d
date: 2025-08-04 09:15:56
---
## 一 概述

```
1、安装jekyll-compose插件
2、使用命令生成文章
3、常用YAML头信息说明
4、给文章添加YAML头信息
```

<!--more-->

## 二 安装jekyll-compose插件

### 2.1 插件说明

```
在 Jekyll 中，你可以使用 jekyll post 命令 自动生成符合格式的 Markdown 文章。

不过需要注意：
-Jekyll 3.0 及以上版本默认不包含此命令，
-你需要安装 jekyll-compose 插件 来启用它
```

### 2.2 安装 jekyll-compose 插件

```
1、在项目的 Gemfile 中添加：
gem 'jekyll-compose', group: [:jekyll_plugins]

2、执行安装
# 设置 Bundler 使用阿里云镜像
bundle config mirror.https://rubygems.org  https://mirrors.aliyun.com/rubygems/

bundle install #x64_mingw

3、在 _config.yml 中添加插件(可不添加仍可执行)
plugins:
  - jekyll-compose
```

## 三 使用命令生成文章

### 3.1 创建文章命令

1、创建文章指令

```
bundle exec jekyll post "第一篇文章"
```

2、说明

```
1、文章位置：
_posts/日期+第一篇文章.md

2、包含基本的YAML头信息
---
layout: post
title: 第一篇文章
date: 2025-07-23 15:29 +0800
---
```

### 3.2 填写内容

```
---
layout: post
title: 第一篇文章
date: 2025-07-23 15:29 +0800
---
这是文章的正文内容，可以使用 Markdown 语法。

# 一级标题
## 二级标题

- 列表项1
- 列表项2

[链接](https://example.com)
```

### 3.3 预览效果

![][1]

## 四 常用YAML头信息说明

|    参数    |                             说明                             |
| :--------: | :----------------------------------------------------------: |
|   layout   | 指定使用的布局模板（如 `post`、`page`），对应 `_layouts` 目录下的文件 |
|   title    |                      文章标题(支持中文)                      |
|    date    |        文章日期（格式：`YYYY-MM-DD HH:MM:SS ±时区`）         |
| categories | 文章分类（单分类：`category: 技术`；多分类：`categories: [技术, 教程]`） |
|    tags    |                    文章标签（同分类语法）                    |
|    pin     |                  是否置顶(为true，文章置顶)                  |
|   author   |                           添加作者                           |
| published  |              是否发布（`false` 时文章不会生成）              |
|  excerpt   |                   文章摘要（用于列表预览）                   |

## 五  给文章添加YAML头信息

### 5.1 添加YAML头信息

```
categories: [旅行日记, 第一篇文章]
```

### 5.2 分类效果

![][2]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jekyll-4-page-view-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jekyll-4-page-category-2.png


