---
title: Taro开发之——编译运行到微信小程序(5)
categories:
  - 开发
  - F-跨平台
  - Taro
tags:
  - Taro
abbrlink: 312ceee6
date: 2025-06-26 11:58:57
---
## 一 概述

* 开发环境
* 默认程序效果
* 修改程序并运行

<!--more-->

## 二 开发环境

* 操作系统：Win 11 专业版 24H2
* 开发工具：VSCode、微信小程序工具
* Node: 22.16.0
* Yarn: 1.22.22

## 二 默认程序效果

### 2.1 终端执行如下指令

```
yarn dev:weapp
```

![][1]

### 2.2 编译完成后，dist目录下文件生成

![][2]

### 2.3 打开微信小程序工具导入dist目录查看效果

![][3]

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

![][4]

### 3.2 修改后效果(重新编译执行)

![][5]

## 四 参考

* [Taro官网文档——微信小程序](https://docs.taro.zone/docs/GETTING-STARTED#%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F)
* [微信小程序工具—下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-5-weapp-dev-build-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-5-weapp-dist-struct-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-5-weapp-tool-view-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-5-weapp-index-modify-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-5-weapp-modify-after-5.png