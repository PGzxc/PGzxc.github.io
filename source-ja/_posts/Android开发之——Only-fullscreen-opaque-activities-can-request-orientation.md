---
title: Android开发之——Only fullscreen opaque activities can request orientation
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Error
abbrlink: 811b5cca
date: 2017-12-25 12:48:44
---
## 一 问题   
给activity启动页设置orientation后出现了如下错误：  
![orientation][1]
<!--more-->
## 二 定位错误
从错误信息中可以看出原因：Only fullscreen opaque activities can request orientation(只有全屏不透明的activity可以设置orientation)  
## 三 解决  
由错误原因可知，有两种解决方案：

### 3.1 去掉activity中的orientation属性
![resove-1][2]
### 3.2 activity的style中Translucent设置为false
![resove-2][3]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/orientation-error.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/orientation-solve-1.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/orientation-solve-2.png