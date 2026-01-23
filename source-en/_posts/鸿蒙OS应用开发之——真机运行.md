---
title: 鸿蒙OS应用开发之——真机运行
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 75f0fe55
date: 2021-09-17 17:34:37
---
## 一 真机直接运行结果

通过DevEco新建项目运行时出现了如下错误

|                  Run\entry                  |                        Run\Event Log                         |
| :-----------------------------------------: | :----------------------------------------------------------: |
| Failure[INSTALL_FAILED_NO_BUNDLE_SIGNATURE] | Failure[INSTALL_FAILED_NO_BUNDLE_SIGNATURE]<br/>			Sign the app before running it on a real device.<br/>			the instructions to configure the signature information. |
![][1]

<!--more-->

## 二 真机运行条件及流程

### 2.1 真机运行条件

| 编号 |      条件      |   备注   |
| :--: | :------------: | :------: |
|  1   |  鸿蒙真机设备  |   硬件   |
|  2   | 鸿蒙开发者账号 | 实名认证 |

### 2.2 真机运行流程(默认已注册开发者账号)

| 编号 |                        流程                         |      备注      |
| :--: | :-------------------------------------------------: | :------------: |
|  1   |                  DevEco：创建项目                   | DevEco开发工具 |
|  2   |     DevEco：生成秘钥(.p12)和证书请求文件(.csr)      | DevEco开发工具 |
|  3   |     AppGallery-我的项目：本地应用与鸿蒙应用绑定     |      网站      |
|  4   | AppGallery-用户及访问：上传.csr及下载数字证书(.cer) |      网站      |
|  5   |     AppGallery-我的项目：下载Profile文件(.p7b)      |      网站      |
|  6   |         DevEco：配置Project/Signing Configs         | DevEco开发工具 |

## 三 真机运行流程

### 3.1 创建项目

* 依次点击：File——>new Project，在打开的选项框中配置项目
  ![][2]

### 3.2 使用DevEco Studio生成密钥和证书请求文件

1. 在主菜单栏点击**Build > Generate Key** **and CSR**

2. 在**Key Store File**中，可以点击**Choose Existing**选择已有的密钥库文件；如果没有密钥库文件，点击**New**进行创建

   ```
   key Store File:hm.p12
   Password:hm123456
   ```
   ![][3]
* 配置Key下的其他选项

  ```
  Alias:hm
  ```
  ![][4]
* 选择p12和csr生成位置
  ![][5]
* 点击Finish后，可以在存储路径下获取生成的密钥库文件（.p12）和证书请求文件（.csr）
  ![][6]
  
### 3.3  AppGallery-我的项目：本地应用与鸿蒙应用绑定

1. 登录[AppGallery Connect网站](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，使用华为账号登录
   ![][7]
* 登录完成后，有几个选项(会在几个选项间切换)
  ![][8]
* 创建项目：点击"我的项目"——>添加项目——>输入项目名称
  ![][9]
* 添加应用(本地项目与AppGallery Connect项目绑定)
  ![][10]
* 填写添加应用配置
  ![][11]

### 3.4 AppGallery-用户及访问：上传.csr及下载数字证书(.cer)

* AppGallery Connect下，切换到用户与访问选项
  ![][12]
* 点击设备管理，查看当前连接的设备
  ![][13]
* 点击证书管理(上传.csr及下载.cer)
  ![][14]
* 上传完成后，点击右侧的下载按钮，下载对应的证书(.cert)
  ![][15]
  
### 3.5 AppGallery-我的项目：下载Profile文件(.p7b)

* AppGallery Connect下，切换到我的项目/应用，拉倒底部，找到HAP Provision Profile
  ![][16]
* 点击添加，在弹出的对话框中填写HAP Provision Profile信息
  ![][17]
* 配置完成后，点击下载，下载.p7b文件
  ![][18]
  
### 3.6 DevEco：配置Project/Signing Configs

* DevEco开发工具，依次点击：File——>Project Struct，打开Project Struct对话框
* 切换到Signing Configs工具栏下的Debug选项卡，填写签名信息

  | 编号 |     标签项     |        取值        |
  | :--: | :------------: | :----------------: |
  |  1   |   Store File   |      .p12文件      |
  |  2   | Store Password |      hm123456      |
  |  3   |   Key Alias    |         hm         |
  |  4   |    Sign Alg    | 自动生成，无需配置 |
  |  5   |  Profile File  |        .p7b        |
  |  6   | Certpath File  |       .cert        |

  ![][19]

* 将项目运行到真机上，效果如下
  ![][20]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-debug-install-failure-eventlog.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-congigure-project.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-generate-key-csr-new.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-generate-key-csr-kyes.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-generate-p12-csr.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-folder-generate-p12-csr.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-login.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-appgallery-connect-login.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-myproject-project-name.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-project-add-application.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-app-config.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-appgallery-user-vister.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-user-device-manager.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-add-cert.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-cert-download.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-hap-provision.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-hap-profile-config.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-profile-p7b-download.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-devtool-signing-configs.png
[20]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-run-device-preview.png