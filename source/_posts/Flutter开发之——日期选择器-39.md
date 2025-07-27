---
title: Flutter开发之——日期选择器(39)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: f7a015b3
date: 2021-04-15 17:34:56
---
## 一 概述

本文介绍Flutter中的日期选择组件：

* DayPicker：日期选择器
* MonthPicker：月份选择器
* YearPicker：年份选择器
* showDatePicker：封装了YearPicker和MonthPicker的联动控件
* CupertinoDatePicker：IOS风格日期选择器
* showTimePicker：通过回调方式启动时间选择器
* CupertinoTimerPicker：IOS风格时间选择器

<!--more-->

## 二 DayPicker(过时)

### 2.1 构造方法

```
 DayPicker({
    Key? key,
    required this.selectedDate,
    required this.currentDate,
    required this.onChanged,
    required this.firstDate,
    required this.lastDate,
    required this.displayedMonth,
    this.selectableDayPredicate,
    this.dragStartBehavior = DragStartBehavior.start,
  })
```

### 2.2 常见属性

|          属性          |        说明        |          取值           |
| :--------------------: | :----------------: | :---------------------: |
|      selectedDate      | 选中后高亮显示日期 |        DateTime         |
|      currentDate       |      当前日期      |        DateTime         |
|       onChanged        |  用户选择日期函数  | ValueChanged\<DateTime> |
|       firstDate        | 允许选择的开始日期 |        DateTime         |
|        lastDate        | 允许选择的结束日期 |        DateTime         |
|     displayedMonth     |      展示日期      |        DateTime         |
| selectableDayPredicate |   用户的可选日期   | SelectableDayPredicate  |

### 2.3 示例

#### 代码

```
DateTime _selectedDate = DateTime.now();
Text("DayPicker-示例"),
Flexible(
          child: DayPicker(
          selectableDayPredicate: (date) {return date.difference(DateTime.now()).inMilliseconds < 0;},
          selectedDate: _selectedDate,
          currentDate: DateTime.now(),
          onChanged: (date) {
                  setState(() {
                    _selectedDate = date;
                   });
            },
            firstDate: DateTime(2021, 4, 3),
            lastDate: DateTime(2021, 4, 31),
            displayedMonth: DateTime(2021, 4),
               ),
        )
```

#### 效果图

![][1]
## 三 CalendarDatePicker(代替DayPicker)

### 3.1 构造方法

```
CalendarDatePicker({
    Key? key,
    required DateTime initialDate,
    required DateTime firstDate,
    required DateTime lastDate,
    DateTime? currentDate,
    required this.onDateChanged,
    this.onDisplayedMonthChanged,
    this.initialCalendarMode = DatePickerMode.day,
    this.selectableDayPredicate,
  }) 
```

### 3.2 说明

* CalendarDatePicker是用来替代DayPicker的
* 需要使用父容器如Flexible或者规定宽和高

### 3.3 示例

#### 代码

```
DateTime _selectedDate = DateTime.now();
Text("CalenderDayPicker-示例"),
Flexible(
         child: CalendarDatePicker(
         initialDate: DateTime.now(),
         firstDate: DateTime(2021, 4, 3),
         lastDate: DateTime(2021, 04, 30),
         onDateChanged: (date) {
                _selectedDate = date;
         },
         selectableDayPredicate: (date) {
            return date.difference(DateTime.now()).inMicroseconds < 0;
          },
        ))
```

#### 效果图
![][2]

## 四 MonthPicker

### 4.1 说明

* MonthPicker跟DayPicker界面展示和属性功能基本一致
* MonthPicker也是过时类，被CalendarDatePicker替代

### 4.2 示例

#### 代码

```
Text("MonthPicker-示例"),
MonthPicker(
           selectedDate: _selectedDate,
           onChanged: (date) {
           setState(() {
                _selectedDate = date;
           });
           },
          firstDate: DateTime(2020, 1),
          lastDate: DateTime(2020, 12),
         ),
```

#### 效果图
![][3]

## 五 YearPicker

### 5.1 说明

* YearPicker跟DayPicker的属性类似
* YearPicker只有年份展示，并不包含月份和日期

### 5.2 示例

#### 代码

```
Text("YearPicker"),
Flexible(
         child: YearPicker(
         selectedDate: _selectedDate,
         onChanged: (date) {
         setState(() {
                _selectedDate = date;
               });
        },
        dragStartBehavior: DragStartBehavior.start,
        firstDate: DateTime(2000, 1),
        lastDate: DateTime(2021, 12),
       )),
```

#### 效果图
![][4]

## 六 showDatePicker

### 6.1 说明

* `showDatePicker`并不是一个新的控件
* 长跟按钮的点击事件连用，点击后弹出日期选择框

### 6.2 示例

#### 代码

```
Text("showDatePicker"),
RaisedButton(child: Text("选择日期"),
             onPressed: () async {
             var result = await showDatePicker(
                      context: context,
                      initialDate: DateTime.now(),
                      firstDate: DateTime(2020),
                      lastDate: DateTime(2030));
                  print('$result');
                },
              )
```

#### 效果图
![][5]
#### 示例2-设置主题(builder)

#### 代码

```
RaisedButton(child: Text("选择日期"),
                onPressed: () async {
                  var result = await showDatePicker(
                      builder: (context, child) {
                        return Theme(
                          data: ThemeData.dark(),
                          child: child,
                        );
                      },
                      context: context,
                      initialDate: DateTime.now(),
                      firstDate: DateTime(2020),
                      lastDate: DateTime(2030));
                  print('$result');
                },
              )
```

#### 效果图
![][6]

## 七 CupertinoDatePicker-仿IOS时间控件

### 7.1 示例

```
Text("IOS风格-时间控件"),
Flexible(child: CupertinoDatePicker(
           		use24hFormat: true,
                initialDateTime: _selectedDate,
                onDateTimeChanged: (date) {
                  setState(() {
                    _selectedDate = date;
                  });
                },
              ))
```

#### 效果图
![][7]

## 八 showTimePicker

### 8.1 说明

* showDatePicker是点击后进行日期选择联动，showTimePicker是点击后进行时间选择联动
* 长跟按钮的点击事件连用，点击后弹出时间选择框
* showTimePicker同showDatePicker可以设置深色主题

### 8.2 示例

#### 代码

```
Text("showTimePicker"),
RaisedButton(child: Text("showTimePicker"),
                onPressed: () async {
                  showTimePicker(
                      context: context,
                      initialTime: TimeOfDay.now(),
                      builder: (context, child) {
                        return MediaQuery(
                          data: MediaQuery.of(context)
                              .copyWith(alwaysUse24HourFormat: true),
                          child: child,
                        );
                      });
                },
              ),
```

#### 效果图
![][8]



## 九 CupertinoTimerPicker -IOS时间选择器

### 9.1 示例

#### 代码

```
 Container(
            height: 200,
            child: CupertinoTimerPicker(
            initialTimerDuration: Duration(
                      hours: _selectedDate.hour,
                      minutes: _selectedDate.minute,
                      seconds: _selectedDate.second),
             onTimerDurationChanged: (Duration duration) {},
             ),
           )
```

#### 效果图
![][9]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-daypicker-sample.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-calender-daypicker-sample.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-monthpicker-sample.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutte-yearpicker-sample.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showdatepicker-sample.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showdatepicker-dart-sample.gif
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-cupertinoDatePicker-sample.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showtimepicker-sample.gif
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-cupertinoTimePicker-sample.png