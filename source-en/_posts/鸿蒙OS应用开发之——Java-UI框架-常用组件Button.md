---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件Button
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: c0feac3b
date: 2021-01-04 14:54:29
---
## 一 概述

同Text一样，Button也不能作为项目的布局文件来使用，需要结合布局文件一起使用

```
 public final void setUIContent(int layoutRes)
 public void setUIContent(ComponentContainer componentContainer)
```

<!--more-->

## 二 创建Button

### 3.1 代码创建Button

```
public void onStart(Intent intent) {
   super.onStart(intent);
   DirectionalLayout directionalLayout = new DirectionalLayout(getContext());
   Button button = new Button(getContext());
   button.setText("Button");
   button.setTextSize(50);
   button.setId(100);
   directionalLayout.addComponent(button);
   super.setUIContent(directionalLayout);
 }
```

### 3.2 XML布局创建Button

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent">
    <Button
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:text_size="20vp"
        ohos:text="Button"/>
</DirectionalLayout>
```

### 3.3 给Button设置左侧图像

```
<Button
    ohos:id="$+id:button"
    ohos:width="match_content"
    ohos:height="match_content"
    ohos:text_size="27fp"
    ohos:text="button"
    ohos:background_element="$graphic:background_button"
    ohos:left_margin="15vp"
    ohos:bottom_margin="15vp"
    ohos:right_padding="8vp"
    ohos:left_padding="8vp"
    ohos:element_left="$graphic:ic_btn_reload"
/>
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

ic_btn_reload

```
<?xml version="1.0" encoding="UTF-8"?>
<vector xmlns:ohos="http://schemas.huawei.com/res/ohos" ohos:width="64vp" ohos:height="64vp" ohos:viewportWidth="1024" ohos:viewportHeight="1024"> 
  <path ohos:fillColor="#FF000000" ohos:pathData="M810.67,512 L952.32,512 741.12,723.2 529.92,512 724.05,512C725.33,446.29 700.59,381.01 650.24,330.67 550.4,230.83 388.27,230.83 288.43,330.67 188.59,430.51 188.59,593.07 288.43,692.91 366.93,771.41 484.69,788.05 579.41,742.83L642.13,805.55C512,882.77 341.33,865.71 227.84,753.07 94.72,619.95 95.15,404.05 228.27,270.93 362.67,137.39 577.28,136.96 710.83,270.51 777.39,337.07 810.67,424.53 810.67,512Z"></path>
</vector>
```

## 四 不同类型的按钮

按照按钮的形状，按钮可以分为：普通按钮，椭圆按钮，胶囊按钮，圆形按钮等。

### 4.1 **普通按钮**

#### 布局文件

```
<Button
    ohos:width="150vp"
    ohos:height="50vp"
    ohos:text_size="27fp"
    ohos:text="button"
    ohos:background_element="$graphic:color_blue_element"
    ohos:left_margin="15vp"
    ohos:bottom_margin="15vp"
    ohos:right_padding="8vp"
    ohos:left_padding="8vp"/>
```

####  背景color_blue_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <solid
        ohos:color="#007CFD"/>
</shape>
```

#### 效果图

![][1]

### 4.2 椭圆按钮
#### 布局文件

```
<Button
    ohos:width="150vp"
    ohos:height="50vp"
    ohos:text_size="27fp"
    ohos:text="button"
    ohos:background_element="$graphic:oval_button_element"
    ohos:left_margin="15vp"
    ohos:bottom_margin="15vp"
    ohos:right_padding="8vp"
    ohos:left_padding="8vp"
    ohos:element_left="$graphic:ic_btn_reload"/>
```

#### 背景oval_button_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="oval">
    <solid
        ohos:color="#007CFD"/>
</shape>
```

#### 效果图
![][2]
### 4.3 胶囊按钮
#### 布局文件

```
<Button
    ohos:id="$+id:button"
    ohos:width="match_content"
    ohos:height="match_content"
    ohos:text_size="27fp"
    ohos:text="button"
    ohos:background_element="$graphic:capsule_button_element"
    ohos:left_margin="15vp"
    ohos:bottom_margin="15vp"
    ohos:right_padding="15vp"
    ohos:left_padding="15vp"/>
```

#### 背景capsule_button_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="rectangle">
    <corners
        ohos:radius="100"/>
    <solid
        ohos:color="#007CFD"/>
</shape>
```

#### 效果图
![][3]

### 4.4 圆形按钮
#### 布局文件

```
<Button
    ohos:id="$+id:button"
    ohos:width="50vp"
    ohos:height="50vp"
    ohos:text_size="27fp"
    ohos:background_element="$graphic:circle_button_element"
    ohos:text="+"
    ohos:left_margin="15vp"
    ohos:bottom_margin="15vp"
    ohos:right_padding="15vp"
    ohos:left_padding="15vp"/>
```

#### 背景circle_button_element.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:shape="oval">
    <solid
        ohos:color="#007CFD"/>
</shape>
```
#### 效果图

![][4]
## 五 按钮点击事件

```
Button button= (Button) findComponentById(ResourceTable.Id_button);
button.setClickedListener(new Component.ClickedListener() {
    @Override
    public void onClick(Component component) {
        new ToastDialog(MainAbilitySlice.this).setText("被点击了") .show();
        }
 });
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-button-normal.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-button-oval.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-button-capsule.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-button-circle.png