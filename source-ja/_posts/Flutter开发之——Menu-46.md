---
title: Flutter开发之——Menu(46)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 2b029811
date: 2021-04-20 15:04:11
---
## 一 概述

本文介绍Flutter中的弹出菜单功能：

* PopupMenuButton：菜单按钮组件，点击后弹出PopupMenuItem，PopupMenuDivider设置分割线，空间前带选中的使用CheckedPopupMenuItem、
* showMenu：显示Menu方法，跟onPressed连用

<!--more-->

## 二 PopupMenuButton

### 2.1 源码

```
const PopupMenuButton({
    Key? key,
    required this.itemBuilder,
    this.initialValue,
    this.onSelected,
    this.onCanceled,
    this.tooltip,
    this.elevation,
    this.padding = const EdgeInsets.all(8.0),
    this.child,
    this.icon,
    this.iconSize,
    this.offset = Offset.zero,
    this.enabled = true,
    this.shape,
    this.color,
    this.enableFeedback,
  })
```

### 2.2 属性说明

|     属性     |      说明      |       取值        |
| :----------: | :------------: | :---------------: |
| initialValue |     初始值     |         T         |
|  onSelected  |    选中调用    | Function(T value) |
|  onCanceled  |    取消选中    |    Function()     |
|   tooltip    | 长按时显示文本 |      String       |
|    child     |    menu控件    |      Widget       |
|     icon     |    menu图标    |      Widget       |
|   iconSize   |    图标大小    |      double       |
|    offset    | 菜单弹出的位置 |      Offset       |
|    shape     |  弹出菜单边框  |    ShapeBorder    |
|    color     |  弹出菜单颜色  |       Color       |

## 三 PopupMenuItem

### 3.1 源码

```
 const PopupMenuItem({
    Key? key,
    this.value,
    this.enabled = true,
    this.height = kMinInteractiveDimension,
    this.textStyle,
    this.mouseCursor,
    required this.child,
  }) 
```

### 3.2 属性说明

|   属性    |                    说明                    |   取值    |
| :-------: | :----------------------------------------: | :-------: |
|   value   | 当此项选中后，此值将会通过`onSelected`返回 |     T     |
|  enabled  |                此项是否可用                |   bool    |
|  height   |                 此项的高度                 |  double   |
| textStyle |                  文本样式                  | TextStyle |
|   child   |                   子控件                   |  Widget   |

## 四 PopupMenuDivider

### 4.1 源码

```
const PopupMenuDivider({ Key? key, this.height = _kMenuDividerHeight })
```

### 4.2 属性说明

* height：分割线控件的高度

## 五 CheckedPopupMenuItem

### 5.1 源码

```
const CheckedPopupMenuItem({
    Key? key,
    T? value,
    this.checked = false,
    bool enabled = true,
    Widget? child,
  })
```

### 5.2 属性说明

|  属性   |                    说明                    |  取值  |
| :-----: | :----------------------------------------: | :----: |
|  value  | 当此项选中后，此值将会通过`onSelected`返回 |   T    |
| checked |              该控件是否被选中              |  bool  |
| enabled |               该控件是否可用               |  bool  |
|  child  |                   子控件                   | Widget |

## 六 示例

### 6.1 PopupMenuButton+PopupMenuItem

#### 代码

```
PopupMenuButton<String>(
              shape: RoundedRectangleBorder(side: BorderSide(color: Colors.red), borderRadius: BorderRadius.circular(20)),
              offset: Offset(0, 30),
              elevation: 5,
              padding: EdgeInsets.all(5),
              //color: Colors.grey,
              child: RaisedButton(child: Text('学科'),),
              //icon: Icon(Icons.add),
              initialValue: '语文',
              tooltip: 'PopupMenuButton',
              onSelected: (value) {
                print('$value');
              },
              onCanceled: () {
                print('onCanceled');
              },
              itemBuilder: (context) {
                return <PopupMenuEntry<String>>[
                  PopupMenuItem<String>(
                    value: '语文',
                    child: Text('语文'),
                  ),
                  PopupMenuDivider(height: 20,),
                  PopupMenuItem<String>(
                    value: '数学',
                    enabled: false,
                    child: Text('数学',style: TextStyle(color: Colors.red),),
                  ),
                  PopupMenuDivider(),
                  PopupMenuItem<String>(
                    value: '英语',
                    child: Text('英语'),
                  ),
                  PopupMenuDivider(),
                  PopupMenuItem<String>(
                    value: '生物',
                    child: Text('生物'),
                  ),
                  PopupMenuDivider(),
                  PopupMenuItem<String>(
                    value: '化学',
                    child: Text('化学'),
                  ),
                ];
              },
            )
```

#### 效果图

![][1]

### 6.2 PopupMenuButton+CheckedPopupMenuItem

#### 代码

```
PopupMenuButton<String>(
              onSelected: (value) {
                print('$value');
              },
              itemBuilder: (context) {
                return <PopupMenuEntry<String>>[
                  CheckedPopupMenuItem(
                    value: '语文',
                    checked: true,
                    child: Text('语文'),
                  ),
                  CheckedPopupMenuItem(
                    value: '数学',
                    child: Text('数学'),
                  ),
                ];
              },
            )
```

#### 效果图
![][2]

### 6.3 showMenu

#### 代码

```
RaisedButton(child: Text("showMenu"),onPressed: () {
         showMenu(
                  context: context,
                  position: RelativeRect.fill,
                  items: <PopupMenuEntry>[
                    PopupMenuItem(child: Text('语文')),
                    PopupMenuDivider(),
                    CheckedPopupMenuItem(
                      child: Text('数学'),
                      checked: true,
                    ),
                    PopupMenuDivider(),
                    PopupMenuItem(child: Text('英语')),
                  ]);
            })
```

#### 效果图
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-popupMenuButton-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-popupMenuButton-checkedPopup-sample.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showmenu-sample.gif
