---
title: Android开发之——Handler机制
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: b4968aed
date: 2025-08-16 13:09:25
---
## 一 概述

```
本文介绍Android Handler 机制，既包含整体原理，也包含细节实现，还会结合源码
```

<!--more-->

## 二 Handler 机制的核心作用

### 2.1 概念

```
简单来说，Handler 是 Android 在 Java 层实现线程间通信和消息处理的核心工具，
最常见的用途就是在 子线程执行任务 → 主线程更新 UI。
```

### 2.2 主要职责

```
发送消息(sendMessage() / post())
接收并处理消息(handleMessage())
保证线程安全地调度任务
```

## 三 为什么需要 Handler

```
Android 主线程（UI 线程）不能做耗时任务：否则会卡顿甚至 ANR。

主线程和子线程不能直接操作对方的 UI，需要一个安全的通信机制。

Handler 提供了一套 基于消息队列的线程间通信方案，让我们能把任务安全地传递到指定线程执行。
```

## 四 Handler 机制的核心四大角色

### 4.1 四大角色

|     组件     |                作用                 |          关系           |
| :----------: | :---------------------------------: | :---------------------: |
|   Handler    |     发送/接收消息，定义处理逻辑     |    持有 Looper 引用     |
|   Message    |        消息/任务载体(可复用)        |  由 MessageQueue 存储   |
| MessageQueue |     消息队列，存放待处理的消息      |     被 Looper 持有      |
|    Looper    | 不断循环取出消息并交给 Handler 处理 | 一个线程只有一个 Looper |

### 4.2 工作流程图

```
  子线程/主线程
      │
      ▼
  Handler.sendMessage()
      │
      ▼
  MessageQueue.enqueueMessage()
      │
      ▼
  Looper.loop()
      │  (不断取消息)
      ▼
  Handler.dispatchMessage()
      │
      ▼
  Handler.handleMessage()  ← 你写的处理逻辑
```

## 五 工作过程详解

### 5.1 创建 Looper

```
1、说明
在主线程中，ActivityThread 会帮我们调用Looper.prepareMainLooper()和Looper.loop()，
所以主线程默认有 Looper。

2、子线程如果要用 Handler，必须手动：
Looper.prepare(); // 创建 Looper 和 MessageQueue
Handler handler = new Handler(Looper.myLooper()) {
    @Override
    public void handleMessage(Message msg) {
        // 处理消息
    }
};
Looper.loop(); // 开始循环
```

### 5.2 发送消息

```
1、Handler 发送消息的几种方式
handler.sendMessage(msg);
handler.post(runnable);
handler.sendEmptyMessage(what);

2、内部都会调用
MessageQueue.enqueueMessage()

3、将消息放入队列，并按 when 时间排序。
```

### 5.3 Looper 循环取消息

```
Looper.loop() 核心

for (;;) {
    Message msg = queue.next(); // 取下一条消息（可能阻塞）
    if (msg == null) return;    // 没有消息退出循环
    msg.target.dispatchMessage(msg); // target 是 Handler
    msg.recycleUnchecked();     // 回收复用
}
```

### 5.4 Handler 分发消息

```
public void dispatchMessage(Message msg) {
    if (msg.callback != null) {  
        // 1. 如果是 post(Runnable)
        msg.callback.run();
    } else {
        // 2. 调用 handleMessage
        handleMessage(msg);
    }
}
```

## 六 源码关键点

```
1、Looper.prepare()
-创建当前线程唯一的 Looper
-绑定一个 MessageQueue

2、MessageQueue
-使用 单链表 按执行时间排序存储 Message
-next() 会使用 nativePollOnce() 阻塞等待新消息

3、Message
-有复用机制（sPool 静态池）

4、Handler
-持有 Looper 引用
-sendMessage() 最终走到 enqueueMessage()
```

## 七 常见问题与注意事项

```
1、子线程使用 Handler 必须先 Looper.prepare() 再 Looper.loop()

2、避免内存泄漏
 -非静态内部类 Handler 会隐式持有外部类引用
 -解决：使用静态内部类 + 弱引用

3、延时消息不准？
 -Android 的延时是基于系统时钟，可能受 CPU 休眠、系统调度影响

4、退出 Looper
 -调用 Looper.myLooper().quit() 或 quitSafely()
```

## 八 简单实用示例

```
1、说明
线程更新 UI

2、示例
Handler handler = new Handler(Looper.getMainLooper()) {
    @Override
    public void handleMessage(Message msg) {
        textView.setText("收到：" + msg.what);
    }
};

new Thread(() -> {
    Message msg = Message.obtain();
    msg.what = 1;
    handler.sendMessage(msg);
}).start();
```

## 九 总结一句话

```
Handler = 一套基于消息队列的线程通信 & 任务调度机制，依赖 Looper 和 MessageQueue 工作。
主线程默认有 Looper，子线程需要手动创建
```

