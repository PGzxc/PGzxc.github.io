---
title: Github开发之——基于Github Pages托管自定义页面简历(3)
categories:
  - 开发
  - I-版本控制
  - Github
tags:
  - Github
abbrlink: a8c27929
date: 2025-07-21 11:30:25
---
## 一 概述

```
之前介绍过将个人PDF格式简历托管Github Pages并实时访问与显示
本文介绍利用HTML/CSS制作一个在线简历页面。
```

<!--more-->

## 二 使用 HTML/CSS 自定义页面

### 2.1 HTML自定义页面(名字为index.html)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>张三的简历</title>
</head>
<body>
    <h1>张三</h1>
    <p>Android 开发工程师 | 熟悉 Flutter、鸿蒙、React Native</p>
    <h2>联系方式</h2>
    <ul>
        <li>Email: zhangsan@example.com</li>
        <li>GitHub: <a href="https://github.com/zhangsan">zhangsan</a></li>
    </ul>
    <h2>项目经验</h2>
    <ul>
        <li>WanAndroid-Flutter：一个 Flutter 开源项目，超 1k star</li>
    </ul>
</body>
</html>
```

### 2.2 查看显示效果

![][1]

## 三 Github 相关操作

### 3.1 创建一个名为resume-page的仓库

![][2]

### 3.2 在仓库中放一个 HTML 文件，例如 `index.html`

1、依次点击：`Add file`——>`Upload files`

![][3]

2、上传完成后，如图所示

![][4]

### 3.3 开启 GitHub Pages

1、和PDF文件设置一样，选择 main 分支 + /(root)

![][5]

2、稍等片刻刷新页面，显示访问链接

![][6]

### 3.4 访问

1、访问地址

```
https://yourusername.github.io/resume-page/
```

2、点击访问链接或上文地址更换你的用户名

![][7]






[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-3-html-make-view-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-3-html-create-repo-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-3-html-upload-index-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-3-html-up-finish-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-3-html-setting-config-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-3-html-deployed-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-3-html-online-7.png