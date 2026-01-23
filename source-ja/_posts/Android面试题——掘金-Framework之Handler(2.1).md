---
title: Android面试题——掘金-Framework之Handler(2.1)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: e4f7e24c
date: 2025-04-03 10:18:45
---
## 一 概述

```
关于 Android Framework 中的 Handler，
面试常问的问题通常涉及 消息机制、Looper、MessageQueue、线程间通信这些核心概念。
以下是一些高频面试题及解析
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 Handler 机制的基本原理？

```
Handler 主要用于线程间通信，基于消息队列（MessageQueue）和循环器（Looper）进行消息调度。
其核心流程：

-Looper.prepare()：创建 Looper 和 MessageQueue（主线程默认已创建）。
-Handler.sendMessage()：发送 Message 到 MessageQueue。
-Looper.loop()：从 MessageQueue 取出 Message，并交给对应的 Handler 处理。
-Handler.handleMessage()：处理 Message 逻辑。
```

### 2.2 为什么主线程（UI 线程）默认有 Looper，而子线程默认没有？

```
-主线程在 ActivityThread.main()方法中调用了Looper.prepareMainLooper()，所以主线程默认有Looper。
-子线程 默认不会自动创建 Looper，需要手动调用 Looper.prepare() 和 Looper.loop()。
```

### 2.3 MessageQueue 为什么不会阻塞 UI 线程？

```
-MessageQueue 采用 阻塞式等待 机制 (next() 方法) 处理消息，
但 不会影响 UI 线程，因为 Looper.loop() 不断轮询 队列，只有消息到达时才会被唤醒执行。
-IdleHandler 机制：当 MessageQueue 空闲时，可以执行 IdleHandler 任务，防止 UI 线程完全阻塞。
```

### 2.4 Handler 可能引起内存泄漏吗？如何避免？

```
可能会，尤其是在 匿名内部类 Handler 持有 Activity 引用 时，导致 Activity 无法被 GC 回收。

解决方案：
-使用静态内部类 + 弱引用（WeakReference） 避免持有外部类引用。
-在 onDestroy() 中调用 handler.removeCallbacksAndMessages(null) 释放消息队列。
```

### 2.5 Handler.postDelayed() 和 Thread.sleep()的区别？

|          |     Handler.postDelayed()      |  Thread.sleep()  |
| :------: | :----------------------------: | :--------------: |
|   原理   |  发送延迟消息到 MessageQueue   |   线程直接休眠   |
|   影响   |  不影响 UI 线程的其他任务执行  |  会阻塞当前线程  |
| 适用场景 | 需要延迟执行任务，但不阻塞线程 | 需要暂停线程执行 |

### 2.6 Handler允许跨线程通信的原因？

```
-Handler依赖于Looper和MessageQueue，而MessageQueue是线程安全的，可以接受来自不同线程的消息。
-线程A的Handler.sendMessage() 只是将 Message 添加到线程B的MessageQueue，并不会阻塞 A 线程。
```

### 2.7 如何在子线程创建 Handler？

```
必须手动创建 Looper 并启动 Looper.loop()，示例如下：
class MyThread extends Thread {
    private Handler handler;

    @Override
    public void run() {
        Looper.prepare();
        handler = new Handler(Looper.myLooper()) {
            @Override
            public void handleMessage(Message msg) {
                // 处理消息
            }
        };
        Looper.loop();
    }

    public Handler getHandler() {
        return handler;
    }
}
```

### 2.8 HandlerThread 的作用？与普通线程的区别？

```
HandlerThread 是 带有 Looper 的线程，适用于 后台任务，示例

HandlerThread handlerThread = new HandlerThread("MyHandlerThread");
handlerThread.start();
Handler handler = new Handler(handlerThread.getLooper());
handler.post(() -> {
    // 执行耗时任务
});
```

2-相比普通线程

|          |    普通线程    |  HandlerThread   |
| :------: | :------------: | :--------------: |
|  Looper  |     默认无     |   自带 Looper    |
| 消息队列 |       无       | 自带MessageQueue |
| 生命周期 | 线程结束即销毁 |     可以复用     |

### 2.9 为什么 Handler 不能跨进程通信？

```
Handler依赖于进程内的Looper和MessageQueue，不同进程的Looper互不相通，导致Handler无法跨进程通信。

跨进程通信（IPC）推荐使用：
-AIDL（Android Interface Definition Language）
-Messenger
-ContentProvider
```

### 2.10 为什么 Looper.loop() 是一个死循环，但不会导致 ANR？

```
-Looper.loop() 是 无限循环，但它 不会占用 CPU，
而是通过 MessageQueue.next() 进入 阻塞等待 状态，直到有消息时才处理。
-如果 handleMessage() 处理逻辑过重，就会导致 UI 线程 长时间未响应（ANR）
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)