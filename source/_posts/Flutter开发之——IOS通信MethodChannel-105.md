---
title: Flutter开发之——IOS通信MethodChannel(105)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 7777917a
date: 2021-07-23 19:06:33
---
## 一 概述

* 创建Flutter端MethodChannel
* 创建IOS端MethodChannel
* 在合适的地方调用MethodChannel

<!--more-->

## 二 MethodChannel通信示例

### 2.1 创建Flutter端MethodChannel

```
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(MethodChannelDemo());
}
class MethodChannelDemo extends StatefulWidget {
  @override
  _MethodChannelDemoState createState() => _MethodChannelDemoState();
}

class _MethodChannelDemoState extends State<MethodChannelDemo> {
  var channel = MethodChannel('com.example.flutterios.MethodChannel');

  var _data;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text("IOS-MethodChannelDemo")),
        body: Column(
          children: [
            SizedBox(height: 50,),
            RaisedButton(
              child: Text('发送数据到原生'),
              onPressed: () async {
                var result = await channel
                    .invokeMethod('sendData', {'name': '张三', 'age': 18});
                var name = result['name'];
                var age = result['age'];
                setState(() {
                  _data = '$name,$age';
                });
              },
            ),
            Text('原生返回数据：$_data')
          ],
        ),
      ),
    );
  }
}
```

说明：com.example.flutterios.MethodChannel是iOS端MethodChannel全路径

### 2.2 创建IOS端MethodChannelDemo

```
import Flutter
import UIKit

public class MethodChannelDemo {
    
    init(messenger: FlutterBinaryMessenger) {
        let channel = FlutterMethodChannel(name: "com.example.flutterios.MethodChannel", binaryMessenger: messenger)
        channel.setMethodCallHandler { (call:FlutterMethodCall, result:@escaping FlutterResult) in
            if (call.method == "sendData") {
                if let dict = call.arguments as? Dictionary<String, Any> {
                    let name:String = dict["name"] as? String ?? ""
                    let age:Int = dict["age"] as? Int ?? -1
                    result(["name":"hello,\(name)","age":age])
                }
            }
        }
    }
}
```

### 2.3 在AppDelegate设置MethodChannelDemo

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
    let controller : FlutterViewController = window?.rootViewController as! FlutterViewController
    MethodChannelDemo(messenger: controller.binaryMessenger)
    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
```

### 2.4 效果图

![][1]

## 三 iOS 端向Flutter主动发送数据-定时器

### 3.1 创建Flutter端MethodChannel

```
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(MethodChannelDemo());
}
class MethodChannelDemo extends StatefulWidget {
  @override
  _MethodChannelDemoState createState() => _MethodChannelDemoState();
}

class _MethodChannelDemoState extends State<MethodChannelDemo> {
  var channel = MethodChannel('com.example.flutterios.MethodChannel');
  var _data;
  var _nativeData;

 @override
  void initState() {
   channel.setMethodCallHandler((call)async{
     setState(() {
       _nativeData = call.arguments['count'];
     });
   });
  }
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text("IOS-MethodChannelDemo")),
        body: Column(
          children: [
            SizedBox(height: 50,),
            RaisedButton(
              child: Text('发送数据到原生'),
              onPressed: () async {
                var result = await channel
                    .invokeMethod('sendData', {'name': '张三', 'age': 18});
                var name = result['name'];
                var age = result['age'];
                setState(() {
                  _data = '$name,$age';
                });
              },
            ),
            Text('原生返回数据：$_data'),
            Text('原生主动发送数据：$_nativeData')
          ],
        ),
      ),
    );
  }
}
```

### 3.2 创建IOS端MethodChannelDemo

```
import Flutter
import UIKit

public class MethodChannelDemo {
    var count =  0
    var channel:FlutterMethodChannel
    init(messenger: FlutterBinaryMessenger) {
        channel = FlutterMethodChannel(name: "com.example.flutterios.MethodChannel", binaryMessenger: messenger)
        channel.setMethodCallHandler { (call:FlutterMethodCall, result:@escaping FlutterResult) in
            if (call.method == "sendData") {
                if let dict = call.arguments as? Dictionary<String, Any> {
                    let name:String = dict["name"] as? String ?? ""
                    let age:Int = dict["age"] as? Int ?? -1
                    result(["name":"hello,\(name)","age":age])
                }
            }
        }
        startTimer()
    }
    func startTimer() {
        var timer = Timer.scheduledTimer(timeInterval:1, target: self, selector:#selector(self.tickDown),userInfo:nil,repeats: true)
    }
    @objc func tickDown(){
        count += 1
        var args = ["count":count]
        channel.invokeMethod("timer", arguments:args)
    }
}
```

### 3.3 在合适的地方调用MethodChannel

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
    let controller : FlutterViewController = window?.rootViewController as! FlutterViewController
    MethodChannelDemo(messenger: controller.binaryMessenger)
    GeneratedPluginRegistrant.register(with: self)
       
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
```

### 3.4 效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-methodchannle-result.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-methodchannle-timer-result.gif
