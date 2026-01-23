---
title: Jekyll之——Jekyll模板仓库及使用(3)
categories:
  - 站点
  - Jekyll
abbrlink: '74674075'
date: 2025-07-30 08:46:29
tags:
---
## 一 概述

```
Github上有基于Jekyll开发的模板
基于这些模板实现界面的快速搭建
```

<!--more-->

## 二 Jekyll模板仓库

| [minimal-mistakes](https://github.com/mmistakes/minimal-mistakes) | [jekyll-theme-chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                  一款灵活的两栏式Jekyll主题                  |    一款简洁、响应式且功能丰富的用于技术写作的Jekyll主题。    |

## 三 Chirpy Jekyll Theme使用

### 3.1 下载最新Tag并解压

![][1]

### 3.2 执行如下指令

```
# 设置 Bundler 使用阿里云镜像
bundle config mirror.https://rubygems.org  https://mirrors.aliyun.com/rubygems/

bundle install #x64_mingw
bundle exec jekyll serve  # 本地启动服务（默认地址：http://localhost:4000）
```

### 3.3 界面显示

![][2]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jekyll-3-theme-down-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/jekyll-3-theme-view-2.png

