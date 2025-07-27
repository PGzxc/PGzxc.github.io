---
title: Flutter开发之——Navigator(92)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: ac5e17da
date: 2021-06-18 17:19:03
---
## 一 概述

* Navigator说明及简单应用
* Navigator头条客户端应用场景
* Navigator之Tab切换
* 自定义Navigator跳转行为

<!--more-->

## 二 Navigator说明及简单应用

### 2.1 Navigator说明

* Navigator 是管理路由的控件，通常情况下直接使用`Navigator.of(context)`的方法来跳转页面
* 在`WidgetsApp`中定义了`Navigator.of(context)`并使用了此控件
* 应用程序的根控件通常是`MaterialApp`，`MaterialApp`包含`WidgetsApp`
* 可以直接使用Navigator的相关属性。

### 2.2 Navigator简单应用

```
Navigator(
  initialRoute: '/',
  onGenerateRoute: (RouteSettings settings) {
    WidgetBuilder builder;
    switch (settings.name) {
      case 'home':
        builder = (context) => PageA();
        break;
      case 'user':
        builder = (context) => PageB();
        break;
    }
    return MaterialPageRoute(builder: builder, settings: settings);
  },
)
```

说明：

* `initialRoute`表示初始化路由
* `onGenerateRoute`表示根据**RouteSettings**生成路由

## 三 Navigator头条客户端应用场景

### 3.1 头条客户端举报场景

头条客户端每一个新闻下面都有一个“叉号”，点击弹出相关信息，点击其中的局部，会在当前小窗户内跳转到举报页面，效果如下

![][1]

### 3.2 仿制效果

**首页代码**

```
@override
Widget build(BuildContext context) {
  return Center(
    child: Container(
      height: 350,
      width: 300,
      child: Navigator(
        initialRoute: '/',
        onGenerateRoute: (RouteSettings settins) {
          WidgetBuilder builder;
          switch (settins.name) {
            case '/':
              builder = (context) => PageC();
              break;
          }
          return MaterialPageRoute(builder: builder);
        },
      ),
    ),
  );
}
```

**PageC页面**

```
class PageC extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Card(
        child: Column(
          children: <Widget>[
            _buildItem(Icons.clear, '不感兴趣', '减少这类内容'),
            Divider(),
            _buildItem(Icons.access_alarm, '举报', '标题夸张，内容质量差 等',
                showArrow: true, onPress: () {
              Navigator.of(context).push(MaterialPageRoute(builder: (context) {
                return PageD();
              }));
            }),
            Divider(),
            _buildItem(Icons.perm_identity, '拉黑作者：新华网客户端', ''),
            Divider(),
            _buildItem(Icons.account_circle, '屏蔽', '军事视频、驾驶员等'),
          ],
        ),
      ),
    );
  }
  _buildItem(IconData iconData, String title, String content,
      {bool showArrow = false, Function onPress}) {
    return Row(
      children: <Widget>[
        Icon(iconData),
        SizedBox(
          width: 20,
        ),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                title,
                style: TextStyle(fontSize: 18),
              ),
              Text(
                content,
                style: TextStyle(
                    color: Colors.black.withOpacity(.5), fontSize: 14),
              )
            ],
          ),
        ),
        !showArrow
            ? Container()
            : IconButton(
                icon: Icon(Icons.arrow_forward_ios),
                iconSize: 16,
                onPressed: onPress,
              ),
      ],
    );
  }
}
```

**PageD页面代码**

```
class PageD extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 200,
      width: 250,
      color: Colors.grey.withOpacity(.5),
      child: Column(
        children: <Widget>[
          Row(
            children: <Widget>[
              IconButton(
                icon: Icon(Icons.arrow_back_ios),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
              Text('返回'),
              SizedBox(
                width: 30,
              ),
              Text('举报'),
            ],
          ),
        ],
      ),
    );
  }
}
```

**效果图**
![][2]

## 四 Navigator之Tab切换

### 4.1 效果图
![][3]



### 4.2 代码逻辑

**首页代码**

```
import 'package:flutter/material.dart';

void main() {
  runApp(TabMain());
}

class TabMain extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _TabMainState();
}

class _TabMainState extends State<TabMain> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        theme: ThemeData(primarySwatch: Colors.blue),
        home: Scaffold(
          body: IndexedStack(
            index: _currentIndex,
            children: <Widget>[
              TabNavigator(0),
              TabNavigator(1),
              TabNavigator(2),
            ],
          ),
          bottomNavigationBar: BottomNavigationBar(
            onTap: (int index) {
              setState(() {
                _currentIndex = index;
              });
            },
            currentIndex: _currentIndex,
            items: <BottomNavigationBarItem>[
              BottomNavigationBarItem(
                  title: Text('首页'), icon: Icon(Icons.home)),
              BottomNavigationBarItem(
                  title: Text('书籍'), icon: Icon(Icons.book)),
              BottomNavigationBarItem(
                  title: Text('我的'), icon: Icon(Icons.perm_identity)),
            ],
          ),
        ));
  }
}
```

**定义TabNavigator**

```
class TabNavigator extends StatelessWidget {
  TabNavigator(this.index);

  final int index;

  @override
  Widget build(BuildContext context) {
    return Navigator(
      initialRoute: '/',
      onGenerateRoute: (RouteSettings settins) {
        WidgetBuilder builder;
        switch (settins.name) {
          case '/':
            builder = (context) => ListPage(index);
            break;
        }
        return MaterialPageRoute(builder: builder);
      },
    );
  }
}
```

**列表页面(这里只放了一个跳转按钮)**

```
class ListPage extends StatelessWidget {
  ListPage(this.index);

  final int index;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: RaisedButton(
          child: Text('$index'),
          onPressed: () {
            Navigator.of(context).push(MaterialPageRoute(builder: (context) {
              return DetailPage();
            }));
          },
        ),
      ),
    );
  }
}
```

**详情页面**

```
class DetailPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Text('DetailPage'),
      ),
    );
  }
}
```

## 五 自定义Navigator跳转行为

### 5.1 代码

**首页**

```
class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  GlobalKey<NavigatorState> _key = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: WillPopScope(
          onWillPop: () async {
            if (_key.currentState.canPop()) {
              _key.currentState.pop();
              return false;
            }
            return true;
          },
          child: Column(
            children: <Widget>[
              Expanded(
                child: Navigator(
                  key: _key,
                  onGenerateRoute: (RouteSettings settings) =>
                      MaterialPageRoute(builder: (context) {
                    return OnePage();
                  }),
                ),
              ),
              Container(
                height: 50,
                color: Colors.blue,
                alignment: Alignment.center,
                child: Text('底部Bar'),
              )
            ],
          )),
    );
  }
}
```

**第一个页面**

```
class OnePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          child: RaisedButton(
            child: Text('去下一个页面'),
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return TwoPage();
              }));
            },
          ),
        ),
      ),
    );
  }
}
```

**第二个页面**

```
class TwoPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          child: Text('这是第二个页面'),
        ),
      ),
    );
  }
}
```

### 5.2 效果图
![][4]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-navigator-toutiao-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-navigator-toutiao-fang.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-navigator-table-sample.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-navigator-define.gif