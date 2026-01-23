---
title: IOS开发之——安全区域
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: e70e3fdb
date: 2025-12-01 18:16:53
---
## 一 什么是 Safe Area(安全区域)

```
Safe Area = 不会被系统 UI（状态栏、导航栏、Home 指示条、刘海等）遮挡的可用显示区域。

它的作用是：
-保证内容在各种设备（包括刘海屏）上都能完全显示；
-自动避开状态栏、导航栏、底部手势区；
-支持横竖屏自动变化。
```

<!--more-->

## 二 安全区域的典型示意

|    设备类型     |    Safe Area 上方     |     Safe Area 下方     |        备注        |
| :-------------: | :-------------------: | :--------------------: | :----------------: |
| iPhone 8 及以下 |      状态栏 20pt      |           无           |  无刘海、无手势区  |
|  iPhone X 系列  |      状态栏 44pt      |    Home 指示条 34pt    |  刘海 + 底部手势   |
|  iPhone 14 Pro  | 状态栏 59pt（动态岛） |          34pt          | 需要特别注意动态岛 |
|      横屏       |     左右刘海留边      | 底部可能有 Home 指示条 |  方向切换自动调整  |

## 三 如何在代码中使用 Safe Area

### 3.1 通过 safeAreaInsets 直接读取边距

```
1、代码
let safeInsets = view.safeAreaInsets
print("top: \(safeInsets.top), bottom: \(safeInsets.bottom)")

2、说明
-iPhone 8 → top=20, bottom=0
-iPhone X → top=44, bottom=34
-iPhone 14 Pro → top≈59, bottom=34

3、注意：
safeAreaInsets 只有在 视图已经布局完成后（viewDidLayoutSubviews） 才能取到正确值。
```

### 3.2 Auto Layout 布局中使用

```
1、推荐使用系统提供的约束

yourView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor)
yourView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)

2、或者使用 Interface Builder（Storyboard）中勾选
「Constrain to margins」 → 「Safe Area」

统会自动在不同设备上计算合适的间距。
```

### 3.3 手动调整安全区域（自定义沉浸式 UI）

```
1、如果你需要内容延伸到状态栏或底部区域，可以修改：

additionalSafeAreaInsets = UIEdgeInsets(top: -44, left: 0, bottom: -34, right: 0)

2、或者：
edgesForExtendedLayout = [.top, .bottom]


3、场景：
这在视频播放、相机预览、全屏图片等场景中常用
```

## 四 在 SwiftUI 中的安全区域

SwiftUI 已内置安全区支持。常见用法如下：

### 4.1 默认：自动避开系统 UI

```
VStack {
    Text("内容")
}
```

### 4.2 忽略安全区（全屏显示）

```
VStack {
    Text("全屏内容")
}
.ignoresSafeArea() // 全屏渲染
```

### 4.3 仅忽略某个方向的 Safe Area

```
.ignoresSafeArea(.all, edges: .bottom)
```

## 五 跨平台映射（Flutter / RN / Compose 对照）

|         平台          |                对应概念                |          说明          |
| :-------------------: | :------------------------------------: | :--------------------: |
|       iOS UIKit       |  safeAreaInsets / safeAreaLayoutGuide  |      官方原生方案      |
|        SwiftUI        |           .ignoresSafeArea()           |  SwiftUI 的安全区控制  |
|        Android        | WindowInsetsCompat / fitsSystemWindows | 对应状态栏、导航栏适配 |
|        Flutter        |     MediaQuery.of(context).padding     |  返回 Safe Area 边距   |
|     React Native      |              SafeAreaView              |  自动避开状态栏/刘海   |
| Compose Multiplatform |        WindowInsets.systemBars         |    Compose 适配 API    |

## 六 调试安全区域的小技巧

### 6.1 可以添加一个调试层看看 Safe Area

```
override func viewDidLayoutSubviews() {
    super.viewDidLayoutSubviews()
    let insets = view.safeAreaInsets
    print("SafeAreaInsets top:\(insets.top), bottom:\(insets.bottom)")
}
```

### 6.2 或在 SwiftUI 中：

```
.overlay(Text("SafeArea: \(UIApplication.shared.windows.first?.safeAreaInsets.debugDescription ?? "")"))
```

