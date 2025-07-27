---
title: Flutter开发之——动画-Rive(73)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: bb4845c7
date: 2021-05-10 14:23:06
---
## 一 概述

* Rive是Flare的升级版本，是一个实时交互设计和动画工具。
* 文件的后缀名是`.riv`，加载动画时使用的是[Rive Flutter runtime](https://github.com/rive-app/rive-flutter)
* Rive支持跨平台，支持Web，IOS，Android，Flutter，C++等终端

<!--more-->

## 二 Rive

### 2.1 仓库地址

[Rive](https://github.com/rive-app/rive-flutter)：https://github.com/rive-app/rive-flutter

### 2.2 插件地址

[rive 0.7.9](https://pub.dev/packages/rive)：https://pub.dev/packages/rive

### 2.3 插件的安装及卸载

#### 插件安装

打开CMD终端，执行如下指令(自动添加pubspec.yaml依赖)

```
flutter pub add rive
```

#### 插件卸载

打开CMD终端，执行如下指令(pubspec.yaml依赖被删除)

```
flutter pub remove rive
```

## 三 Rive素材

### 3.1 素材资源

https://rive.app/community/
![][1]

### 3.2 素材下载

* 在素材页面，选择素材进入详情页，选择右侧的`Open in Preview Player`打开

  ![][2]
  
* 查看可供执行的Animation(如图：Walk，Hit，In)

  ![][3]
  
* 返回素材详情页进行下载(下载后的文件名为`205-467-zombie-character.riv`可改名为`zombie.riv`)

  ![][4]
  
## 四 示例

### 4.1 添加Riv依赖(assets下所有文件)

```
 assets:
    - images/
    - assets/
```

### 4.2 代码(通过设置不同名称，显示动画效果)

```
class _MyHomePageState extends State<MyHomePage> 
{
  //rive
  Artboard _riveArtboard;
  RiveAnimationController _controller;
  bool get isPlaying => _controller?.isActive ?? false;

  @override
  void initState() {
    super.initState();
    rootBundle.load("assets/zombie.riv").then((value) async {
      final file = RiveFile.import(value);
      final artboard = file.mainArtboard;
      artboard.addController(_controller = SimpleAnimation('idle'));
      setState(() => _riveArtboard = artboard);
    });
  }
 @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
          children: [
            Flexible(child:  _riveArtboard == null ?  Container(color: Colors.blue,) : Rive(artboard:_riveArtboard, alignment:Alignment.center, fit:BoxFit.contain, )),
            Column(
              mainAxisAlignment:MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                RaisedButton(child: Text("Walk"),onPressed: (){setState(() { _riveArtboard.addController(_controller = SimpleAnimation('Walk'));});}),
                RaisedButton(child: Text("Hit"),onPressed: (){setState(() { _riveArtboard.addController(_controller = SimpleAnimation('Hit'));});}),
                RaisedButton(child: Text("In"),onPressed: (){setState(() {_riveArtboard.addController(_controller = SimpleAnimation('In'));});})
            ],)
          ],
        ),
        floatingActionButton: FloatingActionButton(
        onPressed: _togglePlay,
        tooltip: isPlaying ? 'Pause' : 'Play',
       child: Icon(
        isPlaying ? Icons.pause : Icons.play_arrow,
        ),
    )
    );
  }

  void _togglePlay() {
    setState(() => _controller.isActive = !_controller.isActive);
  }
}
```

### 4.3 效果图
![][5]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-rive-web-resouce.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-rive-anim-open-player.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-rive-animation-name.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-rive-animals-download.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-rive-animal-result.gif