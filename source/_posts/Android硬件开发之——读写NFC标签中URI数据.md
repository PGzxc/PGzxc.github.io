---
title: Android硬件开发之——读写NFC标签中URI数据
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 读写NFC标签中URI数据
abbrlink: 1323c684
date: 2018-03-01 17:28:58
---
# 前言 
本文主要讲述NFC技术：NDEF Uri格式解析，包含以下内容：  

- NFC技术：NDEF Uri格式解析
- 编写可以解析Uri格式数据的类

<!--more-->  

# 读写NFC标签中URI数据
## NDEF Uri格式规范  
与NDEF文本格式一样，存储在NFC标签中的Uri也有一定的格式

	http://www.nfc-forum.org/specs/spec_dashboard

![][1]  
# 实例 
源码参考：[NFCReadWriteUri][2]   
效果图  
![][3]     
![][4]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-uri-state.png
[2]: https://github.com/PGzxc/NFCReadWriteUri
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-read-write-uri.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-uri-read.png