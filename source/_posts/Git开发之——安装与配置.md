---
title: Git开发之——安装与配置
categories:
  - 开发
  - I-版本控制
  - Git
tags:
  - 安装与配置
abbrlink: 2c28e7bb
date: 2018-02-25 21:41:52
---
# Git安装与配置  
Linus在1991年创建了开源的Linux，从此，Linux系统不断发展，已经成为最大的服务器系统软件了。  

Git迅速成为最流行的分布式版本控制系统，尤其是2008年，GitHub网站上线了，它为开源项目免费提供Git存储，无数开源项目开始迁移至GitHub，包括jQuery，PHP，Ruby等等。  


<!--more-->  

# 安装Git
本次的安装分为Linux和Windows来讲解，Mac Os的安装，请自行百度。  

## Linux安装

- ALT+CTR+T 打开命令行  
![][1]  
- 执行 "sudo apt-get install git"  
![][2]
- 查看安装Git版本  
![][3]

## Windows安装 
Windows安装比较简单，下载软件后，一直下一步既可   
##  打开Git
![][4]
## 查看Git版本 
![][5]


# Git配置 

安装完成后，还需要最后一步设置，在命令行输入：  

	$ git config --global user.name "Your Name"
	$ git config --global user.email "email@example.com"  

# 查看Git配置 

## 查看git设置列表信息  

	$ git config --list   
![][6]
## 查看用户名  

	$ git config user.name    
![][7]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-install%20.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-install%20-process.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-install%20-version.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-win-sear.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-win-version.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-config-list.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-config-username.png