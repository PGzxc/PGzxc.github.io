### <font color=red>七 Uni-app项目</font>

#### 1—[SwiperUniApp](https://github.com/PGzxc/SwiperUniApp)

**项目归属**：个人项目/私密
**项目名称**：SwiperUniApp
**项目地址**：https://github.com/PGzxc/SwiperUniApp
**软件支持**：H5+微信小程序 / 支付宝小程序+Android+iOS
**开发工具**：HBuilder X 4.87+微信开发者工具+Android Studio+Xcode+Node.js+Vite
**项目描述**：独立开发的 基于 UniApp 的跨平台短视频 + 图集浏览应用，采用 Vue 3 + TypeScript 构建，一套代码多端发布，实现统一的业务逻辑与交互体验；产品形态对标 抖音/小红书 短视频与图文社区，提供流畅的视频与图片滑动浏览、多标签内容流、分类查看及全屏沉浸式交互体验，支持 H5、小程序、Android、iOS 等多平台运行。  

**功能模块**：

* 首页：同城 / 关注 /推荐 多标签内容流，支持左右滑动切换与上下滑动沉浸式视频浏览
* 图集：图片瀑布流展示，支持分类筛选与分页加载，点击进入全屏图片预览
* 发布：内容发布入口，采用弹窗形式呈现，包含交互动画与状态反馈
* 消息：系统通知与用户互动消息展示，支持新消息红点提醒
* 我：用户信息展示、作品列表管理与基础设置功能

**技术要点**：

- 架构设计：UniApp 跨端统一架构 + 条件编译，提高代码复用率
- 状态管理：Composition API + ViewModel 模式，状态管理清晰、组件解耦
- 网络与数据：封装统一网络请求层，支持接口聚合、错误处理与数据解析
- 视频播放：基于 UniApp video 组件封装播放控制逻辑，支持短视频连续滑动播放
- 图片处理：通过懒加载与分页渲染实现瀑布流加载优化，提升长列表滚动性能
- 手势交互：实现视频上下滑动、图片预览缩放等沉浸式手势交互
- 屏幕适配：采用 rpx + Flex 实现响应式布局，适配安全区与异形屏
- 构建发布：使用 HBuilderX 实现 H5 / 小程序 / App 多端构建与发布

**项目预览**

| ![][swpuni-1] | ![][swpuni-2]  | ![][swpuni-3] | ![][swpuni-4] |
| ------------- | -------------- | ------------- | ------------- |
| ![][swpuni-5] | ![][swpuni-6]  | ![][swpuni-7] | ![][swpuni-8] |
| ![][swpuni-9] | ![][swpuni-10] |               |               |


#### 2—[wanandroid_uni_app](https://github.com/PGzxc/wanandroid_uni_app)

**项目归属**：个人项目
**项目名称**：wanandroid_uni_app(开源)
**项目地址**：https://github.com/PGzxc/wanandroid_uni_app
**软件支持**：H5+微信小程序+其他小程序
**开发工具**：HBuilder X 3.8.4.20230531+微信开发者工具+Vue(2.x)
**项目描述**：本项目基于 WanAndroid 开源 API，使用 uni-app 构建，实现用户登录注册、文章浏览、项目展示、导航查看、消息通知等功能，支持多端部署   
**技术要点**：

- 使用 uni-ui 组件库构建页面布局与交互界面
- 基于 uni.request 封装网络请求
- 基于uni-api-EventChannel监听页面间事件通信
- 通过 uni.navigateTo、redirectTo 等路由 API 实现页面跳转与导航控制
- 使用 uni.setStorage/uni.getStorage 进行本地数据缓存
- 创建Vue组件供页面重复使用

**项目预览**

|![][uni-az-1]| ![][uni-az-2]|![][uni-az-3] |![][uni-az-4]|
| ----------- | ------------ | ------------ | ----------- |
|![][uni-az-5]|![][uni-az-6] |![][uni-az-7] |![][uni-az-8]|


<!--swiperuniapp-->

[swpuni-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-1-rec.png
[swpuni-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-2-rec-state.png
[swpuni-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-3-focus.png
[swpuni-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-4-city.png
[swpuni-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-5-first.png
[swpuni-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-6-other.png
[swpuni-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-7-big.png
[swpuni-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-8-pub.png
[swpuni-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-9-msg.png
[swpuni-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperuni-10-me.png

<!--uni-app-wanandroid-->

[uni-az-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-home-1.png
[uni-az-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-navigator-2.png
[uni-az-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-project-3.png
[uni-az-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-article-web-4.png
[uni-az-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-mine-login-no-5.png
[uni-az-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-mine-login-yes-6.png
[uni-az-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-user-login-7.png
[uni-az-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/uni-az-user-register-8.png

