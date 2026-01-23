### <font color=red>一 Harmony项目</font>

#### 1—[SwiperHM](https://github.com/PGzxc/SwiperHM)

**项目归属**：个人项目(私密)
**项目名称**：SwiperHM
**项目地址**：https://github.com/PGzxc/SwiperHM
**软件支持**：鸿蒙全系列
**API版本**：API Version 17
**开发语言**：ArkTS+ArkUI
**开发工具**：DevEco Studio 5.0.5 Release
**项目描述**：仿抖音和小红书鸿蒙项目， 基于api.apiopen.top开放接口，实现仿抖音视频滑动切换 
**功能模块**：首页、图集、发布、消息、我   
**技术要点**：

- 基于Flex+Builder+scale+animation构建仿小红书底部导航
- 基于V1、V2状态管理监控数据变化及UI同步
- 基于官方工具WindowUtils适配屏幕和窗口
- 自定义组件：@Builder装饰器、@Component装饰器

* 三方库：axios(网络请求)、pulltorefres(刷新/加载更多)
* 常用组件：WaterFlow(瀑布流)、Swiper(视频滑动)、Tabs(导航栏)等
* 音视频：Video组件及状态管理(播放、循环、准备、开始、出错等)

**项目预览**

| ![][swiperhm-1] | ![][swiperhm-2] | ![][swiperhm-3] |
| :-------------: | :-------------: | :-------------: |
| ![][swiperhm-4] | ![][swiperhm-5] | ![][swiperhm-6] |
| ![][swiperhm-7] | ![][swiperhm-8] | ![][swiperhm-9] |

#### 2—[WanCJ](https://github.com/PGzxc/WanCJ)

**项目归属**：个人项目(开源)
**项目名称**：WanCJ
**项目地址**：https://github.com/PGzxc/WanCJ
**软件支持**：鸿蒙全系列
**API版本**：API Version 12
**开发语言**：仓颉(.cj)+ArkUI
**开发工具**：DevEco Studio NEXT Beta1+Node(18.18.2)
**项目描述**：本项目是由鸿蒙开发语言由ArkTS(.ets)转化为仓颉(.cj)的开源项目，UI 布局不变，用仓颉编写逻辑，并封装网络访问模块，自定义组件等的基础上快速完成功能开发     
**功能模块**：首页、课程、工具、我的   
**技术要点**：

- 基于Tabs+TabContent构建底部导航框架
- 基于ohos.net.http进行网络请求，封装Get、Post请求
- 数据类的序列化和反序列化
- 构造工具类将JsonObject转换为Bean和String转换为JsonObject
- 基于@State、@Prop等装饰器获取网络数据并更新状态
- 基于@Builder装饰器自定义组件、extend扩展原有组件(方法)，减少复用代码

**项目预览**

| ![][wancj-1] | ![][wancj-2] | ![][wancj-3] | ![][wancj-4] |
| :----------: | :----------: | :----------: | :----------: |
| ![][wancj-5] | ![][wancj-6] | ![][wancj-7] | ![][wancj-8] |

#### 3—[WanAndroidHM](https://github.com/PGzxc/WanAndroidHM)

**项目归属**：个人项目(开源)
**项目名称**：WanAndroidHM
**项目地址**：https://github.com/PGzxc/WanAndroidHM
**软件支持**：鸿蒙全系列
**API版本**：API Version 12
**开发语言**：ArkTS+ArkUI
**开发工具**：DevEco Studio 4.0 Release+Node(16.20.1)+ohpm(1.2.5)
**项目描述**：该项目是基于WanAndroid 网站开源的接口 API制作的一款Harmony开源hap。利用Harmony布局、组件、API开发的一款支持Harmony全系列应用。     
**功能模块**：首页、导航、项目、消息、我等   
**技术要点**：

- 使用 Tabs + TabBar 构建底部导航框架，实现多模块切换与页面管理
- 基于@ohos.net.http 发送网络请求，采用 Promise 简化异步操作流程
- 通过@State、@Prop 等装饰器管理网络数据绑定与状态更新
- 利用@Builder、@Extend 等装饰器封装自定义组件，减少复用代码
- 使用 preferences 与 PersistentStorage 实现用户数据持久化存储
- 基于router、Navigator页面路由和组件导航及pageTransition转场动画
- 集成@ohos/pulltorefres 实现页面的下拉刷新与上拉加载功能

**项目预览**

| ![][waz-hm-1]  | ![][waz-hm-2]  | ![][waz-hm-3]  | ![][waz-hm-4]  |
| :------------: | :------------: | :------------: | :------------: |
| ![][waz-hm-5]  | ![][waz-hm-6]  | ![][waz-hm-7]  | ![][waz-hm-8]  |
| ![][waz-hm-9]  | ![][waz-hm-10] | ![][waz-hm-11] | ![][waz-hm-12] |
| ![][waz-hm-13] | ![][waz-hm-14] | ![][waz-hm-15] | ![][waz-hm-16] |

#### 4—[BookHM](https://github.com/PGzxc/BookHM)

**项目归属**：个人项目(开源)
**项目名称**：BookHM
**项目地址**：https://github.com/PGzxc/BookHM
**软件支持**：鸿蒙全系列
**API版本**：API Version 10
**开发语言**：ArkTS+ArkUI
**开发工具**：DevEco Studio 4.0 Release+Node(16.20.1)+ohpm(1.2.5)
**项目描述**：这是一个读书app OpenHarmony版本。使用List 和Grid来处理图书信息的展示，底部使用Tabs导航组件使用。本应用数据使用本地数据模拟返回。
**功能模块**：阅读、书架、读书、我的   
**技术要点**：

- 基于Tabs+tabBar构建底部导航框架
- 基于@State、@Prop等装饰器更新状态
- 基于`@Watch('changeTab')`监听tab切换并设置对应Tab数据
- 基于@Builder、@Extend等装饰器自定义组件，减少复用代码
- 基于router、Navigator页面路由和组件导航及pageTransition转场动画

**项目预览**

| ![][hm-read-1] | ![][hm-read-2] | ![][hm-read-3] |
| -------------- | -------------- | -------------- |
| ![][hm-read-4] | ![][hm-read-5] | ![][hm-read-6] |


<!--hm-swiperhm-->
[swiperhm-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-rec-1.png
[swiperhm-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-rec-2.png
[swiperhm-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-focus-3.png
[swiperhm-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-focus-4.png
[swiperhm-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-album-5.png
[swiperhm-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-album-6.png
[swiperhm-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-album-7.png
[swiperhm-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-album-8.png
[swiperhm-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperhm-pub-9.png

<!--hm-wancj-->
[wancj-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-1-home-normal.png
[wancj-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-2-home-fresh.png
[wancj-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-3-course.png
[wancj-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-4-course-list.png
[wancj-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-5-tool.png
[wancj-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-6-me.png
[wancj-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-7-me-data.png
[wancj-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-8-login.png
[wancj-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/wancj-9-register.png

<!--hm-waz-->
[waz-hm-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-splash-0.png
[waz-hm-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-home-1.png
[waz-hm-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-nav-2.png
[waz-hm-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-navlist-3.png
[waz-hm-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-project-4.png
[waz-hm-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-msg-5.png
[waz-hm-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-msg-6.png
[waz-hm-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-me-7.png
[waz-hm-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-me-8.png
[waz-hm-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-login-9.png
[waz-hm-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-register-10.png
[waz-hm-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-me-set-11.png
[waz-hm-13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-home-refresh-12.png
[waz-hm-14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-home-loadmore-13.png
[waz-hm-15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-rank-14.png
[waz-hm-16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/waz-hm-coin-15.png

<!--hm-read-->
[hm-read-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/hm_read_1_read.png
[hm-read-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/hm_read_2_book_pro.png
[hm-read-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/hm_read_3_book_rec.png
[hm-read-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/hm_read_4_voice_his.png
[hm-read-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/hm_read_5_voice_per.png
[hm-read-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/hm_read_6_me.png

