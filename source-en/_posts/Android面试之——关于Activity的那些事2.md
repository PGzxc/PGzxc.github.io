---
title: Android面试之——关于Activity的那些事2
categories:
  - 面试相关
  - Android面试题
tags:
  - Activity
abbrlink: f27906f
date: 2017-11-14 22:12:15
---
## 一 概述
此处的Activity知识点分：

```
Android任务栈、
Activity启动模式、
scheme跳转协议三方面展开；
```

<!--more--> 
## 二 知识点展开
### 2.1 Android任务栈

#### 前提：  
介绍Android任务栈之前，我们首先要知道什么是栈？栈：是一种先进先出的数据结构；  
延伸  那Android任务栈呢？以此类推：存放activity任务的栈；  

#### 分析  
当一个APP启动时，如果当前环境中不存在该APP的任务栈，那么系统就会创建一个任务栈。此后，这个APP所启动的Activity都将在这个任务栈中被管理；这个栈就被称为Task，即表示若干个Activity的集合，他们组合在一个形成了一个Task。  
当我们每打开一个Activity的时候它就往Activity任务栈中压入一个Activity，当我们每销毁一个Activity的时候它会从Activity任务栈中弹出一个Activity，由于Android系统自身的设计，我们只能在手机屏幕上获取当前一个Activity的焦点即栈顶元素，其余的activity暂居后台等待系统调用。 
![][1]

#### 概念

任务栈是用来提升体验而设计的:
   - 程序打开时就创建了一个任务栈, 用于存储当前程序的activity，当前程序（包括被当前程序所调用的）所有的activity属于一个任务栈。
   -  一个任务栈包含了一个activity的集合, 可以有序的选择哪一个activity和用户进行交互，只有在任务栈栈顶的activity才可以跟用户进行交互。
   -  任务栈可以移动到后台，并且保留了每一个activity的状态. 并且有序的给用户列出它们的任务, 而且还不丢失它们状态信息。
   -  退出应用程序时，当把所有的任务栈中所有的activity清除出栈时,任务栈会被销毁,程序退出。

### 2.2 启动模式

activity有四种启动模式，分别是：standard，singTop，singTask，singleInstance

- standard：标准模式；在这种模式下启动activity，都会重新创建一个activity实例，将它加到任务栈中；不会复用activity，只会重新创建；每创建一个都会走生命周期方法，消耗资源；  
- singleTop：栈顶复用模式；不是每次创建activity都放到任务栈中；如果栈顶是该activity则不会创建，直接复用该activity；不是位于栈顶还是会重新创建； 只检测栈顶是否有需要启动activity 
- singleTask：栈内复用模式；整个任务栈中是否有需要重新启动activity；若存在则将activity置于栈顶；并将该activity上的所有activity清除出栈；回调onNewIntent方法；  
- singleInstance：单一实例；独享任务栈；

### 2.3 scheme 协议

Android中的scheme是一种页面内跳转协议，通过自定义scheme协议，可以跳转到app中任何页面。  
跳转分一下几种：  

- 服务器可以定制化跳转APP页面
- APP可以通过scheme跳转到另一个APP页面
- 可以通过h5页面跳转APP原生页面



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/activity-stack.png