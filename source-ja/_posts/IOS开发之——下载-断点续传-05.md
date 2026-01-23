---
title: IOS开发之——下载-断点续传(05)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 下载
abbrlink: 3b9f8796
date: 2022-03-15 08:33:09
---
## 一 概述

* HTTP Range概念
* 断点续传逻辑
* 断点续传示例

<!--more-->

## 二 HTTP Range概念

通过设置请求头Range可以指定每次从网络下载数据包的大小

### 2.1 Range示例

|         示例          |           说明            |
| :-------------------: | :-----------------------: |
|      bytes=0-499      |   从0到499的头500个字节   |
|     bytes=500-999     | 从500到999的第二个500字节 |
|      bytes=500-       |  从500字节以后的所有字节  |
|      bytes=-500       |       最后500个字节       |
| bytes=500-599,800-899 |     同时指定几个范围      |

### 2.2 Range小结

* `-`用于分割，前面的数字表示起始字节数，后面的数字表示截止字节数，没有表示到末尾
* `,`用于分组，可以一次指定多个Range，不过很少用

## 三 断点续传逻辑

* 页面中添加一个开始暂停按钮，点击切换开始和暂停状态
* 开始按钮，执行下载操作，通过`forHTTPHeaderField:@"Range"`标识当前下载到位置
* 点击暂停按钮，停止下载操作
* 再次点击开始，通过self.currentLength设置`forHTTPHeaderField:@"Range"`继续下载
* 下载完成后，隐藏开始暂停按钮

## 四 断点续传示例

### 4.1 代码

```
#import "ViewController.h"
#import  "DACircularProgressView.h"

@interface ViewController ()<NSURLConnectionDataDelegate>
@property(nonatomic,strong) NSFileHandle *writeHandle;
@property(nonatomic,assign) long long totalLength;
@property(nonatomic,assign) long long currentLength;

@property(nonatomic,weak) DACircularProgressView *circleView;
@property(nonatomic,strong) NSURLConnection *conn;
@property (weak, nonatomic) IBOutlet UIButton *btn;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    DACircularProgressView *circleView=[[DACircularProgressView alloc]init];
    circleView.frame=CGRectMake(120, 100, 100, 100);
    circleView.progressTintColor=[UIColor redColor];
    circleView.trackTintColor=[UIColor orangeColor];
    circleView.progress=0.01;
    [self.view addSubview:circleView];
    self.circleView=circleView;
    
}
- (IBAction)downloadAndPause:(UIButton *)sender
{
    //状态取反
    sender.selected=!sender.isSelected;
    if (sender.selected) { //继续
        NSLog(@"继续");
        //1-URL
        NSURL *url=[NSURL URLWithString:@"http://localhost:8080//MJServer/resources/videos.zip"];
        //2-请求
        NSMutableURLRequest *request=[NSMutableURLRequest requestWithURL:url];
        //设置请求头
        NSString *range=[NSString stringWithFormat:@"bytes=%lld-",self.currentLength];
        [request setValue:range forHTTPHeaderField:@"Range"];
        
        //3-下载
       self.conn= [NSURLConnection connectionWithRequest:request delegate:self];
    }else{ //暂停
        NSLog(@"暂停");
        [self.conn cancel];
        self.conn=nil;
    }
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
    if (self.currentLength)return;
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
    self.circleView.progress=(double)self.currentLength/self.totalLength;
    
}
//加载完毕后调用(服务器的数据已经完全返回后)
-(void)connectionDidFinishLoading:(NSURLConnection *)connection
{
    NSLog(@"connectionDidFinishLoading--");
    self.currentLength=0;
    self.totalLength=0;
    [self.btn setHidden:TRUE];
    
    //关闭文件
    [self.writeHandle closeFile];
    self.writeHandle=nil;
}
@end
```

### 4.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-download-06-continue.gif