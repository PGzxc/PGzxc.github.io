---
title: Git开发之——解决冲突
date: 2018-02-26 18:07:50
categories: [工具,Git]
tags: [解决冲突]
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


[1]: http://p4plw91nh.bkt.clouddn.com/git-conflict-show.png 
[2]: http://p4plw91nh.bkt.clouddn.com/git-config-checkout-b.png
[3]: http://p4plw91nh.bkt.clouddn.com/git-config-add-content.png
[4]: http://p4plw91nh.bkt.clouddn.com/git-config-add-commit.png
[5]: http://p4plw91nh.bkt.clouddn.com/git-config-master.png
[6]: http://p4plw91nh.bkt.clouddn.com/git-config-master-modify.png
[7]: http://p4plw91nh.bkt.clouddn.com/git-config-master-add-commit.png
[8]: http://p4plw91nh.bkt.clouddn.com/git-config-merge-fail.png
[9]: http://p4plw91nh.bkt.clouddn.com/git-config-merge-status.png
[10]: http://p4plw91nh.bkt.clouddn.com/git-config-confile.png
[11]: http://p4plw91nh.bkt.clouddn.com/git-config-confile-after.png
[12]: http://p4plw91nh.bkt.clouddn.com/git-config-fixed.png
[13]: http://p4plw91nh.bkt.clouddn.com/git-config-del-branch.png