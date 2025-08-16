---
title: Android开发之——自定义View
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 212d0d7
date: 2025-08-16 13:07:23
---
## 一 概述

```
本文介绍Android自定义 View 的相关内容，
包括概念、类型、实现步骤、常用方法及注意事项
```

<!--more-->

## 二 什么是自定义 View

### 2.1 概念

```
在 Android 中，View 是 UI 的最小组成单位。

自定义 View 是开发者根据特定需求，
继承系统 View 或 ViewGroup，实现自定义绘制、交互或者布局功能的控件。
```

### 2.2 自定义 View 的常见场景

```
实现系统控件无法满足的效果（如自定义进度条、环形加载动画）。
优化性能（比多个组合控件更高效）。
封装复用控件（方便项目中复用）
```

## 三 自定义 View 的类型

### 3.1 继承 View

```
适用于单一控件，主要关注绘制和交互。
示例：自定义进度条、圆形按钮
```

### 3.2 继承 ViewGroup

```
适用于自定义布局容器，可以包含其他子 View。
示例：自定义线性布局、流式布局
```

## 四 自定义 View 的基本流程

### 4.1 创建类

```
class MyCustomView @JvmOverloads constructor(
    context: Context, 
    attrs: AttributeSet? = null, 
    defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {
    // 初始化 Paint、Path 等绘制对象
}
```

### 4.2 初始化

```
1、说明
 构造方法：获取 AttributeSet 解析自定义属性
 init 方法：初始化画笔、路径等
 
2、示例
private val paint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
    color = Color.BLUE
    style = Paint.Style.FILL
}
```

### 4.3 重写 `onMeasure`(可选)

```
1、说明
 用于确定控件大小
 系统提供 MeasureSpec 约束模式：
  EXACTLY：固定大小或 match_parent
  AT_MOST：最大可用空间，通常 wrap_content
  UNSPECIFIED：父控件不限制
  
2、示例
override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
    val desiredWidth = 200
    val desiredHeight = 200

    val width = resolveSize(desiredWidth, widthMeasureSpec)
    val height = resolveSize(desiredHeight, heightMeasureSpec)

    setMeasuredDimension(width, height)
}
```

### 4.4 重写 `onDraw`

```
1、说明
 控件的核心绘制逻辑
 使用 Canvas、Paint、Path 进行绘制
 
2、示例 
override fun onDraw(canvas: Canvas) {
    super.onDraw(canvas)
    // 绘制圆形
    val radius = width.coerceAtMost(height) / 2f
    canvas.drawCircle(width/2f, height/2f, radius, paint)
}
```

### 4.5 处理交互事件(可选)

```
1、说明
重写 onTouchEvent，处理点击、滑动、拖拽等

2、示例
override fun onTouchEvent(event: MotionEvent): Boolean {
    when (event.action) {
        MotionEvent.ACTION_DOWN -> {
            // 点击逻辑
            return true
        }
    }
    return super.onTouchEvent(event)
}
```

### 4.6 使用自定义属性(可选)

```
1、说明
 定义 attrs.xml：

2、示例
<declare-styleable name="MyCustomView">
    <attr name="circleColor" format="color"/>
    <attr name="circleRadius" format="dimension"/>
</declare-styleable>

3、在构造方法中解析
context.obtainStyledAttributes(attrs, R.styleable.MyCustomView).apply {
    val color = getColor(R.styleable.MyCustomView_circleColor, Color.BLUE)
    paint.color = color
    recycle()
}
```

## 五 自定义 ViewGroup(布局控件)注意事项

### 5.1 说明

```
重写 onMeasure：测量所有子 View
重写 onLayout：布局子 View 的位置
重写 dispatchDraw（可选）：在绘制子 View 前后进行自定义绘制
```

### 5.2 示例(简单水平布局)

```
override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
    var leftPos = paddingLeft
    for (i in 0 until childCount) {
        val child = getChildAt(i)
        child.layout(leftPos, paddingTop, leftPos + child.measuredWidth, paddingTop + child.measuredHeight)
        leftPos += child.measuredWidth
    }
}
```

## 六 自定义 View 的优化建议

```
1、避免在 onDraw 中创建对象，使用成员变量复用 Paint、Path 等。
2、合理使用硬件加速（默认开启）。
3、使用 invalidate()/postInvalidate() 更新界面。
4、尽量使用 Canvas.clipRect / save/restore 控制绘制范围。
5、处理 wrap_content 时测量逻辑要完整。
6、支持不同屏幕密度（dp、sp 转 px）。
```

## 七 常用方法汇总

|          方法          |          作用          |
| :--------------------: | :--------------------: |
|      onMeasure()       |      测量控件大小      |
|        onDraw()        |      绘制控件内容      |
|       onLayout()       | 布局子 View(ViewGroup) |
|     onTouchEvent()     |      处理触摸事件      |
|      invalidate()      |        请求重绘        |
|    requestLayout()     |   请求重新测量和布局   |
| setMeasuredDimension() |      设置测量尺寸      |

