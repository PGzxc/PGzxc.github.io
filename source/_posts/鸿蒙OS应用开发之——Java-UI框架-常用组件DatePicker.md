---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件DatePicker
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 765064cd
date: 2021-01-05 16:23:42
---
## 一 概述

* DatePicker的使用
* DatePicker样式设置

<!--more-->

## 二 DatePicker的使用

### 2.1 在XML中创建DatePicker

#### 布局文件

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">
<DatePicker
    ohos:id="$+id:date_pick"
    ohos:height="match_content"
    ohos:width="300vp">
</DatePicker>
</DirectionalLayout>
```
#### 效果图
![][1]

### 2.2 获取当前选择日期，日/月/年，DatePicker默认选择当前日期

```
// 获取DatePicker实例
DatePicker datePicker = (DatePicker) findComponentById(ResourceTable.Id_date_pick);
int day = datePicker.getDayOfMonth();
int month = datePicker.getMonth();
int year = datePicker.getYear();
```

### 2.3 响应日期改变事件

#### 布局文件

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <DatePicker
        ohos:id="$+id:date_pick"
        ohos:height="match_content"
        ohos:width="300vp">
    </DatePicker>

    <Text
        ohos:id="$+id:text_date"
        ohos:height="match_content"
        ohos:width="match_parent"
        ohos:hint="date"
        ohos:margin="8vp"
        ohos:padding="4vp"
        ohos:text_size="14fp">
    </Text>

</DirectionalLayout>
```

#### 在Java代码中响应日期改变事件

```
Text selectedDate = (Text) findComponentById(ResourceTable.Id_text_date);
datePicker.setValueChangedListener(
        new DatePicker.ValueChangedListener() {
            @Override
            public void onValueChanged(DatePicker datePicker, int year, int monthOfYear, int dayOfMonth) {
                selectedDate.setText(dayOfMonth+"/"+monthOfYear+"/"+year);
            }
        }
);
```

#### 日期改变响应效果
![][2]

### 2.4 设置当前日期

```
datePicker.updateDate(2021, 8, 8);
```

### 2.5 设置日期的范围

如需对DatePicker的日期选择范围有要求，可以设置属性min_date和max_date。设置的值为日期对应的**Unix时间戳**

#### 2.5.1 设置最小日期

在xml设置

```
<DatePicker
    ...
    ohos:min_date="1627747200">
</DatePicker>
```

在代码中设置

```
datePicker.setMinDate(1627747200);
```

设置最小日期为2021/08/01
![][3]

#### 2.5.2 设置最大日期

在XML中设置

```
<DatePicker
    ...
    ohos:max_date="1630339200">
</DatePicker>
```

在代码中设置

```
datePicker.setMaxDate(1630339200);
```

设置最大日期为2021/08/31

![][4]

### 2.6 固定年/月/日

####  固定年/月/日

|  **属性**   |      **描述**       |
| :---------: | :-----------------: |
| year_fixed  | 年份固定，默认false |
| month_fixed | 月份固定，默认false |
|  day_fixed  | 日期固定，默认false |

#### 在XML中设置

```
<DatePicker
    ...
    ohos:year_fixed="true">
</DatePicker>
```

#### 在代码中设置

```
datePicker.setYearFixed(true);
```

## 三 样式设置

### 3.1 文本相关属性

|         **属性**         |                **Java方法**                |     **描述**     |
| :----------------------: | :----------------------------------------: | :--------------: |
|    normal_text_color     |       setNormalTextColor(int color)        | 待选项的字体颜色 |
|     normal_text_size     |        setNormalTextSize(int size)         | 待选项的字体大小 |
|   operated_text_color    |      setOperatedTextColor(int color)       | 操作项的字体颜色 |
| operated_text_background | setOperatedTextBackground(Element element) | 操作项的文本背景 |
|   selected_text_color    |      setSelectedTextColor(int color)       | 已选项的字体颜色 |
|    selected_text_size    |       setSelectedTextSize(int size)        | 已选项的字体大小 |
| selected_text_background | setSelectedTextBackground(Element element) | 已选项的文本背景 |

#### 3.1.1 设置待选项的字体大小和颜色

在XML中设置

```
<DatePicker
    ...
    ohos:normal_text_color="#00FFFF"
    ohos:normal_text_size="20fp">
</DatePicker>
```

效果图
![][5]
#### 3.1.2 设置已选项的字体大小和颜色

在XML中设置

```
<DatePicker
    ...
    ohos:selected_text_color="#00FFFF"
    ohos:selected_text_size="20fp">
</DatePicker>
```

在代码中设置

```
datePicker.setSelectedTextSize(40);
datePicker.setSelectedTextColor(new Color(Color.getIntColor("#FFA500")));
```

效果图

![][6]

#### 3.1.3 设置操作项的字体颜色

在XML中设置

```
<DatePicker
    ...
    ohos:operated_text_color="#00FFFF">
</DatePicker>
```

在代码中设置

```
datePicker.setOperatedTextColor(new Color(Color.getIntColor("#00FFFF")));
```

效果图

![][7]

### 3.2 设置DatePicker中所选文本边距与普通文本边距的比例

#### 在XML中设置

```
<DatePicker
    ...
    ohos:selected_normal_text_margin_ratio="10">
</DatePicker>
```

#### 在代码中设置

```
datePicker.setSelectedNormalTextMarginRatio(10.0f)
```
#### 效果图
![][8]

### 3.3 设置滚轮绕行

#### 在XML中设置：

```
<DatePicker
    ...
    ohos:wheel_mode_enabled="true">
</DatePicker>
```

#### 在代码中设置

```
datePicker.setWheelModeEnabled(true);
```
#### 效果图
![][9]
### 3.4 设置选中日期的上下边框
#### 在XML中设置

```
<DatePicker
    ...
    ohos:top_line_element="#9370DB"
    ohos:bottom_line_element="#9370DB">
</DatePicker>
```

#### 在代码中设置

```
ShapeElement shape = new ShapeElement();
shape.setShape(ShapeElement.RECTANGLE);
shape.setRgbColor(RgbColor.fromArgbInt(0xFF9370DB));
datePicker.setDisplayedLinesElements(shape,shape);
```
#### 效果图
![][10]

### 3.5 设置着色器颜色

#### 在XML中设置

```
<DatePicker
    ...
    ohos:shader_color="gray">
</DatePicker>
```

#### 在代码中设置

```
datePicker.setShaderColor(new Color(Color.getIntColor("#00CED1")));
```
#### 效果图
![][11]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-datepicker-default.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-datepicker-valuechange.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-datepicker-mindate.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-datepicker-maxdate.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-datepicker-text-color-size.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-datepicker-select-size-color.gif
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-datepicker-operate-color.gif
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-datepicker-operate-color.gif
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-datepicker-wheel-mode.gif
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-datepicker-top-bottom-line.gif
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-datepicker-shader-color.gif