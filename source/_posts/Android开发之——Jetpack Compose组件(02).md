---
title: Android开发之——Jetpack Compose组件(02)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Jetpack Compose
abbrlink: '730e5973'
date: 2022-11-14 08:31:19
---
## 一 概述

* 文字
* 图像和图形
* 列表和网格

<!--more-->

## 二 文字

### 2.1 Text

#### 作用

显示文字

#### 使用

 Text(text = "Hello", modifier = Modifier.padding(24.dp))

#### 设置

* 文字-text
* 布局-modifier
* 文字颜色-color
* 字号-fontSize 

### 2.2 TextField

#### 作用

输入和修改文本

#### 示例

```
 var text by remember { mutableStateOf("Hello") }TextField(
        value = text,
        onValueChange = { text = it },
        label = { Text("Label") }
    )
```

#### 设置

* singleLine
* maxLines
* textStyle

## 三 图像和图形

### 3.1 图像

#### 加载图片

从磁盘加载图片(Image)

```
Image(painter = painterResource(id = R.drawable.ic_launcher), contentDescription =null)
```

从互联网加载图片(GlideImage)

```
GlideImage(model = "https://profile.csdnimg.cn/D/C/8/1_abc_xian", contentDescription = null)
```

#### 光栅图像与矢量图像

光栅图像(ImageBitmap)

```
val imageBitmap = ImageBitmap.imageResource(R.drawable.bg)
Image(bitmap =imageBitmap , contentDescription =null )
```

矢量图像

```
val imageVector = ImageVector.vectorResource(id = R.drawable.ic_launcher_background)
 Image(imageVector =imageVector , contentDescription = null)
```

#### 图标(Icon)

```
Icon(Icons.Rounded.ShoppingCart, contentDescription = null)
```

#### 自定义图片

组合项属性:

* contentScale 
* clip
* colorFilter
* aspectRatio
* colorFilter 
* blur

自定义

* 内容缩放(contentScale )
* 将 Image 可组合项裁剪为形状(clip)
* 为 Image 可组合项添加边框(border)
* 设置自定义宽高比(aspectRatio)
* 颜色滤镜 - 转换图片的像素颜色(colorFilter )
* 对 Image 可组合项进行模糊处理(blur )

### 3.2 图形

#### Canvas

作用

```
通过精确控制元素的样式和位置来绘制元素
```

绘制

* drawLine
* drawCircle
* drawRect

#### DrawScope

作用

```
限定了作用域的绘图环境
```

限定

* DrawScope.inset()
* DrawScope.rotate(degrees = 45F)
* withTransform

## 四 列表和网格

### 4.1 列表

* 简单的：Column 、Row
* 延迟：LazyColumn、LazyRow 

### 4.2 网格(延迟网格)

* LazyVerticalGrid
* LazyHorizontalGrid 

### 4.3 列表&网格->设置

* 内边距：PaddingValues
* 内容间距： Arrangement.spacedBy()
* 粘性标题：stickyHeader()

### 4.4 Spacer

### 4.5 surface

## 五 思维导图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/Jetpack-Compose-02.png