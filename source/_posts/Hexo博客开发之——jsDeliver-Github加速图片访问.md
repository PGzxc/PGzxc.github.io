---
title: Hexo博客开发之——jsDeliver+Github加速图片访问
categories:
  - 工具
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 5de4a6a1
date: 2020-09-27 22:12:02
---
## 一 CDN解释

* **内容分发网络**(Content Delivery Network，缩写：CDN)是指一种透过互联网互相连接的电脑网络系统
* 利用最靠近每位用户的服务器，更快、更可靠地将音乐、图片、影片、应用程序及其他文件发送给用户
* 来提高性能、可扩展性及低成本的网络内容传递给用户。

<!--more-->

## 二 为何使用jsDeliver

* GitHub上存储的图片、视频资源，由于某种因素会出现访问受限的情况，导致图片、视频显示异常；
* 为了图片、视频显示正常可以使用CDN进行加速，从而使资源得以正确加载并显示的目的
* jsDelivr 是一个免费开源的 CDN 解决方案，用于帮助开发者和站长。包含 JavaScript 库、jQuery 插件、CSS 框架、字体等等 Web 上常用的静态资源

## 三 如何使用

### 3.1 [项目地址][21]

jsDeliver:https://www.jsdelivr.com/

![][1]

### 3.2 jsDeliver适用平台

jsDeliver可以给npm、GitHub、WordPress平台资源加速，本文以GitHub为例进行说明

### 3.3 使用说明

```
// load any GitHub release, commit, or branch
// note: we recommend using npm for projects that support it
https://cdn.jsdelivr.net/gh/user/repo@version/file
```

* https://cdn.jsdelivr.net：jsdelivr的URL
* gh：GitHub的缩写(表示加速GitHub资源)
* user：GitHub上注册的用户名比如([JakeWharton](https://github.com/JakeWharton))
* repo@version：GitHub上仓库名及其版本(可以是GitHub上新建的仓库或者是release仓库@release版本)
* file：存储的文件名+文件后缀

## 四 创建GitHub仓库

### 4.1  登录GitHub后创建仓库(如：CDN)
![][2]
### 4.2 下载[GitHub 客户端][22]，将仓库clone到本地
![][3]
### 4.3 将本地资源push到origin
![][4]
### 4.4 GitHub更新后的内容
![][5]
## 五 创建GitHub Release版本
### 5.1 点击仓库右侧的Releases，创建Release仓库
![][6]
### 5.2 创建Release版本、Title和描述
![][7]
### 5.3 Release创建完成后，如下图
![][8]

## 六 hexo使用实例

### 6.1 commit 版本

```
https://cdn.jsdelivr.net/gh/pgzxc/CDN/blog-image/dog.png
```

### 6.2 release 版本

```
https://cdn.jsdelivr.net/gh/pgzxc/CDN@1.0/blog-image/dog.png
```

### 6.3 Markdown文档中

```
## jsdelivr图片的使用
### 一 直接使用仓库的图片

![][1]
### 二 使用发布版本的图片
![][2]

[1]:https://cdn.jsdelivr.net/gh/pgzxc/CDN/blog-image/dog.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/CDN@1.0/blog-image/dog.png
```

### 6.4 效果
![][9]

## 七 图片访问替换

### 7.1 统一替换方式

使用VSCode搜索图片的前缀替换成jsDeliver访问前缀
![][10]



[1]:https://cdn.jsdelivr.net/gh/pgzxc/CDN/blog-image/hexo-jsdelivr-webset.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/CDN/blog-image/hexo-github-repository-create.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/CDN/blog-image/hexo-github-clone-local.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/CDN/blog-image/hexo-github-push-local-origin.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/CDN/blog-image/hexo-github-push-finshed.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/CDN/blog-image/hexo-github-create-a-new-release.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/CDN/blog-image/hexo-github-publish-release.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/CDN/blog-image/hexo-github-release-view.png
[9]:https://cdn.jsdelivr.net/gh/pgzxc/CDN/blog-image/hexo-commit-release-real-effect.png
[10]:https://cdn.jsdelivr.net/gh/pgzxc/CDN/blog-image/hexo-github-jsdeliver.png

[21]:https://www.jsdelivr.com/
[22]:https://desktop.github.com/