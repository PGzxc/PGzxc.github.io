---
title: Android开发之——Google Play上架流程
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Google Play上架
abbrlink: 6ca6ca47
date: 2024-05-29 11:02:32
---
## 一 准备材料

* VPN网络
* Google Play账号(Google邮箱)
* 1次性25美元(Vista)
* apk安装包
* 图片资源：app logo(512\*512)+4-5张预览图(1024\*500)

<!--more-->

## 二 开通Google Play账号(一次性25美元)

### 2.1 打开VPN，访问Google Play Console

网址：https://play.google.com/apps/publish/?hl=zh-CN

### 2.2 使用Google账号登录后，开始设置

![][1]

说明：

* 公司或机构选择`An Organization`
* 个人开发者选择`Youself`

### 2.3 创建账户注意事项

![][2]

说明：

* apple开发者每年99美元
* Google Play一次性25美元永久使用

### 2.4 填写开发者名称

![][3]

### 2.5 开发者支付信息

1-关联支付资料

![][4]

2-填写付款信息
![][5]

3-确认付款信息

![][6]

### 2.6 填写开发者资料

![][7]

### 2.7 关于你

![][8]

### 2.8 应用信息

![][9]

### 2.9 联系你

![][10]

### 2.10 条款

![][11]

### 2.11 添加信用卡并支付

![][12]

## 三 创建app

### 3.1 成功登录后，点击“在 Google play 中发布 android 应用 ”

![][13]

### 3.2 选择app的默认语言，填写app的名称，并点击创建

![][14]

## 四 填写 app 信息

在左侧导航栏选择“商品详情 ”

### 4.1 填写对 app 的介绍信息 --- 简短说明，完整说明等内容

![][15]

### 4.2 上传市场预览图

![][16]

说明：

* 在 “手机” 处上传手机屏幕截图，可以选择较能代表 app 功能的几处截图进行上传
* 在 “高分辨率图标” 处上传 app logo,尺寸要求为 512\*512 png或 jpeg 格式均可
* 在 “置顶大图” 处上传宣传图片，尺寸要求为 1024\*500 ，无alpha通道格式的图片，建
  议选择 jpeg格式

### 4.3 app 分类

![][17]

说明：

* “应用类型”选择“应用”
* “类别”选择“工具”
* “内容分级”需要在上传app安装包后填写，会在之间的步骤中进行介绍

### 4.4 联系信息

![][18]

说明：

* “网址”可以为官网，也可以为技术支持网址
* “电子邮件地址” 建议为可对外公开的邮件地址，此地址会在google play 对用户展示

### 4.5 隐私政策网址

必须填写对应的隐私政策地址，可以为官网地址，不填写会导致app无法上架

![][19]

### 4.6 增加语言翻译

如果app需要在不同国家区域上架，要增加不同语种的市场预览信息，可以在右上角点击“添
加翻译”，选择需要添加的语言，并对app信息进行相应对修改

![][20]

## 五 上传app安装包

在左侧导航栏选择“应用版本”

### 5.1 选择“管理正式版本”后，点击“上传APK”，请将 加固 完成后的 apk 包上传

![][21]

### 5.2 填写对app的功能介绍，请务必在引注处进行修改填写，填写完成后，点击保存

![][22]

## 六 内容分级

在左侧导航栏选择“内容分级”

### 6.1 填写接受“分级证书”的邮箱地址

### 6.2 选择“实用程序、高效工作”这一个类别的问卷

![][23]

### 6.3 如实填写内容分级问卷，填写完成后点击保存，并“判断分级”

![][24]

### 6.4 确定分级后，内容分级就完成了，并且在填写的邮件地址会收到一份分级证书

![][25]

## 七 定价及发布范围

在左侧导航栏选择“定价及发布范围”

![][26]

说明：

* 发布地区--更具体需要进行选择，可以选择全部上架
* 带 * 号的问题如实回答

## 八 发布应用

### 8.1 各项都完成后，点击右上架的“可以发布”,进入“管理版本”

![][1]

### 8.2 在正式版中，选择“修改版本”

![][27]

### 8.3 在最下方点击“查看”，浏览一下app信息

![][29]

### 8.4 正式发布

![][30]

正式发布后，Google play会对app进行自动审核，一般审核时间在1天左右，审核通过后会自动上架应用市场


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-atten-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-name-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-account-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-account-payinfo-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-account-ok-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-account-info-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-account-you-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-account-app-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-account-contack-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-term-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-pay-12.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-pub-13.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-pub-name-14.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-app-info-15.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-app-detail-16.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-app-category-17.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-app-contack-18.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-app-policy-19.png
[20]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-app-i18n-20.png
[21]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-upload-choice-21.png
[22]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-upload-info-22.png
[23]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-grade-test-23.png
[24]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-grade-result-24.png
[25]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-grade-cet-25.png
[26]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-price-26.png
[27]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-pub-git-27.png
[28]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-pub-modify-28.png
[29]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-pub-info-29.png
[30]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/gogleplay-developer-center-pub-release-30.png