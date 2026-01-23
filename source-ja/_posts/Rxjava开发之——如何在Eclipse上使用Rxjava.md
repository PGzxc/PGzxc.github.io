---
title: RxJava开发之——如何在Eclipse上使用Rxjava
categories:
  - 开发
  - B-高级语言
  - RxJava
tags:
  - Rxjava开发工具
abbrlink: 5be5f415
date: 2018-03-11 11:33:02
---

# 前言 
Android studio上支持jcenter和maven引入类库，但是Eclipse上不支持，那么如果想在Eclipse上开发Rxjava，该如何配置呢？下文将介绍配置教程  

<!--more-->  

# Eclipse开发Rxjava配置 
在Eclipse开发Rxjava，可以通过导入jar包的方式提供支持。下文将逐步介绍配置过程。  

## 打开Maven仓库，搜索rxjava
![][1]  
## 点击要下载的类库，选择相应的版本(本文选择v2.1.10)
![][2]  
## 打开选择的版本后，下载jar包 
![][3]  
## 导入jar包到项目中
![][4]
## 编写程序，并运行，查看结果 
![][5]  



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rxjava-mvn-search.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rxjava-mvn-2.1.10.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rxjava-mvn-2.1.10-download.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rxjava-mvn-import.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rxjava-mvn-run.png