---
title: Android硬件开发之——使用Android Beam传输文件(2)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android Beam传输文件
abbrlink: 28c44e18
date: 2018-03-01 22:03:44
---
# 前言 
上文已经讲了使用Android Beam传输文件，本文作为补充，包含以下内容： 

- 传输文件的AP
- 实例 

<!--more-->

# Android Beam
## 传输文件的API  
从Android4.1开始，NfcAdapter类增加了如下两个推送数据的方法。

- NfcAdapter.setBeamPushUris
- NfcAdapter.setBeamPushUrisCallback

这两个方法的原型如下：  

- public void setBeamPushUris(Uri[] uris, Activity activity);
- public void setBeamPushUrisCallback(CreateBeamUrisCallback callback, Activity activity);

## 实例 
参考代码： [NFCFile][1]   
效果图：  
![][2] 



[1]: https://github.com/PGzxc/NFCFile
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-file.png