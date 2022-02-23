---
title: IOS开发之——多线程-队列的具体使用(6)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: c7c083d
date: 2022-02-23 08:48:20
---
## 一 各种队列的执行效果

|             |          全局并发队列          |        手动创建串行队列        |             主队列             |
| :---------: | :----------------------------: | :----------------------------: | :----------------------------: |
| 同步(sync)  | 没有开启新线程<br>串行执行任务 | 没有开启新线程<br>串行执行任务 | 没有开启新线程<br>串行执行任务 |
| 异步(async) |  有开启新线程<br>并发执行任务  |  有开启新线程<br>串行执行任务  | 没有开启新线程<br>串行执行任务 |

注意：使用sync函数往当前串行队列中添加任务，会卡住当前的串行队列

<!--more-->

## 二 串行队列

GCD中获得串行有2种途径

### 2.1 使用dispatch_queue_create函数创建串行队列

```
dispatch_queue_t 
dispatch_queue_create(const char*label,dispatch_queue_attr_t attr);
dispatch_queue_t queue=dispatch_queue_create("queue",NULL);//创建
dispatch_release(queue);//非ARC需要释放手动创建的队列
```

### 2.2 使用主队列(跟主线程相关联的队列)

* 主队列是GCD自带的一种特殊的串行队列

* 放在主队列中的任务，都会放到主线程中执行

* 使用dispatch_get_main_queue()获得主队列

  ```
  dispatch_queue_t queue=dispatch_get_main_queue();
  ```

## 三 创建队列

### 3.1 同步全局并发队列

```
//sync-并发队列
//会不会创建线程，不会
//任务的执行方式：串行执行(一个任务执行完毕后再执行下一个任务)
//并发队列失去了并发的功能
-(void)syncGlobalQueue
{
    //获得全局的并发队列
    dispatch_queue_t queue=dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片1--%@",[NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片2--%@",[NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片3--%@",[NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片4--%@",[NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片5--%@",[NSThread currentThread]);
    });
}
```

### 3.2 同步串行队列

```
//sync--串行队列
-(void)syncSerialQueue
{
    //创建一个串行队列
    dispatch_queue_t queue=dispatch_queue_create("thread", NULL);
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片1--%@",[NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片2--%@",[NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片3--%@",[NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片4--%@",[NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片5--%@",[NSThread currentThread]);
    });
}
```

### 3.3 异步并发队列

```
//async-并发队列(最常用)
//会不会创建线程，会，同时开多条
//任务的执行方式：并发执行
-(void)asyncGlobalQueue{
    //获得全局的并发队列
    dispatch_queue_t queue=dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    
    //将任务添加到全局队列中去异步执行
    dispatch_async(queue, ^{
        NSLog(@"---下载图片1--%@",[NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"---下载图片2--%@",[NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"---下载图片3--%@",[NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"---下载图片4--%@",[NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"---下载图片5--%@",[NSThread currentThread]);
    });
}
```

### 3.4 异步串行队列

```
//async--串行队列(有使用)
//会不会创建线程，会，只会开1条线程
//任务的执行方式：串行执行(一个任务执行完毕后再执行下一个任务)
-(void)asyncSerialQueue{
    //1.创建一个串行队列
    dispatch_queue_t queue=dispatch_queue_create("thread", NULL);
    //2.将任务添加到串行队列中 异步 执行
    dispatch_async(queue, ^{
        NSLog(@"---下载图片1--%@",[NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"---下载图片2--%@",[NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"---下载图片3--%@",[NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"---下载图片4--%@",[NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"---下载图片5--%@",[NSThread currentThread]);
    });  
}
```

### 3.5 同步主队列—调用出错

```
-(void)syncMainQueue
{
    //1-主队列(添加到主队列中的任务，都会自动放到主线程中去执行)
    dispatch_queue_t queue=dispatch_get_main_queue();
    
    //2-添加任务到主队列中执行
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片1--%@",[NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片2--%@",[NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片3--%@",[NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片4--%@",[NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"---下载图片5--%@",[NSThread currentThread]);
    });
}
```

### 3.6 异步主队列

```
//主队列
-(void)asyncMainQueue
{
    //1-主队列(添加到主队列中的任务，都会自动放到主线程中去执行)
    dispatch_queue_t queue=dispatch_get_main_queue();
    
    //2-添加任务到主队列中异步执行
    dispatch_async(queue, ^{
        NSLog(@"---下载图片1--%@",[NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"---下载图片2--%@",[NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"---下载图片3--%@",[NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"---下载图片4--%@",[NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"---下载图片5--%@",[NSThread currentThread]);
    });
    
}
```

