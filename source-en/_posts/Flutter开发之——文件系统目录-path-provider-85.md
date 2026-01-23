---
title: Flutter开发之——文件系统目录-path_provider(85)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: f6bec8e7
date: 2021-05-26 16:16:02
---
## 一 概述

* 不同的平台对应的文件系统是不同的，比如文件路径，因此 Flutter 中获取文件路径需要原生支持
* 通过Google 官方提供的插件 path_provider，可以实现跨平台下文件的路径

<!--more-->

## 二 path_provider

### 2.1 插件地址

* pub 地址：https://pub.flutter-io.cn/packages/path_provider
* Github 地址：https://github.com/flutter/plugins/tree/master/packages/path_provider/path_provider

### 2.2 插件安装

切换到终端模式下，执行如下指令

```
flutter pub add path_provider
```

点击pubspec.yaml右上角的`Pub get`或者执行如下指令

```
flutter pub get
```

## 三 文件路径

path_provider.dart文件下提供了8中获取文件路径的方法

### 3.1 getTemporaryDirectory

* 临时目录，适用于下载的缓存文件，此目录随时可以清除
* 此目录为应用程序私有目录，其他应用程序无法访问此目录
* Android 上对应`getCacheDir`；iOS上对应`NSCachesDirectory`

### 3.2 getApplicationSupportDirectory

* 应用程序可以在其中放置应用程序支持文件的目录的路径
* 将此文件用于您不想向用户公开的文件。 您的应用不应将此目录用于存放用户数据文件
* 在iOS上，对应`NSApplicationSupportDirectory` ，如果此目录不存在，则会自动创建。 在Android上，对应`getFilesDir`

### 3.3 getLibraryDirectory

* 应用程序可以在其中存储持久性文件，备份文件以及对用户不可见的文件的目录路径
* 在Android上，此函数抛出[UnsupportedError]异常，没有等效项路径存在

### 3.4 getApplicationDocumentsDirectory

* 应用程序可能在其中放置用户生成的数据或应用程序无法重新创建的数据的目录路径
* 在iOS上，对应`NSDocumentDirectory` API。 如果数据不是用户生成的，考虑使用[getApplicationSupportDirectory]
* 在Android上，对应`getDataDirectory` API。 如果要让用户看到数据，请考虑改用[getExternalStorageDirectory]

### 3.5 getExternalStorageDirectory

* 应用程序可以访问顶级存储的目录的路径
* 由于此功能仅在Android上可用，因此应在发出此函数调用之前确定当前操作系统
* 在iOS上，此功能会引发[UnsupportedError]异常，因为无法在应用程序的沙箱外部访问
* 在Android上，对应`getExternalFilesDir（null）`

### 3.6 getExternalCacheDirectories

* 存储特定于应用程序的外部缓存数据的目录的路径。 这些路径通常位于外部存储（如单独的分区或SD卡）上
* 由于此功能仅在Android上可用，因此应在发出此函数调用之前确定当前操作系统
* 在iOS上，此功能会抛出UnsupportedError，因为这是不可能的在应用程序的沙箱外部访问。
* 在Android上，对应`Context.getExternalCacheDirs（）`或API Level 低于19的`Context.getExternalCacheDir（）`

### 3.7 getExternalStorageDirectories

* 可以存储应用程序特定数据的目录的路径。 这些路径通常位于外部存储（如单独的分区或SD卡）上。
* 由于此功能仅在Android上可用，因此应在发出此函数调用之前确定当前操作系统
*  在iOS上，此功能会抛出UnsupportedError，因为这是不可能的在应用程序的沙箱外部访问
*  在Android上，对应`Context.getExternalFilesDirs（String type）`或API Level 低于19的`Context.getExternalFilesDir（String type）`。

### 3.8 getDownloadsDirectory

* 存储下载文件的目录的路径，这通常仅与台式机操作系统有关
* 在Android和iOS上，此函数将引发[UnsupportedError]异常。

## 四 示例

### 4.1 代码

```
  Future<Directory?>? _tempDirectory;
  Future<Directory?>? _appSupportDirectory;
  Future<Directory?>? _appLibraryDirectory;
  Future<Directory?>? _appDocumentsDirectory;
  Future<Directory?>? _externalDocumentsDirectory;
  Future<List<Directory>?>? _externalStorageDirectories;
  Future<List<Directory>?>? _externalCacheDirectories;
  Future<Directory?>? _downloadDirectory;
  
  void _requestTempDirectory() {
    setState(() {
      _tempDirectory = getTemporaryDirectory();
    });
  }
  Widget _buildDirectory(BuildContext context, AsyncSnapshot<Directory?> snapshot) {
    Text text = const Text('');
    if (snapshot.connectionState == ConnectionState.done) {
      if (snapshot.hasError) {
        text = Text('Error: ${snapshot.error}');
      } else if (snapshot.hasData) {
        text = Text('path: ${snapshot.data!.path}');
      } else {
        text = const Text('path unavailable');
      }
    }
    return Padding(padding: const EdgeInsets.all(16.0), child: text);
  }

  Widget _buildDirectories(BuildContext context, AsyncSnapshot<List<Directory>?> snapshot) {
    Text text = const Text('');
    if (snapshot.connectionState == ConnectionState.done) {
      if (snapshot.hasError) {
        text = Text('Error: ${snapshot.error}');
      } else if (snapshot.hasData) {
        final String combined = snapshot.data!.map((Directory d) => d.path).join(', ');
        text = Text('paths: $combined');
      } else {
        text = const Text('path unavailable');
      }
    }
    return Padding(padding: const EdgeInsets.all(16.0), child: text);
  }

  void _requestAppDocumentsDirectory() {
    setState(() {
      _appDocumentsDirectory = getApplicationDocumentsDirectory();
    });
  }

  void _requestAppSupportDirectory() {
    setState(() {
      _appSupportDirectory = getApplicationSupportDirectory();
    });
  }

  void _requestAppLibraryDirectory() {
    setState(() {
      _appLibraryDirectory = getLibraryDirectory();
    });
  }

  void _requestExternalStorageDirectory() {
    setState(() {
      _externalDocumentsDirectory = getExternalStorageDirectory();
    });
  }

  void _requestExternalStorageDirectories(StorageDirectory type) {
    setState(() {
      _externalStorageDirectories = getExternalStorageDirectories(type: type);
    });
  }

  void _requestExternalCacheDirectories() {
    setState(() {
      _externalCacheDirectories = getExternalCacheDirectories();
    });
  }
  void _requestDownloadDirectory() {
    setState(() {
      _downloadDirectory = getDownloadsDirectory();
    });
  }

Center(
        child: ListView(
          children: <Widget>[
            Padding(padding: const EdgeInsets.all(16.0), child: ElevatedButton(child: const Text('Get Temporary Directory'), onPressed: _requestTempDirectory,),),
            FutureBuilder<Directory?>(future: _tempDirectory, builder: _buildDirectory),

            Padding(padding: const EdgeInsets.all(16.0), child: ElevatedButton(child: const Text('Get Application Documents Directory'),
              onPressed: _requestAppDocumentsDirectory,),),
            FutureBuilder<Directory?>(future: _appDocumentsDirectory, builder: _buildDirectory),

            Padding(padding: const EdgeInsets.all(16.0), child: ElevatedButton(child: const Text('Get Application Support Directory'),
              onPressed: _requestAppSupportDirectory,),),
            FutureBuilder<Directory?>(future: _appSupportDirectory, builder: _buildDirectory),

            Padding(padding: const EdgeInsets.all(16.0), child: ElevatedButton(child: const Text('Get Application Library Directory'),
              onPressed: _requestAppLibraryDirectory,)),
            FutureBuilder<Directory?>(future: _appLibraryDirectory, builder: _buildDirectory),

            Padding(padding: const EdgeInsets.all(16.0), child: ElevatedButton(child: Text(Platform.isIOS ? 'External directories are unavailable on iOS' : 'Get External Storage Directory'),
              onPressed: Platform.isIOS ? null : _requestExternalStorageDirectory,),),
            FutureBuilder<Directory?>(future: _externalDocumentsDirectory, builder: _buildDirectory),

            Column(children: <Widget>[
              Padding(padding: const EdgeInsets.all(16.0), child: ElevatedButton(
                  child: Text(Platform.isIOS
                      ? 'External directories are unavailable on iOS'
                      : 'Get External Storage Directories'),
                  onPressed: Platform.isIOS ? null : () {_requestExternalStorageDirectories(StorageDirectory.music,);},
                ),
              ),
            ]),
            FutureBuilder<List<Directory>?>(future: _externalStorageDirectories, builder: _buildDirectories),

            Column(children: <Widget>[
              Padding(padding: const EdgeInsets.all(16.0),
                child: ElevatedButton(
                  child: Text(Platform.isIOS ? 'External directories are unavailable on iOS' : 'Get External Cache Directories'),
                  onPressed: Platform.isIOS ? null : _requestExternalCacheDirectories,
                ),
              ),
            ]),
            FutureBuilder<List<Directory>?>(future: _externalCacheDirectories, builder: _buildDirectories),

            Padding(padding: const EdgeInsets.all(16.0), child: ElevatedButton(child: const Text('Get Download Directory'), onPressed: _requestDownloadDirectory,),),
            FutureBuilder<Directory?>(future: _downloadDirectory, builder: _buildDirectory),
          ],
        ),
      )
```

### 4.2 效果图

![][1]

## 五 参考

* [path_provider-example](https://pub.flutter-io.cn/packages/path_provider/example)
* [老孟学Flutter-path_provider](http://laomengit.com/guide/data_storage/path_provider.html)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-path-provider-sample.gif