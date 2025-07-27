---
title: Flutter开发之——监听堆栈变化(90)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 86d1cd3c
date: 2021-06-18 13:32:17
---
## 一 概述

* 为什么要监听路由堆栈变化
* 如何监听路由堆栈
* 路由堆栈示例

<!--more-->

## 二 为什么要监听路由堆栈变化

* 当由页面A跳转到页面B时，堆栈及状态发生了变化
* 页面跳转时的变化状态有：didPush(跳转)/didPushNext(下一个)、didPop(返回)/didPopNext(返回上一个)
* 通过路由堆栈监听，可以自定义路由堆栈，方便分析异常日志等

## 三 如何监听路由堆栈

### 3.1 几个关键字

**navigatorObservers(路由监听列表)**

```
  const MaterialApp({
    Key? key,
    Map<String, WidgetBuilder> this.routes = const <String, WidgetBuilder>{},
    this.initialRoute,
    List<NavigatorObserver> this.navigatorObservers = const <NavigatorObserver>[],
  }
```

* MaterialApp的一个属性，用于监听StatefulWidget的路由状态
* navigatorObservers接收一个RouteObserver数组

**RouteObserver(路由监听)**

```
class RouteObserver<R extends Route<dynamic>> extends NavigatorObserver {
  final Map<R, Set<RouteAware>> _listeners = <R, Set<RouteAware>>{};
  /// Subscribe [routeAware] to be informed about changes to [route]. 
}  
```

* 继承`NavigatorObserver`，监听页面的路由变化
* 通过`RouteAware`接口回调通知状态变化
* 接收参数`Route`

**Route**

* 抽象类，定义路由信息(RouteSettings)
* 常用子类有：ModalRoute、PageRoute等

**RouteAware**

* 接口，定义路由的状态回调
* 接口方法有：didPop、didPopNext、didPush、didPushNext
* 通过`State<StatefulWidget>with RouteAware`监听状态，并回调上面接口中的方法

### 3.2 路由监听

**开始监听**

```
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    routeObserver.subscribe(this, ModalRoute.of(context));
  }
```

**结束监听**

```
 @override
  void dispose() {
    super.dispose();
    routeObserver.unsubscribe(this);
  }
```

## 四 路由堆栈示例

###  4.1 示例一(从A页面跳转路由监听页面)

** MaterialApp组件中添加**

```
RouteObserver<PageRoute> routeObserver=RouteObserver<PageRoute>();
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: <String, WidgetBuilder>{
        "/M":(context)=>MyApp(),
        "/B":(context)=>BPage(),
        "/C":(context)=>CPage(),
        "/D":(context)=>DPage(),
        "/P":(context)=>ProductDetail(),
        "/ARouteObserver":(context)=>ARouteObserverDemo(),
        "/BRouteObserver":(context)=>BRouteObserverDemo(),
      },
      navigatorObservers: [routeObserver],
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue,),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```

**路由监听**

```
class ARouteObserverDemo extends StatefulWidget {
  @override
  _RouteObserverDemoState createState() => _RouteObserverDemoState();
}
class _RouteObserverDemoState extends State<ARouteObserverDemo> with RouteAware {
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    routeObserver.subscribe(this, ModalRoute.of(context));
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        alignment: Alignment.center,
        child: RaisedButton(
          child: Text('A RouteObserver'),
          onPressed: () {
            Navigator.of(context).pushNamed('/BRouteObserver');
          },
        ),
      ),
    );
  }
  @override
  void dispose() {
    super.dispose();
    routeObserver.unsubscribe(this);
  }
  @override
  void didPush() {
    final route = ModalRoute.of(context).settings.name;
    print('A-didPush route: $route');
  }
  @override
  void didPopNext() {
    final route = ModalRoute.of(context).settings.name;
    print('A-didPopNext route: $route');
  }
  @override
  void didPushNext() {
    final route = ModalRoute.of(context).settings.name;
    print('A-didPushNext route: $route');
  }
  @override
  void didPop() {
    final route = ModalRoute.of(context).settings.name;
    print('A-didPop route: $route');
  }
}
```

其中 didPush、didPushNext、didPopNext、didPop 为路由堆栈变化的回调。

**页面跳转及打印**

从 A 页面跳转到 ARouteObserverDemo 页面，日志输出如下

```
flutter: A-didPush route: /ARouteObserver
```

进入此页面只调用了 didPush

### 4.2 示例二(从路由监听A页面跳转路由监听B页面)

**路由监听B页面(MaterialApp及A页面同上)**

```
class _BRouteObserverDemo extends State<BRouteObserverDemo> with RouteAware {

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    routeObserver.subscribe(this, ModalRoute.of(context));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        alignment: Alignment.center,
        child: RaisedButton(
          child: Text('B RouteObserver'),
          onPressed: () {
            //Navigator.of(context).pushNamed('/ARouteObserver');
            Navigator.of(context).pop();
          },
        ),
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
    routeObserver.unsubscribe(this);
  }

  @override
  void didPush() {
    final route = ModalRoute.of(context).settings.name;
    print('B-didPush route: $route');
  }

  @override
  void didPopNext() {
    final route = ModalRoute.of(context).settings.name;
    print('B-didPopNext route: $route');
  }

  @override
  void didPushNext() {
    final route = ModalRoute.of(context).settings.name;
    print('B-didPushNext route: $route');
  }

  @override
  void didPop() {
    final route = ModalRoute.of(context).settings.name;
    print('B-didPop route: $route');
  }
}
```

** 从 ARouteObserverDemo 页面跳转到 BRouteObserverDemo 页面**

```
flutter: A-didPushNext route: /ARouteObserver
flutter: B-didPush route: /BRouteObserver
```

先调用了 ARouteObserverDemo 页面的 didPushNext，然后调用了 BRouteObserverDemo 页面的 didPush。

**从 BRouteObserverDemo 页面执行 pop 返回 ARouteObserverDemo 页面**

```
flutter: A-didPopNext route: /ARouteObserver
flutter: B-didPop route: /BRouteObserver
```

先调用了 ARouteObserverDemo 页面的 didPopNext，然后调用了 BRouteObserverDemo 页面的 didPop。