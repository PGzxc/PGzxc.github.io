---
title: 使用Git指令备份hexo博客
date: 2017-12-06 16:45:59
categories: [hexo 搭建博客]
tags: [备份,hexo,Git]
---
一直使用第三方备份工具[hexo-git-backup][1]备份hexo博客，今天使用时突然出错了！
![error][2]  
建议使用“git push” 提交本地文件
<!--more-->
# 从远程分支更新到本地   
比如，取回origin主机的hexo分支  git fetch origin hexo  

![fetch][3]
# 提交本地文件到远程分支
比如：提交本地文件到origin主机的hexo分支 git push origin hexo

![push][4]
# 备份

- 查看当前分支

	![branch][6]

- 把要备份的文件添加进来   

	![][7]  

- 添加备份说明  

	![][8]  

- 提交更改到远端  
	
	![push][9]

# 查看备份
远程origin的hexo分支已更新    

![update][5]




[1]: https://github.com/coneycode/hexo-git-backup
[2]: http://p0j682kwo.bkt.clouddn.com/hexo_back_error.png
[3]: http://p0j682kwo.bkt.clouddn.com/git-fetch.png
[4]: http://p0j682kwo.bkt.clouddn.com/git-push.png
[5]: http://p0j682kwo.bkt.clouddn.com/hexo-update.png
[6]: http://p0j682kwo.bkt.clouddn.com/git_branch.png
[7]: http://p0j682kwo.bkt.clouddn.com/git_add.png
[8]: http://p0j682kwo.bkt.clouddn.com/git_commit_m.png
[9]: http://p0j682kwo.bkt.clouddn.com/git-push.png