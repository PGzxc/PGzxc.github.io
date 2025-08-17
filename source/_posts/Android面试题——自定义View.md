---
title: Android面试题——自定义View
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: 658ac283
date: 2025-08-17 08:43:16
---
## 一 概述

```
Android 自定义 View 常见面试题及答案要点，涵盖从基础到进阶
```

<!--more-->

## 二 基础类问题

### 2.1 自定义 View 有哪几种方式？

```
继承系统控件（如 TextView, ImageView）并扩展功能
继承 View，完全自绘
继承 ViewGroup，自定义布局（组合控件）
```

### 2.2 为什么要自定义 View？

```
系统控件不满足需求
提供更好的交互体验
封装通用组件，便于复用
```

### 2.3 自定义 View 的构造方法有哪些？分别什么时候调用？

```
View(Context context) → 代码创建调用
View(Context context, AttributeSet attrs) → XML布局调用
View(Context context, AttributeSet attrs, int defStyleAttr) → 带主题样式调用
View(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes)(API 21+)
```

## 三 绘制流程类

### 3.1 自定义 View 的绘制流程？

```
measure：计算 View 大小 → onMeasure()
layout：确定 View 在父容器中的位置 → onLayout()
draw：绘制内容 → onDraw()
```

### 3.2 onMeasure 里需要注意什么？

```
1、处理 MeasureSpec 三种模式：
 EXACTLY（精确大小，如 match_parent, 精确值）
 AT_MOST（最大限制，如 wrap_content）
 UNSPECIFIED（无限制，一般用于 ScrollView

2、需要调用 setMeasuredDimension(width, height) 来确定最终大小。
```

### 3.3 onLayout() 的作用是什么？

```
对 ViewGroup 中子 View 进行布局，调用 child.layout(l, t, r, b)
```

### 3.4 onDraw() 里能做什么？

```
使用 Canvas 绘制文字、图形、图片等
注意避免过度创建对象，保证绘制性能
```

### 3.5 View 的刷新机制？

```
invalidate()：触发 重绘（会走 onDraw()，在主线程调用）。
requestLayout()：触发 重新测量+布局。
postInvalidate()：子线程调用时刷新 UI。
```

## 四 事件分发与交互

### 4.1 自定义 View 如何处理点击事件？

```
重写 onTouchEvent()
配合 GestureDetector 检测手势
```

### 4.2 View 的事件分发机制？

```
dispatchTouchEvent() → 分发
onInterceptTouchEvent()（仅 ViewGroup）→ 是否拦截
onTouchEvent() → 消费事件
```

### 4.3 自定义 View 如何处理事件分发？

```
1、三大方法：
 dispatchTouchEvent() → 事件分发
 onInterceptTouchEvent() → 拦截事件（ViewGroup 用）
 onTouchEvent() → 消费事件

2、自定义 View 时常在 onTouchEvent() 中处理拖动、点击等逻辑。
```

### 4.4 onTouch 和 onClick 有什么区别？

```
onTouch() 更底层，所有触摸动作都会触发。
onClick() 依赖 onTouch 内部的 ACTION_DOWN + ACTION_UP 且未被拦截。
```

### 4.5 如何解决滑动冲突？

```
外部拦截法：父控件决定是否拦截

内部拦截法：子控件通过 requestDisallowInterceptTouchEvent() 决定
```

## 五 属性与性能优化

### 5.1 如何在自定义 View 中支持 XML 属性？

```
在 res/values/attrs.xml 定义属性
在构造方法中通过 TypedArray 获取
```

### 5.2 View 的硬件加速对绘制有影响吗？

```
部分 Canvas API 不支持硬件加速（如 clipPath()、setShadowLayer()）
需要通过 setLayerType(LAYER_TYPE_SOFTWARE, null) 关闭
```

### 5.3 如何优化自定义 View 的性能？

```
避免 onDraw() 创建对象
使用缓存（Bitmap、Layer）
合理使用 invalidate() 与 postInvalidate()
```

### 5.4 自定义 View 如何优化绘制性能？

```
避免在 onDraw() 中创建对象，尽量复用 Paint、Path 等。
使用 canvas.clipRect()、canvas.save()、canvas.restore() 控制绘制区域。
开启硬件加速时注意兼容性（某些 Xfermode、Canvas 操作不支持）。
```

### 5.5 如何处理 View 的滑动？

```
常见方式：
 使用 scrollTo() / scrollBy() → 改变内容绘制位置。
 使用 Scroller → 平滑滚动。
 使用 VelocityTracker、GestureDetector 辅助手势处理。
```

## 六 进阶问题

### 6.1 invalidate()和 postInvalidate()的区别？

```
invalidate() 必须在 UI 线程调用
postInvalidate() 可在子线程调用，内部通过 Handler 切换到 UI 线程
```

### 6.2 requestLayout() 和 invalidate()有什么区别？

```
requestLayout() → 触发测量与布局流程
invalidate() → 仅触发绘制流程
```

### 6.3 如何实现可复用的组合控件？

```
继承 ViewGroup（如 LinearLayout）
在构造方法中 inflate 布局文件
对外暴露接口
```

### 6.4 View 和 SurfaceView 的区别？

```
View：在 UI 线程绘制，适合静态或低频刷新。
SurfaceView：独立的绘制线程，适合高频绘制（视频播放、游戏）。
```

### 6.5 自定义 View 如何支持 wrap_content？

```
1、在 onMeasure() 里对 AT_MOST 做处理，给定一个默认大小。
2、示例
int width = MeasureSpec.getMode(widthMeasureSpec) == MeasureSpec.AT_MOST ? 200 : MeasureSpec.getSize(widthMeasureSpec);
int height = MeasureSpec.getMode(heightMeasureSpec) == MeasureSpec.AT_MOST ? 200 : MeasureSpec.getSize(heightMeasureSpec);
setMeasuredDimension(width, height);
3、总结：在 onMeasure() 中根据内容大小设置 setMeasuredDimension()
```

### 6.6 如何实现一个可拖动的自定义 View？

```
在 onTouchEvent() 里处理 ACTION_MOVE，
更新 View 的 layout() 或 setTranslationX/Y()。
```

### 6.7 如何在自定义 View 中使用动画？

```
使用 ValueAnimator 或 ObjectAnimator 改变 View 属性（如半径、颜色）。
调用 invalidate() 实时刷新。
```

## 七 总结

```
1、自定义 View 面试常考的核心点
 绘制流程：measure → layout → draw
 事件分发：点击、滑动冲突
 属性与性能优化：invalidate / requestLayout 区别，硬件加速问题
 进阶拓展：SurfaceView，组合控件，动画支持

2、面试官常考查点：
 基础流程：onMeasure / onLayout / onDraw
 事件分发：dispatchTouchEvent / onInterceptTouchEvent / onTouchEvent
 性能优化：避免内存抖动、合理使用硬件加速
 实际场景：wrap_content、滑动、动画、SurfaceView 使用场景
```

