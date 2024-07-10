---
title: 鸿蒙OS应用开发之——页面布局TableLayout
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: eeb7334
date: 2020-12-29 17:32:38
---
## 一 概述

* TableLayout类似于Android中的TableLayout
* 以列表的方式展示内容时，使用TableLayout

<!--more-->

## 二 示例

### 2.1 布局

```
<?xml version="1.0" encoding="utf-8"?>
<TableLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:background_element="#87CEEB"
    ohos:row_count="2"
    ohos:column_count="2"
    ohos:layout_alignment="center"
    ohos:alignment_type="align_contents"
    ohos:padding="8vp">
    <Text
        ohos:height="60vp"
        ohos:width="60vp"
        ohos:background_element="$graphic:table_text_bg_element.xml"
        ohos:margin="8vp"
        ohos:text="1"
        ohos:text_alignment="center"
        ohos:text_size="20fp"/>

    <Text
        ohos:height="60vp"
        ohos:width="60vp"
        ohos:background_element="$graphic:table_text_bg_element.xml"
        ohos:margin="8vp"
        ohos:text="2"
        ohos:text_alignment="center"
        ohos:text_size="20fp"/>

    <Text
        ohos:height="60vp"
        ohos:width="60vp"
        ohos:background_element="$graphic:table_text_bg_element.xml"
        ohos:margin="8vp"
        ohos:text="3"
        ohos:text_alignment="center"
        ohos:text_size="20fp"/>

    <Text
        ohos:height="60vp"
        ohos:width="60vp"
        ohos:background_element="$graphic:table_text_bg_element.xml"
        ohos:margin="8vp"
        ohos:text="4"
        ohos:text_alignment="center"
        ohos:text_size="20fp"/>
</TableLayout>
```

table_text_bg_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
       ohos:shape="rectangle">
    <corners
        ohos:radius="5vp"/>
    <stroke
        ohos:width="1vp"
        ohos:color="gray"/>
    <solid
        ohos:color="#00BFFF"/>
</shape>
```

### 2.2 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-tablelayout-sample.png