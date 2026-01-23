---
title: IOS开发之——下载- NSURLSession(06)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 下载
abbrlink: f0c3a0f0
date: 2022-03-15 08:34:26
---
## 一 概述

* NSURLSessionDataTask:普通的Get\Post任务
* NSURLSessionDownloadTask:文件下载任务
* NSURLSessionUploadTask:文件上传

<!--more-->

## 二 NSURLSessionDataTask

### 2.1 SessionDataTask-Get请求

```
-(void)URLTaskGet
{
    NSURLSession *session=[NSURLSession sharedSession];
    NSURL *url=[NSURL URLWithString:@"http://localhost:8080/MJServer/video"];
    NSURLSessionDataTask *task=  [session dataTaskWithURL:url completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        //NSLog(@"%d",data.length);
        NSDictionary *dict=[NSJSONSerialization JSONObjectWithData:data options:nil error:nil];
        NSLog(@"%@",dict);
    }];
    //3-开始任务
    [task resume];
}
```

### 2.2 SessionDataTask-Post请求

```
-(void)DataTaskPost
{
    NSURLSession *session=[NSURLSession sharedSession];
    NSURL *url=[NSURL URLWithString:@"http://localhost:8080/MJServer/login"];
    NSMutableURLRequest *request=[NSMutableURLRequest requestWithURL:url];
    request.HTTPMethod=@"POST";
    NSString *param=[NSString stringWithFormat:@"username=%d&pwd=%d",123,123];
    request.HTTPBody=[param dataUsingEncoding:NSUTF8StringEncoding];

    NSURLSessionDataTask *task=[session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {    
        NSDictionary *dict=[NSJSONSerialization JSONObjectWithData:data options:nil error:nil];
        NSLog(@"%@",dict);
    }];
    //3-开始任务
    [task resume];
}
```

## 三 NSURLSessionDownloadTask

### 3.1 downloadTaskWithURL

```
-(void)downloadTaskURL
{
    //1-得到session对象
    NSURLSession *session=[NSURLSession sharedSession];
    //2-创建一个Task
    NSURL *url=[NSURL URLWithString:@"http://localhost:8080/MJServer/resources/videos/minion_01.mp4"];
    NSURLSessionDownloadTask *task= [session downloadTaskWithURL:url completionHandler:^(NSURL * _Nullable location, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        NSLog(@"下载完毕---%@",location);
        //location:临时文件的路径(下载好的文件)
        //将临时文件剪切或者复制caches文件夹
        NSString *caches=[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)lastObject];
        NSString *file=[caches stringByAppendingPathComponent:response.suggestedFilename];
        NSFileManager *mgr=[NSFileManager defaultManager];
        
        //AtPath:剪切前的文件路径
        //toPath:剪切后的文件路径
        [mgr moveItemAtPath:location.path toPath:file error:nil];
    }];
    //3-开始任务
    [task resume];
}
```

### 3.2 downloadTaskWithURLNoHandler

```
//1-代理
@interface ViewController ()<NSURLSessionDownloadDelegate>
@end

//2-task
-(void)downloadTaskWithURLNoHandler
{
    NSURLSessionConfiguration *cfg=[NSURLSessionConfiguration defaultSessionConfiguration];
    //得到session对象
    NSURLSession *session=[NSURLSession sessionWithConfiguration:cfg delegate:self delegateQueue:[NSOperationQueue mainQueue]];
    NSURL *url=[NSURL URLWithString:@"http://localhost:8080/MJServer/resources/videos/minion_01.mp4"];
   //如果给下载任务设置了completionHandler这个block，也实现了下载的代理方法，优先执行block
    NSURLSessionDownloadTask *task=[session downloadTaskWithURL:url];
//    NSURLSessionDownloadTask *task=[session downloadTaskWithURL:url completionHandler:^(NSURL * _Nullable location, NSURLResponse * _Nullable response, NSError * _Nullable error) {
//        NSLog(@"下载完毕");
//
//    }];
    //开始任务
    [task resume];
}
//3-delegate
#pragma mark-NSURLSessionDownloadDelegate
//下载完毕
- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didFinishDownloadingToURL:(NSURL *)location
{
    NSLog(@"下载didFinishDownloadingToURL--%@",location);
    NSString *caches=[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES)lastObject];
    NSString *file=[caches stringByAppendingPathComponent:downloadTask.response.suggestedFilename];
    NSFileManager *mgr=[NSFileManager defaultManager];  
    //AtPath:剪切前的文件路径
    //toPath:剪切后的文件路径
    [mgr moveItemAtPath:location.path toPath:file error:nil]; 
}
//恢复下载
-(void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didResumeAtOffset:(int64_t)fileOffset expectedTotalBytes:(int64_t)expectedTotalBytes
{   
}
//下载任务，写完一部分就调用
//bytesWritten：本次写了多少
//totalBytesWritten：累计写了多少长度到沙盒中
//totalBytesExpectedToWrite：文件的总长度


-(void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didWriteData:(int64_t)bytesWritten totalBytesWritten:(int64_t)totalBytesWritten totalBytesExpectedToWrite:(int64_t)totalBytesExpectedToWrite
{
    double progress=(double)totalBytesWritten/totalBytesExpectedToWrite;
    NSLog(@"下载进度--%f",progress);
}
```

### 3.3 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-download-07-downloadtask.gif