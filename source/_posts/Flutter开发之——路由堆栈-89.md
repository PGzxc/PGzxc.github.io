---
title: Flutter开发之——路由堆栈(89)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 5eaed7a
date: 2021-06-17 17:39:22
---
## 一 概述

* 几个概念
* 不通过定义路由方式，进行页面间跳转
* 通过定义路由方式，进行页面间跳转
* 页面跳转及返回时传值

<!--more-->

## 二 几个概念

* Route：路由是应用程序页面的抽象，对应Android中activity和IOS中的ViewController，由Navigator管理
* Navigator：Navigator是一个组件，管理和维护一个基于堆栈的历史记录，通过push和pop进行页面的跳转

## 三 不通过定义路由方式，进行页面间跳转

### 3.1 页面间跳转关键字

* push：以A页面为起点跳转到B页面，push后接要跳转到的页面
* pop：返回上一个页面，不需要接跳转页面作为参数 

### 3.2 现象描述

* 有两个页面：Main页面和B页面
* Main页面有一个按钮，点击跳转到B页面
* B页面有一个按钮，点击返回Main页面

### 3.3 代码

**入口文件代码**

```
void main() {
  runApp(MyApp());
}
```

**Main页面代码**

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
    return Scaffold(
      appBar: AppBar(title: Text(widget.title),),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            RaisedButton(
              child: Text("Main页面"),
              onPressed: () async{
                Navigator.of(context).push(MaterialPageRoute(builder: (context) {
                  return BPage();
                }));
              },
            )
          ],
        ),
      ),
    );
  }
}
```

**B页面代码**

```
class BPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(primarySwatch: Colors.blue),
      home: Scaffold(
        appBar: AppBar(title: Text("BPage"),),
        body: Container(
          alignment: Alignment.center,
          child: RaisedButton(
            child: Text("B页面"),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
        ),
      ),
    );
  }
}
```

### 3.4 效果图

![][1]

### 3.5 堆栈变化

#### 3.5.1 M页面跳转到B页面时

当应用程序位于M页面时，**路由堆栈**中只有M，点击按钮跳转到B页面，路由堆栈中有 B 和M，且 B 处于栈顶。
![][2]

#### 3.5.2 B页面返回M页面时(pop)

位于栈顶的B出栈，堆栈中只有M
![][3]

#### 3.5.3 从 B 页面跳转到 M 页面，使用push方法

```
RaisedButton(
  child: Text('B 页面'),
  onPressed: () {
    Navigator.of(context).push(MaterialPageRoute(builder: (context) {
      return MyApp();
    }));
  },
)
```

路由堆栈

![][4]

#### 3.5.4 栈顶返回(pop/maybePop/canPop)

在M 页面时路由堆栈中只有 M，调用 pop 后，堆栈中已经没有任何内容，此时路由堆栈为空，没有可显示的页面，应用程序将会退出或者黑屏
![][5]

解决办法：也可以通过 canPop 判断当前是否可以 pop

```
 if(Navigator.of(context).canPop()){
      Navigator.of(context).pop();
  }
```

## 四 通过定义路由方式，进行页面间跳转

### 4.1 在MaterialApp中配置路由名称

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: <String, WidgetBuilder>{
        "/M":(context)=>MyApp(),
        "/B":(context)=>BPage(),
      },
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue,),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```

### 4.2 页面间跳转

#### 4.2.1 pushNamed方式(M跳转B)

标准跳转方式，每次跳转都将页面假如到堆栈中

```
RaisedButton(
  child: Text('M 页面'),
  onPressed: () {
    Navigator.of(context).pushNamed('/B');
  },
)
```

#### 4.2.2 pushReplacementNamed 方式

将要添加的页面堆栈替换当前堆栈

有A、B、C 三个页面，A页面通过 pushNamed 跳转到 B：

```
RaisedButton(
  child: Text('M 页面'),
  onPressed: () {
    Navigator.of(context).pushNamed('/B');
  },
)
```

 通过 pushReplacementNamed 跳转到 C：

```
RaisedButton(
  child: Text('B 页面'),
  onPressed: () {
      Navigator.of(context).pushReplacementNamed('/C');
  },
)
```

点击 C 页面按钮执行 pop：

```
RaisedButton(
  child: Text('C 页面'),
  onPressed: () {
    if(Navigator.of(context).canPop()){
      Navigator.of(context).pop();
    }
  },
)
```

效果图

![][6]
**堆栈变化**
点击 C 页面按钮直接返回到了 A 页面，而不是 B 页面，因为 B 页面使用 pushReplacementNamed 跳转，路由堆栈变化

![][7]

#### 4.2.3 popAndPushNamed

B 页面跳转到 C 页面，使用 popAndPushNamed

```
RaisedButton(
  child: Text('B 页面'),
  onPressed: () {
      Navigator.of(context).popAndPushNamed('/C');
  },
)
```

popAndPushNamed和pushReplacementNamed的区别

* popAndPushNamed 路由堆栈和 pushReplacementNamed 是一样，唯一的区别就是
* popAndPushNamed 有 B 页面退出动画

#### 4.2.4 pushNamedAndRemoveUntil

**应用场景**

有如下场景，应用程序进入首页，点击登录进入登录页面，然后进入注册页面或者忘记密码页面...，登录成功后进入其他页面，此时不希望返回到登录相关页面，此场景可以使用

有A、B、C、D 四个页面，A 通过push进入 B 页面，B 通过push进入 C 页面，C 通过 **pushNamedAndRemoveUntil** 进入 D 页面同时删除路由堆栈中直到 /B 的路由，C 页面代码

```
RaisedButton(
  child: Text('C 页面'),
  onPressed: () {
    Navigator.of(context).pushNamedAndRemoveUntil('/D', ModalRoute.withName('/B'));
  },
),
```

D 页面按钮执行 pop

```
RaisedButton(
  child: Text('D 页面'),
  onPressed: () {
    Navigator.of(context).pop();
  },
)
```

效果图
![][8]
**从 C 页面跳转到 D 页面路由堆栈变化**
![][9]

####  4.2.5 popUntil

**有A、B、C、D 四个页面，D 页面通过 popUntil 一直返回到 A 页面，D 页面代码**：

```
RaisedButton(
  child: Text('D 页面'),
  onPressed: () {
    Navigator.of(context).popUntil(ModalRoute.withName('/A'));
  },
)
```

**效果图**
![][10]
**路由堆栈变化**

![][11]

## 五 页面跳转及返回时传值

### 5.1 通过构造函数方式

**商品详情页**

```
class ProductDetail extends StatelessWidget {
  final ProductInfo productInfo;
  const ProductDetail({Key key, this.productInfo}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(primarySwatch: Colors.blue),
      home: Scaffold(
        body: Container(
          alignment: Alignment.center,
          child: Text("ProductDetail：${productInfo.name}"),
        ),
      ),
    );
  }
}
```

**要传递的值**

```
class ProductInfo {
  var name;
  ProductInfo(this.name);
}
```

**跳转代码**

```
Navigator.of(context).push(MaterialPageRoute(builder: (context){
                  return ProductDetail(productInfo: ProductInfo("张三"),);
                }));
```

**效果图**

![][12]

### 5.2 通过命名路由设置参数的方式

**A 页面传递数据**

```
RaisedButton(
  child: Text('A 页面'),
  onPressed: () {
    Navigator.of(context).pushNamed('/B',arguments: '来自A');
  },
)
```

**B 页面通过 `ModalRoute.of(context).settings.arguments` 接收数据**：

```
RaisedButton(
  child: Text('${ModalRoute.of(context).settings.arguments}'),
  onPressed: () {
    Navigator.of(context).pushNamed('/C');
  },
)
```

**效果图**

![][13]
### 5.3 返回数据

**B 页面返回代码**

```
RaisedButton(
  child: Text('${ModalRoute.of(context).settings.arguments}'),
  onPressed: () {
    Navigator.of(context).pop('从B返回');
  },
)
```

**A页面接收返回的数据**

```
class _MyHomePageState extends State<MyHomePage> {
  String _string = 'A 页面';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            RaisedButton(
              child: Text(_string),
              onPressed: () async{
                var result = await Navigator.of(context).pushNamed('/B', arguments: '来自A');
                setState(() {
                  _string = result;
                });
              },
            )
          ],
        ),
      ),
    );
  }
}
```

**效果图(push 相关方法返回 Future 类型，使用 await 等待返回结果)**
![][14]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-route-push-pop.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-route-m-push-b.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-route-b-pop.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-route-a-b-a-push.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-m-pop-none.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-route-push-pushReplacementNamed.gif
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-route-pushreplacement-duizhan.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-route-push-pushNamedAndRemoveUntil.gif
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-route-pushnamedAndRemoveUntil-dui.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-route-popUntil.gif
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-route-popUntil-dui.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-route-push-construct-param.gif
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-route-push-param.gif
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-route-push--return-param.gif