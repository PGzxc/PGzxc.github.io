---
title: Windows应用之——exe和bat添加到Windows服务
categories:
  - 系统
  - Windows
tags:
  - Windows
abbrlink: fb64eff4
date: 2021-12-21 13:29:09
---
## 一 概述

* exe程序添加到Windows服务
* `.bat`批处理文件添加到Windows服务

<!--more-->

## 二 exe程序添加到Windows服务

### 2.1 创建——管理员模式

```
sc.exe create "Service Name" binPath= "C:\Your Program.exe"
```

//注：binPath=后的空格，binPath指定的是.exe文件的绝对路径

### 2.2 删除——管理员模式

```
sc.exe delete "Service Name"
```

### 2.3 启动

```
sc.exe start "Service Name"
```

### 2.4 停止

```
sc.exe stop "Service Name"
```

## 三 `.bat`批处理文件添加到Windows服务

### 3.1 创建

```
service.bat install
```

### 3.2 删除

```
sc delete "Service Name"
```

## 四 参考

* [百度百科——.bat](https://baike.baidu.com/item/%E6%89%B9%E5%A4%84%E7%90%86/1448600?fromtitle=.bat&fromid=6476412&fr=aladdin)
* [Microsoft——Sc create](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/cc990289(v=ws.11)?redirectedfrom=MSDN)