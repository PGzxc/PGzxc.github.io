---
title: Android面试题——常见面试题1
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: b76dc24f
date: 2025-04-08 12:12:09
---
## 一 概述

1. 子线程是否能更新UI
2. Activity.startActivity()和ApplicationContext.startActivity()有没有什么问题？
3. Handler机制整体流程
4. Looper.loop()为什么不会阻塞主线程?(IdHandler闲时机制)
5. 同步屏障<!--more-->
6. postDelay()的具体实现
7. post()与sendMessage()的区别
8. 使用Handler需要注意什么问题，怎么解决的？
9. 事件分发
10. View绘制流程
11. 测量模式
12. View, Activity, Window的区别联系
13. 怎么计算一个View在屏幕可见部分的百分比？
14. activity里面有多个fragment，按下home之后一会儿切回来,fragment没有无参构造崩了，该怎么处理
15. 接口请求是否需要设置证书，如需该如何设置

## 二 面试题解答(仅供参考)

### 2.1 子线程是否能更新UI

```
一、不能，Android中子线程不能直接更新UI。

在Android中，只有主线程（UI线程）才有权限操作界面元素（如TextView、Button等）。
如果子线程尝试直接更新UI，会抛出异常，如：
android.view.ViewRootImpl$CalledFromWrongThreadException

二、为什么？
Android的UI组件不是线程安全的，
如果多个线程同时访问，会导致不可预期的结果，因此系统限制只有主线程能操作UI。

三、如何从子线程更新UI？
可以使用以下方式将更新操作“切换”回主线程：

3.1 Handler + Looper（传统方式）：

Handler handler = new Handler(Looper.getMainLooper());
handler.post(() -> {
    textView.setText("更新UI");
});

3.2 runOnUiThread()（在Activity中）：
runOnUiThread(() -> {
    textView.setText("更新UI");
});

3.3 View.post()（控件自身）：
textView.post(() -> {
    textView.setText("更新UI");
});

3.4 使用现代方案（如LiveData、ViewModel、Coroutine等）：
这些架构组件也会自动在主线程更新UI，适合复杂项目结构。

总结一句话：
子线程不能直接更新UI，必须通过主线程间接更新
```

### 2.2 Activity.startActivity()和ApplicationContext.startActivity()有没有什么问题？

一、区别

```
1.1 Activity.startActivity() —— 推荐用法
这是最常用、最安全的启动新页面方式。
它依赖于当前 Activity 的上下文，启动新 Activity 时能正确继承当前任务栈、动画、窗口环境等。

1.2 ApplicationContext.startActivity() —— 存在问题
虽然ApplicationContext
（例如 getApplicationContext()）也能调用 startActivity()，但有以下限制：

1.2.1 必须加 FLAG_ACTIVITY_NEW_TASK 标志：

否则会抛出异常：
android.util.AndroidRuntimeException: 
Calling startActivity() from outside of an Activity context requires the FLAG_ACTIVITY_NEW_TASK flag.

示例修复：

Intent intent = new Intent(context, TargetActivity.class);
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
context.startActivity(intent);

1.2.2 不推荐用于跳转界面：

-Application 的 Context 生命周期长，不依附界面；
-会创建新任务栈，无法共享当前界面状态；
-可能造成任务栈混乱，跳转体验不一致。
```

二、总结

|                用法                | 是否安全 | 是否推荐 |                  备注                   |
| :--------------------------------: | :------: | :------: | :-------------------------------------: |
|      Activity.startActivity()      |  ✅ 安全  |  ✅ 推荐  |              标准跳转方式               |
| ApplicationContext.startActivity() | ⚠️ 有限制 | ❌ 不推荐 | 需加 `FLAG_ACTIVITY_NEW_TASK`，容易出错 |

三、面试建议回答

```
ApplicationContext 启动 Activity 必须设置 FLAG_ACTIVITY_NEW_TASK，
通常不推荐这么做，建议用 Activity 的 Context。
```

### 2.3 Handler机制整体流程

一、介绍

```
Android 的 Handler机制 是一种消息传递机制，
主要用于主线程与子线程之间的通信，也用于线程内的异步任务调度。
```

二、整体组成

Handler 机制主要由四个核心类组成：

|     组件     |             作用说明             |
| :----------: | :------------------------------: |
|    Looper    | 管理消息循环（消息队列的执行者） |
| MessageQueue |    存储消息的队列（先进先出）    |
|   Handler    |       发送消息 & 处理消息        |
|   Message    |         要传递的消息对象         |

三、工作流程图（简要描述）

```
1、主线程启动时调用 Looper.prepare() 和 Looper.loop()：
-系统在主线程中创建 Looper 和 MessageQueue。
-开启消息循环。

2、子线程或主线程中使用 Handler.sendMessage() 发送消息：
-消息被加入到目标线程的 MessageQueue 中。

3、Looper 不断轮询 MessageQueue，取出消息：
-调用 Handler.dispatchMessage()。

4、Handler.handleMessage() 被执行，处理业务逻辑：
-开发者通常重写这个方法进行 UI 更新或任务处理
```

四、面试答题总结一句话

```
Handler 机制通过 Looper 和 MessageQueue 管理消息循环，
Handler 用于发送与处理消息，实现线程间或线程内的异步通信。
主线程中系统默认已初始化 Looper，因此直接可用 Handler。
```

### 2.4 Looper.loop()为什么不会阻塞主线程?(IdHandler闲时机制)

一、简答

```
Looper.loop() 本质是一个无限循环，
但不会“卡死”主线程，因为它是在轮询 MessageQueue 消息队列时，
只有在有消息时才处理，没有消息时就“空转等待”，不会消耗 CPU，
因此主线程仍然可以正常响应 UI 事件、绘制、动画等。
```

二、原理解析（涉及 `IdleHandler` 闲时机制）

```
1、Looper.loop() 是主线程的事件循环：
for (;;) {
    Message msg = queue.next(); // 可能阻塞等待消息
    ...
    msg.target.dispatchMessage(msg);
}
2. queue.next() 没有消息时会阻塞线程，但这不是“死阻塞”：
-MessageQueue 内部通过 Linux 层的 epoll 或 nativePollOnce() 机制，
在没有消息时会挂起线程（不占CPU），等有消息再唤醒。

3. 为什么“阻塞”了主线程，UI还能响应？
-实际上，主线程的UI绘制、事件响应(如点击)等都是通过Handler发送消息进入这个MessageQueue中的；

-所以Looper.loop()处理的正是这些“UI事件消息”，
它是主线程正常运作的关键，不是“阻塞”而是“调度中心”。
```

三、闲时机制（`IdleHandler`）是什么？

```
当消息队列中暂时没有任务时，系统会回调已注册的 IdleHandler，执行一些“空闲时才做”的工作。
Looper.myQueue().addIdleHandler(new MessageQueue.IdleHandler() {
    public boolean queueIdle() {
        Log.d("Test", "空闲了，可以执行一些后台任务");
        return false; // 返回true表示继续保留，false表示用完就移除
    }
});
常用于：预加载、缓存初始化、页面空闲时做任务。
```

### 2.5 同步屏障

一、 一句话概括

```
同步屏障是一种在 MessageQueue 中优先处理异步消息、延迟同步消息的机制，
常用于动画、渲染等对时效性要求高的异步任务。
```

二、背景知识

```
Android 的消息队列（MessageQueue）中，
所有消息（包括 UI 操作、后台逻辑、动画渲染等）默认是同步消息，按时间顺序依次执行。

但如果有大量同步消息阻塞队列，就会导致动画卡顿、界面掉帧。
```

三、同步屏障机制的作用

```
-插入一个“屏障”标记到 MessageQueue 中
-暂时跳过所有同步消息，只执行后面的异步消息
-让像 Choreographer（动画/刷新）发送的异步消息优先执行
```

四、使用场景（系统内部）

```
1.Choreographer（控制 16ms 一帧刷新）使用同步屏障机制：
-插入屏障 → 发送异步刷新消息（如 doFrame） → 移除屏障
-保证动画、渲染的及时性，避免卡顿
```

五、简化示意图（屏障行为）

|  消息队列  |    正常处理    |    插入同步屏障后    |
| :--------: | :------------: | :------------------: |
| 同步消息 A |     ✅ 执行     |        ❌ 跳过        |
| 同步消息 B |     ✅ 执行     |        ❌ 跳过        |
| 异步消息 C | ✅ 等待前面执行 | ✅ 直接执行（被提升） |
| 同步消息 D |     ✅ 执行     |        ❌ 跳过        |

六、注意事项

```
-同步屏障只能由 系统 API 使用（如 Looper / Choreographer），开发者无法直接调用；
-从 Android 6.0 开始，部分私有 API（如 postSyncBarrier()）对应用层已隐藏。
```

七、总结一句话

```
同步屏障用于优先处理异步消息，保障动画和 UI 流畅性，是 Android 消息机制中的性能优化手段之一。
```

### 2.6 postDelay()的具体实现

一、一句话概括

```
postDelayed() 本质是往 MessageQueue 中插入一个“定时执行”的消息，
系统会在指定时间后取出并执行对应的任务。
```

二、 源码层调用链（以主线程 Handler 为例）

```
handler.postDelayed(runnable, delayMillis)
    ↓
handler.sendMessageDelayed(Message, delayMillis)
    ↓
handler.sendMessageAtTime(Message, SystemClock.uptimeMillis() + delayMillis)
    ↓
MessageQueue.enqueueMessage(msg, when) // 把消息加入消息队列，设置触发时间
```

三、核心机制解释

```
1.Runnable 被包装成一个 Message 对象；
2.设置消息的执行时间：when = 当前时间 + delayMillis；
3.插入 MessageQueue 的时候，按时间排序；
4.Looper.loop() 会不断检查消息队列；
5.只有当当前时间 >= 消息的 when，才会处理这条消息；
6.到时间后，调用 Handler.dispatchMessage() → 执行 Runnable.run()。
```

四、定时是如何实现的？

```
底层依赖 SystemClock.uptimeMillis() 来计算时间点，
MessageQueue 使用内部的 优先队列 或 链表 保证“先到时间的消息先执行”。

如果下一条消息的when时间未到，Looper会进入等待态（使用epoll或nativePollOnce()低功耗阻塞）
```

五、总结一句话

```
postDelayed() 是通过Handler把一个带有延迟时间的Runnable包装成 Message放入MessageQueue，
由 Looper 在合适时间调度执行。
```

### 2.7 post()与sendMessage()的区别

一、 一句话概括

```
post() 是发送 Runnable，sendMessage() 是发送 Message，
本质都通过 MessageQueue 机制，但使用场景和灵活性不同
```

二、主要区别对比

|       对比点       |                   post()                    |          sendMessage()           |
| :----------------: | :-----------------------------------------: | :------------------------------: |
|      发送内容      |           Runnable（可执行任务）            |       Message（消息对象）        |
|      参数类型      |               post(Runnable)                |       sendMessage(Message)       |
|      处理方式      |             调用 Runnable.run()             |       重写 handleMessage()       |
| 是否携带自定义数据 |                  ❌ 不方便                   |  ✅ 可设置 `what/arg1/arg2/obj`   |
|      使用场景      |            简单任务（如更新UI）             |   需要区分消息类型、多任务调度   |
|      实现路径      | Runnable → Message → queue.enqueueMessage() | Message → queue.enqueueMessage() |

三、内部流程分析（都用到了 `MessageQueue`）

```
1-post()
handler.post(runnable)
  → handler.sendMessageDelayed(getPostMessage(r), 0)
  → 把 runnable 封装进 message.callback 中

2-sendMessage()
Message msg = Message.obtain();
msg.what = 1;
handler.sendMessage(msg);
  → 消息加入队列，等待 dispatchMessage()
```

四、实例对比

```
1-post() 示例：
handler.post(() -> {
    textView.setText("更新UI");
});
2-sendMessage() 示例：
Message msg = Message.obtain();
msg.what = 1;
handler.sendMessage(msg);

@Override
public void handleMessage(Message msg) {
    if (msg.what == 1) {
        textView.setText("更新UI");
    }
}
```

五、总结一句话

```
post() 更适合执行简单的 Runnable 任务，
sendMessage() 适合处理有类型、数据标识的复杂消息调度；
两者底层都依赖 MessageQueue 实现异步通信
```

### 2.8 使用 Handler 需要注意什么问题？怎么解决？

```
一、常见问题一：内存泄漏
1.1 问题描述：
Handler 可能持有外部类（如 Activity）的引用，导致Activity 即使退出也无法被回收。

1.2 示例场景：
Handler handler = new Handler();
handler.postDelayed(() -> {
    // 延迟执行代码可能仍引用了Activity中的View等资源
}, 10000);

1.3 解决方案：
-使用静态内部类 + 弱引用（WeakReference）
-或者使用 Lifecycle 感知的组件自动取消任务

static class MyHandler extends Handler {
    WeakReference<MainActivity> activityRef;
    MyHandler(MainActivity activity) {
        activityRef = new WeakReference<>(activity);
    }

    @Override
    public void handleMessage(Message msg) {
        MainActivity activity = activityRef.get();
        if (activity != null) {
            // 安全处理UI
        }
    }
}

二、常见问题二：消息未移除导致逻辑异常
2.1 问题描述：
如果 post() 或 sendMessage() 后没有取消，消息还会在 Activity 销毁后执行。

2.2 解决方案：
在 onDestroy() 中移除消息：
handler.removeCallbacksAndMessages(null); // 移除所有消息

三、常见问题三：子线程创建 Handler 报错
3.1 问题描述：
子线程中直接 new Handler() 报错：
Can't create handler inside thread that has not called Looper.prepare()

3.2 解决方案：
手动初始化 Looper：

new Thread(() -> {
    Looper.prepare(); // 创建消息循环
    Handler handler = new Handler();
    Looper.loop();    // 开启消息循环
}).start();

四、总结一句话
使用 Handler 要注意内存泄漏、消息未清理、线程未初始化 Looper等问题；
可通过弱引用、及时清理消息、合理使用线程和架构组件来规避
```

### 2.9 事件分发

一、一句话概括

```
事件分发机制是 Android 中 View（控件）响应用户触摸事件（如点击、滑动）的流程，
核心由 Activity → ViewGroup → View 层层传递和处理。
```

二、三大核心方法

|                    方法名                    |                作用                |           返回值作用           |
| :------------------------------------------: | :--------------------------------: | :----------------------------: |
|             dispatchTouchEvent()             |   **事件分发**，决定是否向下传递   | `true`：拦截处理，不再往下传递 |
| onInterceptTouchEvent()<br>（ViewGroup专有） | **拦截事件**，是否拦截子控件的事件 | `true`：自己处理，不传给子控件 |
|                onTouchEvent()                |     **事件消费**，处理触摸事件     |  `true`：事件被消费，不再传递  |

三、分发流程图（简化）

```
Activity.dispatchTouchEvent()
    ↓
ViewGroup.dispatchTouchEvent()
    → 是否 onInterceptTouchEvent() == true？
        → 是：自己处理（onTouchEvent）
        → 否：传给子 View（dispatchTouchEvent）
            → View.onTouchEvent()
```

四、举个例子说明

```
用户点击了按钮 Button：

1.Activity.dispatchTouchEvent() 接收到事件；
2.事件传给布局 ViewGroup.dispatchTouchEvent()；
3.判断是否拦截：onInterceptTouchEvent()；
4.没拦截，传给 Button.dispatchTouchEvent()；
5.最终由 Button.onTouchEvent() 响应点击。
```

五、常见问题：

```
1.为什么点击无效？
-被上层 ViewGroup 拦截了；
-返回值设置错误；
-View 不可点击或被覆盖。

2.如何实现滑动拦截？
-重写 onInterceptTouchEvent() 判断滑动条件（如滑动距离超过阈值）时返回 true。
```

六、总结一句话

```
Android 的事件分发机制是通过 
dispatchTouchEvent → onInterceptTouchEvent → onTouchEvent 实现的，
控制事件是否传递、拦截或消费，是实现手势、滑动冲突等交互的核心基础。
```

### 2.10 View绘制流程

一、一句话概括

```
View 的绘制流程包括：
measure() 测量 → layout() 布局 → draw() 绘制，
是从 Activity 到 View 的完整界面展示过程。
```

二、三大核心阶段

| 阶段 |   方法    |                             作用                             |
| :--: | :-------: | :----------------------------------------------------------: |
| 测量 | measure() | 计算 View 的宽高<br>（即 `getMeasuredWidth()`、`getMeasuredHeight()` |
| 布局 | layout()  | 确定 View 的位置<br>（即 `getLeft()/Top()/Right()/Bottom()`） |
| 绘制 |  draw()   |                画出内容（背景、内容、子View）                |

三、View 绘制流程图（简化）

```
ActivityThread.handleResumeActivity()
    ↓
WindowManager.addView()
    ↓
ViewRootImpl.performTraversals()
    ↓
measure() → layout() → draw()
```

四、每个方法内部的核心调用

```
1.measure()
-传入 MeasureSpec（包含测量模式和大小）
-调用 onMeasure() → View 自己测量大小

2.layout()
-调用 onLayout()，确定自身和子 View 的位置

3.draw()
调用顺序：
-drawBackground()
-onDraw()（自定义内容）
-dispatchDraw()（绘制子 View）
-onDrawForeground()
```

五、补充说明：谁触发绘制流程？

```
-是系统中的 ViewRootImpl 发起 performTraversals()，
它会依次调用 measure → layout → draw；

-这些过程会在界面加载、调用 requestLayout()、invalidate() 等时触发。
```

六、总结一句话

```
View 绘制流程分为测量、布局、绘制三步，
由ViewRootImpl驱动并调用View的 measure() → layout() → draw() 方法完成整个界面展示。
```

### 2.11 测量模式

一、 一句话概括

```
测量模式是系统传递给View的一种测量约束，告诉 View 在测量宽高时应该遵循的规则，分为三种类型。
```

二、三种测量模式

|   模式名    |    含义    |                             备注                             |
| :---------: | :--------: | :----------------------------------------------------------: |
|   EXACTLY   |  精确尺寸  |      父控件指定了明确大小，View 必须严格按照这个大小来       |
|   AT_MOST   |  最大尺寸  | 父控件允许的最大范围，View 不能超过这个尺寸，常用在 `wrap_content` |
| UNSPECIFIED | 未指定尺寸 |   父控件不限制大小，View 可以任意大，一般用在 `ScrollView`   |

三、MeasureSpec 组成

```
MeasureSpec 是一个 int，由 模式（Mode） 和 尺寸（Size） 组成：
-高 2 位存储模式；
-低 30 位存储尺寸。

使用 MeasureSpec.getMode() 和 MeasureSpec.getSize() 获取对应值。
```

四、实际使用举例

```
@Override
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    int widthMode = MeasureSpec.getMode(widthMeasureSpec);
    int widthSize = MeasureSpec.getSize(widthMeasureSpec);
    
    if (widthMode == MeasureSpec.EXACTLY) {
        // 宽度确定，直接使用 widthSize
    } else if (widthMode == MeasureSpec.AT_MOST) {
        // 最大宽度限制，不能超过 widthSize
    } else {
        // UNSPECIFIED，无限制
    }
    
    // 最终调用 setMeasuredDimension(width, height);
}
```

五、总结一句话

```
测量模式控制 View 如何根据父容器给出的约束测量自己的大小，是 measure() 流程的关键输入参数
```

### 2.12 View, Activity, Window的区别联系

一、概念

```
1、 View（视图）
定义：界面上的基本组件，是所有控件的基类（如 Button、TextView）。
作用：负责绘制自己和响应用户交互事件（点击、滑动等）。

特点：
-是界面上最小的可见元素；
-可以包含子 View（ViewGroup 是 View 的子类，用于布局管理）。

2、Activity（活动）
定义：一个界面页面的控制器，代表一个用户界面屏幕。
作用：管理一个窗口（Window），负责界面生命周期、用户交互、启动/关闭等。

特点：
-负责创建和管理 UI 组件；
-不是界面本身，但持有并操作界面；
-典型的生命周期：onCreate() → onStart() → onResume() → ...

3、Window（窗口）
定义：Activity 与系统窗口管理器（WindowManager）之间的桥梁。
作用：承载并管理界面视图（View）的容器，负责把 View 放到屏幕上显示。

特点：
-一个 Activity 通常对应一个 Window；
-通过 Window 把 View 层级添加到系统的窗口管理器；
-Window 负责处理输入事件和视图绘制。
```

二、三者关系示意

```
Activity  —— 管理 ——>  Window —— 承载 ——> View（界面上的控件树）
```

三、总结

|   名称   |           作用           |        关系        |
| :------: | :----------------------: | :----------------: |
| Activity | 页面控制器，管理生命周期 | 持有并操作 Window  |
|  Window  |   窗口容器，承载 View    |   管理 View 层级   |
|   View   |  具体界面控件，负责绘制  | 显示内容，接收事件 |

四、简单比喻

```
-Activity 像“导演”，负责整个场景的调度；
-Window 像“舞台”，负责承载和展示画面；
-View 像“演员和布景”，具体展示内容和响应交互。
```

### 2.13 怎么计算一个View在屏幕可见部分的百分比？

一、方案步骤

```
1.获取 View 在屏幕上的可见区域
使用 getGlobalVisibleRect(Rect outRect) 获取 View 当前在屏幕上可见的矩形区域。

2.获取 View 总区域大小
通过 getWidth() 和 getHeight() 获取 View 的宽高，计算总面积。

3.计算可见面积
用 outRect 的宽高计算可见面积。

4.计算可见百分比
用可见面积除以总面积，得到百分比。
```

二、代码示例

```
Rect visibleRect = new Rect();
boolean isVisible = view.getGlobalVisibleRect(visibleRect);

if (!isVisible) {
    // View完全不可见
    return 0f;
}

int visibleArea = visibleRect.width() * visibleRect.height();
int totalArea = view.getWidth() * view.getHeight();

if (totalArea <= 0) {
    return 0f;
}

float visiblePercent = (float) visibleArea / totalArea;
return visiblePercent;  // 0.0 到 1.0 之间
```

三、说明

```
-getGlobalVisibleRect() 会考虑父控件裁剪、滚动、屏幕边界等因素，只返回真正可见的矩形。
-如果 View 完全不可见，返回值为 false。
-结果可以乘以 100，转换为百分比。
```

四、总结

```
利用 getGlobalVisibleRect() 获取可见区域，
结合 View 总面积计算可见百分比，是判断 View 可见度的常用方法。
```

### 2.14 activity里面有多个fragment，按下home之后一会儿切回来,fragment没有无参构造崩了，该怎么处理

一、问题原因

```
当按下 Home 键后，系统可能会因为资源紧张回收 Activity 和 Fragment 实例，
但它会保存 Fragment 的状态信息（如类名、arguments）。

等用户切回来时，系统会尝试通过反射 + 无参构造函数自动重建 Fragment 实例。
如果你在 Fragment 中使用了带参构造函数，但没有无参构造函数，就会导致如下崩溃：

java.lang.InstantiationException: 
  class xxx.MyFragment has no empty constructor
```

二、正确解决方式

```
1、 所有 Fragment 必须保留一个公开的无参构造函数
这是系统反射恢复 Fragment 时的必要条件。

class MyFragment : Fragment() {
    // 必须有无参构造函数，不能写构造函数带参数的形式
}

2、使用 newInstance + setArguments 传递参数（官方推荐）

class MyFragment : Fragment() {

    companion object {
        fun newInstance(title: String): MyFragment {
            val fragment = MyFragment()
            val args = Bundle()
            args.putString("title", title)
            fragment.arguments = args
            return fragment
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val title = arguments?.getString("title")
        // 使用参数
    }
}
系统会自动保存 arguments，在重新创建 Fragment 时恢复使用。

3、不要在 Fragment 中使用带参数的构造函数传值
否则系统无法自动重建。

// ❌ 错误示例
class MyFragment(val title: String) : Fragment()
```

三、总结一句话

```
Fragment 必须保留无参构造函数，并使用 setArguments() 来传参，避免使用带参构造函数，
否则在系统重建 Fragment 时会因无法反射创建而崩溃。
```

### 2.15 接口请求是否需要设置证书，如需该如何设置

一、说明

```
在 Android 开发中，接口请求是否需要设置证书，
取决于接口是否采用了 HTTPS 并使用了自签名证书或企业内部证书等非权威 CA 证书。
```

二、是否需要设置证书？

```
1、不需要设置证书：
如果服务器使用的是由可信 CA 签发的 HTTPS 证书（例如 Let's Encrypt、DigiCert 等），
Android 系统默认信任这些证书，无需手动配置。

2、需要设置证书：
如果服务器使用的是自签名证书或不被 Android 系统默认信任的证书，
就必须手动配置，否则会出现 SSLHandshakeException。
```

三、如需设置证书，该如何设置？

```
主要有两种方式：

一、方法一：通过自定义 TrustManager 信任特定证书
步骤如下：

1.将服务器的证书（一般为 .cer 或 .crt）放入 res/raw 目录中。
2.加载证书并配置 SSLContext：

InputStream inputStream = context.getResources().openRawResource(R.raw.server); // 你的证书名

CertificateFactory cf = CertificateFactory.getInstance("X.509");
Certificate ca = cf.generateCertificate(inputStream);

KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
keyStore.load(null, null);
keyStore.setCertificateEntry("ca", ca);

TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
tmf.init(keyStore);

SSLContext sslContext = SSLContext.getInstance("TLS");
sslContext.init(null, tmf.getTrustManagers(), null);

HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());

二、方法二：使用 Network Security Config 配置信任证书（Android 7.0+ 推荐）
1.在 res/xml/network_security_config.xml 中添加：
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">yourdomain.com</domain>
        <trust-anchors>
            <certificates src="@raw/server"/>
        </trust-anchors>
    </domain-config>
</network-security-config>
2.在 AndroidManifest.xml 的 <application> 标签中指定配置文件：
android:networkSecurityConfig="@xml/network_security_config"
```

四、注意事项

```
-不要在生产环境中使用 TrustAllManager（即信任所有证书），存在重大安全风险。
-如果使用 Retrofit/OkHttp 等库，需要将 sslSocketFactory 传入到 OkHttpClient 中。
```

