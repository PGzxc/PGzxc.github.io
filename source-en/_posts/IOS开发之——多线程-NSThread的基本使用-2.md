---
title: IOS开发之——多线程-NSThread的基本使用(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: e40fce61
date: 2022-02-21 09:07:14
---
## 一 概述- IOS中多线程的实现方案

|  技术方案   |                             简介                             | 语言 | 线程生命周期 |  使用频率  |
| :---------: | :----------------------------------------------------------: | :--: | :----------: | :--------: |
|   pthread   | 一套通用的多线程APi<br>适用于Unix\Linux\Windows等系统<br>跨平台\可移植 |  C   |  程序员管理  | 几乎不使用 |
|  NSThread   |       使用更加面向对象<br>简单易用，可直接操作线程对象       |  OC  |  程序员管理  |  偶尔使用  |
|     GCD     |       旨在替代NSThread等线程技术<br>充分利用设备的多核       |  C   |   自动管理   |  经常使用  |
| NSOperation | 基于GCD(底层是GCD)<br>比GCD多了一些更加简单实用的功能<br>实用更加面向对象 |  OC  |   自动管理   |  经常使用  |

<!--more-->

## 二 pthread示例(不会阻塞主线程)

```
#import "ViewController.h"
#import <pthread.h>

@interface ViewController ()

@end

@implementation ViewController

void *run(void *data)
{
    NSLog(@"run----%@",[NSThread currentThread]);
    
    for (int i=0;i<1000000; i++) {
        NSLog(@"当前线程：%@====%d",[NSThread currentThread],i);
    }
    
    return NULL;
}

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //创建线程
    pthread_t myRestrict;
    pthread_create(&myRestrict, nil, run, NULL);
    
}

@end
```

## 三 NSThread

### 3.1 概念

#### NSThread线程

一个NSThread对象就代表一条线程

#### 创建、启动线程

```
NSThread *thread=[[NSThead alloc]initWitchTarget:self selector:@selector(run) object:nil];
[thread start];
//线程一启动，就会在线程thread中执行self的run方法
```

#### 主线程相关用法

```
+(NSThread *)mainThread;//获得主线程
-(BOOL)isMainThread;//是否为主线程
+(BOOL)isMainThread;//是否为主线程
```

#### 获取当前线程

```
NSThread *current=[NSThread currentThread];
```

#### 线程的调度优先级

```
+(double)threadPrority;
+(BOOL)setThreadPrority:(double)p;
-(double)threadPriority;
+(BOOL)setThreadPriority:(double)p;
```

调度优先级的取值范围是：0.0～1.0，默认值0.5，值越大，优先级越高

#### 线程的名字

```
-(void)setName:(NSString *)n;
-(NSString *)name;
```

#### 其他创建线程方式

##### 创建线程后自动启动线程

```
[NSThread detachNewThreadSelector:@selector(run) toTarget:self withObject:nil];
```

##### 隐式创建并启动线程

```
[self performSelecctorInBackground:@selector(run) withObject:nil];
```

##### 上述2中创建线程方式的优缺点

* 优点：简单快捷
* 缺点：无法对线程进行更详细的设置

### 3.2 代码

```
#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}
-(void)download:(NSString *)url
{
    NSLog(@"下载东西---%@--%@",url,[NSThread currentThread]);
}

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self createThread3];
}
//创建线程的方式

-(void)createThread1
{
    NSThread *thread=[[NSThread alloc]initWithTarget:self selector:@selector(download:) object:@"http://1.jpg"];
    thread.name=@"下载线程";
    [thread start];
}

-(void)createThread2
{
    [NSThread detachNewThreadSelector:@selector(download:) toTarget:self withObject:@"http://1.jpg"];
}
//线程创建方式3
-(void)createThread3
{
    //[self performSelector:@selector(download:) withObject:@"http://aa.jpg"];
    //[self download:@"http://aa.jpg"];
    [self performSelectorInBackground:@selector(download:) withObject:@"http://aaa.jpg"];
}
@end
```

## 四 线程的状态

### 4.1 状态描述

![][1]

### 4.2 线程的状态

#### 启动线程

```
-(void)start;
//进入就绪状态——>运行状态。当线程任务执行完毕，自动进入死亡状态
```

#### 阻塞(暂停)线程

```
+(void)sleepUnitilDate:(NSDate *)date;
+(void)sleepforTimeInterval:(NSTimeInterval)ti;
//进入阻塞状态
```

#### 强制停止线程

```
+(void)exit;
//进入死亡状态
```

注意：一旦线程停止(死亡)了，就不能再次开启任务


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-thread-state-view.png
