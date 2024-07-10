---
title: 鸿蒙OS应用开发之——页面布局DependentLayout
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: acbd28f7
date: 2020-12-29 16:30:10
---
## 一 概述

* DependentLayout相当于Android中的相对布局RelativeLayout
* DependentLayout与DirectionalLayout相比有更多的排列方式
* 每个组件可以指定相对于其他同级元素的位置，或者指定相对于父组件的位置

<!--more-->

## 二 排列方式

### 2.1 相对于同级组件的位置布局

| **位置布局** |       **描述**       |
| :----------: | :------------------: |
|    above     |  处于同级组件的上侧  |
|    below     |  处于同级组件的下侧  |
|   start_of   | 处于同级组件的起始侧 |
|    end_of    | 处于同级组件的结束侧 |
|   left_of    |  处于同级组件的左侧  |
|   right_of   |  处于同级组件的右侧  |

### 2.2 相对于父组件的位置布局

|    **位置布局**     |      **描述**      |
| :-----------------: | :----------------: |
|  align_parent_left  |  处于父组件的左侧  |
| align_parent_right  |  处于父组件的右侧  |
| align_parent_start  | 处于父组件的起始侧 |
|  align_parent_end   | 处于父组件的结束侧 |
|  align_parent_top   |  处于父组件的上侧  |
| align_parent_bottom |  处于父组件的下侧  |
|  center_in_parent   |  处于父组件的中间  |

## 三 示例

### 3.1 同级组件布局示例-左右

效果图

![][1]

布局文件

```
<?xml version="1.0" encoding="utf-8"?>
<DependentLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:width="match_content"
    ohos:height="match_content"
    ohos:background_element="$graphic:color_light_gray_element">
    <Text
        ohos:id="$+id:text1"
        ohos:width="match_content"
        ohos:height="match_content"
        ohos:left_margin="15vp"
        ohos:top_margin="15vp"
        ohos:bottom_margin="15vp"
        ohos:text="text1"
        ohos:text_size="20fp"
        ohos:background_element="$graphic:color_cyan_element"/>
    <Text
        ohos:id="$+id:text2"
        ohos:width="match_content"
        ohos:height="match_content"
        ohos:left_margin="15vp"
        ohos:top_margin="15vp"
        ohos:right_margin="15vp"
        ohos:bottom_margin="15vp"
        ohos:text="end_of text1"
        ohos:text_size="20fp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:end_of="$id:text1"/>
</DependentLayout>
```

color_light_gray_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#EDEDED"/>
</shape>
```

color_cyan_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#00FFFD"/>
</shape>
```
### 3.2 同级组件布局示例-上下

效果图

![][2]

布局文件

```
<?xml version="1.0" encoding="utf-8"?>
<DependentLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:width="match_content"
    ohos:height="match_content"
    ohos:background_element="$graphic:color_light_gray_element">
    <Text
        ohos:id="$+id:text1"
        ohos:width="match_content"
        ohos:height="match_content"
        ohos:left_margin="15vp"
        ohos:top_margin="15vp"
        ohos:right_margin="40vp"
        ohos:text="text1"
        ohos:text_size="20fp"
        ohos:background_element="$graphic:color_cyan_element"/>
    <Text
        ohos:id="$+id:text3"
        ohos:width="match_content"
        ohos:height="match_content"
        ohos:left_margin="15vp"
        ohos:top_margin="15vp"
        ohos:right_margin="40vp"
        ohos:bottom_margin="15vp"
        ohos:text="below text1"
        ohos:text_size="20fp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:below="$id:text1"/>
</DependentLayout>
```

color_light_gray_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#EDEDED"/>
</shape>
```

color_cyan_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#00FFFD"/>
</shape>
```

### 3.3 相对父控件布局

效果图

![][3]

布局文件

```
<?xml version="1.0" encoding="utf-8"?>
<DependentLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:width="300vp"
    ohos:height="100vp"
    ohos:background_element="$graphic:color_background_gray_element">
    <Text
        ohos:id="$+id:text6"
        ohos:width="match_content"
        ohos:height="match_content"
        ohos:text="align_parent_right"
        ohos:text_size="12fp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:align_parent_right="true"
        ohos:center_in_parent="true"/>
    <Text
        ohos:id="$+id:text7"
        ohos:width="match_content"
        ohos:height="match_content"
        ohos:text="align_parent_bottom"
        ohos:text_size="12fp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:align_parent_bottom="true"
        ohos:center_in_parent="true"/>
    <Text
        ohos:id="$+id:text8"
        ohos:width="match_content"
        ohos:height="match_content"
        ohos:text="center_in_parent"
        ohos:text_size="12fp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:center_in_parent="true"/>
    <Text
        ohos:id="$+id:text9"
        ohos:width="match_content"
        ohos:height="match_content"
        ohos:text="align_parent_left_top"
        ohos:text_size="12fp"
        ohos:background_element="$graphic:color_cyan_element"
        ohos:align_parent_left="true"
        ohos:align_parent_top="true"/>
</DependentLayout>
```

color_background_gray_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#ffbbbbbb"/>
</shape>
```

color_cyan_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#00FFFD"/>
</shape>
```

### 3.4 复杂界面布局

效果图

![][4]

布局文件

```
<?xml version="1.0" encoding="utf-8"?>
<DependentLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:width="match_parent"
    ohos:height="match_content"
    ohos:background_element="$graphic:color_background_gray_element">
    <Text
        ohos:id="$+id:text1"
        ohos:width="match_parent"
        ohos:height="match_content"
        ohos:text_size="25fp"
        ohos:top_margin="15vp"
        ohos:left_margin="15vp"
        ohos:right_margin="15vp"
        ohos:background_element="$graphic:color_gray_element"
        ohos:text="Title"
        ohos:text_weight="1000"
        ohos:text_alignment="horizontal_center"
    />
    <Text
        ohos:id="$+id:text2"
        ohos:width="match_content"
        ohos:height="120vp"
        ohos:text_size="10vp"
        ohos:background_element="$graphic:color_gray_element"
        ohos:text="Catalog"
        ohos:top_margin="15vp"
        ohos:left_margin="15vp"
        ohos:right_margin="15vp"
        ohos:bottom_margin="15vp"
        ohos:align_parent_left="true"
        ohos:text_alignment="center"
        ohos:multiple_lines="true"
        ohos:below="$id:text1"
        ohos:text_font="serif"/>
    <Text
        ohos:id="$+id:text3"
        ohos:width="match_parent"
        ohos:height="120vp"
        ohos:text_size="25fp"
        ohos:background_element="$graphic:color_gray_element"
        ohos:text="Content"
        ohos:top_margin="15vp"
        ohos:right_margin="15vp"
        ohos:bottom_margin="15vp"
        ohos:text_alignment="center"
        ohos:below="$id:text1"
        ohos:end_of="$id:text2"
        ohos:text_font="serif"/>
    <Button
        ohos:id="$+id:button1"
        ohos:width="70vp"
        ohos:height="match_content"
        ohos:text_size="15fp"
        ohos:background_element="$graphic:color_gray_element"
        ohos:text="Previous"
        ohos:right_margin="15vp"
        ohos:bottom_margin="15vp"
        ohos:below="$id:text3"
        ohos:left_of="$id:button2"
        ohos:italic="false"
        ohos:text_weight="5"
        ohos:text_font="serif"/>
    <Button
        ohos:id="$+id:button2"
        ohos:width="70vp"
        ohos:height="match_content"
        ohos:text_size="15fp"
        ohos:background_element="$graphic:color_gray_element"
        ohos:text="Next"
        ohos:right_margin="15vp"
        ohos:bottom_margin="15vp"
        ohos:align_parent_end="true"
        ohos:below="$id:text3"
        ohos:italic="false"
        ohos:text_weight="5"
        ohos:text_font="serif"/>
</DependentLayout>
```

color_background_gray_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#ffbbbbbb"/>
</shape>
```

color_gray_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#878787"/>
</shape>
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-dependentlayout-same-level-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-dependentlayout-same-level-below.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-depentlayout-parent-layout.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-depentlayout-complex-layout.png