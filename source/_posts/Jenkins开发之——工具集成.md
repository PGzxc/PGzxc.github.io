---
title: Jenkins开发之——工具集成
categories:
  - 开发
  - L-自动化
  - Jenkins
tags:
  - Jenkins
abbrlink: a093e812
date: 2018-06-17 11:26:20
---
# 前言
Jenkins是一个功能强大的应用程序，允许持续集成和持续交付项目，无论用的是什么平台。这是一个免费的源代码，可以处理任何类型的构建或持续集成。集成Jenkins可以用于一些测试和部署技术。    

## 持续集成
持续集成是一个开发的实践，需要开发人员定期集成代码到共享存储库。这个概念是为了消除发现的问题，后来出现在构建生命周期的问题。持续集成要求开发人员有频繁的构建。最常见的做法是，每当一个代码提交时，构建应该被触发。   
<!--more-->  

# Jenkins集成
## 准备工作
### 下载配置JDK
1. 下载JDK下载地址：[JDK][1]，下载所需的版本工具
2. 配置JDK 配置JAVA_HOME，并添加到环境变量中
### 下载配置Tomcat
1. 下载[Tomcat][2]
2. 将Tomcat解压到本地目录
3. 添加CATALINA_BASE，TOMCAT_HOME，CATALINA_HOME环境变量，指向Tomcat本地目录
4. 添加变量值：%CATALINA_HOME%\lib;%CATALINA_HOME%\bin到path
### 下载Jenkins
#### 打开[Jenkins官网][3]，选择所需的文件
本文以通用war为例讲解，用户可根据需要选择对应平台的文件直接安装   
![][4]
#### 将下载的jenkins.war放到Tomcat目录\webapps文件夹下
![][5]  
#### 打开CMD，输入startup命令
![][6]  
#### 在webapps下生成jenkins文件夹
![][7]  
#### 输入http://localhost:8080
![][8] 
## Jenkins配置 
### 解锁Jenkins
#### 在提示的地址找到对应管理员密码
![][9]  
#### 输入对应的管理员密码解锁
![][10]  
### 安装插件 
#### 选择要安装的插件
Jenkins推荐2中插件安装方式，本文选择推荐方式(用户可自定义安装方式)
![][11]
#### 点击确定，开始插件安装(安装过程稍微有点长) 
![][12]  
### 完成安装
#### 配置管理员
![][13]  
#### 配置访问路径
此处的localhost可改为对应ip中的路径  
![][14]  
#### 点击确定，完成安装 
![][15]  
#### 点击开始使用，进入主界面
![][16]  
## 执行任务 
### 系统管理配置
#### 系统设置
依次点击：系统管理——>系统设置——>打开系统设置页面 
如配置：访问Jenkins地址，管理员邮件地址等等
![][17]  
#### 全局工具配置
依次点击：系统管理——>全局工具配置——>打开全局工具配置页面 
如配置：JDK,GIT等
![][18]  
#### 其他配置信息
其他配置信息，请自行查看即可
### 新建任务
#### 新建一个任务
![][19]  
#### 输入任务的名称和类别
本地以Github项目为例讲解  
![][20]  
#### 配置任务信息
配置任务信息包含：General、源码管理、构建触发器、构建环境、构建、构建后  
##### General
本例中以Github项目为例，本地项目类似  
![][21]
##### Source 
选择源码仓库位置，本例选择Github项目地址 
![][22]  
##### 其他
其他配置请自行决定 
#### 配置完成后
![][23] 
### 项目构建
#### 点击左侧立即构建的开始构建 
![][24]  
#### 查看构建新型
构建完成后，可在左侧查看构建信息
![][25]  
#### 在Jenkins\workspace下查看项目源码
![][26]  


[1]:http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
[2]: https://tomcat.apache.org/download-90.cgi
[3]: https://jenkins.io/download/
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-jar.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-war.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-install.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-tomcat-create.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-lock.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-lock-password.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-lock-password-put.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-recomond-plug.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-plugin-install.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-create-admin.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-url.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-finish.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-home.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-monitor.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-jdk-git.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-start-task.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-task.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-general.png
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-source.png
[23]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-project.png
[24]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-build.png
[25]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-console.png
[26]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-workspace.png