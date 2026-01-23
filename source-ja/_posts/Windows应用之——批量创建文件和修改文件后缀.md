---
title: Windows应用之——批量创建文件和修改文件后缀
categories:
  - 系统
  - Windows
tags:
  - 批处理
abbrlink: f7098b7a
date: 2019-12-08 21:19:47
---
## 一 概述

本文主要介绍在Windows下，使用dos指令，批量创建文件和修改文件的后缀      

<!--more-->

## 二 批量创建文件

### 2.1 批量创建指令

```
for /L %%a in (1,1,5) do echo >>%%a.txt
```

### 2.2 指令说明

* 上面指令的意思表示在当前文件夹创建1-5，5个txt文件
* for /L：表示迭代
* %%a ：表示迭代时，当前的下标
* in：表示取值区间范围
* (1,1,5)：第一个1表示起始点，第二个表示step，第三个表示终点

### 2.3 将上述指令，做成make.bat文件
![][1]
### 2.4 双击bat文件，执行指令
![][2]

## 三 批量修改文件的后缀

### 3.1 批量修改指令介绍

```
ren *.txt *.txt1
```

###  3.2 指令介绍

* ren：重命名文件指令
* *.txt："\*"表示任意，"\*.txt"表示任何txt文件
* *.txt1：同上，表示修改txt文件的后缀为*.txt1

### 3.3 将上述指令，做成rename.bat文件
![][3]
### 3.4 双金rename.bat，执行批量修改文件后缀指令
![][4]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-dos-make-bat.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-dos-make-create.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-dos-rename-bat.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-dos-rename-done.png

