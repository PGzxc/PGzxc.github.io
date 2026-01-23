---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件ToastDialog
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 5dbb9ac4
date: 2021-01-07 11:27:07
---
## 一 概述

* ToastDialog组件类似于Android中的Toast
* ToastDialog是在窗口上方弹出的对话框，是通知操作的简单反馈
* ToastDialog会在一段时间后消失，在此期间，用户还可以操作当前窗口的其他组件

<!--more-->

## 二 ToastDialog操作

### 2.1 ToastDialog的创建说明

#### 四种ToastDialog介绍

* Basic Toast(基本的ToastDialog)
* SetPosition(指定Toast显示位置的ToastDialog)
* Custom Toast(自定义布局文件的ToastDialog)
* Add An Image(自定义布局文件并添加图片显示的ToastDialog)

#### 四种Toast效果图

![][1]

### 2.2 ToastDialog的创建

项目布局文件

```
<?xml version="1.0" encoding="utf-8"?>

<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_content"
    ohos:width="match_parent"
    ohos:padding="20vp"
    ohos:orientation="vertical">

    <DirectionalLayout
        xmlns:ohos="http://schemas.huawei.com/res/ohos"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:alignment="center"
        ohos:orientation="horizontal">

        <Button
            ohos:id="$+id:button_base"
            ohos:height="match_content"
            ohos:width="match_content"
            ohos:background_element="$graphic:background_button"
            ohos:bottom_margin="15vp"
            ohos:left_margin="15vp"
            ohos:left_padding="8vp"
            ohos:right_padding="8vp"
            ohos:text="Base Toast"
            ohos:text_color="#ffffff"
            ohos:text_size="27fp"/>

        <Button
            ohos:id="$+id:button_position"
            ohos:height="match_content"
            ohos:width="match_content"
            ohos:background_element="$graphic:background_button"
            ohos:bottom_margin="15vp"
            ohos:left_margin="15vp"
            ohos:left_padding="8vp"
            ohos:right_padding="8vp"
            ohos:text="Set Position"
            ohos:text_color="#ffffff"
            ohos:text_size="27fp"/>

    </DirectionalLayout>

    <DirectionalLayout
        xmlns:ohos="http://schemas.huawei.com/res/ohos"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:alignment="center"
        ohos:orientation="horizontal">

        <Button
            ohos:id="$+id:button_custom"
            ohos:height="match_content"
            ohos:width="match_content"
            ohos:background_element="$graphic:background_button"
            ohos:bottom_margin="15vp"
            ohos:left_margin="15vp"
            ohos:left_padding="8vp"
            ohos:right_padding="8vp"
            ohos:text="Custom Toast"
            ohos:text_color="#ffffff"
            ohos:text_size="27fp"/>

        <Button
            ohos:id="$+id:button_add_image"
            ohos:height="match_content"
            ohos:width="match_content"
            ohos:background_element="$graphic:background_button"
            ohos:bottom_margin="15vp"
            ohos:left_margin="15vp"
            ohos:left_padding="8vp"
            ohos:right_padding="8vp"
            ohos:text="Add An Image"
            ohos:text_color="#ffffff"
            ohos:text_size="27fp"/>
    </DirectionalLayout>

</DirectionalLayout>
```

background_button.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
       ohos:shape="rectangle">
    <corners
        ohos:radius="10"/>
    <solid
        ohos:color="#007CFD"/>
</shape>
```

#### 2.2.1 Basic Toast

代码文件

```
new ToastDialog(getContext())
        .setText("This is a ToastDialog")
        .show();
```

ToastDialog效果图
![][2]

#### 2.2.2 SetPosition(设置位置)

代码文件

```
new ToastDialog(getContext())
    .setText("This is a ToastDialog displayed in the middle")
    .setAlignment(LayoutAlignment.CENTER)
    .show();
```

位置设置说明

|       属性        |        位置        |
| :---------------: | :----------------: |
|        TOP        | 导航栏(电池、信号) |
|       START       |    屏幕中央位置    |
|      CENTER       |    屏幕中央位置    |
|      BOTTOM       | 底部导航栏(返回键) |
|        END        |    屏幕中央位置    |
| HORIZONTAL_CENTER |      屏幕中央      |
|  VERTICAL_CENTER  |    屏幕中央偏右    |
|       LEFT        |    屏幕中央偏左    |
|       RIGHT       |    屏幕中央偏右    |
|       UNSET       | 底部导航栏(返回键) |

设置显示位置的效果

![][3]

#### 2.2.3 自定义ToastDialog

layout_toast.xml布局

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_content"
    ohos:width="match_content"
    ohos:orientation="vertical">
    <Text
        ohos:id="$+id:msg_toast"
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:left_padding="16vp"
        ohos:right_padding="16vp"
        ohos:top_padding="4vp"
        ohos:bottom_padding="4vp"
        ohos:layout_alignment="center"
        ohos:text_size="16fp"
        ohos:text="This is a ToastDialog for the customized component"
        ohos:background_element="$graphic:background_toast_element"/>
</DirectionalLayout>    
```

background_toast_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
       ohos:shape="rectangle">
    <corners
        ohos:radius="30vp"/>
    <solid
        ohos:color="#66808080"/>
</shape>
```

自定义Component效果
![][4]

#### 2.2.4 Add An Image

layout_toast_and_image.xml

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_content"
    ohos:width="match_content"
    ohos:orientation="horizontal">
 
    <Image
        ohos:width="30vp"
        ohos:height="30vp"
        ohos:scale_mode="inside"
        ohos:image_src="$media:icon"/>
 
    <Text
        ohos:id="$+id:msg_toast"
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:background_element="$graphic:background_toast_element"
        ohos:bottom_padding="4vp"
        ohos:layout_alignment="vertical_center"
        ohos:left_padding="16vp"
        ohos:right_padding="16vp"
        ohos:text="This is a ToastDialog with An Image"
        ohos:text_size="16fp"
        ohos:top_padding="4vp"/>
</DirectionalLayout>
```

background_toast_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
       ohos:shape="rectangle">
    <corners
        ohos:radius="30vp"/>
    <solid
        ohos:color="#66808080"/>
</shape>
```

Java示例代码

```
DirectionalLayout layout = (DirectionalLayout) LayoutScatter.getInstance(this)
                    .parse(ResourceTable.Layout_layout_toast_and_image, null, false);
new ToastDialog(getContext())
    .setComponent(layout)
    .setSize(DirectionalLayout.LayoutConfig.MATCH_CONTENT, DirectionalLayout.LayoutConfig.MATCH_CONTENT)
    .setAlignment(LayoutAlignment.CENTER)
    .show();
```

add image效果图

![][5]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-toastdialog-all-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-toastdialog-basic.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-toastdialog-position-center.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-toastdialog-custom.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-toastdialog-add-image.gif