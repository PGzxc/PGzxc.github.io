---
title: Jenkins开发之——上传apk到fir
categories:
  - 开发
  - L-自动化
  - Jenkins
tags:
  - 项目构建
abbrlink: 685bb144
date: 2017-11-18 21:54:00
---
原文参考：[Jenkins持续化构建Android项目（三）-Jenkins上传apk到fir（by 星空武哥）][10]    
# 前言 
本文介绍通过Jenkins将apk文件上传到fir    
我们先了解什么是fir？  
1. 内侧托管：一键上传应用，扫描二维码下载应用；  
2. 应用合并：扫描同一个二维码，根据设备类型自动下载对用的IOS或Android应用；  
3. 命令行工具：fir-cli可以通过命令行查看、上传、编译、打包应用  
<!--more-->

# 准备 
- 准备一个fir账号，没有点击此处去注册[fir官网][1],注册完后生成需要的API token       
![][2]  

- 下载Jenkins需要的fir上传插件，[去下载][3]   

- 安装fir插件 

	- 依次点击：Jenkins->系统管理->管理插件，进入管理插件  
	![][4]  

	- 依次点击：Jenkins->系统管理->管理插件->高级->上传插件  
	选择插件后确定后，点击上传 
	![上传插件][5]

- 配置插件  

	- 添加配置  

		项目名(此处为Fragment)——>配置——>构建后操作——>Upload to fir.im，增加一个构建后配置    
		![Upload to fir.im][6]
	- 填入刚才复制的API token和apk路径绝对路径  
	![Token][7] 

# 执行  

- 配置完后保存，手动构建一次  
![手动构建][8]

- 可以看到上传成功了
![][9]





[1]: https://fir.im/
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-fir-im.png
[3]: http://7xju1s.com1.z0.glb.clouddn.com/fir-plugin-1.9.5.hpi
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-fir-manage-plugin.png 
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-fir-upload-plugin.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-fir-up-to-fir.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-fir-im-token.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-build-by-hand.png  
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-fir-app.png
[10]: http://blog.csdn.net/lsyz0021/article/details/72683171