---
title: IOS开发之——多线程-延迟执行(8)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 延迟执行
abbrlink: aa334cc
date: 2022-02-24 09:06:53
---
## 一 概述

IOS常见的延迟执行有两种：

1.调用NSObject的方法

```
[self performSelector:@selector(run) withObject:nil afterDelay:2.0];//2秒后调用self的run方法
```

2.使用GCD函数

```
dispatch_after(dispatch_time(DISPATCH_TIME_NOW,(int64_t)(2.0*NSEC_PER_SEC)),dispatch_get_main_queue(),^{

});
```

<!--more-->

## 二 延迟执行示例代码

### 2.1 示例一

```
//延迟执行不要使用sleep，坏处：卡住当前线程
-(void)delay1{
    [NSThread sleepForTimeInterval:3];
    NSLog(@"----下载图片----");
}
```

### 2.2 示例二

```
//延迟执行，不会卡住当前线程(主线程)
-(void)delay2{
    [self performSelector:@selector(download:) withObject:@"http://123.jpg" afterDelay:3];
}
```

### 2.3 示例三

```
//延迟执行，不会卡住当前线程(主线程)
-(void)delay3{
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        NSLog(@"-----task-----%@",[NSThread currentThread]);
    });
}
```

### 2.4 示例四

```
//延迟执行，不会卡住当前线程(子线程)
-(void)delay4{
    dispatch_queue_t queue=dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3 * NSEC_PER_SEC)), queue, ^{
        NSLog(@"-----task-----%@",[NSThread currentThread]);
        
    });
}
```

### 2.5 示例五

```
-(void)delay5{
    dispatch_queue_t queue=dispatch_get_main_queue();
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3 * NSEC_PER_SEC)), queue, ^{
        NSLog(@"-----task-----%@",[NSThread currentThread]);
        
    });
}
```

注：download方法

```
-(void)download:(NSString *)url{
    NSLog(@"----run---%@----%@",url,[NSThread currentThread]);
}
```

