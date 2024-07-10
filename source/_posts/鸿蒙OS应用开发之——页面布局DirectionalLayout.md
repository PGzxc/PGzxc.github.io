---
title: 鸿蒙OS应用开发之——页面布局DirectionalLayout
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 914a88
date: 2020-12-29 14:49:44
---
## 一 概述

* DirectionalLayout布局类似于Android中的LinearLayout布局
* `ohos:orientation`的取值有两个`horizontal`和`vertical`，代表横向和纵向布局
* DirectionalLayout用于将一组组件(Component)按照水平或者垂直方向排布，能够方便地对齐布局内的组件

<!--more-->

## 二 布局文件基本操作

### 2.1 布局文件的位置

布局文件位于：entry—>src—>main—>resources—>base—>layout下

### 2.2 创建布局文件
在layout上右键：New—>Layout Resource File

  ![][1]

在弹出的窗口中，输入新建文件名和布局文件类型

  ![][2]

### 2.3 预览文件

#### 布局文件相关代码

layout_register.xml

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <Button
        ohos:height="30vp"
        ohos:width="60vp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:text="Button"/>
</DirectionalLayout>
```

color_cyan_element

```
<?xml version="1.0" encoding="utf-8" ?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid ohos:color="#00FFFd"/>
</shape>
```

#### 多设备预览(deviceType设置多个设备时)

```
"deviceType": [
  "tablet","phone"
],
```

![][3]

## 三 DirectionalLayout排列

### 3.1 垂直排列

#### 效果图
![][4]
#### 代码文件

布局文件

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:width="match_parent"
    ohos:height="match_content"
    ohos:orientation="vertical">
    <Button
        ohos:width="33vp"
        ohos:height="20vp"
        ohos:bottom_margin="3vp"
        ohos:left_margin="13vp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:text="Button 1"/>
    <Button
        ohos:width="33vp"
        ohos:height="20vp"
        ohos:bottom_margin="3vp"
        ohos:left_margin="13vp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:text="Button 2"/>
    <Button
        ohos:width="33vp"
        ohos:height="20vp"
        ohos:bottom_margin="3vp"
        ohos:left_margin="13vp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:text="Button 3"/>
</DirectionalLayout>
```

color_cyan_element.xml：

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#00FFFD"/>
</shape>
```

### 3.2 **水平排列**
#### 效果图
![][5]
#### 代码

布局文件

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:width="match_parent"
    ohos:height="match_content"
    ohos:orientation="horizontal">
    <Button
        ohos:width="33vp"
        ohos:height="20vp"
        ohos:left_margin="13vp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:text="Button 1"/>
    <Button
        ohos:width="33vp"
        ohos:height="20vp"
        ohos:left_margin="13vp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:text="Button 2"/>
    <Button
        ohos:width="33vp"
        ohos:height="20vp"
        ohos:left_margin="13vp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:text="Button 3"/>
</DirectionalLayout>
```

color_cyan_element.xml：

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#00FFFD"/>
</shape>
```

## 四 DirectionalLayout对齐方式

### 4.1 对齐方式属性表

|     **参数**      |       **作用**       | **可搭配排列方式** |
| :---------------: | :------------------: | :----------------: |
|       left        |        左对齐        |      垂直排列      |
|        top        |       顶部对齐       |      水平排列      |
|       right       |        右对齐        |      垂直排列      |
|      bottom       |       底部对齐       |      水平排列      |
| horizontal_center |     水平方向居中     |      垂直排列      |
|  vertical_center  |     垂直方向居中     |      水平排列      |
|      center       | 垂直与水平方向都居中 |   水平/垂直排列    |

### 4.2 实例

效果图
![][6]

布局文件示例代码

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:width="match_parent"
    ohos:height="60vp">
    <Button
        ohos:width="50vp"
        ohos:height="20vp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:layout_alignment="left"
        ohos:text="Button 1"/>
    <Button
        ohos:width="50vp"
        ohos:height="20vp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:layout_alignment="horizontal_center"
        ohos:text="Button 2"/>
    <Button
        ohos:width="50vp"
        ohos:height="20vp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:layout_alignment="right"
        ohos:text="Button 3"/>
</DirectionalLayout>
```

color_cyan_element.xml：

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#00FFFD"/>
</shape>
```

## 五 权重

### 5.1 说明

* 权重（weight）就是按比例来分配组件占用父组件的大小
* 父布局可分配宽度=父布局宽度-所有子组件width之和；
* 组件宽度=组件weight/所有组件weight之和*父布局可分配宽度；

### 5.2 实例

效果图
![][7]

布局文件

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:width="match_parent"
    ohos:height="match_content"
    ohos:orientation="horizontal">
    <Button
        ohos:width="0vp"
        ohos:height="20vp"
        ohos:weight="1"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:text="Button 1"/>
    <Button
        ohos:width="0vp"
        ohos:height="20vp"
        ohos:weight="1"
        ohos:background_element="$graphic:color_gray_element"
        ohos:text="Button 2"/>
    <Button
        ohos:width="0vp"
        ohos:height="20vp"
        ohos:weight="1"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:text="Button 3"/>
</DirectionalLayout>
```

color_cyan_element.xml：

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#00FFFD"/>
</shape>
```

color_gray_element.xml：

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#878787"/>
</shape>
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-layout-create-resource-file.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-layout-create-file-name-type.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-layout-qiehuan-sample.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-directionallayout-vertical-sample.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-directionallayout-horizontal-sample.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-directionallayout-aliment-sample.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-directionallayout-weight-sample.png