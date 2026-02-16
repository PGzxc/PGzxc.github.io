---
title: IOS开发之——IOS与安卓组件对比-1
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 组件对比
abbrlink: 68677f4d
date: 2026-02-16 08:56:34
---
## 一 概述

```
下面给出 iOS 与 Android 组件(UI/框架层)对比的尽可能全面整理。
此对比覆盖：原生平台常用组件、容器、布局、交互控件、系统服务相关 UI 等，
并注明对应 API/类名(部分已包含 UIKit/SwiftUI & Android Views/Jetpack Compose)。
```

<!--more-->

## 二 对比

### 2.1 视图基础类/View 基础

| 功能类别 |             iOS (UIKit/SwiftUI)              |                  Android (View/Compose)                   |     说明     |
| :------: | :------------------------------------------: | :-------------------------------------------------------: | :----------: |
|   基类   | **UIView** / **View** (SwiftUI 的 View 协议) | **View** (android.view.View) / <br>**Modifier** (Compose) | 核心 UI 元素 |
|   容器   |             UIView(可添加子视图)             |                 ViewGroup / Compose 布局                  |   布局容器   |
| 视图层次 |                   subviews                   |                child Views / Compose slots                |  子元素关系  |

### 2.2 布局(Layout)

|  布局类型  |            iOS UIKit             |       iOS SwiftUI        |          Android View          |      Android Compose       | 说明              |
| :--------: | :------------------------------: | :----------------------: | :----------------------------: | :------------------------: | ----------------- |
|    线性    |           UIStackView            |      HStack/VStack       |          LinearLayout          |         Row/Column         | 水平/垂直排列     |
|  相对约束  | Auto Layout + NSLayoutConstraint | Layout 优先级、Alignment |         RelativeLayout         | ConstraintLayout (Compose) | 相对/约束布局     |
|  容器布局  |           UIScrollView           |    ScrollView / List     | FrameLayout / ConstraintLayout |   Box / ConstraintLayout   | 基础容器          |
|  表单布局  |           UITableView            |           List           |    ListView / RecyclerView     |         LazyColumn         | 列表/表格(懒加载) |
|    网格    |    UICollectionViewFlowLayout    |        LazyVGrid         |           GridLayout           |      LazyVerticalGrid      | 类似网格布局      |
| 自定义布局 |      自定义 layoutSubviews       |          Layout          |       onLayout/onMeasure       |      Modifier.layout       | 灵活布局          |

### 2.3 文本与输入

|    功能    |             iOS              |           Android           |             Compose              |
| :--------: | :--------------------------: | :-------------------------: | :------------------------------: |
|    文本    |      **UILabel** / Text      |          TextView           |               Text               |
| 可编辑文本 |   UITextField / UITextView   |          EditText           |    TextField / BasicTextField    |
|   富文本   | NSAttributedString / TextKit |       SpannableString       |         AnnotatedString          |
|   密码框   |   UITextField with secure    | EditText inputType=password | TextField (visualTransformation) |

### 2.4 按钮与交互控件

|   控件   |           iOS           |         Android          |                       Compose                       |
| :------: | :---------------------: | :----------------------: | :-------------------------------------------------: |
| 普通按钮 |        UIButton         |          Button          |          Button / TextButton / IconButton           |
| 图标按钮 |    UIButton (image)     |       ImageButton        |                     IconButton                      |
| 切换开关 |        UISwitch         |          Switch          |                       Switch                        |
| 单选按钮 |   UISegmentedControl    | RadioButton / RadioGroup |                  RadioButton + Row                  |
|  复选框  |            —            |         CheckBox         |                      Checkbox                       |
|   滑块   |        UISlider         |         SeekBar          |                       Slider                        |
|  步进器  |        UIStepper        |            —             |                          —                          |
| 活动指示 | UIActivityIndicatorView |  ProgressBar / Spinner   | CircularProgressIndicator / LinearProgressIndicator |

### 2.5 图像 & 媒体

|   功能    |                iOS                 |        Android        |           Compose           |
| :-------: | :--------------------------------: | :-------------------: | :-------------------------: |
| 显示图片  |            UIImageView             |       ImageView       |            Image            |
| 相机/图库 | UIImagePickerController / PHPicker |   CameraX / Intent    |    CameraX + Compose UI     |
| 视频播放  |      AVPlayer / AVPlayerLayer      | ExoPlayer / VideoView |     ExoPlayer + Compose     |
|   动画    |  UIView.animate + Core Animation   |     Animation API     | animate*AsState、Transition |

### 2.6 列表 / 表格 / 网格

|  列表类型   |         iOS         |          Android          |             Compose             |
| :---------: | :-----------------: | :-----------------------: | :-----------------------------: |
|  普通列表   |     UITableView     |       RecyclerView        |           LazyColumn            |
|  多列网格   |  UICollectionView   | RecyclerView (GridLayout) |        LazyVerticalGrid         |
| 选择 & 编辑 | UITableView editing |   Contextual ActionMode   | SwipeToDismiss / Selection APIs |

### 2.7 弹窗 / 模态 / 导航

|     类型     |                  iOS                   |         Android          |         Compose         |
| :----------: | :------------------------------------: | :----------------------: | :---------------------: |
|    Toast     |          —(可用 third-party)           |          Toast           |        Snackbar         |
|  Alert 弹窗  |           UIAlertController            |       AlertDialog        |       AlertDialog       |
| Action Sheet | UIAlertController (action sheet style) |    BottomSheetDialog     |    ModalBottomSheet     |
|    模态页    |         presentViewController          | startActivity / Fragment |  Navigation composable  |
|    导航栏    |         UINavigationController         | Toolbar + NavController  | NavHost + NavController |
|    标签页    |           UITabBarController           |   BottomNavigationView   |    BottomNavigation     |
|   分页控制   |             UIPageControl              |        ViewPager2        |   Pager (Accompanist)   |

### 2.8 手势 & 触控

|   功能   |            iOS            |       Android        |        Compose        |
| :------: | :-----------------------: | :------------------: | :-------------------: |
| 基本手势 | UITapGestureRecognizer 等 |   GestureDetector    | Modifier.pointerInput |
| 多点手势 |   UIPinch / UIRotation    | ScaleGestureDetector | Modifier.pointerInput |
|   拖拽   |     UIView drag APIs      |  View.DragListener   | Modifier.dragGesture  |

### 2.9 画布 & 绘图

|    功能    |           iOS            |    Android     |     Compose      |
| :--------: | :----------------------: | :------------: | :--------------: |
| 自定义绘制 | draw(_:) / Core Graphics | Canvas + Paint |      Canvas      |
|   矢量图   |     PDF/VectorAsset      | VectorDrawable |   ImageVector    |
|  硬件加速  |      Core Animation      |    GPU 渲染    | Compose 渲染管线 |

### 2.10 系统功能 & UI

|    功能     |                iOS                 |        Android        |             Compose             |
| :---------: | :--------------------------------: | :-------------------: | :-----------------------------: |
|  键盘事件   | UIResponder keyboard notifications |  InputMethodManager   | LocalSoftwareKeyboardController |
| 通知中心 UI |   UNNotificationContentExtension   | Notification Channels |   Snackbar/Notification APIs    |
|   权限 UI   |              系统弹窗              |     系统权限请求      |         Permissions API         |
| 锁屏/Widget |         Lock Screen UIkit          | Widgets / LockScreen  |         Not applicable          |

### 2.11 数据 & Bind/State

|   功能    |           iOS           |        Android         |         Compose          |
| :-------: | :---------------------: | :--------------------: | :----------------------: |
| 数据绑定  |      KVO / Combine      | DataBinding / LiveData |   State / MutableState   |
|  响应式   | Combine / SwiftUI State |    LiveData / Flow     |   State / SnapshotFlow   |
| MVVM 支持 | 和 Combine/SwiftUI 配合 |      强 MVVM 支持      | 基于 State/Flow 自然响应 |

### 2.12 生命周期 & 架构

|     层级     |              iOS               |          Android           |           Compose           |
| :----------: | :----------------------------: | :------------------------: | :-------------------------: |
| 视图生命周期 |   viewDidLoad/WillAppear 等    | onCreate/onStart/onResume… |    Compose 生命周期 API     |
| 页面生命周期 |   UIViewController 生命周期    | Activity/Fragment 生命周期 | Navigation + LifecycleOwner |
| 组件生命周期 | SwiftUI View 本质是 value type | ViewModel + LifecycleOwner | ViewModel + LifecycleOwner  |

### 2.13 界面声明方式对比

|        方式         |       iOS        |     Android     |
| :-----------------: | :--------------: | :-------------: |
| 传统 XML/Storyboard | Storyboard / XIB |   XML Layout    |
|      代码创建       |    Pure UIKit    |  Pure View API  |
|      声明式 UI      |     SwiftUI      | Jetpack Compose |
|      混合开发       | UIKit + SwiftUI  |  XML + Compose  |

### 2.14 开发体验对比点(声明式 vs. 命令式)

|      特点       |    SwiftUI     |     Jetpack Compose     |
| :-------------: | :------------: | :---------------------: |
|   数据驱动 UI   |       是       |           是            |
| 状态自动更新 UI |       是       |           是            |
|     Preview     | Xcode Previews | Android Studio Previews |
|    动画简化     |  内建动画 API  |   内建 Animation APIs   |

### 2.15 生态及扩展

|     项     |              iOS              |     Android     |
| :--------: | :---------------------------: | :-------------: |
| 社区扩展库 |      CocoaPods / SwiftPM      | Gradle / Maven  |
|  设计规范  |  Human Interface Guidelines   | Material Design |
|  主题支持  | UIAppearance / SwiftUI Themes |  Styles/Themes  |

### 2.16 核心对比总结(一眼看懂)

|    维度     |      iOS (UIKit/SwiftUI)       | Android (View/Compose) |
| :---------: | :----------------------------: | :--------------------: |
|   UI 基础   |     UIView / SwiftUI Views     |   View / Compose UI    |
|  列表控件   | UITableView / UICollectionView |      RecyclerView      |
|   声明式    |            SwiftUI             |    Jetpack Compose     |
|  传统布局   |          Auto Layout           |    XML + Constraint    |
| 输入 & 控件 |      UITextField/UIButton      |    EditText/Button     |
|    弹窗     |       UIAlertController        |   AlertDialog/Toast    |
|  设计规范   |        Human Interface         |    Material Design     |

