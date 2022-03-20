---
title: IOS开发之——AFN-文件上传(02)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - AFN
abbrlink: af849e4c
date: 2022-03-20 14:08:10
---
## 一 概述

* 使用AFN如何上传文件
* 上传文件中遇到的问题
* 上传文件示例

<!--more-->

## 二 使用AFN如何上传文件

### 2.1 使用AFN执行上传文件的过程

* 创建AFHTTPSessionManager
* SessionManager执行uploadTask方法，并传入：request、fromeFile、progress、completionHandler
* 调用uploadTask resume执行上传任务

### 2.2 普通Upload Task

#### 创建AFURLSessionManager

方法一

```
NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:configuration];
```

方法二

```
AFHTTPSessionManager *mgr=[AFHTTPSessionManager manager];
```

#### uploadTask方法

uploadTaskWithRequest:fromData

```
[manager uploadTaskWithRequest:request fromData:data progress:nil completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
        
}];
```

uploadTaskWithRequest:request fromFile

```
[manager uploadTaskWithRequest:request fromFile:filePath progress:nil completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
        
}];
```

### 2.3 Upload Task for a Multi-Part Request

uploadTaskWithStreamedRequest:request

```
[manager uploadTaskWithStreamedRequest:request progress:nil completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
        
}];
```

## 三 上传文件中遇到的问题

### 3.1 代码

```
NSURL *url=[NSURL URLWithString:@"http://localhost:8080//MJServer/upload"];
NSMutableURLRequest *request=[NSMutableURLRequest requestWithURL:url];
NSURL *filePath = [NSURL fileURLWithPath:@"/Users/zxc/Downloads/time.png"];
    
AFHTTPSessionManager *mgr=[AFHTTPSessionManager manager];
NSURLSessionUploadTask *task= [mgr uploadTaskWithRequest:request fromFile:filePath progress:nil completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
            NSLog(@"response=%@",response);
    
        }];
[task resume];
```

### 3.2 异常问题

```
2022-03-20 13:19:47.050585+0800 AFN-Demo1[16061:251330] GET method must not have a body
2022-03-20 13:19:47.051422+0800 AFN-Demo1[16061:251330] Task <20FD43EC-7573-4E29-BD40-D73EBB1561B2>.<1> finished with error [-1103] Error Domain=NSURLErrorDomain Code=-1103 "resource exceeds maximum size" UserInfo={NSLocalizedDescription=resource exceeds maximum size, NSErrorFailingURLStringKey=http://localhost:8080//MJServer/upload, NSErrorFailingURLKey=http://localhost:8080//MJServer/upload, _NSURLErrorRelatedURLSessionTaskErrorKey=(
    "LocalUploadTask <20FD43EC-7573-4E29-BD40-D73EBB1561B2>.<1>"
), _NSURLErrorFailingURLSessionTaskErrorKey=LocalUploadTask <20FD43EC-7573-4E29-BD40-D73EBB1561B2>.<1>, NSUnderlyingError=0x600000df2cd0 {Error Domain=kCFErrorDomainCFNetwork Code=-1103 "(null)"}}
2022-03-20 13:19:47.051836+0800 AFN-Demo1[16061:251263] response=(null)
```

## 四 上传文件示例

### 4.1 代码

```
 NSMutableDictionary *params=[NSMutableDictionary dictionary];
 params[@"username"]=@"张三";
 params[@"pwd"]=@"123";
 params[@"filename"]= @"time.png";
 params[@"fileFileName"]=@"time.png";

 NSMutableURLRequest *request = [[AFHTTPRequestSerializer serializer] multipartFormRequestWithMethod:@"POST" URLString:@"http://localhost:8080//MJServer/upload" parameters:params constructingBodyWithBlock:^(id<AFMultipartFormData> formData) {
        [formData appendPartWithFileURL:[NSURL fileURLWithPath:@"/Users/zxc/Downloads/time.png"] name:@"file" fileName:@"time.png" mimeType:@"image/png" error:nil];
    } error:nil];

NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:configuration];
    
    
NSURLSessionUploadTask *uploadTask;
uploadTask = [manager
                  uploadTaskWithStreamedRequest:request
                  progress:^(NSProgress * _Nonnull uploadProgress) {
        dispatch_async(dispatch_get_main_queue(), ^{});
    }
 completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
        if (error) {
            NSLog(@"Error: %@", error);
        } else {
            NSLog(@"%@ %@", response, responseObject);
        }
    }];
[uploadTask resume];
```

### 4.2 上传结果

```
2022-03-20 13:23:21.725034+0800 AFN-Demo1[16258:255639] <NSHTTPURLResponse: 0x6000004681e0> { URL: http://localhost:8080//MJServer/upload } { Status Code: 200, Headers {
	Transfer-Encoding = [
Identity
],
	Content-Type = [
application/json;charset=UTF-8
],
	Server = [
Apache-Coyote/1.1
],
	Date = [
Sun, 20 Mar 2022 05:23:21 GMT
]
} } {
    success = "\U4e0a\U4f20\U6210\U529f";
}
```

