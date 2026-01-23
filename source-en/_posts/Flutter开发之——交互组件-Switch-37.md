---
title: Flutter开发之——交互组件-Switch(37)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: f9f7ccf0
date: 2021-04-13 16:12:20
---
## 一 概述

本文介绍Flutter中的开关控件：

* Switch：只有开关功能，打开/关系开关
* SwitchListTile：带有文字描述和开关的开关控件
* CupertinoSwitch：IOS风格的开关控件

<!--more-->

## 二  Switch-只有开关

### 2.1 构造方法

```
const Switch({
    Key? key,
    required this.value,
    required this.onChanged,
    this.activeColor,
    this.activeTrackColor,
    this.inactiveThumbColor,
    this.inactiveTrackColor,
    this.activeThumbImage,
    this.onActiveThumbImageError,
    this.inactiveThumbImage,
    this.onInactiveThumbImageError,
    this.thumbColor,
    this.trackColor,
    this.materialTapTargetSize,
    this.dragStartBehavior = DragStartBehavior.start,
    this.mouseCursor,
    this.focusColor,
    this.hoverColor,
    this.overlayColor,
    this.splashRadius,
    this.focusNode,
    this.autofocus = false,
  })
```

### 2.2 常用属性

|        属性        |               说明               |       取值        |
| :----------------: | :------------------------------: | :---------------: |
|       value        |           开关是否打开           |     bool对象      |
|  activeTrackColor  |           滑块轨迹颜色           |    Colors对象     |
|    activeColor     | 滑块打开后颜色(为图像时，不显示) |    Colors对象     |
| inactiveTrackColor |       滑块未打开时轨迹颜色       |    Colors对象     |
| inactiveThumbColor |         滑块未打开时颜色         |    Colors对象     |
|  activeThumbImage  |         滑块打开后的图标         | ImageProvider对象 |

### 2.3 示例

#### 代码

```
var _switchValue = false;
Switch(
         activeThumbImage: AssetImage('images/bird.png',),
         inactiveThumbColor: Colors.green,
         inactiveTrackColor: Colors.orange,
         activeColor: Colors.red,
         activeTrackColor: Colors.blue,
         value: _switchValue,
         onChanged: (value) {
                 setState(() {
                   _switchValue = value;
                   });
       })
```

#### 效果图

![][1]
## 三 SwitchListTile-开关+文字

### 3.1 构造方法

```
 const SwitchListTile({
    Key? key,
    required this.value,
    required this.onChanged,
    this.tileColor,
    this.activeColor,
    this.activeTrackColor,
    this.inactiveThumbColor,
    this.inactiveTrackColor,
    this.activeThumbImage,
    this.inactiveThumbImage,
    this.title,
    this.subtitle,
    this.isThreeLine = false,
    this.dense,
    this.contentPadding,
    this.secondary,
    this.selected = false,
    this.autofocus = false,
    this.controlAffinity = ListTileControlAffinity.platform,
    this.shape,
    this.selectedTileColor,
  })
```

### 3.2 常用属性

| 属性 | 说明 | 取值 |
| :--: | :--: | :--: |
|       value        |           开关是否打开           |     bool对象      |
|  activeTrackColor  |           滑块轨迹颜色           |    Colors对象     |
|    activeColor     | 滑块打开后颜色(为图像时，不显示) |    Colors对象     |
| inactiveTrackColor |       滑块未打开时轨迹颜色       |    Colors对象     |
| inactiveThumbColor |         滑块未打开时颜色         |    Colors对象     |
|  activeThumbImage  |         滑块打开后的图标         | ImageProvider对象 |
| title | 标题 | Widget |
| subtitle | 子标题 | Widget |

### 3.3 示例

#### 代码

```
var _switchListValue = false;
SwitchListTile(
                title: Text("开启消息推送？"),
                subtitle: Text("subTitle"),
                 value: _switchListValue,
                 onChanged: (value) {
                    setState(() {
                      _switchListValue = value;
                    });
                 })
```

#### 效果图
![][2]

## 四 CupertinoSwitch-仿IOS

### 4.1 构造方法

```
const CupertinoSwitch({
    Key? key,
    required this.value,
    required this.onChanged,
    this.activeColor,
    this.trackColor,
    this.dragStartBehavior = DragStartBehavior.start,
  })
```

### 4.2 示例

```
 var _switchValue = false;
 CupertinoSwitch(
                  value: _switchValue,
                  onChanged: (value) {
                    setState(() {
                      _switchValue = value;
                    });
                  })
```

#### 效果图
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-switch-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-switchListTitle-sample.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-cupertinoSwitch-sample.gif