---
title: Git开发之——创建与合并分支
categories:
  - 开发
  - I-版本控制
  - Git
tags:
  - 创建与合并分支
abbrlink: b8d27512
date: 2018-02-26 15:09:34
---
# 前言  

本文主要讲述使用分支：

- 查看分支：git branch
- 创建分支：git branch <name>
- 切换分支：git checkout <name>
- 创建+切换分支：git checkout -b <name>
- 合并某分支到当前分支：git merge <name>
- 删除分支：git branch -d <name>  

<!--more-->  

# 原理 
 
<video id="video" height=300 width=500 controls="" preload="none" poster="http://p4plw91nh.bkt.clouddn.com/git-branch-video-view.png">
      <source id="mp4" src="http://p4plw91nh.bkt.clouddn.com/master-and-dev-ff.mp4" type="video/mp4">
    </video>



# 实战  
## 我们创建dev分支，然后切换到dev分支  
![][2]  
  
说明：  
git checkout命令加上-b参数表示创建并切换，相当于以下两条命令：  

	$ git branch dev
	$ git checkout dev
	Switched to branch 'dev   
## 用git branch命令查看当前分支：  
![][3]   

git branch命令会列出所有分支，当前分支前面会标一个*号。

## 对readme.txt做个修改 
![][4]  
## 然后提交  
![][5]  
## dev分支的工作完成，我们就可以切换回master分支：  
![][6]  
## 把dev分支的工作成果合并到master分支上  
![][7]  
## 合并完成后，就可以放心地删除dev分支  
![][8]  
## 删除后，查看branch，就只剩下master分支了 
![][9]  
## 查看readme的内容 
![][10]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/master-and-dev-ff.mp4
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-branch-create-dev.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-branch-look-dev.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-branch-add-content.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-branch-add-commit.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-branch-swich-master.png  
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-branch-merge-dev.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-branch-del-dev.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-branch-del-branch.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-branch-cat-readme-last.png