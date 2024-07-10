---
title: 鸿蒙OS应用开发之——Log日志打印
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 72a110f
date: 2020-12-29 08:48:31
---
## 一 概述

* 鸿蒙应用中，用于输入Log日志的类是HiLog；
* 在输出日志前，你需要实现定义[HiLogLabel](https://developer.harmonyos.com/cn/docs/documentation/doc-references/hiloglabel-0000001054838842)，用于确定输出log日志类型、服务域(service domain)和标记(tag)
* `%{private}s`和%`{public}d`指定输出日志信息时是否需要指明显示输出结果，其中s和d是参数

<!--more-->

## 二 输出实例

### 2.1 如何输出日志代码

```
 HiLogLabel label=new HiLogLabel(HiLog.LOG_APP, 0x00201, "TAG");
 HiLog.error(label,"log日志");
```

### 2.2 查看输出结果

状态栏切换到HiLog标签下，选择要查看的设备，选择设备类型(Error)，service domain输入`00201`

![][1]

## 三 概念说明

### 3.1 HiLogLabel

```
HiLogLabel(int type, int domain, String tag)
```

| 参数类型 |                    说明                    |
| :------: | :----------------------------------------: |
|   type   |           输出日志类型(见type表)           |
|  domain  |        从0x0到0xFFFFF的十六进制整数        |
|   tag    | 用于标识方法调用的类或服务行为的字符串常量 |

#### type

|     type      |  值  |
| :-----------: | :--: |
| HiLog.LOG_APP |  0   |
|  HiLog.DEBUG  |  3   |
|  HiLog.INFO   |  4   |
|  HiLog.WARN   |  5   |
|  HiLog.ERROR  |  6   |
|  HiLog.FATAL  |  7   |

### 3.2 HiLog

```
HiLog.info(HiLogLabel label, String format, Object... args)
```

| 方法  | 参数一 |   参数二    | 参数三(可变参数) |
| :---: | :----: | :---------: | :--------------: |
| debug | label  | 输出Log内容 |       可空       |
| info  | label  | 输出Log内容 |       可空       |
| warn  | label  | 输出Log内容 |       可空       |
| error | label  | 输出Log内容 |       可空       |
| fatal | label  | 输出Log内容 |       可空       |

## 四 高级应用(private和public修饰符)

### 4.1 说明

* private位置`%{private}s`，其中s是要输出的内容，输出时不显示内容
* pubilic的位置`%{public}d`，其中d是要输出的内容，输出时正确显示

### 4.2 代码

```
 String url="localhost";
 int errno=500;
 HiLogLabel label=new HiLogLabel(HiLog.LOG_APP, 0x00201, LogUtils.class.getSimpleName());
 HiLog.warn(label, "Failed to visit %{private}s, reason:%{public}d.", url, errno);
```

### 4.3 显示结果(url没有显示)

```
12-28 17:34:59.359 25702-25702/? W 00201/LogUtils: Failed to visit <private>, reason:500.
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-log-info-sample.png