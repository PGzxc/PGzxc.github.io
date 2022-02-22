---
title: IOS开发之——多线程- GCD基本使用(5)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 111717f6
date: 2022-02-22 09:03:53
---
## 一 概述

* GCD概念
* GCD任务和队列
* 应用示例

<!--more-->

## 二 GCD概念

### 2.1 什么是GCD

* 全称是Grand Central Dispatch，可译为“牛逼的中枢调度器”
* 纯C语言，提供了非常多强大的函数

### 2.2 GCD的优势

* GCD是苹果公司为<font color=red>多核</font>的<font color=red>并行</font>运算提出的解决方案
* GCD会自动利用更多的CPU内核(比如双核、四核)
* GCD会自动管理线程的生命周期(创建线程、调度任务、销毁线程)
* 程序员只需要告诉GCD想要执行什么任务，不需要编写任何线程管理代码

## 三 GCD任务和队列

### 3.1 GCD概念描述

#### GCD中有2个核心概念

* 任务：执行什么操作
* 队列：用来存放任务

####  GCD的使用就2个步骤

一 定制任务
* 确定想做的事情

二 将任务添加到队列中

* GCD会自动将队列中的任务取出，放到对应的线程中执行
* 任务的取出遵循队列的<font color=red>FIFO</font>原则：先进先出，后今后出

### 3.2  执行任务

####  GCD中有2个用来执行任务的函数

用同步的方式执行任务

```
dispatch_sync(dispatch_queue_t queue,dispatch_block_t block);
```

* queue：队列
* block：任务

用异步的方式执行任务

```
dispatch_async(dispatch_queue_t queue,dispatch_block_t block);
```

#### 同步和异步的区别

* 同步：只能在当前线程中执行任务，不具备开启新线程的能力
* 异步：可以在新的线程中执行任务，具备开启新线程的能力

### 3.3 队列类型

GCD的队列可以分为2大类型：

#### 并发队列(Concurrent Dispatch Queue)

* 可以让多个任务并发(同时)执行(自动开启多个线程同时执行任务)
* 并发功能只有在异步(dispatch_async)函数下才有效

#### 串行队列(Serial Dispatch Queue)

* 让任务一个接一个地执行(一个任务执行完毕后，再执行下一个任务)

### 3.4 容易混淆的术语

有4个术语比较容易混淆：同步、异步、并发、串行

#### 同步和异步主要影响：能不能开启新的线程

* 同步：在当前线程中执行任务，不具备开启新线程的能力
* 异步：在新的线程中执行任务，具备开启新线程的能力

#### 并发和串行主要影响：任务的执行方式

* 并发：多个任务并发(同时)执行
* 串行：一个任务执行完毕后，再执行下一个任务

### 3.5 并发队列

GCD默认已经提供了全局的并发队列，供整个应用使用，不需要手动创建

#### 使用dispatch_get_global_queue函数获得全局的并发队列

```
dispatch_queue_t dispatch_get_global_queue(dispatch_queue_priority_t priority,//队列的优先级
unsigned long flags);//此参数暂时无用，用0即可
dispatch_queue_t queue=dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT,0);//获得全局并发队列
```

####  全局并发队列的优先级

```
#define DISPATCH_QUEUE_PRIORITY_HIGH 2 //高
#define DISPATCH_QUEUE_PRIORITY_DEFAULT 0 //默认(中)
#define DISPATCH_QUEUE_PRIORITY_LOW (-2) //低
#define DISPATCH_QUEUE_PRIORITY_BACKGROUND INT16_MIN //后台
```

## 四 应用示例

### 4.1 代码

```
#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //dispatch_sync:同步，不具备开启线程的能力
    //dispatch_async:异步，具备开启线程的能力
    //并发队列：多个任务可以同时执行
    //串行队列：一个任务执行完后，再执行下一个任务
    
    //将任务添加到全局队列中去异步执行
    dispatch_queue_t queue=dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    //同步
//    dispatch_async(queue, ^{
//        NSLog(@"----下载图片---%@",[NSThread currentThread]);
//
//    });
    //异步
    dispatch_async(queue, ^{
        NSLog(@"----下载图片-1---%@",[NSThread currentThread]);
        
    });
    dispatch_async(queue, ^{
        NSLog(@"----下载图片-2---%@",[NSThread currentThread]);
        
    });
}

@end
```

### 4.2 打印内容

```
2022-02-21 23:34:21.350776+0800 07-GCD01[22976:257329] ----下载图片-2---<NSThread: 0x600001444a40>{number = 4, name = (null)}
2022-02-21 23:34:21.350776+0800 07-GCD01[22976:257323] ----下载图片-1---<NSThread: 0x6000014250c0>{number = 7, name = (null)}
```

