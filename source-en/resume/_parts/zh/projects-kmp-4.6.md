### <font color=red>六 Kotlin Multiplatform Mobile项目</font>

#### 1—[SwiperKMP](https://github.com/PGzxc/SwiperKMP)

**项目归属**：个人项目
**项目名称**：SwiperKMP(私密)
**项目地址**：https://github.com/PGzxc/SwiperKMP
**软件支持**：跨平台(Android、iOS、JVM、Web)
**开发工具**：IDEA(2025.3.1)+Compose Multiplatform(1.9.3)+Gradle(8.14.3)+AS+Xcode
**项目描述**：独立开发的跨平台短视频+图集浏览应用，采用Compose Multiplatform实现一次编写多平台运行的现代化声明式UI；产品形态对标抖音/小红书短视频与图文社区，提供流畅的视频/图片滑动浏览、分类查看及全屏沉浸式交互体验，支持Android、iOS、JVM等多平台。    
**功能模块**：

* 首页：同城/关注/推荐多标签内容流，支持左右滑动切换
* 图集：图片瀑布流展示，支持分类与分页加载
* 发布：内容发布入口，包含交互动画反馈
* 消息：系统通知与用户互动消息
* 我：用户信息、作品列表与设置管理

**技术要点**：

- 架构设计：采用跨平台架构，基于Kotlin Multiplatform实现代码共享，平台特定代码分离
- UI框架：使用Compose Multiplatform构建声明式UI，实现跨平台响应式布局与流畅动画
- 状态管理：通过Compose State + LaunchedEffect + ViewModel管理跨平台页面状态与副作用
- 网络与数据：Ktor + Kotlinx Serialization + Coroutines实现高效异步网络请求与数据解析
- 视频播放：跨平台视频播放，Android使用ExoPlayer，JVM使用JavaFX
- 图片处理：Coil实现跨平台高效缓存与加载，优化长列表滚动性能
- 手势交互：基于Compose手势API实现跨平台一致的图片缩放、下滑关闭等沉浸式交互体验
- 屏幕适配：响应式布局+平台特定WindowInsets处理，适配异形屏、系统栏及各种屏幕尺寸
- 构建与依赖：Gradle Kotlin DSL + Version Catalog统一管理跨平台依赖与版本
- 多平台支持：Android、iOS、JVM、Web多平台构建，平台特定代码最小化

**项目预览-Android**

| ![][swkmp-az-1]  | ![][swkmp-az-2]  | ![][swkmp-az-3] |
| :--------------: | :--------------: | :-------------: |
| ![][swkmp-az-4]  | ![][swkmp-az-5]  | ![][swkmp-az-6] |
| ![][swkmp-az-7]  | ![][swkmp-az-8]  | ![][swkmp-az-9] |
| ![][swkmp-az-10] | ![][swkmp-az-11] |                 |


**项目预览-IOS**

| ![][swkmp-ios-1]  | ![][swkmp-ios-2]  | ![][swkmp-ios-3] |
| :---------------: | :---------------: | :--------------: |
| ![][swkmp-ios-4]  | ![][swkmp-ios-5]  | ![][swkmp-ios-6] |
| ![][swkmp-ios-7]  | ![][swkmp-ios-8]  | ![][swkmp-ios-9] |
| ![][swkmp-ios-10] | ![][swkmp-ios-11] |                  |



#### 2—[WanAndroidKMP](https://github.com/PGzxc/WanAndroidKMP)

**项目归属**：个人项目
**项目名称**：WanAndroidKMP
**项目地址**：https://github.com/PGzxc/WanAndroidKMP
**软件支持**：Android+IOS+Desk(Mac/Windows/Linux)
**开发工具**：Android Studio(2022.3.1)+Java(17.0.6)+Gradle(8.0.2-bin)+Kotlin(1.9.0)
**项目描述**：本项目基于 WanAndroid API 开发，采用 Compose Multiplatform 实现跨平台界面构建，支持用户登录、注册、浏览文章、项目、导航与消息等核心功能。适配多端平台。     
**功能模块**：首页、导航、项目、消息、我、设置等   
**技术要点**：

- 基于模版compose-multiplatform-template创建项目
- 基于NavigationBar搭建底部导航框架
- 网络部分：ktor-core核心库+ktor-serialization-kotlinx-json序列化
- 基于Navigator实现界面间导航
- 基于kamel-image显示并加载网络图片
- 基于kstore-file和kstore实现跨平台文件及数据存储
- 基于compose.materialIconsExtended显示Icons图标

**项目预览**

Android截图

| ![][kmpwaz-az-1] | ![][kmpwaz-az-2] | ![][kmpwaz-az-3] |
| :--------------: | :--------------: | :--------------: |
| ![][kmpwaz-az-4] | ![][kmpwaz-az-5] | ![][kmpwaz-az-6] |
| ![][kmpwaz-az-7] | ![][kmpwaz-az-8] | ![][kmpwaz-az-9] |

IOS截图

| ![][kmpwaz-ios-1] | ![][kmpwaz-ios-2] | ![][kmpwaz-ios-3] |
| :---------------: | :---------------: | :---------------: |
| ![][kmpwaz-ios-4] | ![][kmpwaz-ios-5] | ![][kmpwaz-ios-6] |
| ![][kmpwaz-ios-7] | ![][kmpwaz-ios-8] | ![][kmpwaz-ios-9] |


<!--WanAndroid-az-->
[kmpwaz-az-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-home-1.png
[kmpwaz-az-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-navigator-2.png
[kmpwaz-az-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-project-3.png
[kmpwaz-az-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-msg-4.png
[kmpwaz-az-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-msg-5.png
[kmpwaz-az-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-me-6.png
[kmpwaz-az-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-me-7.png
[kmpwaz-az-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-login-8.png
[kmpwaz-az-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-az-register-9.png
<!--WanAndroid-ios-->
[kmpwaz-ios-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-home-1.png
[kmpwaz-ios-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-navigator-2.png
[kmpwaz-ios-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-project-3.png
[kmpwaz-ios-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-msg-4.png
[kmpwaz-ios-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-msg-5.png
[kmpwaz-ios-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-me-6.png
[kmpwaz-ios-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-me-7.png
[kmpwaz-ios-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-login-8.png
[kmpwaz-ios-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/kmpwaz-ios-register-9.png

<!--swiperkmp-az-->
[swkmp-az-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-1-home.png
[swkmp-az-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-2-pause.png
[swkmp-az-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-3-focus.png
[swkmp-az-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-4-city.png
[swkmp-az-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-5-album.png
[swkmp-az-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-6-other.png
[swkmp-az-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-7-big.png
[swkmp-az-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-8-pub.png
[swkmp-az-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-9-msg.png
[swkmp-az-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-10-me.png
[swkmp-az-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-az-11-me2.png

<!--swiperkmp-ios-->
[swkmp-ios-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-1-home.png
[swkmp-ios-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-2-pause.png
[swkmp-ios-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-3-focus.png
[swkmp-ios-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-4-city.png
[swkmp-ios-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-5-album.png
[swkmp-ios-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-6-other.png
[swkmp-ios-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-7-big.png
[swkmp-ios-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-8-pub.png
[swkmp-ios-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-9-msg.png
[swkmp-ios-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-10-me.png
[swkmp-ios-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperkmp-ios-11-me2.png