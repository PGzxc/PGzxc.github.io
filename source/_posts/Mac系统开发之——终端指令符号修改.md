---
title: Mac系统开发之——终端指令符号修改
categories:
  - 系统
  - Mac
tags:
  - Mac
abbrlink: c86a9f11
date: 2025-01-23 18:13:04
---
## 一 概述

* Mac终端默认符号
* 终端符号修改

<!--more-->

## 二 Mac终端默认符号

Mac终端默认显示符号%

![][1]

## 三 终端符号修改(%—>#)

1-打开终端，执行如下指令

```
sudo vi /etc/zshrc
```

2-内容修改(内容变化：%#—>$)

```
1-修改前
PS1="%n@%m %1~ %# "
2-修改后
PS1="%n@%m %1~ $ "
```

3-显示效果(关闭当前窗口后打开)

![][2]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-cmd-default-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-mac/mac-cmd-modify-2.png

