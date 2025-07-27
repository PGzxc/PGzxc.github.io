---
title: Flutter开发之——交互组件-Radio和RadioListTile(36)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 91ade28e
date: 2021-04-13 14:16:52
---
## 一 概述

本文介绍Flutter中的单选按钮组件

* Radio：只有选中按钮的组件
* RadioListTile：既有按钮也有按钮标题的组件

<!--more-->

## 二 Radio

### 2.1 构造方法

```
const Radio({
    Key? key,
    required this.value,
    required this.groupValue,
    required this.onChanged,
    this.mouseCursor,
    this.toggleable = false,
    this.activeColor,
    this.fillColor,
    this.focusColor,
    this.hoverColor,
    this.overlayColor,
    this.splashRadius,
    this.materialTapTargetSize,
    this.visualDensity,
    this.focusNode,
    this.autofocus = false,
  })
```

### 2.2 常用属性

|    属性     |         说明         |          取值           |
| :---------: | :------------------: | :---------------------: |
|    value    |    按钮被选中的值    |            T            |
| groupValue  | 一组按钮中被选中的值 |            T            |
| activeColor |       选中颜色       |         Colors          |
|  onChanged  |     选中变化回调     | final ValueChanged<T?>? |

### 2.3 示例(一个Radio)

#### 代码

```
var _radioValue = "1";
var _groupValue = "";
Radio(
       value: _radioValue,
       activeColor: Colors.red,
       groupValue: _groupValue,
       onChanged: (value) {
             setState(() {
               _groupValue = value;
             });
    })
```

#### 效果图

![][1]

### 2.4 示例(多个Radio)

#### 代码

```
 var _radioGroupValue = '选项1';
Row(
     mainAxisAlignment: MainAxisAlignment.center,
     children: [
              	Radio(
                      value: "选项1",
                      groupValue: _radioGroupValue,
                      onChanged: (value) {
                        setState(() {
                          _radioGroupValue = value;
                        });
                      }),
                  Radio(
                      value: "选项2",
                      groupValue: _radioGroupValue,
                      onChanged: (value) {
                        setState(() {
                          _radioGroupValue = value;
                        });
                      }),
                  Radio(
                      value: "选项3",
                      groupValue: _radioGroupValue,
                      onChanged: (value) {
                        setState(() {
                          _radioGroupValue = value;
                        });
                      })
                ],
  )
```

#### 效果图
![][2]

## 三 RadioListTile

### 3.1 构造方法

```
  const RadioListTile({
    Key? key,
    required this.value,
    required this.groupValue,
    required this.onChanged,
    this.toggleable = false,
    this.activeColor,
    this.title,
    this.subtitle,
    this.isThreeLine = false,
    this.dense,
    this.secondary,
    this.selected = false,
    this.controlAffinity = ListTileControlAffinity.platform,
    this.autofocus = false,
    this.contentPadding,
    this.shape,
    this.tileColor,
    this.selectedTileColor,
  })
```

### 3.2 常用属性

|       属性       |         说明         |            取值             |
| :--------------: | :------------------: | :-------------------------: |
|      value       |    按钮被选中的值    |              T              |
|    groupValue    | 一组按钮中被选中的值 |              T              |
|   activeColor    |       选中颜色       |           Colors            |
|    onChanged     |     选中变化回调     |   final ValueChanged<T?>?   |
|      title       |       按钮标题       |           Widget            |
|     subtitle     |      按钮子标题      |           Widget            |
| controlAffinity① |  文本放置控件的位置  | ListTileControlAffinity枚举 |

#### controlAffinity①

|   取值   |       说明       |
| :------: | :--------------: |
| leading  | 勾选框在开头位置 |
| trailing | 勾选框在结尾位置 |
| platform |   根据平台确定   |

### 3.3 示例

#### 代码

```
var _radioGroupValue = '选项1';
Row(
     	children: [
              Flexible(
                      child: RadioListTile(
                          title: Text("选项1", style: TextStyle(fontSize: 12),),
                          value: "选项1",
                          onChanged: (value) {
                            _radioGroupValue = value;
                          },
                          groupValue: _radioGroupValue,
                          subtitle: Text("subTitle", style: TextStyle(fontSize: 10)),
                          controlAffinity: ListTileControlAffinity.platform)),
                  Flexible(
                      child: RadioListTile(
                          title: Text("选项2", style: TextStyle(fontSize: 12)),
                          value: "选项2",
                          groupValue: _radioGroupValue,
                          onChanged: (value) {
                            _radioGroupValue = value;
                          },
                          subtitle: Text("subTitle", style: TextStyle(fontSize: 10)),
                          controlAffinity: ListTileControlAffinity.platform)),
                  Flexible(
                      child: RadioListTile(
                          title: Text("选项3", style: TextStyle(fontSize: 12)),
                          value: "选项3",
                          subtitle: Text("subTitle", style: TextStyle(fontSize: 10)),
                          groupValue: _radioGroupValue,
                          onChanged: (value) {
                            _radioGroupValue = value;
                          },
                          controlAffinity: ListTileControlAffinity.platform))
                ],
)
```

#### 效果图
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-radio-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-radio-muti-sample.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-radioCheckList-sample.gif