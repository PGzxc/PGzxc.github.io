### <font color=red>三 IOS项目</font>

#### 1—[SwiperIOS](https://github.com/PGzxc/SwiperIOS)

**项目归属**：个人项目
**项目名称**：SwiperIOS(私密)
**项目地址**：https://github.com/PGzxc/SwiperIOS
**软件支持**：IOS
**开发工具**：MacOS(15.7.3)+Xcode(26.2)+Swift(6.2.3)+Trae(AI编程助手)
**项目描述**：SwiperIOS 是一款高仿抖音 + 小红书的原生 IOS 短视频与图文社区应用，基于 Swift + SwiftUI 开发，结合 api.apiopen.top 免费开放接口，实现全屏视频垂直滑动、图片瀑布流浏览、发布弹窗、消息提醒等社交体验；采用 MVVM 架构与统一网络层封装，深色沉浸式视觉与手势交互接近原生应用
**功能模块**：

* 首页：垂直滑动(Swiper)全屏视频，进入视口自动播放、离开自动暂停，末尾自动分页加载
* 图集：双列自适应瀑布流，动态列宽与间距，点击图片全屏放大并支持捏合缩放
* 发布：底部中间凸起发布按钮触发弹窗，提供相册/相机/文字入口
* 消息：列表页面与底部导航红点提醒
* 我：个人页面基础结构，后续可扩展作品、收藏、草稿与设置

**技术要点**：

- 路由与导航：SwiftUI TabView + 组件化文件结构，实现顶部标签与底部导航
- 纵向分页：封装 UIPageViewController 垂直分页，索引同步与切换通知
- 自定义组件： BottomTabBar 中间凸起发布按钮，选中项弹性缩放动画
- 架构与状态：MVVM + ObservableObject/@Published ，解耦视图与数据流
- 网络层： 封装 APIService 统一管理请求，底层APIClient基于 Alamofire + ObjectMapper
- 数据映射：通用响应模型 + 业务模型 JSON 映射，兼容旧/新字段
- 界面布局：图集瀑布流动态列宽与间距，双列交错优化视觉密度
- 适配与沉浸： GeometryReader + safeAreaInsets 响应式布局，内容穿透状态栏
- 视频播放： AVPlayer 视口进入自动播放/离开暂停，缓冲指示与循环播放
- 构建与依赖：CocoaPods 管理依赖，Fastlane 脚本化多环境打包发布

项目预览

| ![][swiperios-1] | ![][swiperios-2] | ![][swiperios-3] |
| :--------------: | :--------------: | :--------------: |
| ![][swiperios-4] | ![][swiperios-5] | ![][swiperios-6] |
| ![][swiperios-7] | ![][swiperios-8] | ![][swiperios-9] |

#### 2—[WanAndroid_SwiftUI](https://github.com/PGzxc/WanAndroid_SwiftUI)

**项目归属**：个人项目
**项目名称**：WanAndroid_SwiftUI
**项目地址**：https://github.com/PGzxc/WanAndroid_SwiftUI
**软件支持**：IOS
**开发工具**：MacOS(13.4)+Xcode(14.3.1)+Swift(5.8.1)
**项目描述**：该项目是一款基于 WanAndroid 网站开放 API 开发的 iOS 应用。采用 SwiftUI 构建界面，通过 HStack、VStack、ZStack 等布局与常用组件快速实现 UI 搭建及实时预览；网络层使用 Alamofire 搭配 AlamofireObjectMapper 实现数据请求与模型映射。  
**功能模块**：首页，导航、项目、消息、我的等   
**技术要点**：

- 使用 TabView+NavigationStack 构建项目主体框架
- 封装 API 接口与路由管理，包括 BaseURL、方法、路径和参数，实现网络请求统一管理
- Alamofire 发送网络请求，结合 AlamofireObjectMapper 解析响应数据为 Swift 模型
- 基于 MVVM 架构设计，利用 ObservableObject 简化数据与视图绑定
- 集成 SDWebImageSwiftUI 进行网络图片高效加载与缓存
- 通过 AppStorage 实现用户数据的持久化存储
- 利用 environmentObject 共享和管理全局应用状态
- 基于ImageCarousel实现SwiftUI首页轮播图

**项目预览**

|![][swift-waz-1]| ![][swift-waz-2]|![][swift-waz-3] |![][swift-waz-4] |
| -------------- | --------------- | --------------  | --------------  |
|![][swift-waz-5]|![][swift-waz-6] |![][swift-waz-7] |![][swift-waz-8] |
|![][swift-waz-9]|![][swift-waz-10]|![][swift-waz-11]|![][swift-waz-12]|

#### 3—[ZhiHuSwiftUI](https://github.com/PGzxc/ZhiHuSwiftUI)

**项目归属**：个人项目
**项目名称**：ZhiHuSwiftUI(开源+AI)
**项目地址**：https://github.com/PGzxc/ZhiHuSwiftUI
**软件支持**：IOS
**开发工具**：MacOS(15.3.2)+Xcode(16.2)+Swift(6.0.3)
**项目描述**：这是一款用 SwiftUI 开发的 iOS 版知乎社区客户端，采用 MVVM 架构，具备完整社区功能。首页可查看帖子列表与详情；市场分栏展示话题和专栏；发布按钮支持用户发布文章和问题；消息列表分栏呈现点赞、评论、关注等互动信息；还有个人中心，方便用户管理个人事务。  
**功能模块**：首页，市场、发布、消息、我的等   
**技术要点**：

- 使用 TabView+NavigationStack 构建项目主体框架
- 采用 MVVM 架构(Model + View + ViewModel)简化数据与视图的解耦
- 利用 URLSession 与 async/await 实现高效的网络请求与异步编程
- 通过 UserDefaults 实现数据的持久化存储
- 使用 @StateObject、@Published、@EnvironmentObject 进行状态管理与数据共享
- 自定义组件View，提高代码复用性
- Mock模拟临时数据

**项目预览**

| ![][ios-zh-1] | ![][ios-zh-2]  | ![][ios-zh-3]  | ![][ios-zh-4]  |
| ------------- | -------------- | -------------- | -------------- |
| ![][ios-zh-5] | ![][ios-zh-6]  | ![][ios-zh-7]  | ![][ios-zh-8]  |
| ![][ios-zh-9] | ![][ios-zh-10] | ![][ios-zh-11] | ![][ios-zh-12] |


<!--IOS-Swiperios-->
[swiperios-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-1-home-play.png
[swiperios-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-2-home-state.png
[swiperios-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-3-focus-state.png
[swiperios-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-4-home-city.png
[swiperios-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-5-album.png
[swiperios-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-6-album-big.png
[swiperios-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-7-pub.png
[swiperios-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-8-msg.png
[swiperios-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-9-me.png


<!--IOS-Wanandroid-SwiftUI-->
[swift-waz-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-1-home.png
[swift-waz-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-2-tree.png
[swift-waz-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-3-treetab.png
[swift-waz-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-4-project.png
[swift-waz-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-message-unread-5.png
[swift-waz-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-message-read-6.png
[swift-waz-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-message-info-7.png
[swift-waz-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-me-info-8.png
[swift-waz-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-me-info-no-9.png
[swift-waz-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-login-10.png
[swift-waz-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-register-11.png
[swift-waz-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-12-web.png

<!--IOS SwiftUI版本—仿知乎-->

[ios-zh-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-1-login.png
[ios-zh-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-2-register.png
[ios-zh-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-3-home.png
[ios-zh-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-4-home-detail.png
[ios-zh-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-5-market.png
[ios-zh-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-6-market-detail.png
[ios-zh-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-7-pub.png
[ios-zh-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-8-msg.png
[ios-zh-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-9-msg-detail.png
[ios-zh-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-10-me.png
[ios-zh-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-11-me-edit.png
[ios-zh-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-12-set.png
