---
title: Flutter开发之——基本组件-Text(10)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: ef6ff1d4
date: 2021-02-25 10:06:28
---
## 一 概述

Flutter中用于显示文字的组件是Text，本文介绍Text相关的内容：

* Text及其基本属性
* TextStyle
* TextSpan
* DefaultTextStyle
* font字体

<!--more-->

## 二 Text及其基本属性

### 2.1 Text

Text构造时，需要有说明的文字内容

### 2.2 属性说明
```
  const Text(
    String this.data, {
    Key? key,
    this.style,
    this.strutStyle,
    this.textAlign,
    this.textDirection,
    this.locale,
    this.softWrap,
    this.overflow,
    this.textScaleFactor,
    this.maxLines,
    this.semanticsLabel,
    this.textWidthBasis,
    this.textHeightBehavior,
  })
```
|      属性       |         说明         |
| :-------------: | :------------------: |
|      style      | 文字样式(颜色、粗细) |
|    textAlign    |     文字对齐样式     |
|    overflow     |  文字字数超出后样式  |
| textScaleFactor |       文字大小       |
|    maxLines     |       最大行数       |

### 2.3 代码示例(textScaleFactor/textAlign/maxLines/overflow)

* textScaleFactor：设置文字大小的属性
* textAlign：文字的对齐方式，为确保此属性有效，请确保文字内容长度足够
* maxLines：文本显示的最大行数
* overflow：文本超过一行的处理方式(TextOverflow.ellipsis多出部分用省略号代替`...`

```
Text("Hello World"),//默认没有使用样式
Text("Hello World",textScaleFactor: 2.0,),//默认没有使用样式
Text("Hello World"*6,textAlign: TextAlign.right),
Text("Hello World"*6,textAlign: TextAlign.right,maxLines: 1,),
Text("Hello World"*6,textAlign: TextAlign.right,overflow: TextOverflow.ellipsis,),
```
### 2.4 效果图
![][1]

## 三 TextStyle

### 3.1 说明

* TextStyle是Text的其中一个属性，因为它的内容较多单独说明
* `TextStyle`用于指定文本显示的样式如颜色、字体、粗细、背景等


### 3.2 属性说明

```
  const TextStyle({
    this.inherit = true,
    this.color,
    this.backgroundColor,
    this.fontSize,
    this.fontWeight,
    this.fontStyle,
    this.letterSpacing,
    this.wordSpacing,
    this.textBaseline,
    this.height,
    this.locale,
    this.foreground,
    this.background,
    this.shadows,
    this.fontFeatures,
    this.decoration,
    this.decorationColor,
    this.decorationStyle,
    this.decorationThickness,
    this.debugLabel,
    String? fontFamily,
    List<String>? fontFamilyFallback,
    String? package,
  })
```
|      属性       |      说明      |
| :-------------: | :------------: |
|      color      |      颜色      |
| backgroundColor |     背景色     |
|    fontSize     |    字体大小    |
|   fontWeight    | 字体权重(粗细) |
|    fontStyle    |      样式      |
|  letterSpacing  |    字符间隔    |
|   wordSpacing   |    单词间隔    |
|   decoration    |    文本装饰    |
| decorationStyle |  文本装饰样式  |

### 3.3 示例

```
Text("Hello World",style:
TextStyle(color: Colors.red,backgroundColor:Color(0x88888888),
          fontSize: 20,fontWeight:FontWeight.bold,
           fontStyle:FontStyle.italic,
           letterSpacing:5,wordSpacing: 50,                 decoration:TextDecoration.underline,decorationStyle:TextDecorationStyle.solid)
            ,),
```

### 3.4 效果图
![][2]

## 四 TextSpan

### 4.1 说明

TextSpan用于对同一段Text内容的不同片段进行不同的设置(样式、处理)

### 4.2 属性说明

```
const TextSpan({
    this.text,
    this.children,
    TextStyle? style,
    this.recognizer,
    this.semanticsLabel,
  }) : super(style: style);
```

### 4.3 代码

```
Text.rich(TextSpan(text: "Please Select Item：",                                                            
    children: [                                                                                            
          TextSpan(text: "红：",style: TextStyle(color: Colors.red),                                         
              recognizer: new TapGestureRecognizer()..onTap=(){Fluttertoast.showToast(msg: "你选择了红");}),     
          TextSpan(text: "蓝",style: TextStyle(color: Colors.blue),                                         
              recognizer:new TapGestureRecognizer()..onTap=(){Fluttertoast.showToast(msg: "你选择了蓝",);})      
]))                                                                                                         
```

### 4.4 效果图
![][3]

## 五 DefaultTextStyle

### 5.1 说明

* 在Widget树中，文本的样式默认是可以被继承的
* 如果在Widget树的某一个节点处设置一个默认的文本样式，那么该节点的子树中所有文本都会默认使用这个样式

### 5.2 代码

```
DefaultTextStyle(style: TextStyle(
            color:Colors.red,
            fontSize: 20.0,
          ), child: Column(
            children: [
              Text("Hello World 1"),
              Text("Hello World 2"),
              Text("Hello World 3",style: TextStyle(
                inherit:false,  //不继承默认样式
                color: Colors.blue,fontSize: 30.0
              ),),
            ],
          ))
```

说明：

* Text 1和Text 2继承默认样式
* Text3中设置inherit不继承样式，并自己实现了TextStyle

### 5.3 效果图
![][4]
## 六 font字体

### 6.1 说明

* 当我们需要在程序中使用第三方的字体时就会用到此选项
* Flutter中使用字体分两步完成：
  - 首先：在`pubspec.yaml`中声明它们，以确保它们会打包到应用程序中
  - 然后通过`TextStyle`属性使用字体

### 6.2 如何查找字体

* [google](https://github.com/google)/[fonts](https://github.com/google/fonts)
* [Android SDK]\platforms\android-xx\data\fonts
![][5]

### 6.3 添加字体和在`pubspec.yaml`中声明

* 将字体文件copy到fonts文件夹下

  ![][6]
  
* 在`pubspec.yaml`中声明它

  ```
  fonts:
    - family: Hack
      fonts:
        - asset: fonts/Hack-Bold.ttf
  
    - family: fnt
      fonts:
        - asset: fonts/fnt_default.ttf
  
    - family: NotoNaskhArabic
      fonts:
        - asset: fonts/NotoNaskhArabic-Regular.ttf
        - asset: fonts/NotoNaskhArabic-Bold.ttf
          weight: 500
  ```

### 6.4 使用

```
 Text("Hello World",textScaleFactor: 2,),
 Text("Hello World",textScaleFactor: 2,style: TextStyle(fontFamily: "Hack"),),
 Text("Hello World",textScaleFactor: 2,style: TextStyle(fontFamily: "fnt"),),
```

### 6.5 使用效果
![][7]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-text-property.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-text-textstyle-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-text-textspan.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-text-default-textstyle.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-text-font-sdk.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-text-font-folder-set.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-text-font-preview.png