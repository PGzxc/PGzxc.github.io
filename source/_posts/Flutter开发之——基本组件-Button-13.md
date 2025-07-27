---
title: Flutter开发之——基本组件-Button(13)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: d9e1cd8a
date: 2021-03-17 10:43:49
---
## 一 概述

Flutter 提供了 10 多种 **Button** 类组件，本文

* 对按钮进行简单分类
* Button的常用属性和方法
* Button的简单使用示例及效果
* Button的自定义

<!--more-->

## 二 按钮分类(按照父类不同)

### 2.1 继承`ButtonStyleButton`(图标+文字)

* TextButton
* ElevatedButton
* OutlinedButton

### 2.2 继承`MaterialButton(图标+文字)`

* FlatButton
* RaisedButton
* OutlineButton

自定义Material Button使用`RawMaterialButton`

### 2.3 单纯图标

* IconButton

### 2.4 下拉按钮

* DropdownButton

### 2.5 悬浮按钮
* FloatingActionButton

## 三 按钮常用方法

flutter中的Button基本上都是继承MaterialButton，先来看看MaterialButton中的属性

```
  const MaterialButton({
    Key key,
    @required this.onPressed,   //按下事件
    this.onLongPress,    //长按事件
    this.onHighlightChanged, //水波纹高亮变化回调
    this.mouseCursor, //鼠标指针的光标进入或悬停在此按钮的[InkWell]上时。
    this.textTheme, //按钮的主题
    this.textColor, //文字的颜色
    this.disabledTextColor, //按钮禁用时候文字的颜色
    this.color, //按钮的背景颜色
    this.disabledColor, //按钮禁用的背景颜色
    this.focusColor, //获取焦点的颜色
    this.hoverColor, //悬停颜色
    this.highlightColor, //点击或者toch控件高亮的时候显示在控件上面，水波纹下面的颜色
    this.splashColor, //水波纹的颜色
    this.colorBrightness, //按钮主题高亮
    this.elevation, //按钮下面的阴影
    this.focusElevation, //获取焦点的阴影
    this.hoverElevation,  //悬停的阴影
    this.highlightElevation, //高亮时候的阴影
    this.disabledElevation,    //未设置点击时的阴影高度
    this.padding,  //内边距
    this.visualDensity, // 按钮布局的紧凑程度
    this.shape, //设置形状
    this.clipBehavior = Clip.none,
    this.focusNode, //在Flutter使用FocusNode来捕捉监听焦点获取与失去
    this.autofocus = false,
    this.materialTapTargetSize, //是配置组件点击区域大小的属性，很多组件都有
    this.animationDuration, //[shape]和[elevation]的动画更改的持续时间。
    this.minWidth, //最小宽度
    this.height, //高度
    this.enableFeedback = true, // 检测到的手势是否应提供声音和/或触觉反馈。例如，在Android上
    // ，点击会产生咔哒声，启用反馈后，长按会产生短暂的振动。通常，组件默认值为true。
    this.child, //子view
  }) : assert(clipBehavior != null),
```

### 3.1 属性

| 编号 |         属性          |                             说明                             |
| :--: | :-------------------: | :----------------------------------------------------------: |
|  1   |       onPressed       |              点击事件监听，传 null 表示按钮禁用              |
|  2   |  onHighlightChanged   |        水波纹高亮变化回调,按下返回true,抬起返回false         |
|  3   |       textTheme       |                         定义按钮主题                         |
|  4   |       textColor       |                         按钮文字颜色                         |
|  5   |   disabledTextColor   |                       无效按钮文字颜色                       |
|  6   |         color         |                           按钮颜色                           |
|  7   |     disabledColor     |                         无效按钮颜色                         |
|  8   |      focusColor       |                       获取焦点按钮颜色                       |
|  9   |      hoverColor       |                        悬停 按钮颜色                         |
|  10  |    highlightColor     |                        长按 按钮颜色                         |
|  11  |      splashColor      |                       点击 水波纹 颜色                       |
|  12  |    colorBrightness    |         官网：用于此按钮的主题亮度。默认为主题的亮度         |
|  13  |       elevation       |                             阴影                             |
|  14  |    focusElevation     |                             阴影                             |
|  15  |    hoverElevation     |                             阴影                             |
|  16  |  highlightElevation   |                             阴影                             |
|  17  |   disabledElevation   |                             阴影                             |
|  18  |        padding        |                            内边距                            |
|  19  |         shape         |                   设置形状，如圆角，圆形等                   |
|  20  |     clipBehavior      | 剪裁<br>Clip.antiAlias：剪辑具有抗锯齿功能<br>Clip.antiAliasWithSaveLayer：在剪辑后立即剪辑具有抗锯齿和saveLayer<br>Clip.hardEdge：剪辑，但不应用抗锯齿。<br>Clip.none：不剪辑 |
|  21  |       focusNode       |                                                              |
|  22  | materialTapTargetSize |                                                              |
|  23  |   animationDuration   |                           动画时长                           |
|  24  |         child         |                            子view                            |

### 3.2 OutlineButton 特性

| 编号 |     属性     |                         说明                          |
| :--: | :----------: | :---------------------------------------------------: |
|  1   |  borderSide  | 线框  线颜色 ，如红色：BorderSide(color: Colors.red,) |
|  2   | clipBehavior |             相框风格，如：Clip.antiAlias              |

### 3.3 RaisedButton.icon 特性

| 编号 | 属性  |    说明    |
| :--: | :---: | :--------: |
|  1   | icon  |    图标    |
|  2   | label | 通常是文字 |

### 3.4 DropdownButton 特性

| 编号 |   属性    |         说明          |
| :--: | :-------: | :-------------------: |
|  1   |   hint    |        提示语         |
|  2   |   value   |        当前值         |
|  3   | iconSize  |    下拉框图片大小     |
|  4   |   icon    | 右边图标 默认为下三角 |
|  5   |   items   |    下拉框数据集合     |
|  6   | onChanged |         监听          |

### 3.5 FloatingActionButton 特性

| 编号 |      属性       |                说明                 |
| :--: | :-------------: | :---------------------------------: |
|  1   |      child      | 子元素，一般为 Icon，不推荐使用文字 |
|  2   |     tooltip     |            长按文字提示             |
|  3   | backgroundColor |    背景颜色（默认使用主题颜色）     |
|  4   |      mini       |     是否是 mini 类型默认 false      |

设置位置，在外部使用（与FloatingActionButton同级）floatingActionButtonLocation

|                   取值                    |         位置          |
| :---------------------------------------: | :-------------------: |
| FloatingActionButtonLocation.centerDocked | 底部居中 与底部无间距 |
| FloatingActionButtonLocation.centerFloat  | 底部居中 与底部有间距 |
|  FloatingActionButtonLocation.endDocked   |  右下角 与底部无间距  |
|   FloatingActionButtonLocation.endFloat   |  右下角 与底部有间距  |
|    FloatingActionButtonLocation.endTop    |        右上角         |
|   FloatingActionButtonLocation.startTop   |        左上角         |

## 四 示例

### 4.1 ButtonStyleButton类型

#### 4.1.1 示例

```
TextButton(onPressed: () {}, child: Text("TextButton")), //TextButton文字
TextButton.icon(onPressed: (){}, icon: Icon(Icons.send), label: Text("TextButton.icon")),//TextButton文字+icon
ElevatedButton(onPressed: () {}, child: Text("ElevatedButton")),//ElevatedButton文字
ElevatedButton.icon(onPressed: (){}, icon: Icon(Icons.send), label: Text("ElevatedButton.icon")),//ElevatedButton文字+icon
OutlinedButton(onPressed: () {}, child: Text("OutlineButton")),//OutlinedButton文字
OutlineButton.icon(onPressed: (){}, icon: Icon(Icons.send), label: Text("OutlineButton.icon"))//OutlineButton文字+icon
```

#### 4.1.2 效果图

![][1]

### 4.2 MaterialButton类型

#### 4.2.1 示例

```
MaterialButton(onPressed: (){},child: Text("MaterialButton"),),

FlatButton(child: Text("FlatButton"), onPressed: () {},),
FlatButton.icon(icon: Icon(Icons.info), label: Text(" FlatButton.icon"), onPressed: (){},),

RaisedButton(child: Text("RaisedButton"), onPressed: () {},),
RaisedButton.icon(onPressed: (){}, icon: Icon(Icons.thumb_up), label: Text("RaisedButton.icon")),

OutlineButton(onPressed: () {}, child: Text("OutlineButton"),),
OutlineButton.icon(icon: Icon(Icons.add), label: Text("OutlineButton.icon"), onPressed: (){}),
```

#### 4.2.2 效果图
![][2]

### 4.3 IconButton

#### 4.3.1 示例代码

```
IconButton(icon: Icon(Icons.send), onPressed: () {Fluttertoast.showToast(msg: "IconButton");},),
```

#### 4.3.2 效果图
![][3]

#### 4.4 下拉按钮(DropdownButton)

#### 4.4.1 示例代码

代码一

```
String dropdownValue = 'One';
DropdownButton<String>(
            value: dropdownValue,
            onChanged: (String newValue) {
              setState(() {
                dropdownValue = newValue;
              });
            },
            items: <String>['One', 'Two', 'Three', 'Four'].map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(value: value, child: Text(value),);
            }).toList(),
          )
```

代码二

```
String dropdownValue = 'One';
DropdownButton(
              value: dropdownValue,
              onChanged: (String newValue) {
                setState(() {
                  dropdownValue = newValue;
                });
              },
              items: [
            DropdownMenuItem<String>(value:"One",child: Text('One')),
            DropdownMenuItem<String>(value:"Two",child: Text('Two')),
            DropdownMenuItem<String>(value:"Three",child: Text('Three')),
            DropdownMenuItem<String>(value:"Four",child: Text('Four'))] ),
```

#### 4.4.2 效果图
![][4]

### 4.5 悬浮按钮(FloatingActionButton)

#### 4.5.1 示例代码

```
floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
```

#### 4.5.2 效果图
![][6]

## 五 Button的自定义

### 5.1 示例代码

```
RaisedButton(
            child: new Text("登录"),
            color: Colors.blue,
            textColor: Colors.white,
            onPressed: () {},
            disabledColor: Colors.grey,
            disabledTextColor: Colors.white,
            disabledElevation: 4,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20.0)), //圆角大小
          ),
```

### 5.2 效果图
![][5]

## 六 参考

* [老孟Flutter](http://laomengit.com/guide/widgets/Button.html)
* [Flutter Button 按钮](https://blog.csdn.net/ruoshui_t/article/details/91428229)
* [Flutter之Button](https://www.jianshu.com/p/f06cc6c74d20)
* [FlutterUI-自定义Button](https://www.jianshu.com/p/52b873d891f0)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-button-buttonstyle.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-button-material-style.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-button-icon-single.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-button-dropdown-style.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-button-self-define.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-button-floating-action.png