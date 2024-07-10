---
title: Ubuntu开发之——命令概述
categories:
  - 系统
  - Ubuntu
tags:
  - Ubuntu
abbrlink: a9998d19
date: 2017-12-12 12:05:27
---

近几年来，尽管 Linux 发展得非常迅速，图形界面越来越友好，但是在真正的开发过程中，Linux 命令行的应用还是占有非常重要的席位，而且许多Linux功能在命令行界面要比图形化界面下运行的快。可以说不会命令行，就不算会 Linux。    

Linux 提供了大量的命令，利用它可以有效地完成大量的工作，如磁盘操作、文件存取、目录操作、进程管理、文件权限设定等。Linux 发行版本最少的命令也有 200 多个，这里只介绍比较重要和使用频率最多的命令。   
<!--more-->
# 命令概述
## 命令使用方法   

Linux命令格式:    
command  [-options]  [parameter1]  …    
说明：   

- command: 命令名,相应功能的英文单词或单词的缩写  
- [-options]：选项,可用来对命令进行控制，也可以省略
- []代表可选 parameter1 …：传给命令的参数：可以是零个一个或多个   

如下图：   
![示例][1]
## 查看帮助文档
### --help 
一般是linux命令自带的帮助信息  
如：ls --help  
![ls-help][2]
### man(manual)
man是linux提供的一个手册，包含了绝大部分的命令、函数使用说明

该手册分成很多章节（section），使用man时可以指定不同的章节来浏览。  
man中各个section意义如下：  

- Standard commands（标准命令）
- System calls（系统调用，如open,write）
- Library functions（库函数，如printf,fopen）
- Special devices（设备文件的说明，/dev下各种设备）
- File formats（文件格式，如passwd）
- Games and toys（游戏和娱乐）
- Miscellaneous（杂项、惯例与协定等，例如Linux档案系统、网络协定、ASCII 码；environ全局变量）
- Administrative Commands（管理员命令，如ifconfig）

## 自动补全

在敲出命令的前几个字母的同时，按下tab键，系统会自动帮我们补全命令  

## 历史命令  
当系统执行过一些命令后，可按上下键翻看以前的命令，history将执行过的命令列举出来  
![history][3]







[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux_command_opt.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-order-ls_help.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux_history.png