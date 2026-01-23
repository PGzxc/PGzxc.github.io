---
title: Flutter开发之——getX-依赖管理(117)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: 5ce230f0
date: 2022-05-05 22:52:03
---
## 一 概述

* 实例化依赖项的4种方法 
* 使用实例化后的依赖项
* Bindings绑定类

<!--more-->

## 二 实例化依赖项的4种方法 

本文介绍实例化依赖项的4种方式，分别是：Get.put、Get.lazyPut、Get.putAsync、Get.create

### 2.1 方式一 Get.put

使用方式

```
S put<S>(S dependency,
          {String? tag,
          bool permanent = false,
          InstanceBuilderCallback<S>? builder}) =>
      GetInstance().put<S>(dependency, tag: tag, permanent: permanent);
```

示例

```
Get.put<LoginController>(LoginController(), permanent: true);
```

说明：

* 添加依赖项最常用的方式
* 有返回值，返回值为此依赖项

### 2.2 方式二 Get.lazyPut

使用方式

```
void lazyPut<S>(InstanceBuilderCallback<S> builder,
      {String? tag, bool fenix = false}) {
    GetInstance().lazyPut<S>(builder, tag: tag, fenix: fenix);
}
```

示例

```
Get.lazyPut(() => HomeController());
```

说明：

* 延迟加载依赖项，仅在使用时才实例化它
* 无返回值

### 2.3 方式三 Get.putAsync

使用方式

```
Future<S> putAsync<S>(AsyncInstanceBuilderCallback<S> builder,
          {String? tag, bool permanent = false}) async =>
      GetInstance().putAsync<S>(builder, tag: tag, permanent: permanent);
```

示例

```
Get.putAsync<SharedPreferences>(() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setInt('counter', 12345);
  return prefs;
});

Get.putAsync<YourAsyncClass>( () async => await YourAsyncClass() )
```

说明：

* 异步注册时使用

### 2.4 方式四 Get.create

使用方式

```
void create<S>(InstanceBuilderCallback<S> builder,
          {String? tag, bool permanent = true}) =>
      GetInstance().create<S>(builder, tag: tag, permanent: permanent);
```

示例

```
Get.Create<LoginController>(() => LoginController());
```

## 三 使用实例化后的依赖项

### 3.1 获取依赖项

```
final controller = Get.find<Controller>();
// OR
Controller controller = Get.find();
```

### 3.2 调用依赖项中的方法

```
controller.increment()
```

### 3.3 删除依赖项(通常不需要做，GetX自动管理)

```
Get.delete<Controller>();
```

## 四 Bindings绑定类

### 4.1 绑定类

* 定义一个类实现`Bindings`,并实现dependencies方法，在此方法中添加依赖项
* 在路由配置页面中，指定`name`页面路由、`page`显示页面、`binding`绑定类
* 经过上面2个步骤，页面通过`binding`绑定类和相关依赖(如Controller/接口等)建立联系

### 4.2 绑定类示例

![][1]

项目结构说明:

* getx_bind：项目入口文件，在此页面绑定页面和依赖项
* HomeBinding：绑定类，在此类添加依赖项(如HomeController)
* HomeView：显示页面，只负责页面内容展示
* HomeController：负责页面逻辑处理

#### get_bind 项目入口文件，在此页面绑定页面和依赖项

```
void main()=>runApp(GetMaterialApp(
  getPages: [
    GetPage(name: '/', page: ()=>HomeView(),binding: HomeBinding()),
  ],
));
```

#### HomeBinding：绑定类，在此类添加依赖项(如HomeController)

```
class HomeBinding implements Bindings{
  @override
  void dependencies() {
    Get.lazyPut(() => HomeController());
  }
}
```

#### HomeView：显示页面，只负责页面内容展示

```
class HomeView extends StatelessWidget{
  final c = Get.find<HomeController>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("Flutter Binding demo")),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('You have pushed the button this many times:',),
            Obx(()=>Text('${c.count}', style: Theme.of(context).textTheme.headline4,)),
          ],
        ),
        floatingActionButton: FloatingActionButton(child: Icon(Icons.add), onPressed: c.increment));
  }
}
```

#### HomeController：负责页面逻辑处理

```
class HomeController extends GetxController{
  var count = 0.obs;
  increment() => count++;
}
```

### 4.3 效果图
![][2]

## 五 参考

* [文档-Github/getx-依赖管理](https://github.com/jonataslaw/getx/blob/master/documentation/en_US/dependency_management.md)
* [示例代码-CSDN下载](https://download.csdn.net/download/Calvin_zhou/85294653)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-bind-07-project-struct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-bind-07-bind-preview.png
