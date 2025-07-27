---
title: Flutter开发之——getX-状态管理(112)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: 3d7b6b2c
date: 2022-04-30 23:00:03
---
## 一 概述

* 状态管理说明
* 未使用getX和使用getX状态管理区别
* 反应式状态管理(GetX/Obx)
* 简单状态管理(GetBuilder)

<!--more-->

## 二 状态管理说明

### 2.1 状态

* 百度百科：状态是人或事物表现出来的形态。是指现实（或虚拟）事物处于生成、生存、发展、消亡时期或各转化临界点时的形态或事物态势
* 此处：指的是变量的值

### 2.2 状态管理的方式

* 其他状态管理器：Streams或者ChangeNotifier
* 此处：反应式状态管理(GetX/Obx)和简单状态管理(GetBuilder)

## 三 未使用getX和使用getX状态管理区别(点击按钮进行自增)

### 3.1 未使用getX之前

1-定义自增变量

```
int _counter = 0;
```

2-点击按钮，onPressed时调用`_incrementCounter`函数

```
floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      )
```

3-`_incrementCounter`函数)(通过setState函数让变量自增)

```
void _incrementCounter() {
    setState(() {
      _counter++;
    });
}
```

4-自增显示

```
Text('$_counter',style: Theme.of(context).textTheme.headline4)     
```

### 3.2 使用getX改写之后

1-定义变量值及自增函数(变量值后+.obs)

```
class Controller{
  var count = 0.obs;
  increment() => count++;
}
```

2-点击按钮，函数调用位置

```
floatingActionButton:FloatingActionButton(child: Icon(Icons.add), onPressed: c.increment));
```

3-变量显示(Obx(()=>))

```
appBar: AppBar(title: Obx(() => Text("Clicks: ${c.count}"))),
```

## 四 反应式状态管理(GetX/Obx)

反应式状态管理的步骤：

1. 让变量转换为可观察到类型
2. 在视图中显示可观察变量的值：2种方式(GetX/Obx)

### 4.1 让变量转换为可观察到类型

#### 方式一(Rx{Type})

```
final name = RxString('');
final isLogged = RxBool(false);
final count = RxInt(0);
final balance = RxDouble(0.0);
final items = RxList<String>([]);
final myMap = RxMap<String, int>({});
```

#### 方式二(Rx\<Type>)，Type可以是自定义对象类型

```
  final isLogged = Rx<bool>(false);
  final count = Rx<int>(0);
  final balance = Rx<double>(0.0);
  final number = Rx<num>(0);
  final items = Rx<List<String>>([]);
  final myMap = Rx<Map<String, int>>({});

  // 对象
  final user = Rx<User>(User(name: "张三", age: 18));
  
  class User {
  User({required String name, required int age});
  var name;
  var age;
}
```

#### 方式三( 变量末尾添加`.obs`)

```
  final name = ''.obs;
  final isLogged = false.obs;
  final count = 0.obs;
  final balance = 0.0.obs;
  final number = 0.obs;
  final items = <String>[].obs;
  final myMap = <String, int>{}.obs;

  //初始化对象类型
  final user = User(name: '张三',age: 18).obs;
```

#### 对象实现obs的方式(User)

1-让对象中的每个变量都实现obs

```
class RxUser {
  final name = "Camila".obs;
  final age = 18.obs;
}
```

2-使用Rx监听

```
final user = Rx<User>(User(name: "张三", age: 18));
```

3-对象.obs

```
final user = User(name: "Camila", age: 18).obs;
```

### 4.2 在视图中显示可观察变量的值(自增的值)

#### 可观察到变量

```
var count = 0.obs;
```

#### 通过Obx显示变量的值

```
appBar: AppBar(title: Obx(() => Text("Clicks: ${c.count}")))
```

#### 通过GetX显示变量的值

1-Controller继承GetxController

```
class Controller extends GetxController{
  var count = 0.obs;
  increment() => count++;
}
```

2-用GetX替换Obx

```
appBar: AppBar(title: GetX<Controller>(builder: (c){
          return Text("Clicks: ${c.count}");
        })),
```

说明：可以使用c.count，可以使用c.count.value

## 五 简单状态管理(GetBuilder)

### 5.1 简单状态管理说明

* 用于仅仅更新小Widgets，使用内存较少的情况
* 不再使用变量.obs，取而代之的是在变量改变后，使用update()方法更新UI
* 在UI更新的位置，使用GetBuilder，init设置控制器逻辑，builder中设置界面UI

### 5.2 GetBuilder使用示例

#### Controller修改

```
class Controller extends GetxController{
  var count = 0;
  void increment() {
    count++;
    update();
  }
}
```

说明：

* Controller类继承GetxController，去掉变量的后缀.obs修饰
* 调用increment方法，变量自增后，调用update(GetxController中方法)，会自动更新GetBuilder位置出的变量显示

#### Home显示修改

```
appBar: AppBar(title: GetBuilder<Controller>(
         init: Controller(),//近在第一次初始化
         builder: (c) => Text(
           '${c.count}',
         ),
 )),
```

## 六 参考

[Github/getx官方文档](https://github.com/jonataslaw/getx/blob/master/documentation/en_US/state_management.md#)


