---
title: NAS入门之——My Cloud EX2绑定IP和Mac地址(14)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2
abbrlink: 9e7eb5af
date: 2024-12-10 16:58:47
---
## 一 概述

```
NAS未绑定Mac和IP前，每次启动，NAS的IP地址可能发生变化。
TV等终端设备访问时，IP发生变化，导致访问地址改动。
```

<!--more-->

## 二  准备条件

### 2.1 查看路由器是否支持绑定IP与Mac

| 我的路由器 | 官方教程 |
| :--------: | :------: |
|   ![][1]   |  ![][2]  |

说明：

* 华硕路由器AC66U精简版，没有复杂设置和界面
* 跟官方示例对比，暂时没有绑定IP与Mac选项

### 2.2 MobaXterm终端登录到NAS后端

1-路由器端设置SSH开启及选项

![][3]

2-输入路由器用户名和密码

```
用户名:ASUS-ZXC
密码：你的登录密码
```

![][4]


## 三 IP与Mac相关操作(路由器终端)

### 3.1 绑定操作

3-查看ip和Mac地址，通过指令绑定

```
arp -s 192.168.1.7 00:00:C0:39:32:F8
```

![][5]

### 3.2 解绑操作(解除IP与Mac绑定)

```
arp -d 192.168.1.7
```

![][6]


## 四 参考

* [华硕官网—管理已连接到华硕路由器的客户端设备信息](https://rog.asus.com.cn/support/faq/1005513/)
* [华硕官网—进入华硕路由器的WebGUI设置页面](https://rog.asus.com.cn/support/faq/1045854/)
* [西部数据官网—IP与Mac绑定](https://support-en.wd.com/app/answers/detailweb/a_id/4166/related/1)



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-asus-view-1.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-asus-view-2.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-asus-ssh-3.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-terminal-login-4.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-terminal-bind-5.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-terminal-unbind-6.png
