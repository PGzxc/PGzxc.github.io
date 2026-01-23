---
title: Hugo开发之——博客搭建
categories:
  - 站点
  - Hugo
tags:
  - Hugo
abbrlink: 776c122f
date: 2020-08-23 23:41:45
---
## 一 概述

Hugo是由Go语言实现的静态网站生成器。简单、易用、高效、易扩展、快速部署。对比Hexo，Hugo仅需一个二进制文件（hugo.exe）即可实现网站生成的生成。而且就如它官网介绍：The world’s fastest framework for building websites。Hugo是目前最快的网站构建框架 

<!--more-->

## 二 开发环境配置

* Windows 10(64位)
* Git：git version 2.14.0.windows.2
* Go：[go version go1.15 windows/amd64][21]
* Hugo：[Hugo Static Site Generator v0.74.3/extended windows/amd64 BuildDate: unknown][22]

## 三 搭建过程

* 创建站点

  ```
  hugo new site quickstart
  ```

  ![][1]
  
* 添加主题

  ```
  cd quickstart
  git init
  git submodule add https://github.com/budparr/gohugo-theme-ananke.git themes/ananke
  ```

  ![][2]

* 添加主题配置

  ```
  baseURL = "http://example.org/"
  languageCode = "en-us"
  title = "My New Hugo Site"
  theme = "ananke"
  ```
  
  ![][3]

* 创建博客内容

  ```
  hugo new posts/my-first-post.md
  ```

  ![][4]
  
* 开启hugo 服务

  ```
  hugo server -D
  ```

  ![][5]
  
* 在网页中输入[http://localhost:1313/][23]查看效果

  ![][6]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hugo-new-site-quickstart.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hugo-add-themes.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hugo-theme-config.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hugo-post-page-content.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hugo-server-d.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hugo-server-page-view.png
[21]:https://gomirrors.org/
[22]:https://github.com/gohugoio/hugo/releases
[23]:http://localhost:1313/