---
title: 鸿蒙OS应用开发之——页面布局StackLayout
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 56c5792f
date: 2020-12-29 16:56:40
---
## 一 概述

* StackLayout相当于Android中的帧布局FrameLayout
* StackLayout直接在屏幕上开辟出一块空白的区域，添加到这个布局中的视图都是以层叠的方式显示
* 第一个添加到布局中视图显示在最底层，最后一个被放在最顶层
* 上一层的视图会覆盖下一层的视图

<!--more-->

## 二 示例

### 2.1 布局文件

```
<?xml version="1.0" encoding="utf-8"?>
<StackLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:id="$+id:stack_layout"
    ohos:height="match_parent"
    ohos:width="match_parent">
 
    <Text
        ohos:id="$+id:text_blue"
        ohos:text_alignment="bottom|horizontal_center"
        ohos:text_size="24fp"
        ohos:text="第一层"
        ohos:height="400vp"
        ohos:width="400vp"
        ohos:background_element="#3F56EA" />
 
    <Text
        ohos:id="$+id:text_light_purple"
        ohos:text_alignment="bottom|horizontal_center"
        ohos:text_size="24fp"
        ohos:text="第二层"
        ohos:height="300vp"
        ohos:width="300vp"
        ohos:background_element="#00AAEE" />
 
    <Text
        ohos:id="$+id:text_orange"
        ohos:text_alignment="center"
        ohos:text_size="24fp"
        ohos:text="第三层"
        ohos:height="80vp"
        ohos:width="80vp"
        ohos:background_element="#00BFC9" />
        
</StackLayout>
```

### 2.2 逻辑文件(将子视图从后面移到前面显示)

```
ComponentContainer stackLayout = (ComponentContainer) findComponentById(ResourceTable.Id_stack_layout);
Text textFirst = (Text) findComponentById(ResourceTable.Id_text_blue);

textFirst.setClickedListener(new Component.ClickedListener() {
    @Override
    public void onClick(Component component) {
        stackLayout.moveChildToFront(component);
    }
});
```

### 2.3 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-layout-stacklayout-sample.gif