---
title: IOS开发之——状态栏导航栏高度
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 3cca9186
date: 2025-12-02 08:35:34
---
## 一 概述

```
本文介绍：
 - iOS 上 状态栏、导航栏、TabBar 高度 的总结和获取方式
 - 兼容 iPhone 8 以下、iPhone X 及以上刘海屏/全面屏
```

<!--more-->

## 二 iOS 各栏高度参考表

### 2.1 参考表

|         项目         |                          高度（pt）                          |           说明           |
| :------------------: | :----------------------------------------------------------: | :----------------------: |
|   状态栏 StatusBar   | 20（iPhone 8 及以下）<br/>44（iPhone X 及以上竖屏）<br/>0（横屏时隐藏） |        顶部系统栏        |
| 导航栏 NavigationBar |                  44（竖屏）<br/>32（横屏）                   |   不含状态栏，高度固定   |
|   状态栏 + 导航栏    |         64（iPhone 8 竖屏）<br/>88（iPhone X+ 竖屏）         |    常用于顶部布局计算    |
|        TabBar        |   49（iPhone 8 及以下）<br/>49 + 34（iPhone X+ 底部手势）    | 底部栏，Safe Area 自适应 |

### 2.2 说明

```
iPhone X 及以上状态栏和底部手势高度比旧机型大，需要用 Safe Area 避免遮挡。
```

## 三 获取高度的 Swift 方法

### 3.1 状态栏高度

```
1、iOS 13+ 推荐用 windowScene.statusBarManager：
var statusBarHeight: CGFloat {
    if let height = UIApplication.shared.windows.first?.windowScene?.statusBarManager?.statusBarFrame.height {
        return height
    }
    return 0
}

2、旧版兼容：
let height = UIApplication.shared.statusBarFrame.height
```

### 3.2 导航栏高度

```
let navBarHeight = navigationController?.navigationBar.frame.height ?? 44

-iPhone 竖屏：44pt
-横屏：32pt

可与状态栏叠加计算总顶部高度：
let totalTopHeight = statusBarHeight + navBarHeight
```

### 3.3 TabBar 高度（含手势区）

```
1、计算方式

let tabBarHeight = tabBarController?.tabBar.frame.height ?? 49
let bottomSafeArea = view.safeAreaInsets.bottom // 刘海屏底部手势高度
let totalTabBarHeight = tabBarHeight + bottomSafeArea

2、说明
iPhone X 及以上：tabBar.frame.height = 49，safeAreaInsets.bottom = 34 → 总高度 = 83
iPhone 8 及以下：safeAreaInsets.bottom = 0 → 总高度 = 49
```

## 四 封装工具类（Swift）

### 4.1 工具类

```
import UIKit

struct BarHeights {

    static var statusBar: CGFloat {
        return UIApplication.shared.windows.first?.windowScene?.statusBarManager?.statusBarFrame.height ?? 0
    }

    static var navigationBar: CGFloat {
        return 44
    }

    static var top: CGFloat {
        return statusBar + navigationBar
    }

    static var tabBar: CGFloat {
        return 49
    }

    static var bottomSafeArea: CGFloat {
        return UIApplication.shared.windows.first?.safeAreaInsets.bottom ?? 0
    }

    static var totalTabBar: CGFloat {
        return tabBar + bottomSafeArea
    }
}
```

### 4.2 使用示例

```
let topHeight = BarHeights.top
let bottomHeight = BarHeights.totalTabBar
```

## 五 布局适配建议

```
-普通布局：使用 safeAreaLayoutGuide
-ScrollView/TableView/CollectionView：contentInsetAdjustmentBehavior = .automatic
-全屏背景或自定义沉浸式：结合 additionalSafeAreaInsets 或直接读取 Safe Area

-TabBarController + NavigationController：
总顶部高度 = statusBar + navigationBar，
底部高度 = tabBar + safeAreaInsets.bottom
```

