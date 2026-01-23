---
title: Git开发之——标签管理
categories:
  - 开发
  - I-版本控制
  - Git
tags:
  - 标签管理
abbrlink: 89e1ab8f
date: 2018-02-26 19:37:07
---
# 前言 
本次主要介绍标签的操作   

## 创建标签

- 命令git tag <name>用于新建一个标签，默认为HEAD，也可以指定一个commit id；
- git tag -a <tagname> -m "blablabla..."可以指定标签信息；
- git tag -s <tagname> -m "blablabla..."可以用PGP签名标签；
- 命令git tag可以查看所有标签。

## 操作标签  

- 命令git push origin <tagname>可以推送一个本地标签；
- 命令git push origin --tags可以推送全部未推送过的本地标签；
- 命令git tag -d <tagname>可以删除一个本地标签；
- 命令git push origin :refs/tags/<tagname>可以删除一个远程标签。  

<!--more-->   

# 实践   

## 创建标签  
### 切换到需要打标签的分支上  
![][1]  
### 敲命令git tag <name>就可以打一个新标签  
![][2]  
### 命令git tag查看所有标签
![][3]  
### git log查看日志  
![][4]  
### 通过commit id打标签  
![][5]  
### 用命令git tag查看标签  
![][6]  
### 用git show <tagname>查看标签信息   
![][7]  
## 操作标签   
### 删除标签  
![][8]
### 把某个标签推送到远程
![][9]  
### 一次性推送全部尚未推送到远程的本地标签  
![][10]  

 
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-tag-branch.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-tag-v1.0.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-tag-show-tag.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-tag-log.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-tag-commit-id.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-tag-two.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-show-v0.1.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-tag-del-v0.1.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-tag-push-v1.0.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-tag-push-all.png