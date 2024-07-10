---
title: Hexo站点建设之——国际化(i18n)
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 2b01c7a6
date: 2020-12-10 17:20:04
---
## 一 概述

Hexo搭建的网站默认只有一种语言，若想要网站支持多种语言，通过切换语言标签查看不同语言网站。本文以中英文为例进行说明。

<!--more-->

## 二 多语言设置(_config.yml)

```
language: 
  - zh-CN
  - en
  
i18n_dir: :lang  
#链接  
permalink: :lang/:title/ 
new_post_name: :lang/:title.md
```

## 三 语言切换开关(\_config.next.yml)

```
language_switcher: true
cache:
  enable: false
```

## 四 source/_post下文章

### 4.1 说明

* 新建zh-cn(中文简体)和en(英文)文件夹，分别存放汉语和英文文章

### 4.2 目录结构

```
source/
    _posts/
        zh-cn/
            post-zh.md
        en/
            post-en.md
```

## 五 插件(hexo-generator-index-i18n)

### 5.1 插件的作用

为各种语言生成一个`:lang/index.html`实现各种语言切换的首页

### 5.2 插件下载(hexo-generator-index-i18n)

```
npm install hexo-generator-index-i18n --save
```

### 5.3 配置(\_config.yml )

```
index_generator:
  path: ''
  per_page: 10
  order_by: -date
  single_language_index: false
```

## 六 创建文章

### 6.1 创建命令

```
hexo n --lang zh-CN 我的博客
hexo n --lang en 我的博客
```

### 6.2 命令执行后的目录

```
source/
    _posts/
        zh-cn/
            我的博客.md
        en/
            我的博客.md
```

## 七 效果

![][1]

## 八 参考

* [国际化（i18n）][11]
* [Multilingual switch button support ][12]
* [hexo-generator-index-i18n][13]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-i18n-view.gif
[11]:https://hexo.io/zh-cn/docs/internationalization.html
[12]:https://github.com/theme-next/hexo-theme-next/pull/1391
[13]:https://github.com/xcatliu/hexo-generator-index-i18n