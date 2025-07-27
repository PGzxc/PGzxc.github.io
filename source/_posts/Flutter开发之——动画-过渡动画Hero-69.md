---
title: Flutter开发之——动画-过渡动画Hero(69)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 3fd6c23
date: 2021-05-06 16:31:16
---
## 一 概述

* Hero动画又叫过渡动画
* 过度动画：当用户点击一张图片，切换到另一个页面时，这个页面也有此图

<!--more-->

## 二 Hero

### 2.1 构造函数

```
class Hero extends StatefulWidget
const Hero({
    Key? key,
    required this.tag,
    this.createRectTween,
    this.flightShuttleBuilder,
    this.placeholderBuilder,
    this.transitionOnUserGestures = false,
    required this.child,
  })
```

### 2.2 常见属性说明

|           属性           |               说明               |         取值          |
| :----------------------: | :------------------------------: | :-------------------: |
|           tag            |       过渡元素组件的标记值       |        Object         |
|     createRectTween      |             位置动画             | Tween<Rect?> Function |
|   flightShuttleBuilder   |           动画过程组件           |    Widget Function    |
|    placeholderBuilder    |            占位符组件            |    Widget Function    |
| transitionOnUserGestures | 使用手势进行专场时，是否显示动画 |         bool          |

注：2个页面都有Hero控件，且`tag`参数一致

## 三 示例

### 3.1 代码

#### 跳转页面

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue,),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;
  @override
  _MyHomePageState createState() => _MyHomePageState();
}
class _MyHomePageState extends State<MyHomePage> {
@override
  Widget build(BuildContext context) {
    _getLocalFile();
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
          backgroundColor: Colors.orange,
          centerTitle: true,
          //actions: [],
          //leading: Text("左侧组件"),
        ),
		body:Column(children: [
          Hero(tag: "HeroTag", child: Image.asset("images/img_1.jpg",width: 100,height: 100,),),
          RaisedButton(child: Text("跳转"),onPressed: (){
            Navigator.of(context).push(MaterialPageRoute(builder: (context){
              return OtherPage(title: "新页面",);
            }));
          })
        ],),
      )
}
```

#### 跳转后页面

```
class OtherPage extends StatefulWidget{
  OtherPage({Key key,this.title}):super(key: key);
  final String title;
  @override
  State<StatefulWidget> createState() =>_OtherPageState();
}
class _OtherPageState extends State<OtherPage>
{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title),),
      body: Hero(tag: "HeroTag", child: Image.asset("images/img_1.jpg",width: 100,height: 100,),),
    );
  }
}
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-anim-hero.gif