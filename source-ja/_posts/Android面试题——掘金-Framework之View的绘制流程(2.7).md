---
title: Android面试题——掘金-Framework之View的绘制流程(2.7)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 6403a6ab
date: 2025-04-05 11:31:13
---
## 一 概述

```
Android View 的绘制流程 是 Android Framework 中的核心知识，
涉及 Measure（测量）、Layout（布局）、Draw（绘制） 过程。
以下是相关的高频面试题及解析：
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 View 的绘制流程是什么？

```
Android View 的绘制流程包括 三大核心阶段：

-Measure（测量） —— 确定 View 大小 (onMeasure())
-Layout（布局） —— 确定 View 位置 (onLayout())
-Draw（绘制） —— 绘制 View (onDraw())
```

### 2.2 View 绘制的入口在哪？

```
View 的绘制从 ViewRootImpl#performTraversals() 开始：

1.performTraversals()：负责 View 的测量、布局和绘制。
2.performMeasure()：调用 measure() 进入 onMeasure() 计算大小。
3.performLayout()：调用 layout() 进入 onLayout() 确定子 View 位置。
4.performDraw()：调用 draw() 进入 onDraw() 绘制内容
```

### 2.3 View 的测量（Measure）过程是怎样的？

```
1.onMeasure() 负责 测量 View 的宽高：
-measure(widthMeasureSpec, heightMeasureSpec)
-onMeasure() 计算出 MeasuredWidth 和 MeasuredHeight。

2.MeasureSpec 解析
MeasureSpec 由 模式（Mode） 和 大小（Size） 组成：

1.EXACTLY（精确模式）：match_parent 或具体值，例如 100dp
2.AT_MOST（最大模式）：wrap_content，最大不超过父布局给的大小
3.UNSPECIFIED（未指定）：父布局不限制，子 View 想多大就多大（ScrollView 内的 View）
```

### 2.4 View 的布局（Layout）过程是怎样的？

```
1.onLayout() 负责 确定 View 的位置：
-layout(l, t, r, b) 决定 View 的左、上、右、下坐标。
-onLayout() 递归对子 View 进行布局。

2.示例
@Override
protected void onLayout(boolean changed, int l, int t, int r, int b) {
    int childCount = getChildCount();
    for (int i = 0; i < childCount; i++) {
        View child = getChildAt(i);
        child.layout(l, t, r, b); // 设置子 View 位置
    }
}
```

### 2.5 View 的绘制（Draw）过程是怎样的？

```
1.onDraw(Canvas canvas) 负责 绘制 View 内容：
-绘制背景 drawBackground(canvas)
-绘制自身内容 onDraw(canvas)
-绘制子View dispatchDraw(canvas)

2.示例：自定义 View 绘制
@Override
protected void onDraw(Canvas canvas) {
    Paint paint = new Paint();
    paint.setColor(Color.RED);
    canvas.drawCircle(100, 100, 50, paint); // 绘制一个红色圆形
}
```

### 2.6 requestLayout() 和 invalidate() 的区别？

|      方法       |      作用       |                       触发流程                        |
| :-------------: | :-------------: | :---------------------------------------------------: |
| requestLayout() | 重新测量 & 布局 | 触发 `measure()` 和 `layout()`，但不一定触发 `draw()` |
|  invalidate()   |    重新绘制     |         只触发 `onDraw()`，不会重新测量和布局         |

示例：

```
view.requestLayout();  // 重新测量 & 布局
view.invalidate();     // 重新绘制（不会重新测量 & 布局）
```

### 2.7 View 重绘的触发时机有哪些？

```
1.invalidate()（UI 线程调用）：直接调用 onDraw() 重新绘制 View。
2.postInvalidate()（非 UI 线程调用）：让 UI 线程执行 invalidate()。
3.requestLayout()：重新执行 measure() 和 layout()。
4.View 动画：ObjectAnimator 触发重绘。
```

### 2.8 自定义 View 需要重写哪些方法？

```
1.方法
-onMeasure() —— 计算 View 大小
-onLayout() —— 确定子 View 位置（仅 ViewGroup）
-onDraw() —— 绘制 View 内容

2.示例：自定义圆形 View
public class CircleView extends View {
    private Paint paint;

    public CircleView(Context context) {
        super(context);
        paint = new Paint();
        paint.setColor(Color.RED);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int size = 200;
        setMeasuredDimension(size, size); // 设置固定大小
    }

    @Override
    protected void onDraw(Canvas canvas) {
        canvas.drawCircle(100, 100, 50, paint);
    }
}
```

### 2.9 如何优化 View 的绘制性能？

```
1.使用 ViewStub 延迟加载（避免初始化不必要的 View）
2.减少 onDraw() 的绘制复杂度
3.使用 setWillNotDraw(true) 禁止无关 View 绘制
4.使用 invalidate(Rect) 只刷新部分区域
5.使用 Bitmap 缓存绘制结果
6.避免嵌套过深的 ViewGroup
```

### 2.10 为什么 View 需要两次测量？

```
1.概念
-第一次测量：父 View 根据自身 MeasureSpec 计算子 View 需要的尺寸。
-第二次测量：子 View 确定自己的尺寸后，通知父 View 进行最终测量。

2.示例
@Override
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    int width = getMeasuredWidth();
    int height = getMeasuredHeight();
    setMeasuredDimension(width, height); // 设置最终大小
}
```

### 2.11 总结

```
1.View 绘制流程：Measure（测量）-> Layout（布局）-> Draw（绘制）。
2.核心方法：
 -onMeasure() 计算 View 大小
 -onLayout() 确定 View 位置
 -onDraw() 绘制 View 内容
3.requestLayout() 重新测量布局，invalidate() 重新绘制
4.优化建议：减少 onDraw() 开销，使用 ViewStub、setWillNotDraw(true) 。
5.两次测量的原因：确保 View 适配父布局的 MeasureSpec 规则
```

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)