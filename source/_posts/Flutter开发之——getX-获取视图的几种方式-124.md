---
title: Flutter开发之——getX-获取视图的几种方式(124)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: be64b616
date: 2022-05-12 16:21:05
---
## 一 概述

本文介绍在Flutter-getX中，获取视图的几种方式

* GetView：最常用，是个const Stateless Widget，GetView\<Controller>绑定控制器后可直接使用
* GetResponsiveView：响应式视图，该视图包含screen属性，其中包含关于屏幕大小和类型的信息
* GetWidget：使用较少，不是个const Stateless视图，它缓存了一个控制器

<!--more-->

## 二 GetView示例

### 2.1 GetView-Controller控制器(控制器内容相同)

```
class AwesomeController extends GetxController {
  final String title = 'My Awesome View:';
  var count = 0.obs;
  increment() => count++;
}
```

### 2.2 GetWiew-Bindings页面绑定(绑定内容所做相同)

```
class AwesomeBindings implements Bindings
{
  @override
  void dependencies() {
  Get.lazyPut(() => AwesomeController());
  }
}
```

### 2.3 GetView-Page页面(构建使用方法为Widget build)

```
class AwesomeView extends GetView<AwesomeController> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(appBar: AppBar(title:  Text('AwesomeView')),body: Container(
      padding: const EdgeInsets.all(20),
      child: Column(children: [
        Obx(()=>Text(controller.title+"${controller.count}")),
        RaisedButton(child: Text('increment'),onPressed: ()=>controller.increment())
      ],), // just call `controller.something`
    ));
  }
}
```

### 2.4 效果图

![][1]

## 三 GetResponsiveView示例

### 3.1 GetResponsiveView-Controller 控制器(控制器内容相同)

```
class GetResponsiveViewController extends GetxController{
  final String title = 'GetResponsiveView View:';
  var count = 0.obs;
  increment() => count++;

}
```

### 3.2 GetResponsiveView-bindings页面绑定(绑定内容所做相同)

```
class GetResponsiveViewBindings implements Bindings{
  @override
  void dependencies() {
    Get.lazyPut(() => GetResponsiveViewController());
  }
}
```

### 3.3 GetResponsiveView-Page 页面(构建使用方法是Widget builder())

```
class GetResponsiveViewSample extends GetResponsiveView<GetResponsiveViewController> {
  // GetResponsiveViewSample({Key? key})
  //     : super(
  //           key: key,
  //           settings: const ResponsiveScreenSettings(
  //               desktopChangePoint: 800,
  //               tabletChangePoint: 700,
  //               watchChangePoint: 600));

  @override
  Widget builder() {
    return Scaffold(
      appBar: AppBar(title: Text('GetResponsiveViewSample')),
      body: Container(
        padding: const EdgeInsets.all(20),
        child: _buildWidgetPage(), // just call `controller.something`
      ),
    );
  }

  Widget _buildWidgetPage() {
    return Column(children: [
      Text("width:${screen.width},height:${screen.height},isPhone:${screen.isPhone}"),
      SizedBox(height: 20),
      Obx(() => Text(controller.title + "${controller.count}")),
      RaisedButton(child: Text('increment'), onPressed: () => controller.increment())
    ]);
  }
}
```

说明：此处的页面构建使用的是`Widget builder()`，其他页面构建使用的是`Widget build(BuildContext context)`

### 3.4 效果图

![][2]
## 四 GetWidget示例

### 4.1 GetWidget-Controller控制器(控制器内容相同)

```
class GetWidgetController extends GetxController{
  final String title = 'GetWidget View:';
  var count = 0.obs;
  increment() => count++;
}
```

### 4.2 GetWidget-bindings页面绑定(绑定内容所做相同)

```
class GetWidgetBindings implements Bindings{
  @override
  void dependencies() {
   Get.lazyPut(() => GetWidgetController());
  }
}
```

### 4.3 GetWidget-Page页面(构建使用方法为Widget build(BuildContext context))

```
class GetWidgetSample extends GetWidget<GetWidgetController>{

  @override
  Widget build(BuildContext context) {
    return Scaffold(appBar: AppBar(title:  Text('GetWidget')),body: Container(
      padding: const EdgeInsets.all(20),
      child: _buildWidetPage(), // just call `controller.something`
    ));
  }
  Widget _buildWidetPage(){
    return  Column(children: [
      Obx(()=>Text(controller.title+"${controller.count}")),
      RaisedButton(child: Text('increment'),onPressed: ()=>controller.increment())
    ]);
  }
}
```

### 4.4 效果图

![][3]

## 五 参考

* [Github-getX-视图官方文档](https://github.com/jonataslaw/getx#getview)
* [CSDN下载-示例代码](https://download.csdn.net/download/Calvin_zhou/85355930)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-view-13-getview-preview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-view-13-getresponsive-preview.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-view-13-getwidget-preview.png
