---
title: IOS开发之——IOS与安卓组件对比-2
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 组件对比
abbrlink: f16e2ef7
date: 2026-02-17 08:28:12
---
## 一 概述

```
本文介绍：
 - iOS(UIKit/SwiftUI)和Android(View系统/Jetpack Compose)原生组件进行分类归纳和总体总结
 - 分类覆盖导航、输入、选择、显示、反馈、动作及其他
```

<!--more-->

## 二 对比

### 2.1 导航类组件

|   子类    |          iOS           |          Android          |           关键差异           |
| :-------: | :--------------------: | :-----------------------: | :--------------------------: |
| 返回/后退 | Back Button + 左滑手势 | 系统返回键 + App Bar Back |        iOS 更依赖手势        |
| 底部标签  |   Tab Bar / TabView    |   Bottom Navigation Bar   |      iOS 支持 More 溢出      |
|  顶部栏   |     Navigation Bar     |     App Bar / Toolbar     | iOS 标题居中，Android 左对齐 |
| 侧边菜单  |   无原生(常用 Sheet)   |     Navigation Drawer     |       Android 标准侧滑       |

### 2.2 输入与选择类组件

|   子类    |                   iOS                   |                 Android                  |            关键差异            |
| :-------: | :-------------------------------------: | :--------------------------------------: | :----------------------------: |
|   按钮    |            UIButton / Button            | Button / ElevatedButton / OutlinedButton | Android 样式更多样(阴影、轮廓) |
| 开关/滑块 |           UISwitch / UISlider           |             Switch / Slider              |  外观类似，Android 更可自定义  |
| 文本输入  |         UITextField / TextField         |      TextField / OutlinedTextField       |      Android 支持浮动标签      |
|  单/多选  | SegmentedControl 或 TableView Checkmark |          RadioButton / CheckBox          |       Android 有专用控件       |
| 下拉/日期 |       UIPickerView / UIDatePicker       |           Spinner / DatePicker           |  iOS 滚轮式，Android 对话框式  |
| 分段选择  |           UISegmentedControl            |       SegmentedButton (Material 3)       |     Material 3 更接近 iOS      |

### 2.3 显示类组件

|        子类         |                             iOS                              |                Android                |               关键差异               |
| :-----------------: | :----------------------------------------------------------: | :-----------------------------------: | :----------------------------------: |
|      列表/网格      |            UITableView / UICollectionView / List             |   RecyclerView / LazyColumn / Grid    |          Android 回收更高效          |
|      卡片/标签      |                        无专用(自定义)                        |              Card / Chip              |           Android 材质感强           |
|      进度/刷新      |              UIProgressView / UIRefreshControl               |   ProgressBar / SwipeRefreshLayout    |         Android 支持上拉加载         |
| 页面滑动 (PageView) |                                                              |                                       |                                      |
|      水平滑动       | UIPageViewController / TabView(.page) / ScrollView + paging (iOS 17+) |     ViewPager2 / HorizontalPager      |       Android 更现代、懒加载强       |
|      竖直滑动       | UIPageViewController (.vertical) / ScrollView + pagingBehavior | ViewPager2 (VERTICAL) / VerticalPager | Android 原生支持更好(TikTok 式 feed) |
|     页面指示器      |                        UIPageControl                         |        自定义或 TabLayout dots        |             iOS 原生点状             |

### 2.4 反馈与动作类组件

|    子类     |                 iOS                 |            Android             |                   关键差异                    |
| :---------: | :---------------------------------: | :----------------------------: | :-------------------------------------------: |
| 对话框/提示 |   UIAlertController / ActionSheet   | AlertDialog / Snackbar / Toast | iOS 从底部弹出动作表，Android Snackbar 带动作 |
|  加载指示   |       UIActivityIndicatorView       |       ProgressIndicator        |           Android 支持线性/圆形多种           |
|  主要动作   |             导航栏按钮              |  Floating Action Button (FAB)  |             Android FAB 浮动突出              |
|  底部模态   | ActionSheet / BottomSheet (iOS 13+) |       BottomSheetDialog        |                   功能类似                    |

### 2.5 其他类组件

|   子类    |        iOS        |     Android     |         关键差异         |
| :-------: | :---------------: | :-------------: | :----------------------: |
|  搜索栏   |    UISearchBar    |    SearchBar    | Android 支持折叠 App Bar |
| 分隔/徽章 | Separator / Badge | Divider / Badge |           类似           |

### 2.6 PageView

|  平台   |                    组件                     |             本质             |
| :-----: | :-----------------------------------------: | :--------------------------: |
|   iOS   | **UIPageViewController** / UICollectionView |    Layer 合成 + 手势驱动     |
| Android |                 ViewPager2                  | RecyclerView + LayoutManager |
| SwiftUI |               TabView(.page)                |  UIPageViewController 封装   |
| Compose |                    Pager                    |  LazyLayout + Compose 渲染   |

2-说明

```
iOS：分页是“系统级组件”
Android：分页是“列表的特殊形态”
```

