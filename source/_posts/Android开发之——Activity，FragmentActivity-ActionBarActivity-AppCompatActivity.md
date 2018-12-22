---
title: Android开发之——Activity，FragmentActivity, ActionBarActivity, AppCompatActivity
date: 2017-12-06 02:31:19
categories: [开发,移动开发,Android,基础]
tags: [Activity]
---
stack overflow上看到一篇关于Activity，FragmentActivity，ActionBarActivity和AppCompatActivity使用问题的讨论     

[![issue][1]][2]  
<!--more-->
搜索国内的论坛和博客，发现这个问题依然存在，特别是一些新手，容易混淆或不太明白区别，新建界面时该使用哪个Activity呢？

# Activity  
![Activity][3]    

- Activity是API1引入的
- 第一个与用户交互的Activity
- Activity是基准，后面所有都是由此派生出的
- 无所谓过时   

# FragmentActivity  
![FragmentActivity][4]

- FragmentActivity是Android3.0引入的
- 为了低版本兼容Fragment引入的
- 位于support-v4包内

# ActionBarActivity
![ActionBarActivity][5]  

- 继承FragmentActivity
- 为了低版本支持ActionBar提供兼容包
- 位于support-v7包内
- 已过时，被AppcompatActivity取代

# AppCompatActivity  
![][6]

- 继承FragmentActivity
- 为低版本兼容actionbar，fragment,MD设计等
- 位于support-v7包内





[1]: http://bolo-imgs.pgzxc.com/android-activity-isue.png
[2]: https://stackoverflow.com/questions/31297246/activity-appcompatactivity-fragmentactivity-and-actionbaractivity-when-to-us#  
[3]: http://bolo-imgs.pgzxc.com/android-Activity.png
[4]: http://bolo-imgs.pgzxc.com/android-FragmentActivity.png
[5]: http://bolo-imgs.pgzxc.com/android-ActionBarActivity.png
[6]: http://bolo-imgs.pgzxc.com/android-AppCompatActivity.png