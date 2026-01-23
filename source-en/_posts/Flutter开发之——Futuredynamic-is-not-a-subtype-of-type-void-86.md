---
title: Flutter开发之——Futuredynamic' is not a subtype of type(() = void)(86)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: db4f5e8b
date: 2021-05-26 17:36:34
---
## 一 现象

按钮点击时，出现了如下错误现象

```
type 'Future<dynamic>' is not a subtype of type '() => void?'
See also:
https://flutter.dev/docs/testing/errors
```

<!--more-->

## 二 原因分析

### 2.1 代码调用

```
Padding(padding: const EdgeInsets.all(16.0), child: ElevatedButton(child: const Text('创建文件夹'), onPressed: _createDir(),),),

//调用代码
  _createDir() async {
    Directory documentsDirectory = await getApplicationDocumentsDirectory();
    String path = '${documentsDirectory.path}${Platform.pathSeparator}dirName';
    var dir = Directory(path);
    var exist = dir.existsSync();
    if (exist) {
      print('当前文件夹已经存在');
    } else {
      var result = await dir.create();
      print('$result');
    }
  }
```

### 2.2 原因

* onPressed：方法是void Function()
*  _createDir() async ：没有设置返回参数时，默认返回值是`Future<dynamic>`
* onPressed和_createDir()不匹配

## 三 解决办法

### 3.1  _createDir()添加返回值void

* _createDir()添加void返回值
* onPressed: _createDir

```
void _createDir() async {}
onPressed: _createDir
```

### 3.2 将onPress方法补充完整，并调用_createDir()

```
onPressed:(){_createDir();}
或
onPressed:()=>_createDir()
```

