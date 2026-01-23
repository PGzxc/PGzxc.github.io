---
title: Hexo站点建设之——Coding Pages 申请 SSL 证书错误
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: '73040432'
date: 2020-08-15 18:37:30
---
## 一 现象

Hexo博客在进行Coding Pages绑定域名时显示如下错误：

```
acme:error:unauthorized: During secondary validation: Invalid response from http://pgzxc.com/.well-known/acme-challenge/u0F-eNkNn958JbxhnH0lyhGxS6d_FMLHWmIiiwF8P5k [185.199.108.153]: "<!DOCTYPE html>\n<html>\n <head>\n <meta http-equiv=\"Content-type\" content=\"text/html; charset=utf-8\">\n <meta http-equiv=\"Co"
```

<!--more-->
![][1]

## 二 原因分析

 这种错误一般是 hexo 博客双线部署到 GitHub Pages 和 Coding Pages 过程中出现的，并且已经在域名 DNS 配置好了 GitHub 的域名解析，这种情况下，在验证域名所有权时会定位到 Github Pages 的主机上导致 SSL 证书申请失败 

## 三 解决办法

 先去域名 DNS 把 GitHub 的解析暂停掉，然后再重新申请 SSL 证书，等待申请成功再恢复 GitHub 的解析 

![][2]

![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-bang-error.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-github-pause.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/coding-yuming-bang-success.png

