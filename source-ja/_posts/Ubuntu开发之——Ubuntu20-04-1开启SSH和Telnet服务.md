---
title: Ubuntu开发之——Ubuntu20.04.1开启SSH和Telnet服务
categories:
  - 系统
  - Ubuntu
tags:
  - Ubuntu
abbrlink: 76d860a
date: 2021-01-12 10:29:47
---
## 一 概述

通过VMware Workstation安装Ubuntu 20.04.1，默认没有开启SSH和Telnet服务以及端口号，无法通过超级终端进行连接

* 开启端口号
* 开启SSH服务
* 开启Telnet服务

<!--more-->

## 二 开启端口号(sudo模式下)

### 2.1 安装iptables

```
$apt-get update 
$apt-get install iptables
```

### 2.2 开放指定端口

```
iptables -I INPUT -p tcp --dport 22 -j ACCEPT
iptables -I INPUT -p tcp --dport 23 -j ACCEPT
iptables -I INPUT -p tcp --dport 80 -j ACCEPT
iptables -I INPUT -p tcp --dport 8080 -j ACCEPT
iptables -I INPUT -p tcp --dport 443 -j ACCEPT
```

### 2.3 保存规则

```
$ iptables-save
```

这样可以开放指定的端口，但是如果服务器重启，不会保存，所以我们需要对上述规则进行一下持续化操作

### 2.4 持续化规则(使用 iptables-persistent)

### 2.4.1 首先安装iptables-persistent

```
$ apt-get install iptables-persistent
```

#### 2.4.2 永久保存规则

##### Ubuntu 14.04

```
sudo invoke-rc.d iptables-persistent save
sudo invoke-rc.d iptables-persistent reload
```

或者

```
sudo /etc/init.d/iptables-persistent save 
sudo /etc/init.d/iptables-persistent reload
```

#####  Ubuntu 16.04以上

```
$ netfilter-persistent save
$ netfilter-persistent reload
```

##### 生成的规则将被存储文件位置

```
/etc/iptables/rules.v4
/etc/iptables/rules.v6
```
## 三 开启SSH服务

### 3.1 更新软件下载源并安装SSH服务

```
sudo apt-get update
sudo apt-get install openssh-server
```

### 3.2 开启防火墙ssh的服务端口

```
sudo ufw allow ssh
```

### 3.3 查看ssh服务状态

```
systemctl status ssh
```

### 3.4 开启或关闭ssh服务

关闭ssh服务

```
systemctl stop ssh
```

开启ssh服务

```
systemctl start ssh
```

### 3.5 重启ssh服务

```
systemctl restart ssh
```

### 3.6 开机自启设置

设置开启自启

```
sudo systemctl enable ssh
```

关闭开机自启

```
sudo systemctl disable ssh
```

## 四 开启Telnet服务

### 4.1 安装openbsd-inetd软件包

```
sudo apt-get install openbsd-inetd -y
```

### 4.2 安装telnetd服务

```
sudo apt-get install telnetd -y
```

### 4.3 查看运行状态

指令

```
sudo netstat -a | grep telnet
```
运行状态
```
tcp        0      0 0.0.0.0:telnet          0.0.0.0:*               LISTEN
```

### 4.4 本机登录与远程登录测试

#### 4.4.1 本地登录(telnet 127.0.0.1)

```
root login: pgzxc
Password: 
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-52-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage


286 updates can be installed immediately.
72 of these updates are security updates.
To see these additional updates run: apt list --upgradable

Your Hardware Enablement Stack (HWE) is supported until April 2025.
Last login: Tue Jan 12 17:10:17 CST 2021 from 192.168.116.1 on pts/1
```

#### 4.4.2 远程登录(telnet 192.168.116.128)

##### 启用telnet服务

打开控制面板–>程序–>启用或关闭Windows功能—>Telnet Client

##### telnet登录输出结果

```
Ubuntu 20.04.1 LTS
root login: pgzxc
Password:
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-52-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage


286 updates can be installed immediately.
72 of these updates are security updates.
To see these additional updates run: apt list --upgradable

Your Hardware Enablement Stack (HWE) is supported until April 2025.
Last login: Tue Jan 12 17:45:24 CST 2021 from localhost on pts/3
```

### 4.5 若登录失败，重启openbsd-inetd服务或系统

重启openbsd-inetd服务

```
sudo /etc/init.d/openbsd-inetd restart
```

重启系统

```
sudo reboot
```

## 五 超级终端链接

### 5.1 Telnet登录
![][1]
### 5.2 SSH链接
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/linux-terminal-telnet-login.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/linux-terminal-ssh-login.png