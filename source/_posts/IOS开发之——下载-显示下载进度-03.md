---
title: IOS开发之——下载-显示下载进度(03)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 下载
abbrlink: '8763e369'
date: 2022-03-13 08:56:34
---
## 一 概述

* 在didReceiveResponse方法中，通过response.expectedContentLength获得下载文件的总大小
* 在didReceiveData中将data中的数据添加到NSMutableData中，获取当前文件到大小
* 当前文件/总文件赋值给progress显示

<!--more-->

## 二 获取文件总大小和当前文件大小

### 2.1 获取当前文件大小

#### 方法一

```
NSHTTPURLResponse *resp=(NSHTTPURLResponse *)response;
//NSLog(@"%@",resp.allHeaderFields);
long long fileLength=[resp.allHeaderFields[@"Content-Length"] longLongValue];
```

#### 方法二

```
self.totalLength=response.expectedContentLength;
```

### 2.2 当前文件大小

#### 声明并赋值NSMutableData

```
@property(nonatomic,strong) NSMutableData *fileData;
-(void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response
{
    NSLog(@"didReceiveResponse--");
    self.fileData=[NSMutableData data]; 
}
```

#### 将data数据添加到NSMutableData中

```
-(void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data
{ 
    [self.fileData appendData:data];   
}
```

### 2.3 计算进度

```
-(void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data
{
    self.circleView.progress=(double)self.fileData.length/self.totalLength;   
}
```

## 三 示例

### 3.1 代码

```
#import "ViewController.h"
#import "DACircularProgressView.h"
@interface ViewController ()<NSURLConnectionDataDelegate>
@property(nonatomic,strong) NSMutableData *fileData;
@property(nonatomic,assign) long long totalLength; //文件的长度
@property (weak, nonatomic) IBOutlet UIProgressView *progressView;
@property(nonatomic,weak) DACircularProgressView *circleView;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    DACircularProgressView *circleView=[[DACircularProgressView alloc]init];
    circleView.frame=CGRectMake(100, 100, 100, 100);
    circleView.trackTintColor=[UIColor blueColor];
    circleView.progressTintColor=[UIColor redColor];
    circleView.progress=0.0;
    [self.view addSubview:circleView];
    self.circleView=circleView;   
}
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
    self.fileData=[NSMutableData data];
    //取出文件的总长度
    NSHTTPURLResponse *resp=(NSHTTPURLResponse *)response;
    //NSLog(@"%@",resp.allHeaderFields);
    long long fileLength=[resp.allHeaderFields[@"Content-Length"] longLongValue];
    //NSLog(@"%lld",fileLength);
    
    //NSLog(@"%lld",response.expectedContentLength);
    
    self.totalLength=response.expectedContentLength;
      
}
//当接收到服务器返回到实体数据时调用(具体内容，这个内容可被调用多次)
-(void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data
{
    //static int total=0;
    //total+=data.length;
    //NSLog(@"didReceiveData--%d---%d",data.length,total);
    
    [self.fileData appendData:data];
    //self.progressView.progress=(double)self.fileData.length/self.totalLength;
    self.circleView.progress=(double)self.fileData.length/self.totalLength;   
}
//加载完毕后调用(服务器的数据已经完全返回后)
-(void)connectionDidFinishLoading:(NSURLConnection *)connection
{
    NSLog(@"connectionDidFinishLoading--");
    //写入到沙盒中
   NSString *cache= [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)lastObject];
    NSString *file=[cache stringByAppendingPathComponent:@"videos.zip"];
    [self.fileData writeToFile:file atomically:YES];
}
@end
```

### 3.2 效果图

![][1]

## 四 存在的问题

由于将所有的数据添加到NSMutableData中，添加完成后，1次将数据写入到文件中，导致内存过大
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-download-03-progress-view.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-download-03-memory-big.png