---
title: Android开发之——第三方集成微信支付
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 微信支付
abbrlink: 273a2bef
date: 2018-03-29 14:58:35
---
# 前言 
上文介绍了支付宝集成的步骤，本文将继续介绍第三方支付——微信的集成

<!--more-->  

# 微信集成 
## 先看几个界面  
- [认证界面][1] 
	
	![][2]  

- [资源下载界面][3]
	
	![][4]  
- [接口参数界面][5]
	
	![][6]
- [接入文档界面][7]  
	
	![][8]  

## 接入说明 
### 完成认证  
app接入支付功能，必须先要完成认证，本文因为是个人账号，此处省略 
### 下载所需要的资源
在资源下载界面，下载对应的资源，本文以android支付为例讲解，  
解压后为Eclipse项目，libs下有2个jar包，删除其中一个(一个是测试环境，一个正式环境)(最后提供as版本)    
![][9]
### 查看接口文档 
接口文档包含了：支付，查询订单，申请退款等众多接口和参数，本文只以支付为例说明     
![][10]  
### 按照文档，集成app
参考文档配置权限，添加AndroidManifest参数，并调用如下支付    
![][11]

## 查看结果 
因本例没有认证和修改其他参数，无法完成支付。

![][12] 
# 其他  
参考：[Github下载][13]


[1]: https://open.weixin.qq.com/cgi-bin/verifyprofile?t=setting/verify&lang=zh_CN&token=184658bcad355ddba7ab82987f2cdcfa87be7aa9
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weichat-recog.png
[3]: https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=11_1
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weichat-sdk-download.png
[5]: https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_12&index=2
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weichat-para.png
[7]: https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=8_5#
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weichat-android-doc.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weichat-eclise.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weichat-pay-para.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weichat-pay-doc.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/weichat-pay-result.gif
[13]: https://github.com/PGzxc/weichatPay
