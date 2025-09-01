---
title: 'WinForm开发之——Visual2017导入项目'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 19e5eb6c
date: 2018-10-30 22:03:23
---

# 前言
开发桌面程序主流：C#(.net)或者C++。C++通常用于个人应用，大多数的通用商业程序都是C++开发的。而C#更多用于企业应用，更适合快速定制开发。    

本文主要讲述使用桌面开发工具Visual2017的简易安装流程及Visual导入已有的C#项目代码及注意事项；    


注：项目中使用的数据库是Access    


<!--more-->

# 软件环境
## 说明  
项目使用Visual 2017开发，进行项目开发、维护前，请确保电脑中已安装了Visual 2017

## 软件安装
1. 打开Windows官网，[下载Visual 2017][1] 

	![][2]
2. 双击运行软件,安装Visual 2017(按照个人需要安装工作负载)  
	
	![][3]  
3. 安装完成后启动软件

	![][4] 

# 打开项目配置运行环境
## 打开项目
1. 依次打开：文件——>打开——>项目/解决方案  
	
	![][5]  

2. 定位到项目文件所在目录，选中要打开的文件，双加打开  

	![][6] 
3. 项目打开后如图所示 

	![][7]

## 配置运行环境
1. 右键启动主程序MainApp，选择属性

	![][8]  
2. 打开如图所示界面

	![][9]

3. 选中"生成"选项卡，选中输出目录为项目同目录下的Bin文件夹(默认输出目录：bin\x86\Debug\)  

	![][10]
4. 选中"生成事件"选项卡，执行如下access数据库copy指令，并保存

		xcopy  "$(SolutionDir)DB"  "$(TargetDir)UserData\DB\"    

	![][11]  
5. 启动项目

	![][12]  

# 总结
本文主要介绍了C#开发工具Visual 2017的安装及项目的导入等配置操作，后面将逐步介绍与项目开发相关的技术点及自带打包发布工具和第三方发布工具等；    





[1]: https://visualstudio.microsoft.com/zh-hans/?rr=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3D2W1kCse-7RyGb8tqyjPNkWdpJFj2SWih3eqANtdgoaXjEtlSn3Jq8wl5LPt4Qp-p%26wd%3D%26eqid%3D9f5cb594000160a2000000035bd814bb
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-download-visual-studio
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-install.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-visual-start.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-project-open-opt.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-project-open.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-mainApp.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-MainApp-Property.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-proper-open.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-project-output-path.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-copy-db.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-start-project.png
