---
title: Cursor代码神器之——无限试用器工具(2)
categories:
  - 开发
  - R-AI开发助手
  - Cursor
tags:
  - Cursor
abbrlink: 73cbba5a
date: 2024-12-21 08:22:56
---
## 一 概述

[go-cursor-help](https://github.com/yuaotian/go-cursor-help)：解决Cursor在免费订阅期间出现提示的问题的工具

<!--more-->

## 二 软件介绍

### 2.1 软件地址

https://github.com/yuaotian/go-cursor-help

### 2.2 支持平台

* **Windows** x64
* **macOS**  Intel和M系列
* **Linux**  x64和ARM64

## 三 Win端安装方法(指令-推荐)

### 3.1  `WindowsPowerShell ISE` 模式下运行(正确)

1-windowsPowerShell ISE下以管理员模式打开

![][1]

2-输入并执行以下指令

```
irm https://raw.githubusercontent.com/yuaotian/go-cursor-help/master/scripts/install.ps1 | iex
```

图示

![][2]

3-破解成功提示后弹窗

![][3]


### 3.2 powershell模式(错误)

1-以管理员模式打开PowerShell

![][4]

2-输入并执行以下指令

```
irm https://raw.githubusercontent.com/yuaotian/go-cursor-help/master/scripts/install.ps1 | iex
```

图示

![][5]

3-安装异常

![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-2-win-pshell-open-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-2-win-pshell-cmd-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-2-win-pshell-id-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-2-win-pshell-admin-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-2-win-pshell-cmd-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-2-win-pshell-cursor-eror-6.png