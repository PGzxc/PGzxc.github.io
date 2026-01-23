---
title: Flutter开发之——IOSView(104)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 9d908436
date: 2021-07-23 19:03:44
---
## 一 概述

* Xcode开发环境介绍
* Intellij创建Flutter应用
* Flutter中嵌入IOS自定义View
* Flutter中嵌入IOS自定义View时设置初始化参数

<!--more-->

## 二 Xcode开发环境介绍

* Xcode：12.5.1
* CocoaPod：1.10.1(pod --version)
* Flutter：2.2.3
* Dart：2.13.4
* Intellij：Community 2021.1

## 三 Intellij创建Flutter应用

* 依次点击：File——>New——>Project——>Flutter项目
  ![][1]
* 设置项目名称及存储位置，开发语言及适用平台
  ![][2]
* 创建完成后的项目结构如图所示
  ![][3]

## 三 Flutter中嵌入IOS自定义View

### 3.1 将项目使用Xcode打开

* 在项目上右键，Flutter——>Open IOS module in Xcode
  ![][4]
* 打开后的项目目录结构如图所示
  ![][5]

### 3.2 创建IOS自定义View(MyFlutterView)

```
import Foundation
import Flutter

class MyFlutterView: NSObject,FlutterPlatformView {
    
    let label = UILabel()
    
    init(_ frame: CGRect,viewID: Int64,args :Any?,messenger :FlutterBinaryMessenger) {
        label.text = "我是 iOS View"
    }
    
    func view() -> UIView {
        return label
    }   
}
```

### 3.3 MyFlutterViewFactory

```
import Foundation
import Flutter

class MyFlutterViewFactory: NSObject,FlutterPlatformViewFactory {
    
    var messenger:FlutterBinaryMessenger
    
    init(messenger:FlutterBinaryMessenger) {
        self.messenger = messenger
        super.init()
    }
    
    func create(withFrame frame: CGRect, viewIdentifier viewId: Int64, arguments args: Any?) -> FlutterPlatformView {
        return MyFlutterView(frame,viewID: viewId,args: args,messenger: messenger)
    }
    
    func createArgsCodec() -> FlutterMessageCodec & NSObjectProtocol {
        return FlutterStandardMessageCodec.sharedInstance()
    }
}
```

### 3.4 在 **AppDelegate** 中注册

```
import UIKit
import Flutter

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self)
    
    let registrar:FlutterPluginRegistrar = self.registrar(forPlugin: "plugins.flutter.io/custom_platform_view_plugin")!
    let factory = MyFlutterViewFactory(messenger: registrar.messenger())
    registrar.register(factory, withId: "plugins.flutter.io/custom_platform_view")
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
```

说明：

* **plugins.flutter.io/custom_platform_view** ，这个字符串在 Flutter 中需要与其保持一致

### 3.5 编辑Flutter页面

在Intellij页面中编辑main.dart

```
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(PlatformViewDemo());
}
class PlatformViewDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Widget? platformView() {
      if (defaultTargetPlatform == TargetPlatform.android) {
        return AndroidView(
          viewType: 'plugins.flutter.io/custom_platform_view',
        );
      } else if (defaultTargetPlatform == TargetPlatform.iOS) {
        return UiKitView(
          viewType: 'plugins.flutter.io/custom_platform_view',
        );
      }
    }
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text("Platform"),
        ),
        body: Center(
          child: platformView(),
        ),
      ),
    );
  }
}
```
![][6]

### 3.6 效果图
![][7]

## 四 Flutter中嵌入IOS自定义View时设置初始化参数
### 4.1 Flutter 端修改如下

```
UiKitView(
          viewType: 'plugins.flutter.io/custom_platform_view',
          creationParams: {'text': 'Flutter传给IOSTextView的参数'},
          creationParamsCodec: StandardMessageCodec(),
        )
```

* **creationParams** ：传递的参数，插件可以将此参数传递给 AndroidView 的构造函数。
* **creationParamsCodec** ：将 creationParams 编码后再发送给平台侧，它应该与传递给构造函数的编解码器匹配。值的范围
  - StandardMessageCodec
  - JSONMessageCodec
  - StringCodec
  - BinaryCodec

### 4.2 IOS自定义View接受参数

```
import Foundation
import Flutter

class MyFlutterView: NSObject,FlutterPlatformView {
    
    let label = UILabel()
    
    init(_ frame: CGRect,viewID: Int64,args :Any?,messenger :FlutterBinaryMessenger) {
        super.init()
        if(args is NSDictionary){
            let dict = args as! NSDictionary
            label.text  = dict.value(forKey: "text") as! String
        }
    }
    
    func view() -> UIView {
        return label
    }   
}
```

### 4.3 效果图
![][8]
## 五 Flutter 向 iOS View 发送消息

### 5.1 Flutter 端，创建 **MethodChannel** 用于通信(Intellij端修改)

```
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(PlatformViewDemo());
}

class PlatformViewDemo extends StatefulWidget {
  @override
  _PlatformViewDemoState createState() => _PlatformViewDemoState();
}

class _PlatformViewDemoState extends State<PlatformViewDemo> {
  static const platform =
  const MethodChannel('com.example.flutterios.MyFlutterView');

  @override
  Widget build(BuildContext context) {
    Widget? platformView() {
      if (defaultTargetPlatform == TargetPlatform.android) {
        return AndroidView(
          viewType: 'plugins.flutter.io/custom_platform_view',
          creationParams: {'text': 'Flutter传给AndroidTextView的参数'},
          creationParamsCodec: StandardMessageCodec(),
        );
      } else if (defaultTargetPlatform == TargetPlatform.iOS) {
        return UiKitView(
          viewType: 'plugins.flutter.io/custom_platform_view',
          creationParams: {'text': 'Flutter传给IOSTextView的参数'},
          creationParamsCodec: StandardMessageCodec(),
        );
      }
    }
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(),
        body: Column(children: [
          RaisedButton(
            child: Text('传递参数给原生View'),
            onPressed: () {
              platform.invokeMethod('setText', {'name': '张三', 'age': 18});
            },
          ),
          Expanded(child: Center(child: platformView())),
        ]),
      ),
    );
  }
}
```

说明：

* com.example.flutterios.MyFlutterView：是IOS端端自定义View路径，与IOS端MethodChannel端保持一致

### 5.2 IOS原生View 中也创建一个 **MethodChannel** 用于通信(Xcode)

```
import Foundation
import Flutter

class MyFlutterView: NSObject,FlutterPlatformView {
    
    let label = UILabel()
    
    init(_ frame: CGRect,viewID: Int64,args :Any?,messenger :FlutterBinaryMessenger) {
        super.init()
        if(args is NSDictionary){
            let dict = args as! NSDictionary
            label.text  = dict.value(forKey: "text") as! String
        }
        
        let methodChannel = FlutterMethodChannel(name: "com.example.flutterios.MyFlutterView", binaryMessenger: messenger)
        methodChannel.setMethodCallHandler { (call, result) in
            if (call.method == "setText") {
                if let dict = call.arguments as? Dictionary<String, Any> {
                    let name:String = dict["name"] as? String ?? ""
                    let age:Int = dict["age"] as? Int ?? -1
                    self.label.text = "hello,\(name),年龄：\(age)"
                }
            }
        }
    }
    
    func view() -> UIView {
        return label
    }
}
```

### 5.3 效果图
![][9]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intellij-create-flutter-iosview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intellij-create-flutter-iosview-settings.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intellij-create-flutter-iosview-struct.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intellij-flutterios-open-xcode.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intellij-iosview-open-xcode.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intellij-iosview-maindart.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intellij-iosview-result.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intellij-iosview-params-result.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-iosview-reactwith-ios.gif

