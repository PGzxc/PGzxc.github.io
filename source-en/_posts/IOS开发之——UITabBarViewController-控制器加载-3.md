---
title: IOS开发之——UITabBarViewController-控制器加载(3)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: efa3afd7
date: 2020-10-25 23:23:24
---
## 一 概述

本文介绍以下内容：

* UITabBarViewController的TabBar设置控制器，并重写控制器中的方法，观察控制器切换时的方法执行
* 程序启动后，方法执行的先后顺序

<!--more-->

## 二 UITabBarViewController的TabBar控制器的执行

### 2.1 过程描述

* 给TabBar的每个控制器重新ViewController方法，并重写ViewController中的方法，并给每个重写的方法添加打印输出
* 在Main.stroyboard布局文件中，给每个TabBar绑定相应的自定义ViewController
* 切换TabBar，观察方法的打印输出

### 2.2 代码实现

* 分别添加MessageViewController，QworldViewController，ContactViewController，SettingViewController(每个中都重写了viewDidLoad，viewWillAppear，viewDidAppear，viewWillDisappear，viewDidDisappear)

  ![][1]
  
* 打开`Main.storyboard`，找到对应的TabBar绑定自定义ViewController

  ![][2]
  
* 切换UITabBar查看打印消息

  - 第一次显示时打印消息

    ```
     -[MessageViewController viewDidLoad]
     -[MessageViewController viewWillAppear:]
     -[MessageViewController viewDidAppear:]
    ```

  - 切换到第二个UITabBar时，显示消息

    ```
     -[ContactViewController viewDidLoad]
     -[ContactViewController viewWillAppear:]
     -[MessageViewController viewWillDisappear:]
     -[MessageViewController viewDidDisappear:]
     -[ContactViewController viewDidAppear:]
    ```

### 2.3 总结

* 当页面要显示时，会先后执行viewDidLoad，viewWillAppear，viewDidAppear
* 当切换到第二个页面时：先执行第二个页面的viewDidLoad，viewWillAppear，再执行第一个页面的viewWillDisappear，viewDidDisappear，最后执行第二个页面的viewDidAppear
* **viewDidLoad**：在视图加载后被调用，如果是在代码中创建的视图加载器，他将会在loadView方法后被调用，如果是从nib视图页面输出，他将会在视图设置好后后被调用
* **viewWillAppear**：当收到视图在视窗将可见时的通知会呼叫的方法。默认情况下不执行任何操作
* **viewDidAppear**:当收到视图在视窗已可见时的通知会呼叫的方法，（视图已完全过渡到屏幕上时调用）
* **viewWillDisappear**:当收到视图将去除、被覆盖或隐藏于视窗时的通知会呼叫的方法。默认情况下不执行任何操作loadView;这是当他们没有正在使用nib视图页面，子类将会创建自己的自定义视图层。绝不能直接调用
* **viewDidDisappear**：当收到视图已去除、被覆盖或隐藏于视窗时的通知会呼叫的方法

## 三 程序启动后，方法执行的先后顺序

### 3.1 程序第一次启动后

```
 -[AppDelegate application:didFinishLaunchingWithOptions:]
 -[SceneDelegate scene:willConnectToSession:options:]
 -[SceneDelegate sceneWillEnterForeground:]
 -[SceneDelegate sceneDidBecomeActive:]
```

### 3.2 切换到后台后

```
 -[SceneDelegate sceneWillResignActive:]
 -[SceneDelegate sceneDidEnterBackground:]
```

### 3.3 再次回到前台

```
 -[SceneDelegate sceneWillEnterForeground:]
 -[SceneDelegate sceneDidBecomeActive:]
```

### 3.4 从后台退出程序时

```
 -[SceneDelegate sceneDidDisconnect:]
 -[AppDelegate application:didDiscardSceneSessions:]
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uitabbarviewcontroller-viewcontroller-define-log.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-uitabbarviewcontroller-mainstoryboard-bing-viewcontroller.png