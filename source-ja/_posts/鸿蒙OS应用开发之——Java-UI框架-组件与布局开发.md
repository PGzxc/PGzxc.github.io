---
title: 鸿蒙OS应用开发之——Java UI框架-组件与布局开发
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 5a9bcb26
date: 2020-12-31 17:31:38
---
## 一 概述
* Ability和AbilitySlice两个类的关系
* 组件分类
* 创建布局

<!--more-->

## 二 Ability和AbilitySlice两个类的关系

### 2.1 两个类的关系

HarmonyOS提供了Ability和AbilitySlice两个基础类

* 有界面的Ability绑定了系统的Window进行UI展示，具有生命周期
* AbilitySlice主要用于承载Ability的鸡腿逻辑实现和界面UI，是应用显示、运行和跳转的最小单元
* AbilitySlice通过setUIContent为界面设置布局

|               接口声明                |               接口描述               |
| :-----------------------------------: | :----------------------------------: |
| setUIContent(ComponentContainer root) | 设置界面入口，root为界面组件树根节点 |

### 2.2 组件添加到界面布局中的方式

组件需要进行组合，并添加到界面的布局中。在java UI框架中，提供了两种编写布局的方式：

* 在代码中创建布局：用代码创建Component和ComponentContainer对象，为这些对象设置合适的布局参数和属性值，并将Component添加到ComponentContainer中，从而创建出完整界面
* 在XML中声明UI布局：按层级结构来描述Component和ComponentContainer的关系，给组件节点设定合适的布局参数和属性值，代码中可直接加载生成此布局

## 三 组件分类

根据组件的功能，可以将组件分为：布局类、显示类和交互类三类

| 组件类别 |                           组件名称                           |                           功能描述                           |
| :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|  布局类  | PositionLayout、DirectionalLayout、StackLayout、DependentLayout、TableLayout、AdaptiveBoxLayout | 提供了不同布局规范的组件容器，例如以单一方向排列的DirectionalLayout、以相对位置排列的DependentLayout、以确切位置排列的PositionLayout等。 |
|  显示类  |          Text、Image、Clock、TickTimer、ProgressBar          | 提供了单纯的内容显示，例如用于文本显示的Text，用于图像显示的Image等。 |
|  交互类  | TextField、Button、Checkbox、RadioButton/RadioContainer、Switch、ToggleButton、Slider、Rating、ScrollView、TabList、ListContainer、PageSlider、PageFlipper、PageSliderIndicator、Picker、TimePicker、DatePicker、SurfaceProvider、ComponentProvider | 提供了具体场景下与用户交互响应的功能，例如Button提供了点击响应功能，Slider提供了进度选择功能等。 |

## 四 创建布局

### 4.1 代码创建布局

#### 代码文件

```
public class ExampleAbilitySlice extends AbilitySlice {
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        // 声明布局
        DirectionalLayout directionalLayout = new DirectionalLayout(getContext());
        // 设置布局大小
        directionalLayout.setWidth(ComponentContainer.LayoutConfig.MATCH_PARENT);
        directionalLayout.setHeight(ComponentContainer.LayoutConfig.MATCH_PARENT);
        // 设置布局属性
        directionalLayout.setOrientation(Component.VERTICAL);
        directionalLayout.setPadding(32, 32, 32, 32);
 
        Text text = new Text(getContext());
        text.setText("My name is Text.");
        text.setTextSize(50);
        text.setId(100);
        // 为组件添加对应布局的布局属性
        DirectionalLayout.LayoutConfig layoutConfig = new DirectionalLayout.LayoutConfig(ComponentContainer.LayoutConfig.MATCH_CONTENT, ComponentContainer.LayoutConfig.MATCH_CONTENT);
        layoutConfig.alignment = LayoutAlignment.HORIZONTAL_CENTER;
        text.setLayoutConfig(layoutConfig);
 
        // 将Text添加到布局中
        directionalLayout.addComponent(text);
 
        // 类似的添加一个Button
        Button button = new Button(getContext());
        layoutConfig.setMargins(0, 50, 0, 0);
        button.setLayoutConfig(layoutConfig);
        button.setText("My name is Button.");
        button.setTextSize(50);
        ShapeElement background = new ShapeElement();
        background.setRgbColor(new RgbColor(0, 125, 255));
        background.setCornerRadius(25);
        button.setBackground(background);
        button.setPadding(10, 10, 10, 10);
        button.setClickedListener(new Component.ClickedListener() {
            @Override
            // 在组件中增加对点击事件的检测
            public void onClick(Component Component) {
                // 此处添加按钮被点击需要执行的操作
            }
        });
        directionalLayout.addComponent(button);
 
        // 将布局作为根布局添加到视图树中
        super.setUIContent(directionalLayout);
    }
}
```

#### 运行效果
![][1]
## 4.2 XML创建布局

#### xml布局

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:width="match_parent"
    ohos:height="match_parent"
    ohos:orientation="vertical"
    ohos:padding="32">
    <Text
        ohos:id="$+id:text"
        ohos:width="match_content"
        ohos:height="match_content"
        ohos:layout_alignment="horizontal_center"
        ohos:text="My name is Text."
        ohos:text_size="25vp"/>
    <Button
        ohos:id="$+id:button"
        ohos:margin="50"
        ohos:width="match_content"
        ohos:height="match_content"
        ohos:layout_alignment="horizontal_center"
        ohos:text="My name is Button."
        ohos:text_size="50"/>
</DirectionalLayout>
```

#### 加载XML布局

```
package com.example.myapplication.slice;
 
import com.example.myapplication.ResourceTable;
import ohos.aafwk.ability.AbilitySlice;
import ohos.aafwk.content.Intent;
import ohos.agp.colors.RgbColor;
import ohos.agp.components.*;
import ohos.agp.components.element.ShapeElement;
 
public class ExampleAbilitySlice extends AbilitySlice {
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        // 加载XML布局作为根布局
        super.setUIContent(ResourceTable.Layout_first_layout);
        Button button = (Button) findComponentById(ResourceTable.Id_button);
        if (button != null) {
            // 设置组件的属性
            ShapeElement background = new ShapeElement();
            background.setRgbColor(new RgbColor(0, 125, 255));
            background.setCornerRadius(25);
            button.setBackground(background);
 
            button.setClickedListener(new Component.ClickedListener() {
                @Override
                // 在组件中增加对点击事件的检测
                public void onClick(Component Component) {
                    // 此处添加按钮被点击需要执行的操作
                }
            });
        }
    }
}
```

#### 运行效果
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-code-layout-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-xml-layout.png