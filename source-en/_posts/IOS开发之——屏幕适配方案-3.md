---
title: IOS开发之——屏幕适配方案(3)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 4a993d1a
date: 2025-12-21 08:29:46
---
## 一 概述

```
本文介绍以下内容：
- 安卓和iOS对比
-适配方案
```

<!--more-->

## 二 安卓和iOS对比

|            Android 痛点             |          iOS 对应概念(1:1 映射)           |               推荐写法(Swift + SwiftUI 双版本)               |                          说明                          |
| :---------------------------------: | :---------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------: |
|        1. 状态栏(Status Bar)        |      状态栏 + 灵动岛(Dynamic Island)      | SwiftUI：.ignoresSafeArea(.container, edges: .top) 只在真正需要全屏时用 UIKit：additionalSafeAreaInsets.top | 正常情况永远不要隐藏状态栏，让它叠在你的内容上面才现代 |
|     2. 刘海区 / Display Cutout      | safeAreaInsets.top(已自动包含刘海/灵动岛) |                    自动处理，无需额外代码                    |       iOS 从 2017 年 iPhone X 起就彻底解决的问题       |
|        3. 安全区(Safe Area)         |  Safe Area Layout Guide / safeAreaInsets  |            推荐做法(等价于 Android Edge-to-Edge)             |                                                        |
|     4. 导航栏 / Home Indicator      |     safeAreaInsets.bottom(小白条区域)     |                                                              |                                                        |
|       5. 手势区(Gesture Area)       |   左右边缘手势区(已包含在 safeArea 中)    |                                                              |                                                        |
| 6. Edge-to-Edge(内容延伸到屏幕边缘) |        让内容铺满 + 系统栏透明叠加        |                     一套代码搞定所有机型                     |                                                        |

## 三 推荐的 iOS 终极适配方案

### 3.1 方案一：UIKit 版(参考 Android Edge-to-Edge 标准流程)

```
class BaseViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // 1. 关闭旧的 fitsSystemWindows（对应 Android setDecorFitsSystemWindows(false)）
        // iOS 根本没有这个 API，默认就是 false！所以什么都不用写
        
        // 2. 背景延伸到屏幕边缘（包括状态栏、灵动岛、小白条）
        view.backgroundColor = .systemBackground
        
        // 3. 关键控件主动避开安全区（对应 Android add padding via WindowInsets）
        let safeGuide = view.safeAreaLayoutGuide
        
        contentView.snp.makeConstraints { make in
            make.top.equalTo(safeGuide)        // 自动避开状态栏+灵动岛
            make.leading.trailing.equalTo(safeGuide)
            make.bottom.equalTo(safeGuide)     // 自动避开小白条
        }
        
        // 4. 如果你想让顶部的标题栏想和 Android 一样贴顶但不被遮盖
        titleBar.snp.makeConstraints { make in
            make.top.equalTo(view.snp.topMargin)  // iOS 15+ 推荐写法，等价于 Android systemWindowInsetTop
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(44)
        }
    }
}
```

### 3.2 方案二：SwiftUI 版(2025 年主流写法)

```
struct ContentView: View {
    var body: some View {
        ZStack {
            Color(.systemBackground)
                .edgesIgnoringSafeArea(.all)           // 背景铺满（对应 Android draw behind system bars）
            
            VStack(spacing: 0) {
                // 顶部标题栏（贴顶但不被灵动岛遮盖）
                HStack {
                    Text("标题")
                        .font(.title2.bold())
                    Spacer()
                }
                .padding(.horizontal)
                .frame(height: 44)
                .frame(maxWidth: .infinity)
                .background(.ultraThinMaterial)           // 毛玻璃，现代感拉满
                .padding(.top, UIApplication.shared.topSafeArea) // 关键一行！等价于 Android systemWindowInsetTop
                
                ScrollView {
                    LazyVStack(spacing: 16) {
                        ForEach(0..<50) { i in
                            Text("内容 \(i)").padding()
                                .frame(maxWidth: .infinity)
                                .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
                        }
                    }
                    .padding()
                }
            }
            .ignoresSafeArea(edges: .bottom) // 可选：内容延伸到小白条下面
        }
    }
}

// 扩展：一行代码获取顶部/底部安全区（对应 Android WindowInsets.getSystemWindowInsetXXX）
extension UIApplication {
    static var topSafeArea: CGFloat {
        let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene
        return scene?.windows.first?.safeAreaInsets.top ?? 0
    }
    static var bottomSafeArea: CGFloat {
        let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene
        return scene?.windows.first?.safeAreaInsets.bottom ?? 0
    }
}
```

## 四 iOS 沉浸式(对应 Android Immersive Mode)

|          需求          |                      iOS 实现(一行代码)                      |
| :--------------------: | :----------------------------------------------------------: |
| 隐藏状态栏(视频/游戏)  |      override var prefersStatusBarHidden: Bool { true }      |
|  隐藏小白条(全屏游戏)  | iOS 不允许彻底隐藏，但可以透明：内容用 .ignoresSafeArea() 铺满即可 |
| 手势滑动临时显示状态栏 |                      自动支持，无需代码                      |

## 五 总结：iOS 版「Android 式」适配清单

### 5.1 代码

```
// 1. 背景铺满（Edge-to-Edge）
edgesIgnoringSafeArea(.all)           // SwiftUI
view.backgroundColor extends to edges  // UIKit 自动

// 2. 关键内容自动避开安全区
safeAreaLayoutGuide                   // UIKit
.ignoresSafeArea() 只在背景用         // SwiftUI

// 3. 顶部工具栏想贴顶但不被遮
padding(.top, UIApplication.topSafeArea)

// 4. 底部想延伸到小白条下面
.ignoresSafeArea(edges: .bottom)

// 5. 刘海/灵动岛/圆角/挖孔
什么都不用做，safeArea 已经全部处理好了
```

### 5.2 一句话总结

```
-Android 屏幕适配要写 100 行代码防御性编程，
-iOS 只要老老实实「拥抱 Safe Area」这一个概念，
-99.9% 的情况 0 行额外代码就完美适配所有苹果设备(包括未来的 Vision Pro)
```

