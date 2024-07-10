---
title: Android硬件开发之——使用Android Beam传输文本
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android Beam传输文本
abbrlink: 286c2d39
date: 2018-03-01 21:46:16
---
# 前言 
本文主要讲述使用Android Beam传输文本，内容包含： 

- Android Beam的基本理念
- Android Beam API
- 实例

<!--more-->

# Android Beam 
## Android Beam的基本理念
Android Beam的基本理念就是两部（只能是两部）NFC设备靠近时（一般是背靠背），通过触摸一部NFC设备的屏幕，将数据推向另外一部NFC设备。在传递数据的过程中，两部NFC设备不能离得太远，否则NFC连接将中断。
  
## Android Beam API
Android SDK提供了如下两个用于传递消息的方法。

- NfcAdapter.setNdefPushMessage
- NfcAdapter.setNdefPushMessageCallback
- public void setNdefPushMessage(NdefMessage message, Activity activity, Activity ... activities);
- public void setNdefPushMessageCallback(CreateNdefMessageCallback callback, Activity activity, Activity ... activities);
- public NdefMessage createNdefMessage(NfcEvent event)


##  实例  
项目源码：[NFCBeam][1]   
效果图：   
![][2]  
![][3]  
![][4]  



[1]: https://github.com/PGzxc/NFCBeam
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-beam.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-beam-words.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-beam-calc.png



 
