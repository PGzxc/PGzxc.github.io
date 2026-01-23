---
title: Android开发之——App升级方案(1)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
  - App升级
abbrlink: 9d0f8e8c
date: 2025-09-08 13:20:59
---
## 一 概述

```
本文介绍：App升级相关概念，包含
 -核心流程
 -权限与配置
 -优化建议
```

<!--more-->

## 二 核心流程

### 2.1 版本检测

```
-启动 App 时请求服务器接口，返回最新版本号、更新内容、安装包下载地址(APK URL)
-与本地 BuildConfig.VERSION_CODE 对比，判断是否需要更新
```

### 2.2 WiFi 下自动下载

```
1、使用 DownloadManager 或 OkHttp/Retrofit 去下载 APK。

2、只在 WiFi 网络下才启动下载，可以通过 ConnectivityManager 判断：
fun isWifiConnected(context: Context): Boolean {
    val cm = context.getSystemService(Context.CONNECTIVITY_SERVICE) 
    as ConnectivityManager
    val network = cm.activeNetwork ?: return false
    val caps = cm.getNetworkCapabilities(network) ?: return false
    return caps.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)
}

3、如果是 WiFi 并检测到新版本，自动开始下载并缓存到 getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS)
```

### 2.3 下载完成后弹窗提示安装

```
1、下载完成后监听广播 DownloadManager.ACTION_DOWNLOAD_COMPLETE。

2、弹出对话框提示用户安装，调用系统安装器：
fun installApk(context: Context, apkFile: File) {
    val intent = Intent(Intent.ACTION_VIEW).apply {
        flags = Intent.FLAG_ACTIVITY_NEW_TASK
        val apkUri = FileProvider.getUriForFile(
            context,
            "${context.packageName}.fileprovider",
            apkFile
        )
        setDataAndType(apkUri, "application/vnd.android.package-archive")
        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
    }
    context.startActivity(intent)
}
```

## 三 权限与配置

### 3.1 权限

```
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES"/>

Android 8.0 及以上需要请求 未知来源应用安装权限 (Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES)。
```

### 3.2 **FileProvider 配置**（用于 Android N+ 安装 APK）

```
1、provider配置
<provider
    android:name="androidx.core.content.FileProvider"
    android:authorities="${applicationId}.fileprovider"
    android:exported="false"
    android:grantUriPermissions="true">
    <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/file_paths"/>
</provider>

2、res/xml/file_paths.xml：
<paths>
    <external-files-path name="apk" path="Download/"/>
</paths>
```

## 四 优化建议

```
-后台静默下载（只提示安装时才打扰用户）。
-分版本控制（强制更新 vs 可选更新）。
-断点续传（DownloadManager 自带）。
-安装完成后清理安装包，避免占用空间。
```

