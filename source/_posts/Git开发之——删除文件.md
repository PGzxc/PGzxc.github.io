---
title: Git开发之——删除文件
categories:
  - 开发
  - I-版本控制
  - Git
tags:
  - 删除文件
abbrlink: e8f1e94d
date: 2018-02-26 11:01:47
---
# 前言 
命令git rm用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失最近一次提交后你修改的内容。  

<!--more-->  

# Git删除文件  
下面分两种情况讲解  
## 使用rm命令删了  
### 先添加一个新文件test.txt  
![][1]  
### 将文件添加到Git并且提交
![][2]  
### 使用rm命令删除文件 
![][3]  
这个时候，Git知道你删除了文件，因此，工作区和版本库就不一致了  
### git status命令查看status状态 
![][4]  
## 那就用命令git rm删掉，并且git commit  
![][5]  
现在，文件就从版本库中被删除了。  

[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-rm-create-file.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-rm-add-commit.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-rm-del-test.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-rm-status.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-rm-re-set.png