---
title: IOS开发之——创建快捷指令续签AltStore应用
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: '56871152'
date: 2023-09-29 08:52:44
---
## 一 概述

* 通过AltStore签名安装的应用只可以使用七天，超过7天就会失效无法使用
* AltStore中My Apps界面，手动点击Refresh All，可以手动刷新应用的有效期
* 通过创建快捷指令，模拟定期或指定条件执行Refresh All操作实现自动延期

<!--more-->

## 二 准备条件

* Mac 电脑
* Iphone/Ipad设备
* AltStore软件(电脑和设备端都已安装)
* Iphone/Ipad设备与mac电脑共处于同一个WIFI环境下
* [安装快捷指令App](https://apps.apple.com/app/shortcuts/id915249334)

## 三 创建快捷指令

| 1-Add to Siri... | 2-添加快捷指令 | 3-查看快捷指令 |
| :--------------: | :------------: | :------------: |
|      ![][1]      |     ![][2]     |     ![][3]     |

说明：

1. 打开AltStore，切换到Settings选项卡，在Refreshing Apps标签下选择`Add to Siri...`
2. 在打开的界面中选择：输入或录制快捷指令(如AltStore刷新)
3. 添加完成后打开快捷指令App(`Altstore刷新`指令已添加)

## 四  自动化—满足条件自动执行快捷指令

| 1-切换到自动化 | 2-添加指令 | 3-设置指令内容 |
| :------------: | :--------: | :------------: |
|     ![][4]     |   ![][5]   |     ![][6]     |

| 4-选择指令 | 5-添加完成后 |
| ---------- | ------------ |
| ![][7]     | ![][8]       |

说明：

1. 打开快捷指令App，切换到自动化选项卡
2. 点击顶部的`+`号，在弹窗的对话框中选择一条(比如定时操作或者链接WIFI)执行
3. 设置执行的具体内容，比如操作时间、执行频率、是否需要确认
4. 下一步，选择关联操作的指令(`Altstore刷新`)
5. 同理，添加一条接入WIFI时自动化指令，完成后界面如图

## 五 自动化执行

| 1-开始执行 | 2-执行中 | 3-执行结束 |
| :--------: | :------: | :--------: |
|   ![][9]   | ![][10]  |  ![][11]   |

说明：

1. 满足条件(如接入WIFI时)，弹出框提醒，快捷指令开始执行
2. AltStore中的Refresh All执行刷新
3. 快捷指令执行结束后，快捷指令弹窗，刷新完成



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-altstore-shortcat-add-siri.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-altstore-shortcat-set-name.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-altstore-shortcat-add-finish.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-altstore-shortcat-auto-menu.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-altstore-shortcat-auto-add.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-altstore-shortcat-auto-setting.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-altstore-shortcat-auto-choice.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-altstore-shortcat-auto-add-view.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-altstore-shortcat-start.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-altstore-shortcat-starting.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-altstore-shortcat-finish.png