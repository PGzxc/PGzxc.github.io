---
title: Flutter开发之——交互组件-Checkbox和CheckboxListTile(35)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 9315507f
date: 2021-04-13 10:53:47
---
## 一 概述

本文介绍Flutter中的复选框组件

* Checkbox是只有复选框的组件
* CheckboxListTile是带有复选框和标题文字的组件

<!--more-->

## 二 Checkbox

### 2.1 构造方法

```
 const Checkbox({
    Key? key,
    required this.value,
    this.tristate = false,
    required this.onChanged,
    this.mouseCursor,
    this.activeColor,
    this.fillColor,
    this.checkColor,
    this.focusColor,
    this.hoverColor,
    this.overlayColor,
    this.splashRadius,
    this.materialTapTargetSize,
    this.visualDensity,
    this.focusNode,
    this.autofocus = false,
  }) : assert(tristate != null),
       assert(tristate || value != null),
       assert(autofocus != null),
       super(key: key);
```

### 2.2 常用属性

|    属性     |      说明      |           取值           |
| :---------: | :------------: | :----------------------: |
|    value    |   是否被选中   |         bool对象         |
|  onChanged  |    选中变化    | ValueChanged<bool?>?对象 |
| activeColor | 复选框背景颜色 |        Colors对象        |
| checkColor  |  选中对号颜色  |        Colors对象        |

### 2.3 示例

#### 代码

```
var _checkValue = false;
Checkbox(
          activeColor: Colors.grey,
          checkColor: Colors.red,
          value: _checkValue,
          onChanged: (value) {
              setState(() {
                   _checkValue = value;
              });
        })
```

#### 效果图
![][1]

## 三 CheckboxListTile

### 3.1 构造方法

```
const CheckboxListTile({
    Key? key,
    required this.value,
    required this.onChanged,
    this.activeColor,
    this.checkColor,
    this.tileColor,
    this.title,
    this.subtitle,
    this.isThreeLine = false,
    this.dense,
    this.secondary,
    this.selected = false,
    this.controlAffinity = ListTileControlAffinity.platform,
    this.autofocus = false,
    this.contentPadding,
    this.tristate = false,
    this.shape,
    this.selectedTileColor,
  }) 
```

### 3.2 常用属性

|       属性       |        说明        |            取值             |
| :--------------: | :----------------: | :-------------------------: |
|      value       |     是否被选中     |          bool对象           |
|    onChanged     |      选中变化      |  ValueChanged<bool?>?对象   |
|   activeColor    |   复选框背景颜色   |         Colors对象          |
|    checkColor    |    选中对号颜色    |         Colors对象          |
|      title       |        标题        |         Widget对象          |
|     subtitle     |       副标题       |         Widget对象          |
|    secondary     | 复选框另一侧的控件 |         Widget对象          |
| controlAffinity① | 文本放置控件的位置 | ListTileControlAffinity枚举 |

#### controlAffinity①

|   取值   |       说明       |
| :------: | :--------------: |
| leading  | 勾选框在开头位置 |
| trailing | 勾选框在结尾位置 |
| platform |   根据平台确定   |

### 3.3 示例

#### 代码

```
var _checkboxListTileValue = false;
CheckboxListTile(
                subtitle: Text('Checkbox副标题'),
                secondary: Icon(Icons.person),
                controlAffinity: ListTileControlAffinity.trailing,
                title: Text('Checkbox标题'),
                value: _checkboxListTileValue,
                onChanged: (value) {
                  setState(() {
                    _checkboxListTileValue = value;
                  });
                },
              )
```

#### 效果图

![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-checkbox-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-checkboxListTitle-sample.gif