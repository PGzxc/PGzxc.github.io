---
title: Windows应用之——设置定时关机
categories:
  - 系统
  - Windows
tags:
  - 定时关机
abbrlink: ca4073cb
date: 2023-02-23 10:57:08
---
## 一 概述

本文介绍window设置自动关机的两种方式：

* cmd指令设置自动关机
* 任务计划程序设置自动关机
* 第三方定时关机软件

<!--more-->

## 二  cmd指令设置自动关机—不推荐

### 2.1 自动关机-开启(管理员模式下)

依次点击‘“开始”，在“搜索程序和文件”中输入cmd，选择以“管理员身份运行”

![][1]

在界面中输入命令shutdown -s -t 3600，其中3600表示在3600秒(1小时)后将会自动关机

```
shutdown -s -t 3600
```
![][2]

跳出定时关机弹窗提醒

![][3]

### 2.2 自动关机—取消(管理员模式下)

在cmd窗口中输入如下取消关机指令

```
shutdown -a
```

![][4]

## 三 任务计划程序设置自动关机

### 3.1 创建任务计划程序自动关机

右击“此电脑”，在弹出的窗口中选择“管理”

![][5]

打开如图所示的“计算机管理”界面

![][6]

依次选择：计算机管理——>系统工具——>任务计划程序——>任务计划程序库

![][7]

点击右侧的“创建基本任务”，打开如下创建基本任务弹窗
![][8]

在`创建基本任务`窗口，名称写“自动关机”(任意名字)，点击“下一步”
![][9]

在`触发器`窗口，选择触发周期或时间(如希望每天定时触发选择每天)
![][10]

在`触发器`窗口，选择触发开始的时间及间隔(如本文设置从24号凌晨5点30分开始关机)
![][11]

在`操作`窗口，选择默认“启动程序”即可，点击“下一步”
![][12]

在`启动程序`窗口，程序或脚本输入`shutdown`，添加参数输入`-s`，点击下一步
![][13]

确认后，点击“完成”就设置完成了
![][14]

### 3.2 删除任务计划程序自动关机

在：系统工具——>任务计划程序——>任务计划程序库中找到`自动关机`触发器，右键删除即可

![][15]

## 四 第三方定时关机软件

|  No  |          软件名称           |     说明      |
| :--: | :-------------------------: | :-----------: |
|  1   |        定时关机 3000        | 收费(试用7天) |
|  2   |          自动定时           |     免费      |
|  3   | MiniShutOff（定时自动关机） |     免费      |
|  4   |        定时关机精灵         |     免费      |
|  5   |      我的电脑定时关机       |     免费      |



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-cmd-open-admin.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-cmd-3600.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-reminder-dialog.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-cancel-reminder.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-task-computer-manager.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-task-open-computer-manager.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-task-computer-manager-libs.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-task-computer-manager-create-task.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-task-computer-manager-task-name.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-task-computer-operation-task-time.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-task-computer-operation-settime.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-task-computer-operation-operation.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-task-computer-operation-task-start.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-task-compute-operation-task-finish.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-shutdown-task-delete.png