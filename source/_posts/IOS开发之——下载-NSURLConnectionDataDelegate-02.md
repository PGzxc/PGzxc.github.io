---
title: IOS开发之——下载-NSURLConnectionDataDelegate(02)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 下载
abbrlink: 76cd2782
date: 2022-03-12 08:55:49
---
## 一 概述

本文介绍NSURLConnection connectionWithRequest发送请求，实现NSURLConnectionDataDelegate的方法

* didFailWithError：请求失败时调用(请求超时，网路异常)
* didReceiveResponse：接收到服务器的响应聚会调用
* didReceiveData：当接收到服务器返回到实体数据时调用(具体内容，这个内容可被调用多次)
* connectionDidFinishLoading：加载完毕后调用(服务器的数据已经完全返回后)

<!--more-->

## 二  概念

NSURLConnection常见的发送请求方法有以下几种：

* 同步请求
* 异步请求：block回调、代理

### 2.1 同步请求

```
+ (NSData *)sendSynchronousRequest:(NSURLRequest *)request returningResponse:(NSURLResponse **)response error:(NSError **)error;
```

### 2.2 异步请求

根据对服务器返回数据的处理方式的不同，又可以分为2种

####  block回调

```
+ (void)sendAsynchronousRequest:(NSURLRequest*) request queue:(NSOperationQueue*) queue                                         completionHandler:(void (^)(NSURLResponse* response, NSData* data, NSError* connectionError)) handler;
```

####  代理

```
- (id)initWithRequest:(NSURLRequest *)request delegate:(id)delegate;
+ (NSURLConnection*)connectionWithRequest:(NSURLRequest *)request delegate:(id)delegate;
- (id)initWithRequest:(NSURLRequest *)request delegate:(id)delegate startImmediately:(BOOL)startImmediately;
```

在startImmediately = NO的情况下，需要调用start方法开始发送请求

```
- (void)start;
```

### 2.3 NSURLConnectionDataDelegate协议

成为NSURLConnection的代理，最好遵守NSURLConnectionDataDelegate协议

#### 开始接收到服务器的响应时调用

```
- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response;
```

####  接收到服务器返回的数据时调用（服务器返回的数据比较大时会调用多次）

```
- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data;
```

#### 服务器返回的数据完全接收完毕后调用

```
- (void)connectionDidFinishLoading:(NSURLConnection *)connection;
```

#### 请求出错时调用（比如请求超时）

```
- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error;
```

## 三 请求的步骤

* NSURLConnection connectionWithRequest:request：发送一个request请求
* delegate为当前类，遵循NSURLConnectionDataDelegate协议
* 分别实现：didFailWithError、didReceiveResponse、didReceiveData、connectionDidFinishLoading

## 四 示例

### 4.1 代码

```
#import "ViewController.h"
@interface ViewController ()<NSURLConnectionDataDelegate>
@end
@implementation ViewController

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self download];
}
-(void)download
{
    //1-URL
    NSURL *url=[NSURL URLWithString:@"http://localhost:8080//MJServer/resources/videos/minion_01.mp4"];
    //2-请求
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    //3-下载
    [NSURLConnection connectionWithRequest:request delegate:self];
    
}
#pragma 代理方法


//-请求失败时调用(请求超时，网络异常)
-(void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error
{
    NSLog(@"didFailWithError--");

}
//-接收到服务器的响应聚会调用
-(void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response
{
    NSLog(@"didReceiveResponse--");
}
//当接收到服务器返回到实体数据时调用(具体内容，这个内容可被调用多次)
-(void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data
{
    static int total=0;
    total+=data.length;
    NSLog(@"didReceiveData--%d---%d",data.length,total);
}
//加载完毕后调用(服务器的数据已经完全返回后)
-(void)connectionDidFinishLoading:(NSURLConnection *)connection
{
    NSLog(@"connectionDidFinishLoading--");
}
@end
```

### 4.2 结果打印

```
2022-03-13 20:46:11.202963+0800 02-大文件下载[49034:522723] didReceiveResponse--
2022-03-13 20:46:11.203169+0800 02-大文件下载[49034:522723] didReceiveData--62766---62766
2022-03-13 20:46:11.203350+0800 02-大文件下载[49034:522723] didReceiveData--9000---71766
.....
2022-03-13 20:46:11.242147+0800 02-大文件下载[49034:522723] didReceiveData--81000---8945766
2022-03-13 20:46:11.242390+0800 02-大文件下载[49034:522723] didReceiveData--63000---9008766
2022-03-13 20:46:11.242656+0800 02-大文件下载[49034:522723] didReceiveData--54000---9062766
2022-03-13 20:46:11.242851+0800 02-大文件下载[49034:522723] didReceiveData--9044---9071810
2022-03-13 20:46:11.244061+0800 02-大文件下载[49034:522723] connectionDidFinishLoading--
```

