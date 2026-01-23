---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件Text
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 64b9e453
date: 2021-01-04 11:22:07
---
## 一 概述

在鸿蒙OS应用中，Text不能直接作为布局文件使用，需要结合布局文件一起使用(Android中可以)

```
 public final void setUIContent(int layoutRes)
 public void setUIContent(ComponentContainer componentContainer)
```

<!--more-->

## 二 创建Text

### 2.1 代码创建Text

```
@Override
public void onStart(Intent intent) {
    super.onStart(intent);
    DirectionalLayout directionalLayout = new DirectionalLayout(getContext());
    Text text = new Text(getContext());
    text.setText("My name is Text.");
    text.setTextSize(50);
    text.setId(100);
    directionalLayout.addComponent(text);
    super.setUIContent(directionalLayout);
  }
```

### 2.2 XML布局创建Text

```
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent">
<Text
    ohos:id="$+id:text"
    ohos:width="match_content"
    ohos:height="match_content"
    ohos:text="Text"/>
</DirectionalLayout>    
```

## 三 设置Text

### 3.1 设置背景

#### 布局文件

```
<Text
    ...
    ohos:background_element="$graphic:background_text"/>
```

background_text.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <corners
        ohos:radius="20"/>
    <solid
        ohos:color="#878787"/>
</shape>
```

#### 效果图
![][1]

### 3.2 设置字体大小和颜色

#### 布局文件(省略布局文件后)

```
<Text
    ohos:id="$+id:text"
    ohos:width="match_content"
    ohos:height="match_content"
    ohos:text="Text"
    ohos:text_size="28fp"
    ohos:text_color="#0000FF"
    ohos:left_margin="15vp"
    ohos:bottom_margin="15vp"
    ohos:right_padding="15vp"
    ohos:left_padding="15vp"
    ohos:background_element="$graphic:background_text"/>
```

#### 效果图
![][2]
### 3.3 设置字体风格和字重
#### 布局文件

```
<Text
    ohos:id="$+id:text"
    ohos:width="match_content"
    ohos:height="match_content"
    ohos:text="Text"
    ohos:text_size="28fp"
    ohos:text_color="#0000FF"
    ohos:italic="true"
    ohos:text_weight="700"
    ohos:text_font="serif"
    ohos:left_margin="15vp"
    ohos:bottom_margin="15vp"
    ohos:right_padding="15vp"
    ohos:left_padding="15vp"
    ohos:background_element="$graphic:background_text"/>
```

#### 效果图

![][3]

### 3.4 设置文本对齐方式
#### 布局文件

```
<Text
    ohos:id="$+id:text"
    ohos:width="300vp"
    ohos:height="100vp"
    ohos:text="Text"
    ohos:text_size="28fp"
    ohos:text_color="#0000FF"
    ohos:italic="true"
    ohos:text_weight="700"
    ohos:text_font="serif"
    ohos:left_margin="15vp"
    ohos:bottom_margin="15vp"
    ohos:right_padding="15vp"
    ohos:left_padding="15vp"
    ohos:text_alignment="horizontal_center|bottom"
    ohos:background_element="$graphic:background_text"/>
```

#### 效果图
![][4]

### 3.5 设置文本换行和最大显示行数
#### 布局文件

```
<Text
    ohos:id="$+id:text"
    ohos:width="75vp"
    ohos:height="match_content"
    ohos:text="TextText"
    ohos:text_size="28fp"
    ohos:text_color="#0000FF"
    ohos:italic="true"
    ohos:text_weight="700"
    ohos:text_font="serif"
    ohos:multiple_lines="true"
    ohos:max_text_lines="2"
    ohos:background_element="$graphic:background_text"/>
```
#### 效果图
![][5]

### 3.6 跑马灯效果
#### 布局文件

```
<Text
    ohos:id="$+id:text"
    ohos:width="75vp"
    ohos:height="match_content"
    ohos:text="TextText"
    ohos:text_size="28fp"
    ohos:text_color="#0000FF"
    ohos:italic="true"
    ohos:text_weight="700"
    ohos:text_font="serif"
    ohos:background_element="$graphic:background_text"/>
```

#### 代码设置

```
// 跑马灯效果
text.setTruncationMode(Text.TruncationMode.AUTO_SCROLLING);
// 始终处于自动滚动状态
text.setAutoScrollingCount(Text.AUTO_SCROLLING_FOREVER);
// 启动跑马灯效果
text.startAutoScrolling();
```

#### 效果图
![][6]

## 四参考
[Text](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ui-java-component-text-0000001050729534)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-text-background.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-text-color-size.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-text-font-weight.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-text-alignment.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-text-multiple-lines.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-text-audo-scrolling.gif