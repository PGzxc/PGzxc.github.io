---
title: Flutter开发之——交互组件-Slider(38)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 59d997ef
date: 2021-04-14 14:28:28
---
## 一 概述

本文介绍Flutter中的滑块组件

* Slider：只有一个滑块，获取滑动后位置的值
* RangeSlider：有两个滑块，左右滑动后，获取区间的值
* CupertinoSlider：仿IOS风格的滑块

<!--more-->

## 二 Slider

### 2.1 构造方法

```
const Slider({
    Key? key,
    required this.value,
    required this.onChanged,
    this.onChangeStart,
    this.onChangeEnd,
    this.min = 0.0,
    this.max = 1.0,
    this.divisions,
    this.label,
    this.activeColor,
    this.inactiveColor,
    this.mouseCursor,
    this.semanticFormatterCallback,
    this.focusNode,
    this.autofocus = false,
  })
```

### 2.2 常用属性

|     属性      |         说明         |          取值          |
| :-----------: | :------------------: | :--------------------: |
|     value     |  滑块在此位置的取值  |         double         |
|   onChanged   | 滑块位置变化回调函数 | ValueChanged\<double>? |
|      min      |       最新取值       |         double         |
|      max      |       最大取值       |         double         |
|   divisions   |      分隔成5段       |          int           |
|     label     |   滑块指示器上的值   |         String         |
|  activeColor  |   滑块拖过轨迹颜色   |         Color          |
| inactiveColor |  滑块未拖过轨迹颜色  |         Color          |

### 2.3 示例

#### 代码

```
double _sliderValue = 0;
Text("Slider-示例"),
Slider(
       min: 0,
       max: 100,
       value: _sliderValue,
       label: '$_sliderValue',
       divisions: 8,
       activeColor: Colors.red,
       inactiveColor: Colors.blue,
       onChanged: (value) {
                 setState(() {
                 _sliderValue = value;
               });
 })
```

#### 效果图
![][1]
## 三 RangeSlider

### 3.1 构造方法

```
 RangeSlider({
    Key? key,
    required this.values,
    required this.onChanged,
    this.onChangeStart,
    this.onChangeEnd,
    this.min = 0.0,
    this.max = 1.0,
    this.divisions,
    this.labels,
    this.activeColor,
    this.inactiveColor,
    this.semanticFormatterCallback,
  })
```

### 3.2 常见属性
|     属性      |         说明         |          取值          |
| :-----------: | :------------------: | :--------------------: |
|     value     |  滑块在此位置的取值  |         double         |
|   onChanged   | 滑块位置变化回调函数 | ValueChanged\<double>? |
|      min      |       最新取值       |         double         |
|      max      |       最大取值       |         double         |
|   divisions   |      分隔成5段       |          int           |
|     label     |   滑块指示器上的值   |         String         |
|  activeColor  |   滑块拖过轨迹颜色   |         Color          |
| inactiveColor |  滑块未拖过轨迹颜色  |         Color          |

### 3.3 示例

#### 代码

```
 RangeValues _rangeValues = RangeValues(0, 1);
 Text("RangeSlider-示例"),
 RangeSlider(
            values: _rangeValues,
            onChanged: (value) {
                  setState(() {
                   _rangeValues = value;
                   print(value);
                  });
          })
```
#### 效果图

![][2]

#### 输出结果

```
I/flutter (19573): RangeValues(0.38389369419642855, 0.6413225446428571)
```

## 四 CupertinoSlider

### 4.1 说明

仿IOS风格的Slider

### 4.2 示例

#### 代码

```
double _sliderValue = 0;
Text("CupertinoSlider-示例"),
CupertinoSlider(
              min: 0,
              max: 100,
              value: _sliderValue,
              onChanged: (value) {
              setState(() {
                  _sliderValue = value;
                  print(value);
                    });
            })
```

#### 效果图
![][3]

## 五 Slider.adaptive

### 5.1 示例

#### 代码

```
double _sliderValue = 0;
Text("Slider.adaptive-示例"),
Slider.adaptive(
                min: 0,
                max: 100,
                value: _sliderValue,
                onChanged: (v) {
                  setState(() {
                    _sliderValue = v;
                    print(v);
                  });
                },
              )
```

#### 效果图
![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-slider-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-rangeSlider-sample.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-cupertinoSlider-sample.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-slider-adaptive-sample.gif