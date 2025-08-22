---
title: Git开发之——解决冲突
categories:
  - 开发
  - I-版本控制
  - Git
tags:
  - 解决冲突
abbrlink: a1788f9b
date: 2018-02-26 18:07:50
---
# 前言 
当有2个分支，master分支和feature1分支各自都分别有新的提交，变成了这样
![][1]    

这种情况下，Git无法执行“快速合并” ，下面将讲述如何解决冲突。  
<!--more-->  

# 解决冲突 

## 准备新的feature1分支  
![][2]  
## 修改readme内容  
![][3]  
## 在feature1分支上提交  
![][4]  
## 切换到master分支  
![][5]  
## 在master分支上把readme文件修改  
![][6]  
## 在master分支上提交  
![][7]  
## 种情况下，Git无法执行“快速合并”  
![][8]  
## git status也可以告诉我们冲突的文件
![][9]  
## 直接查看readme的内容  
![][10]  
## 对readme内容修改
![][11]  
## 修改之后再提交 
![][12]  
## 删除feature1分支
![][13]  


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-conflict-show.png 
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-config-checkout-b.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-config-add-content.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/images/master/blog-imagesgit-config-add-commit.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-config-master.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-config-master-modify.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-config-master-add-commit.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-config-merge-fail.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-config-merge-status.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-config-confile.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-config-confile-after.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-config-fixed.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-config-del-branch.png