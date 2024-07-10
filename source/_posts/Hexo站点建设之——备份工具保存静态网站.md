---
title: Hexo站点建设之——备份工具保存静态网站
categories:
  - 站点
  - Hexo博客
tags:
  - 备份
abbrlink: 7d6f9cb8
date: 2017-11-13 23:10:22
---


# 工具：  

- [hexo-git-backup][1]
- git
- node

# 生成备份文件 

## 安装hexo-git-backup  
 <!--more-->
	$ npm install hexo-git-backup --save 
![安装hexo-git-backup][2]

##  在项目根目录的_config.yml中添加back备份信息，如备份主题，备注信息，备份分支  
![添加备份信息][3]

## 执行备份执行，查看备份结果

	 $ hexo back   
     $ hexo b         

![备份结果][4]


# 从Github备份下载本地(用于更换电脑时使用)

##  在本地新建要备份的文件夹，此处备份到 /d/Code/backup 下
![][5]  

## 打开git bash，进入到此目录下  
![][6]

## 从Github从hexo分支，下载到本地  

	git clone -b hexo git@github.com:PGzxc/PGzxc.github.io.git    

![][7]
![][8]

## 安装 hexo  

	$ npm install -g hexo
![][9]	

## 安装hexo-deployer-git

	$ npm install hexo-deployer-git --save  

![][10]
	 
## 执行 hexo g 指令，生成静态页面  

	$ hexo g

![][11]

## 执行 hexo s 指令，启动服务，在浏览器中输入http://localhost:4000/ 查看运行结果

	 $ hexo s  
![][12]




[1]: https://github.com/coneycode/hexo-git-backup
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-install-git-backup.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-add-backup-info.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-branches.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-back-folder.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-backup-git-bash.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-git-clone.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-git-clone-local.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-install-hexo-g.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-install-hexo-deplyer-git.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-backup-hexo-g.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-localhost-4000.png