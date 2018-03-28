---
title: Android开发之——第三方集成支付宝
date: 2018-03-28 16:41:27
categories: [Android]
tags: [支付]
---
# 前言 
如果做产品不是为了盈利，那将毫无意义；因此，每款线上产品基本都剧本支付功能，作为开发人员如何快速接入一款第三方支付功能，便十分必要了。本文将详细介绍一下第三方支付宝的接入流程。   

<!--more-->  

# 支付宝接入 
## 界面介绍  
首页介绍几个页面，下面将会用到：  

- [创建应用界面][1]
	![][6]
	
- [支付集成文档界面][2]
	![][7]
	
- [SDK资源下载界面][3]
	![][8]

- [密钥工具下载界面][4]
	![][9]

- [沙箱环境调试界面][5]
	![][10]  

## 开通支付功能 
登录蚂蚁金服开发平台，按照要求填写个人信息(无障碍，此处省略)；  
## 创建应用
###  登录成功后，进入创建应用界面创建应用   
按照要求选择使用场景和名称  

![][11]  
###  完善信息

- 修改应用图标 
	![][12]
- 下载密匙工具，并生产签名密匙 
	![][13]
- 在接口加签方式中点击
![][14]
- 将生产的应用公匙拷贝到相应区域(可下载验证工具验证是否正确，本文省略)
	![][15]

- 确定无误后，提交审核
	![][16]  
- 等待审核通过 
	![][17]  
## 下载SDK
### 在界面介绍中的sdk下载界面，下载资源
如下图，包含三个文件夹：

- alipay_demo:as使用demo
- alipay_demo_eclpse：Eclipse使用demo
- alipay_sdk:只包含jar包等资源

![][18]
### 选择相应的目录导入到开发工具 
![][19]  
### 运行项目 
![][20]  
## 沙箱测试
未上线前可在沙箱环境下调试  
### 下载沙箱app
![][21]  
### 测试沙箱账号 
- 查看沙箱账号
	![][22] 
- 用沙箱账号登录(查看测试余额)   
	![][23]
## 集成测试 
### 将app中的信息替换为沙箱中的信息
![][24] 
### 查看订单信息(如订单金额)
![][25]
### 发起支付(用沙箱账号登录)
![][26] 
### 查看支付结果 
![][27]  



[1]: https://openhome.alipay.com/platform/appManage.htm
[2]: https://docs.open.alipay.com/204/105296/#s0
[3]: https://docs.open.alipay.com/54/cyz7do/
[4]: https://docs.open.alipay.com/291/106097/
[5]: https://openhome.alipay.com/platform/appDaily.htm?tab=info
[6]: http://p6alo7dgd.bkt.clouddn.com/alibaba-guide-app.png
[7]: http://p6alo7dgd.bkt.clouddn.com/alibaba-guide-document.png
[8]: http://p6alo7dgd.bkt.clouddn.com/alibaba-guide-sdk-download.png
[9]: http://p6alo7dgd.bkt.clouddn.com/alibaba-guide-sign-download.png
[10]: http://p6alo7dgd.bkt.clouddn.com/alibaba-guide-saxiang.png
[11]: http://p6alo7dgd.bkt.clouddn.com/app-create.png
[12]: http://p6alo7dgd.bkt.clouddn.com/aliba-modify-icon.png
[13]: http://p6alo7dgd.bkt.clouddn.com/aliba-app-sign-create.png
[14]: http://p6alo7dgd.bkt.clouddn.com/aliba-app-create-sign-public.png
[15]: http://p6alo7dgd.bkt.clouddn.com/aliba-app-copy-sign.png
[16]: http://p6alo7dgd.bkt.clouddn.com/aliba-app-commit.png
[17]: http://p6alo7dgd.bkt.clouddn.com/aliba-shenhe.png
[18]: http://p6alo7dgd.bkt.clouddn.com/aliba-app-sdk-download.png
[19]: http://p6alo7dgd.bkt.clouddn.com/aliba-app-as.png
[20]: http://p6alo7dgd.bkt.clouddn.com/aliba-normal-run.png
[21]: http://p6alo7dgd.bkt.clouddn.com/aliba-shaxiang-app.png
[22]: http://p6alo7dgd.bkt.clouddn.com/aliba-shaxiang-user.png
[23]: http://p6alo7dgd.bkt.clouddn.com/aliba-shaxiang-money.png
[24]: http://p6alo7dgd.bkt.clouddn.com/aliba-shaxiang-envutils.png
[25]: http://p6alo7dgd.bkt.clouddn.com/aliba-shaxiang-order.png
[26]: http://p6alo7dgd.bkt.clouddn.com/aliba-shaxiang-pay.png
[27]: http://p6alo7dgd.bkt.clouddn.com/aliba-shaxiang-suc.png