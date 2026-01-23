---
title: 项目最新实践和应用——Flutter旧项目升级迁移对照表(2)
categories:
  - 开发
  - U-项目实践
  - Flutter项目
tags:
  - Flutter项目
abbrlink: 36fb1dca
date: 2025-08-29 08:12:34
---
## 一 概述

```
随着Flutter的升级，旧项目可能出现这样那样的问题，本文加以整理
 -Flutter 1.x → 3.x 升级迁移对照表
 -涵盖 SDK、依赖、Android、iOS、Dart/Widget API 改动
```

<!--more-->

## 二 Flutter 1.x —>3.x 升级迁移对照表

### 2.1 Flutter SDK / Dart 层面

|        旧版 (1.x/2.x)        | 新版 (3.x)  |                            说明                            |
| :--------------------------: | :---------: | :--------------------------------------------------------: |
|        Dart 2.7-2.12         |  Dart 3.x   | 默认启用 **空安全 (null safety)**，旧代码需 `dart migrate` |
|         Flutter 1.x          | Flutter 3.x |           新版默认支持 iOS 12+、Android SDK 33+            |
| flutter run --preview-dart-2 |   已移除    |                      Dart2 已默认启用                      |

### 2.2 Android 构建相关

|            旧版             |         新版         |                             说明                             |
| :-------------------------: | :------------------: | :----------------------------------------------------------: |
|    Gradle 5.x / AGP 3.x     | Gradle 8.x / AGP 8.x |                    必须升级，否则构建失败                    |
| `android:exported` 无需声明 |       必须声明       | Android 12+ 每个 `activity/service/receiver` 要加上 `android:exported="true"` |
|       Kotlin 1.3/1.4        |     Kotlin ≥ 1.8     |                        否则插件不兼容                        |
|    compileSdkVersion 28     | compileSdkVersion 34 |                      新插件要求更高 SDK                      |

### 2.3 iOS 构建相关

|         旧版         |         新版          |            说明             |
| :------------------: | :-------------------: | :-------------------------: |
| platform :ios, '9.0' | platform :ios, '12.0' | Flutter 3.x 要求至少 iOS 12 |
|  CocoaPods 1.8-1.9   |   CocoaPods ≥ 1.12    |  需要升级才能正常安装依赖   |
|       Xcode 11       |      Xcode ≥ 14       |     iOS 17 需 Xcode 15      |

### 2.4 Dart/Flutter API 迁移

|                 旧版 (1.x/2.x)                  |                        新版 (3.x)                        |           说明            |
| :---------------------------------------------: | :------------------------------------------------------: | :-----------------------: |
|                   FlatButton                    |                        TextButton                        | 已废弃，替换为新按钮体系  |
|                  RaisedButton                   |                      ElevatedButton                      |           同上            |
|                  OutlineButton                  |                      OutlinedButton                      |           同上            |
| Scaffold.of(context)<br>.showSnackBar(snackBar) | ScaffoldMessenger<br>.of(context).showSnackBar(snackBar) |          新 API           |
|             accentColor (ThemeData)             |                  colorScheme.secondary                   |          已废弃           |
|                   ButtonTheme                   |         TextButtonTheme<br>, ElevatedButtonTheme         |        新主题体系         |
|             primaryColorBrightness              |                           移除                           | 改用 ThemeData.brightness |
|         image_picker 返回 PickedFile          |                        返回 XFile                        |         API 变更          |
|             flutter_webview_plugin              |                     webview_flutter                      |       旧插件已废弃        |
|                 Firebase各插件                  |               firebase_core + 新模块化插件               |       全部拆分重构        |
|                   intl 老版本                   |                       intl ^0.19.x                       |    日期/数字格式库更新    |

### 2.5 工具 & 命令变化

|               旧版                |                 新版                 |                 说明                 |
| :-------------------------------: | :----------------------------------: | :----------------------------------: |
|    flutter pub upgrade --force    | flutter pub upgrade --major-versions |           推荐方式升级依赖           |
| flutter doctor --android-licenses |                 保留                 |       仍需执行以接受 SDK 许可        |
|         flutter create .          |            支持项目重生成            | 升级旧项目推荐执行一次以自动迁移配置 |

## 三 实战迁移步骤总结

```
1、升级 Flutter SDK 
 flutter upgrade

2、清理构建缓存 
 flutter clean

3、更新依赖：
 flutter pub outdated
 flutter pub upgrade --major-versions


4、迁移空安全 
 dart migrate

5、修改废弃 API（按钮、SnackBar、Theme 等）
6、升级 Android 配置（Gradle/AGP/Kotlin/AndroidManifest）
7、升级 iOS 配置（Podfile、Xcode、CocoaPods）

8、测试构建：
 flutter build apk --release
 flutter build ios --release
```

