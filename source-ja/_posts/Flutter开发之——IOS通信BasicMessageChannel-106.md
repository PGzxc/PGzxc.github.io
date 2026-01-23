---
title: Flutter开发之——IOS通信BasicMessageChannel(106)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: c95ce608
date: 2021-07-23 19:07:33
---
## 一 概述

* 创建Flutter端BasicMessageChannel
* 创建IOS端BasicMessageChannel
* 在合适的地方调用BasicMessageChannel

<!--more-->

## 二 BasicMessageChannel通信示例

### 2.1 Flutter 端创建 **MethodChannel** 通道

```
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(BasicMessageChannelDemo());
}
class BasicMessageChannelDemo extends StatefulWidget {
  @override
  _BasicMessageChannelDemoState createState() => _BasicMessageChannelDemoState();
}

class _BasicMessageChannelDemoState extends State<BasicMessageChannelDemo> {
  var channel = BasicMessageChannel('com.example.flutterios.BasicMessageChannel',StandardMessageCodec());
  var _data;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text("BasicMessageChannelDemo"),),
        body: Column(
          children: [
            SizedBox(
              height: 50,
            ),
            RaisedButton(
              child: Text('发送数据到原生'),
              onPressed: () async {
                var result = await channel.send({'name': '张三', 'age': 18}) as Map;
                var name = result['name'];
                var age = result['age'];
                setState(() {
                  _data = '$name,$age';
                });
              },
            ),
            Text('原生返回数据：$_data'),
          ],
        ),
      ),
    );
  }
}
```

### 2.2 创建IOS端BasicMessageChannel

```
import Flutter
import UIKit

public class BasicMessageChannelDemo {
    
    var channel:FlutterBasicMessageChannel
    
    init(messenger: FlutterBinaryMessenger) {
        channel = FlutterBasicMessageChannel(name: "com.example.flutterios.BasicMessageChannel", binaryMessenger: messenger)
        channel.setMessageHandler { (message, reply) in
            if let dict = message as? Dictionary<String, Any> {
                let name:String = dict["name"] as? String ?? ""
                let age:Int = dict["age"] as? Int ?? -1
                reply(["name":"hello,\(name)","age":age])
            }
        }
    }
}
```

### 2.3 在合适的地方调用BasicMessageChannel

```
import UIKit
import Flutter

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    
    let controller : FlutterViewController = window?.rootViewController as! FlutterViewController
    BasicMessageChannelDemo(messenger: controller.binaryMessenger)
    GeneratedPluginRegistrant.register(with: self)
       
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
```

### 2.4 效果图

![][1]
##  三 iOS 端向Flutter主动发送数据-定时器

### 3.1 Flutter 端创建 **MethodChannel** 通道

```
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(BasicMessageChannelDemo());
}
class BasicMessageChannelDemo extends StatefulWidget {
  @override
  _BasicMessageChannelDemoState createState() => _BasicMessageChannelDemoState();
}

class _BasicMessageChannelDemoState extends State<BasicMessageChannelDemo> {
  var channel = BasicMessageChannel('com.example.flutterios.BasicMessageChannel',StandardMessageCodec());
  var _nativeData;
  var _data;
  @override
  void initState() {
    channel.setMessageHandler((message) async{
      setState(() {
        _nativeData = (message as Map)['count'];
      });
    });
  }
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text("BasicMessageChannelDemo"),),
        body: Column(
          children: [
            SizedBox(
              height: 50,
            ),
            RaisedButton(
              child: Text('发送数据到原生'),
              onPressed: () async {
                var result = await channel.send({'name': '张三', 'age': 18}) as Map;
                var name = result['name'];
                var age = result['age'];
                setState(() {
                  _data = '$name,$age';
                });
              },
            ),
            Text('原生返回数据：$_data'),
            Text('原生主动发送数据：$_nativeData'),
          ],
        ),
      ),
    );
  }
}
```

### 3.2 创建IOS端BasicMessageChannel

```
import Flutter
import UIKit

public class BasicMessageChannelDemo {
    
    var channel:FlutterBasicMessageChannel
    var count =  0
    
    init(messenger: FlutterBinaryMessenger) {
        channel = FlutterBasicMessageChannel(name: "com.example.flutterios.BasicMessageChannel", binaryMessenger: messenger)
        channel.setMessageHandler { (message, reply) in
            if let dict = message as? Dictionary<String, Any> {
                let name:String = dict["name"] as? String ?? ""
                let age:Int = dict["age"] as? Int ?? -1
                reply(["name":"hello,\(name)","age":age])
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
        channel.sendMessage(args) { (reply) in
            
        }
    }
}
```

### 3.3 在合适的地方调用BasicMessageChannel

```
import UIKit
import Flutter

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    
    let controller : FlutterViewController = window?.rootViewController as! FlutterViewController
    BasicMessageChannelDemo(messenger: controller.binaryMessenger)
    GeneratedPluginRegistrant.register(with: self)
       
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
```

### 3.4 效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-basicmessagechannel-result.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-basicmessagechannel-timer-result.gif