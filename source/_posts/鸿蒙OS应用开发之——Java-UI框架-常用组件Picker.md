---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件Picker
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 1faa4a86
date: 2021-01-05 15:05:05
---
## 一 概述

* Picker的基本使用
* Picker样式设置

<!--more-->

## 二  Picker的基本使用

### 2.1 在XML中创建Picker(默认0~9)

```
<Picker
    ohos:id="$+id:test_picker"
    ohos:height="match_content"
    ohos:width="300vp"
    ohos:background_element="#E1FFFF"
    ohos:layout_alignment="horizontal_center"
    ohos:normal_text_size="16fp"
    ohos:selected_text_size="16fp"/>
```

### 2.2 设置Picker的取值范围

```
Picker picker = (Picker) findComponentById(ResourceTable.Id_test_picker);
picker.setMinValue(0); // 设置选择器中的最小值
picker.setMaxValue(6); // 设置选择器中的最大值
```

![][1]

### 2.3 响应选择器变化

```
picker.setValueChangedListener(new Picker.ValueChangedListener() {
            @Override
            public void onValueChanged(Picker picker, int oldV, int newV) {
                //new ToastDialog(getContext()).setText("oldV="+oldV+":newV="+newV).show();
            }
        });
```

### 2.4 格式化Picker的显示

```
picker.setFormatter(new Picker.Formatter() {
    @Override
     public String format(int i) {
         String value;
         switch (i) {
           case 0:
                 value = "Mon";
                  break;
            case 1:
                  value = "Tue";
                  break;
            case 2:
                  value = "Wed";
                  break;
            case 3:
                  value = "Thu";
                  break;
             case 4:
                   value = "Fri";
                   break;
              case 5:
                   value = "Sat";
                   break;
              case 6:
                    value = "Sun";
                    break;
              default:
                    value = "Mon";
                    break;
             }
             return value;
     }
 });
```

![][2]
### 2.4 设置要显示的字符串数组

```
picker.setDisplayedData(new String[]{"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"});
```

## 三 样式设置

### 3.1 文本相关属性

|      **属性**       |           **Java方法**            |               **描述**               |
| :-----------------: | :-------------------------------: | :----------------------------------: |
|         \-          |   setNormalTextFont(Font font)    |    设置此Picker中待选文本的字体。    |
|  normal_text_size   |  setNormalTextSize(int textSize)  |   为Picker上待选文本设置字体大小。   |
|  normal_text_color  |  setNormalTextColor(Color color)  |     为Picker上待选文本设置颜色。     |
|         \-          |  setSelectedTextFont(Font font)   |  设置此Picker中被选中的文本的字体。  |
| selected_text_size  | setSelectedTextSize(int textSize) | 为Picker上被选中的文本设置字体大小。 |
| selected_text_color | setSelectedTextColor(Color color) |   为Picker上被选中的文本设置颜色。   |

#### 在XML文件中设置文本样式

```
<Picker
    ...
    ohos:normal_text_size="16fp"
    ohos:normal_text_color="#FFA500"
    ohos:selected_text_size="16fp"
    ohos:selected_text_color="#00FFFF"/>
```

#### 在Java代码中设置文本样式：

```
picker.setNormalTextFont(Font.DEFAULT_BOLD);
picker.setNormalTextSize(40);
picker.setNormalTextColor(new Color(Color.getIntColor("#FFA500")));
picker.setSelectedTextFont(Font.DEFAULT_BOLD);
picker.setSelectedTextSize(40);
picker.setSelectedTextColor(new Color(Color.getIntColor("#00FFFF")));
```

#### 设置后的样式
![][3]

### 3.2 设置所选文本的上下边框

#### 在XML中设置：

```
<Picker
    ...
    ohos:bottom_line_element="#40E0D0"
    ohos:top_line_element="#40E0D0"/>
```

#### 在Java代码中设置

```
ShapeElement shape = new ShapeElement();
shape.setShape(ShapeElement.RECTANGLE);
shape.setRgbColor(RgbColor.fromArgbInt(0xFF40E0D0));
// 单独设置上边框
// picker.setDisplayedLinesTopElement(shape); 
// 单独设置下边框
// picker.setDisplayedLinesBottomElement(shape);
// 同时设置上下边框
picker.setDisplayedLinesElements(shape,shape);
```

#### 设置后的上下边框样式
![][4]

### 3.3 设置Picker的着色器颜色

#### 在XML文件中设置

```
<Picker
    ...
    ohos:shader_color="#1E90FF"/>
```

#### 在Java代码中设置

```
picker.setShaderColor(new Color(Color.getIntColor("#1E90FF")));
```

#### 设置着色器颜色后的样式
![][5]

### 3.4 设置Picker中所选文本边距与普通文本边距的比例

#### 在XML文件中设置

```
<Picker
    ...
    ohos:selected_normal_text_margin_ratio="5.0">
</Picker>
```

#### 在Java代码中设置：

```
picker.setSelectedNormalTextMarginRatio(5.0f);
```

#### 设置边距后的效果
![][5]

### 3.5 设置选择轮模式
#### 该模式是来决定Picker是否是循环显示数据的

```
boolean isWheel = picker.isWheelModeEnabled(); // 获取当前是否是选择轮模式
picker.setWheelModeEnabled(!isWheel);
```

#### 更改选择轮模式后的显示效果
![][7]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-picker-min-max.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-picker-setformatter.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-picker-selected-color.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-picker-top-bottom-line.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-picker-shader-color.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-picker-margin.gif
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-picker-wheel-mode.gif