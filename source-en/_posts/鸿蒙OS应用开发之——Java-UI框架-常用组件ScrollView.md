---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件ScrollView
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: f088e0c7
date: 2021-01-07 17:00:42
---
## 一 概述

ScrollView是一种带滚动功能的组件，它采用滑动的方式在有限的区域内显示更多的内容。

* 创建ScrollView
* 设置ScrollView

<!--more-->

## 二 创建ScrollView

### 2.1 XML创建ScrollView

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_content"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <ScrollView
        xmlns:ohos="http://schemas.huawei.com/res/ohos"
        ohos:id="$+id:scrollview"
        ohos:height="300vp"
        ohos:width="300vp"
        ohos:background_element="#FFDEAD"
        ohos:bottom_padding="16vp"
        ohos:layout_alignment="horizontal_center"
        ohos:top_margin="32vp">

        <DirectionalLayout
            ohos:height="match_content"
            ohos:width="match_content">

            <Image
                ohos:id="$+id:img_1"
                ohos:height="match_content"
                ohos:width="match_parent"
                ohos:image_src="$media:dog.jpg"
                ohos:top_margin="16vp"/>
            <!--    放置任意需要展示的组件-->
            <Image
                ohos:id="$+id:img_2"
                ohos:height="match_content"
                ohos:width="match_parent"
                ohos:image_src="$media:cat.jpg"
                ohos:top_margin="16vp"/>

            <Image
                ohos:id="$+id:img_3"
                ohos:height="match_content"
                ohos:width="match_parent"
                ohos:image_src="$media:dog.jpg"
                ohos:top_margin="16vp"/>
            <!--    放置任意需要展示的组件-->
            <Image
                ohos:id="$+id:img_4"
                ohos:height="match_content"
                ohos:width="match_parent"
                ohos:image_src="$media:cat.jpg"
                ohos:top_margin="16vp"/>
        </DirectionalLayout>
    </ScrollView>

    <DirectionalLayout
        xmlns:ohos="http://schemas.huawei.com/res/ohos"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:orientation="horizontal">

        <Button
            ohos:id="$+id:btnScroll"
            ohos:height="match_content"
            ohos:width="match_content"
            ohos:background_element="$graphic:background_button"
            ohos:bottom_margin="15vp"
            ohos:left_margin="15vp"
            ohos:left_padding="8vp"
            ohos:right_padding="8vp"
            ohos:text="Scroll By Y:300"
            ohos:text_color="#ffffff"
            ohos:text_size="27fp"
            ohos:top_margin="30vp"/>

        <Button
            ohos:id="$+id:btnScrollTo"
            ohos:height="match_content"
            ohos:width="match_content"
            ohos:background_element="$graphic:background_button"
            ohos:bottom_margin="15vp"
            ohos:left_margin="15vp"
            ohos:left_padding="8vp"
            ohos:right_padding="8vp"
            ohos:text="Scroll To Y:500"
            ohos:text_color="#ffffff"
            ohos:text_size="27fp"
            ohos:top_margin="30vp"/>
    </DirectionalLayout>
</DirectionalLayout>
```

### 2.2 ScrollView效果图

![][1]

## 三 设置ScrollView

ScrollView的速度、滚动、回弹等常用接口如下

|                           **方法**                           |                           **作用**                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| doFling(int velocityX, int velocityY)<br>doFlingX(int velocityX)<br>doFlingY(int velocityY) |            设置X轴和Y轴滚动的初始速度，单位（px）            |
| fluentScrollBy(int dx, int dy)<br>fluentScrollByX(int dx)<br>fluentScrollByY(int dy) |           根据像素数平滑滚动到指定位置，单位（px）           |
| fluentScrollTo(int x, int y)<br>fluentScrollXTo(int x)<br>fluentScrollYTo(int y) |          根据指定坐标平滑滚动到指定位置，单位（px）          |
|              setReboundEffect(boolean enabled)               |               设置是否启用回弹效果，默认false                |
| setReboundEffectParams(int overscrollPercent, float overscrollRate, int remainVisiblePercent)<br>setReboundEffectParams(ReboundEffectParams reboundEffectParams)<br>setOverscrollPercent(int overscrollPercent)<br>setOverscrollRate(float overscrollRate)<br>setRemainVisiblePercent(int remainVisiblePercent) | 配置回弹效果<br>overscrollPercent：过度滚动百分比，默认值40<br>overscrollRate：过度滚动率，默认值0.6<br>remainVisiblePercent：应保持可见内容的最小百分比，默认值20 |

### 3.1 根据像素数平滑滚动

#### 代码

```
Button btnScroll= (Button) findComponentById(ResourceTable.Id_btnScroll);
ScrollView scrollView= (ScrollView) findComponentById(ResourceTable.Id_scrollview);
btnScroll.setClickedListener(new Component.ClickedListener() {
      @Override
      public void onClick(Component component) {
             scrollView.fluentScrollByY(300);
      }
});
```

#### 根据像素数平滑滚动效果
![][2]

### 3.2 平滑滚动到指定位置
#### 代码

```
Button btnScrollTo= (Button) findComponentById(ResourceTable.Id_btnScrollTo);
ScrollView scrollView= (ScrollView) findComponentById(ResourceTable.Id_scrollview);
btnScrollTo.setClickedListener(new Component.ClickedListener() {
         @Override
         public void onClick(Component component) {
              scrollView.fluentScrollYTo(500);
          }
});
```

#### 平滑滚动到指定位置效果
![][3]

### 3.3 设置布局方向
ScrollView自身没有设置布局方向的属性，所以需要在其子布局中设置。以横向布局horizontal为例

#### xml中配置

```
<ScrollView
    ...
    >
    <DirectionalLayout
        ...
        ohos:orientation="horizontal">
        ...
    </DirectionalLayout>
</Scrollview>
```

#### 设置布局方向为横向布局效果
![][4]

### 3.4 设置回弹效果

#### 在xml中设置

```
<ScrollView
    ...
    ohos:rebound_effect="true">
        ...
</ScrollView>
```

#### Java代码中设置

```
scrollView.setReboundEffect(true);
```

#### 开启回弹效果
![][5]

### 3.5 设置缩放匹配效果

#### xml中设置

```
<ScrollView
    ...
    ohos:match_viewport="true">
        ...
</ScrollView>
```

#### Java代码中设置

```
scrollView.setMatchViewportEnabled(true);
```

#### 设置缩放匹配效果
![][6]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-scrollview-create-xml.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-scrollview-scrollby-300.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-scrollview-scrollto-500.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-scrollview-orientation-horizontal.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-scrollview-rebound-effect.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-scrollview-viewport-effect.gif