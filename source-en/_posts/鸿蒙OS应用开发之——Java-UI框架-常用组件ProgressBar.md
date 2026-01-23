---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件ProgressBar
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: b1ec564c
date: 2021-01-06 17:35:38
---
## 一 概述

ProgressBar用于显示内容或操作的进度；

* 水平显示的ProgressBar
* 圆形显示的RoundProgressBar

<!--more-->

## 二 水平显示的ProgressBar

### 2.1 创建ProgressBar

#### layout目录XML配置

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <ProgressBar
        ohos:progress_width="10vp"
        ohos:height="60vp"
        ohos:width="600vp"
        ohos:max="100"
        ohos:min="0"
        ohos:progress="60"/>

</DirectionalLayout>
```

#### 效果图

![][1]

### 2.2 设置ProgressBar

#### 2.2.1 设置ProgressBar方向

通过ohos:orientation="vertical"为ProgressBar设置方向，有两个选项：`horizontal`和`vertical`，默认值为`horizontal`

垂直设置代码

```
<ProgressBar
    ohos:orientation="vertical"
    ohos:top_margin="20vp"
    ohos:height="150vp"
    ohos:width="60vp"
    ohos:progress_width="10vp"
    ohos:max="100"
    ohos:min="0"
    ohos:progress="60"/>
```

垂直ProgressBar效果
![][2]

#### 2.2.2 设置当前进度

##### xml中设置

```
<ProgressBar
    ...
    ohos:progress="60"/>
```

##### Java中设置

```
progressBar.setProgressValue(60);
```

#### 2.2.3 设置最大和最小值

##### xml中设置

```
<ProgressBar
    ...
    ohos:max="400"
    ohos:min="0"/>
```

##### Java中设置

```
progressBar.setMaxValue(400);
progressBar.setMinValue(0);
```

#### 2.2.4 设置ProgressBar进度颜色

##### xml中设置

```
<ProgressBar
    ...
    ohos:progress_element="#FF9900" />
```

##### ProgressBar颜色效果
![][3]

#### 2.2.5 设置ProgressBar底色颜色

##### xml中设置

```
<ProgressBar
    ...
    ohos:background_instruct_element="#FFFFFF" />
```
##### 设置底色颜色效果

![][4]

#### 2.2.6 设置ProgressBar分割线

##### xml中配置

```
<ProgressBar
    ...
    ohos:divider_lines_enabled="true"
    ohos:divider_lines_number="5" />
```

##### Java代码中配置

```
progressBar.enableDividerLines(true);
progressBar.setDividerLinesNumber(5);
```

##### 添加分割线效果
![][5]

#### 2.2.7 设置ProgressBar分割线颜色

##### java代码中设置

```
progressBar.setDividerLineColor(Color.MAGENTA);
```

##### 设置分割线颜色效果
![][6]

#### 2.2.8 设置ProgressBar提示文字

##### xml中设置

```
<ProgressBar
    ...
    ohos:progress_hint_text="20%"
    ohos:progress_hint_text_color="#FFCC99" />
```

##### 设置提示文字效果
![][7]

## 三 圆形显示的RoundProgressBar

### 3.1 创建RoundProgressBar

#### xml中配置

```
<RoundProgressBar
    ohos:id="$+id:round_progress_bar"
    ohos:height="200vp"
    ohos:width="200vp"
    ohos:progress_width="10vp"
    ohos:progress="20"
    ohos:progress_color="#47CC47"/>
```
#### RoundProgressBar效果

![][8]

### 3.2 设置开始和结束角度

#### xml中设置

```
<RoundProgressBar
    ...
    ohos:start_angle="45"
    ohos:max_angle="270"
    ohos:progress="20"
    ohos:progress_hint_text="Round"
    ohos:progress_hint_text_color="#007DFF" />
```
#### 设置角度效果
![][9]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-progressbar-default.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-progressbar-vertical.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-progressbar-progress-element.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-progressbar-background-element.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-progressbar-divider.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-progressbar-divider-color.gif
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-progressbar-progress-text.gif
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-roundprogressbar-default.gif
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-roundprogressbar-min-max.gif