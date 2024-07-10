---
title: 鸿蒙OS应用开发之——将SVG文件转换为XML文件
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: '488e8442'
date: 2021-01-04 14:06:17
---
## 一 概述

在Java UI框架中，给Button组件设置了左侧显示图标时，使用了如下的属性：

```
ohos:element_left="$graphic:ic_btn_reload"
```
![][1]

就是将SVG文件转换为XML文件后设置的

<!--more-->

## 二 SVG图片来源

### 2.1 来源地址

[iconfont](https://www.iconfont.cn/search/index?searchType=icon&q=reload)：https://www.iconfont.cn/search/index?searchType=icon&q=reload

### 2.2 下载选择SVG
![][2]

## 三 SVG文件转换为XML文件

* 选中应用模块，点击鼠标右键，选择**New>Svg To Xml**
  ![][3]

* 选择需要转换的svg文件，并命名，点击**OK**按钮开始转换

  ![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-btn-svg-xml-sample.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-icon-reload-svg-download.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-new-svg-to-xml.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-svg-xml-convert.png