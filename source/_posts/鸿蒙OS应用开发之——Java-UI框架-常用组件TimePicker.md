---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件TimePicker
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 89d26d3d
date: 2021-01-05 17:26:42
---
## 一 概述

* TimePicker的基本使用
* TimePicker样式配置
* 范围选择设置

<!--more-->

## 二 TimePicker的基本使用

### 2.1 创建TimePicker

#### XML中配置

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <TimePicker
        ohos:id="$+id:time_picker"
        ohos:height="match_content"
        ohos:width="match_parent"/>

</DirectionalLayout>
```

#### 默认的TimePicker的效果

![][1]

### 2.2 设置12小时制（非24小时制）

#### XML中配置

```
<TimePicker
    ...
    ohos:24_hour_mode="false"
/>
```
#### 12小时制效果

![][2]

### 2.3 获取时间

```
TimePicker timePicker = (TimePicker) findComponentById(ResourceTable.Id_time_picker);
int hour = timePicker.getHour();
int minute = timePicker.getMinute();
int second = timePicker.getSecond();
```

### 2.4 设置时间

```
timePicker.setHour(19);
timePicker.setMinute(18);
timePicker.setSecond(12);
```

### 2.5 响应时间改变事件

```
timePicker.setTimeChangedListener(new TimePicker.TimeChangedListener() {
    @Override
    public void onTimeChanged(TimePicker timePicker, int hour, int minute, int second) {
        ...
    }
});
```

## 三 显示样式配置

### 3.1 设置字体属性

#### 3.1.1 设置未选中字体的颜色和大小

XML中配置

```
<TimePicker
    ...
    ohos:normal_text_color="#007DFF"
    ohos:normal_text_size="20fp"/>
```

效果图

![][3]

#### 3.1.2 设置选中字体的颜色和大小

XML中配置

```
<TimePicker
    ...
    ohos:selected_text_color="#007DFF"
    ohos:selected_text_size="20fp"/>
```

设置选中字体的颜色和大小效果
![][4]

#### 3.1.3 设置操作项文本颜色

XML中配置

```
<TimePicker
    ...
    ohos:operated_text_color="#FF9912"/>
```

操作项文本颜色设置效果
![][5]

### 3.2 设置TimePicker中所选文本边距与普通文本边距的比例

#### XML中配置

```
<TimePicker
    ...
    ohos:selected_normal_text_margin_ratio="10"/>
```

#### 效果图
![][6]

### 3.3 设置着色器颜色

#### XML中配置

```
<TimePicker
    ...
    ohos:shader_color="#00BFFF"/>
```

#### 效果图
![][7]
### 3.4 设置选中时间的上下边框
#### XML中配置

```
<TimePicker
    ...
    ohos:bottom_line_element="#00BFFF"/>
```

#### 效果图
![][8]

### 3.5 设置12小时制下显示样式

#### XML中配置

```
<TimePicker
    ...
    ohos:am_pm_order="1"/>
```

#### 效果图
![][9]

## 四 范围选择设置

### 4.1 设置隐藏或显示时分秒

#### 4.1.1 隐藏小时的显示

代码中设置

```
timePicker.showHour(false);
```

小时不显示效果
![][10]

#### 4.1.2 隐藏分钟

代码中设置

```
timePicker.showMinute(false);
```

隐藏分钟效果
![][11]

#### 4.1.3 隐藏秒

代码中设置

```
timePicker.showSecond(false);
```

隐藏秒效果
![][12]

### 4.2 设置TimePicker的selector是否可以滑动

#### 4.2.1 设置小时selector无法滚动选择

代码中设置

```
timePicker.enableHour(false);
```

小时selector无法滚动选择效果
![][13]
#### 4.2.2 设置分钟selector无法滚动

代码中设置

```
timePicker.enableMinute(false);
```

分钟selector固定无法选择效果
![][14]

#### 4.2.3 设置秒selector无法滚动

代码中设置

```
timePicker.enableSecond(false);
```

秒selector无法滚动选择效果
![][15]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-default.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-12-hour-mode.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-normal-color-size.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-selected-color-size.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-operated-color.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-margin-radio.gif
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-shader-color.gif
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-line-element.gif
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-am-pm-order.gif
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-shou-hour.gif
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-show-minute.gif
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-show-second.gif
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-enable-hour.gif
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-enable-minute.gif
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-timepicker-enable-second.gif