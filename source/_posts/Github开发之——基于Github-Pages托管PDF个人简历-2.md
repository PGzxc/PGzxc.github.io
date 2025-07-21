---
title: Github开发之——基于Github Pages托管PDF个人简历(2)
categories:
  - 开发
  - I-版本控制
  - Github
tags:
  - Github
abbrlink: 6eb91dbb
date: 2025-07-21 11:29:25
---
## 一 概述

```
你可以将个人PDF格式的简历托管到Github仓库，并基于Github Page免费搭建一个在线简历页面。

此种方式：简单易实现，支持浏览器打开或直接下载，也可页面扫码/链接方便实时访问展示
```

<!--more-->

## 二 新建Github仓库

```
打开个人Github仓库，新建仓库名教resume或yourname-resume，并设置公开，此处设置为pdf-resume
```

![][1]

## 三 上传你的PDF简历

1、点击右上角的`Add file` → `Upload files`

![][2]

2、跳转到上传文件页面，将准备好的PDF简历拖入，上传完成后显示如图

![][3]

## 四 开启Github Pages

1、进入仓库 → Settings → Pages →选择

```
—Source 选择 main 分支（或你上传 PDF 的分支）
—Folder 选 /(root)，保存
```

![][4]

2、稍等片刻并刷新页面，显示个人网址，点击链接可访问(此处是仓库的Readme页面)

![][5]

## 五 访问简历链接

### 5.1 访问链接

```
https://yourusername.github.io/resume/resume.pdf
```

### 5.2 简历展示说明

1、直接访问Github Page显示的是Readme内容
![][6]

2、后面添加pdf文件名字，显示Pdf简历内容
![][7]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-2-pdf-repo-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-2-upload-file-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-2-choice-file-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-2-page-config-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-2-page-deployed-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-2-page-readme-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-2-page-pdf-7.png