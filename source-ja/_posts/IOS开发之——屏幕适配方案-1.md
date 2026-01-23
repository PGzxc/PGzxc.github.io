---
title: IOS开发之——屏幕适配方案(1)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 78af5f98
date: 2025-12-19 08:51:28
---
## 一 概述

```
本文介绍以下内容：
 - 屏幕构成
 - 如何适配
 - 常用三方库
 - 沉浸式
 - 折叠屏
```

<!--more-->

## 二 iOS 设备屏幕构成(基础概念)

iOS 的 UI 区域主要由以下部分组成：

### 2.1 状态栏(Status Bar)

```
1、状态栏
-显示时间、电量、信号等
-iPhone 全面屏（刘海屏）高度：44pt
-传统屏幕：20pt
-iPad Pro：24pt 或 20pt

2、说明
-iOS 不再允许强制隐藏状态栏，高度需要通过 Safe Area 适配。
```

### 2.2 刘海(Notch)/ 动态岛(Dynamic Island)区域

```
-iPhone X 以后都有刘海/动态岛
-不能放 UI
-系统通过 Safe Area Insets 自适应，不需要开发者关心具体尺寸
```

### 2.3 Home Indicator(底部横条)

```
-高度：34pt(iPhone X 及以后)
-非实体 Home 的机型都有
-通过 Safe Area 自动处理
```

### 2.4 Safe Area 安全区

2.4.1-iOS 最重要的适配概念，解决

```
-刘海区遮挡
-Home Indicator 遮挡
-状态栏高度变化
-iPad 分屏 / 多窗口
```

2.4.2-安全区四边 Insets 示例

|     机型      | Top  | Bottom | Left/right |
| :-----------: | :--: | :----: | :--------: |
| iPhone 14 Pro |  59  |   34   |     0      |
|   iPhone 8    |  20  |   0    |     0      |
|   iPad Pro    |  24  |   20   |     0      |

### 2.5 Navigation Bar/Tab Bar

系统栏尺寸(pt)

|                    控件                    |         高度         |
| :----------------------------------------: | :------------------: |
|               Navigation bar               |          44          |
| Status bar + Navigation bar = 88（全面屏） |                      |
|                  Tab bar                   | 49 + SafeArea.bottom |

### 2.6 键盘区域(Keyboard Frame)

```
-键盘弹起高度 不固定
-必须监听键盘显示事件适配输入框
```

## 三 iOS 如何进行屏幕适配

### 3.1 使用 AutoLayout(约束)

```
1、iOS 官方标准：
-NSLayoutConstraint
-AutoLayout
-Visual Format
-Masonry/SnapKit（更现代）

2、使用约束即可适配：
-新机型尺寸变化
-横竖屏
-iPad 分屏
-刘海/动态岛
```

### 3.2 使用 Safe Area(最关键)

```
1、Swift 示例
let guide = view.safeAreaLayoutGuide
myView.topAnchor.constraint(equalTo: guide.topAnchor).isActive = true

2、React Native
import { SafeAreaView } from 'react-native';

<SafeAreaView style={{ flex: 1 }}>
  <YourScreen />
</SafeAreaView>

3、Flutter
SafeArea(
  child: YourWidget(),
)
```

### 3.3 使用 size classes(大小分类)

3.3.1-iOS 的布局会根据界面大小改变

|  方向  | iPhone 竖屏 |   iPhone 横屏   |  iPad   |
| :----: | :---------: | :-------------: | :-----: |
| Width  |   Compact   | Compact/Regular | Regular |
| Height |   Regular   |     Compact     | Regular |

3.3.2-用途

```
iPad 分屏布局变化
横竖屏 UI 改变（如列表变两栏）
```

### 3.4 针对不同设备尺寸做自适应布局

```
1、可以根据
UIScreen.main.bounds.size
UIScreen.main.nativeBounds
UIScreen.main.scale

做：
-字体自适应
-布局比例
-间距策略（大屏更宽松）
```

### 3.5 键盘适配

```
iOS 必须监听：
UIResponder.keyboardWillShowNotification
UIResponder.keyboardWillHideNotification

否则输入框会被遮挡。
```

## 四 常用三方库(强烈推荐)

### 4.1 SnapKit(AutoLayout 语法糖)

```
最火的布局库:
view.snp.makeConstraints { make in
    make.top.equalToSuperview().offset(10)
}
```

### 4.2 IGListKit(复杂列表)

```
Instagram 官方开源：
-高性能
-适合动态列表布局
```

### 4.3 FLAnimatedImage

```
高性能 GIF 渲染库
```

### 4.4 Kingfisher / SDWebImage

```
自动适配屏幕分辨率加载图片。
```

### 4.5 IQKeyboardManager

```
键盘自动避让神器，输入框不再被遮挡
```

### 4.6 DeviceKit

```
判断设备型号、安全区等：

if Device.current.hasSensorHousing {
  // 刘海屏
}
```

## 五  沉浸式/全屏(iOS 最新规范)

iOS 沉浸式不像安卓那样能「完全隐藏状态栏」，但可以达到全屏效果

### 5.1 隐藏 NavigationBar / TabBar

```
navigationController?.setNavigationBarHidden(true, animated: true)
tabBarController?.tabBar.isHidden = true
```

### 5.2 内容延伸到安全区外

```
override func viewDidLoad() {
    super.viewDidLoad()
    self.edgesForExtendedLayout = .all
}
```

### 5.3 全屏视频/相册必须使用 SafeAreaInsets 做 padding

```
let inset = view.safeAreaInsets
playerView.frame = view.bounds.inset(by: inset)
```

### 5.4 iPhone X 以后全屏必须适配 HomeIndicator

```
可自动隐藏：

override func prefersHomeIndicatorAutoHidden() -> Bool {
    return true
}
```

### 5.5 适配折叠屏(iPhone Fold 未来机型思路)

```
苹果折叠屏尚未上市，但 iOS 的适配方案已完全准备好：

1、使用 AutoLayout，它会自动响应折叠尺寸变化
折叠时：
-size class 会发生变化
-屏幕宽度可能翻倍
-旋转监听可保持布局一致

2、iPad 分屏 = 折叠屏最佳模拟

折叠屏的情况可借鉴：
-不同折叠角度 = 不同窗口宽度
-iPad SlideOver/分屏几乎一样
```

