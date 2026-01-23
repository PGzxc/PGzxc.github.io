---
title: IOS开发之——AFN-文件下载(03)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - AFN
abbrlink: eeb94571
date: 2022-03-20 14:09:16
---
## 一 概述

* AFN如何下载文件 
* AFN下载文件示例

<!--more-->

## 二 AFN如何下载文件 

### 2.1 AFN下载文件的过程

* 创建AFURLSessionManager或AFHTTPSessionManager
* Manager执行downloadTask方法
* 调用downloadTask resume执行下载任务

### 2.2 创建Manager

#### 方法一

```
NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:configuration];
```

#### 方法二

```
AFHTTPSessionManager *mgr=[AFHTTPSessionManager manager];
```

### 2.3 downloadTask 

#### downloadTaskWithRequest

```
[mgr downloadTaskWithRequest:request progress:nil destination:destPaht completionHandler:^(NSURLResponse * _Nonnull response, NSURL * _Nullable filePath, NSError * _Nullable error) {
        
}];
```

#### downloadTaskWithResumeData

```
[mgr downloadTaskWithResumeData:data progress:nil destination:destPath completionHandler:^(NSURLResponse * _Nonnull response, NSURL * _Nullable filePath, NSError * _Nullable error) {
        
 }];
```

## 三 AFN下载文件示例

### 3.1 代码

```
-(void)HttpManagerDownload
{
    NSURL *url=[NSURL URLWithString:@"http://localhost:8080//MJServer/resources/videos/minion_01.mp4"];
    //2-请求
    NSMutableURLRequest *request=[NSMutableURLRequest requestWithURL:url];
    
    AFHTTPSessionManager *mgr=[AFHTTPSessionManager manager];
    NSURLSessionDownloadTask *task= [mgr downloadTaskWithRequest:request progress:nil destination:^NSURL * _Nonnull(NSURL * _Nonnull targetPath, NSURLResponse * _Nonnull response) {
        NSURL *cacheURL= [[[NSFileManager defaultManager]URLsForDirectory:NSCachesDirectory inDomains:NSUserDomainMask]lastObject];
        return [cacheURL URLByAppendingPathComponent:[response suggestedFilename]];
    } completionHandler:^(NSURLResponse * _Nonnull response, NSURL * _Nullable filePath, NSError * _Nullable error) {
        NSLog(@"File downloaded to: %@", filePath);
        
    }];
    [task resume];
}
```

### 3.2 执行结果

```
2022-03-20 14:02:43.197326+0800 AFN-Demo1[18193:292275] File downloaded to: file:///Users/zxc/Library/Developer/CoreSimulator/Devices/FA145B46-0D5E-4C75-87A3-39AB48C1A87A/data/Containers/Data/Application/B213C405-2E7C-48FC-9D6D-58FDD4C18A49/Library/Caches/minion_01.mp4
```

