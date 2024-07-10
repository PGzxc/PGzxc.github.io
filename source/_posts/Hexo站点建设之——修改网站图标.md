---
title: Hexo站点建设之——修改网站图标
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: '60424807'
date: 2020-12-02 17:45:51
---
## 一 概述
* 自建站点为何显示的是主题图标
* 如何查找网站图标
* 如何修改网站图标

<!--more-->

## 二  自建站点为何显示的是主题图标

使用hexo搭建好的站点，网站的图标默认显示的是![][1]，右键检查，网站源码—>Elements标签下—>head，可以看到Hexo next主题默认的网页图标使用的是hexo-theme-next/source/images/favicon-next
![][2]

## 三 如何查找网站图标

从下列站点下载免费图标，并修改名字为favicon对应的名字

* [阿里巴巴矢量图标库][11]
* [easyicon][12]

## 四 如何修改网站图标

在`/themes/next/_config.yml`中修改成自己的图标

```
favicon:
  small: /images/favicon.ico
  #medium: /images/favicon-32x32-next.png
  medium: /images/favicon.ico
  apple_touch_icon: /images/apple-touch-icon-next.png
  safari_pinned_tab: /images/logo.svg
  #android_manifest: /manifest.json
```

## 五 效果预览
![][3]



[1]:../images/favicon-next/favicon-32x32-next.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-web-site-head-default-next.png
[3]:../images/favicon/favicon-32x32.png

[11]:https://www.iconfont.cn/
[12]:https://www.easyicon.net/