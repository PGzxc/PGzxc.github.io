---
title: Python开发之——Pycharm破解
categories:
  - 开发
  - G-后端开发
  - Python
tags:
  - Pycharm激活
abbrlink: 5e86ddc9
date: 2019-03-23 12:33:31
---

## 准备阶段(修改hosts文件)
###  hosts文件的位置

	C:\Windows\System32\drivers\etc

![][1]

<!--more-->

### 如何修改

	管理员模式下，将0.0.0.0 account.jetbrains.com添加到hosts文件最后

![][2] 

## 激活
pycharm的激活方式，分为注册码激活和破解补丁激活

* 注册码激活
* 破解补丁激活

### 注册码激活
#### 打开[http://idea.lanyus.com][3] 这个网址如下图 点击获得注册码即可
![][4]
#### 打开Pycharm，在激活页面选择“Activation code”，并将网站获取的激活码输入到列表框中,点击OK按钮    
![][5]
#### 出现如图界面，说明Pycharm已经激活  
![][6] 

### 破解补丁激活
#### 下载JetbrainsCrack-2.8激活补丁

	JetbrainsCrack-2.8下载链接: https://pan.baidu.com/s/1liWoJwSJzok_OzPsP4Iq9g 密码: jna6

#### 将下载好的补丁放在idea的安装目录下面的bin文件夹下面
![][7]

#### 修改配置文件

找到bin目录下的pycharm.exe.vmoptions和pycharm64.exe.vmoptions，用记事本打开，在最后一行添加

	-javaagent:E:\Software\Pycharm\bin\JetbrainsCrack-2.8-release-enc.jar

![][8]

#### 激活

启动Pycharm，当需要激活时，选择activation code，复制注册码到Acrivation code中的空白处，点击OK(同注册码激活)

![][5]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/pycharm_hosts-position.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/pycharm_hosts_modify.png
[3]: http://idea.lanyus.com/
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/pycharm_lanyus_active.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/pycharm_activity_input.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/pycharm_licensed_to_lanyu.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/pycharm-crack-bin.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/pycharm-crack-vmoptions.png