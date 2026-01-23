---
title: Android开发之——数据优化ProtoBuf
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - ProtoBuf
abbrlink: 91bcd8c1
date: 2018-06-27 14:29:24
---
# 前言
protobuf，全称：Google Protocol Buffer，是Google开源的一种轻便高效的结构化数据存储格式，可以用于结构化数据的串行化，也称作序列化，主要用于数据存储或是RPC数据交换，支持多语言，可拓展。   
本文主要讲述Proto的本地实例化和网络实例化。     
<!--more-->

# 项目
protobuf Github： [Git地址][1]    
protobuf (Java)： [Protobuf java][2]

# 配置
## 项目配置
###  在项目根目录的build.gradle中配置protobuf
![][3]  
### 在app目录下的build.gradle中配置protobuf
#### 配置plugin插件
![][4]    
#### 配置protobuf Task
![][5]  
#### 配置依赖库  
![][6]  

### 安装Protobuf Support
Protobuf Support支持 Protobuf 高亮显示  
![][7]  

### 新建ProtoBuf数据

#### 新建proto文件夹，在文件夹下新建文件，后缀名为.proto  
![][8]  

#### 按照下列格式设置数据
##### syntax = "proto3";
##### package 包名;
##### message 数据 
1. 数据类型  
	![][9]  
2. 必须初始化，且必须为整数
	![][10]  

### 重新编译项目
#### 执行Build->Rebuild Project 
若项目不经过编译，无法在项目中引用Proto文件
#### 查看编译后Proto文件 
编译后可在app->build->generated->source->proto查看编译后的文件   
![][11]

# 使用
Proto使用，包括直接使用本地的Proto数据和访问网络上的Proto数据 
## 本地Proto数据
### 查看Proto数据
经过build project后，输入Proto数据即可查看
![][12]  
### 使用Proto数据
![][13]
### 分析
我们的Proto变成了内部类，为何使用Build生成数据，请自行查看源码  
![][14]
## 网络Proto数据
### 使用返回Proto类型的接口
本来想使用RAP2来模拟接口数据，奈何不支持，网上找了一条返回Proto的接口
![][15] 
Postman请求结果  
![][16]  
### 配置网络
此前的Gson换成了Proto  
![][17] 
![][18]  
### 使用
![][19] 
### 效果  
![][20] 

# 参考：  
[参考源码][21] 


[1]: https://github.com/google/protobuf
[2]: https://github.com/google/protobuf/tree/master/java
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-pro-build-gradle.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-app-build-gradle.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-app-build-gradle-protoc.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-app-build-gradle-depend.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/protobuf-support.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-new-file.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-data-type.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-data-error.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-generate.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-local-prefix.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-local-use.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-local-build.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-net-work.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-postman.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-net-retrofit.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-net-service.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto-net-use.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/proto.gif
[21]: https://github.com/PGzxc/Protobuf