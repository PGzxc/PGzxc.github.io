---
title: Git开发之——远程仓库配置
categories:
  - 开发
  - I-版本控制
  - Git
tags:
  - 远程仓库
abbrlink: 1f4abc54
date: 2018-02-26 11:21:13
---
# 前言 
Git是分布式版本控制系统，同一个Git仓库，可以分布到不同的机器上。怎么分布呢？最早，肯定只有一台机器有一个原始版本库，此后，别的机器可以“克隆”这个原始版本库，而且每台机器的版本库其实都是一样的，并没有主次之分。

此文使用GitHub作为服务端讲解，从名字就可以看出，这个网站就是提供Git仓库托管服务的，所以，只要注册一个GitHub账号，就可以免费获得Git远程仓库。  
<!--more-->  

# 配置远程仓库  
## 查看是否已经配置ssh  
按照下图所示路径查看是否存在.ssh文件夹和id_rsa和id_rsa.pub这两个文件
![][1]
## 如没有，则创建SSH Key  

	$ ssh-keygen -t rsa -C "youremail@example.com"  

你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。  
## 打开id_rsa.pub 或者Git-gui->help-show ssh key  
![][2]  
## 登陆GitHub，打开“Account settings”，“SSH Keys”页面：
![][3]

## 然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容：  
![][4]

至此，配置已经完成  


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-github-ssh.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-github-gui-key.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-github-ssh-config.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/git-github-new-ssh.png
