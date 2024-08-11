---
title: Cmder开发之——软件安装与配置
categories:
  - 工具
  - Cmder
tags:
  - Cmder
abbrlink: fcd00d86
date: 2020-08-26 22:09:16
---
## 一 概述

使用Windows开发环境，系统自带的cmd命令行工具不能满足自己的需求，而且外观不是很喜欢，并且部分命令不能正常使用。Cmder则是一个比较优秀的命令行工具，可以替代Cmder和Powershell，并且可以支持Git，使用起来非常方便。并且有很多配置项可以选择，可以打造一个适合自己的工具，下面介绍Cmder的安装和基本的配置

<!--more-->

## 二 软件的下载与安装

* 进入 [Cmder 官网][11] 进行下载，官方提供 Mini 和 Full 版本，主要区别是 Full 比 Mini 版本多了 Git 的功能，可以根据自己的需要下载对应的版本。

![][1]
* 下载后进行解压，完成后进入 `cmder` 目录中，双击 `cmder.exe` 即可运行软件。
![][2]

## 三 软件配置

为了提升使用体验，可以根据自己的需要进行配置：

### 3.1 设置环境变量

将cmder的文件路径添加到环境变量PATH中即可

```
CMDER_HOME D:\SoftWare\cmder
%CMDER_HOME%
```

### 3.2 将 Cmder 添加到右击菜单下(删除右键菜单是UNREGISTER ALL)

在管理员权限下打开cmd，输入以下命令

```
Cmder.exe /REGISTER ALL
Cmder.exe /UNREGISTER ALL
```

![][3]
### 3.3 解决中文乱码问题

* 在Cmder右下角的`+`找到`Setup tasks`，打开设置窗口
  ![][4]
  
* 进入到`Startup—>Environment`选项，填入

  ```
  set LC_ALL=zh_CN.UTF8
  ```
  
  ![][5]

### 3.4 修改提示符

在 Cmder 根目录下打开 vendor 文件夹，打开 clink.lua 文件，将 lambda 的值修改为 `$` 即可，然后重新打开即可

```
local lambda = "$"
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmder-download-select.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmder-exe-run.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmder-register-all.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmder-setup-tasks.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmder-startup-environment-zh.png
[11]:https://github.com/cmderdev/cmder/releases