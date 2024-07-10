---
title: Android硬件开发之——NDEF文本格式解析
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - NDEF文本格式解析
abbrlink: '9e253423'
date: 2018-03-01 13:58:13
---
# 前言
本文主要讲述NFC文本格式解析，主要包括以下几个方面：  

- NDEF文本格式规范
- NDEF文本数据格式
- 状态字节编码格式
- 判断数据是否为NDEF格式
- 编写解析NDEF格式数据的类

<!--more-->

# NFC文本格式解析
## 编写解析NDEF格式数据的类
不管什么格式的数据本质上都是由一些字节组成的。对于NDEF文本格式来说。这些数据的第1个字节描述了数据的状态，然后若干个字节描述文本的语言编码，最后剩余字节表示文本数据。这些数据格式由NFC Forum的相关规范定义，可以从下面的地址下载相关的规范。

	http://www.nfc-forum.org/specs/spec_dashboard

## NDEF文本数据格式
![][1]  
## 状态字节编码格式
![][2] 
## 判断数据是否为NDEF格式
获取NFC标签中的数据要通过NdefRecord.getPayload方法完成。当然，在处理这些数据之前，最好判断一下NdefRecord对象中存储的是不是NDEF文本格式数据。
判断的标准有如下两个

- TNF（类型名格式，Type Name Format）必须是NdefRecord.TNF_WELL_KNOWN。
- 可变的长度类型必须是NdefRecord.RTD_TEXT。

# 实例 

参考代码： [NFCReadWriteText][3]  
效果图：  
![][4]




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-text-formate.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-state-formate.png
[3]: https://github.com/PGzxc/NFCReadWriteText
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-read-write.png
