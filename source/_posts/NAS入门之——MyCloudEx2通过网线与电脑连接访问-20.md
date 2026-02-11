---
title: NAS入门之——MyCloudEx2通过网线与电脑连接访问(20)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2
abbrlink: 84874c6b
date: 2026-02-11 19:35:29
---
## 一 概述

```
本文介绍：在没有路由器情况下NAS通过网线与电脑直连
```

<!--more-->

## 二 物理连接

```
1.用千兆网线一头插 My Cloud EX2 网口，另一头插 Mac 网口(无网口用 USB‑C 转 RJ45 网卡)
2.给 NAS 通电，等蓝色常亮(约 3 分钟)
```

## 三 访问NAS(3种方法)

### 3.1 方法 1：Finder 自动发现(推荐)

```
1.打开 Finder → 左侧共享
2.找到 MyCloudEX2Ultra（或 MyCloudEX2）→ 点击
3.选注册用户，输入 NAS 管理员账号密码 → 连接
```

### 3.2 方法 2：手动连接(最稳)

```
1.按 Command+K（或 Finder → 前往 → 连接服务器）
2.输入：smb://MyCloudEX2Ultra.local
3.连接 → 输入账号密码 → 选择共享文件夹
```

### 3.3 方法 3：网页管理后台

```
1.浏览器打开: http://MyCloudEX2Ultra.local
2.登录管理员账号，可管理文件、用户、设置
```

