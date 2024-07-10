---
title: IOS开发之——下载-NSFileHandle优化内存(04)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 下载
abbrlink: d72987fb
date: 2022-03-14 08:57:28
---
## 一 概述

* 使用NSMutableData接收数据，最后一次行写入文件时导致app占用内存过大
* 通过NSFileHandle将每次的数据写入到文件的末位，降低了内存的使用

<!--more-->

## 二 NSFileHandle的使用过程

* NSFileHandle通过fileHandleForWritingAtPath关联写入的文件
* 接收到数据后，NSFileHandle先调用seekToEndOfFile方法移动到文件的末位
* 调用writeData将data数据写入到文件中
* 写入数据完成后，closeFile关闭文件，并将NSFileHandle置空

## 三 示例

### 3.1 代码

```
#import "ViewController.h"

@interface ViewController ()<NSURLConnectionDataDelegate>
@property(nonatomic,strong) NSFileHandle *writeHandle;
@property(nonatomic,assign) long long totalLength;
@property(nonatomic,assign) long long currentLength;

@end

@implementation ViewController

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self download];
}
-(void)download
{
    //1-URL
    NSURL *url=[NSURL URLWithString:@"http://localhost:8080//MJServer/resources/videos.zip"];
    //2-请求
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    //3-下载
    [NSURLConnection connectionWithRequest:request delegate:self];
}
//-请求失败时调用(请求超时，网络异常)
-(void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error
{
    NSLog(@"didFailWithError--");
}
//-接收到服务器的响应聚会调用
-(void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response
{
    NSLog(@"didReceiveResponse--");
    //文件路径
    NSString *caches=[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)lastObject];
    NSString *filePath=[caches stringByAppendingPathComponent:@"videos.zip"];
    
    //创建一个空的文件到沙盒中
    NSFileManager *mgr=[NSFileManager defaultManager];
    [mgr createFileAtPath:filePath contents:nil attributes:nil];
    //创建一个用来写数据的句柄
    self.writeHandle=[NSFileHandle fileHandleForWritingAtPath:filePath];
    
   //获得文件的总大小
    self.totalLength=response.expectedContentLength;

}
//当接收到服务器返回到实体数据时调用(具体内容，这个内容可被调用多次)
-(void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data
{
  //移动到文件的最后面
    [self.writeHandle seekToEndOfFile];
    //写入数据到沙盒中
    [self.writeHandle writeData:data];
    self.currentLength+=data.length;
    NSLog(@"下载进度：%f",(double)self.currentLength/self.totalLength);
    
}
//加载完毕后调用(服务器的数据已经完全返回后)
-(void)connectionDidFinishLoading:(NSURLConnection *)connection
{
    NSLog(@"connectionDidFinishLoading--");
   
    self.currentLength=0;
    self.totalLength=0;
    //关闭文件
    [self.writeHandle closeFile];
    self.writeHandle=nil;
}
@end
```

### 3.2 效果图(及内存)

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-download-04-memory-youhua.gif