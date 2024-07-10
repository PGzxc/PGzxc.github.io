---
title: IOS开发之——网络-同步请求及JSON解析(9)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 网络
abbrlink: 8ffe9e1b
date: 2022-03-06 12:29:17
---
## 一 概述

* NSURLConnection 通过sendSynchronousRequest发送同步请求
* 同步请求后得到NSData类型数据
* 通过自带的NSJSONSerialization 调用JSONObjectWithData，将NSData转换为JSON数据

<!--more-->

## 二 同步请求示例

### 2.1 代码

```
NSString *urlStr=[NSString stringWithFormat:@"http://localhost:8080/MJServer/login?username=%@&pwd=%@",usernameText,pwdText];
NSURL *url=[NSURL URLWithString:urlStr];
//创建一个请求
NSURLRequest *request=[NSURLRequest requestWithURL:url];
//发送一个同步请求(在主线程发送请求)
NSData *data=[NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
NSLog(@"%@",data);
```

### 2.2 输出结果

#### 服务器端

```
客户端信息：
请求方式:GET, ip:0:0:0:0:0:0:0:1, 环境:01-http%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82/1 CFNetwork/1327.0.4 Darwin/21.3.0
用户名=123, 密码=121
```

#### xcode打印结果(NSData)

```
2022-03-06 11:20:22.985056+0800 01-http网络请求[14893:188822] {length = 27, bytes = 0x7b226572 726f7222 3a22e5af 86e7a081 ... e6ada3e7 a1ae227d }
```

## 三 JSON

### 3.1 什么是JSON

* JSON是一种轻量级的数据格式，一般用于数据交互
* 服务器返回给客户端的数据，一般都是JSON格式或者XML格式(文件下载除外)

### 3.2 JSON格式示例

```
{"name":"jack","age":10}
{"name":["jack","rose","jim"]}
```

说明：

* JSOn的格式很像OC中的字典和数组
* 标准的JSON格式的注意点：key必须用双引号

### 3.3 如何对服务器返回的数据处理

* 要想从JSON中挖掘出具体的数据，得对JSON进行解析
* JSON转换为OC数据类型

### 3.4 JSON-OC转换对照表

|     JSON      |      OC      |
| :-----------: | :----------: |
|   大括号{}    | NSDictionary |
|   中括号[]    |   NSArray    |
|   双引号“”    |   NSString   |
| 数字 10、10.8 |   NSNumber   |

### 3.5 JSON解析方案

#### 在IOS中，JSON的常见解析方案有4种

* 第三方框架：JSONKit、SBJson、TouchJSON(性能从左到右，越差)
* 苹果原生(自带)：NSJSONSerialization(性能最好)

#### NSJSONSerialization的常见方法

JSON数据——>OC对象

```
+(id)JSONObjectWithData:(NSData *)data options:(NSJSONReadingOptions)opt error:(NSError **)error;
```

OC对象——>JSON数据

```
+(NSData *)dataWithJSONObject:(id)obj options:<(NSJSONWritingOptions)opt error:(NSError **)error;
```

## 四 JSON解析示例

### 4.1 服务器请求

#### 请求地址

```
http://localhost:8080/MJServer/login
```

#### 参数

```
username=123&pwd=123
```

#### 返回结果情况

```
 {"error":"用户名不存在"}
 {"error":"密码不正确"}
 {"success":"登陆成功"}
```

### 4.2 服务器请求及解析

```
    //3-发送用户名和密码给服务器
    //NSLog(@"发送用户名和密码给服务器");
    NSString *urlStr=[NSString stringWithFormat:@"http://localhost:8080/MJServer/login?username=%@&pwd=%@",usernameText,pwdText];
    NSURL *url=[NSURL URLWithString:urlStr];
    //创建一个请求
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    //发送一个同步请求(在主线程发送请求)
    NSData *data=[NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
    NSLog(@"解析前NSData数据：%@",data);
    
    //解析服务器返回到JSON数据
    NSDictionary *dict= [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:nil];
    //{"error":"用户名不存在"}
    //{"error":"密码不正确"}
    //{"success":"登陆成功"}
    NSLog(@"解析后数据：%@",dict);
    NSString *error=dict[@"error"];
    if (error) {
        [MBProgressHUD showError:error];
    }else{
        NSString *successs=dict[@"success"];
        [MBProgressHUD showSuccess:successs];
    }
```

### 4.3 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-json-sync-parse.gif