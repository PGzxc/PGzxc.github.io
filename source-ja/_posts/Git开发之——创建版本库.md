---
title: Git开发之——创建版本库
categories:
  - 开发
  - I-版本控制
  - Git
tags:
  - 创建版本库
abbrlink: 5d08e148
date: 2018-02-25 22:52:44
---
# 前言
什么是版本库呢？版本库又名仓库，英文名repository，你可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。  

<!--more-->  

# 创建版本库
本文以Github为代码仓库
## 创建Github远程端
![][0]
## 选择一个合适的地方创建一个空目录
![][1]  
## 通过git init命令把这个目录变成Git可以管理的仓库  
![][2]  
这时Git就把仓库建好了  
### 用ls -ah命令查看.git目录
![][3]  
## 把文件添加到版本库  
### 编写一个README.txt文件
![][4] 
### 用命令git commit把文件提交到仓库
![][5]  
### 将你的仓库连接到某个远程服务器 
![][6]
### 将分支推送到远端仓库
![][7]
### 远端仓库查看文件
![][8]

[0]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-github-learn.png
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-create-file.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-init.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-ls.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-add-readme.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-commit-readme.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-remote-add.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-push-origin.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-has-show.png
