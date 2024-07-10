---
title: 接口开发之——PostMan模拟Strapi接口(认证方式下)访问
categories:
  - 开发
  - G-后端开发
  - 接口
tags:
  - postman
  - strapi
abbrlink: c4402abd
date: 2019-01-22 00:02:25
---

# 概念
我们使用PostMan模拟公共API接口或者配置参数(用户名/密码)的API接口，认证方式下的API如何配置呢？ 本文讲述使用PostMan模拟strapi接口(Bearer Token)下的访问及配置。


* 请求接口地址
* 发送请求方式(Post)
* 参数传递方式——json
* strapi的认证方式——Bearer
* 发送请求
* 请求结果

<!--more-->

# 示例

## 用户注册

* 官方示例  

	![][1]
### 请求接口地址

	http://localhost:1337/auth/local/register
### 请求方式
	Post请求

### 传递参数

	{
    	"email": "user01@qq.com",
    	"password": "user01",
    	"username": "user01"
	}

### 认证方式
用户注册时，可以不选中认证方式，此处选中Bearer Token没有影响  

![][2]
### 发送请求
Post请求的方式，Body下选择Json，把要请求的参数放在json中，发送给要请求的接口     
![][3]
### 返回结果
![][4]

## 用户登录

* 官方示例

	![][5]

### 请求接口地址

	http://localhost:1337/auth/local

### 请求方式
Post请求

### 传递参数

	{
    	"identifier": "user01",
    	"password": "user01"
	}
### 认证方式
Bearer Token    
![][6]
### 发送请求
Post请求的方式，Body下选择Json，把要请求的参数放在json中，发送给要请求的接口  
![][7]
### 返回结果
![][8]




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/user-register.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/user-register-authorization-type.png  
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/user-register-content.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/user-register-response.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/user-login-example.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/user-login-authorization.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/user-login-content.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/user-login-response.png
