---
title: Android面试题——掘金-Framework之View的事件处理机制(2.6)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: c1fcefec
date: 2025-04-05 11:27:42
---
## 一 概述

```
Android 的 View 事件处理机制 主要涉及 触摸事件（TouchEvent）、事件分发（Dispatch）、
拦截（Intercept）、消费（Consume） 等。
以下是相关的高频面试题及解析：
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 事件分发机制（事件传递流程）是什么？

```
1.Android 事件处理涉及 三大核心方法：
-dispatchTouchEvent() —— 事件分发
-onInterceptTouchEvent() —— 事件拦截
-onTouchEvent() —— 事件消费

2.事件传递流程
当用户触摸屏幕时，事件会按以下顺序传递：
2.1 Activity → dispatchTouchEvent()
2.2 ViewGroup → dispatchTouchEvent()：可调用 onInterceptTouchEvent() 拦截事件。
2.3 View → dispatchTouchEvent()：调用 onTouchEvent() 处理事件。
2.4 如果 View 没有消费事件，事件会依次向上返回。
```

### 2.2 事件分发的流程是什么？

```
1.Activity 先接收事件，调用 dispatchTouchEvent() 传递给 DecorView。
2.DecorView 继续传递事件给 根 ViewGroup（如 LinearLayout、FrameLayout）。
3.ViewGroup 先调用 onInterceptTouchEvent() 判断是否拦截：
 -拦截（返回 true） → 事件交给 onTouchEvent() 处理。
 -不拦截（返回 false） → 事件继续传递到子 View。
4.子 View 处理 onTouchEvent()，若返回 true，则消费事件，否则事件回溯给 ViewGroup 处理。
```

### 2.3 事件分发规则是什么？

```
1.Activity 默认会把事件交给 DecorView 处理。
2.ViewGroup 可通过 onInterceptTouchEvent() 决定是否拦截。
3.View 的 onTouchEvent() 默认会消费 DOWN 事件，若 DOWN 事件未消费，则不会收到 MOVE 和 UP 事件。
4.一旦 View 或 ViewGroup 消费事件，事件不会继续传递。
5.事件未被消费，会向上层回溯（Activity -> Window -> ViewRoot）
```

### 2.4 onInterceptTouchEvent() 有什么作用？

```
onInterceptTouchEvent() 主要用于 ViewGroup，决定是否拦截子 View 的事件：
-返回 true → 拦截事件，交给自己的 onTouchEvent() 处理。
-返回 false → 事件继续传递给子 View。
```

### 2.5 onTouchEvent() 处理事件的规则是什么？

```
1.onTouchEvent() 主要由 View 处理：
-返回 true → 消费事件，不会向上传递。
-返回 false → 事件未消费，会传递给 ViewGroup 处理。

2.示例：自定义 View 处理触摸事件
@Override
public boolean onTouchEvent(MotionEvent event) {
    if (event.getAction() == MotionEvent.ACTION_DOWN) {
        return true; // 消费 DOWN 事件
    }
    return super.onTouchEvent(event);
}
```

### 2.6 onTouchListener 和 onTouchEvent() 谁先执行？

```
1.谁先执行
-如果 View 设置了 OnTouchListener，则 onTouch() 先执行。
-如果 onTouch() 返回 false，才会执行 onTouchEvent()。
-如果 onTouch() 返回 true，onTouchEvent() 不会执行。

2.示例
view.setOnTouchListener(new View.OnTouchListener() {
    @Override
    public boolean onTouch(View v, MotionEvent event) {
        return false; // 事件会传递给 onTouchEvent()
    }
});
```

### 2.7 如何保证 View 能接收到 MOVE 和 UP 事件？

```
1.概念
-View 必须消费 DOWN 事件（onTouchEvent() 返回 true）。
-如果 DOWN 事件未消费，MOVE 和 UP 事件不会传递给 View。

2.示例
@Override
public boolean onTouchEvent(MotionEvent event) {
    switch (event.getAction()) {
        case MotionEvent.ACTION_DOWN:
            return true; // 必须返回 true，否则不会收到 MOVE、UP
        case MotionEvent.ACTION_MOVE:
            break;
        case MotionEvent.ACTION_UP:
            break;
    }
    return super.onTouchEvent(event);
}
```

### 2.8 ViewGroup 如何拦截特定子 View 的触摸事件？

```
1.概念
可以通过 onInterceptTouchEvent() 判断 事件坐标 是否落在特定子 View 上：

2.示例
@Override
public boolean onInterceptTouchEvent(MotionEvent ev) {
    float x = ev.getX();
    float y = ev.getY();
    
    if (isTouchInsideView(childView, x, y)) {
        return true; // 拦截该子 View 事件
    }
    return false;
}

private boolean isTouchInsideView(View view, float x, float y) {
    Rect rect = new Rect();
    view.getHitRect(rect);
    return rect.contains((int) x, (int) y);
}
```

### 2.9 事件分发中，哪些情况会导致事件丢失？

```
View 没有消费 DOWN 事件，导致 MOVE 和 UP 事件不会传递。
ViewGroup 拦截了 DOWN 事件，但没有处理 onTouchEvent()。
事件传递过程中被 ViewParent.requestDisallowInterceptTouchEvent(true) 改变了拦截规则。
```

### 2.10 requestDisallowInterceptTouchEvent() 有什么作用？

```
1.概念
-阻止 ViewGroup 拦截子 View 事件。
-适用于 RecyclerView、ViewPager 这种滑动冲突场景

2.示例：ViewPager 内嵌 RecyclerView 解决滑动冲突
@Override
public boolean onTouchEvent(MotionEvent event) {
    if (event.getAction() == MotionEvent.ACTION_MOVE) {
        getParent().requestDisallowInterceptTouchEvent(true);
    }
    return super.onTouchEvent(event);
}
```

### 2.11 总结

```
1.事件分发流程：dispatchTouchEvent() -> onInterceptTouchEvent() -> onTouchEvent()。
2.ViewGroup 通过 onInterceptTouchEvent() 拦截事件，View 通过 onTouchEvent() 处理事件。
3.View 必须消费 DOWN 事件，否则不会收到 MOVE 和 UP。
4.onTouch() 优先于 onTouchEvent() 触发。
5.requestDisallowInterceptTouchEvent(true) 可阻止 ViewGroup 拦截事件
```

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)