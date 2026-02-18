---
title: IOS开发之——IOS与安卓组件对比-3
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 组件
  - 对比
abbrlink: '86691e61'
date: 2026-02-18 07:38:29
---
## 一 概述

```
本文介绍：
 - iOS(SwiftUI/UIKit)与 Android(Jetpack Compose/XML)的组件
 - 分为:基础布局、交互控件、列表与适配器、弹窗与提示、进度与反馈、图片与媒体、数据与表单以及高级组件
```

<!--more-->

## 二 对比

### 2.1 基础布局 (Layouts)

这是构建界面的基石，用于组织子视图的排列方式。

|  功能描述  |           iOS (SwiftUI / UIKit)            |           Android (Compose / XML)           |          备注          |
| :--------: | :----------------------------------------: | :-----------------------------------------: | :--------------------: |
|  垂直排列  |      VStack / UIStackView(.vertical)       |       Column / LinearLayout(vertical)       |      最常用的布局      |
|  水平排列  |     HStack / UIStackView(.horizontal)      |       Row / LinearLayout(horizontal)        |      最常用的布局      |
|  层叠布局  |        ZStack / UIView (addSubview)        |              Box / FrameLayout              | 用于覆盖效果(如加蒙版) |
|  滚动布局  |                 ScrollView                 |                 ScrollView                  |      单一方向滚动      |
|  网格布局  |        LazyVGrid / UICollectionView        | LazyVerticalGrid / RecyclerView(GridLayout) |      瀑布流或表格      |
|  相对布局  | RelativeLayout (UIKit 需手动约束) / Spacer |      ConstraintLayout / Modifier.align      |   复杂的相对位置关系   |
| 自适应布局 |               GeometryReader               |    BoxWithConstraints / ConstraintLayout    |     获取父容器尺寸     |
|  表单列表  |    Form / UITableView (Style: Grouped)     |   LazyColumn + Card / PreferenceFragment    |      设置页面常用      |

### 2.2 交互控件 (Interactive Controls)

用户直接操作的 UI 元素

|  功能描述  |                        iOS                         |               Android                |        备注        |
| :--------: | :------------------------------------------------: | :----------------------------------: | :----------------: |
|    按钮    |                 Button / UIButton                  |       Button / AppCompatButton       |    可自定义样式    |
| 文本输入框 |              TextField / UITextField               |         TextField / EditText         |      单行输入      |
| 多行文本框 |              TextEditor / UITextView               | BasicTextField (maxLines) / TextView |      多行输入      |
|    开关    |                 Toggle / UISwitch                  |        Switch / SwitchCompat         |    开 / 关状态     |
|   复选框   |       Toggle(isOn:) (自定义样式) / UIButton        |     Checkbox / MaterialCheckbox      |        多选        |
|  单选按钮  |          Picker (Segmented) / UIButton组           |  RadioButton / MaterialRadioButton   |        单选        |
|    滑块    |                 Slider / UISlider                  |           Slider / SeekBar           |     连续值选择     |
|   步进器   |                Stepper / UIStepper                 |  NumberPicker / 自定义 Compose 组件  |      整数增减      |
|  日期选择  |             DatePicker / UIDatePicker              |   DatePicker / MaterialDatePicker    |  选择时间 / 日期   |
|  下拉选择  |            Picker (Menu) / UIPickerView            |        DropdownMenu / Spinner        |    弹出列表选择    |
| 分段控制器 | Picker(selection: .segmented) / UISegmentedControl |      TabRow / RadioGroup (模拟)      | 顶部或中部的选项卡 |
|   搜索框   |             SearchField / UISearchBar              |   SearchBar / AppCompatSearchView    | 带放大镜图标的输入 |

### 2.3 列表与集合 (Lists & Collections)

用于展示大量数据

| 功能描述 |                   iOS                   |                 Android                  |        备注        |
| :------: | :-------------------------------------: | :--------------------------------------: | :----------------: |
|  长列表  |           List / UITableView            |        LazyColumn / RecyclerView         | 复用视图，性能优化 |
| 网格列表 |      LazyVGrid / UICollectionView       |  LazyVerticalGrid / RecyclerView(Grid)   |      多列展示      |
|  瀑布流  | UICollectionView (CompositionalLayout)  |       RecyclerView (StaggeredGrid)       |  高度不固定的网格  |
| 侧滑删除 | onDelete modifier / UITableView Editing |     SwipeToDismiss / ItemTouchHelper     |   列表项滑动操作   |
| 下拉刷新 |     Refreshable / UIRefreshControl      |     PullRefresh / SwipeRefreshLayout     |      刷新数据      |
| 上拉加载 |  onAppear 检测 / UIScrollViewDelegate   | LazyListState 检测 / EndlessRecyclerView |    加载更多数据    |

### 2.4 弹窗与提示 (Popups & Alerts)

用于打断流程或提供额外信息。

|    功能描述    |                       iOS                       |                       Android                        |           备注           |
| :------------: | :---------------------------------------------: | :--------------------------------------------------: | :----------------------: |
|    警告弹窗    |        Alert / UIAlertController(.alert)        |       AlertDialog / MaterialAlertDialogBuilder       |       系统样式弹窗       |
|    底部弹窗    |  ActionSheet / UIAlertController(.actionSheet)  |         ModalBottomSheet / BottomSheetDialog         |        从底部滑出        |
|    全屏覆盖    |   fullScreenCover / UIModalPresentationStyle    |            Dialog (fullscreen) / Activity            |    覆盖整个屏幕的弹窗    |
| 轻提示 (Toast) |   Toast (SwiftUI 需自定义) / UIAlertView (旧)   |                   Toast / Snackbar                   |    短暂提示，不可交互    |
|    Snackbar    | Snackbar (iOS 16+ SwiftUI) / TSMessage (第三方) |               Snackbar / SnackbarHost                | 底部提示，可交互(带按钮) |
|  指示器 (HUD)  | ProgressView (overlay) / MBProgressHUD (第三方) | CircularProgressIndicator (overlay) / ProgressDialog |        加载中遮罩        |

### 2.5 进度与反馈 (Progress & Feedback)

展示任务进度或状态。

|  功能描述  |                        iOS                        |                         Android                         |      备注       |
| :--------: | :-----------------------------------------------: | :-----------------------------------------------------: | :-------------: |
| 圆形进度条 | ProgressView (circular) / UIActivityIndicatorView | CircularProgressIndicator / ProgressBar(style=circular) |     加载中      |
| 线性进度条 |      ProgressView (linear) / UIProgressView       | LinearProgressIndicator / ProgressBar(style=horizontal) | 下载 / 上传进度 |
|   评分条   |     RatingView (需自定义) / HCSStarRatingView     |              RatingBar / MaterialRatingBar              |    星级评分     |
|   分割线   |             Divider / UIView (背景色)             |                Divider / View (height=1)                |   分隔列表项    |

### 2.6 图片与媒体 (Images & Media)

展示视觉内容。

| 功能描述 |                    iOS                    |          Android          |        备注        |
| :------: | :---------------------------------------: | :-----------------------: | :----------------: |
| 图片视图 |            Image / UIImageView            |     Image / ImageView     | 加载本地或网络图片 |
| 网络图片 |          AsyncImage / SDWebImage          | AsyncImage / Coil / Glide |   自动缓存、加载   |
|   图标   | Image(systemName:) (SF Symbols) / UIImage |   Icon / VectorDrawable   |    矢量图标支持    |
| WebView  |            WebView / WKWebView            | WebView / AndroidWebView  |      展示网页      |
| 视频播放 |   VideoPlayer / AVPlayerViewController    |  VideoPlayer / ExoPlayer  | 播放本地或网络视频 |

### 2.7 数据与表单 (Data & Forms)

处理用户输入和数据展示。

| 功能描述 |                   iOS                    |              Android               |           备注           |
| :------: | :--------------------------------------: | :--------------------------------: | :----------------------: |
|   图表   | SwiftUICharts (iOS 16+) / Charts (UIKit) | MPAndroidChart / Compose UI Charts |     折线图、柱状图等     |
|  二维码  |        CodeScanner / AVFoundation        |       BarcodeScanner / ZXing       |     扫描或生成二维码     |
|   地图   |         Map (MapKit) / MKMapView         |    Map (Maps Compose) / MapView    | 集成高德 / 百度 / Google |
|   日历   |   CalendarView (需自定义) / FSCalendar   |  CalendarView / Compose Calendar   |         月历视图         |

### 2.8 高级 / 容器组件 (Advanced/Containers)

用于构建复杂的页面结构。

| 功能描述 |                    iOS                     |                  Android                   |        备注        |
| :------: | :----------------------------------------: | :----------------------------------------: | :----------------: |
| 页面导航 |  NavigationStack / UINavigationController  |       NavHost / NavigationComponent        |  页面跳转、栈管理  |
| 底部标签 |        TabView / UITabBarController        |        BottomNavigation / TabLayout        |   应用主界面常用   |
| 抽屉菜单 |    SidebarList / UISplitViewController     |   ModalDrawer / NavigationView (Drawer)    |     侧边栏菜单     |
| 卡片视图 |     Card (需自定义) / UIView (shadow)      |          Card / MaterialCardView           | 带阴影和圆角的容器 |
| 折叠面板 | DisclosureGroup / UITableView (expandable) |     ExpandableCard / CollapsingToolbar     |  展开 / 收起内容   |
| 视差滚动 |        ScrollView + GeometryReader         | NestedScrollView + CollapsingToolbarLayout | 头部图片随滚动缩放 |

## 三 总结：核心差异点

```
1、声明式 vs 命令式 (当前主流)：
-iOS: 官方已全面转向 SwiftUI(声明式)，但UIKit(命令式) 依然是存量代码的主力。
-Android: 官方已全面转向 Jetpack Compose(声明式)，但 XML + Kotlin/Java(命令式) 依然广泛使用。

2、列表性能：
iOS: UITableView 和 UICollectionView 是业界标杆，复用机制极其成熟。
SwiftUI 的 List 和 LazyVGrid 在底层也是基于它们实现的。

Android: RecyclerView 是 Android 的列表王者，性能极佳。
Compose 的 LazyColumn 也是基于 RecyclerView 的思想实现的。

3、组件一致性：
iOS: 系统组件(UIKit)的样式非常统一，很难做出颠覆性的改变，
这保证了 App 风格符合 iOS 设计规范 (Human Interface Guidelines)。

Android: 系统组件(Material Design)高度可定制，
开发者可以轻松修改颜色、形状、动画，甚至完全重写一个组件的外观。

4、特殊组件：
iOS 特有：UISegmentedControl(分段控制器)、UIDatePicker(滚轮式日期选择)、SF Symbols(系统图标库)。
Android 特有：Snackbar(底部交互提示)、DrawerLayout(抽屉)、ConstraintLayout(强大的相对布局)。
```

