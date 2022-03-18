---
title: IOS开发之——上传-上传封装(02)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 上传
abbrlink: f9765d32
date: 2022-03-18 09:19:39
---
## 一 概述

* 为何要进行上传封装
* 封装上传示例-上传文件

<!--more-->

## 二 为何要进行上传封装

* 每次调用上传功能，请求文件格式，请求参数等都一样，增加重复工作
* 只需要将完整的上传代码封装后，将文件格式、参数列表抽取出来作为参数传递，便可调用
* 以后每次上传，只需传递文件名，文件类型，参数列表便可

## 三 封装上传示例-上传文件

### 3.1 封装后代码

```
#import "ViewController.h"
#define FileBoundary @"Boundary"
#define NewLien @"\r\n"
#define Encode(str) [str dataUsingEncoding:NSUTF8StringEncoding]

@interface ViewController ()

@end

@implementation ViewController

- (NSString *)MIMEType:(NSURL *)url
{
    // 1.创建一个请求
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    // 2.发送请求（返回响应）
    NSURLResponse *response = nil;
    [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:nil];
    // 3.获得MIMEType
    return response.MIMEType;
}

- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event
{
    [self upload];
}
- (void)upload
{
    // 非文件参数
    NSDictionary *params = @{
                             @"username" : @"李四",
                             @"pwd" : @"123",
                             @"age" : @30,
                             @"height" : @"1.55"
                             };
    NSURL *url = [[NSBundle mainBundle] URLForResource:@"autolayout" withExtension:@"txt"];
    NSData *data = [NSData dataWithContentsOfURL:url];
    NSString *MIMEType = [self MIMEType:url];
    [self upload:@"test.txt" mimeType:MIMEType fileData:data params:params];
}

- (void)upload:(NSString *)filename mimeType:(NSString *)mimeType fileData:(NSData *)fileData params:(NSDictionary *)params
{
    // 1.请求路径
    NSURL *url = [NSURL URLWithString:@"http://localhost:8080/MJServer/upload"];
    
    // 2.创建一个POST请求
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    request.HTTPMethod = @"POST";
    
    // 3.设置请求体
    NSMutableData *body = [NSMutableData data];
    
    // 3.1.文件参数
    [body appendData:Encode(@"--")];
    [body appendData:Encode(FileBoundary)];
    [body appendData:Encode(NewLien)];
    
    NSString *disposition = [NSString stringWithFormat:@"Content-Disposition: form-data; name=\"file\"; filename=\"%@\"", filename];
    [body appendData:Encode(disposition)];
    [body appendData:Encode(NewLien)];
    
    NSString *type = [NSString stringWithFormat:@"Content-Type: %@", mimeType];
    [body appendData:Encode(type)];
    [body appendData:Encode(NewLien)];
    
    [body appendData:Encode(NewLien)];
    [body appendData:fileData];
    [body appendData:Encode(NewLien)];
    
    // 3.2.非文件参数
    [params enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop) {
        [body appendData:Encode(@"--")];
        [body appendData:Encode(FileBoundary)];
        [body appendData:Encode(NewLien)];
        
        NSString *disposition = [NSString stringWithFormat:@"Content-Disposition: form-data; name=\"%@\"", key];
        [body appendData:Encode(disposition)];
        [body appendData:Encode(NewLien)];
        
        [body appendData:Encode(NewLien)];
        [body appendData:Encode([obj description])];
        [body appendData:Encode(NewLien)];
    }];
    
    // 3.3.结束标记
    [body appendData:Encode(@"--")];
    [body appendData:Encode(FileBoundary)];
    [body appendData:Encode(@"--")];
    [body appendData:Encode(NewLien)];
    
    request.HTTPBody = body;
    
    // 4.设置请求头(告诉服务器这次传给你的是文件数据，告诉服务器现在发送的是一个文件上传请求)
    NSString *contentType = [NSString stringWithFormat:@"multipart/form-data; boundary=%@", FileBoundary];
    [request setValue:contentType forHTTPHeaderField:@"Content-Type"];
    
    // 5.发送请求
    [NSURLConnection sendAsynchronousRequest:request queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:nil];
        NSLog(@"%@", dict);
    }];
}
@end
```

### 3.2 上传结果

桌面上有一个test.txt文件
