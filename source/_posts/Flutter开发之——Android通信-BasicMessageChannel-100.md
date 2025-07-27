---
title: Flutter开发之——Android通信-BasicMessageChannel(100)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 58d3fda2
date: 2021-07-18 23:16:05
---
## 一 概述

* 创建Flutter端BasicMessageChannel
* 创建Android端BasicMessageChannel
* 在合适的地方调用BasicMessageChannel

<!--more-->

## 二 BasicMessageChannel通信示例

### 2.1 Flutter 端创建 **MethodChannel** 通道

#### 代码

```
void main() => runApp(BasicMessageChannelDemo());

class BasicMessageChannelDemo extends StatefulWidget {
  @override
  _BasicMessageChannelDemoState createState() => _BasicMessageChannelDemoState();
}

class _BasicMessageChannelDemoState extends State<BasicMessageChannelDemo> {
  var channel = BasicMessageChannel('com.example.androidflutter.BasicMessageChannelDemo',StandardMessageCodec());
  var _data;
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text("Flutter BasicMessageChannel")),
        body: Column(
          children: [
            SizedBox(height: 50),
            RaisedButton(
              child: Text('发送数据到原生'),
              onPressed: () async {
               var result  = await channel.send({'name': '张三', 'age': 18}) as Map;
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

#### 说明

* com.example.androidflutter.BasicMessageChannelDemo：为通信Channel的全类名
* channel.send({'name': '张三', 'age': 18})：为通信数据

### 2.2 Android 端创建 **MethodChannel** 通道

#### 代码

```
class BasicMessageChannelDemo(messenger: BinaryMessenger) : BasicMessageChannel.MessageHandler<Any> {

    private var channel: BasicMessageChannel<Any>

    init {
        channel = BasicMessageChannel(messenger, "com.example.androidflutter.BasicMessageChannelDemo", StandardMessageCodec())
        channel.setMessageHandler(this)
    }

    override fun onMessage(message: Any?, reply: BasicMessageChannel.Reply<Any>) {
        val name = (message as Map<String, Any>)["name"]
        val age = (message as Map<String, Any>)["age"]

        var map = mapOf("name" to "hello,$name",
            "age" to "$age"
        )

        reply.reply(map)
    }
}
```

### 2.3 调用处

```
class MainActivity : FlutterActivity() {

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        BasicMessageChannelDemo(flutterEngine.dartExecutor.binaryMessenger)
    }
}
```

### 2.4 效果图

![][1]
## 三 原生端主动发送消息给Flutter

### 3.1 Flutter端

```
void main() => runApp(BasicMessageChannelDemo());

class BasicMessageChannelDemo extends StatefulWidget {
  @override
  _BasicMessageChannelDemoState createState() => _BasicMessageChannelDemoState();
}

class _BasicMessageChannelDemoState extends State<BasicMessageChannelDemo> {
  var channel = BasicMessageChannel('com.example.androidflutter.BasicMessageChannelDemo',StandardMessageCodec());

  var _data;
  var _nativeData;
  @override
  void initState() {
    super.initState();
    channel.setMessageHandler((message) async {
      setState(() {
        _nativeData = (message as Map)['count'];
      });
    });
  }
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text("Flutter BasicMessageChannel")),
        body: Column(
          children: [
            SizedBox(height: 50),
            RaisedButton(
              child: Text('发送数据到原生'),
              onPressed: () async {
               var result  = await channel.send({'name': '张三', 'age': 18}) as Map;
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

### 3.2 Android端

```
class BasicMessageChannelDemo(var activity: Activity, messenger: BinaryMessenger) : BasicMessageChannel.MessageHandler<Any> {

    private var channel: BasicMessageChannel<Any>
    private var count = 0
    init {
        channel = BasicMessageChannel(messenger, "com.example.androidflutter.BasicMessageChannelDemo", StandardMessageCodec())
        channel.setMessageHandler(this)
        startTimer()
    }
    fun startTimer() {
        var timer = Timer().schedule(timerTask {
            activity.runOnUiThread {
                var map = mapOf("count" to count++)
                channel.send(map,object :BasicMessageChannel.Reply<Any>{
                    override fun reply(reply: Any?) {

                    }
                })
            }
        }, 0, 1000)

    }
    override fun onMessage(message: Any?, reply: BasicMessageChannel.Reply<Any>) {
        val name = (message as Map<String, Any>)["name"]
        val age = (message as Map<String, Any>)["age"]

        var map = mapOf("name" to "hello,$name",
            "age" to "$age"
        )

        reply.reply(map)
    }
}
```

### 3.3 调用处

```
class MainActivity : FlutterActivity() {

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        BasicMessageChannelDemo(this,flutterEngine.dartExecutor.binaryMessenger)
    }
}
```

### 3.4 效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-basicmessagechannel-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-basicmessagechannel-sample-timer.gif