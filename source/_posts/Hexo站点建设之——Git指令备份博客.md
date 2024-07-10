---
title: Hexo站点建设之——Git指令备份博客
categories:
  - 站点
  - Hexo博客
tags:
  - 备份
abbrlink: dc9065
date: 2017-12-06 16:45:59
---
# 前言
一直使用第三方备份工具[hexo-git-backup][1]备份hexo博客，今天使用时突然出错了！那么只能用git自带的指令完成博客文件的备份工作了。
![error][2]  
建议使用“git push” 提交本地文件
<!--more-->
# 步骤
## 从远程分支更新到本地   
比如，取回origin主机的hexo分支  git fetch origin hexo  

![fetch][3]
## 提交本地文件到远程分支
比如：提交本地文件到origin主机的hexo分支 git push origin hexo

![push][4]
# 备份

- 查看当前分支

	![branch][5]

- 把要备份的文件添加进来   

	![][6]  

- 添加备份说明  

	![][7]  

- 提交更改到远端  
	
	![push][8]

# 查看备份
远程origin的hexo分支已更新    

![update][9]




[1]: https://github.com/coneycode/hexo-git-backup
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo_backup_error.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-git-fetch.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-git-push.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hxo-git-branch.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-git-add.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-git-commit-m.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-git-push-hexo.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-update-bolg.png