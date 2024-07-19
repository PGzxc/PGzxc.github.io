---
title: Mac系统开发之——终端代理
categories:
  - 系统
  - Mac
tags:
  - 终端代理
abbrlink: '3e251479'
date: 2024-07-19 14:44:13
---
## 一 概述

* 终端设置代理
* 移除代理

<!--more-->

## 二 终端设置代理

```
//单独设置
export http_proxy=http://127.0.0.1:7890;
export https_proxy=http://127.0.0.1:7890;
//全部设置
export all_proxy=http://127.0.0.1:7890;
```

说明：7890端口为Clash端口，其他代理根据相应端口来设置

## 三 移除代理

```
unset http_proxy
unset https_proxy
unset all_proxy
```

