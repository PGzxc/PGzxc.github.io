---
title: Android面试之——关于Activity的那些事1
categories:
  - 面试相关
  - Android面试题
tags:
  - Activity
abbrlink: 2d4a6e06
date: 2017-11-14 16:41:25
---
## 一 前言

Activity作为四大组件之一，在软件开发中占据着非常重要的地位，也是面试中必问的知识点和考点，作为开发者，Activity相关知识点你都掌握了吗？

这篇文章简单介绍面试当中Activity会被问到的知识点，当然这只是为了应付面试，重要的是掌握这一组件，这将对你的开发大有裨益。

作为四大组件之一，首先介绍下什么是Activity?
<!--more-->
它是Android与用户交互的接口，它提供了一个界面，接受用户进行各种点击，输入，滑动操作，这就是Activity的意思。

本文将通过以下三方面张开

- Activity的四种状态
- Activity的生命周期分析
- Android进程优先级

## 二 Activity三方面
###  2.1 Activity四种状态

Activity分为四种状态：running运行状态，paused暂停状态，stoped停止状态，killed销毁状态
![Activity四种状态][1]

- running： 运行状态下，Activity可见且活跃；可接受用户操作，作出相应相应；当前Activity处于栈顶  
- paused：暂停状态下，当Activity被一个全屏的Activity覆盖或者一个透明的Activity覆盖时，Activity将由running变为paused状态；此时Activity由可见逐渐变为不可见；Activity即将失去焦点；可见当不能与用户交互；Activity中的内存信息，成员变量依然存在；当内用紧张时此时的Activiy会被回收；
- stoped： paused的下一个状态就是stoped停止状态，此时Activity被另外一个Activity完全覆盖；此时Activity处于不可见状态；内存信息，变量信息依然存在；内存紧张时随时会被回收；
- killed：与ondestory相对应，是Activity生命周期的最后一个方法；执行后Activity被系统回收；内存信息，变量信息都不复存在；


### 2.2  Activity生命周期分析

 先看一张官方给出的Activity完整生命周期图
![Activity生命周期图][2]

此处对Activity生命周期归结了一下，总结出4状态：Activity启动，点击Home回到主界面或被另外的Activity覆盖，重新回到原Activity，退出当前Activity

#### Activity启动：Activiy启动时依次走了onCreate(),onStart(),onResume()三个方法
 ![Activity启动][3]  

- onCreate :当Activity被创建时回调，activity启动时执行的第一个方法；onCreate中调用setContentView，设置布局资源；还可以在该方法中进行数据的初始化工作；
-  onStart：当Activity正在启动时调用；此时activity可以看到但未置于栈顶，不能与用户进行交互操作；
-  onResume：此时Activity处于最前端，可与用户进行交互操作
	
#### 点击Home回到主界面或者被另外的Activity覆盖：此时依次执行了onPause，onStop方法

![点击home回到主界面][4] 
	
- onPause：当前Activity被另外的Activity覆盖或者按了Home按键回到桌面，首先执行此方法；此时Activity仍然可见，但是不可被触摸；Activity由前台退居到后台时被调用；Activity由活跃状态变为停止状态；与onResume声明周期对应；此时Activity中的内存与变量信息依然存在，当内存不足时会被系统回收；  

- onStop：当onPause执行完后会执行此方法；当activity被完全覆盖后执行此方法；activity由可见变为完全不可见，处在后台运行；当内存不足时会被系统回收；
	
#### 重新回到原Activity：此时依次执行onRestart，onStart，onResume

![回到原Activity][5]

- onRestart：当Activity从桌面回到原Activity或者被遮盖的Activity上层界面退出时执行此方法；Activity由不可见状态逐渐变为可见状态；此时的Activity正处于启动状态
- onStart：Activity变为可见；此时并为位于栈顶，不能与用户交互；
- onResume：Activity位于栈顶；可以与用户进行交互；
	
#### 退出当前Activity：此时依次执行onPause，onStop，onDestory  
![activity退出][6]

- onPause： 如上面
- onStop: 如上面
- onDestory:  整个生命周期的最后一个方法，执行完毕后，生命周期结束；Activity正在被销毁；此生命周期做一些资源回收工作
	

### 2.3 Android进程优先级
进程属于什么类别是组件层面发生的事情决定的

![Android进程][7]

Android进程分为前台进程，可见进程，服务进程，后台进程，空进程

- 前台进程：与用户交互的Activity;绑定前台activity的服务；与前台服务交互的content provider
- 可见进程：可见但不可点击的进程
- 服务进程：在后台开启Service的进程
- 后台进程：前台进程被另外的Activity或Dialog覆盖变的不可见；按Home按键	
回到桌面；后台进程不会被立即杀死，根据最近最少使用顺序回收；
- 空进程：不属于以上任何组件的进程；没有活跃的组件；为了缓存的目的而被保留；系统会随时对其回收



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/activity-fout-state.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/activity-life.jpg
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/activity-start.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/activity-to-home.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/activity-return.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/activity-stop.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-progre.png


