---
title: Flutter开发之——Android-Flutter添加到Activity(95)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: e0a06d43
date: 2021-07-17 23:39:54
---
## 一 概述

添加Flutter到Activity，又叫从Activity启动Flutter，本文主要讲述一下几种：

* 默认启动FlutterActivity
* 使用缓存的FlutterEngine启动FlutterActivity
* 带有缓存引擎的初始路由启动FlutterActivity

<!--more-->

## 二 路由设置及启动

原生启动Flutter可以分为：直接启动Flutter根界面(home)和启动路由界面

### 2.1 直接启动
#### 启动方式
```
startActivity(FlutterActivity.createDefaultIntent(this))
```

![][1]
####  启动说明

* 启动跳转Flutter Intent时，通过调用FlutterActivity.createDefaultIntent(this)
* 此Intent通过withNewEngine().build(launchContext)返回
* build中通过putExtra(EXTRA_INITIAL_ROUTE, initialRoute)，设置要启动的路由

### 2.2 路由方式启动

#### 启动方式

```
startActivity(
      FlutterActivity
        .withNewEngine()
        .initialRoute("/my_route")
        .build(currentActivity)
 );
```

### 2.3 路由启动示例
#### flutter/lib/main.dart
**默认路由**
```
void main() => runApp(MyApp());
class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```

**添加路由页面**

```
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      routes: <String,WidgetBuilder>{
        "/":(context)=>MyHomePage(title: 'Flutter Demo Home Page'),
        '/a':(context)=> MyPage(title:'Page A'),
        '/b':(context)=> MyPage(title:'Page B')
      },
      //home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyPage  extends StatelessWidget{
  var title;

   MyPage({Key? key, required this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
     return Scaffold(
       appBar: AppBar(title: Text(title),),
       body: Center(child: Text(title),)
     );
  }
}
```
#### 设置启动

```
startActivity(FlutterActivity
                .withNewEngine()
                .initialRoute("/a")
                .build(this)
)
```

#### 效果图

![][2]

## 三 默认启动FlutterActivity
### 3.1 默认启动方式

```
myButton.setOnClickListener(new OnClickListener() {
  @Override
  public void onClick(View v) {
    startActivity(
      FlutterActivity.createDefaultIntent(currentActivity)
    );
  }
});
```

### 2.3 缺点

* 启动Flutter模块时，会有明显延迟
* 会有一段时间的白屏

## 四 使用缓存的FlutterEngine启动FlutterActivity

### 4.1 说明

* 默认情况下，每个FlutterActivity都会创建自己的FlutterEngine
* 每个FlutterEngine都有预热时间，这意味着在FlutterActivity在可视之前，都会有延迟
* 为了减少延迟，在创建FlutterActivity之前，预先创建FlutterEngine，然后使用预先创建的FlutterEngine
* 要预先创建FlutterEngine，可以在应用程序中找到一个合适的位置来实例化FlutterEngine，一般在Application中完成

### 4.2 创建FlutterEngine(Application中)

```
public class MyApplication extends Application {
  public FlutterEngine flutterEngine;
  
  @Override
  public void onCreate() {
    super.onCreate();
    // Instantiate a FlutterEngine.
    flutterEngine = new FlutterEngine(this);

    // Start executing Dart code to pre-warm the FlutterEngine.
    flutterEngine.getDartExecutor().executeDartEntrypoint(
      DartEntrypoint.createDefault()
    );

    // Cache the FlutterEngine to be used by FlutterActivity.
    FlutterEngineCache
      .getInstance()
      .put("my_engine_id", flutterEngine);
  }
}
```

说明：

* my_engine_id：是个ID标识
* 请确保传递到FlutterActivity或FlutterFragment的ID跟通过FlutterEngine创建的是同一个

### 4.3 Activity页面中使用FlutterEngine

```
startActivity(
              FlutterActivity
              .withCachedEngine("my_engine_id")
              .build(this)
        );
```

说明：

* withCachedEngine("my_engine_id")跟Application中定义的my_engine_id是同一个

### 4.4 效果图
![][3]

## 五 带有缓存引擎的初始路由启动FlutterActivity

### 5.1 说明

* 通过FlutterEngine配置启动FlutterActivity或FlutterFragment时，同样也可以设置初始路由
* 不可以在FlutterActivity或FlutterFragment中配置初始路由，因为缓存引擎已经在运行Dart代码中，这时配置初始化路由为时已晚
* 想要其缓存引擎从自定义初始路由开始的开发人员可以将其缓存的`FlutterEngine`配置为在执行Dart入口点之前使用自定义初始路由

### 5.2 创建带FlutterEngine的初始化路由

```
public class MyApplication extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    // Instantiate a FlutterEngine.
    flutterEngine = new FlutterEngine(this);
    // Configure an initial route.
    flutterEngine.getNavigationChannel().setInitialRoute("/b"); //your/route/here
    // Start executing Dart code to pre-warm the FlutterEngine.
    flutterEngine.getDartExecutor().executeDartEntrypoint(
      DartEntrypoint.createDefault()
    );
    // Cache the FlutterEngine to be used by FlutterActivity or FlutterFragment.
    FlutterEngineCache
      .getInstance()
      .put("my_engine_id", flutterEngine);
  }
}
```
### 5.3 Activity页面中使用FlutterEngine

```
startActivity(
              FlutterActivity
              .withCachedEngine("my_engine_id")
              .build(this)
        );
```

说明：

* withCachedEngine("my_engine_id")跟Application中定义的my_engine_id是同一个

### 5.4 效果图
![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-jump-activity-direct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-android-route-jump.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-activity-engine-start.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-android-engine-route-jump.gif