---
title: 鸿蒙OS应用开发之——This device type does not match the module profile
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 840f0abd
date: 2020-12-18 15:24:29
---
## 一 现象

运行项目到设备时，会出现错误，信息如下

```
This device type does not match the module profile.
Error while Deploying HAP
```
<!--more-->
![][1]

## 二 原因

`config.json`中设备字段配置与设备不匹配(设备要求运行到phone(手机)上，实际运行到其他设备上)

```
"deviceType": [
      "phone"
 ],
```

## 三 解决办法

### 3.1 [deviceType可供选择类型][21]

| **属性名称** |               **含义**               | **数据类型** |  **是否可缺省**  |
| :----------: | :----------------------------------: | :----------: | :--------------: |
|   default    |    表示所有设备通用的应用配置信息    |     对象     |        否        |
|    phone     |     表示手机类设备的应用信息配置     |     对象     | 可缺省，缺省为空 |
|    tablet    |        表示平板的应用配置信息        |     对象     | 可缺省，缺省为空 |
|      tv      |     表示智慧屏特有的应用配置信息     |     对象     | 可缺省，缺省为空 |
|     car      |      表示车机特有的应用配置信息      |     对象     | 可缺省，缺省为空 |
|   wearable   |    表示智能穿戴特有的应用配置信息    |     对象     | 可缺省，缺省为空 |
| liteWearable | 表示轻量级智能穿戴特有的应用配置信息 |     对象     | 可缺省，缺省为空 |
| smartVision  |   表示智能摄像头特有的应用配置信息   |     对象     | 可缺省，缺省为空 |

### 2.2 修改或添加deviceType(适配手机和平板)

```
 "deviceType": [
      "phone","tablet"
 ],
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-deploying-hap-not-match.png

[21]:https://developer.harmonyos.com/cn/docs/documentation/doc-guides/basic-config-file-elements-0000000000034463#ZH-CN_TOPIC_0000001050708780__table29242051154512