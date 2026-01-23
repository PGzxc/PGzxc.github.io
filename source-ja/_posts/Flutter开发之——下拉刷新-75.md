---
title: Flutter开发之——下拉刷新(75)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: e4faf98c
date: 2021-05-11 16:28:45
---
## 一 概述

本文介绍Flutter中的下拉刷新组件：

* RefreshIndicator：Material风格的下拉刷新组件
* CupertinoSliverRefreshControl: ios风格的下拉刷新控件
* flutter_easyrefresh：第三方上拉刷新，下拉加载组件

<!--more-->

## 二 RefreshIndicator

### 2.1 构造方法

```
class RefreshIndicator extends StatefulWidget {
  const RefreshIndicator({
    Key? key,
    required this.child,
    this.displacement = 40.0,
    required this.onRefresh,
    this.color,
    this.backgroundColor,
    this.notificationPredicate = defaultScrollNotificationPredicate,
    this.semanticsLabel,
    this.semanticsValue,
    this.strokeWidth = 2.0,
    this.triggerMode = RefreshIndicatorTriggerMode.onEdge,
  })
}  
```

### 2.2 常用属性说明

|      属性       |            说明            |                  取值                  |
| :-------------: | :------------------------: | :------------------------------------: |
|      child      |       显示的数据试图       | 通常是[ListView] or [CustomScrollView] |
|  displacement   | 指示器到顶部或者底部到距离 |                 double                 |
|      color      |      指示器的前置颜色      |                 Color                  |
| backgroundColor |      指示器的背景颜色      |                 Color                  |

### 2.3 示例

#### 代码

```
List<int> _list =[1, 2, 3,];
body: RefreshIndicator(
          color: Colors.red,
          backgroundColor: Colors.lightBlue,
          onRefresh: () {
            setState(() {
              _list.add(_list.length+1);
            });
            return Future.delayed(Duration(seconds:1));
          },
          child: ListView.separated(itemCount: _list.length, 
            separatorBuilder: (context,index){return Divider(height: 10,color: Colors.red,);} ,
            itemBuilder: (BuildContext context, int index){
            return Center(child: Text("数据${_list[index]}"),heightFactor: 1.5,);
          }, ),
        ) 
```

#### 效果图
![][1]

## 三 CupertinoSliverRefreshControl

### 3.1 用法说明

* CupertinoSliverRefreshControl的用法和RefreshIndicator不同，CupertinoSliverRefreshControl需要放在CustomScrollView中
* CustomScrollView中需要包含两个属性：sliver(滚动试图内容)和physics(滚动对象)
* sliver：包含CupertinoSliverRefreshControl和SliverList两个视图组件，CupertinoSliverRefreshControl控制刷新，设置刷新组件的属性；SliverList设置显示的内容
* physics：控制滚动类，默认为`const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics())`，不设置无法下拉滚动

### 3.2 示例

#### 代码

```
List<int> _list =[1, 2, 3,];
CustomScrollView(
                 physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
                 slivers: <Widget>[
                    //const CupertinoSliverNavigationBar(largeTitle: Text('Scroll down')),
                    CupertinoSliverRefreshControl(
                      refreshTriggerPullDistance: 100.0,
                      refreshIndicatorExtent: 60.0,
                      onRefresh: () async {
                        await Future<void>.delayed(const Duration(milliseconds: 1000));
                        setState(() {
                          _list.add(_list.length+1);
                        });
                      },
                    ),
                    SliverList(delegate: SliverChildBuilderDelegate((BuildContext context, int index) =>
                        Center(child: Column(children: [Text("数据${_list[index]}"), Divider(height: 10,color: Colors.red,)],),),
                        childCount: _list.length,),),
                  ],
                )
```

#### 效果图
![][2]
## 四 flutter_easyrefresh

### 4.1 仓库地址

[Github-flutter_easyrefresh](https://github.com/xuelongqy/flutter_easyrefresh)：https://github.com/xuelongqy/flutter_easyrefresh

### 4.2 插件地址

[flutter_easyrefresh 2.2.1](https://pub.flutter-io.cn/packages/flutter_easyrefresh)：https://pub.flutter-io.cn/packages/flutter_easyrefresh

### 4.3 插件的安装及卸载

#### 插件安装

打开CMD终端，执行如下指令(自动添加pubspec.yaml依赖)

```
flutter pub add flutter_easyrefresh
```

#### 插件卸载

打开CMD终端，执行如下指令(pubspec.yaml依赖被删除)

```
flutter pub remove flutter_easyrefresh
```

### 4.4 示例(基本用法，更多用法请看文档)

#### 代码

```
List<int> _list =[1, 2, 3,];
EasyRefresh(
          child: ListView.separated(itemCount: _list.length,
          separatorBuilder: (context,index){return Divider(height: 10,color: Colors.red,);} ,
          itemBuilder: (BuildContext context, int index){return Center(child: Text("数据${_list[index]}"),heightFactor: 1.5,);}, ),
          onRefresh: () async{
          await Future<void>.delayed(const Duration(milliseconds: 1000));
          setState(() {_list.add(_list.length+1);});
        },
        onLoad: () async{
          await Future<void>.delayed(const Duration(milliseconds: 1000));
          setState(() {_list.remove(_list.length);});
        },
)        
```

#### 效果图
![][3]

## 五 参考

* [CupertinoSliverRefreshControl class](https://api.flutter-io.cn/flutter/cupertino/CupertinoSliverRefreshControl-class.html)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-refresh-material.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-refresh-CupertinoSliverRefreshControl.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-refresh-easyrefresh.gif