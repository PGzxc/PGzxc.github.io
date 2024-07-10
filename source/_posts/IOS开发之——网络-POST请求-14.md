---
title: IOS开发之——网络-POST请求(14)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 网络
abbrlink: 75f5ba34
date: 2022-03-09 09:10:32
---
## 一 概述

* HTTP请求
* HTTP通信过程-请求及响应
* HTTP- POST请求示例

<!--more-->

## 二 HTTP请求

### 2.1 发送HTTP请求的方法

#### 8种HTTP请求方法

在HTTP/1.1协议中，定义了8种发送http请求的方法，分别是：GET、POST、OPTIONS、HEAD、PUT、DELETE、TRACE、CONNECT、PATCH

#### 根据HTTP协议的设计初衷，不同的方法对资源有不同的操作方式

* PUT：增
* DELETE：删
* POST：改
* GET：查

### 2.2 GET和POST对比

GET和POST的主要区别表现在数据传递上

#### GET

* 在请求URL后面以<font color=red>?</font>的形式跟上发送服务器的参数，多个参数之间用<font color=red>&</font>隔开
* 由于浏览器和服务器对URL长度有限制，因此在URL后面附带的参数是有限制的，通常不能超过1KB

#### POST

* 发给服务器的参数全部放在请求体中
* 理论上，POST传递的数据没有限制(具体还得看服务器的处理能力)

### 2.3 GET和POST的选择

* 如果要传递大量数据，比如文件上传，只能用POST请求
* GET的安全性比POST要差些，如果包含机密\敏感信息，建议用POST
* 如果仅仅是索取数据(数据查询)，建议使用GET
* 如果是增加、修改、删除数据，建议使用POST

## 三 HTTP通信过程-请求及响应

### 3.1 请求及响应示例

![][1]

### 3.2 请求说明

HTTP协议规定：1个完整的由客户端发给服务器的HTTP请求中包含以下内容

#### 请求行

包含了请求方法、请求资源路径、HTTP协议版本

```
POST /MJServer/login HTTP/1.1
```

#### 请求头

包含了对客户端的环境描述、客户端请求的主机地址等信息

```
Host: localhost:8080  //客户端想访问的服务器主机地址
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36 //客户端的类型，客户端的软件环境
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9 //客户端所能接收的数据类型
Accept-Language: zh-CN,zh;q=0.9 //客户端的语言环境
Accept-Encoding: gzip, deflate, br //客户端支持的数据压缩格式
```

#### 请求体

客户端发给服务器的具体数据，比如文件数据(Payload)

```
username=123&pwd=123&method=post&type=JSON //Form Data
```

### 3.3 响应说明

客户端向服务器发送请求，服务器应当做出响应，即返回数据给客户端。HTTP协议规定：1个完整的HTTP响应中应包含以下内容：

#### 状态行

包含了HTTP协议版本、状态码、状态英文名称

```
HTTP/1.1 200 OK
```

#### 响应头

包含了对服务器的描述、对返回数据的描述

```
Server: Apache-Coyote/1.1   //服务器的类型
Content-Type: application/json;charset=UTF-8  /返回数据的类型
Transfer-Encoding: chunked   //返回数据的长度
Date: Tue, 08 Mar 2022 14:11:38 GMT  //响应的时间
```

#### 实体内容

服务器返回给客户端的具体数据，比如文件数据(Response)

```
{"success":"登录成功"}
```

### 3.4 HTTP通信过程

![][2]

## 四 HTTP- POST请求示例

### 4.1 请求过程

* 将GET请求中的NSURLRequest替换为NSMutableURLRequest
* 设置网络请求方法属性request.HTTPMethod=@"POST"
* 将请求参数放到NSString类型的param中，并通过dataUsingEncoding:NSUTF8StringEncoding转换为NSData
* 将NSData赋值给request.HTTPBody
* 发送网络请求

### 4.2 示例

```
  NSString *urlStr=[NSString stringWithFormat:@"http://localhost:8080/MJServer/login"];
  NSURL *url=[NSURL URLWithString:urlStr];
  //创建一个请求
  NSMutableURLRequest *request=[NSMutableURLRequest requestWithURL:url];
  request.HTTPMethod=@"POST";
  //设置请求头信息
  [request setValue:@"aaa" forHTTPHeaderField:@"User-Agent"];
  NSString *param=[NSString stringWithFormat:@"username=%@&pwd=%@",usernameText,pwdText];
  request.HTTPBody=[param dataUsingEncoding:NSUTF8StringEncoding];
  NSLog(@"begin---");
  //发送一个同步请求(在主线程发送请求)
  NSOperationQueue *queue=[NSOperationQueue mainQueue];
  [NSURLConnection sendAsynchronousRequest:request queue:queue completionHandler:^(NSURLResponse * _Nullable response, NSData * _Nullable data, NSError * _Nullable connectionError) {
     NSLog(@"请求完成----");
     if (connectionError||data==nil) {
         [MBProgressHUD showError:@"请求失败"];
         return;
     }
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
  }];
```

 

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-request-response-process.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-http-client-server-request.png

