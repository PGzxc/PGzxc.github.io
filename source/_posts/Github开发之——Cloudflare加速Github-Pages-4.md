---
title: Github开发之——Cloudflare加速Github Pages(4)
categories:
  - 开发
  - I-版本控制
  - Github
tags:
  - Github
abbrlink: 14e8fa58
date: 2025-07-22 10:20:15
---
## 一 概述

```
使用Cloudflare可以实现网站加速，但使用Cloudflare提供的两种方式均失败了，原因如下描述，本文仅演示操作过程

1、Cloudflare连接域：未使用Custom domain(需购买域名-便宜的几元钱)
2、Cloudflare Pages：public静态页面大小超过了25M
```

<!--more-->

## 二 Cloudflare连接域(失败需要域名，仅演示)

### 2.1  创建 Cloudflare 账户

```
1、首先，访问 Cloudflare 官网，注册一个账号。
https://dash.cloudflare.com/

2、登录后，进入 Cloudflare 仪表板。
```

![][1]

### 2.2 添加网站到 Cloudflare

1、点击右上角的添加——>下拉列表选择`连接域`

![][2]

2、输入Github Page网站域名

```
1、可以时 GitHub Pages 网站域名，例如 username.github.io 

2、或者你自定义的域名（如 www.example.com）。
```

![][3]

### 2.3 选择计划

```
Cloudflare 会要求选择一个计划。对于大多数用户来说，选择 “Free Plan” 就足够了。
```

![][4]

### 2.4 修改 DNS 记录(仅供购买域名的操作)

1、Cloudflare 会扫描你的域名当前的 DNS 记录

```
Cloudflare 会扫描你的域名当前的 DNS 记录，显示现有的 DNS 配置。
你需要确保你的 GitHub Pages 站点的 DNS 记录指向 GitHub 的 IP 地址。
```

![][5]

2、确认是否添加DNS记录

```
1、如果是 username.github.io，你不需要修改任何 DNS 记录。


2、如果是自定义域名（如 www.example.com），你需要创建或编辑以下 DNS 记录：

2-1 A 记录：
-主机：@
-值：185.199.108.153
-TTL：自动

2-2 CNAME 记录：
-主机：www
-值：username.github.io
-TTL：自动

这些是 GitHub Pages 的 IP 地址和域名指向。GitHub 的 IP 地址可能会有多个，确保都添加。
```

![][6]

### 2.5 修改 NameServer 设置(仅供购买域名的操作)

```
1、Cloudflare 会提供一组 NameServer 地址，类似：
ns1.cloudflare.com
ns2.cloudflare.com

2、你需要登录到你域名的注册商控制面板，
将域名的 NameServer 设置成 Cloudflare 提供的这两组 NameServer
```

![][7]

### 2.6 启用CDN和缓存优化及强制启用HTTPS

```
用户点击查看相应按钮即可，已默认
```

![][8]

### 2.7 无效标识(未配置域名)

![][9]

## 三 Cloudflare Pages

### 3.1 依次点击：Workers—>Pages—>导入现有Git存储库

![][10]

### 3.2 关联要发布仓库

![][11]

### 3.3 选择仓库构建分支

![][12]

### 3.4 配置构建指令(静态网页，无需配置)

![][13]

### 3.5 等待构建结果(仓库大小超过25M构建失败)

![][14]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-main-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-add-site-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-page-set-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-plan-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-find-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-page-add-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-service-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-config-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-noeffect-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-page-add-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-page-append-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-page-choice-12.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-page-cmd-13.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-4-cloudflare-page-effect-14.png
