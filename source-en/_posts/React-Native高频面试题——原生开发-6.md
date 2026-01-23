---
title: React Native高频面试题——原生开发(6)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: 52f8164f
date: 2025-10-12 10:09:52
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二  面试要求和面试题

```
1.原生能力接入：摄像头、传感器、位置、文件系统、推送通知、蓝牙开发(react-native-ble-plx)
2.原生通信机制：Native Modules、Event Emitter、TurboModules/JSI
3.原生模块开发：Android：Java/Kotlin、iOS：Objective-C/Swift、模块桥接与封装
4.跨平台实现：iOS/Android、Windows/macOS（React Native for Windows/MacOS）
5.热更新与升级：CodePush 热更新、Expo OTA 更新
6.RN 框架机制：旧架构：Bridge → 异步消息队列、新架构：Fabric → 同步直连
```

### 三 面试题解答(仅供参考)

### 3.1 原生能力接入

1、React Native 如何接入原生能力（摄像头、传感器、位置、文件系统、推送通知、蓝牙）？

```
1、方式：
通过 Native Modules 或成熟的社区库封装原生 API。

2、原理：
使用 Native Modules 调用 iOS (Objective-C/Swift) 和 Android (Java/Kotlin) API。

3、常见库与示例：

3.1.摄像头：
react-native-camera 或 expo-camera
(封装 Android Camera2 或 iOS AVCaptureSession)，用于拍照/录视频。

3.2.传感器：
react-native-sensors(访问 Android SensorManager 或 iOS CoreMotion)，如加速度计/陀螺仪。

3.3.位置：
@react-native-community/geolocation 或 react-native-geolocation-service
(调用 Android LocationManager 或 iOS CoreLocation)，需申请权限(如 Android ACCESS_FINE_LOCATION)。

3.4。文件系统：
react-native-fs（封装 Android File API 或 iOS NSFileManager）。

3.5.推送通知：
react-native-push-notification 或 expo-notifications
(集成 Android Notification API 或 iOS UserNotifications)，配置 FCM/APNs。

3.6.蓝牙：
react-native-ble-plx(支持 BLE 扫描/连接/数据传输，
调用 Android Bluetooth API 或 iOS CoreBluetooth)。


4、注意事项：
权限处理（Android 运行时权限，iOS 描述键）；平台差异；错误处理（如超时、断连）。
```

2、使用 react-native-ble-plx 开发蓝牙功能时的注意事项？

```
1、关键步骤：

-权限处理：Android (BLUETOOTH_SCAN/CONNECT，API ≥31)；
iOS (NSBluetoothAlwaysUsageDescription)。
-状态监控：检查/监听蓝牙开启 (monitorBluetoothState)。
-设备扫描：startDeviceScan()。
-连接与服务发现：connectToDevice() + discoverAllServicesAndCharacteristics()。
-数据交互：read/write/monitor Characteristic（注意 UUID 和编码）。

2、难点：
Android 碎片化兼容；iOS 后台限制；调试复杂（硬件依赖）；权限复杂性（需定位权限）；断连重连和错误处理。
```

### 3.2 原生通信机制

1、Native Modules 和 Event Emitter 的作用是什么？

```
1、Native Modules：JS 调用原生代码，实现功能桥接（异步，JSON 序列化）。
 -Android：继承 ReactContextBaseJavaModule，@ReactMethod 暴露方法，在 ReactPackage 注册。
 -iOS：继承 RCTBridgeModule，RCT_EXPORT_MODULE/METHOD 导出。

2、Event Emitter：原生向 JS 发送事件（如通知/传感器更新）。
 -实现：原生用 RCTDeviceEventEmitter 发送；JS 用 NativeEventEmitter 监听（在 useEffect 中订阅）。

3、作用：双向通信，支持异步通知（如蓝牙状态变化）。
```

2、TurboModules 和 JSI 有何改进？

```
1.JSI：C++ 接口，实现 JS 与原生同步直连，消除 JSON 序列化和 Bridge 延迟。
2.TurboModules：新模块系统，按需加载，支持同步调用，替换旧 Native Modules。
3.改进：
解决旧架构的异步开销、启动慢和内存瓶颈；
提升类型安全；适用于高频场景（如传感器数据）。
需 RN 0.68+ 和 Fabric 支持。
```

3、JS 和原生通信的旧/新架构区别？

|   特性   |       旧架构 (Bridge)        | 新架构 (JSI/TurboModules) |
| :------: | :--------------------------: | :-----------------------: |
| 通信方式 |      异步 JSON 消息队列      |       同步 C++ 直连       |
| 性能瓶颈 | 序列化延迟、启动加载所有模块 |      低延迟、懒加载       |
| 事件处理 |    Event Emitter 异步通知    |    支持同步 + 高效事件    |

4、Event Emitter 在 RN 中的具体作用？

```
原生主动通知 JS（如推送、位置更新、蓝牙断连）。
实现 Native → JS 的异步事件推送
```

### 3.3 原生模块开发

1、如何开发和封装自定义原生模块？

```
1、Android (Java/Kotlin)：
-继承 ReactContextBaseJavaModule，@ReactMethod 暴露方法。
-在 ReactPackage 注册。
-添加到 MainApplication.getPackages()。

2、iOS (Objective-C/Swift)：
-继承 RCTBridgeModule，RCT_EXPORT_MODULE/METHOD 导出。
-Swift 用 @objc 确保兼容。

3、封装：
统一 API，隐藏平台差异；用 Promise/回调处理异步；添加 TS 类型。
```

2、语言选择：Java/Kotlin vs Objective-C/Swift？

```
Android：优先 Kotlin（简洁、安全）。
iOS：优先 Swift（现代语法、兼容新特性）。
```

### 3.4 跨平台实现

1、React Native 如何实现 iOS/Android/Windows/macOS 跨平台支持？

```
iOS/Android：桥接原生 API，使用 Platform.OS/StyleSheet 适配。
Windows：react-native-windows (UWP/WinUI)，配置 C++/.NET。
macOS：react-native-macos (Cocoa/AppKit)，配置 Xcode。
要点：Metro Bundler 配置；封装平台组件；桌面场景如内部工具或移动扩展。
```

2、React Native for Windows/macOS 的原理和场景？

```
原理：替换原生视图层（Windows 用 UWP，macOS 用 AppKit），JS 核心不变，通过 JSI 映射 UI。
场景：桌面扩展、UI 密集型应用；统一移动/桌面代码库。
```

### 3.5 热更新与升级

1、React Native 如何实现热更新？CodePush 和 Expo OTA 的区别？

|   特性   |          CodePush (AppCenter)           |  Expo OTA (Expo Go/EAS Build)  |
| :------: | :-------------------------------------: | :----------------------------: |
|   原理   | 上传 JS Bundle 到服务器，客户端下载替换 | Expo 服务器托管，自动检查/下载 |
| 支持范围 |        标准 RN 项目，仅 JS/资源         |     Expo 项目，仅 JS/资源      |
|   优势   |         兼容性高，手动集成灵活          |   自动化高，与 Expo 生态集成   |
|   限制   |        需配置服务器，无法改原生         |     限于 Expo，无法改原生      |

场景：CodePush 适合 Bare RN；Expo OTA 适合 Managed Workflow

### 3.6 RN 框架机制

1、旧架构 (Bridge) 和新架构 (Fabric) 的区别？

|   特性   |      旧架构 (Bridge)       | 新架构 (Fabric/JSI/TurboModules) |
| :------: | :------------------------: | :------------------------------: |
| 通信方式 |       异步 JSON 队列       |          同步 JSI 直连           |
| 渲染机制 | JS/Yoga → Bridge → 原生 UI |     C++ Shadow Tree 同步更新     |
| 线程模型 |         多线程等待         |     统一并发，支持优先级渲染     |
| 性能特点 |       延迟高、启动慢       |   低延迟、启动快，支持复杂交互   |

2、Fabric 引入 Shadow Tree 的作用？

```
中间层虚拟树，实现同步布局/更新；解决旧架构异步延迟和视图错位；支持并发渲染。
```

## 四  总结(面试答题要点)

```
1.原生能力接入：优先社区库 (e.g., react-native-ble-plx)，掌握权限/平台差异；自定义模块桥接原生 API。
2.原生通信：Bridge (异步) vs JSI/TurboModules (同步)，Event Emitter 处理事件通知。
3.模块开发：Android (Kotlin) / iOS (Swift) 桥接流程，提供 TS 类型。
4.跨平台扩展：默认移动支持，扩展到 Windows/macOS 用于桌面应用。
5.热更新：CodePush/Expo OTA 仅 JS 更新，注意政策限制。
6.架构机制：新 Fabric 优化性能，强调同步/懒加载 vs 旧 Bridge 瓶颈。
```

