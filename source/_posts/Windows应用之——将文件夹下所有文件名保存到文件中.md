---
title: Windows应用之——将文件夹下所有文件名保存到文件中
categories:
  - 系统
  - Windows
tags:
  - Windows
abbrlink: c0f63a4
date: 2024-04-25 11:24:23
---
## 一 概述

本文介绍在Windows下，将文件夹下所有文件名保存到文件中

* 命令符：保存文件名到文件中
* bat批处理文件：保存文件名到文件中

<!--more-->

## 二 命令符：保存文件名到文件中

### 2.1 打开CMD终端，输入dir指令

```
dir /B > 文件名.txt //未指定，放到同一个文件夹下
dir /B > C:\Users\83422\Desktop\文件名.txt //指定，放到指定位置
```

![][1]

### 2.2 同一个文件夹下

![][2]

### 2.3 放到指定位置

![][3]

## 三 bat批处理文件：保存文件名到文件中

### 3.1 批处理指令

```
for %%I in (*.*) do echo %%I>>all.txt
for %%I in (*.*) do echo %%I>>C:\Users\83422\Desktop\all.txt
```

### 3.2 双击bat指令.bat并查看执行后的文件

```
IMG_20240417_183844.jpg
IMG_20240417_185134.jpg
```

## 四 参考

1. [如何把文件夹内文件名批量导出到txt生成清单](https://jingyan.baidu.com/article/ce09321b200d732bff858ff6.html)
2. [Windows系统下，将文件夹中文件名字全部复制提取出来](https://blog.csdn.net/Demondai999/article/details/132499127)
3. [.bat脚本初体验——使用批处理bat清洗文件名](https://blog.csdn.net/weixin_30239361/article/details/81703851)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-file-cmd-before.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-file-cmd-after.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-file-cmd-after2.png