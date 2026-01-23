---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件TextField
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: '77846214'
date: 2021-01-04 17:25:58
---
## 一 概述

* XMl布局文件创建TextField
* TextField常用属性设置
* 应用实例

<!--more-->

## 二 XMl布局文件创建TextField

### 2.1 说明

TextField需要跟布局文件结合使用

### 2.2 XML创建TextField

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <TextField
        ohos:height="40vp"
        ohos:width="200vp"
        ohos:left_padding="20vp"
        ohos:hint="请输入内容"/>
</DirectionalLayout>
```

## 三 TextField常用属性设置

### 3.1 设置TextField的背景

#### 布局文件

```
<TextField
    ...
    ohos:background_element="$graphic:background_text_field"/>
```

#### 背景文件background_text_field.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
       ohos:shape="rectangle">
    <corners
        ohos:radius="40"/>
    <solid
        ohos:color="#FFFFFF"/>
</shape>
```

### 3.2 设置提示文字

#### 布局文件

```
<TextField
    ...
    ohos:hint="Enter phone number or email"
    ohos:text_alignment="vertical_center"/>
```

### 3.3 设置Bubble

#### 布局文件

```
<TextField
    ...
    ohos:element_cursor_bubble="$graphic:ele_cursor_bubble" />
```

#### Bubble(ele_cursor_bubble.xml)

```
<?xml version="1.0" encoding="UTF-8" ?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
       ohos:shape="rectangle">
    <corners
        ohos:radius="40"/>
    <solid
        ohos:color="#6699FF"/>
    <stroke
        ohos:color="#0066FF"
        ohos:width="10"/>
</shape>
```

#### 效果图

![][1]

### 3.4 设置TextField的内边距

```
<TextField
    ...
    ohos:left_padding="24vp"
    ohos:right_padding="24vp"
    ohos:top_padding="8vp"
    ohos:bottom_padding="8vp"/>
```

### 3.5 设置TextField的多行显示

```
<TextField
    ...
    ohos:multiple_lines="true"/>
```

### 3.6 设置TextField不可用状态

```
TextField textField = (TextField) findComponentById(ResourceTable.Id_text_field);
textField.setEnabled(false);
```

### 3.7 响应焦点变化

```
textField.setFocusChangedListener(((component, isFocused) -> {
    if (isFocused) { 
        // 获取到焦点
        ...
    }else { 
        // 失去焦点
        ...
    }
}));
```

### 3.8 设置基线

#### 布局文件

```
<TextField
    ...
    ohos:basement="#000099" />
```

#### 效果图
![][2]

## 四 应用实例

### 4.1 实例描述

当点击登录按钮，将会出现错误提示，同时将会改变TextField的状态
![][3]

### 4.2 功能开发

#### 布局文件

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout 
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:width="match_parent"
    ohos:height="match_parent"
    ohos:background_element="#FF000000"
    ohos:orientation="vertical">
 
    <StackLayout
        ohos:top_margin="60vp"
        ohos:width="match_parent"
        ohos:height="match_content"
        ohos:layout_alignment="center">
        <TextField
            ohos:id="$+id:name_textField"
            ohos:width="600vp"
            ohos:height="match_content"
            ohos:multiple_lines="false"
            ohos:left_padding="24vp"
            ohos:right_padding="24vp"
            ohos:top_padding="8vp"
            ohos:bottom_padding="8vp"
            ohos:min_height="44vp"
            ohos:text_size="18fp"
            ohos:layout_alignment="center"
            ohos:text_alignment="center_vertical"
            ohos:background_element="$graphic:background_text_field"
            ohos:hint="Enter phone number or email" />
 
        <Text
            ohos:visibility="hide"
            ohos:id="$+id:error_tip_text"
            ohos:width="match_content"
            ohos:height="match_content"
            ohos:top_padding="8vp"
            ohos:bottom_padding="8vp"
            ohos:right_margin="20vp"
            ohos:text="Incorrect account or password"
            ohos:text_size="18fp"
            ohos:text_color="red"
            ohos:layout_alignment="right"/>
    </StackLayout>
 
    <TextField
        ohos:top_margin="40vp"
        ohos:id="$+id:password_text_field"
        ohos:width="600vp"
        ohos:height="match_content"
        ohos:multiple_lines="false"
        ohos:left_padding="24vp"
        ohos:right_padding="24vp"
        ohos:top_padding="8vp"
        ohos:bottom_padding="8vp"
        ohos:min_height="44vp"
        ohos:text_size="18fp"
        ohos:layout_alignment="center"
        ohos:text_alignment="center_vertical"
        ohos:background_element="$graphic:background_text_field"
        ohos:hint="Enter password" />
 
    <Button
        ohos:top_margin="40vp"
        ohos:id="$+id:ensure_button"
        ohos:width="120vp"
        ohos:height="35vp"
        ohos:background_element="$graphic:background_btn"
        ohos:text="Log in"
        ohos:text_size="20fp"
        ohos:layout_alignment="horizontal_center"/>
 
</DirectionalLayout>
```

#### 样式文件

background_text_field.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
       ohos:shape="rectangle">
    <corners
        ohos:radius="40"/>
    <solid
        ohos:color="white"/>
    <stroke
        ohos:color="black"
        ohos:width="6"/>
</shape>
```

background_btn.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
       ohos:shape="rectangle">
    <corners
        ohos:radius="35"/>
    <solid
        ohos:color="white"/>
</shape>
```

background_text_field_error.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
       ohos:shape="rectangle">
    <corners
        ohos:radius="40"/>
    <solid
        ohos:color="gray"/>
    <stroke
        ohos:color="#E74C3C"
        ohos:width="6"/>
</shape>
```

#### java功能逻辑文件

```
// 当点击登录，改变相应组件的样式
Button button = (Button) findComponentById(ResourceTable.Id_ensure_button);
button.setClickedListener((component -> {
// 显示错误提示的Text
Text text = (Text) findComponentById(ResourceTable.Id_error_tip_text);
text.setVisibility(Component.VISIBLE);

// 显示TextField错误状态下的样式
ShapeElement errorElement = new ShapeElement(this, ResourceTable.Graphic_background_text_field_error);
TextField textField = (TextField) findComponentById(ResourceTable.Id_name_textField);
            textField.setBackground(errorElement);
            // TextField失去焦点
            textField.clearFocus();
}));
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-textfiled-bubble.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-textfield-basement.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-textfield-sample.gif