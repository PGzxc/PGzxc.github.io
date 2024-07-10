---
title: Android硬件开发之——NFC程序实战
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - NFC程序实战
abbrlink: 6e2d77e9
date: 2018-02-28 22:56:46
---
# 前言 
本文开始讲述NFC实战，本文包含以下几点：  

- NdefMessage和NdefRecord
- 向NFC标签写入数据的步骤
- 示例：自动启动Android应用程序
<!--more-->

# 理论 
## 用于描述NDEF格式数据的两个重要的类
 
- NdefMessage：描述NDEF格式的信息
- NdefRecord：描述NDEF信息的一个信息段

NdefMessage和NdefRecord是Android NFC技术的核心类，无论读写NDEF格式的NFC标签，还是通过Android Beam技术传递Ndef格式的数据，都需要这两个类。  

## 向NFC标签写入数据的步骤

### 获取Tag对象
	Tag tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
### 判断NFC标签的数据类型（通过Ndef.get方法）
	Ndef ndef = Ndef.get(tag);
### 写入数据
	ndef.writeNdefMessage(ndefMessage);
# 实例 
源码参考：     
[NFCSample][0]   
效果图：     
![][1]  
  



[0]: https://github.com/PGzxc/NFCSample
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-select-run.gif



