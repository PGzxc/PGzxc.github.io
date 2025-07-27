---
title: Flutter开发之——IOS通信EventChannel(107)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 7c5e17f1
date: 2021-07-23 19:09:50
---
## 一 概述

- Flutter创建EventChannel通道
- IOS端创建通信EventChannel通道
- 在合适位置调用IOS通信EventChannel

<!--more-->

## 二 EventChannel通信示例

### 2.1 Flutter创建EventChannel通道

```
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(EventChannelDemo());
}

class EventChannelDemo extends StatefulWidget {
  @override
  _EventChannelDemoState createState() => _EventChannelDemoState();
}

class _EventChannelDemoState extends State<EventChannelDemo> {

  var _eventChannel = EventChannel('com.flutter.guide.EventChannel');
  var _data;
  @override
  void initState() {
    super.initState();
    _eventChannel.receiveBroadcastStream().listen(_onData);
  }

  _onData(event){
    setState(() {
      _data = event;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text("EventChannel")),
        body: Center(
          child: Text('$_data'),
        ),
      ),
    );
  }
}
```

### 2.2 IOS端创建通信EventChannel通道

```
import Flutter
import UIKit

public class EventChannelDemo:NSObject, FlutterStreamHandler{
    
    var channel:FlutterEventChannel?
    var count =  0
    var events:FlutterEventSink?
    
    public override init() {
        super.init()
    }
    
    convenience init(messenger: FlutterBinaryMessenger) {
        self.init()
        channel = FlutterEventChannel(name: "com.flutter.guide.EventChannel", binaryMessenger: messenger)
        channel?.setStreamHandler(self)
        startTimer()
    }
    
    func startTimer() {
        let timer = Timer.scheduledTimer(timeInterval:1, target: self, selector:#selector(self.tickDown),userInfo:nil,repeats: true)
    }
    @objc func tickDown(){
        count += 1
        let args = ["count":count]
        if(events != nil){
            events!(args)
        }
    }
    
    public func onListen(withArguments arguments: Any?, eventSink events: @escaping FlutterEventSink) -> FlutterError? {
        self.events = events
        return nil;
    }
    
    public func onCancel(withArguments arguments: Any?) -> FlutterError? {
        self.events = nil
        return nil;
    }
}
```

### 2.3 在合适位置调用IOS通信EventChannel

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
    EventChannelDemo(messenger: controller.binaryMessenger)
    GeneratedPluginRegistrant.register(with: self)
       
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
```

### 2.4 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-ios-eventchannel-result.gif