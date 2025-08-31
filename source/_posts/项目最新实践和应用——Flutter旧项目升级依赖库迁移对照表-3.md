---
title: 项目最新实践和应用——Flutter旧项目升级依赖库迁移对照表(3)
categories:
  - 开发
  - U-项目实践
  - Flutter项目
tags:
  - Flutter项目
abbrlink: cf21ce51
date: 2025-08-31 09:02:08
---
## 一 概述

```
随着Flutter的升级，旧项目可能出现这样那样的问题，本文加以整理
 -常见 Flutter 依赖库迁移对照表（1.x → 3.x）
 -方便你升级旧项目时替换
```

<!--more-->

## 二 Flutter 依赖库迁移对照表(1.x —>3.x)

### 2.1 核心&工具类

|            旧库            |           新库           |                       说明                       |
| :------------------------: | :----------------------: | :----------------------------------------------: |
|    path_provider: ^1.x     |    path_provider:^2.x    |             支持空安全，API 基本兼容             |
| shared_preferences: ^0.5.x | shared_preferences: ^2.x |                    兼容空安全                    |
|       sqflite: ^1.x        |      sqflite: ^2.x       |                 升级后基本无修改                 |
|       http: ^0.12.x        |        http: ^1.x        | 部分返回类型从<br> Response.bodyBytes→ Uint8List |
|       intl: ^0.16.x        |      intl: ^0.19.x       |                升级后注意版本冲突                |

### 2.2 UI & Widgets

|            旧库            |            新库            |                  说明                  |
| :------------------------: | :------------------------: | :------------------------------------: |
|     fluttertoast: ^3.x     |     fluttertoast: ^8.x     |              API 基本兼容              |
|     url_launcher: ^5.x     |     url_launcher: ^6.x     | 新版需 await launchUrl(Uri.parse(...)) |
|   flutter_webview_plugin   |  废弃 → `webview_flutter`  |                官方推荐                |
|       flutter_swiper       |    停更 → `card_swiper`    |                替代方案                |
|   flutter_spinkit: ^4.x    |   flutter_spinkit: ^5.x    |               动画加载库               |
| cached_network_image: ^2.x | cached_network_image: ^3.x |               兼容空安全               |

### 2.3 图片 & 多媒体

|         旧库          |          新库          |                           说明                           |
| :-------------------: | :--------------------: | :------------------------------------------------------: |
| image_picker: ^0.6.x  |   image_picker: ^1.x   |                    PickedFile → XFile                    |
| video_player: ^0.10.x |   video_player: ^2.x   |                      新版支持空安全                      |
| audioplayers: ^0.17.x | audioplayers: ^1.x/2.x | 播放 API 变化，<br>如 `play` 需传 `UrlSource/FileSource` |
|    chewie: ^0.9.x     |      chewie: ^1.x      |                      视频播放器封装                      |

### 2.4 Firebase 系列(变动最大)

1、说明

```
1、Flutter 1.x 时 Firebase 用单一依赖，Flutter 3.x 全部 模块化拆分

2、注意
所有 Firebase 插件都必须先 import 'package:firebase_core/firebase_core.dart'
并调用：await Firebase.initializeApp();
```

2、表格

|           旧库           |           新库            |          说明          |
| :----------------------: | :-----------------------: | :--------------------: |
|  firebase_auth: ^0.18.x  |    firebase_auth: ^5.x    |        登录认证        |
| cloud_firestore: ^0.14.x |   cloud_firestore: ^5.x   |       Firestore        |
|  firebase_storage: ^5.x  |  firebase_storage: ^12.x  |          存储          |
| firebase_messaging: ^7.x | firebase_messaging: ^15.x |        推送通知        |
| firebase_analytics: ^6.x | firebase_analytics: ^11.x |          分析          |
|  firebase_core(新必需)   |    firebase_core: ^3.x    | 所有 Firebase 必须依赖 |

### 2.5 状态管理

|      旧库      |      新库      |                   说明                   |
| :------------: | :------------: | :--------------------------------------: |
| provider: ^4.x | provider: ^6.x |                兼容空安全                |
|   bloc: ^6.x   |   bloc: ^8.x   |         API 改进，事件处理更简洁         |
| flutter_redux  |     不推荐     | Flutter 官方推荐 `provider` / `riverpod` |
|  scoped_model  |      废弃      |       改用 `provider` / `riverpod`       |
|   get: ^3.x    |   get: ^4.x    |                GetX 框架                 |

### 2.6 路由 & 本地化

|         旧库          |      新库      |                         说明                         |
| :-------------------: | :------------: | :--------------------------------------------------: |
| flutter_localizations | 内置，继续使用 | 需在 `MaterialApp` 添加<br> `localizationsDelegates` |
|      fluro: ^1.x      |  fluro: ^2.x   |             继续可用，但推荐 `go_router`             |
|       go_router       |      新库      |               Google 官方推荐路由方案                |

### 2.7 其他常用库

|    功能     |              推荐库              |
| :---------: | :------------------------------: |
|  本地存储   | `hive` / `isar`(比 sqflite 更快) |
|  网络请求   |            dio: ^5.x             |
|    动画     |   `animations`（Google 官方）    |
|  图片压缩   |      flutter_image_compress      |
| JSON 序列化 |        json_serializable         |

## 三 升级建议流程

```
1、先升级 SDK & 依赖
 flutter pub outdated
 flutter pub upgrade --major-versions


2、逐个库测试运行，有报错就查对照表替换 API。
3、Firebase 需重构：先引入 firebase_core，再逐个替换子模块。
4、UI 部分：按钮、SnackBar、主题颜色改为新 API。
5、路由/状态管理：
如果用 scoped_model / flutter_redux，建议迁移到 provider 或 go_router + riverpod。
```

