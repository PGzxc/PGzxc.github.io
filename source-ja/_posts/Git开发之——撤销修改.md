---
title: Git开发之——撤销修改
categories:
  - 开发
  - I-版本控制
  - Git
tags:
  - 撤销修改
abbrlink: a72ef28e
date: 2018-02-26 10:05:40
---
# 前言  

撤销操作的使用场景 

- 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。  
- 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD file，就回到了场景1，第二步按场景1操作。  
- 场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。  

<!--more-->    

# 撤销操作  
下面讲述撤销操作 
## 没有add 到暂存区 
### 模拟错误信息添加  
![][1]  
### 使用git status查看当前状态 
![][2]  
### 使用git checkout -- file可以丢弃工作区的修改
![][3]  
### 查看checkout后的内容 
![][4]  
如上图，回到了原来的内容  

## add到暂存区，但是没有commit  
### 添加修改，并查看 
![][5]   
### 查看add之后的状态  
![][6]  
### 执行checkout 和state查看  
![][7]  
### 用命令git reset HEAD file可以把暂存区的修改撤销掉（unstage）  
![][8]
### git status查看一下，现在暂存区是干净的，工作区有修改  
![][9]  



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-revoke-add-content.png  
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-revoke-status.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-revoke-checkout.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-revoke-cat-readme.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-revoke-add-second.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-revoke-status-second.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-revoke-checkout-status.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-revoke-reset-head.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-revoke-status-reset.png