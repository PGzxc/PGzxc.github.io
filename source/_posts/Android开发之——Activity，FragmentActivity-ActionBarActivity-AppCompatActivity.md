---
title: 'Android开发之——Activity，FragmentActivity, ActionBarActivity, AppCompatActivity'
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Activity
abbrlink: 23d25721
date: 2017-12-06 02:31:19
---
## 一 概述

stack overflow上看到一篇关于Activity，FragmentActivity，ActionBarActivity和AppCompatActivity使用问题的讨论 
[![issue][1]][2]  
搜索国内的论坛和博客，发现这个问题依然存在，特别是一些新手，容易混淆或不太明白区别，新建界面时该使用哪个Activity呢？

<!--more-->
## 二 Activity  
![Activity][3] 
- Activity是API1引入的
- 第一个与用户交互的Activity
- Activity是基准，后面所有都是由此派生出的
- 无所谓过时   

## 三 FragmentActivity  
![FragmentActivity][4]
- FragmentActivity是Android3.0引入的
- 为了低版本兼容Fragment引入的
- 位于support-v4包内

## 四 ActionBarActivity
![ActionBarActivity][5]  
- 继承FragmentActivity
- 为了低版本支持ActionBar提供兼容包
- 位于support-v7包内
- 已过时，被AppcompatActivity取代

## 五 AppCompatActivity  
![][6]
- 继承FragmentActivity
- 为低版本兼容actionbar，fragment，MD设计等
- 位于support-v7包内


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-activity-isue.png
[2]: https://stackoverflow.com/questions/31297246/activity-appcompatactivity-fragmentactivity-and-actionbaractivity-when-to-us#
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-Activity.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-FragmentActivity.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-ActionBarActivity.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-AppCompatActivity.png