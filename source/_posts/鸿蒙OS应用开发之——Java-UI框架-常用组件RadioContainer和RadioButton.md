---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件RadioContainer和RadioButton
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: a4257ed5
date: 2021-01-06 14:06:55
---
## 一 概述

* RadioButton和RadioContainer组合使用，实现单选效果
* RadioContainer是RadioButton的容器，其下的RadioButton只有一个被选中

<!--more-->

## 二 RadioButton

### 2.1 创建RadioButton

```
<RadioButton
    ohos:id="$+id:rb_1"
    ohos:height="40vp"
    ohos:width="match_content"
    ohos:text="A.Learning"
    ohos:text_size="20fp"/>
```

### 2.2 设置RadioButton

text_color_on为选中状态的字体颜色，text_color_off为未选中状态的字体颜色

#### 在xml中设置

```
<RadioButton
    ...
    ohos:text_color_on="#00BFFF"
    ohos:text_color_off="#808080"/>
```

#### 在Java代码中设置

```
rBtn.setTextColorOn(new Color(Color.getIntColor("#0066FF")));
rBtn.setTextColorOff(new Color(Color.getIntColor("#505050")));
```

#### 效果图

![][1]

## 三 RadioContainer

### 3.1 创建RadioContainer

#### XML中设置

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <RadioContainer
        ohos:id="$+id:radio_container"
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:layout_alignment="horizontal_center"
        ohos:top_margin="32vp">

        <RadioButton
            ohos:id="$+id:radio_button_1"
            ohos:height="40vp"
            ohos:width="match_content"
            ohos:marked="true"
            ohos:text="A"
            ohos:text_size="14fp"/>

        <RadioButton
            ohos:id="$+id:radio_button_2"
            ohos:height="40vp"
            ohos:width="match_content"
            ohos:text="B"
            ohos:text_size="14fp"/>
        <RadioButton
            ohos:id="$+id:radio_button_3"
            ohos:height="40vp"
            ohos:width="match_content"
            ohos:text="C"
            ohos:text_size="14fp"/>

    </RadioContainer>
</DirectionalLayout>
```

####  RadioContainer效果
![][2]

### 3.2 设置RadioContainer

#### 3.2.1 设置响应RadioContainer状态改变的事件

```
RadioContainer container = (RadioContainer) findComponentById(ResourceTable.Id_radio_container);
        container.setMarkChangedListener(new RadioContainer.CheckedStateChangedListener() {
            @Override
            public void onCheckedChanged(RadioContainer radioContainer, int index) {
                RadioButton radioButton= (RadioButton) radioContainer.getComponentAt(index);
                String text=radioButton.getText();
                new ToastDialog(getContext()).setText(text).show();
            }
});
```

#### 3.2.2 根据ID设置指定RadioButton为选定状态

```
container.mark(ResourceTable.Id_radio_button_1);
```

#### 3.2.3 清除RadioContainer中所有RadioButton的选定状态

```
container.cancelMarks();
```

#### 3.2.4 设置RadioButton的布局方向

orientation设置为“horizontal”，表示横向布局；

orientation设置为“vertical”，表示纵向布局。

默认为纵向布局。

xml中设置

```
<RadioContainer
    ...
    ohos:orientation="horizontal">
    ...
</RadioContainer>
```

java代码中设置

```
container.setOrientation(Component.HORIZONTAL);
```

设置布局方向为横向布局效果
![][3]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-radiobutton-preview.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-radiocontainer-normal.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-radiocontainer-horizontal.gif