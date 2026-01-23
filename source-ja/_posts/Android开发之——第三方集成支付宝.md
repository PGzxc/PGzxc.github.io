---
title: Android开发之——第三方集成支付宝
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 支付宝
abbrlink: '6208187'
date: 2018-03-28 16:41:27
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
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/alibaba-guide-app.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/alibaba-guide-document.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/alibaba-guide-sdk-download.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/alibaba-guide-sign-download.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/alibaba-guide-saxiang.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/app-alibaba-create.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-modify-icon.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-app-sign-create.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-app-create-sign-public.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-app-copy-sign.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-app-commit.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-shenhe.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-app-sdk-download.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-app-as.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-normal-run.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-shaxiang-app.png
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-shaxiang-user.png
[23]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-shaxiang-money.png
[24]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-shaxiang-envutils.png
[25]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-shaxiang-order.png
[26]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-shaxiang-pay.png
[27]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/aliba-shaxiang-suc.png