### <font color=red>五 React Native项目</font>

#### 1—[SwiperRN](https://github.com/PGzxc/SwiperRN)

**项目归属**：个人项目
**项目名称**：SwiperRN(私密)
**项目地址**：https://github.com/PGzxc/SwiperRN
**软件支持**：Android+IOS+Web
**开发工具**：VS Code+Trae(AI编程助手)+Java(17.0.15)+Node(25.2.1)+Yarn(1.22.22)+react-native(0.81.5)+Expo(54)
**项目描述**：SwiperRN 是一款高仿抖音 + 小红书的跨平台短视频&图文社区应用，基于 React Native + Expo 生态开发，结合 api.apiopen.top 免费开放接口，实现全屏视频垂直滑动、图片笔记瀑布流、动态发布、消息通知等完整社交体验。支持 iOS、Android、Web 三端真正一次编写到处运行，视觉效果与交互体验接近原生应用。    
**功能模块**：

* 首页：抖音式全屏视频垂直滑动(Swiper)，自动播放 + 手势暂停，支持下拉刷新、上拉加载更多
* 图集：小红书式双列/三列自适应图片瀑布流，动态高度，点击放大查看详情
* 发布：支持拍摄/相册选择视频、图片，多图上传，富文本标题+话题标签，调用接口一键发布
* 消息：点赞、评论、关注、系统通知列表，实时红点提醒，可跳转对应内容
* 我：个人主页网格/列表展示作品、收藏夹、草稿箱、设置与夜间模式切换

**技术要点**：

- 路由与导航：基于Expo Router实现文件系统路由系统
- 自定义组件：BottomTabBar中间凸起按钮和动态缩放效果
- 类型系统：基于TypeScript进行类型定义，确保代码质量和可维护性
- 网络请求：封装ApiService(fetch/axios)统一管理网络请求
- UI布局：实现图片瀑布流布局，动态计算列高和图片位置
- 手势交互：React Native Gesture Handler实现滑动切换
- 动画效果：React Native Animated和Reanimated高性能动画
- 适配方案：SafeAreaContext和Dimensions API响应式布局
- 视频播放：expo-av + FlatList实现“进入视口自动播放 + 离开暂停”，预加载下一条视频
- 构建发布：EAS Build多环境应用打包和发布

**项目预览-Android**

| ![][swiperrn-az-1] | ![][swiperrn-az-2] | ![][swiperrn-az-3] |
| :----------------: | :----------------: | :----------------: |
| ![][swiperrn-az-4] | ![][swiperrn-az-5] | ![][swiperrn-az-6] |
| ![][swiperrn-az-7] | ![][swiperrn-az-8] | ![][swiperrn-az-9] |

**项目预览-IOS**

| ![][swiperrn-ios-1] | ![][swiperrn-ios-2] | ![][swiperrn-ios-3] |
| :-----------------: | :-----------------: | :-----------------: |
| ![][swiperrn-ios-4] | ![][swiperrn-ios-5] | ![][swiperrn-ios-6] |
| ![][swiperrn-ios-7] | ![][swiperrn-ios-8] |                     |

#### 2—[WanAndroidRN](https://github.com/PGzxc/WanAndroidRN)

**项目归属**：个人项目
**项目名称**：WanAndroidRN(开源)
**项目地址**：https://github.com/PGzxc/WanAndroidRN
**软件支持**：Android+IOS
**开发工具**：IntelliJ IDEA+Java(11.0.19)+Node(18.18.2)+Yarn(1.22.19)+react-native(0.72.6)+Expo(49)
**项目描述**：该项目是一款基于 WanAndroid 网站开源接口 API 构建的 React Native 开源App。借助 Expo Go 开发工具，搭配 @ant - design/react-native 蚂蚁金服 UI 库，实现了对 Android 和 iOS 系统的跨平台支持，方便用户访问网站。     
**功能模块**：首页、导航、项目、消息、我等   
**技术要点**：

- 使用 React Navigation 构建底部导航框架，实现流畅页面切换
- 采用 Fetch API 进行网络请求，利用 Promise 简化异步流程
- 利用 React Hooks(useEffect + useState)实现数据获取与状态更新
- 设计复用性强的自定义组件，提升代码维护性和开发效率
- 基于ant-design/react-native-Carousel实现轮播图效果
- 基于ant-design/react-native-Tabs实现标签页切换

**项目预览**

| ![][rn-waz-1] | ![][rn-waz-2] | ![][rn-waz-3] |
| ------------- | ------------- | ------------- |
| ![][rn-waz-4] | ![][rn-waz-5] | ![][rn-waz-6] |
| ![][rn-waz-7] | ![][rn-waz-8] | ![][rn-waz-9] |

#### 3—[ZhiHuRN](https://github.com/PGzxc/ZhiHuRN)

**项目归属**：个人项目
**项目名称**：ZhiHuRN(开源+AI)
**项目地址**：https://github.com/PGzxc/ZhiHuRN
**软件支持**：Android+IOS
**开发工具**：IntelliJ IDEA+Java(11.0.19)+Node(22.14.0)+Yarn(1.22.22)+react-native(0.76.7)+Expo(52)
**项目描述**：本项目是基于 React Native 开发的仿知乎移动应用。已实现众多核心页面功能，涵盖登录注册、首页帖子浏览与发布、发现页的帖子搜索、搜索历史记录展示及热门话题呈现、消息通知以及个人信息管理等功能。      
**功能模块**：登录注册、首页、发现、通知、我的   
**技术要点**：

- 使用 React Navigation 构建底部导航框架，实现流畅页面切换
- 基于 Redux 进行全局状态管理，确保数据一致性与响应性
- 设计并复用自定义组件，提高代码复用率与维护性
- 采用 async-storage 和 expo-secure-store 实现本地数据安全存储
- 基于expo-image-picker(图片选择)、expo-image-manipulator(图片处理)、expo-file-system (文件操作)
- 基于react-native-safe-area-context (安全区域处理)、react-native-screens (原生屏幕容器)处理显示和性能问题

**项目预览**

| ![][zh-rn-1] | ![][zh-rn-2]  | ![][zh-rn-3]  | ![][zh-rn-4] |
| :----------: | :-----------: | :-----------: | :----------: |
| ![][zh-rn-5] | ![][zh-rn-6]  | ![][zh-rn-7]  | ![][zh-rn-8] |
| ![][zh-rn-9] | ![][zh-rn-10] | ![][zh-rn-11] |              |


<!--swiperrn-az-->

[swiperrn-az-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-1-home-1.png
[swiperrn-az-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-2-home-2.png
[swiperrn-az-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-3-home-3.png
[swiperrn-az-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-4-home-4.png
[swiperrn-az-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-5-home-5.png
[swiperrn-az-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-6-home-6.png
[swiperrn-az-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-7-pub.png
[swiperrn-az-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-8-mg.png
[swiperrn-az-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-az-9-me.png

<!--swiperrn-ios-->

[swiperrn-ios-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-1-home-1.png
[swiperrn-ios-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-2-home-2.png
[swiperrn-ios-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-3-home-3.png
[swiperrn-ios-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-4-home-4.png
[swiperrn-ios-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-5-album.png
[swiperrn-ios-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-6-pub.png
[swiperrn-ios-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-7-mgs.png
[swiperrn-ios-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperrn-ios-8-me.png

<!--rn-waz-->
[rn-waz-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-1-home.png
[rn-waz-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-2-nav.png
[rn-waz-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-3-project.png
[rn-waz-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-4-msgunread.png
[rn-waz-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-5-msgread.png
[rn-waz-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-6-meunlogin.png
[rn-waz-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-7-melogin.png
[rn-waz-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-8-login.png
[rn-waz-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-waz-9-register.png

<!--rn-zhihu-->
[zh-rn-1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-login-1.png
[zh-rn-2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-register-2.png
[zh-rn-3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-login-3.png
[zh-rn-4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-home-4.png
[zh-rn-5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-detail-5.png
[zh-rn-6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-pub-6.png
[zh-rn-7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-fresh-7.png
[zh-rn-8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-dis-8.png
[zh-rn-9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-search-9.png
[zh-rn-10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-msg-10.png
[zh-rn-11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-rn-me-11.png

<!--rn-todo-->
[rn-todo-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-todo-1-login.png
[rn-todo-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-todo-2-register.png
[rn-todo-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-todo-3-todo-empty.png
[rn-todo-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-todo-4-todo-addnil.png
[rn-todo-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-todo-5-todo-choice.png
[rn-todo-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/rn-todo-6-todo-calendar.png
