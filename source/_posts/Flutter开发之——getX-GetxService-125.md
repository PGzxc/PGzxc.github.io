---
title: Flutter开发之——getX-GetxService(125)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: 9cba2ac0
date: 2022-05-13 09:13:46
---
## 一 概述

* GetXService使用说明
* 利用GetXService改写网络API示例项目
* 参考及示例代码

<!--more-->

## 二 GetXService

### 2.1 使用说明

* GetXService用在runApp之前，用于启动App之前进行初始化工作
* 可以分别定义APIService(网络)、DBService(数据库)、SharedPreferenceService(本地化存储)等
* 在initServices中控制上述Service的执行顺序

### 2.2 如何使用GetXService(APIService)

```
class APIService extends GetxService{
  Future<APIService> init()async{
    Get.put(HomeProvider());
    return this;
  }
  HomeProvider getHomeProvider(){
    return Get.find<HomeProvider>();
  }
  @override
  void onInit() {
    // TODO: implement onInit
    print('APIService--onInit');
    super.onInit();
  }
  @override
  void onReady() {
    // TODO: implement onReady
    print('APIService--onReady');
    super.onReady();
  }
  @override
  void onClose() {
    // TODO: implement onClose
    print('APIService--onClose');
    super.onClose();
  }
}
```

说明：

* 定义类APIService继承GetxService
* init方法，将HomeProvider(GetConnect)进行初始化
* 定义获取HomeProvider的方法，便于APIService获取
* 生命周期相关的方法：onInit()、onReady()、onClose()

### 2.3 initServices

```
Future<void> initServices() async {
  print('starting services ...');
  await Get.putAsync(() => APIService().init());//API
  print('All services started...');
}
```

### 2.4 App中设置

```
Future<void> main() async{
  await initServices();
  runApp(GetMaterialApp(
      themeMode: ThemeMode.light,
      initialRoute: AppRoutes.main,
      getPages: AppPages.routes));
}
```

## 三 利用GetXService改写网络API示例项目

### 3.1 网络API获取

之前

```
HomeProvider userProvider=Get.find();
Response response= await userProvider.getArticle(0);
//绑定HomeProvider
```

现在

```
Response response= await Get.find<APIService>().getHomeProvider().getArticle(0);
```

### 3.2 效果图
![][1]

## 四  参考

* [Github-getx-GetxService官方文档](https://github.com/jonataslaw/getx#getxservice)
* [CSDN下载-参考的代码](https://download.csdn.net/download/Calvin_zhou/85358794)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-service-14-getxservice-sample.png