---
title: IOS开发之——网络-请求超时、URL转码(15)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 网络
abbrlink: 694d4e77
date: 2022-03-10 09:04:16
---
## 一 概述

* 常见响应状态码
* 设置请求超时时间
* GET请求时，包含中文时执行URL转码

<!--more-->

## 二 常见响应状态码

| 状态码 |       英文名称        |               中文描述               |
| :----: | :-------------------: | :----------------------------------: |
|  200   |          OK           |               请求成功               |
|  400   |      Bad Request      | 客户端请求的语法错误，服务器无法解析 |
|  404   |       Not Found       |  服务器无法根据客户端的请求找到资源  |
|  500   | Internal Server Error |     服务器内部错误，无法完成请求     |

## 三 设置请求超时时间

### 3.1 说明

* 设置请求超时时间是NSMutableURLRequest中的一个属性
* 请求超时时间的属性为timeoutInterval
* 默认请求超时时长为60s

### 3.2 示例

```
NSMutableURLRequest *request=[NSMutableURLRequest requestWithURL:url];
//5秒后请求超时(默认60s)
request.timeoutInterval=5;
```

## 四 GET请求时，包含中文时执行URL转码

### 4.1 现象(请求包含中文时URL为空)

![][1]

### 4.2 转码

```
NSString *urlStr=[NSString stringWithFormat:@"http://localhost:8080/MJServer/login?username=%@&pwd=%@",usernameText,pwdText];
//URL中不能包含中文，得对中文进行转码
urlStr=[urlStr stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
NSURL *url=[NSURL URLWithString:urlStr];
//创建一个请求
NSMutableURLRequest *request=[NSMutableURLRequest requestWithURL:url];
```

### 4.3 转码后执行请求
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-request-url-nil.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-request-url-encoding.png