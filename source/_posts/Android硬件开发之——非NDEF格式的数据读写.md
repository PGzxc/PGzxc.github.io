---
title: Android硬件开发之——非NDEF格式的数据读写
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 非NDEF格式的数据读写
abbrlink: 32fd0337
date: 2018-03-01 18:19:19
---
# 前言 
本文主要讲述读写非NDEF格式的数据，包含以下内容：  

- MifareUltralight数据格式
- 读写MifareUltralight数据
- 编写读写MifareUltralight格式数据的程序

<!--more-->

# 读写非NDEF格式的数据
## MifareUltralight数据格式
将NFC标签的存储区域分为16个页，每一个页可以存储4个字节，一个可存储64个字节（512位）。页码从0开始（0至15）。前4页（0至3）存储了NFC标签相关的信息（如NFC标签的序列号、控制位等）。从第5页开始存储实际的数据（4至15页）。

## 读写MifareUltralight数据
使用MifareUltralight.get方法获取MifareUltralight对象，然后调用MifareUltralight.connect方法进行连接，并使用MifareUltralight.writePage方法每次写入1页（4个字节）。也可以使用MifareUltralight.readPages方法每次连续读取4页。如果读取的页的序号超过15，则从头开始读。例如，从第15页（序号为14）开始读。readPages方法会读取14、15、0、1页的数据。

# 实例
参考代码： [NFCMifareUltralight][1]  
效果图：  
![][2]  



[1]: https://github.com/PGzxc/NFCMifareUltralight
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-mifareul-tralight.png

