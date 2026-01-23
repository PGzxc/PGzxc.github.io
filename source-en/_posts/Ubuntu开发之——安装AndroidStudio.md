---
title: Ubuntu开发之——安装AndroidStudio
categories:
  - 系统
  - Ubuntu
tags:
  - AndroidStudio
abbrlink: 3d9c9766
date: 2018-05-20 12:48:25
---
# 前言
接触Ubuntu系统有一段时间了，对Ubuntu下软件的操作有了一定的了解，本文结合所学的知识，在Ubuntu系统下安装android开发工具——Android Studio。

<!--more-->

# 步骤
## 第一步：安装JDK
### 打开终端
使用快捷键：CTR+ALT+T  
![][1]
### 使用如下三条命令，安装JDK

	sudo add-apt-repository ppa:webupd8team/java 
	sudo apt-get update 
	sudo apt-get install oracle-java8-installer 

安装图解：  
![][2]    
![][3]  
![][4]  

### 若出现如下信息

```
Command 'java' not found, but can be installed with:

sudo apt install default-jre              # version 2:1.11-72, or
sudo apt install openjdk-11-jre-headless  # version 11.0.9.1+1-0ubuntu1~20.04
sudo apt install openjdk-8-jre-headless   # version 8u275-b01-0ubuntu1~20.04
sudo apt install openjdk-13-jre-headless  # version 13.0.4+8-1~20.04
sudo apt install openjdk-14-jre-headless  # version 14.0.2+12-1~20.04
```

执行

```
sudo apt install default-jre
```

### 检验JDK是否安装成功
输入：  

	java -version


![][5]  
## 安装AndroidStudio
### 下载AndroidStudio
打开["https://developer.android.google.cn/studio/"][6]链接，下载AndroidStudio
![][7]   
### 解压AndroidStudio
将Android复制到某个位置，并执行unzip指令解压(后缀为.zip)
![][8]  
若后缀文件名为`.tar.gz`

```
gzip -d android-studio-ide-201.6953283-linux.tar.gz
tar -xvf android-studio-ide-201.6953283-linux.tar
```


### 将解压后的文件移动到指定位置
本文移动到：/home/orange/soft下

![][9]   
### 打开终端，cd进入android-studio/bin目录“./studio.sh”进行安装
![][10]
### 其他配置如Windows
#### 设置是否代理
![][11]
#### 设置使用之前配置
![][12]
### 安装向导
![][13]  
![][14]  
![][15] 
![][16]  
![][17]  
## 新建项目
### 新建项目
![][18]  
###  配置项目
![][19]  
### 配置gradle
![][20]  

## 创建快捷方式 

### 打开快捷方式编辑器编辑快捷方式
ubuntu 的快捷方式都在/usr/share/applications/路径下创建Android studio 的快捷方式
命令如下

	sudo gedit /usr/share/applications/Studio.desktop
###  添加如下命令到Studio.desktop文本中

	[Desktop Entry]  
	Name = Studio  
	comment= android studio  
	Exec=/home/orange/tools/android-studio/bin/studio.sh  
	Icon=/home/orange/tools/android-studio/bin/studio.png  
	Terminal=false  
	Type=Application 

注意：

1. 路径问题： 
	- Exec:后面的换成自己的路径
	- Icon：后面的换成自己的路径

2. 后面不能后空格

### 将as快捷方式添加到收藏
![][21]

## 配置环境变量

### 配置环境变量

```
# android
export ANDROID_HOME=/home/pgzxc/Android/Sdk
export PATH=$ANDROID_HOME:$PATH
export PATH=$ANDROID_HOME/tools:$PATH
export PATH=$ANDROID_HOME/platform-tools:$PATH
```

####  使配置生效

```
source /etc/profile
```



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-terminal.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-jdk-01.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-jdk-02.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-jdk-03.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-java-version.png
[6]: https://developer.android.google.cn/studio/
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-tool-download.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-as-unzip.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-as-position.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-as-start.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-as-proxy.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-as-import.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-config-01.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-config-02.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-config-03.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-config-04.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-config-05.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-as-newpro.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-as-pro-conf.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-as-gradle-config.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu-as-add.png