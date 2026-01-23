---
title: IOS开发之——多线程-线程安全(3)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 72646f9b
date: 2022-02-21 09:08:02
---
# IOS开发之——多线程-线程安全(3)

## 一 多线程资源共享

* 1块资源可能被多个线程共享，也就是<font color=red>多个线程可能会访问同一块资源</font>
* 比如多个线程访问同一个对象、同一个变量、同一个文件
* 当多个线程访问同一块资源时，很容易引发<font color=red>数据错乱和数据安全</font>问题

<!--more-->

## 二 安全隐患示例

### 2.1 示例一存钱取钱

![][1]

### 2.2 卖票
![][2]

## 三 多线程卖票

### 3.1 说明
* 程序启动后，开启1，2，3三个线程卖票
* 三个线程共卖100张票

### 3.2 代码

```
#import "ViewController.h"

@interface ViewController ()
@property(nonatomic,strong) NSThread *thread1;
@property(nonatomic,strong) NSThread *thread2;
@property(nonatomic,strong) NSThread *thread3;
@property(nonatomic,assign) int leftTicketCount;//剩余票数

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.leftTicketCount=100;
    
    self.thread1=[[NSThread alloc]initWithTarget:self selector:@selector(saleTicket) object:nil];
    self.thread1.name=@"1号窗口";
    
    self.thread2=[[NSThread alloc]initWithTarget:self selector:@selector(saleTicket) object:nil];
    self.thread2.name=@"2号窗口";
    
    self.thread3=[[NSThread alloc]initWithTarget:self selector:@selector(saleTicket) object:nil];
    self.thread3.name=@"3号窗口";
    
    self.locker=[[NSObject alloc]init];
    
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self.thread1 start];
    [self.thread2 start];
    [self.thread3 start];
    
}
//卖票
-(void)saleTicket
{
    while (1) {
            int count=self.leftTicketCount;
            if (count>0) {
                [NSThread sleepForTimeInterval:0.1];
                self.leftTicketCount=count-1;
                NSLog(@"%@卖了一张票，剩余%d张票",[NSThread currentThread].name,count);
            }else{
                return;//退出死循环
            }
    }
}
@end
```

### 3.3  现象

```
2022-02-20 23:10:18.593201+0800 05-线程安全问题[45790:535673] 3号窗口卖了一张票，剩余2张票
2022-02-20 23:10:18.593201+0800 05-线程安全问题[45790:535672] 2号窗口卖了一张票，剩余2张票
2022-02-20 23:10:18.593201+0800 05-线程安全问题[45790:535671] 1号窗口卖了一张票，剩余2张票
2022-02-20 23:10:18.696806+0800 05-线程安全问题[45790:535671] 1号窗口卖了一张票，剩余1张票
2022-02-20 23:10:18.696809+0800 05-线程安全问题[45790:535672] 2号窗口卖了一张票，剩余1张票
2022-02-20 23:10:18.696806+0800 05-线程安全问题[45790:535673] 3号窗口卖了一张票，剩余1张票
```

### 3.4  安全隐患分析
![][3]
### 3.5 安全隐患解决(互斥锁)
![][4]

## 四 互斥锁

### 4.1 互斥锁使用格式

```
@synchronized(锁对象){//需要锁定的代码
注意：锁定1份代码只用1把锁，用多把锁是无效的
}
```

###  4.2 互斥锁的优缺点

* 优点：能有效防止因多线程抢夺资源造成的数据安全问题
* 缺点：需要消耗大量的CPU资源

###  4.3 互斥锁的使用前提

多条线程抢夺同一块资源

###  4.4 相关专业术语：线程同步

* 线程同步的意思是：多条线程在同一条线上执行(按顺序地执行任务)
* 互斥锁：就是使用了线程同步技术

### 4.5 原子和非原子属性

* OC在定义属性时有nonatomic和atomic两种选择
* Atomic：线程安全，需要消耗大量的资源
* Nonatomic：非线程安全，适合内存小的移动设备

### 3.5 iOS开发的建议

* 所有属性都声明为nonatomic
* 尽量避免多线程抢夺同一块资源
* 尽量将加锁、资源抢夺的业务逻辑交给服务器端处理，减小移动客户端的压力

## 五 加锁后代码

```
-(void)saleTicket
{
    while (1) {
        @synchronized(self) {
            int count=self.leftTicketCount;
            if (count>0) {
                [NSThread sleepForTimeInterval:0.1];
                self.leftTicketCount=count-1;
                NSLog(@"%@卖了一张票，剩余%d张票",[NSThread currentThread].name,count);
            }else{
                return;//退出死循环
            }
        }
    }
}
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-thread-problem-01.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-thread-problem-02.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-thread-problem-cause.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-thread-problem-resolve.png