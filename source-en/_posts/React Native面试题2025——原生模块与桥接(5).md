---
title: React Native面试题2025——原生模块与桥接(5)
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: c9b515d1
date: 2025-04-10 10:09:48
---
## 一 概述

1. 什么是 React Native 的“桥接”机制？它如何在 JavaScript 和原生代码之间进行通信？
2. 如何创建和使用原生模块？举例说明如何从 Java/Kotlin (Android) 或 Objective-C/Swift (iOS) 调用原生方法。
3. 如何在 React Native 中使用第三方原生库？如何处理原生库的版本兼容性问题？
4. React Native 中的“异步事件”和“回调”是如何工作的？如何进行错误处理？

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 React Native 的“桥接”机制？它如何在 JavaScript 和原生代码之间进行通信？

```
一、桥接概念
React Native 的“桥接”机制 是 JavaScript 代码和原生代码（iOS/Android）之间进行通信的桥梁。
由于 React Native 是基于跨平台架构，JavaScript 和原生代码运行在不同的线程上，
因此需要通过桥接机制来实现它们之间的相互调用和数据交换。

二、桥接机制的工作原理：
2.1 异步通信：
JavaScript 和原生代码的通信是异步的，数据在两个线程之间传递时，
JavaScript 线程不会阻塞主线程的 UI 渲染，保证了性能的流畅性。

2.2 数据序列化：
JavaScript 通过 Bridge 向原生端发送消息时，会将数据序列化为JSON格式，通过桥接进行传输。
原生端再将数据反序列化成对应的原生对象。

2.3 原生模块（Native Modules）：
通过桥接，JavaScript 可以调用原生模块中的方法，执行原生端的功能（如访问设备硬件、摄像头、地图等）。
开发者可以通过自定义原生模块，封装一些原生功能暴露给 JavaScript 调用。

2.4 原生 UI 组件（Native UI Components）：
JavaScript 也可以通过桥接机制将原生 UI 组件嵌入到 React 组件中，
从而实现在 React Native 应用中使用原生的 UI 组件。

三、桥接机制的通信流程：
3.1 JavaScript → 原生：
JavaScript 代码通过调用原生模块的方法，向原生端发送请求。例如，使用 NativeModules 来访问原生功能。

import { NativeModules } from 'react-native';
NativeModules.MyNativeModule.someNativeFunction();

3.2 原生 → JavaScript：
原生端可以通过桥接向 JavaScript 发送数据，通常使用回调函数或者事件传递数据给 JavaScript 端。

MyNativeModule.someNativeFunction((result) => {
  console.log(result);
});

总结：
-桥接机制 是 React Native 中 JavaScript 和原生代码之间的通信桥梁。
-它支持异步通信、数据序列化和反序列化，允许 JavaScript 调用原生功能和原生 UI 组件。
-通过桥接，开发者可以在 React Native 应用中实现丰富的原生功能，提升性能和用户体验。
```

### 2.2 如何创建和使用原生模块？举例说明如何从 Java/Kotlin (Android) 或 Objective-C/Swift (iOS) 调用原生方法。

```
在 React Native 中，原生模块允许你在 JavaScript 代码中调用 Android 或 iOS 的原生功能。
创建和使用原生模块的过程通常分为以下几个步骤：

一、创建原生模块
1.1 Android（Java/Kotlin）：
1.1.1 在 android/app/src/main/java/com/{your_project}/ 
目录下创建一个Java或Kotlin文件，例如 MyNativeModule.java。

1.1.2 在该文件中编写原生模块类，继承 ReactContextBaseJavaModule 并实现所需的方法。

Java 示例：

package com.myproject;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
public class MyNativeModule extends ReactContextBaseJavaModule {

  public MyNativeModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "MyNativeModule";
  }

  @ReactMethod
  public void showToast(String message) {
    // 调用 Android 的 Toast 类来显示消息
    Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();
  }
}

1.1.3 注册原生模块。在 MainApplication.java 文件中，添加 MyNativeModule 到包列表中：


import com.myproject.MyNativeModule;
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
    new MainReactPackage(),
    new MyNativeModule()  // 注册模块
  );
}

1.2 iOS（Objective-C/Swift）：
1.2.1 在 ios/{your_project}/ 目录下创建一个原生模块文件，
例如 MyNativeModule.m（Objective-C）或 MyNativeModule.swift（Swift）。

Objective-C 示例：

#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
@interface MyNativeModule : NSObject <RCTBridgeModule>
@end
@implementation MyNativeModule
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(showToast:(NSString *)message) {
  // 调用 iOS 的 Toast 类或 UIAlertView 来显示消息
  dispatch_async(dispatch_get_main_queue(), ^{
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Message"
                                                               message:message
                                                        preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *action = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil];
    [alert addAction:action];
    [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alert animated:YES completion:nil];
  });
}
@end

1.2.2 注册原生模块。在 AppDelegate.m 文件中，确保 RCTBridge 已正确设置并加载模块。

二、使用原生模块
在 React Native JavaScript 代码中，你可以通过 NativeModules 来调用原生模块的方法。

JavaScript 使用原生模块：
2.1 在 JavaScript 中，首先导入 NativeModules：

import { NativeModules } from 'react-native';

2.2 调用原生模块中的方法：
NativeModules.MyNativeModule.showToast('Hello from React Native!');

三、总结：
3.1 Android：使用 Java 或 Kotlin 创建原生模块，
继承 ReactContextBaseJavaModule，并通过 @ReactMethod 注解暴露方法。

3.2 iOS：使用 Objective-C 或 Swift 创建原生模块，遵循 RCTBridgeModule 协议，
通过 RCT_EXPORT_METHOD 暴露方法。

3.3 在 JavaScript 中，通过 NativeModules 导入原生模块并调用方法。

这样，你就能在 React Native 应用中调用 Android 和 iOS 的原生功能，扩展应用的能力。
```

### 2.3 如何在 React Native 中使用第三方原生库？如何处理原生库的版本兼容性问题？

```
-在 React Native 中使用第三方原生库时，首先通过 npm 或 yarn 安装，并按照平台要求配置。
-自动链接机制简化了原生库的集成，iOS 使用 CocoaPods 管理依赖，Android 需要手动配置 Gradle 文件。
-处理版本兼容性时，要注意库的 React Native 版本要求，并可能需要根据版本进行适配或使用特定版本的库。
```

### 2.4 React Native 中的“异步事件”和“回调”是如何工作的？如何进行错误处理？

```
异步事件通过 Promise 或 async/await 来处理异步操作，
Promise 提供 .then() 和 .catch() 来处理成功和失败，async/await 提供更简洁的语法。

回调是一种传统的异步编程方式，在异步函数执行完成后通过回调函数通知调用者结果或错误。

错误处理：使用 .catch() 或 try/catch 捕获异常，或者在回调函数中判断错误参数并处理。
```

