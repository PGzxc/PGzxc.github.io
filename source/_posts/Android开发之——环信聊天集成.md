---
title: Android开发之——环信聊天集成
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 环信聊天
abbrlink: b980f3d6
date: 2017-12-28 13:09:30
---
# 前言
在这个信息爆炸的时代，好像应用内聊天(即时通信)也称为了每款app的必备，如何实现聊天功呢？ 
这里分为两种情况： 
 
- 自己搭建聊天系统
- 借助于第三方SDK

 
## 自己搭建聊天系统
- 可以利用openfire+spark
- openfire作为服务端，spark作为客户端
- 开发周期较长
- 免费开源

## 借助于第三方SDK

- 开发周期短
- 便于集成
- 可以定制
- 需要付费

综上所述：我们选择第二种，借助于第三方SDK,第三方SDK比较多，如环信、容联云，友盟等，这里我们选择环信。
<!--more-->

# 基于环信搭建聊天系统

## 注册用户
环信官网：[http://www.easemob.com/][1]
### 登录官网后，注册并登录即时通信云
![][2]
### 创建应用
![][3]
### 查看生成应用信息
![][4]
## 下载SDK  

### 下载SDK
环信SDK下载地址：[http://www.easemob.com/download/im][6]      
打开后如图所示，我们这里选择android SDK
![][5]
### 解压SDK 
解压后如图所示，其中ChatDemoUI3.0为完整版，包含全部的功能，easeui只包含部分功能(登录、聊天等)的demo，这里只做简单集成，我们选择easeui 
![][7]
### 打开easeui，选择easeui作为待引入module 
![][8]
## 集成环信
### 新建一个项目，并将easeui作为module导入
![][9]
![][10]
### 配置权限

	<uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.GET_TASKS" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.WRITE_SETTINGS" />

### 设置环信应用的AppKey
其中APPKEY换成生成应用的key值 
![][11]
### 其他设置
其他设置如百度地图API_KEY，友盟统计API_KEY等
![][12]
### 在Application中初始化SDK
![][13]
### 注册登录
#### 界面 
![][14]
#### 注册登录代码
对用户名和密码判空处理，为空提示并返回
![][15]
![][16]
### 登录后主界面 
#### 界面 
![][17]
#### 通过代码设置聊天记录，联系人，设置三个界面
![][18]

参考：   
[EaseDemo][19]


[1]: http://www.easemob.com/
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-login.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-new-app.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-key.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-sdk-download.png
[6]: http://www.easemob.com/download/im
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-jieya.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-easeui-lib.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-easeui-module.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/app-easeui-include.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-meta-value.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-umeng.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-sdk-init.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-regist-login.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-regist.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-code-login.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-main.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/huanxin-main-content.png
[19]: https://github.com/PGzxc/EaseDemo/tree/445d40e0da00330d66ddba067c7f06f66c650c50