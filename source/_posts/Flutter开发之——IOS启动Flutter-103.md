---
title: Flutter开发之——IOS启动Flutter(103)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 95eee7a4
date: 2021-07-21 08:36:27
---
## 一 概述

本文介绍从原生iOS启动Flutter的几种方式

* 直接启动(不配置缓存 FlutterEngine和路由)Flutter
* 使用缓存FlutterEngine启动Flutter
* 使用路由方式启动Flutter

<!--more-->

## 二 直接启动(不配置缓存 FlutterEngine和路由)Flutter

### 2.1 代码(ViewController)

```
import UIKit
import Flutter

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    @IBAction func jumpFlutter(_ sender: Any)
    {
         let flutterViewController = FlutterViewController.init()
         present(flutterViewController, animated: true, completion: nil)
    }  
}
```

### 2.2 效果图

![][1]

## 三 使用缓存FlutterEngine启动Flutter

### 3.1 代码

#### AppDelegate.swift

```
import UIKit
import Flutter

@main
class AppDelegate:FlutterAppDelegate {

    lazy var flutterEngine=FlutterEngine(name: "my flutter engine")
    
    override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        flutterEngine.run();
        return super.application(application, didFinishLaunchingWithOptions: launchOptions);
      }
}
```

#### ViewController.swift

```
import UIKit
import Flutter

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    @IBAction func jumpFlutter(_ sender: Any)
    {
        let flutterEngine = (UIApplication.shared.delegate as! AppDelegate).flutterEngine;
        let flutterViewController = FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
        present(flutterViewController, animated: true, completion: nil)
    }
}
```

### 3.2 效果图
![][2]

## 四 使用路由方式启动Flutter

### 4.1 代码ViewController.swift

```
import UIKit
import Flutter

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    @IBAction func jumpFlutter(_ sender: Any)
    {
        let flutterEngine = FlutterEngine()
        flutterEngine.run(withEntrypoint: nil, initialRoute: "/a")
        let flutterViewController = FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
        present(flutterViewController, animated: true, completion: nil)
    }
}
```

### 4.2 lib/main.dart

```
import 'package:flutter/material.dart';

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
      routes: <String, WidgetBuilder>{
        //"/": (context) => MyHomePage(title: 'Flutter Demo Home Page'),
        '/a': (context) => MyPage(title: 'Page A'),
        '/b': (context) => MyPage(title: 'Page B')
      },
      //home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyPage extends StatelessWidget {
  var title;

  MyPage({Key? key, required this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: Center(
          child: Text(title),
        ));
  }
}
```

### 4.3 效果图
![][3]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-jump-flutter-result.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-launch-flutter-engine.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-launch-ios-route.gif