---
title: NAS入门之——tinyMediaManager电影刮削器无法连接问题
categories:
  - 开发
  - J-NAS
  - 刮削器
tags:
  - 刮削器
abbrlink: '14719e65'
date: 2024-11-23 13:00:58
---
## 一 概述

* 现象
* 原因
* 解决办法

<!--more-->

## 二 现象

搜刮电视节目时显示如下异常信息

```
failed to connect to api.themoviedb.org/19.149.206:443
```

## 三 原因

* api.themoviedb.org是最新的API地址
* 国内网络无法访问导致

## 四 解决办法(添加api.tmdb.org映射)

### 4.1 打开dnschecker，检索api.tmdb.org

dnschecker: https://dnschecker.org/country/cn/

检索后

```
cnHangzhou, China
Aliyun Computing Co. Ltd
3.167.112.59
3.167.112.71
3.167.112.111
3.167.112.56
```

### 4.2 host添加映射

```
3.167.112.59	api.themoviedb.org
3.167.112.71	api.themoviedb.org
3.167.112.111	api.themoviedb.org
3.167.112.56	api.themoviedb.org
```

### 4.3 cmd终端执行指令刷新dns缓存

```
ipconfig/flushdns
```

### 4.4 测试效果

检索结果

## 五 参考

[最近api.themoviedb.org无法连接的问题解决](https://zhuanlan.zhihu.com/p/702428873)