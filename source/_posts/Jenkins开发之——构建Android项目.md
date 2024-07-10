---
title: Jenkins开发之——构建Android项目(2)
categories:
  - 开发
  - L-自动化
  - Jenkins
tags:
  - 项目构建
abbrlink: 7d8d3d8
date: 2017-11-18 16:47:38
---
原文参考：[Jenkins持续化构建Android项目（一）-安装配置Jenkins（by 星空武哥）][1]  

# 前言
使用Jenkins自动构建的服务端配置，可以方便的实现自动化打包，使用第三方插件，打包成功的apk文件可以实时更新到fir和蒲公英，设置邮件服务，随时随地接受到构建成功，失败，取消等消息提醒！

这篇博客主要介绍Jenkins的安装和配置  
<!--more-->
# 下载安装Jenkins

##  测试开发环境
在看下面的文章时，默认你已经搭建好Android开发环境了，并且已经配置好环境变量了（jdk、sdk、gradle环境变量都要配置，并且已经配置好了tomcat）  
下面的命令测试通过就说明环境变量配置好了，分别用下面的命令测试  
![环境变量][3]    

## 下载Jenkens   
配置完上面环境变量后，去官网下载Jenkins：https://jenkins.io/download/ ，这里有两种安装方式：一个是安装包，一种是war包，war包是放在tomcat的webapps目录下即可，运行tomcat后他会自动解压，建议这种是用这种方式。本教程也是使用的war的形式。  
![][4]  

# 配置Jenkens

## 下载完成后，将war包放到tomcat的”webapps”目录下，然后运行tomcat，

![tomcat-jenkins][5]  

## 待tomcat启动后在”webapps”目录下就可以看到”jenkins”目录，然后再浏览器内输入：http://localhost:8080/jenkins/ 登陆Jenkins  

![unlock][6]  

## 首次登陆后需要重置初始密码，找到个人文件目录，Jenkins自动生成的初始密码  
注：只有在登陆首次登陆时需要输入这个默认的密码
  
![initAdminPassword][7]  

## 下一步是让你选择要安装的插件，这里我们建议选择”建议安装的插件”，因为这里面几乎包含我所需要的插件了
![安装插件][8]  

## 插件的安装需要一段时间，下面显示要安装的插件，可以查看安装进度  
![安装进度][9]  

## 插件安装完成后，默认跳转到创建用户界面  
![创建用户][10]  
## 下一步进入主界面，至此环境搭建成功  
![][11]


  


 











参考：  
[Jenkins持续化构建Android项目（一）-安装配置Jenkins（by 星空武哥）][1]
[蒲公英使用 Jenkins 实现持续集成 (Android)][2]

[1]: http://blog.csdn.net/lsyz0021/article/details/72681857
[2]: https://www.pgyer.com/doc/view/jenkins
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkens-cmd.png  
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkens-install.png  
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/tomcat-jenkins.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/unlock-Jenkins.png 
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/init-admin-password.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/install-plugins.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkens-plugins.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkens-new-user.png 
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkens-homepage.png