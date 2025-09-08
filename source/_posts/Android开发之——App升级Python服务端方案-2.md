---
title: Android开发之——App升级Python服务端方案(2)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
  - App升级
abbrlink: d138e309
date: 2025-09-08 13:21:50
---
## 一 概述

```
本文介绍：Flask服务器提供一个JSON接口/update.json
 -项目下：server.py(启动端)和app-release.apk(更新包)
 -访问方式：
  --手机访问：http://192.168.8.212:5000/app-release.apk 可以直接下载。
  --接口：http://192.168.8.212:5000/update.json
 -局域网访问 
   --手机和电脑必须在同一 Wi-Fi/LAN
   --Flask 使用 host="0.0.0.0" 允许局域网访问
```

<!--more-->

## 二 准备工作

### 2.1 安装软件

```
Python
```

### 2.2 安装依赖

```
pip install flask
```

## 三 服务端源码

### 3.1 创建文件

```
server.py
```

### 3.2 源码(将192.168.8.212修改为自己的IP)

```
from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__)

APK_FILE = "app-release.apk"  # APK 文件名
APK_DIR = os.path.abspath(".") # APK 所在目录，这里假设和 app.py 同目录

@app.route("/update.json")
def update():
    return jsonify({
        "Code": 0,
        "Msg": "",
        "UpdateStatus": 1,   # 1=有更新, 0=无更新
        "VersionCode": 2,
        "VersionName": "1.1",
        "ModifyContent": "1. 修复若干 bug\n2. 优化性能",
        "DownloadUrl": f"http://192.168.8.212:5000/{APK_FILE}",
        "ApkSize": 10240,
        "ForceUpdate": True  # true=强制更新, false=可选更新
    })

@app.route(f"/{APK_FILE}")
def download_apk():
    return send_from_directory(APK_DIR, APK_FILE, as_attachment=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

## 四 启动服务及访问

### 4.1 启动指令

```
python server.py
```

### 4.2 访问地址

```
http://127.0.0.1:5000/update.json
http://192.168.8.212:5000/update.json
```

### 4.3 访问结果

```
{
  "ApkSize": 10240,
  "Code": 0,
  "DownloadUrl": "http://192.168.8.212:5000/app-release.apk",
  "ForceUpdate": true,
  "ModifyContent": "1. 修复若干 bug\n2. 优化性能",
  "Msg": "",
  "UpdateStatus": 1,
  "VersionCode": 2,
  "VersionName": "1.1"
}
```

说明：点击DownloadUrl可跳转下载页

## 五 参考

* [Python官网](https://www.python.org/getit/)