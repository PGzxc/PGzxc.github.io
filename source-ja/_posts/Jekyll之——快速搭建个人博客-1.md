---
title: Jekyll之——快速搭建个人博客(1)
categories:
  - 站点
  - Jekyll
tags:
  - Jekyll
abbrlink: 1d88d1a7
date: 2025-07-24 07:25:22
---
## 一 概述

```
Jekyll是一款静态网站生成器，基于Markdown、HTML、CSS 等，可通过模板生成静态页面，支持插件和主题。

GitHub 提供的静态网站托管服务，支持直接从GitHub仓库部署，与Jekyll深度集成，提交代码后自动构建网站。
```

<!--more-->

## 二 准备工作

### 2.1 开发系统

```
Win11 专业版 24H2
```

### 2.2 安装软件(本地开发用)

1、安装Ruby(Jekyll基于Ruby)

```
https://www.ruby-lang.org/zh_cn/downloads/
```

2、安装Jekyll和Bundler(国内访问可能超时)

```
1、更换RubyGems镜像源(使用阿里镜像)
# 移除默认源
gem sources --remove https://rubygems.org/

# 添加阿里镜像源
gem sources -a https://mirrors.aliyun.com/rubygems/

# 验证源
gem sources -l


2、安装 Jekyll 和 Bundler
gem install jekyll bundler
```

## 三 本地初始化Jekyll项目

### 3.1 初始化指令

```
jekyll new my-site  # 创建新项目
cd my-site         # 进入项目文件夹

# 设置 Bundler 使用阿里云镜像
bundle config mirror.https://rubygems.org  https://mirrors.aliyun.com/rubygems/

bundle install #x64_mingw
bundle exec jekyll serve  # 本地启动服务（默认地址：http://localhost:4000）
```

### 3.2 Jekyll目录结构

```
my-site/
├── _posts/          # 博客文章（命名格式：YYYY-MM-DD-title.md）
├── _pages/          # 独立页面（如 about.md）
├── _layouts/        # 页面模板（如 default.html、post.html）
├── _includes/       # 可复用组件（如 header.html、footer.html）
├── _sass/           # 样式文件（Sass 语法）
├── assets/          # 静态资源（图片、CSS、JS）
├── _config.yml      # 配置文件
└── index.html       # 首页
```

### 3.3 项目预览

```
默认地址：http://localhost:4000
```

![][1]

### 3.4 常用命令

|           命令           |                功能                 |
| :----------------------: | :---------------------------------: |
| bundle exec jekyll serve |      本地启动服务（自动刷新）       |
| bundle exec jekyll build | 生成静态文件（输出到 `_site` 目录） |
|      bundle update       |             更新依赖包              |

## 四 参考

* [Jekyll官网—Docs][https://jekyllrb.com/docs/]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jekyll-1-page-view-1.png