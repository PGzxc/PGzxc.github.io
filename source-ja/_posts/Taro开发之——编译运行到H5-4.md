---
title: Taro开发之——编译运行到H5(4)
categories:
  - 开发
  - F-跨平台
  - Taro
tags:
  - Taro
abbrlink: 4d8cbcb
date: 2025-06-25 08:46:46
---
## 一 概述

* 默认程序效果
* 修改程序并运行

<!--more-->

## 二 默认程序效果

### 2.1 终端执行如下指令

```
yarn dev:h5
```

![][1]

### 2.2 编译完成后，自动跳转网页预览效果

```
http://192.168.8.28:10086/#/pages/index/index
```

![][2]

## 三 修改程序并运行

### 3.1 修改内容

```
const items = ['Item 1', 'Item 2', 'Item 3','Item 4','Item 5']; //添加数据项
//添加显示列表
{ 
    items.map((item, index) => {
        return <View key={index}>{item}</View>
     })
  }
```

![][3]

### 3.2 修改后效果

![][4]

## 六 参考

* [Taro官网文档——H5](https://docs.taro.zone/docs/GETTING-STARTED#h5)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-4-h5-dev-build-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-4-h5-view-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-4-h5-modify-8.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-4-h5-modify-after-9.png