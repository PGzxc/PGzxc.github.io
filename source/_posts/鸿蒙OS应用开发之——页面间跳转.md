---
title: 鸿蒙OS应用开发之——页面间跳转
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 35a1cf23
date: 2020-12-28 13:30:38
---
## 一 概述

本文将创建两个页面，实现页面间跳转

* 第一个页面MainAbility，第二个页面SecondAbility
* 每个页面都有一个Text(显示页面内容)和Button(跳转按钮)
* 在MainAbility点击Next按钮，跳转到SecondAbility
* SecondAbility点击Return按钮，返回MainAbility

<!--more-->

## 二 项目结构

![][1]

## 三 编写第一个页面

### 3.1 页面组成

* entry > src > main > resources > base > layout——>ability_main.xml
* entry > src > main > java > com.example.harmonyosdemo> slice>MainAbilitySlice.java
* entry > src > main > java > com.example.harmonyosdemo>MainAbility.java

### 3.2 页面内容

#### ability_main.xml

```
<?xml version="1.0" encoding="utf-8"?>
<DependentLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:background_element="#ffffff">

    <Text
        ohos:id="$+id:text"
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:center_in_parent="true"
        ohos:text="Page One"
        ohos:text_color="#000000"
        ohos:text_size="32fp"/>

    <Button
        ohos:id="$+id:button"
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:align_parent_bottom="true"
        ohos:background_element="$graphic:background_button"
        ohos:bottom_margin="40vp"
        ohos:bottom_padding="8vp"
        ohos:center_in_parent="true"
        ohos:left_padding="70vp"
        ohos:right_padding="70vp"
        ohos:text="Next"
        ohos:text_color="#ffffff"
        ohos:text_size="19fp"
        ohos:top_padding="8vp"
        />
</DependentLayout>
```

#### background_button

```
<?xml version="1.0" encoding="utf-8"?>
<shape
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <corners
        ohos:radius="100"/>
    <solid
        ohos:color="#007DFF"/>
</shape>
```

#### MainAbilitySlice.java

```
public class MainAbilitySlice extends AbilitySlice {
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_main);
        Button button= (Button) findComponentById(ResourceTable.Id_button);
        if (button!=null){
            //为按钮设置点击回调
            button.setClickedListener(new Component.ClickedListener() {
                @Override
                public void onClick(Component component) {
                    Intent secondIntent=new Intent();
                    // 指定待启动FA的bundleName和abilityName
                    Operation operation = new Intent.OperationBuilder()
                            .withDeviceId("")
                            .withBundleName("com.example.harmonyosdemo")
                            .withAbilityName("com.example.harmonyosdemo.SecondAbility")
                            .build();
                    secondIntent.setOperation(operation);
                    // 通过AbilitySlice的startAbility接口实现启动另一个页面
                    startAbility(secondIntent);
                }
            });
        }
    }
    @Override
    public void onActive() {
        super.onActive();
    }

    @Override
    public void onForeground(Intent intent) {
        super.onForeground(intent);
    }
}
```

#### MainAbility

```
public class MainAbility extends Ability {
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setMainRoute(MainAbilitySlice.class.getName());
    }
}
```

## 四 编写第2个页面

### 4.1 页面组成
* entry > src > main > resources > base > layout——>ability_second.xml
* entry > src > main > java > com.example.harmonyosdemo> slice>SecondAbilitySlice.java
* entry > src > main > java > com.example.harmonyosdemo>SecondAbility.java

### 4.2 页面内容

#### ability_second.xml

```
<?xml version="1.0" encoding="utf-8"?>
<DependentLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:background_element="#ffffff">

    <Text
        ohos:id="$+id:text"
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:center_in_parent="true"
        ohos:text="Second Page "
        ohos:text_color="#000000"
        ohos:text_size="32fp"/>

    <Button
        ohos:id="$+id:buttonReturn"
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:align_parent_bottom="true"
        ohos:background_element="$graphic:background_button"
        ohos:bottom_margin="40vp"
        ohos:bottom_padding="8vp"
        ohos:center_in_parent="true"
        ohos:left_padding="70vp"
        ohos:right_padding="70vp"
        ohos:text="Return"
        ohos:text_color="#ffffff"
        ohos:text_size="19fp"
        ohos:top_padding="8vp"
        />

</DependentLayout>
```

#### SecondAbilitySlice

```
public class SecondAbilitySlice extends AbilitySlice {
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        // 声明布局
        super.setUIContent(ResourceTable.Layout_ability_second);
        ((Button)findComponentById(ResourceTable.Id_buttonReturn)).setClickedListener(new Component.ClickedListener() {
            @Override
            public void onClick(Component component) {
                onBackPressed();
            }
        });

//        DependentLayout myLayout = new DependentLayout(this);
//        // 设置布局大小
//        myLayout.setWidth(MATCH_PARENT);
//        myLayout.setHeight(MATCH_PARENT);
//        // 设置布局背景为白色
//        ShapeElement element = new ShapeElement();
//        element.setRgbColor(new RgbColor(255, 255, 255));
//        myLayout.setBackground(element);
//
//        // 创建一个文本
//        Text text = new Text(this);
//        text.setText("Hi there");
//        text.setWidth(MATCH_PARENT);
//        text.setTextSize(100);
//        text.setTextColor(Color.BLACK);
//        // 设置文本的布局
//        DependentLayout.LayoutConfig textConfig = new DependentLayout.LayoutConfig(MATCH_CONTENT,MATCH_CONTENT);
//        textConfig.addRule(DependentLayout.LayoutConfig.CENTER_IN_PARENT);
//        text.setLayoutConfig(textConfig);
//        myLayout.addComponent(text);
//        super.setUIContent(myLayout);
    }

    @Override
    public void onActive() {
        super.onActive();
    }
    @Override
    public void onForeground(Intent intent) {
        super.onForeground(intent);
    }
}
```

#### SecondAbility

```
public class SecondAbility extends Ability {
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setMainRoute(SecondAbilitySlice.class.getName());
    }
}
```

## 五 效果图
![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-project-struct-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-page-jump.gif