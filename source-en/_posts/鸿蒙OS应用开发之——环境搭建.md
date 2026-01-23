---
title: 鸿蒙OS应用开发之——环境搭建
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 733d99a4
date: 2020-12-18 13:43:58
---
## 一 概述

作为鸿蒙OS应用开发的初学者，本篇介绍开发工具的安装与配置

* 准备工作
* 软件的下载与安装
* 配置开发环境
* 第一个程序(Hello World)

<!--more-->

## 二 准备

### 2.1 开发工具

* Java：编译构建依赖JDK(版本>=1.8)
* Node.js：应用于开发JS应用和运行预览器功能(版本>=12.0.0)

  ```
  C:\Users\Admin>java -version
  java version "1.8.0_73"
  Java(TM) SE Runtime Environment (build 1.8.0_73-b02)
  Java HotSpot(TM) 64-Bit Server VM (build 25.73-b02, mixed mode)
  
  C:\Users\Admin>node --version
  v12.18.3
  ```
### 2.2  模拟器

* 点击：Tools—>HVD Manager(若已登录过，跳转到设备选择界面；未登录，跳转登录界面)

  ![][00]
  
* 选择登录方式(若未注册的请先注册)

  ![][01]
  
* 扫码登录后，弹出界面，请确认

  ![][02]
  
* 登录成功后，在设备列表中，选择设备类型并启动

  ![][03]


## 三 软件的下载与安装


### 3.1 开发工具下载

#### [下载链接][21]，提供Windows和Mac下载
![][04]

### 3.2 软件安装

* 双加软件，打开安装向导

  ![][05]
  
* 安装过程中，提示安装SDK跳过，等配置阶段自定义安装

  ![][06]
  
* 依次点击：Tools—>SDK Manager—>Appearance&Behavior—>System Settings—>HarmonyOS SDK，选择SDK的位置进行安装

  ![][07]

## 四 配置开发环境

### 4.1 设置主题

File—Settings—>Appearance&Behavior—Apperance—>Theme设置主题

![][08]

### 4.2 配置编码格式

File—>Settings—>Editor—>File Encodings，设置编码格式为(UTF-8)

![][09]

### 4.3 配置SDK

Project Structure—>SDK Location，修改HarmonyOS SDK和Nodejs的位置
![][10]

### 4.4 配置SDK Platforms和SDK Tools

Apperance&Behavior—>System Settings—>HarmonyOS SDK，下载SDK Platforms和SDK Tools
![][11]

## 五 第一个程序(Hello World)

### 5.1 设备与模板

#### [设备说明(config.json/deviceType)][22]

| **属性名称** |               **含义**               | **数据类型** |  **是否可缺省**  |
| :----------: | :----------------------------------: | :----------: | :--------------: |
|   default    |    表示所有设备通用的应用配置信息    |     对象     |        否        |
|    phone     |     表示手机类设备的应用信息配置     |     对象     | 可缺省，缺省为空 |
|    tablet    |        表示平板的应用配置信息        |     对象     | 可缺省，缺省为空 |
|      tv      |     表示智慧屏特有的应用配置信息     |     对象     | 可缺省，缺省为空 |
|     car      |      表示车机特有的应用配置信息      |     对象     | 可缺省，缺省为空 |
|   wearable   |    表示智能穿戴特有的应用配置信息    |     对象     | 可缺省，缺省为空 |
| liteWearable | 表示轻量级智能穿戴特有的应用配置信息 |     对象     | 可缺省，缺省为空 |
| smartVision  |   表示智能摄像头特有的应用配置信息   |     对象     | 可缺省，缺省为空 |

#### 模板开发语言

|     设备      |   语言    |
| :-----------: | :-------: |
|     Phone     | Java、JS  |
|    Tablet     | Java、JS  |
|      Car      | Java、C++ |
|      TV       | Java、JS  |
|   Wearable    | Java、JS  |
| Lite Wearable |    JS     |
| Smart Version |    JS     |

### 5.2 第一个程序(Hello World)

* 打开DevEco Studio，依次点击：File—>New—>New Project，创建一个新项目

* 选择设备类型和模板

  ![][12]
  
* 配置项目信息

  ```
  Project Name：项目名称(不能包含中文，只能使用字母、数字和下划线)
  Package Name：项目包名
  Svae Location:代码保存位置
  Compatible API Version:兼容API版本
  ```

  ![][13]
  
* 点击如图所示按钮，将项目推送到手机上

  ![][14]
  
* 查看程序在手机上的显示

  ![][15]



[00]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-hvd-manager-start-tools.png
[01]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-tools-svd-login.png
[02]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-deveco-studio-login-allow.png
[03]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-virtual-devices-start.png
[04]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-appearance-theme-setting.png
[05]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-software-install-setup.png
[06]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-software-sdk-install-jump.png
[07]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-software-sdk-edit-install.png
[08]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-software-sdk-edit-install.png
[09]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-file-encodings-utf8.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-project-structure-sdk-node.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-sdk-sdktools.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-create-device-template-choice.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-create-configure-project.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-create-project-run-device.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-create-project-run-effect.png

[21]:https://developer.harmonyos.com/cn/develop/deveco-studio#download
[22]:https://developer.harmonyos.com/cn/docs/documentation/doc-guides/basic-config-file-elements-0000000000034463#ZH-CN_TOPIC_0000001050708780__table29242051154512