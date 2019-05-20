---
title: Git开发之——常用的几个指令
date: 2018-02-25 23:26:44
categories: [工具,Git]
tags: [常用指令]
---

# 前言
上一节我们已经成功地添加并提交了一个readme.txt文件，现在，是时候继续工作了，于是，我们继续修改readme.txt文件，并将其中常用的几个指令介绍一下。     
本文用到的指令：  

- git add 
- git commit 
- git status
- git diff

<!--more-->

# Git指令讲解

结合实际内容，我们将上节的内容修改如下：  

	# GITLearn
	add new content


![][1]
## git status 查看仓库状态
![][2]  
## git diff这个命令查看具体修改的内容  
![][3]   
## git add 将修改的内容提交到代码仓库  

	$ git add readme.txt  
## git commit 将当前状态提交到代码仓库  
![][4]  
## git status查看git commit后的状态
![][5] 




[1]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/git-add-content.png
[2]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/git-add-status.png
[3]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/git-add-diff.png
[4]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/git-add-commit.png
[5]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/git-add-commit-status.png
