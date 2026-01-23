---
title: Flutter开发之——基本组件-Image(7)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 4157a1d7
date: 2021-02-22 15:15:51
---
## 一 概述

```
Image是Flttter中用于展示图片的组件。
支持 JPEG、PNG、GIF、Animated GIF、WebP、Animated WebP、BMP 和 WBMP 等格式。
```

<!--more-->

## 二 用于显示图像的方法

### 2.1 构造方法

```
Image(image: ImageProvider)
```
![][1]


### 2.2 静态方法

* Image.asset - 用于从资源目录的显示图片
* Image.network - 用于从网络上显示图片
* Image.file - 用于从文件里显示图片
* Image.memory - 用于从内存里（Uint8List）显示图片

## 三 示例

### 3.1 Image.asset 

#### 设置pubspec.yaml
![][2]

* 在项目路径下，新建images文件夹，并将图片`flutter.png`放到images路径下
* 在pubspec.yaml 文件中添加assets，如上图，注意images的路径(间隔两个字母)

  ```
  flutter:
    assets:
       - images/flutter.png
  ```

#### 代码设置(lib/main.dart)

```
Image.asset("images/flutter.png"),
```

### 3.2 Image.network

```
Image.network("https://flutter.dev/assets/flutter-lockup-1caf6476beed76adec3c477586da54de6b552b2f42108ec5bc68dc63bae2df75.png"),
```

### 3.3 Image.file

#### 添加path_provider依赖

在pubspec.yaml 文件中添加path_provider依赖

```
dependencies:
  path_provider: ^1.6.26
```

![][3]

然后，执行`Pub get`获取path_provider依赖

#### path_provider说明

对于Android系统

```
Directory tempDir = await getTemporaryDirectory();
String tempPath = tempDir.path;

Directory appDocDir = await getApplicationDocumentsDirectory();
String appDocPath = appDocDir.path;

String storageDir = (await getExternalStorageDirectory()).path;
```

加载sd卡图片需要读写权限，在AndroidManifest.xml中添加

```
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.INTERNET" />
```

打印文件路径

```
Future<void> main() async {
  String appDir = (await getApplicationDocumentsDirectory()).path;
  String tempDir = (await getTemporaryDirectory()).path;
  String storageDir = (await getExternalStorageDirectory()).path;
  print("appDir==$appDir");
  print("tempDir==$tempDir");
  print("storageDir==$storageDir");
}
```

输出结果

```
I/flutter (10148): appDir==/data/user/0/com.example.flutter_image/app_flutter
I/flutter (10148): tempDir==/data/user/0/com.example.flutter_image/cache
I/flutter (10148): storageDir==/storage/emulated/0/Android/data/com.example.flutter_image/files
```

#### 将要显示的图片导入到手机中

![][4]

#### 完整代码(lib/main.dart)

```
import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';

Future<void> main() async {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;
  @override
  _MyHomePageState createState() => _MyHomePageState();
}
File file;
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  String _storageDir = '';
  File file;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    _getLocalFile();
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Image.file(File(_storageDir+"/flutter.png")),
            Image.file(File("$_storageDir/flutter.png")),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
  _getLocalFile() async {
    String appDir = (await getApplicationDocumentsDirectory()).path;
    String tempDir = (await getTemporaryDirectory()).path;
    String storageDir = (await getExternalStorageDirectory()).path;
    setState(() {
      _storageDir = storageDir;
    });
    return storageDir;
  }
}
```

### 3.4 构造方法

ImageProvider的子类有

![][1]

传入AssetImage后代码为

```
Image(image: AssetImage("images/flutter.png"))
```

### 3.5 效果图
![][5]

## 四 几个常用的属性

```
  const Image({
    Key? key,
    required this.image,
    this.frameBuilder,
    this.loadingBuilder,
    this.errorBuilder,
    this.semanticLabel,
    this.excludeFromSemantics = false,
    this.width,
    this.height,
    this.color,
    this.colorBlendMode,
    this.fit,
    this.alignment = Alignment.center,
    this.repeat = ImageRepeat.noRepeat,
    this.centerSlice,
    this.matchTextDirection = false,
    this.gaplessPlayback = false,
    this.isAntiAlias = false,
    this.filterQuality = FilterQuality.low,
  }) : assert(image != null),
       assert(alignment != null),
       assert(repeat != null),
       assert(filterQuality != null),
       assert(matchTextDirection != null),
       assert(isAntiAlias != null),
       super(key: key);
```

### 4.1 宽和高

```
Image(image: AssetImage("images/flutter.png"),width: 100,height: 100,),
```

### 4.2 color和colorBlendMode

color：设置图片的背景色，从Colors类中查找对应颜色

colorBlendMode：混合模式，取值BlendMode枚举类

```
Image(image: AssetImage("images/flutter.png"),color:Colors.blue,colorBlendMode: BlendMode.difference,),
```

### 4.3 fit

fit：用于设置图像在页面中的布局方式

|     **fit**      |                             说明                             |
| :--------------: | :----------------------------------------------------------: |
|   BoxFit.fill    |                 全图显示，显示可能拉伸，充满                 |
|  BoxFit.contain  |                全图显示，显示原比例，不需充满                |
|   BoxFit.cover   |                 显示可能拉伸，可能裁剪，充满                 |
| BoxFit.fitWidth  |               显示可能拉伸，可能裁剪，宽度充满               |
| BoxFit.fitHeight |               显示可能拉伸，可能裁剪，高度充满               |
|   BoxFit.none    |                                                              |
| BoxFit.scaleDown | 效果和contain差不多,但是此属性不允许显示超过源图片大小，可小不可大 |

### 4.4 alignment

alignment：设置图片的对齐方式，取值`Alignment`类中值

### 4.5 repeat
repeat：设置图片是否重复，取值有：

* ImageRepeat.repeat
* ImageRepeat.noRepeat
* ImageRepeat.repeatX
* ImageRepeat.repeatY



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-image-imageprovider-imple.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-image-local-image-pubspec.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-image-file-path-provider.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-image-upload-files-phone.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-image-preview.png
