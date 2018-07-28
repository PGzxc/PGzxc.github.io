---
title: Android开发之——银联支付初探
date: 2018-05-23 10:43:13
categories: [开发,移动开发,Android,支付]
tags: [银联支付]
---
# 前言
现在网上支付用的比较多的是微信支付，支付宝支付和银联支付。关于微信和支付宝支付前面已经讲过了，本文主要介绍关于银联支付集成的过程和步骤。

<!--more-->

# 银联支付
## 资源查找
### [集成文档][1]
点击上面的集成文档，打开如下图所示连接，上面有集成前的准备和集成接口介绍和集成步骤   
![集成文档][2]
## [SDK&Demo下载][3]
打开上面的链接，打开SDK资源的下载页面，下载所需的资源
![][4]
下载后解压，如下图所示:  
![][5] 

## 集成步骤
银联支付提供的demo为Eclipse(目前大部分开发者使用的为android studio)，不过这并不影响使用，下面我们将使用Eclipse调用支付功能。   

### 打开app开发包
解压后的内容包含：     

1. 移动端支付——app开发包 
2. 后端集成——后台开发包
3. 其他——一些文档和技术规范等  


我们所使用的为移动端支付，打开后如下图，接入指南和开发包     
![][6]  

### 将开发包导入Eclipse
按照开发文档，将jar包和其他资源按照如下图所示，放到相应位置  
![][7]  

### 将项目运行到手机中
![][8]  

### 发起支付
本文使用集成文档中提供的账号发起支付功能
![][9]


[1]: https://open.unionpay.com/ajweb/product/newProDetail?proId=3&cataId=30
[2]: http://p95ubv5wt.bkt.gdipper.com/yinlian-doc.png
[3]: https://open.unionpay.com/ajweb/help/file/toDetailPage?id=633
[4]: http://p95ubv5wt.bkt.gdipper.com/yinlian-sdk.png
[5]: http://p95ubv5wt.bkt.gdipper.com/yinlian-sdk-jieya.png
[6]: http://p95ubv5wt.bkt.gdipper.com/yinlian-app.png
[7]: http://p95ubv5wt.bkt.gdipper.com/yinlian-app-eclipses.png
[8]: http://p95ubv5wt.bkt.gdipper.com/yinlian-app-run.png
[9]: http://p95ubv5wt.bkt.gdipper.com/yinlian-pay.gif