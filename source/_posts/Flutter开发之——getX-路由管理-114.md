---
title: Flutter开发之——getX-路由管理(114)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: e764ff7b
date: 2022-05-02 22:47:38
---
## 一 概述

* 路由跳转(不使用named命名和使用named命名)
* 路由跳转传值
* 路由中间件Middleware
* 路由嵌套导航

<!--more-->

## 二 路由跳转(不使用named命名和使用named命名)

### 2.1 前提(GetMaterialApp取代MaterialApp)

```
GetMaterialApp( // Before: MaterialApp(
  home: MyHome(),
)
```

说明：

* GetMaterialApp：GetX自带的MaterialApp，配置路由表，管理路由入栈、出栈等操作
* MaterialApp：系统自带的MaterialApp，路由页面之间的操作通过Navigator操作，较为复杂

### 2.2 路由导航各种方式比较

#### 系统自带(Navigator)

```
Navigator.of(context).push(
  context,
  MaterialPageRoute(
    builder: (BuildContext context) {
      return HomePage();
    },
  ),
);
```

#### GetX-navigator方式

```
navigator?.push(MaterialPageRoute(
      builder: (_){
        return Home();
      }
    ));
```

#### GetX-to方式

```
Get.to(Home());
```

### 2.3 路由跳转(不使用named命名)

* Get.to(NextScreen())：跳转到新页面(新页面带导航按钮可返回)
* Get.off(NextScreen())：跳转到新页面(上一个页面页面出栈，关闭上一个页面，没有返回按钮)
* Get.offAll(NextScreen())：跳转到新页面，并关闭之前的所有页面(没有返回按钮)
* Get.back()：返回到上一个页面(对应于Get.to放到到路由页面跳转有效，off方法页面跳转无效)

### 2.4 路由跳转(使用named命名方式)

#### 配置路由表(跳转前，路由页面先在getPages中配置好)

```
void main() => runApp(GetMaterialApp(
    initialRoute: '/',
    getPages: [
      GetPage(name: '/NextScreen', page: ()=>NextScreen()),
    ],
    home: Home()));
```

#### 使用named命名方式路由跳转

* Get.toNamed("/NextScreen")：同Get.to(NextScreen())方式，跳转到新页面(新页面带导航按钮可返回)
* Get.offNamed("/NextScreen")：同Get.off(NextScreen())，跳转到新页面(上一个页面页面出栈，关闭上一个页面，没有返回按钮)
* Get.offAllNamed("/NextScreen")：同Get.offAll(NextScreen())，跳转到新页面，并关闭之前的所有页面(没有返回按钮)

### 2.5 未定义导航问题，比如404错误

1-在 GetMaterialApp 中定义一个 unknownRoute 页面

```
void main() => runApp(GetMaterialApp(
    unknownRoute: GetPage(name: '/notfound', page: () => UnknownRoutePage()),
    initialRoute: '/',
    getPages: [
      GetPage(name: '/NextScreen', page: ()=>NextScreen()),
    ],
    home: Home()));
```

2- 通过named方式跳转时，路由出错时，跳转到UnknownRoutePage页面

```
levatedButton(child: Text("Error"), onPressed: () => Get.toNamed("/NextScreen1")),
```

说明：NextScreen1找不到此路径，出现问题时，交由UnknownRoutePage显示处理

## 三 路由跳转传值

### 3.1 传递值

* 通过arguments方式指定

  ```
  Get.toNamed("/NextScreen", arguments: 'Get is the best');
  ```

* 通过named方式，放在路由页面的后面用问号间隔开，比如

  ```
  Get.offAllNamed("/NextScreen?device=phone&id=354&name=Enzo");
  ```

### 3.2 接收值(controller/bloc/stateful/stateless都可以接受)

* 通过arguments方式传递的，值接受方式

  ```
   var argument= Get.arguments;
  ```

* 通过named方式传递的，值接受方式

  ```
   var device=Get.parameters['device'];
   var id=  Get.parameters['id'];
   var name= Get.parameters['name'];
  ```

## 四 路由中间件Middleware

### 4.1 什么是中间件Middleware

* 设置路由监听，当路由事件触发时，调用`routingCallback`回调
* 在`routingCallback`回调中，进行业务逻辑的处理

### 4.2 监听事件

```
void main() => runApp(GetMaterialApp(
    unknownRoute: GetPage(name: '/notfound', page: () => UnknownRoutePage()),
    routingCallback: (routing) {
      if(routing?.current == '/second'){
        openAds();
      }
    },
    initialRoute: '/',
    getPages: [
      GetPage(name: '/NextScreen', page: ()=>NextScreen()),
      GetPage(name: '/second', page: ()=>Second())
    ],
    home: Home()));

void openAds()
{
  print('ads');
}
```

### 4.3 事件发生

```
ElevatedButton(child: Text("MiddleWare"), onPressed: () => Get.toNamed('/second')),
```

说明：使用Get.to(Second())；方法时，注意Second的大小写

### 4.4 结果

事件被触发，ads被打印

## 五 路由嵌套导航

### 5.1 效果图

| 导航嵌套-1 | 导航嵌套-2 |
| :--------: | :--------: |
|   ![][1]   |   ![][2]   |

### 5.2 导航嵌套代码

```
Navigator(
  key: Get.nestedKey(1), // create a key by index
  initialRoute: '/',
  onGenerateRoute: (settings) {
    if (settings.name == '/') {
      return GetPageRoute(
        page: () => Scaffold(
          appBar: AppBar(
            title: Text("Main"),
          ),
          body: Center(
            child: TextButton(
              color: Colors.blue,
              onPressed: () {
                Get.toNamed('/second', id:1); // navigate by your nested route by index
              },
              child: Text("Go to second"),
            ),
          ),
        ),
      );
    } else if (settings.name == '/second') {
      return GetPageRoute(
        page: () => Center(
          child: Scaffold(
            appBar: AppBar(
              title: Text("Main"),
            ),
            body: Center(
              child:  Text("second")
            ),
          ),
        ),
      );
    }
  }
),
```

## 六 参考

* [Github-getX-route_management](https://github.com/jonataslaw/getx/blob/master/documentation/en_US/route_management.md)
* [Github-参考代码](https://github.com/PGzxc/getx_route)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-04-nestednav-main.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-04-nestednav-second.png