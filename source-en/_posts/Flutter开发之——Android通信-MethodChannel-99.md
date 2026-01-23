---
title: Flutter开发之——Android通信-MethodChannel(99)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: d7ab955c
date: 2021-07-18 23:13:33
---
## 一 概述

* Flutter创建MethodChannel通道
* Android端创建通信MethodChannel通道
* 在合适位置调用Android通信MethodChannel

<!--more-->

## 二  MethodChannel通信示例

### 2.1 Flutter创建MethodChannel通道

####  代码

```
void main() => runApp(MethodChannelDemo());

class MethodChannelDemo extends StatefulWidget {
  @override
  _MethodChannelDemoState createState() => _MethodChannelDemoState();
}

class _MethodChannelDemoState extends State<MethodChannelDemo> {
  var channel = MethodChannel('com.example.androidflutter.MethodChannelDemo');
  var _data;
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text("Flutter MethodChannel")),
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
说明

* MethodChannel('com.example.androidflutter.MethodChannelDemo')表示通信通道
* channel.invokeMethod('sendData', {'name': '张三', 'age': 18})：表示发送数据
* sendData表示方法，{'name': '张三', 'age': 18}：表示发送内容

### 2.2 Android端创建通信MethodChannel通道

#### 过程描述

* 创建MethodChannelDemo继承 MethodChannel.MethodCallHandler并实现onMethodCall回调
* 初始化MethodChannel，并设置MethodCallHandler监听

#### 创建MethodChannelDemo

```
class MethodChannelDemo(messenger: BinaryMessenger): MethodChannel.MethodCallHandler {

    private var channel: MethodChannel

    init {
        channel = MethodChannel(messenger, "com.example.androidflutter.MethodChannelDemo")
        channel.setMethodCallHandler(this)
    }

    override fun onMethodCall(call: MethodCall, result: MethodChannel.Result) {
        if (call.method == "sendData") {
            val name = call.argument("name") as String?
            val age = call.argument("age") as Int?

            var map = mapOf("name" to "hello,$name",
                "age" to "$age"
            )
            result.success(map)
        }
    }
}
```

说明：

* **call.method** 字符串就是 invokeMethod 方法传入的 **method**
* **call.argument** 是 invokeMethod 传入的参数，由于 Flutter 端传入的是 Map，所以上面的解析按照 Map 解析
* **result.success()** 是返回给 Flutter 的结果
* com.example.androidflutter.MethodChannelDemo为当前类的全路径
* sendData：为Flutter端的方法，并对Flutter传递过来的数据进行解析

### 2.3 在合适位置调用Android通信MethodChannel

MainActivity启动

```
class MainActivity : FlutterActivity() {
    
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannelDemo(flutterEngine.dartExecutor.binaryMessenger)
    }
}
```

#### 2.4 效果图

![][1]

## 三 原生端主动发送消息给Flutter

### 3.1 Flutter 端接收数据

```
void main() => runApp(MethodChannelDemo());
class MethodChannelDemo extends StatefulWidget {
  @override
  _MethodChannelDemoState createState() => _MethodChannelDemoState();
}
class _MethodChannelDemoState extends State<MethodChannelDemo> {
  var channel = MethodChannel('com.example.androidflutter.MethodChannelDemo');

  var _data;
  var _nativeData;
  @override
  void initState() {
    super.initState();
    channel.setMethodCallHandler((call) async {
      setState(() {
        _nativeData = call.arguments['count'];
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text("Flutter MethodChannel")),
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

### 3.2 Android 发送数据

```
class MethodChannelDemo(var activity: Activity, messenger: BinaryMessenger): MethodChannel.MethodCallHandler {

    private var channel: MethodChannel
    private var count = 0
    init {
        channel = MethodChannel(messenger, "com.example.androidflutter.MethodChannelDemo")
        channel.setMethodCallHandler(this)
        startTimer()
    }
    fun startTimer() {
        var timer = Timer().schedule(timerTask {
            activity.runOnUiThread {
                var map = mapOf("count" to count++)
                channel.invokeMethod("timer", map)
            }
        }, 0, 1000)

    }
    override fun onMethodCall(call: MethodCall, result: MethodChannel.Result) {
        if (call.method == "sendData") {
            val name = call.argument("name") as String?
            val age = call.argument("age") as Int?

            var map = mapOf("name" to "hello,$name",
                "age" to "$age"
            )
            result.success(map)
        }
    }
}
```

### 3.3 效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-channel-native-result.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-channel-native-2-flutter.gif
