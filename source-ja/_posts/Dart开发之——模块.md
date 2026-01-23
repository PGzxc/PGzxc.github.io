---
title: Dart开发之——模块
categories:
  - 开发
  - C-前端开发
  - Dart
tags:
  - Dart
abbrlink: 1d591de2
date: 2021-02-09 14:58:43
---
## 一 概述

当多个Dart文件相互引用时，就涉及到了模块引用，文本主要介绍模块相关的知识点：

* 模块引用
* 模块命名

<!--more-->

## 二 模块引用

### 2.1 说明

* 模块引用的关键字是`import`
* 作用：用于将其他文件导入到当前文件中使用，避免多次copy
* import 模块后，可跟`show`关键字用于只对外提供某个方法(show log)

### 2.2 示例

lib/LogUtils.dart

```
void log(var msg) {
  print(msg);
}
```

test/test.dart

```
import '../lib/LogUtils.dart';
main() {
  log("调用打印方法");
}
```

## 三 模块命名

### 3.1 说明

* 当导入的模块还有共同的方法或属性时，就会出现错误
* 通过`as`关键字将模块命名，通过命名后的名字调用方法或属性可以避免重名问题

### 3.2 示例

lib/LogUtils.dart

```
void log(var msg) {
  print(msg);
}
```

lib/PrintUtils.dart

```
void log(var msg) {
  print(msg);
}
```

test/test.dart

```
import '../lib/LogUtils.dart';
import '../lib/PrintUtils.dart' as print;

main() {
  log("调用打印方法");
  print.log("调用了PrintUtils中的打印");
}
```

