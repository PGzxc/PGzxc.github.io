---
title: Android面试题——掘金-架构之23种设计模式(6.2)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: ce854388
date: 2025-04-07 10:41:25
---
## 一 概述

```
以下是面试中经常考察的 Android 架构 & 设计模式相关题目：
23 种设计模式在 Android 中的应用，结合实际场景，答题更有说服力
```

<!--more-->

## 二 设计模式分类（总览）

|  类型  |                       设计模式（23种）                       |
| :----: | :----------------------------------------------------------: |
| 创建型 |            单例、工厂方法、抽象工厂、建造者、原型            |
| 结构型 |         适配器、装饰器、代理、外观、桥接、组合、享元         |
| 行为型 | 策略、模板方法、观察者、责任链、命令、备忘录、状态、迭代器、解释器、中介者、访问者 |

## 二 面试题解答(仅供参考)

### 2.1 单例模式（Singleton）

```
1.作用：保证一个类只有一个实例
2.应用：
-RetrofitClient.getInstance()
-Application 本身
-ActivityManager.getInstance()
```

### 2.2 工厂方法（Factory Method）

```
1.作用：统一创建对象，封装细节
2.应用：
-LayoutInflater.from(context)
-Room.databaseBuilder(...)
-自定义 View 创建
```

### 2.3 建造者模式（Builder）

```
1.作用：用于构建复杂对象，链式调用
2.应用：
-AlertDialog.Builder
-NotificationCompat.Builder
-Glide.with(...).load(...)
```

### 2.4 原型模式（Prototype）

```
1.作用：对象复制
2.应用：
-Bundle.clone()
-Intent.copy()
-自定义数据结构深拷贝
```

### 2.5 适配器模式（Adapter）

```
1.作用：转换接口使类能协同工作
2.应用：
-RecyclerView.Adapter
-ArrayAdapter
-ViewPagerAdapter
```

### 2.6 装饰器模式（Decorator）

```
1.作用：动态扩展功能
2.应用：
-InputStream → BufferedInputStream
-OkHttp Interceptor
-RecyclerView.ItemDecoration
```

### 2.7 代理模式（Proxy）

```
2.作用：为对象提供一个代理以控制访问
2.应用：
-Retrofit 动态代理接口
-ActivityManagerProxy（Binder 调用）
-Instrumentation代理（Hook）
```

### 2.8 外观模式（Facade）

```
1.作用：简化调用，统一入口
2.应用：
-MediaPlayer 封装了音频播放
-Glide/Picasso 图片加载
-网络请求封装库
```

### 2.9 桥接模式（Bridge）

```
1.作用：分离抽象与实现，解耦变化
2.应用：
-View 与其 Renderer
-ExoPlayer 与渲染器、播放内核
-Drawable → ShapeDrawable / BitmapDrawable
```

### 2.10 组合模式（Composite）

```
1.作用：组合对象成树形结构
2.应用：
-ViewGroup 和 View
-ConstraintLayout 约束嵌套
-XML 中布局层级
```

### 2.11 享元模式（Flyweight）

```
1.作用：共享对象，节省内存
2.应用：
-Bitmap 缓存池
-Typeface.create() 字体缓存
-ViewHolder 复用机制
```

### 2.12 策略模式（Strategy）

```
1.作用：可替换算法、行为
2.应用：
-ImageLoader 切换缓存策略
-LayoutManager 切换布局策略
-多种网络请求策略（如缓存优先）
```

### 2.13 模板方法模式（Template Method）

```
1.作用：定义算法结构，子类定实现
2.应用：
-AsyncTask.doInBackground()
-Activity.onCreate() / onResume()
-BaseActivity 模板封装
```

### 2.14 观察者模式（Observer）

```
1.作用：对象间通知机制
2.应用：
-LiveData.observe()
-EventBus / RxJava
-广播机制（BroadcastReceiver）
```

### 2.15 责任链模式（Chain of Responsibility）

```
1.作用：多个处理者按顺序处理请求
2.应用：
-OkHttp Interceptor
-TouchEvent 事件分发
-FilterChain
```

### 2.16 命令模式（Command）

```
1.作用：封装请求为对象，支持撤销、重做等
2.应用：
-Handler.post(Runnable)
-动画控制命令
-ExoPlayer.prepare() 封装命令行为
```

### 2.17 状态模式（State）

```
1.作用：对象行为随状态改变
2.应用：
-MediaPlayer 播放状态切换
-自定义按钮：Normal / Pressed / Disabled 状态
-StateLayout 多状态 UI 控件
```

### 2.18 备忘录模式（Memento）

```
1.作用：保存对象状态，支持恢复
2.应用：
-onSaveInstanceState()
-页面状态还原
-游戏进度保存与回滚
```

### 2.19 迭代器模式（Iterator）

```
1.作用：顺序访问容器元素
2.应用：
-Cursor.moveToNext()
-List.iterator()
-数据结构遍历
```

### 2.20 解释器模式（Interpreter）

```
1.作用：定义语言语法并解释执行
2.应用：
-表达式解析（如 SQL）
-动态脚本引擎
-动态权限规则解析（如 ABTest）
```

### 2.21 中介者模式（Mediator）

```
1.作用：减少对象间依赖，由中介统一调度
2.应用：
-LiveData 作为 UI 和数据桥梁
-Jetpack Navigation 统一导航调度
-自定义 UI 控件协同通信
```

### 2.22 访问者模式（Visitor）

```
1.作用：对对象结构执行操作（不修改对象）
2.应用：
-RecyclerView.Adapter 不同类型 ViewHolder 访问
-AST 节点遍历（代码插桩）
-UI 元素统计/日志采集
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)