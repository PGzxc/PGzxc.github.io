---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件Checkbox
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: '48215593'
date: 2021-01-06 16:44:35
---
## 一 概述

* 创建Checkbox
* 设置Checkbox

<!--more-->

## 二 创建Checkbox

### XML中创建

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <Checkbox
        ohos:id="$+id:check_box"
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:text="This is a checkbox"
        ohos:check_element="$graphic:background_checkbox_check"
        ohos:text_size="20fp"/>

</DirectionalLayout>
```

#### 效果图
![][1]

## 三 设置Checkbox

### 3.1 在xml中设置Checkbox的背景

#### layout目录下xml文件的代码

```
<Checkbox
    ...
    ohos:check_element="$graphic:background_checkbox_check" />
```

background_checkbox_check.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
       ohos:shape="oval">
    <solid
        ohos:color="#00FFCC"/>
</shape>
```

#### 效果图
![][2]

### 3.2 使用Java代码设置Checkbox在选中与取消选中时的背景

#### Java代码设置

```
ShapeElement elementButtonOn = new ShapeElement();
elementButtonOn.setRgbColor(RgbPalette.RED);
elementButtonOn.setShape(ShapeElement.RECTANGLE);
elementButtonOn.setCornerRadius(0.0f);
 
ShapeElement elementButtonOff = new ShapeElement();
elementButtonOff.setRgbColor(RgbPalette.BLACK);
elementButtonOff.setShape(ShapeElement.RECTANGLE);
elementButtonOff.setCornerRadius(0.0f);
 
StateElement checkElement = new StateElement();
checkElement.addState(new int[]{ComponentState.COMPONENT_STATE_CHECKED}, elementButtonOn);
checkElement.addState(new int[]{ComponentState.COMPONENT_STATE_EMPTY}, elementButtonOff);
 
Checkbox checkbox = (Checkbox) findComponentById(ResourceTable.Id_check_box);
checkbox.setButtonElement(checkElement);
```

#### Java代码设置Checkbox背景的效果
![][3]

### 3.3 设置Checkbox的文字在选中和取消选中时的颜色

#### XML中设置

```
<Checkbox
    ...
    ohos:text_color_on="#00AAEE"
    ohos:text_color_off="#000000" />
```

#### 设置Checkbox文字颜色的效果
![][4]

### 3.4 设置Checkbox的选中状态

```
checkbox.setChecked(true);
```

### 3.5 设置不同状态之间的切换

如果当前为选中状态，那么将变为未选中；

如果当前是未选中状态，将变为选中状态

```
checkbox.toggle();
```

### 3.6 设置响应Checkbox状态变更的事件

```
checkbox.setCheckedStateChangedListener(new AbsButton.CheckedStateChangedListener() {
            @Override
            public void onCheckedChanged(AbsButton absButton, boolean b) {
                new ToastDialog(getContext()).setText("是否选中："+b).show();
            }
});
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-checkbox-normal.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-checkbox-checked-background.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-checkbox-shape-element.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-checkbox-check-color.gif