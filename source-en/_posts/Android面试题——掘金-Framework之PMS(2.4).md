---
title: Android面试题——掘金-Framework之PMS(2.4)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 21e5cb1c
date: 2025-04-04 11:45:56
---
## 一 概述

```
PMS（PackageManagerService）是 Android Framework 中的核心服务，
负责 APK 安装、卸载、权限管理、应用查询 等。
以下是 PMS 相关的高频面试题及解析：
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 PMS（PackageManagerService）是什么？

```
PMS 是 Android 应用管理的核心服务，运行在 SystemServer 进程 中，主要功能：

1.应用管理（安装、卸载、查询应用信息）。
2.APK 解析（Manifest 解析、Dex 优化）。
3.权限管理（动态权限、签名校验）。
4.用户数据存储（存储 /data/system/packages.xml）。
5.应用组件管理（Activity、Service、BroadcastReceiver、Provider）。

PMS 负责所有应用的管理，应用安装、查询 getPackageManager() 都会调用 PMS
```

### 2.2 PMS 是如何启动的？

```
PMS 在 SystemServer 进程启动时初始化，流程：

1.SystemServer 启动:入口：com.android.server.SystemServer#main()
2.创建 PackageManagerService
SystemServiceManager.startService(PackageManagerService.class)
3.扫描 /system/app、/data/app 目录，解析 APK
4.加载 /data/system/packages.xml 解析已安装应用信息
5.初始化权限、应用信息，注册 PMS 到 AMS
```

### 2.3 APK 安装流程？

```
当执行 pm install xxx.apk 或 PackageInstaller 进行安装时，流程如下：

(1) 用户发起安装
-系统调用 pm install 或 adb install 命令
-应用调用 PackageInstaller.Session.commit()

(2) PMS 解析 APK
1.调用 scanPackage() 解析 APK，检查 AndroidManifest.xml。
2.检查签名和权限，防止恶意应用安装。
3.Dex 优化（Dexopt）：
 -编译 Class.dex（ART 使用 dex2oat 编译）。
 -优化存储 /data/dalvik-cache。

(3) AMS 通知 Zygote 进程更新
PMS 调用 AMS 通知 Zygote 预加载 Dex。

(4) 完成安装，更新数据库
-PMS 更新 /data/system/packages.xml 记录应用信息。
-发送 ACTION_PACKAGE_ADDED 广播通知系统
```

### 2.4 APK 卸载流程？

```
当执行 pm uninstall xxx，流程如下：

1.PMS 检查权限
-是否是 系统应用（/system/app）。
-是否允许卸载（Device Owner、Profile Owner 可能限制）。

2.移除应用数据
-删除 /data/app/xxx/ 目录。
-清除 /data/data/xxx/ 数据。
-删除 /data/system/packages.xml 记录。

3.发送 ACTION_PACKAGE_REMOVED 广播，通知系统应用已卸载。
```

### 2.5 APK 是如何存储和管理的？

```
PMS 通过以下目录存储应用信息：

1.APK 目录
-/system/app/ → 系统应用
-/data/app/ → 用户安装的应用

2.应用数据
/data/data/包名/ → 应用私有数据

3.Package 信息
-/data/system/packages.xml → 记录已安装应用
-/data/system/app-ops.xml → 权限管理
```

### 2.6 PackageManager 如何查询已安装应用？

```
1.应用查询 getPackageManager() 时，会通过 PMS 获取应用信息
1.1 查询所有应用
List<PackageInfo> packages = getPackageManager().getInstalledPackages(0);
1.2 查询单个应用
PackageInfo info = getPackageManager().getPackageInfo("com.example.app", 0);

2.PMS 内部实现
-检查缓存，如果 mPackages（内存缓存）有数据，直接返回。
-从 /data/system/packages.xml 读取。
-返回查询结果。
```

### 2.7 PMS 如何校验 APK 签名？

```
安装 APK 时，PMS 需要检查签名：

1.读取 META-INF/CERT.RSA 证书。
2.解析 AndroidManifest.xml，检查 <application android:signature>。
3.对比已安装应用签名：
 -如果相同，则 允许覆盖安装。
 -如果不同，则 拒绝安装，防止篡改。
```

### 2.8 PMS 如何管理权限？

```
1.PMS 负责 应用权限管理，主要存储在 /data/system/packages.xml：
-普通权限（Normal）：自动授予（INTERNET）。
-危险权限（Dangerous）：需要用户授权（READ_CONTACTS）。
-系统权限（Signature）：必须签名匹配（INSTALL_PACKAGES）。

2.动态权限检查：
if (checkSelfPermission(Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
    // 已授权
}

3.权限存储：
-/data/system/packages.xml → 记录应用权限
-/data/system/app-ops.xml → 记录权限操作历史
```

### 2.9 PMS 如何支持多用户？

```
Android 通过 UserManager 实现多用户，PMS 需为每个用户维护独立应用：
-/data/user/0/xxx/ → 用户 0（Owner）应用数据。
-/data/user/10/xxx/ → 用户 10 应用数据。

2.PMS 通过 UserHandle 记录用户
getPackageManager().getInstalledPackages(PackageManager.MATCH_UNINSTALLED_PACKAGES, UserHandle.USER_SYSTEM);
```

### 2.10 PMS 如何处理 APK 热更新？

```
热更新需要 重新加载 Dex：

1.使用 Split APK
-base.apk：主 APK。
-config-armeabi.apk：CPU 架构优化 APK。
-只替换特定 Split APK，减少更新体积。

2.使用 Instant Run
-直接替换部分 Class，避免重启应用。
```

### 2.11 总结

```
PMS 是 Android 应用管理的核心服务，面试常考点：
1.APK 安装流程
2.APK 卸载流程
3.Package 数据存储
4.PackageManager 查询应用
5.APK 签名校验
6.权限管理
7.多用户支持
8.PMS 如何优化应用安装速度
9.如何实现热更新
```

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)