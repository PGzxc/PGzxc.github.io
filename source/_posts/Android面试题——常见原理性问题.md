---
title: Android面试题——常见原理性问题
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: ff4a0341
date: 2025-08-27 08:32:57
---
## 一 概述

```
来源：网页提供移动开发——Android岗位
题目：
 1.事件分发中的onTouch和onTouchEvent有什么区别，又该如何使用？
 2.View和ViewGroup分别有哪些事件分发相关的回调方法？
 3.View刷新机制
 4.View绘制流程
 5.自定义控件原理
 6.自定义View如何提供获取View属性的接口？
 7.Android代码中实现WAP方式联网？
 8.AsyncTask机制
 9.AsyncTask原理及不足
 10.如何取消AsyncTask?
 11.为什么不能在子线程更新UI？
 12.ANR产生的原因是什么？
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 事件分发中的onTouch和onTouchEvent有什么区别，又该如何使用？

```
1、onTouch
 定义在 View.setOnTouchListener() 的接口回调方法。
 优先级比 onTouchEvent 高，如果 onTouch 返回 true，事件就会被消费，不会继续传递到 onTouchEvent。

2、onTouchEvent
 是 View 的成员方法，用于处理触摸事件的最终逻辑。
 如果 onTouch 没有消费事件，则事件会交给 onTouchEvent 处理。

3、使用场景：
 onTouch：适合在外部快速拦截或监听触摸事件（比如点击动画、日志埋点）。
 onTouchEvent：适合自定义 View 内部处理事件逻辑（如按钮点击、滑动）。
```

### 2.2 View和ViewGroup分别有哪些事件分发相关的回调方法？

```
1、View
 dispatchTouchEvent(MotionEvent ev)：分发事件。
 onTouchEvent(MotionEvent ev)：处理事件。

2、ViewGroup（继承自 View）
 dispatchTouchEvent(MotionEvent ev)：分发事件。
 onInterceptTouchEvent(MotionEvent ev)：决定是否拦截事件。
 onTouchEvent(MotionEvent ev)：处理事件。

3、区别：
ViewGroup 比 View 多了 onInterceptTouchEvent，用来控制事件是否传递给子 View。
```

### 2.3 View刷新机制

```
1、调用 invalidate()：
 只能在主线程调用，触发重新绘制，会走 onDraw。

2、调用 postInvalidate()：
 可以在子线程调用，最终会切回主线程刷新。

3、原理：
 本质是通过 ViewRootImpl 发起 Choreographer 的 VSYNC 信号，
 最终调用 performTraversals()，触发 measure → layout → draw。
```

### 2.4 View绘制流程

```
1、流程：
 measure：测量大小 → onMeasure()。
 layout：确定位置 → onLayout()。
 draw：绘制内容 → onDraw()。

2、流程入口：
 ViewRootImpl.performTraversals()
```

### 2.5 自定义控件原理

```
继承 View：重写 onMeasure、onDraw，适合绘制型控件（如仪表盘、图表）。
继承 ViewGroup：重写 onMeasure、onLayout，适合组合型控件（如自定义布局）。
核心原理：通过重写测量、布局、绘制方法，自定义控件行为和外观。
```

### 2.6 自定义View如何提供获取View属性的接口？

```
1、在 attrs.xml 定义自定义属性：

<declare-styleable name="MyView">
    <attr name="textColor" format="color"/>
    <attr name="radius" format="dimension"/>
</declare-styleable>


2、在 View 构造方法中获取：

TypedArray ta = context.obtainStyledAttributes(attrs, R.styleable.MyView);
int color = ta.getColor(R.styleable.MyView_textColor, Color.BLACK);
float radius = ta.getDimension(R.styleable.MyView_radius, 0f);
ta.recycle();


3、对外提供 setter/getter。
```

### 2.7 Android代码中实现WAP方式联网？

```
1、需要设置代理：

Properties prop = System.getProperties();
prop.setProperty("http.proxyHost", "10.0.0.172");  // WAP 代理
prop.setProperty("http.proxyPort", "80");


2、使用 HttpURLConnection 或 OkHttp 进行请求时，会走代理
```

### 2.8 AsyncTask机制

```
1、用于在后台线程执行任务，并在主线程更新 UI。

2、执行流程：
 execute() → 线程池执行 doInBackground()。
 通过 Handler 切回主线程 → 调用 onPostExecute() 更新 UI。
```

### 2.9 AsyncTask 原理及不足

```
1、原理：
 内部封装了 线程池 + Handler。
 背景任务跑在线程池，结果通过 Handler 切回 UI 线程。

2、不足：
 生命周期和 Activity 不绑定，容易引发内存泄漏。
 并行执行策略在 Android 3.0 后改为串行（需 executeOnExecutor()）。
 不适合长时间任务。
```

### 2.10 如何取消 AsyncTask？

```
调用 cancel(true)。
在 doInBackground() 中周期性调用 isCancelled()，如果返回 true，则中断任务。
```

### 2.11 为什么不能在子线程更新 UI？

```
Android UI 控件不是线程安全的。
UI 渲染依赖 主线程 Looper，如果在子线程直接操作 View，可能导致状态错乱或崩溃。
解决方案：使用 Handler、runOnUiThread()、LiveData、Coroutine 等切换到主线程更新 UI。
```

### 2.12 ANR 产生的原因是什么？

```
1、ANR (Application Not Responding)：
 主线程长时间阻塞导致应用无响应。

2、触发条件：
 Input 事件（按键/触摸）：5 秒内未响应。
 BroadcastReceiver：10 秒内未完成。
 Service：20 秒内未完成。

3、常见原因：
 主线程做耗时操作（网络、IO、复杂计算）。
 死循环、死锁。
 主线程等待子线程返回结果。
```

