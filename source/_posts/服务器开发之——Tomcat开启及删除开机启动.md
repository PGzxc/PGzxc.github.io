---
title: 服务器开发之——Tomcat开启及删除开机启动
categories:
  - 开发
  - G-后端开发
  - Tomcat
tags:
  - Tomcat
abbrlink: de8d44d
date: 2019-12-19 21:14:19
---
## 一 环境确认

### 变量

```
CATALINA_BASE    D:\SoftWare\apache-tomcat-8.5.32     
CATALINA_HOME   D:\SoftWare\apache-tomcat-8.5.32
```
<!--more-->
### Path
```
%CATALINA_HOME%\lib;   
%CATALINA_HOME%\bin;
```

## 二 在当前文件夹打开CMD窗口
* 进入到当前文件夹，在路径中输入cmd然后按回车键，打开cmd命令行窗口
* 假如电脑安装了cmder，可输入cmder，打开cmder命令行窗口
![][1]



## 三 添加开机启动服务

* 进入TOMCAT的bin目录，按二步骤打开cmd窗口
![][2]
* 输入"service.bat install"，如下图
![][3]
* 回车后，出现如图所示信息，表示服务添加成功(服务名称为Tomcat8)  
![][4]
* WIN+R，输入"service.msc"，打开windows服务窗口，查找已安装的服务(服务名称为Tomcat8)
![][5]
* 修改服务启动方式(启动类型：手动->自动)
![][6]

## 四 删除开机启动服务

* 以管理员模式，打开命令行窗口  
![][7]
* 输入：sc delete 服务名，如上图服务名为Tomcat8，则输入：sc delete Tomcat8
![][8]

* WIN+R，输入"service.msc"，打开windows服务窗口，查看Tomcat8服务是否存在

## 五 修改服务名称和描述

### 5.1 修改服务名

* 进入TOMCAT的bin目录，打开service.bat文件，搜索service_name的值，如下图
![][9]

* 修改service_name右侧的值

## 六 参考

* [TOMCAT设为开机自启动服务以及删除TOMCAT服务操作步骤][10]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/file-open-cmd.gif
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-open-cmder.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-service-install.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-service-installed.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-service-show-windows-msc.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-start-auto-set.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-delete-open-cmder.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-delete-tomcat-service.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-modify-search-servicename.png
[10]:https://www.cnblogs.com/kengqiangmao/p/10861065.html