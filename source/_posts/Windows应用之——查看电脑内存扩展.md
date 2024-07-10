---
title: Windows应用之——查看电脑内存扩展
categories:
  - 系统
  - Windows
tags:
  - Windows
abbrlink: fee941ac
date: 2023-04-19 11:54:16
---
## 一 概述

* 查看主板最大支持内存
* 查看电脑内存插槽个数

<!--more-->

## 二  查看主板最大支持内存

1-打开的命令提示符窗口中输入本次的命令，然后再次回车，即可得到主板的最大支持内存

```
wmic memphysical get MaxCapacity, MemoryDevices
```

2-指令执行完成后，返回最大支持内存

```
MaxCapacity  MemoryDevices
134217728    4
```

3-将千字节(KB)转换为GB

```
千字节(KB)：134217728KB
兆字节(MB)：134217728KB/1024=131072MB
吉字节(GB)：131072/1024=128GB
```

4-最终最大支持内存

经过除两次1024，得出电脑支持的最大内存为：128GB

## 三 查看电脑内存插槽个数

1-打开`任务管理器`，切换到`性能`选项卡下的内存选项

![][1]

2-查看当前已用插槽和总插槽

```
1-已用插槽1个
2-总插槽4个
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-memory-solt-number.png