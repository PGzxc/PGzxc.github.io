---
title: Flutter开发之——Android通信-EventChannel(101)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: aab84911
date: 2021-07-18 23:17:47
---
## 一 概述

* 创建Flutter端EventChannel
* 创建Android端EventChannel
* 在合适的地方调用EventChannel

<!--more-->

## 二 EventChannel通信示例

### 2.1 Flutter 端创建 **EventChannel** 通道

```
void main() => runApp(EventChannelDemo());

class EventChannelDemo extends StatefulWidget {
  @override
  _EventChannelDemoState createState() => _EventChannelDemoState();
}

class _EventChannelDemoState extends State<EventChannelDemo> {

  var _eventChannel = EventChannel('com.example.androidflutter.EventChannelDemo');
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
        appBar: AppBar(title: Text("Flutter EventChannel")),
        body: Center(
          child: Text('$_data'),
        ),
      ),
    );
  }
}
```

### 2.2 Android端创建 **EventChannel** 通道

```
class EventChannelDemo(var activity: Activity, messenger: BinaryMessenger): EventChannel.StreamHandler {
    private var channel: EventChannel
    private var index = 0
    private var events: EventChannel.EventSink? = null
    init {
        channel = EventChannel(messenger, "com.example.androidflutter.EventChannelDemo")
        channel.setStreamHandler(this)
        startTimer()
    }
    fun startTimer() {
        var timer = Timer().schedule(timerTask {
            index++
            var map = mapOf("name" to "张三 ${index}",
                "age" to "${index}"
            )
            activity.runOnUiThread {
                events?.success(map)
            }

        }, 0, 1000)

    }
    override fun onListen(arguments: Any?, events: EventChannel.EventSink?) {
        this.events = events
    }

    override fun onCancel(arguments: Any?) {
        this.events = null
    }
}
```

### 2.3 调用处

```
class MainActivity : FlutterActivity() {

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        EventChannelDemo(this,flutterEngine.dartExecutor.binaryMessenger)
    }
}
```

### 2.4 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-event-channel-android-sample.gif