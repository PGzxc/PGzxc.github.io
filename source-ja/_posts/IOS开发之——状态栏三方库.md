---
title: IOS开发之——状态栏三方库
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 93a027b4
date: 2025-12-03 08:53:35
---
## 一 概述

```
本文介绍：
 - 自定义工具类
 - 三方库
```

<!--more-->

## 二 自定义工具类

### 2.1 说明

```
很多团队会自己封装一个 DeviceLayoutHelper 或 SafeAreaUtils 来统一处理系统栏高度与安全区域。
```

### 2.2 工具

```
1、说明：下面是一个通用 Swift 封装，可以直接用在项目中。

2、工具
import UIKit

struct LayoutHelper {
    
    /// 状态栏高度
    static var statusBarHeight: CGFloat {
        UIApplication.shared.windows.first?.windowScene?.statusBarManager?.statusBarFrame.height ?? 0
    }

    /// 导航栏高度（标准）
    static var navigationBarHeight: CGFloat {
        44
    }

    /// 状态栏 + 导航栏总高度
    static var topBarHeight: CGFloat {
        statusBarHeight + navigationBarHeight
    }

    /// 底部 Safe Area（如 iPhone X 的 34）
    static var bottomSafeAreaHeight: CGFloat {
        UIApplication.shared.windows.first?.safeAreaInsets.bottom ?? 0
    }

    /// TabBar 高度
    static var tabBarHeight: CGFloat {
        49
    }

    /// TabBar + SafeArea
    static var totalTabBarHeight: CGFloat {
        tabBarHeight + bottomSafeAreaHeight
    }

    /// 是否是全面屏设备（有刘海 / Home 指示条）
    static var isFullScreenDevice: Bool {
        bottomSafeAreaHeight > 0
    }
}

3、使用示例
let topHeight = LayoutHelper.topBarHeight
let bottomHeight = LayoutHelper.totalTabBarHeight
let isFullScreen = LayoutHelper.isFullScreenDevice
```

## 三 常用第三方库推荐

### 3.1 IQKeyboardManager

```
1、地址：
https://github.com/hackiftekhar/IQKeyboardManager

2、功能说明
-自动处理键盘与 Safe Area 的冲突
-自动避开键盘、TabBar、安全区域
-兼容刘海屏
-无需写一行额外代码

3、示例
import IQKeyboardManagerSwift

IQKeyboardManager.shared.enable = true
IQKeyboardManager.shared.shouldResignOnTouchOutside = true
```

### 3.2 SnapKit

```
1、地址
https://github.com/SnapKit/SnapKit

2、说明
-约束布局库，完美支持 safeAreaLayoutGuide
-适用于所有刘海屏和非刘海屏，自动计算安全边距

3、示例
view.snp.makeConstraints { make in
    make.top.equalTo(view.safeAreaLayoutGuide.snp.top)
    make.bottom.equalTo(view.safeAreaLayoutGuide.snp.bottom)
}
```

### 3.3 DeviceKit

```
1、地址
https://github.com/devicekit/DeviceKit

2、说明
-检测设备型号、判断是否为全面屏设备
-可识别：
 iPhone X/11/12/13/14/15 系列
 iPad 全系列
 模拟器设备

-配合 Safe Area 判断更精准。

3、示例
import DeviceKit

let device = Device.current
if device.isOneOf(Device.allDevicesWithSensorHousing) {
    print("有刘海设备")
}
```

### 3.4 SafeAreaManager(轻量封装)—已删除

```
1、地址
https://github.com/lixiang1994/SafeAreaManager

2、说明
小众但实用的库，专门处理 Safe Area 与刘海屏适配。

3、示例
let topInset = SafeAreaManager.shared.top
let bottomInset = SafeAreaManager.shared.bottom

4、优点
-支持动态监听 Safe Area 变化（横竖屏切换）
-可直接计算安全显示区 CGRect
-支持自定义 inset 叠加
```

### 3.5 SwiftUI Safe Area 插件（内置API）

```
1、说明
如果用 SwiftUI，无需第三方库，官方已内置安全区控制：

2、示例
.ignoresSafeArea(.container, edges: [.top, .bottom])
.safeAreaInset(edge: .bottom) {
    Color.black.frame(height: 34)
}
```

## 四 适配建议(UIKit 项目)

|          场景          |               推荐方案                |
| :--------------------: | :-----------------------------------: |
| 需要手动获取状态栏高度 |    用 LayoutHelper.statusBarHeight    |
|   自定义沉浸式导航栏   |    用 safeAreaInsets.top 动态计算     |
|        键盘适配        |       用 IQKeyboardManagerSwift       |
|     判断是否刘海屏     |             用 DeviceKit              |
|        动态布局        | 用 SnapKit 并结合 safeAreaLayoutGuide |

