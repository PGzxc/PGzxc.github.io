---
title: IOS开发之——网络-HTTP请求(4)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 网络
abbrlink: 3d5cc9ed
date: 2022-03-03 22:09:46
---
## 一 概述

* HTTP网络请求中的几个概念
*  IOS中发送HTTP请求
* HTTP请求示例

<!--more-->

## 二 HTTP网络请求中的几个概念
### 2.1 URL

####  什么是URL

* URL的全称是Uniform Resource Locator，统一资源定位符
* 通过1个URL，能找到互联网上唯一的1个资源
* URL就是资源的地址、位置，互联网上的每个资源都有唯一的URL

####  URL的基本格式

```
协议://主机地址/路径
http://192.168.0.1/img/a.gif
```

* 协议：不同的协议，代表着不同的资源查找方式、资源传输方式
* 主机地址：存放资源的主机的IP地址(域名)
* 路径：资源在主机中的具体位置

### 2.2 ULR中常见的协议

####  HTTP

* 超文本传输协议，访问的是最远程的网络资源，格式是`http://`
* http协议是在网络开发中最常用的协议

#### file

访问的是本地计算机上的资源，格式是file://(不用加主机地址)

#### mailto

访问的是电子邮件地址，格式是mailto:

#### FTP

访问的是共享主机的文件资源，格式是ftp://

### 2.3 HTTP协议简介

#### 不管是移动客户端还是PC端，访问远程的网络资源经常使用HTTP协议

* 访问百度主页：https://www.baidu.com
* 获取新浪的微博数据
* 获取大众点评的团购数据

思考：

* 客户端该传什么格式的数据给服务器？服务器才能看懂
* 服务器该返回什么格式的数据给客户端？客户端才能看懂
* 两边要怎样传输数据才能有效沟通？

####  HTTP协议的作用

* HTTP的全称是Hypertext Transfer Protocol，超文本传输协议
* 规定客户端和服务器之间的数据传输格式
* 让客户端和服务器能有效地进行数据沟通

### 2.4 HTTP协议的特点(为什么选择HTTP)

#### 简单快速

因为HTTP协议简单，所以HTTP服务器的程序规模小，因而通信速度很快

#### 灵活

HTTP允许传输任意类型的数据

#### HTTP0.9和1.0使用非持续连接

限制每次连接只处理一个请求，服务器对客户端的请求做出相应后，马上断开连接，这种方式可以节省传输时间。

### 2.5 HTTP的基本通信过程

完整的HTTP通信可以分为2大步骤

* 请求：客户端向服务器所要数据
* 响应：服务器返回客户端响应的数据

## 三 IOS中发送HTTP请求

### 3.1 在IOS中，常见的发送HTTP请求的方案

#### 苹果原声自带

* NSURLConnection：用法简单，最古老最经典最直接的一种方案
* NSURLSession：IOS 7新出的技术，功能比NSURLConnection更加强大
* CFNetwork：NSURL的底层，纯C语言

#### 第三方框架

* ASIHttpRequest：外号“HTTP终结者”，功能极其强大，可惜早已停止更新
* AFNetwroking：简单易用，提供了基本够用的常用功能，维护和使用者多
* MKNetworkKit：简单易用，维护和使用者少

####  建议

为了提高开发效率，企业开发用的基本是第三方框架

### 3.2 常用类

####  NSURL

请求地址

#### NSURLRequest

一个NSURLRequest对象就代表一个请求，它包含信息有

* 一个NSURL对象
* 请求方法、请求头、请求体
* 请求超时
* 其他

#### NSMutableURLRequest

NSURLRequest的子类

####  USURLConnection

* 负责发送请求，建立客户端和服务器的连接
* 发送NSURLRequest的数据给服务器，并收集来自服务器的响应数据

### 3.3  NSURLConnection的使用步骤

使用NSURLConnection发送请求的步骤简单

* 创建一个NSURL对象，设置请求路径
* 传入NSURL对象，设置请求路径
* 传入NSURL创建一个NSURLRequest对象，设置请求头和请求体
* 使用NSURLConnection发送NSURLRequest

![][1]

## 四 HTTP请求示例

### 4.1 代码

```
#import "ViewController.h"
#import "MBProgressHUD+MJ.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UITextField *username;

@property (weak, nonatomic) IBOutlet UITextField *pwd;

@end

@implementation ViewController


- (IBAction)login:(UIButton *)sender
{
    //1-用户名
    NSString *usernameText=self.username.text;
    if (usernameText.length==0) {
        [MBProgressHUD showError:@"请输入用户名"];
        return;
    }
    //2-密码
    NSString  *pwdText=self.pwd.text;
    if (pwdText.length==0) {
        [MBProgressHUD showError:@"请输入密码"];
        return;
    }
    //3-发送用户名和密码给服务器
    //NSLog(@"发送用户名和密码给服务器");
    NSString *urlStr=[NSString stringWithFormat:@"http://localhost:8080/MJServer/login?username=%@&pwd=%@",usernameText,pwdText];
    NSURL *url=[NSURL URLWithString:urlStr];
    //创建一个请求
    NSURLRequest *request=[NSURLRequest requestWithURL:url];
    //发送一个同步请求(在主线程发送请求)
    NSData *data=[NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
    NSLog(@"%@",data);
    
}
@end
```

### 4.2 结果
#### 客户端
![][2]
#### 服务器端

```
客户端信息：
请求方式:GET, ip:0:0:0:0:0:0:0:1, 环境:01-http%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82/1 CFNetwork/1327.0.4 Darwin/21.3.0
用户名=123, 密码=123
```

#### 客户端打印

```
2022-03-03 21:46:50.819868+0800 01-http网络请求[14274:138197] {length = 26, bytes = 0x7b227375 63636573 73223a22 e799bbe5 ... e68890e5 8a9f227d }
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-network-nsurlconnection-process.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-network-http-app-request-view.png
