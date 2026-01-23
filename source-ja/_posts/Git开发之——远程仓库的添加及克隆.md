---
title: Git开发之——远程仓库的添加及克隆
categories:
  - 开发
  - I-版本控制
  - Git
tags:
  - 远程仓库
abbrlink: 2ad42dcb
date: 2018-02-26 11:42:43
---
# 前言  
上一节已经关联了一个Github远程仓库，下面将介绍远程仓库的添加及克隆  

## 添加远程仓库  

- 要关联一个远程库，使用命令git remote add origin git@server-name:path/repo-name.git；  
- 关联后，使用命令git push -u origin master第一次推送master分支的所有内容；  

## 克隆远程仓库  

- 要克隆一个仓库，首先必须知道仓库的地址，然后使用git clone命令克隆。
- Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。  

<!--more-->
   
# 远程仓库操作  
## 添加远程仓库 
### 创建版本库
本文以Github为代码仓库
#### 创建Github远程端
![][0]
#### 选择一个合适的地方创建一个空目录
![][1]  
#### 通过git init命令把这个目录变成Git可以管理的仓库  
![][2]  
这时Git就把仓库建好了  
### 用ls -ah命令查看.git目录
![][3]  
### 把文件添加到版本库  
#### 编写一个README.txt文件
![][4] 
#### 用命令git commit把文件提交到仓库
![][5]  
#### 将你的仓库连接到某个远程服务器 
![][6]
#### 将分支推送到远端仓库
![][7]
#### 远端仓库查看文件
![][8]

## 克隆远程仓库 

### 创建本地克隆目录并用Git Bash打开  
![][9]
### 复制要克隆的地址  
![][10]  
### 用命令git clone克隆一个本地库
![][11]  


[0]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-github-learn.png
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-create-file.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-init.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-ls.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-add-readme.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-commit-readme.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-remote-add.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-push-origin.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-has-show.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-clone-bash.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-clone-address.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-clone-clone-ls.png