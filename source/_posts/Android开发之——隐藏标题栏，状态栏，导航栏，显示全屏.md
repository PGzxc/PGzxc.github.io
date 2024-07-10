---
title: Android开发之——隐藏标题栏，状态栏，导航栏，显示全屏
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 全屏
abbrlink: bb65b05d
date: 2017-12-06 12:10:00
---
## 一 概述
如下图：我们分别对标题栏，状态栏和导航栏进行隐藏操作
![][0]

<!--more-->

## 二 隐藏标题栏
### 2.1 通过代码隐藏当前Activity标题栏

在当前Activity中调用：this.requestWindowFeature(Window.FEATURE_NO_TITLE);
![activity][1]
效果 
![效果][2]

### 2.2 通过代码隐藏AppCompatActivity标题栏
通过getSupportActionBar().hide()隐藏
![][3]
效果
![][4]

### 2.3 通过style隐藏标题栏
配置style文件  
![][5]
效果(activity与AppCompatActivity通用)
![][6]

## 三 通过代码隐藏状态栏
代码设置   
![][7]
效果  
![][8]
## 四 隐藏Navigator导航条

设置  
![][9]
效果  
![][10]

参考：   
[Demo][11]


[0]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hidden-pic-state.png
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hidden_activity.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hidden_activity_result.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hidden_appcompat.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hidden_appcompat_result.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hidden_title_style.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hidden_title_style_result.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hidden_actionbar.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hidden_actionbar_result.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hidden_navigator.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hidden_navigator_result.png
[11]: https://github.com/PGzxc/TitleHidden