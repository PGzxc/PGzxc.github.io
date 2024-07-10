---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件Switch
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 95114b1e
date: 2021-01-06 09:41:47
---
## 一 概述

Switch是切换单个设置开/关两种状态的组件。

* 创建Switch
* 设置Switch

<!--more-->

## 二 创建Switch

### 2.1 XML中创建Switch

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <Switch
        ohos:id="$+id:btn_switch"
        ohos:height="30vp"
        ohos:width="60vp"/>

</DirectionalLayout>
```

### 2.2 效果图

![][1]
## 三 设置Switch
### 3.1 设置Switch在开启和关闭时的文本

#### 在xml中设置

```
<Switch
    ...
    ohos:text_state_off="OFF"
    ohos:text_state_on="ON"/>
```

#### java代码中设置

```
Switch btnSwitch = (Switch) findComponentById(ResourceTable.Id_btn_switch);
btnSwitch.setStateOffText("OFF");
btnSwitch.setStateOnText("ON");
```

#### 设置开启和关闭文本效果
![][2]

### 3.2 设置响应Switch状态改变的事件

#### java代码中设置

```
btnSwitch.setCheckedStateChangedListener(new AbsButton.CheckedStateChangedListener() {
     @Override
      public void onCheckedChanged(AbsButton absButton, boolean b) {
             new ToastDialog(getContext()).setText("是否选中："+b).show();
      }
});
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-switch-xml-run.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-switch-on-off-text.gif