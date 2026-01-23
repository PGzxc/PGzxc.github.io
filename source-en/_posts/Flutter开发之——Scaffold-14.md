---
title: Flutter开发之——Scaffold(14)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: a6cd71e0
date: 2021-03-19 17:38:39
---
## 一 概述(Scaffold)

* Scaffold译为脚手架，建筑领域中，指保证施工过程顺利而搭建的工作平台
* 在编程领域中与此类似，脚手架的作用就像是一个功能强大的布局容器
* Scaffold容器中定义好了导航栏、抽屉、悬浮按钮、内容试图等区域
* 开发者只需要根据界面的需要，来填充脚手架的内容即可

<!--more-->

## 二 Scaffold介绍

### 2.1 Scaffold源码

```
class Scaffold extends StatefulWidget {
  /// Creates a visual scaffold for material design widgets.
  const Scaffold({
    Key? key,
    this.appBar, //布局顶部的appBar工具栏
    this.body, //内容区域
    this.floatingActionButton, //悬浮按钮
    this.floatingActionButtonLocation, //悬浮按钮位置
    this.floatingActionButtonAnimator, //悬浮按钮动画
    this.persistentFooterButtons,//介于[body]和[bottomNavigationBar]之间的一组按钮
    this.drawer, //左边的抽屉
    this.onDrawerChanged,//左边抽屉发生变化
    this.endDrawer, //右边的抽屉
    this.onEndDrawerChanged, //右边抽屉发生变化
    this.bottomNavigationBar, //底部导航菜单
    this.bottomSheet,//底部持久化提示框
    this.backgroundColor, //内容背景色
    this.resizeToAvoidBottomPadding,//键盘出现时，界面重新布局(已过时)
    this.resizeToAvoidBottomInset, //键盘出现时，界面重新布局(代替resizeToAvoidBottomPadding)
    this.primary = true,//AppBar是否显示在屏幕顶部(默认显示为true)
    this.drawerDragStartBehavior = DragStartBehavior.start,
    this.extendBody = false,
    this.extendBodyBehindAppBar = false,
    this.drawerScrimColor,
    this.drawerEdgeDragWidth,
    this.drawerEnableOpenDragGesture = true,
    this.endDrawerEnableOpenDragGesture = true,
  }) : assert(primary != null),
       assert(extendBody != null),
       assert(extendBodyBehindAppBar != null),
       assert(drawerDragStartBehavior != null),
       super(key: key);

```

### 2.2 属性解释

|         属性名          |           说明           |     取值      |
| :---------------------: | :----------------------: | :-----------: |
|         appBar          |          导航栏          |  AppBar对象   |
|     backgroundColor     |         背景颜色         |   Color对象   |
|          body           |           内容           |    Widget     |
|   bottomNavigationBar   |        底部导航栏        |    Widget     |
|       bottomSheet       |   持久化显示的底部抽屉   |    Widget     |
|         drawer          |         左侧抽屉         |    Widget     |
|        endDrawer        |         右侧抽屉         |    Widget     |
|  floatingActionButton   |         悬浮按钮         |    Widget     |
| persistentFooterButtons |       底部按钮组件       | List\<Widget> |
|         primary         | appBar是否从屏幕顶部布局 |   bool对象    |

### 2.3 Scaffold中组件

#### 2.3.1 AppBar

|     属性名      |     说明     |     取值      |
| :-------------: | :----------: | :-----------: |
|     actions     |   按钮列表   | List\<Widget> |
| backgroundColor |   背景颜色   |     Color     |
|   centerTitle   |   是否居中   |     bool      |
|     leading     | 标题左侧组件 |    Widget     |
|      title      |     标题     |    Widget     |

#### 2.3.2 BottomNavigationBar

|         属性名          |       说明       |                        取值                         |
| :---------------------: | :--------------: | :-------------------------------------------------: |
|          items          |  标签组(多个值)  |           List\<BottomNavigationBarItem>            |
|          onTap          |  点击标签的回调  |                        Func                         |
| BottomNavigationBarType |     设置类型     | fixed-自适应宽度<br>shifting-位置和尺寸都有单击动画 |
|       fixedColor        |     选中颜色     |                        Color                        |
|     backgroundColor     |     背景颜色     |                        Color                        |
|        inconSize        | 图标尺寸，默认24 |                        数值                         |
|    selectedItemColor    |   选中标签颜色   |                        Color                        |
|   unselectedItemColor   |  未选中标签颜色  |                        Color                        |
|    selectedIconTheme    |     选中风格     |                                                     |
|   unselectedIconTheme   |    未选中风格    |                                                     |

## 三 示例

### 3.1 代码

```
Scaffold(
      appBar: AppBar(title: Text(widget.title),
      backgroundColor:Colors.orange ,
        centerTitle: true,
        //leading: Text("左侧组件"),
      ),
      bottomNavigationBar: BottomNavigationBar(items: [
        BottomNavigationBarItem(icon: Icon(Icons.print),title: Text("打印")),
        BottomNavigationBarItem(icon: Icon(Icons.stop),title: Text("停止")),
      ],
      type: BottomNavigationBarType.fixed,
        backgroundColor: Colors.blue,
        iconSize: 34,
        selectedItemColor: Colors.red,
        unselectedItemColor: Colors.cyan,
      ),
      //bottomSheet: Text("持久化显示底部抽屉"),
      resizeToAvoidBottomPadding: true,
      resizeToAvoidBottomInset: true,
      drawer: Drawer(
          child: Center(
            child: Container(
              color: Colors.orange,
              child: Text('左侧边栏',style: TextStyle(color: Colors.white,fontSize: 24.0),),
            ),
          )
      ),
      onDrawerChanged: _drawLeftChange ,
      onEndDrawerChanged: _drawEndChange,
      endDrawer: Drawer(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text("右侧抽屉"),
              Text("右侧抽屉"),
              Text("右侧抽屉"),
            ],
          )
      ),
      persistentFooterButtons: [Icon(Icons.send),Text("One"),RaisedButton.icon(onPressed: (){}, icon: Icon(Icons.print), label: Text("打印"))],
      backgroundColor: Colors.grey,
      primary: true,
      extendBody: false,
      body: Column(
        children: <Widget>[
          Text("Body",textScaleFactor: 2,),

        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-scaffold-sample.gif