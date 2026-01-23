---
title: CentOS开发之——Java安装与配置
categories:
  - 系统
  - CentOS
tags:
  - Java
abbrlink: 4cd663f5
date: 2018-07-27 21:39:15
---
# 准备
1. JDK版本：jdk-8u181-linux-x64.tar.gz    
2. CentOS 系统    

 
本文以JDK8为例讲解JDK的安装步骤。    

<!--more-->  

         
# 安装
## 下载JDK  
打开[JDK官网][1],下载响应的JDK版本   
	![][2]

## 安装
1. 使用SSH远程连接到CentOS，打开shell，输入rpm -qa | grep java  查看是否安装java  
	![][3]  
	如果要卸载，请输入rpm -e --nodeps 要卸载的软件   

2. 将下载的JDK上传到指定目录下(本文以/usr/local为例)   
	![][4]

3. 上传后，可在当前目录下看到JDK压缩包  
	![][5]  
4. 解压到当前目录下  
 	
	使用指令 tar -xvf jdk-8u181-linux-x64.tar.gz(Tab按钮补全)	
	![][6]  
5. 配置JDK环境变量 
	
	打开/etc/profile配置文件，将下面配置拷贝进去     
	//set java environment    
	JAVA_HOME=/usr/local/jdk1.7.0_71    
	CLASSPATH=.:$JAVA_HOME/lib.tools.jar    
	PATH=$JAVA_HOME/bin:$PATH     
	export JAVA_HOME CLASSPATH PATH      

	![][7]  
6. 重新加载/etc/profile配置文件
	
	改变文件权限:chmod 777 profile    
	source /etc/profile   
 	
	![][8]

7. 查看java信息   
![][9]    


[1]: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-linux-download.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-grep.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-upload.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-upload-after.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-tar-xvf.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-path.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-source-etc-profile.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-version.png