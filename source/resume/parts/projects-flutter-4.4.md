### <font color=red>四 Flutter项目</font>

#### 1—[SwiperFlutter](https://github.com/PGzxc/SwiperFlutter)

**项目归属** ：个人项目
**项目名称**：SwiperFlutter(私密)
**项目地址**：https://github.com/PGzxc/SwiperFlutter
**软件支持**：Android+IOS+Web+Windows+Mac+Linux
**开发工具**：IDEA(2025.3.1)+Flutter(3.38.5)+Trae(AI编程助手)
**项目描述**：基于 Flutter 框架独立开发的跨平台短视频 + 图文社区应用，支持 Android / iOS / Web / Windows / macOS / Linux 六端运行，一套代码多平台部署；产品形态与交互体验对标抖音 / 小红书，实现视频流播放、图片瀑布流浏览及完整用户交互体系，具备现代化 UI 与全平台响应式适配能力。     
**功能模块**：

* 首页：抖音式竖向视频流，支持上下滑动切换、自动播放及手势交互
* 图集：图片瀑布流展示，支持分类浏览与分页加载
* 发布：底部统一发布入口，支持多类型内容发布
* 消息：系统通知与用户互动消息
* 我：个人信息管理与个人内容展示

**技术要点**：

- 跨平台开发：基于 Flutter + Dart，一套代码多端适配
- 架构设计：采用 MVVM 架构，UI 与业务逻辑解耦，提升代码可维护性
- 状态管理：使用 Riverpod 管理全局与页面状态，保证状态可预测、可测试
- 网络与数据：Dio + 拦截器 + 数据缓存，结合 json_serializable 自动序列化
- 视频播放：基于 video_player，支持自动播放、手势控制及生命周期管理
- 图片优化：使用 cached_network_image 实现图片缓存，提升列表滚动性能
- 瀑布流布局：通过 flutter_staggered_grid_view 实现图片瀑布流展示
- UI 组件：使用 flutter_svg 支持矢量图标，构建现代化 UI 风格
- 屏幕适配：采用响应式布局方案，适配不同屏幕尺寸与分辨率

**项目预览**

| ![][swiperft-1] | ![][swiperft-2] | ![][swiperft-3] |
| :-------------: | :-------------: | :-------------: |
| ![][swiperft-4] | ![][swiperft-5] | ![][swiperft-6] |
| ![][swiperft-7] | ![][swiperft-8] | ![][swiperft-9] |

#### 2—[Flutter-WanAndroid ](https://github.com/PGzxc/flutter_wanandroid)

**项目归属** ：个人项目
**项目名称**：Flutter-wanandroid(开源)
**项目地址**：https://github.com/PGzxc/flutter_wanandroid
**软件支持**：Android+IOS
**开发工具**：IDEA 社区版 2022.1+Flutter(3.0.2) 
**项目描述**：Flutter-WanAndroid 是基于 WanAndroid 网站开放 API 开发的开源移动端应用，旨在为用户提供便捷的文章浏览、项目分类、知识体系等功能体验。     
**功能模块**：首页、导航、项目、消息、我、语言、主题   
**技术要点**：

- 基于GetX+getWidget构建开发框架
- 基于GetX-GetConnect构建网络请求
- 基于json_serializable+build_runner封装网络返回结果
- 基于shared_preference保存用户登录结果和语言/主题设置
- 基于flutter_pulltorefresh实现下拉刷新和上拉加载
- 基于shimmer实现网络请求时预览效果显示
- 基于webview-flutter显示网页效果
- 基于flutter_native_splash设置项目启动默认画面，防止白屏
- 基于KeepAliveWrapper进行列表项缓存，防止多次加载
- 基于Google组件getWidget-badges，显示未读消息
- 使用flutter_screenutil进行屏幕适配

**项目预览**

| ![][w-1] | ![][w-2]  | ![][w-3] | ![][w-4] |
| -------- | --------- | -------- | -------- |
| ![][w-5] | ![][w-6]  | ![][w-7]| ![][w-8] |
| ![][w-9] | ![][w-10] | ![][w-11]| ![][w-12]|
| ![][w-13]| ![][w-14] | ![][w-15]| ![][w-16]|

####  3—[Flutter-zhihu-getx](https://github.com/PGzxc/flutter_zhihu_getx)

**项目归属**：个人项目
**项目名称**：Flutter_zhihu_getx(开源)
**项目地址**：https://github.com/PGzxc/flutter_zhihu_getx
**软件支持**：Android+IOS
**开发工具**：IDEA 社区版 2022.2.4+Flutter(3.7.3)
**项目描述**：该项目是一个仿知乎 App 的跨平台开源项目，采用 Flutter 构建，支持 Android和 iOS 双端运行。项目基于 GetX 状态管理框架，结合多种开源 UI 组件库实现首页、推荐、关注、问答等核心模块。     
**功能模块**：首页、关注、发布、会员、我的   
**技术要点**：

- 基于GetX+nav_sheet构建项目开发框架
- 基于GetX将视图View和控制器Controller分隔开，并通过bindings将两者结合
- 基于flutter_pulltorefresh实现下拉刷新和上拉加载
- 基于staggered_grid_view实现错开显示的图片列表
- 基于flutter_quill实现富文本编辑器
- 基于flutter_tindercard实现滑动移除上一张获取下一张卡片信息
- 基于KeepAliveWrapper进行列表项缓存，防止多次加载
- 基于getwidget、remixicon、font_awesome_flutter实现项目中的图标和组件

**项目预览**

| ![][zh-1] | ![][zh-2]  | ![][zh-3] | ![][zh-4] |
| --------- | ---------- | --------- | --------- |
| ![][zh-5] | ![][zh-6]  | ![][zh-7] | ![][zh-8] |
| ![][zh-9] | ![][zh-10] |           |           |


<!--自己的项目-swiper-flutter-->
[swiperft-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-1-rec.png
[swiperft-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-2-rec-state.png
[swiperft-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-3-focus.png
[swiperft-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-4-city.png
[swiperft-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-5-cate.png
[swiperft-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-6-big.png
[swiperft-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-7-pub.png
[swiperft-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-8-msg.png
[swiperft-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperft-9-me.png

<!--自己的项目-flutter-wanandroid-->
[w-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_login.png
[w-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_register.png
[w-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_home.png
[w-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_left_drawer.png
[w-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_nav_tree.png
[w-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_nav_site.png
[w-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_nav_wx.png
[w-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_nav_project.png
[w-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_message_unread_list.png
[w-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_message_read_list.png
[w-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_me_unlogin.png
[w-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_me_login.png
[w-13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_coin_rank.png
[w-14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_coin_sigin.png
[w-15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_article_webpage.png
[w-16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/w_message_webpage.png

<!--自己的项目-flutter-zhihu-->
[zh-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-home-idea.png
[zh-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-home-idea-refresh.png
[zh-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-home-recommend.png
[zh-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-home-hot-rank.png
[zh-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-home-pub.png
[zh-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-focus.png
[zh-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-vip-find.png
[zh-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-me-unlogin.png
[zh-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-me-login.png
[zh-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-user-login.png
