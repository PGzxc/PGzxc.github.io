---
title: Taro开发之——编译运行到支付宝小程序(7)
categories:
  - 开发
  - F-跨平台
  - Taro
tags:
  - Taro
abbrlink: 60ee41e9
date: 2025-06-28 09:20:39
---
## 一 概述

* 开发环境
* 默认程序效果
* 修改程序并运行

<!--more-->

## 二 开发环境

* 操作系统：Win 11 专业版 24H2
* 开发工具：VSCode、支付宝小程序工具
* Node: 22.16.0
* Yarn: 1.22.22

## 二 默认程序效果

### 2.1 终端执行如下指令

```
yarn dev:alipay
```

![][1]

### 2.2 编译完成后，dist目录下文件生成

### 2.3 打开支付宝小程序工具导入dist目录查看效果

1、百度小程序打开后界面如下图

![][2]

2、选择右上角的打开项目，选择dist文件夹

![][3]

3、导入后， 默认界面如下图

![][4]

## 三 修改程序并运行

### 3.1 pages/index/index.tsx文件修改内容

```
const items = ['Item 1', 'Item 2', 'Item 3','Item 4','Item 5']; //添加数据项
//添加显示列表
{ 
    items.map((item, index) => {
        return <View key={index}>{item}</View>
     })
  }
```

![][5]

### 3.2 修改后效果(重新编译执行)

![][6]

## 四 参考

* [Taro官网文档——支付宝小程序](https://docs.taro.zone/docs/GETTING-STARTED#%E6%94%AF%E4%BB%98%E5%AE%9D%E5%B0%8F%E7%A8%8B%E5%BA%8F)
* [支付宝小程序工具—下载地址](https://opendocs.alipay.com/mini/ide/download)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-7-alipay-build-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-7-alipay-open-view-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-7-alipay-import-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-7-alipay-open-preview-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-7-swan-index-modify-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-7-alipay-modify-after-6.png