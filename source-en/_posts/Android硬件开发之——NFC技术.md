---
title: Android硬件开发之——NFC技术
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - NFC技术
abbrlink: 4dc6e808
date: 2018-02-28 19:26:38
---
# 前言 
本文主要讲述Android中的NFC技术，分以下几个方面展开：  

- Android对NFC技术的支持
- NFC标签
- NDEF和非NDEF数据
- NFC的三重过滤机制
- 编写NFC程序的步骤  

<!--more-->  

# NFC技术 

## Android对NFC技术的支持
Android2.3.1（API Level ＝ 9）开始支持NFC技术，但Android2.x和Android3.x对NFC的支持非常有限。而从Android4.0（API Level ＝ 14）开始，Google开始向NFC发力，NFC技术在Android中得到了更进一步的支持。尤其是Android4.1，可以利用NFC技术传递较大的数据（NFC会利用蓝牙技术进行大数据量的传输）。  

## NFC标签
不同的NFC标签之间差异很大，有的非常简单，只支持简单的读写操作，有时还会采用支持一次性写入的芯片，将NFC标签设计成只读的（只能写一次数据，就像普通的刻录光盘一样）。当然，也存在一些复杂的NFC标签，例如，有一些NFC标签可以通过硬件加密的方式限制对某一区域的访问。还有一些更“酷”的NFC标签，这些标签自带操作环境，允许NFC设备与这些标签进行更复杂的交互。这些标签中的数据也会采用不同的格式。但Android SDK API主要支持NFC论坛标准（Forum Standard），这种标准被称为NDEF（NFC Data Exchange Format，NFC数据交换格式）。  

## NDEF数据的操作
Android SDK API支持如下3种NDEF数据的操作。

- 从NFC标签读取NDEF格式的数据
- 向NFC标签写入NDEF格式的数据
- 通过Android Beam技术将NDEF数据发送到另一部NFC设备 

## 非NDEF数据
对于某些特殊需求，NDEF格式可能无法满足我们的要求，这时就需要使用非NDEF数据格式。这些数据格式实际上就是普通的字节流，至于字节流中的数据代表什么，就由开发人员自己定义了。这种数据格式称为非NDEF数据。  

## NFC的三重过滤机制  
在一个NFC设备读取NFC标签或另一个NFC设备中的数据之前会在0.1秒之内建立NFC连接，然后数据会自动从被读取一端流向读取数据的一端（NFC设备一般需要触摸一下屏幕才开始传输）。数据接收端会根据具体的数据格式和标签类型调用相应的Activity（这种行为也称为Tag Dispatch）。这些Activity都需要定义Intent Filter。这些Intent Filter中就会指定不同的过滤机制，分为3个级别。因此，也称为NFC的三重过滤机制。 

- NDEF_DISCOVERED：只过滤固定格式的NDEF数据。例如，纯文本、指定协议（http、ftp、smb等）的URI等。
- TECH_DISCOVERED：当ACTION_NDEF_DISCOVERED指定的过滤机制无法匹配Tag时，就会使用这种过滤机制进行匹配。这种过滤机制并不是通过Tag中的数据格式进行匹配的，而是根据Tag支持的数据存储格式进行匹配。因此这种过滤机制的范围更广。
- TAG_DISCOVERED：如果将NFC的过滤机制看成是if… elseif…else语句的话，那么这种过滤机制就相当于else语句。前面两种过滤机制都失败后，系统就会利用这种过滤机制来处理。这种过滤机制用来处理未识别的Tag（数据格式不对，而且Tag支持的格式也不匹配）。

Android系统会依次匹配NDEF_DISCOVERED、TECH_DISCOVERED和TAG_DISCOVERED。如果通过三重过滤机制仍然无法匹配Tag，则什么都不做。通常在成功匹配Tag后，Android设备会发出比较清脆的声音，而未成功匹配Tag，就会发出比较沉闷的声音。

![][1]  

## 代码配置 

	<activity
     android:name=".TagTextActivity"
     android:label="显示纯文本NFC标签的内容"
     android:launchMode="singleTask" >
    	<intent-filter>
         	<!--  指定了NDEF_DISCOVERED  -->
         	<action android:name="android.nfc.action.NDEF_DISCOVERED" />
         	<category android:name="android.intent.category.DEFAULT" />
         	<!--  指定了纯文本格式  -->
         	<data android:mimeType="text/plain" />
     	</intent-filter>
	</activity>
 
## 开启NFC  
![][2]  
## 编写NFC程序的基本步骤

### 设置权限
	<uses-permission android:name="android.permission.NFC" />

### 限制Android版本

	<uses-sdk android:minSdkVersion="14"/>
### 限制安装的设备
	<uses-feature android:name="android.hardware.nfc" android:required="true" />
### 定义可接收Tag的Activity

### 处理业务逻辑
## 测试NFC程序需要的设备  
- 测试NFC程序需要的设备
- NFC标签或贴纸若干（可读写）




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-three-match.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nfc-open.png
  


  


