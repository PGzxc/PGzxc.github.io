---
title: IOS开发之——AFN-基本使用(01)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - AFN
abbrlink: ea4e8fdf
date: 2022-03-19 16:56:54
---
## 一 概述

* 什么是AFN
* AFN入门介绍
* AFN使用示例

<!--more-->

## 二 什么是AFN

* 全称是AFNetworking，是对NSURLConnection、NSURLSession的一层封装
* 虽然运行效率没有ASI高，但是使用比ASI简单
* 在iOS开发中，使用比较广泛

## 三 AFN入门介绍

### 3.1 项目地址

[Github/AFNetworking](https://github.com/AFNetworking/AFNetworking)：https://github.com/AFNetworking/AFNetworking    

### 3.2 添加AFN依赖

在项目位置打开终端，执行如下指令

```
pod init
```

打开Podfile文件，添加SSZipArchive依赖

```
pod 'AFNetworking', '~> 4.0'
```

添加依赖更新

```
pod update
```

### 3.3 AFN使用

在引用位置添加依赖头文件

```
#import "AFNetworking.h"
```

一般请求如下：

* 执行Get请求返回JSON
* 执行Get请求返回XML
* 执行Get请求返回Data
* 执行Post请求

执行AFN请求的一般过程

* 创建AFHTTPSessionManager
* 设置请求返回类型：AFXMLParserResponseSerializer或者AFJSONResponseSerializer(默认)
* mgr GET/POST请求

## 四 AFN使用示例

### 4.1 执行Get请求返回JSON

#### 代码

```
-(void)HttpManagerGetJSON
{
    NSString *url=@"http://localhost:8080/MJServer/login";
    NSMutableDictionary *params=[NSMutableDictionary dictionary];
    params[@"username"]=@"123";
    params[@"pwd"]=@"123";
    
    AFHTTPSessionManager *mgr=[AFHTTPSessionManager manager];
    mgr.responseSerializer=[AFJSONResponseSerializer serializer];
    [mgr GET:url parameters:params headers:nil progress:^(NSProgress * _Nonnull downloadProgress) {
        NSLog(@"progress");
        } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
            NSLog(@"成功--%@",[responseObject class]);
            
        } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
            NSLog(@"失败");
        }];
}
```

#### 返回结果(类型)

```
2022-03-19 13:15:22.451162+0800 AFN-Demo1[53993:870418] 成功--__NSSingleEntryDictionaryI
```

### 4.2 执行Get请求返回XML

#### 代码

```
-(void)HttpManagerGetXML
{
    NSString *url=@"http://localhost:8080/MJServer/login";
    NSMutableDictionary *params=[NSMutableDictionary dictionary];
    params[@"username"]=@"123";
    params[@"pwd"]=@"123";
    params[@"type"]=@"XML";
    
    AFHTTPSessionManager *mgr=[AFHTTPSessionManager manager];
    mgr.responseSerializer=[AFXMLParserResponseSerializer serializer];
    
    [mgr GET:url parameters:params headers:nil progress:^(NSProgress * _Nonnull downloadProgress) {
        NSLog(@"progress");
        } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
            NSLog(@"成功--%@",[responseObject class]);
            
        } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
            NSLog(@"失败");
        }];
}
```

#### 返回结果

```
2022-03-19 13:16:57.090992+0800 AFN-Demo1[54087:872784] 成功--NSXMLParser
```

### 4.3 执行Get请求返回Data

#### 代码

```
-(void)HttpManagerGetData
{
    NSString *url=@"http://localhost:8080/MJServer/login";
    NSMutableDictionary *params=[NSMutableDictionary dictionary];
    params[@"username"]=@"123";
    params[@"pwd"]=@"123";
    params[@"type"]=@"XML";
    
    AFHTTPSessionManager *mgr=[AFHTTPSessionManager manager];
    mgr.responseSerializer=[AFHTTPResponseSerializer serializer];
    
    [mgr GET:url parameters:params headers:nil progress:^(NSProgress * _Nonnull downloadProgress) {
        NSLog(@"progress");
        } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
            NSLog(@"成功--%@",[responseObject class]);
            
        } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
            NSLog(@"失败");
        }];
}
```

#### 返回结果

```
2022-03-19 13:17:55.420995+0800 AFN-Demo1[54149:874520] 成功--_NSInlineData
```

### 4.4 执行Post请求

#### 代码

```
-(void)HttpManagerPost
{
    NSString *url=@"http://localhost:8080/MJServer/login";
    NSMutableDictionary *params=[NSMutableDictionary dictionary];
    params[@"username"]=@"123";
    params[@"pwd"]=@"123";
    
    AFHTTPSessionManager *mgr=[AFHTTPSessionManager manager];
    [mgr POST:url parameters:params headers:nil progress:nil success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        NSLog(@"成功--%@",responseObject);
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        NSLog(@"失败");
    }];
}
```

#### 返回结果

```
2022-03-19 13:19:02.932836+0800 AFN-Demo1[54222:876367] 成功--{
	success = 登录成功
}
```

