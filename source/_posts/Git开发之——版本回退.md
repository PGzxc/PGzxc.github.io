---
title: Git开发之——版本回退
categories:
  - 开发
  - I-版本控制
  - Git
tags:
  - 版本回退
abbrlink: 95bd231c
date: 2018-02-26 09:21:32
---
# 前言 

你不断对文件进行修改，然后不断提交修改到版本库里，就好比玩RPG游戏时，每通过一关就会自动把游戏状态存盘，如果某一关没过去，你还可以选择读取前一关的状态。有些时候，在打Boss之前，你会手动存盘，以便万一打Boss失败了，可以从最近的地方重新开始。Git也是一样，每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为commit。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个commit恢复，然后继续工作，而不是把几个月的工作成果全部丢失。   

这个操作就叫做版本回退    

<!--more-->  

# 版本回退  
下面将演示版本回退操作   
## 再次对README文件进行修改操作  
![][1]  
## 对修改后的文件进行提交 
![][2]  
## 查看修改记录 
目前为止我们总共对文件进行了3此修改操作，现在我们查看git是否为我们记录了这次操作    
### 使用git log查看 
这个指令是：   

	git log    

![][3]  
上图显示了我们进行3次操作的记录  
### 使用 git log --pretty=oneling查看
上图显示的过于凌乱，上述指令后面加上  --pretty=oneline指令会稍微清晰   

	git log --pretty=oneline   

![][4]   

###  可视化查看  
![][5]  

# 版本回退  
下面演示版本回退操作  
版本回退使用 git reset指令    
## 回退到上一个版本  

	git reset --hard HEAD^  

![][6]  
## 查看是否回退 
### 查看上一个版本内容 
![][7]   
### 使用git log查看当前状态  
![][8]  
## 回到之前的版本  
通过之前的版本id，通过查看我们知道，上一个的版本id为03799aa4c3c6e4fe7a9d23d3411a910dc57b2307，我们只需要写前几位既可   
![][9]  
查看当前内容，又回来了    

	admin@DESKTOP-S2V5EN0 MINGW64 ~/Desktop/Git (master)
	$ cat README.md
	# GITLearn
	add new content
	add third   

## 使用 git reflog用来记录你的每一次命令   
![][10]  




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-back-modify.png  
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-back-commit.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-back-log.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-log-pretty.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-gitk-view.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-back-head1.png  
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-back-cat-readme.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-back-second-log.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-back-to-current.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-back-reflog.png