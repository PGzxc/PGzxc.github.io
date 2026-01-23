---
title: VitePress之——开始写文章(4)
categories:
  - 站点
  - VitePress
tags:
  - VitePress
abbrlink: 21c901f9
date: 2025-08-10 08:41:54
---
## 一 概述

```
本文介绍在VitePress开始写文章及如何配置
```

<!--more-->

## 二 开始写作

### 2.1 添加写作文件夹(site-用于写日记)

```
位置：docs/site目录下
```

### 2.2 添加markdown文件

```
1、通过VSCode生成markdown格式文件
如2025-09-09.md

2、markdown格式书写
 -标题：# 一级标题，## 二级标题 等
 -列表：- 或数字编号
 -代码块：console.log('Hello VitePress')
 -图片：![logo](/logo.png)
 -链接：[VitePress 官网](https://vitepress.vuejs.org)
```

## 三 导航和侧边栏关联

### 3.1 位置

```
docs/config.ts
```

### 3.2 导航添加

```
1、修改前
   nav: [
      { text: '指南', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com' }
    ],

2、修改后
nav: [
      { text: '指南', link: '/guide/' },
      { text: '日记', link: '/site/' }, 
      { text: 'GitHub', link: 'https://github.com' }
    ],
```

### 3.3 侧边栏添加

```
1、修改前
    sidebar: {
      '/guide/': [
        { text: '介绍', link: '/guide/' },
        { text: '安装', link: '/guide/install' }
      ]
    },

2、修改后
sidebar: {
      '/guide/': [
        { text: '介绍', link: '/guide/' },
        { text: '安装', link: '/guide/install' }
      ],
      '/site':[
        { text: '站点介绍', link: '/site' },
        { text: '第一篇日记', link: '/site/2025-08-09' }
      ]
    },
```

### 3.4 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-site/vitepress-4-write-1.png