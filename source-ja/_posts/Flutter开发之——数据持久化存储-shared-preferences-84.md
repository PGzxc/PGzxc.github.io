---
title: Flutter开发之——数据持久化存储-shared_preferences(84)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 516aaa66
date: 2021-05-26 14:13:26
---
## 一 概述

*  shared_preferences，它保存数据的形式为 Key-Value（键值对），支持 Android 和 iOS
*  shared_preferences 是一个第三方插件，在 Android 中使用 `SharedPreferences`，在 iOS中使用 `NSUserDefaults`

<!--more-->

## 二 添加依赖

### 2.1 依赖地址

* pub 地址：https://pub.flutter-io.cn/packages/shared_preferences
* Github 地址：https://github.com/flutter/plugins/tree/master/packages/shared_preferences/shared_preferences

### 2.2 添加依赖

在项目的 `pubspec.yaml` 文件中添加依赖

```
dependencies:
  shared_preferences: ^2.0.6
```

执行命令

```
flutter pub get
```

## 三 shared_preferences操作

### 3.1 支持数据类型

shared_preferences 支持的数据类型有 int、double、bool、string、stringList

### 3.2 shared_preferences实例化

同步操作

```
Future<SharedPreferences> _prefs = SharedPreferences.getInstance();
```

异步操作(async)

```
var prefs = await SharedPreferences.getInstance();
```

### 3.3 数据的基本操作(int为例)

#### 3.3.1 读取数据

```
Future<int> _readData() async {
  var prefs = await SharedPreferences.getInstance();
  var result = prefs.getInt('Key_Int');
  return result ?? 0;
}
```

#### 3.3.2 保存数据

```
_saveData() async {
  var prefs = await SharedPreferences.getInstance();
  prefs.setInt('Key_Int', 12);
}
```

#### 3.3.3 删除数据

```
Future<bool> _deleteData() async {
  var prefs = await SharedPreferences.getInstance();
  prefs.remove('Key');
}
```

#### 3.3.4 清除所有数据

```
Future<bool> _clearData() async {
  var prefs = await SharedPreferences.getInstance();
  prefs.clear();
}
```

### 3.4 Key 相关操作

#### 3.4.1 获取所有的 Key

```
Future<Set<String>> _getKeys() async {
  var prefs = await SharedPreferences.getInstance();
  var keys = prefs.getKeys();
  return keys ?? [];
}
```

#### 3.4.2 检测是否 Key 是否存在

```
Future<bool> _containsKey() async {
  var prefs = await SharedPreferences.getInstance();
  return prefs.containsKey('Key') ?? false;
}
```

## 四 示例

### 4.1 代码

```
Future<SharedPreferences> _prefs = SharedPreferences.getInstance(); //sharepreference初始化
late Future<int> _counter;//变量

//依次+1
 Future<void> _incrementCounter() async {
    final SharedPreferences prefs = await _prefs;
    final int counter = (prefs.getInt('counter') ?? 0) + 1;
    setState(() {
      _counter = prefs.setInt("counter", counter).then((bool success) {
        return counter;
      });
    });
  }
  @override
  void initState() {
    super.initState();
    _counter = _prefs.then((SharedPreferences prefs) {
      return (prefs.getInt('counter') ?? 0);
    });
  }
  
 body: Center(
          child: FutureBuilder<int>(
              future: _counter,
              builder: (BuildContext context, AsyncSnapshot<int> snapshot) {
                switch (snapshot.connectionState) {
                  case ConnectionState.waiting:
                    return const CircularProgressIndicator();
                  default:
                    if (snapshot.hasError) {
                      return Text('Error: ${snapshot.error}');
                    } else {
                      return Text(
                        'Button 点击了 ${snapshot.data}次',
                      );
                    }
                }
              })),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), 
```

### 4.2 效果图

![][1]

### 4.3 查看shared_preferences文件

* 打开Device File Explorer，选择设备，找到`data/data/com.example.flutter_image(包名)`/shared_prefs文件夹

  ![][2]

* 右键FlutterSharedPreferences.xml文件导出，打开查看文件信息

  ```
  <?xml version='1.0' encoding='utf-8' standalone='yes' ?>
  <map>
      <long name="flutter.counter" value="60" />
  </map>
  ```

  

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-sharepreference-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-shared-prefs-device.png