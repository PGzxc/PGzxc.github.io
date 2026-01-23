---
title: Android开发之——复制提示窗口里的内容
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 复制
abbrlink: 8c752d23
date: 2019-08-27 20:39:17
---
## 一 前言
Android Studio中的代码出现错误时，会被红线标记，把鼠标放到红线上会显示出错原因，鼠标放上的同时，按下Control+F1，会展开错误的详细信息。但是使用Control+C复制错误内容时，可能出现无法复制的情况。   

本文将讲述此种情况下如何复制错误提示内容：代码错误和布局错误。  
<!--more-->

## 二 现象
如下图：代码中出现版本兼容或参数不匹配时，把鼠标放到出错处，会出现如图所示的提示信息，但是鼠标选中，使用Control+C却复制不下来
![][1]

## 二 复制错误提示

### 2.1 代码文件复制错误提示

* 在代码中出现了错误异常  
	![][2]
* 将鼠标放到出错代码处，下方显示与之对应的文字  
	![][3]
* 在下方状态栏上，鼠标右键出现copy，点击copy将文字复制
	![][4]

### 2.2 布局文件复制错误提示

* 布局中出现了异常信息
	![][5]
* 将布局文件切换到Design模式下
	![][6]
* 点击Design模式下左侧的错误位置处，右侧显示布局中的错误位置
	![][7]
* 点击上步中的错误位置，下方显示错误详情(这里可以使用copy+c复制了)
	![][8]




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-copy-error-info.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-copy-error-code-show.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-copy-error-code.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-copy-error-code-copy.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-copy-error-layout-show.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-copy-error-layout-design-model.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-copy-error-layout-design-model-more.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-copy-error-layout-design-model-detail.png