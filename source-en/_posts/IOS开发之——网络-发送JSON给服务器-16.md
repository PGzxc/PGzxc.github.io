---
title: IOS开发之——网络-发送JSON给服务器(16)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 网络
abbrlink: 7958b31
date: 2022-03-10 09:05:26
---
## 一 概述

* 如何发送JSON给服务器
* 发送JSON示例

<!--more-->

## 二 如何发送JSON给服务器

### 2.1 使用POST请求

一定要使用POST请求

### 2.2 设置请求头

```
[request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
```

### 2.3 设置JSON数据为请求体

```
request.HTTPBody=json;
```

## 三 发送JSON请求示例

### 3.1 示例说明

点击屏幕向服务器发送JSON请求

### 3.2 代码

```
#import "ViewController.h"
#import "MBProgressHUD+MJ.h"

@interface ViewController ()
@end

@implementation ViewController

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    //1-URL
    NSURL *url=[NSURL URLWithString:@"http://localhost:8080/MJServer/order"];
    //2-请求
    NSMutableURLRequest *request=[NSMutableURLRequest requestWithURL:url];
    //3-请求方法
    request.HTTPMethod=@"POST";
    //4-设置请求体(请求参数)
    NSDictionary *orderInfo=@{
        @"shop_id":@"123456",
        @"shop_name":@"书本",
        @"user_id":@"9527"
    };
    NSData *json=[NSJSONSerialization dataWithJSONObject:orderInfo options:NSJSONWritingPrettyPrinted error:nil];
    request.HTTPBody=json;
    //5-设置请求头：这次请求的数据不再是普通的参数，而是一个JSON数据
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    //5-发送请求
    [NSURLConnection sendAsynchronousRequest:request queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse * _Nullable response, NSData * _Nullable data, NSError * _Nullable connectionError) {
        if (data==nil||connectionError) return;
        NSDictionary *dict=[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:nil];
        NSString *error=dict[@"error"];
        NSString *success=dict[@"success"];
        if (error) {
            [MBProgressHUD showError:error];
        }else{
            [MBProgressHUD showSuccess:success];
        }
    }];
}
@end
```

### 3.3 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-send-json-service.gif