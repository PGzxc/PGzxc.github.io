---
title: Android开发之——Firebase Analytics Android端集成
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Firebase
abbrlink: ef126855
date: 2024-07-21 09:38:47
---
## 一  概述

Google Analytics(分析)会收集您的应用的使用情况和行为数据。SDK 会记录两种主要类型的信息：

- **事件**：您的应用中发生了什么，例如用户操作、系统事件或错误。
- **用户属性**：您为描述自己的各个细分用户群而定义的特性，例如语言首选项或地理位置

<!--more-->

## 二  接入流程

### 2.1 平台创建项目

1-打开Firebase平台

网址：https://console.firebase.google.com/

![][1]

2-点击创建项目，填写项目名称

![][2]

3-设置Google Analytics

![][3]

4-配置Account账号

![][4]

5-初始化完成后，点击继续

![][5]

### 2.2 项目集成

1-选择集成平台

![][6]

2-注册应用

![][7]

3-注册应用后，下载google-services.json后添加到app目录下

![][8]

4-添加Firebase SDK依赖

![][9]

5-等待代码集成(可参考Firebase应用示例)

![][10]

### 2.3 代码集成

1-代码集成示例代码

项目地址：https://github.com/firebase/quickstart-android/blob/master/analytics/

![][11]

说明：

* 官方提供了java和kotlin示例代码两种，选择其一即可
* EntryChoiceActivity.kt为入口文件，自己集成不需要，选择java或kotlin下的MainActivity

2-Firebase实例化

![][12]

3-记录事件

![][13]

4-记录属性

![][14]

## 三 查看Analytics

1-Web端视图

![][15]

2-移动端视图

![][16]

## 四 参考

* [Firebase示例项目](https://firebase.google.com/docs/samples)
* [Firebase文档](https://firebase.google.cn/docs/analytics?hl=zh-cn)
* [quickstart-android](https://github.com/firebase/quickstart-android)





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-website-home-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-website-create-project-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-website-project-analytics-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-website-project-account-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-website-project-init-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-config-choice-platform-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-config-regist-app-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-config-download-service-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-config-sdk-add-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-config-sdk-after-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-code-app-site-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-code-app-instance-12.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-code-app-event-13.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-code-app-property-14.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-analytics-chat-15.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/firebase-analytics-chat-app-16.png