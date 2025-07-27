---
title: Flutter开发之——Table(57)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: f5c96ae8
date: 2021-04-22 16:09:11
---
## 一 概述

* Table用于创建表格试图组件
* 一个完整的表格包含：Table(表格)，TableRow(一行)，TableCell(单元格)组成

<!--more-->

## 二 表格的三要素(Table/TableRow/TableCell)

### 2.1 Table

#### 构造函数

```
Table({
    Key? key,
    this.children = const <TableRow>[],
    this.columnWidths,
    this.defaultColumnWidth = const FlexColumnWidth(1.0),
    this.textDirection,
    this.border,
    this.defaultVerticalAlignment = TableCellVerticalAlignment.top,
    this.textBaseline, // NO DEFAULT: we don't know what the text's baseline should be
  })
```

#### 常见属性说明

|        属性        |      说明      |       取值       |
| :----------------: | :------------: | :--------------: |
|      children      | 表格构成子view |  \<TableRow>[]   |
| defaultColumnWidth |    默认宽度    | FixedColumnWidth |
|       border       |      边框      |   TableBorder    |

#### border

| 属性  |   说明   |      取值       |
| :---: | :------: | :-------------: |
| color | 边框颜色 |      Color      |
| width | 边框宽度 |     double      |
| style | 边框样式 | BorderStyle枚举 |

### 2.2 TableRow

#### 构造函数

```
const TableRow({ this.key, this.decoration, this.children })
```

### 2.3 TableCell

#### 构造函数

```
const TableCell({
    Key? key,
    this.verticalAlignment,
    required Widget child,
  })
```

## 三 示例

### 3.1 表格代码

```
Table(
      defaultColumnWidth: FixedColumnWidth(100),
      border: TableBorder(
              top: BorderSide(color: Colors.red),
              left: BorderSide(color: Colors.red),
              right: BorderSide(color: Colors.red),
              bottom: BorderSide(color: Colors.red),
              horizontalInside: BorderSide(color: Colors.red),
              verticalInside: BorderSide(color: Colors.red),
            ),
       children: [
              TableRow(
                  decoration: ShapeDecoration(shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(0)), color: Colors.blue),
                  children: [
                    TableCell(child: Text('姓名',textAlign:TextAlign.center ,)),
                    TableCell(child: Text('性别',textAlign:TextAlign.center)),
                    TableCell(child: Text('年龄',textAlign:TextAlign.center)),
                  ]),
              TableRow(children: [
                TableCell(child: Text('张三',textAlign:TextAlign.center)),
                TableCell(child: Text('男',textAlign:TextAlign.center)),
                TableCell(child: Text('20',textAlign:TextAlign.center)),
              ]),
              TableRow(children: [
                TableCell(child: Text('李四',textAlign:TextAlign.center)),
                TableCell(child: Text('女',textAlign:TextAlign.center)),
                TableCell(child: Text('18',textAlign:TextAlign.center)),
              ]),
            ],
          )
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-table-sample.png