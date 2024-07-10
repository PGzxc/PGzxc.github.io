---
title: CentOS开发之——开启远程登录访问
categories:
  - 系统
  - CentOS
tags:
  - 远程登陆
abbrlink: 85a8c385
date: 2019-10-08 22:56:40
---
## 一 登录失败说明
 
远程终端安装了Centos7，使用本地电脑使用SSH命令连接登录到远程Centos7的过程中出现了如下的错误"Permission denied"       

![][1]    

<!--more-->

注：   
 
* ssh：远程登录指令
* admin:远程主机用户名(此处应使用root)
* 172.16.222.130：远程主机ip地址

## 二 登录失败原因查找及解决

### 2.1.1 查看并安装SSH
使用如下指令"rpm -qa | grep ssh"查看远程主机是否安装了SSH    
![][2]  

### 2.1.2 安装缺失的包(openssh-client,openssh-server其他)
![][3]

### 2.1.3 注册使用服务

	systemctl enable sshd
  
![][4]

### 2.1.4 配置OpenSSH服务

	
	PermitRootLogin yes
	StrictModes no
	RSAAuthentication yes
	PubkeyAuthentication yes
	AuthorizedKeysFile      .ssh/authorized_keys
 

### 2.1.5 开启iptables，并开启22端口(永久保存)
	service iptables save  
	systemctl enable iptables.service
![][5]

### 2.1.6 重启OpenSSH服务

	systemctl start sshd

### 2.1.7 远程SSH连接服务器

	ssh root@172.16.222.130
![][6]


注：   

* 此处ssh 后紧跟root@远程主机ip地址   
* root表示管理员模式登陆，可能你设置的用户名不是root
* 连接密码为你设置的密码



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-login-error.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-ssh-check.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-yum-install-openssh.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-systemctl-enable-sshd.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos-iptables-22-open.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos-ssh-connect.png