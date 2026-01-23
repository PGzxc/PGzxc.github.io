---
title: Flutter开发之——文件及文件夹操作(87)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 852b254e
date: 2021-05-27 10:40:21
---
## 一 概述

* 文件夹操作(创建、遍历、重命名、删除)
* 文件操作(创建、数据写入、读取数据、删除文件)
* json文件数据读取

<!--more-->

## 二 添加依赖

因为文件及文件夹的操作依赖于path_provider

在项目的 `pubspec.yaml` 文件中添加依赖

```
flutter pub add path_provider
```

点击pubspec.yaml右上角的`Pub get`或者执行如下指令

```
flutter pub get
```

## 三 文件夹操作(创建、遍历、重命名、删除)

### 3.1 创建文件夹

```
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

说明：

* Platform.pathSeparator表示路径分隔符，对于Android和iOS来说表示‘/’
* create 中有一个可选参数 recursive ，默认值为 false，false 表示只能创建最后一级文件夹
* 如果创建 “dir1/dir2” 这种嵌套文件夹，recursive为 false 时将抛出异常，设置为 true 可以创建嵌套文件夹

### 3.2 遍历文件夹下文件

```
_dirList() async {
  Directory documentsDirectory = await getApplicationDocumentsDirectory();
  String path = '${documentsDirectory.path}${Platform.pathSeparator}dirName';

  Stream<FileSystemEntity> fileList = Directory(path).list();

  await for(FileSystemEntity fileSystemEntity in fileList){
    print('$fileSystemEntity');
  }
}
```

说明：

* Directory(path).list()中有一个可选参数recursive，默认值为false，表示只遍历当前目录；
* 设置为true时表示遍历当前目录及子目录。

#### 判断文件的类型：

```
await for(FileSystemEntity fileSystemEntity in fileList){
  print('$fileSystemEntity');
  FileSystemEntityType type = FileSystemEntity.typeSync(fileSystemEntity.path);
}
```

文件的类型：

- file：文件
- directory：文件夹
- link：链接文件
- notFound：未知

### 3.3 重命名文件夹名称

```
_dirRename() async{
  Directory documentsDirectory = await getApplicationDocumentsDirectory();
  String path = '${documentsDirectory.path}${Platform.pathSeparator}dirName';
  var dir = Directory(path);
  var dir3= await dir.rename('${dir.parent.absolute.path}${Platform.pathSeparator}dir3');
}
```

### 3.4 删除文件夹

```
_deleteDir() async {
  Directory documentsDirectory = await getApplicationDocumentsDirectory();
  String path = '${documentsDirectory.path}${Platform.pathSeparator}dir3';
  var dir = await Directory(path).delete();
}
```

说明：

* delete中有一个可选参数recursive，默认值为false,为false时如果删除的文件夹下还有内容将无法删除，抛出异常
* 设置为true时，删除当前文件夹及文件夹下所有内容

## 四 文件的操作

### 4.1 创建一个 file.txt 文件

```
_createFile() async {
  Directory documentsDirectory = await getApplicationDocumentsDirectory();
  String path = '${documentsDirectory.path}${Platform.pathSeparator}dirName${Platform.pathSeparator}file.txt';

  var file = await File(path).create(recursive: true);
}
```

说明：

* create 中有一个可选参数 recursive，默认值为 false,为 false 时只创建文件，文件夹路径不存在抛出异常
* 设置为 true 时，创建文件及不存在的路径文件夹

### 4.2 写入数据

```
 _write2File() async{
   Directory documentsDirectory = await getApplicationDocumentsDirectory();
   String path = '${documentsDirectory.path}${Platform.pathSeparator}dirName${Platform.pathSeparator}file.txt';
   var file=File(path);
   if (file.existsSync()) {
     file.writeAsString('写入数据文件'); //写入字符串
     //file.writeAsBytes(Utf8Encoder().convert("写入数据文件"));//写入 bytes 数据
     //file.openWrite(mode: FileMode.append).write('追加到末尾'); //向末尾追加内容
   }
 }
```

### 4.3 读取数据

```
_readFile() async{
    Directory documentsDirectory = await getApplicationDocumentsDirectory();
    String path = '${documentsDirectory.path}${Platform.pathSeparator}dirName${Platform.pathSeparator}file.txt';
    var file=File(path);
    if (file.existsSync()) {
      List<String> lines = await file.readAsLines();
      lines.forEach((element) {
        print('$element');
      });
    }
  }
```

### 4.4 删除文件

```
 _deleteFile() async{
    Directory documentsDirectory = await getApplicationDocumentsDirectory();
    String path = '${documentsDirectory.path}${Platform.pathSeparator}dirName${Platform.pathSeparator}file.txt';
    var file=File(path);
    if (file.existsSync()) {
      file.delete();
    }
  }
```

## 五 json文件数据读取

### 5.1 添加json文件数据

读取项目中文件，比如 asset/json/data.json 文件，data.json 文件中为 json 格式数据

```
[
  {
    "desc": "开发环境搭建。",
    "title": "第一章"
  },
  {
    "desc": "语法知识学习",
    "title": "第二章"
  },
  {
    "desc": "组件学习",
    "title": "第三章"
  }
]
```

### 5.2 项目的 `pubspec.yaml` 文件中添加配置

```
assets:
  - assets/json/
```

### 5.3 读取json文件数据

```
_loadAsset(BuildContext context) async{
    var jsonStr = await DefaultAssetBundle.of(context).loadString('assets/json/data.json');
    var list = json.decode(jsonStr);
   print(list);
  }
```

## 六 布局文件

### 6.1 代码

```
 Center(
       child: ListView(
         children: <Widget>[
            Center(child:  Text("文件夹操作",style: TextStyle( color:Colors.orange, fontSize: 15.0),),),
            Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('创建文件夹'), onPressed:()=>_createDir())),
            Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('遍历文件夹'), onPressed:()=>_dirList())),
            Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('重命名文件夹'), onPressed: ()=>_dirRename())),
            Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('删除文件夹'), onPressed: ()=>_deleteDir())),
            Center(child:  Text("文件操作",style: TextStyle( color:Colors.orange, fontSize: 15.0),),),
            Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('创建文件'), onPressed: ()=>_createFile())),
            Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('写入文件数据'), onPressed: ()=> _write2File())),
            Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('读取文件数据'), onPressed: ()=> _readFile())),
            Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('删除'), onPressed: ()=> _deleteFile())),
            Center(child:  Text("读取json数据",style: TextStyle( color:Colors.orange, fontSize: 15.0),),),
            Padding(padding: const EdgeInsets.all(5.0), child: ElevatedButton(child: const Text('读取json数据并打印'), onPressed: ()=> _loadAsset(context))),
          ],
        ),
      )
```

### 6.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-file-folder-sample.png