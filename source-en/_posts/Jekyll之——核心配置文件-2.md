---
title: Jekyll之——核心配置文件(2)
categories:
  - 站点
  - Jekyll
tags:
  - Jekyll
abbrlink: a6f53764
date: 2025-07-29 09:55:47
---
## 一 概述

```
1、核心配置文件_config.yml介绍
2、基于_config.yml页面显示
```

<!--more-->

## 二 核心配置文件_config.yml介绍

```
# 网站基本信息
title: "我的博客"
description: "这是一个使用 Jekyll 搭建的博客"
baseurl: ""  # 项目主页需填写仓库名，如 "/repo-name"
url: "https://username.github.io"  # 网站域名

# 构建设置
markdown: kramdown  #  markdown 解析器
theme: minima  # 主题（可替换为其他主题）
plugins:
  - jekyll-feed  # 生成 RSS 订阅

# 导航菜单
nav_menu:
  - title: "首页"
    url: "/"
  - title: "关于"
    url: "/about"
```

## 三 基于_config.yml页面显示

![][1]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jekyll-2-theme-view-1.png