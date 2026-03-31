---
title: VPN网络服务之——cliproxy+全加速实战(5)
categories:
  - 工具
  - 网络工具
  - VPN
tags:
  - VPN
  - cliproxy
abbrlink: 52fc864e
date: 2026-03-31 15:26:59
---
## 一 概述

```
完成后可以：

 -git clone 秒下载
 -npm install 不再卡
 -docker pull 稳定拉镜像
 -所有 CLI 工具自动走代理
```

<!--more-->

## 二 cliproxy相关概念

### 2.1 什么是 cliproxy？

```
1. 一句话：
cliproxy = 让“命令行工具”走代理的方案

2. 注意：

它不是一个“单独软件”，而是：环境变量 + 本地代理端口（Clash）

3.架构：

CLI工具（git / npm / docker）
        ↓
cliproxy（环境变量）
        ↓
Clash（127.0.0.1:7890）
        ↓
Xray（VPS）
        ↓
      互联网
```

### 2.2 核心原理

```
1.关键两个变量：
http_proxy
https_proxy

2.设置：
export http_proxy=http://127.0.0.1:7890

3. 系统行为变成：
所有HTTP请求 → 走Clash → 走代理
```

## 三 配置及使用

### 3.1 最简单用法(立即生效)

```
1.Linux / Mac
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890

2.Windows（PowerShell）
$env:http_proxy="http://127.0.0.1:7890"
$env:https_proxy="http://127.0.0.1:7890"

3.验证：
curl ip.sb

4.结果：
返回 VPS IP = 成功 
```

### 3.2 Git 加速(最常用)

```
1.全局代理：
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

2.取消代理：
git config --global --unset http.proxy

3.验证：
git clone https://github.com/xxx/xxx.git
```

### 3.3 NPM / Node.js 加速

```
1.设置代理：
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890

2.推荐搭配（国内镜像）：
npm config set registry https://registry.npmmirror.com

3. 效果：
-更稳定
-更快
```

### 3.4 Docker 加速

```
1.配置文件：
nano ~/.docker/config.json

2.添加：
{
  "proxies": {
    "default": {
      "httpProxy": "http://127.0.0.1:7890",
      "httpsProxy": "http://127.0.0.1:7890"
    }
  }
}

3.重启 Docker：
systemctl restart docker

4.测试：
docker pull nginx
```

## 四 进阶

### 4.1 一键开关代理(强烈推荐)—写一个脚本

```
1.开启代理：
alias proxy_on="export http_proxy=http://127.0.0.1:7890 && export https_proxy=http://127.0.0.1:7890"

2.关闭代理：
alias proxy_off="unset http_proxy && unset https_proxy"

3.使用：
proxy_on
proxy_off

4.说明：
非常适合开发切换
```

### 4.2 只让某个命令走代理(高级用法)

```
1. 不影响全局：
http_proxy=http://127.0.0.1:7890 curl google.com

2. 或：
proxychains curl google.com
```

## 五 常见问题

### 5.1 curl 不走代理

```
原因：

-没设置环境变量
-Clash 没开
```

### 5.2 Docker 不生效

```
原因：

-没重启 Docker
-配置路径错误
```

### 5.3 Git 仍然慢

```
1.原因：
使用了 SSH clone（未走 HTTP）

2.解决：
git clone https://xxx.git
```

## 六 总结

### 6.1 完整开发代理链路

```
CLI工具
   ↓
cliproxy（环境变量）
   ↓
Clash
   ↓
Xray
   ↓
互联网
```

### 6.2 本篇内容

```
-cliproxy 本质 = 环境变量
-所有 CLI 工具都支持它
-开关控制非常重要
```

