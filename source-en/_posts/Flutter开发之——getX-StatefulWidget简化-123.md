---
title: Flutter开发之——getX-StatefulWidget简化(123)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: 50e4845e
date: 2022-05-11 23:12:07
---
## 一 概述

StatefulWidget中，组件的值改变时，需要调用`.setState`用于更新新值，本文介绍GetX中的两个值改变器

* ValueBuilder：值构建器
* ObxValue：对象值

<!--more-->

## 二 几种值改变方式对比

### 2.1  StatefulWidget中默认的值改变

```
var _switchValue = false;
Switch(
        value: _switchValue,
        onChanged: (value) {
          setState(() {
            _switchValue = value;
          });
        });
```

说明：

* _switchValue：定义为外部变量，默认值为false
* onChanged函数调用时，为_switchValue赋值
* 通过setState改变_switchValue的值，进而改变Switch的状态

### 2.2  ValueBuilder用法示例

```
ValueBuilder<bool?>(
      initialValue: false,
      builder: (value, update) =>
          Switch(value: value!, onChanged: (flag) => update(flag)),
      onUpdate: (value) => print("Value updated: $value"),
      onDispose: () => print("Widget unmounted"),
    );
```

说明：

* ValueBuilder：继承StatefulWidget，可以作为组件单独使用
* initialValue：Switch的默认值
* builder：有两个变量，value：switch的改变值，update：switch改变时，调用次函数，赋值新值

### 2.3 ObxValue用法示例

```
ObxValue(
          (data) => Switch(
        value: (data as RxBool).value,
        onChanged: (flag){
          data.value=flag;
          print("Value updated: $flag");
        }, // Rx has a _callable_ function! You could use (flag) => data.value = flag,
      ),
      false.obs,
    );
```

说明：

* data：为false.obx的值，是个RxBool类型
* value：通过as RxBool转换为RxBool类型，然后取得bool型值
* onChanged：值改变调用函数

## 三 完整代码

```
void main() {
 runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue,),
      home: const MyHomePage(title: 'StatefulWidget 的简化'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  var _switchValue = false;
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const SizedBox(height: 20),  //距离顶部距离
            const Text('Flutter-Switch'),
            _buildFlutterSwitch(),
            const Text('ValueBuilder-Sample'),
            _buildValueBuilder(),
            const Text('ObxValue-Sample'),
            _buildObxValue()
          ],
        ),
      ),
    );
  }
  //FlutterBuilder
  Widget _buildFlutterSwitch(){
    return Switch(
        value: _switchValue,
        onChanged: (value) {
          setState(() {
            _switchValue = value;
          });
        });
  }
  //ValueBuilder
  Widget _buildValueBuilder() {
    return ValueBuilder<bool?>(
      initialValue: false,
      builder: (value, update) =>
          Switch(value: value!, onChanged: (flag) => update(flag)),
      onUpdate: (value) => print("Value updated: $value"),
      onDispose: () => print("Widget unmounted"),
    );
  }

  //ObxValue
  Widget _buildObxValue() {
    return ObxValue(
          (data) => Switch(
        value: (data as RxBool).value,
        onChanged: (flag){
          data.value=flag;
          print("Value updated: $flag");
        }, // Rx has a _callable_ function! You could use (flag) => data.value = flag,
      ),
      false.obs,
    );
  }
}
```

## 四 效果图

| 系统默认 | ValueBuilder | ObxValue |
| :------: | :----------: | :------: |
|  ![][1]  |    ![][2]    |  ![][3]  |

## 四 参考

* [Github官方文档-getX-ValueBuilder](flutter-getx-statefulwidget-12-obxvalue)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-statefulwidget-12-flutter.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-statefulwidget-12-valuebuilder.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-statefulwidget-12-obxvalue.png

