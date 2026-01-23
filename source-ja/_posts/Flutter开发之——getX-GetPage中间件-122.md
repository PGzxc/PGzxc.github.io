---
title: Flutter开发之——getX-GetPage中间件(122)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: 70952f8a
date: 2022-05-10 21:19:16
---
## 一 概述

* GetPage Middleware中间件介绍
* 如何定义GetMiddleware
* GetPage Middleware使用示例

<!--more-->

## 二 GetPage Middleware中间件介绍

### 2.1 什么是Middleware中间件

* 中间件是介于应用系统和[系统软件](https://baike.baidu.com/item/系统软件/215962)之间的一类软件，它使用系统软件所提供的基础服务（功能），衔接网络上应用系统的各个部分或不同的应用，能够达到资源共享、功能共享的目的[百度百科](https://baike.baidu.com/item/%E4%B8%AD%E9%97%B4%E4%BB%B6/452240)
* 此处指：执行路由跳转前的页面，比如Get.to()跳转之前的那个页面

### 2.2 GetPage Middleware在那里配置

```
void main() => runApp(GetMaterialApp(
      getPages: [
        GetPage(
            name: '/home',
            page: () => HomeWidget(),
            middlewares: [GetMiddleware(priority: 1), GetMiddleware(priority: 2)])
      ],
    ));
```

说明：

* 在main.dart中的GetMaterialApp/getPages/GetPage进行配置
* middlewares是个数组，可配置多个，并且有优先级
* middlewares的配置，在要跳转的页面进行配置，不是跳转前页面配置

## 三 如何定义GetMiddleware

### 3.1 定义一个类继承GetMiddleware

```
class MiddleWare1 extends GetMiddleware {}
```

### 3.2 设置优先级priority

```
class MiddleWare1 extends GetMiddleware {
  @override
  // TODO: implement priority
  int? get priority => -1;
 } 
```

说明：优先级越低越先执行

### 3.3 重写GetMiddleware中的几个方法

```
class MiddleWare1 extends GetMiddleware {
  @override
  // TODO: implement priority
  int? get priority => -1;
  //重定向，当正在搜索被调用路由的页面时，将调用该函数
  @override
  RouteSettings? redirect(String? route) {
    print('redirect1----');
    //return super.redirect(route);
    return const RouteSettings(name: AppRoutes.login);
  }

//创建任何内容之前调用此函数
  @override
  GetPage? onPageCalled(GetPage? page) {
    print('onPageCalled1----');
    //return super.onPageCalled(page);
    //return page?.copy(name: AppRoutes.login);
    return GetPage(name: AppRoutes.login, page: () => LoginWidget());
  }

  //这个函数将在绑定初始化之前被调用。在这里您可以更改此页面的绑定。
  @override
  List<Bindings>? onBindingsStart(List<Bindings>? bindings) {
    print('onBindingsStart1----');
    //return super.onBindingsStart(bindings);
    bindings?.add(LoginBinding());
    return bindings;
  }

//此函数将在绑定初始化后立即调用。在这里，您可以在创建绑定之后和创建页面小部件之前执行一些操作
  @override
  GetPageBuilder? onPageBuildStart(GetPageBuilder? page) {
    print('onPageBuildStart1----');
    //return super.onPageBuildStart(page);
    return page;
  }

  //该函数将在调用 GetPage.page 函数后立即调用，并为您提供函数的结果。并获取将显示的小部件
  @override
  Widget onPageBuilt(Widget page) {
    print('onPageBuilt1 ----');
    //return super.onPageBuilt(page);
    return page;
  }

//此函数将在处理完页面的所有相关对象（控制器、视图等）后立即调用
  @override
  void onPageDispose() {
    print('onPageDispose1 ----');
    super.onPageDispose();
  }
}
```

说明：

* RouteSettings? redirect：搜索路由进行重定向时执行此方法，比如Get.to()
* GetPage? onPageCalled：跳转到到页面显示执行此方法，通过`page?.copy(name: AppRoutes.login)`或者`GetPage(name: AppRoutes.login, page: () => LoginWidget())`显示页面
* List\<Bindings>? onBindingsStart：页面显示绑定初始化调用位置
* GetPageBuilder? onPageBuildStart：绑定初始化后立即调用位置
* Widget onPageBuilt：返回GetPage.page的页面
* void onPageDispose()：页面处理完调用函数位置

## 四 GetPage Middleware使用示例

### 4.1 效果图说明

| 跳转页面 | 要跳转到页面 | 中间件1(优先度) | 中间件2(优先度) |
| :------: | :----------: | :-------------: | :-------------: |
|  ![][1]  |    ![][2]    |     ![][3]      |     ![][4]      |

说明：

* 在Me界面，点击切换路由—Detail按钮
* 如果没有中间件，点击此按钮，会跳转到Detail界面
* 设置了middlewares，如果优先级为Login的Middle，则显示Login界面
* 设置了middlewares，如果优先级为Other的Middle，则显示Other界面

### 4.2 代码示例

#### main中的routes

```
  static final List<GetPage> routes = [
    GetPage(
      name: AppRoutes.main,
      page: () => IndexWidget(),
      binding: IndexBinding(),
    ),
    GetPage(
        name: AppRoutes.login,
        page: () => LoginWidget(),
        binding: LoginBinding()),
    GetPage(
      name: AppRoutes.detail,
      page: () => DetailWidget(),
      middlewares: [MiddleWare1(), MiddleWare2()],
    ),
    GetPage(name: AppRoutes.other, page: () => OtherWidget())
  ];
```

说明：在Detail设置middlewares，用于拦截中间件

#### MeWidget界面中的点击按钮

```
class MeWidget extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Center(child: Column(children: [
      Text('Me'),
      RaisedButton(child: Text("切换路由-Detail"),onPressed: ()=>{Get.toNamed(AppRoutes.detail)})
    ],));
  }
}
```

说明：此处的路由搜索为detail，执行方法为Get.toName

#### 自定义MiddleWare1

```
class MiddleWare1 extends GetMiddleware {
  @override
  // TODO: implement priority
  int? get priority => -1;
  //重定向
  @override
  RouteSettings? redirect(String? route) {
    print('redirect1----');
    //return super.redirect(route);
    return const RouteSettings(name: AppRoutes.login);
  }

//创建任何内容之前调用此函数
  @override
  GetPage? onPageCalled(GetPage? page) {
    print('onPageCalled1----');
    //return super.onPageCalled(page);
    //return page?.copy(name: AppRoutes.login);
    return GetPage(name: AppRoutes.login, page: () => LoginWidget());
  }

  //这个函数将在绑定初始化之前被调用。在这里您可以更改此页面的绑定。
  @override
  List<Bindings>? onBindingsStart(List<Bindings>? bindings) {
    print('onBindingsStart1----');
    //return super.onBindingsStart(bindings);
    bindings?.add(LoginBinding());
    return bindings;
  }

//此函数将在绑定初始化后立即调用。在这里，您可以在创建绑定之后和创建页面小部件之前执行一些操作
  @override
  GetPageBuilder? onPageBuildStart(GetPageBuilder? page) {
    print('onPageBuildStart1----');
    //return super.onPageBuildStart(page);
    return page;
  }

  //该函数将在调用 GetPage.page 函数后立即调用，并为您提供函数的结果。并获取将显示的小部件
  @override
  Widget onPageBuilt(Widget page) {
    print('onPageBuilt1 ----');
    //return super.onPageBuilt(page);
    return page;
  }

//此函数将在处理完页面的所有相关对象（控制器、视图等）后立即调用
  @override
  void onPageDispose() {
    print('onPageDispose1 ----');
    super.onPageDispose();
  }
}
```

#### 自定义MiddleWare2

```
class MiddleWare2 extends GetMiddleware{

  @override
  // TODO: implement priority
  int? get priority =>-2;
  //重定向
  @override
  RouteSettings? redirect(String? route) {
    print('redirect2----');
    //return super.redirect(route);
    return const RouteSettings(name: AppRoutes.other );
  }

  //onPageCalled
  @override
  GetPage? onPageCalled(GetPage? page) {
    print('onPageCalled2----');
    //return super.onPageCalled(page);
    return page?.copy(name: AppRoutes.other);
    //return GetPage(name: AppRoutes.other, page:()=> OtherWidget());
  }
  //onBindingsStart
  @override
  List<Bindings>? onBindingsStart(List<Bindings>? bindings) {
    print('onBindingsStart2----');
    //return super.onBindingsStart(bindings);
    return bindings;
  }
  //onPageBuildStart
  @override
  GetPageBuilder? onPageBuildStart(GetPageBuilder? page) {
    print('onPageBuildStart2----');
    return super.onPageBuildStart(page);
  }
  //onPageBuilt
  @override
  Widget onPageBuilt(Widget page) {
    print('onPageBuilt2 ----');
    return super.onPageBuilt(page);
  }
  //onPageDispose
  @override
  void onPageDispose() {
    print('onPageDispose2 ----');
    super.onPageDispose();
  }

}
```

## 五 参考

* [Github-getX-GetPage Middleware-官方文档](https://github.com/jonataslaw/getx#getpage-middleware)
* [CSDN下载-参考代码](https://download.csdn.net/download/Calvin_zhou/85341542)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-middleware-11-me.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-middleware-11-detail.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-middleware-11-priority-1.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-middleware-11-priority-2.png



