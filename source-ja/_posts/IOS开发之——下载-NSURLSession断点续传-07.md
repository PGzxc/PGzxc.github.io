---
title: IOS开发之——下载-NSURLSession断点续传(07)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 下载
abbrlink: 7b327a87
date: 2022-03-16 09:22:22
---
## 一 概述

* NSURLConnection通过设置`forHTTPHeaderField:@"Range"`实现断点续传
* 本文介绍NSURLSession通过`downloadTaskWithResumeData`实现断点续传

<!--more-->

## 二 NSURLSession实现断点续传的过程

* 界面上添加一个开始/暂停下载按钮，控制开始及暂停，点击按钮进行状态取反
* 开始下载包含了：从0开始下载和暂停后继续下载两种状态
* 从0开始下载时，NSURLSession通过`downloadTaskWithURL`执行下载操作，并回调NSURLSessionDownloadDelegate的三个代理方法
* 点击暂停按钮时，self.task cancelByProducingResumeData方法获取到暂停时到断点数据resumeData
* 继续下载时，执行self.session downloadTaskWithResumeData，传入暂停时到resumeData继续下载

## 三 NSURLSession断点续传示例

### 3.1 界面

![][1]

说明：

* Type：选择Custom
* State Config Default背景图片为：start
* State Config Selected背景图片为：pause

### 3.2 代码

```
#import "ViewController.h"

@interface ViewController ()<NSURLSessionDownloadDelegate>
@property (weak, nonatomic) IBOutlet UIProgressView *progressView;
@property(nonatomic,strong) NSURLSessionDownloadTask *task;
@property(nonatomic,strong) NSData *resumeData;
@property(nonatomic,strong) NSURLSession *session;

@end

@implementation ViewController
- (NSURLSession *)session
{
    if (!_session) {
        NSURLSessionConfiguration *cfg=[NSURLSessionConfiguration defaultSessionConfiguration];
        self.session= [NSURLSession sessionWithConfiguration:cfg delegate:self delegateQueue:[NSOperationQueue mainQueue]];
    }
    return _session;
}
- (IBAction)download:(UIButton *)sender
{
    //按钮状态取反
    sender.selected=!sender.isSelected;
    if(sender.selected){//继续下载
        if(self.task==nil){
            if (self.resumeData) { //有值，恢复
                [self resume];
            }else{ //从0开始
                [self start];
            }
        }
    }else{ //暂停
        [self pause];
    }
}
//开始
-(void)start{
    //1-创建一个下载任务
    NSURL *url=[NSURL URLWithString:@"http://localhost:8080/MJServer/resources/videos.zip"];
    self.task=[self.session downloadTaskWithURL:url];
    //2-开始任务
    [self.task resume];
    
}
//恢复，继续
-(void)resume
{
    //传入上次暂停下载返回的数据，就可以恢复下载
    self.task= [self.session downloadTaskWithResumeData:self.resumeData];
    //开始下载
    [self.task resume];
    //清空
    self.resumeData=nil;
}
//暂停
-(void)pause
{
    __weak typeof(self) vc=self;
    [self.task cancelByProducingResumeData:^(NSData * _Nullable resumeData) {
        //resumeData:包含了继续下载的开始位置
        vc.resumeData=resumeData;
        vc.task=nil;
    }];
}
#pragma mark--delegate

-(void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask
didFinishDownloadingToURL:(NSURL *)location
{
    //文件路径
    NSString *caches=[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)lastObject];
    NSString *filePath=[caches stringByAppendingPathComponent:downloadTask.response.suggestedFilename];
    
    //创建一个空的文件到沙盒中
    NSFileManager *mgr=[NSFileManager defaultManager];
    [mgr moveItemAtPath:location.path toPath:filePath error:nil];
}

-(void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask
     didWriteData:(int64_t)bytesWritten
totalBytesWritten:(int64_t)totalBytesWritten
totalBytesExpectedToWrite:(int64_t)totalBytesExpectedToWrite
{
    self.progressView.progress=(double)totalBytesWritten/totalBytesExpectedToWrite;
}

-(void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask
didResumeAtOffset:(int64_t)fileOffset
expectedTotalBytes:(int64_t)expectedTotalBytes
{   
}
@end
```

### 3.3 效果图
![][2]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-download-08-storyboard.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-download-08-process-view.gif

