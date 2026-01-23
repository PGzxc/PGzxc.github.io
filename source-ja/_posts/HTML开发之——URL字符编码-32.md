---
title: HTML开发之——URL字符编码(32)
categories:
  - 开发
  - C-前端开发
  - HTML
tags:
  - HTML
abbrlink: 1ca6274b
date: 2020-08-28 23:01:35
---
## 一 概述

URL编码会将字符转换为可通过因特网传输的格式

<!--more-->

## 二 URL—统一资源定位器

Web浏览器通过URL从web服务器请求页面

URL是网页的地址，比如[http://www.w3school.com.cn][1]

## 三 URL编码

URL只能使用ASCII字符集来通过因特网进行发送

用于URL常常会包含ASCII集合之外的字符，URL必须转换为有效的ASCII格式

URL编码使用"%"其后跟随两位的十六进制数来替换非ASCII字符

URL不能包含空格。URL编码通常使用+来替换空格

## 四 URL 编码示例

| 字符 | URL编码 |
| :--: | :-----: |
|  €   |   %80   |
|  £   |   %A3   |
|  ©   |   %A9   |
|  ®   |   %AE   |
|  À   |   %C0   |
|  Á   |   %C1   |
|  Â   |   %C2   |
|  Ã   |   %C3   |
|  Ä   |   %C4   |
|  Å   |   %C5   |


[1]:http://www.w3school.com.cn

