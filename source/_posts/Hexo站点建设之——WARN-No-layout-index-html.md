---
title: Hexo站点建设之——WARN-No-layout-index-html
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 54c72f9
date: 2020-09-27 22:13:17
---
## 一 现象描述

执行hexo g或hexo s时，可能会出现如下情况，导致访问时出现异常
![][1]
<!--more-->

## 二 原因猜测

* 插件
* 主题
* markdown文件

## 三 解决办法

### 3.1 插件

#### 3.1.1 查看npm安装hexo插件的情况

```
npm ls --depth 0
```
![][2]

#### 3.1.2 安装缺失的插件
```
npm install acorn --save
```

![][3]
#### 3.1.3 再次执行 `npm ls --depth 0`查看插件安装情况
### 3.2 主题(themes)

#### 3.2.1 检查themes下的主题和配置
![][4]

#### 3.2.2 下载最新主题并配置_config.yml

```
git clone https://github.com/theme-next/hexo-theme-next themes/next
```
![][5]

#### 3.2.3 执行hexo g查看执行情况(文件能正常生成)
![][6]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-error-no-layout-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-error-npm-depth.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-error-install-save.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-error-themes-view.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-error-themes-clone-local.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-error-gene-file.png