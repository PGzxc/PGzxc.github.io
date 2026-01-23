---
title: Flutter开发之——ExpansionPanelList(45)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: bab55438
date: 2021-04-20 10:40:14
---
## 一 概述

本文讲述扩展组件

* ExpansionPanelList ：扩展列表组件，类似于ListView
* ExpansionPanel：类似于ListView中子View，有扩展头和折叠部分
* ExpansionPanelList要被SingleChildScrollView包裹，否则抛出如下异常

<!--more-->

## 二 ExpansionPanelList 

### 2.1 源码

```
const ExpansionPanelList({
    Key? key,
    this.children = const <ExpansionPanel>[],
    this.expansionCallback,
    this.animationDuration = kThemeAnimationDuration,
    this.expandedHeaderPadding = _kPanelHeaderExpandedDefaultPadding,
    this.dividerColor,
    this.elevation = 2,
  })
```

### 2.2 属性说明

* children：ExpansionPanel面板列表
* expansionCallback：ExpansionPanelCallback面板扩展回调函数
* animationDuration：动画持续时长
* dividerColor：面板分割线颜色

## 三 ExpansionPanel

### 3.1 源码

```
 ExpansionPanel({
    required this.headerBuilder,
    required this.body,
    this.isExpanded = false,
    this.canTapOnHeader = false,
    this.backgroundColor,
  })
```

### 3.2 属性说明

* headerBuilder：面板头部构建器
* body：面板内容构建
* isExpanded：面板是否扩展
* canTapOnHeader：点击头部能否执行扩展操作
* backgroundColor：面板的背景

## 四 示例

### 4.1 代码

创建集合

```
List<bool> dataList = List.generate(20, (index) => false).toList();
```

内容显示

```
body: SingleChildScrollView(
          child: Container(
            child: _buildExpansionPanelList(),
          ),
        ))
```

创建面板

```
_buildExpansionPanelList() {
    return ExpansionPanelList(
        dividerColor: Colors.red,
        animationDuration: Duration(seconds: 2),
        expansionCallback: (index, isExpanded) {
          setState(() {
            dataList[index] = !isExpanded;
          });
        },
        children: dataList.asMap().entries.map((value) {
          return ExpansionPanel(
              canTapOnHeader: true,
              //backgroundColor: Colors.grey,
              isExpanded: value.value,
              headerBuilder: (context, isExpanded) {
                return ListTile(
                  title: Text("扩展列表${value.key}"),
                );
              },
              body: Container(
                height: 100,
                color: Colors.primaries[value.key % 18],
              ));
        }).toList());
  }
```

### 4.2 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-expansionPanelList-sample.gif