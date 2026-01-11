### <font color=red>二 Android项目</font>

#### 1—[SwiperAndroid](https://github.com/PGzxc/SwiperAndroid)

**项目归属**：个人项目
**项目名称**：SwiperAndroid(私密)
**项目地址**：https://github.com/PGzxc/SwiperAndroid
**软件支持**：Android
**开发工具**：Android Studio(2025.2.2)+Java(17.0.15)+Gradle(8.14.3)+Kotlin(2.0.21)+Trae
**项目描述**：独立开发的 Android 短视频 + 图集浏览应用，采用 Jetpack Compose 实现现代化声明式 UI；产品形态对标抖音/小红书短视频与图文社区，提供流畅的视频/图片滑动浏览、分类查看及全屏沉浸式交互体验。     
**功能模块**：

* 首页：同城 / 关注 / 推荐多标签内容流，支持左右滑动切换
* 图集：图片瀑布流展示，支持分类与分页加载
* 发布：内容发布入口，包含交互动画反馈
* 消息：系统通知与用户互动消息
* 我：用户信息、作品列表与设置管理

**技术要点**：

- 架构设计：采用 MVVM 架构，基于 ViewModel 实现 UI 与业务逻辑解耦
- UI框架：使用 Jetpack Compose 构建声明式 UI，实现响应式布局与流畅动画
- 状态管理：通过 Compose State + LaunchedEffect + ViewModel 管理页面状态与副作用
- 网络与数据： 集成 Retrofit + OkHttp + Gson + Coroutines，实现高效异步网络请求与数据解析
- 视频播放：ExoPlayer 实现列表自动播放、全屏切换及播放控制(StyledPlayerView)
- 图片处理：Glide 实现高效缓存与加载，优化长列表滚动性能
- 手势交互：基于 Compose 手势 API 实现图片缩放、下滑关闭等沉浸式交互体验
- 屏幕适配：响应式布局 + WindowInsets，适配异形屏、系统栏及各种屏幕尺寸
- 构建与依赖：Gradle Kotlin DSL + Version Catalog + Compose BOM 统一管理依赖与版本
- 多 ABI 支持：合理拆分 ABI，提升安装包体积与兼容性

**项目预览**

| ![][swiperaz-1] | ![][swiperaz-2] | ![][swiperaz-3] |
| :-------------: | :-------------: | :-------------: |
| ![][swiperaz-4] | ![][swiperaz-5] | ![][swiperaz-6] |
| ![][swiperaz-7] | ![][swiperaz-8] | ![][swiperaz-9] |

#### 2—[WanAndroid_ComposeUI](https://github.com/PGzxc/WanAndroid_ComposeUI)

**项目归属**：个人项目
**项目名称**：WanAndroid_ComposeUI
**项目地址**：https://github.com/PGzxc/WanAndroid_ComposeUI
**软件支持**：Android
**开发工具**：Android Studio(2022.2.1)+Java(17.0.6)+Gradle(8.0-bin)+Kotlin(1.7.20)
**项目描述**：该项目是基于WanAndroid 网站开源的接口 API制作的一款Android ComposeUI开源App。借助于ComposeUI提供的布局(Row、Column、Box)和组件(Text、Button、Card、TabRow等) 快速实现界面布局并及时查看界面预览，利用Okhttp3+ Retrofit2+Converter-Gson执行网络请求和数据封装，快速实现个人App开发。     
**功能模块**：首页、导航、项目、消息、我、设置等   
**技术要点**：

- 基于Okhttp3+ Retrofit2+Converter-Gson构建项目网络访问框架
- 基于PersistentCookieJar自动保存登录Cookie
- 基于Lifecycle-Viewmodel构建MVVM框架
- 基于navigation-compose构建页面导航
- 基于accompanist-pager实现分页布局支持
- 基于accompanist-swiperefresh实现页面刷新
- 基于accompanist-webview显示网页详情
- 基于accompanist-flowlayout实现流式布局
- 基于mmkv保存永久存储数据
- material-icons-core、material-icons-extended使用系统图标

**项目预览**

| ![][com-az-1] | ![][com-az-2]  | ![][com-az-3]  | ![][com-az-4]  |
| ------------- | -------------- | -------------- | -------------- |
| ![][com-az-5] | ![][com-az-6]  | ![][com-az-7]  | ![][com-az-8]  |
| ![][com-az-9] | ![][com-az-10] | ![][com-az-11] | ![][com-az-12] |

#### 3—[直播Live ](https://github.com/PGzxc/Live)

**项目归属** ：个人项目
**项目名称**：Android 项目—直播 Live
**软件支持**：Android 6.0 以上
**项目地址**：https://github.com/PGzxc/Live
**开发工具**：Android Studio + Github
**项目描述**：直播 Live 是一个个人开源项目，仿照“映客”直播平台的交互和功能设计，涵盖首页、附近、直播、关注、我的等核心模块。项目实现直播间聊天、弹幕、礼物特效等核心功能，支持上下拉刷新与多种内容展示布局。     
**功能模块**：首页，附近、直播、关注、我等   
**技术要点**：

- 基于Bottom Bar+Fragmentation+DataBinding构建开发框架
- 基于七牛云实现推流(PLDroidMediaStreaming)和拉流(PLDroidPlayer)
- 基于环信聊天室实现直播间聊天
- 基于BaseRecycleViewAdapterHelper实现多种布局
- 基于SmartReFreshLayout实现下拉刷新和上拉加载
- 基于HeartLayout实现点心动画
- 基于ViewAnimator实现聊天弹幕和礼物特效
- 使用RAP模拟接口数据

**项目预览**

| ![][live-1] | ![][live-2]  | ![][live-3] | ![][live-4] |
| ----------- | ------------ | ----------- | ----------- |
| ![][live-5] | ![][live-6]  | ![][live-7] | ![][live-8] |
| ![][live-9] | ![][live-10] | ![][live-11]| ![][live-12]|
| ![][live-13]| ![][live-14] | ![][live-15]| ![][live-16]|
| ![][live-17]| ![][live-18] | ![][live-19]| ![][live-20]|


<!--swiper-android-->
[swiperaz-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-1-rec-play.png
[swiperaz-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-2-rec-pause.png
[swiperaz-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-3-focus.png
[swiperaz-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-4-city.png
[swiperaz-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-5-first.png
[swiperaz-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-6-big.png
[swiperaz-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-7-pub.png
[swiperaz-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-8-msg.png
[swiperaz-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperaz-9-me.png


<!--android-WanAndroid_ComposeUI-->
[com-az-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-home-1.png
[com-az-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-tree-2.png
[com-az-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-project-3.png
[com-az-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-msg-4.png
[com-az-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-msg-5.png
[com-az-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-msg-6.png
[com-az-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-me-7.png
[com-az-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-me-8.png
[com-az-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-login-9.png
[com-az-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-login-10.png
[com-az-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-setting-11.png
[com-az-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/compose-az-web-12.png

<!--自己的项目-live-->
[live-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-app-splash-1.png
[live-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-user-login.png
[live-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-main-recommend-3.png
[live-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-main-recommend-update-4.png
[live-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-main-small-video-5.png
[live-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-main-game-chiji-6.png
[live-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-nearby-live-7.png
[live-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-nearby-live-update-8.png
[live-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-play-type-choice-9.png
[live-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-care-people-10.png
[live-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-care-people-change-11.png
[live-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-me-view-12.png
[live-13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-rom-view-13.png
[live-14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-rom-view-update-14.png
[live-15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-rom-people-info-15.png
[live-16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-rom-gif-choice-16.png
[live-17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-rom-gif-send-17.png
[live-18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-rom-gif-send-18.png
[live-19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-room-input-message-19.png
[live-20]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-room-message-20.png
<!--live-chat-->
[live-hx-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-hx-user-register-1.png
[live-hx-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-hx-room-manager-2.png
[live-hx-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/live-hx-chat-room-3.png