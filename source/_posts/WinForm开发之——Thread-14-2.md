---
title: 'WinForm开发之——Thread(14.2)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 81dbaacd
date: 2020-08-06 05:51:44
---
## 一 概述

* 在C#语言中线程(Thread)是包含在进程中的，它位于System.Threading命名空间中
* 与线程有关的类同样也都在System.Threading命名空间中

<!--more-->

## 二 主要的类

|         类名         |                             说明                             |
| :------------------: | :----------------------------------------------------------: |
|        Thread        |               在初始的应用程序中创建其他的线程               |
|     ThreadState      |         指定Thread的执行状态，包括开始、运行、挂起等         |
|    ThreadPrioity     | 线程在调度时的优先级枚举值，包括Highest、AboveNormal、BelowNormal、Lowest |
|      ThreadPool      | 提供一个线程池，用于执行任务、发送工作项、处理异步I/O等操作  |
|       Monitor        |                    提供同步访问对象的机制                    |
|        Mutex         |                     用于线程间同步的操作                     |
| ThreadAbortException |            调用Thread类中的Abort方法时出现的异常             |
| ThreadStateException |      Thread处于对方法调用无效的ThreadState时出现的异常       |

## 三 属性和方法

|         **属性或方法**         |                   **说明**                   |
| :----------------------------: | :------------------------------------------: |
|              Name              |          属性，获取或设置线程的名称          |
|            Priority            |         属性，获取或设置线程的优先级         |
|          ThreadState           |           属性，获取线程当前的状态           |
|            IsAlive             |      属性，获取当前线程是否处于启动状态      |
|          IsBackground          | 属性，获取或设置值，表示该线程是否为后台线程 |
|         CurrentThread          |         属性，获取当前正在运行的线程         |
|            Start()             |                方法，启动线程                |
| Sleep(int millisecondsTImeout) |       方法，将当前线程暂停指定的毫秒数       |
|           Suspend()            |        方法，挂起当前线程(已经被弃用)        |
|             Join()             |   方法，阻塞调用线程，直到某个线程终止为止   |
|          Interrupt()           |              方法，中断当前线程              |
|            Resume()            |     方法，继续已经挂起的线程(已经被弃用)     |
|            Abort()             |                方法，终止线程                |
