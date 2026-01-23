---
title: HTML开发之——URL(31)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: acd1d703
date: 2020-08-28 23:00:26
---
## 一 概述

URL也被成为网址

URL可以由单词组成，比如"w3school.com.cn"，或者是因特网协议(IP)地址：192.168.1.253。大多数人在网上冲浪时，会键入网址的域名，因为名称比数字容易记忆

<!--more-->

## 二 URL-Uniform Resource Locator

当您点击HTML页面中的某个链接时，对应的\<a>标签指向万维网上的一个地址。

统一资源定位符(URL)用于定位万维网上的文档(或其他数据)

网址，比如[http://www.w3school.com.cn/html/index.asp][1]，遵守以下的语法规则：

```
scheme://host.domain:port/path/filename
```

解释：

* scheme—定义因特网服务的类型。最常见的类型是http
* host—定义域主机(http的默认主机是www)
* domain—定义因特网域名，比如w3school.com.cn
* :port—定义主机上的端口号(http的默认端口号是80)
* path—定义服务器上的路径(如果省略，则文档必须位于网站的根目录中)
* filename—定义文档/资源的名称

**编者注：**URL的英文全称是Uniform Resource Locator，中文也译为"统一资源定位符"

## 三 URL Schemes

以下是其中一些最流行的scheme：

| Scheme |        访问        |              用于               |
| :----: | :----------------: | :-----------------------------: |
|  http  |   超文本传输协议   | 以http://开头的普通网页。不加密 |
| https  | 安全超文本传输协议 |   安全网页。加密所有信息交换    |
|  ftp   |    文件传输协议    |   用于将文件下载或上传至网站    |
|  file  |                    |        您计算机上的文件         |



[1]:http://www.w3school.com.cn/html/index.asp