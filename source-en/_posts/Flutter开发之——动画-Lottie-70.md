---
title: Flutter开发之——动画-Lottie(70)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 4b428f9f
date: 2021-05-07 11:02:33
---
## 一 概述

* Lottie是Aribnb开源的面向Android，iOS等的高性能动画库
* Flutter原生库不支持Lottie，但是可以通过第三方插件实现Lottie的动画效果

<!--more-->

## 二 导入lottie_flutter插件

### 2.1 插件地址

[Lottie for Flutter](https://github.com/xvrh/lottie-flutter)：https://github.com/xvrh/lottie-flutter

### 2.2 如何导入

* 点击pubv1.0.1，跳转到flutter package lottie页面
![][1]

* 打开flutter package lottie后，切换到install选项卡，按照步骤依次执行如下操作
  ![][2]
  
  ```
  //cmd终端执行
  flutter pub add lottie
  //pubspec.yaml添加依赖
  dependencies:
    lottie: ^1.0.1
  ```

## 三 Lottie素材

https://lottiefiles.com/featured

## 四 示例-1 简单动画

### 4.1  下载Lottie文件并添加依赖

```
  assets:
     - assets/kills-corona.json
     - assets/jumping.zip
```

### 4.2 代码(json文件/网络文件/zip文件)

```
body:ListView(
    children: [
            Lottie.asset('assets/kills-corona.json',width: 150,height: 150),
            Divider(thickness: 2,color: Colors.red,),
            Lottie.network('https://assets2.lottiefiles.com/packages/lf20_pqdnvhfb.json',width: 150,height: 150),
            Divider(thickness: 2,color: Colors.red,),
            Lottie.asset('assets/jumping.zip',width: 150,height: 150),
          ],
        )
```

### 4.3 效果图
![][3]

## 五 示例-2 控制Lottie动画

### 5.1  下载Lottie文件并添加依赖

```
  assets:
     - assets/heart-icon.json
```

### 5.2 代码

```
class _MyHomePageState extends State<MyHomePage> with TickerProviderStateMixin {

  //lottie动画控制器
  AnimationController _controller;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);
  }
 @override
  void dispose() {
    super.dispose();
    _controller.dispose();
  }
   @override
  Widget build(BuildContext context) {
    _getLocalFile();
    return Scaffold(
        appBar: AppBar(title: Text(widget.title), backgroundColor: Colors.orange, centerTitle: true,),
          body:ListView(
          children: [
            Lottie.asset('assets/heart-icon.json',controller:_controller,onLoaded:(composition){
              _controller..duration=composition.duration;
            } ,width: 150,height: 150),
            Divider(thickness: 3,color: Colors.red,),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                RaisedButton(onPressed: (){_controller.reverse();},child: Text("反向"),),
                RaisedButton(onPressed: (){_controller.stop();},child: Text("暂停"),),
                RaisedButton(onPressed: (){_controller.forward();},child: Text("正向"),),
                RaisedButton(onPressed: (){lottieRepeat();},child: Text("重复"))
              ],
            )
          ],
        )
      );
}
```

### 5.3 效果图
![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-lottie-pub-click.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-lottie-install.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-lottie-simple.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-lottie-controller.gif