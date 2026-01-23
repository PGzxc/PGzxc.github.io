---
title: Flutter开发之——getX-GetConfig全局设置(126)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: a70c7de0
date: 2022-05-14 09:59:31
---
## 一 概述

* Config可以设置哪些内容
* 如何进行Config设置
* Config设置示例

<!--more-->

## 二Config可以设置哪些内容

### 2.1 Config的设置内容

```
/// change default config of Get
void config(
    { bool? enableLog,
      LogWriterCallback? logWriterCallback,
      bool? defaultPopGesture,
      bool? defaultOpaqueRoute,
      Duration? defaultDurationTransition,
      bool? defaultGlobalState,
      Transition? defaultTransition})
```

### 2.2 Congig设置内容说明

* enableLog：是否显示Log日志信息
* logWriterCallback：日志信息打印输出回调
* defaultPopGesture：是否使用默认手势
* defaultOpaqueRoute：使用使用默认路由
* defaultDurationTransition：默认Transition时长
* defaultGlobalState：是否使用默认全局状态
* defaultTransition：Transition专场动画(枚举类型)

## 二 如何进行Config设置

### 2.1 在GetMaterialApp中进行设置

```
GetMaterialApp(
  enableLog: true,
  defaultTransition: Transition.fade,
  opaqueRoute: Get.isOpaqueRouteDefault,
  popGesture: Get.isPopGestureEnable,
  transitionDuration: Get.defaultDurationTransition,
  defaultGlobalState: Get.defaultGlobalState,
);
```

### 2.2 放在一个单独的Config文件中

```
class Config{
 static const isDebug=true;
 Config.init(){
   Get.config(
     defaultOpaqueRoute: Get.isOpaqueRouteDefault,
     enableLog:false,
     defaultPopGesture: true,
     defaultTransition:Transition.downToUp,
     logWriterCallback:localLogWriter,
   );
 }
 void localLogWriter(String text, {bool isError = false}) {
   LoggerUtil.d(text);
 }
}
```

说明：

* Config.init()：需要在路由生效前设置
* localLogWriter方法中的日志信息打印使用到了第三方Logger

## 三 Config设置示例

### 3.1 Config文件配置

见2.2

### 3.3 Config初始化

```
Future<void> initServices() async {
  print('starting services ...');
  await Get.putAsync(() => GetConfig().init());
  await Get.putAsync(() => APIService().init());//API
  await Get.putAsync(() => DbService().init());//DB
  Get.put(SettingsService()).init();
  //await Get.putAsync(()=>SettingsService().init());

  print('All services started...');
}
class GetConfig extends GetxService{
  Future<GetConfig> init()async{
    Get.put(Config.init());
    return this;
  }
}
```

### 3.4 在runApp之前设置生效

```
Future<void> main() async{
  await initServices();
  runApp(GetMaterialApp(
      //defaultTransition: Transition.fade,
      //opaqueRoute: Get.isOpaqueRouteDefault,
      //popGesture: Get.isPopGestureEnable,
      themeMode: ThemeMode.light,
      initialRoute: AppRoutes.main,
      getPages: AppPages.routes));

}
```

## 四  效果

### 4.1 Log日志内容

![][1]

### 4.2 转场效果()

| Transition.downToUp | Transition.zoom |
| :-----------------: | :-------------: |
|       ![][2]        |     ![][3]      |

## 五 参考

* [Github-getx-config官方文档](https://github.com/jonataslaw/getx#optional-global-settings-and-manual-configurations)
* [CSDN下载-示例代码](https://download.csdn.net/download/Calvin_zhou/85368955)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-config-15-logger.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-config-15-transition-downup.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-config-15-transition-zoom.gif
