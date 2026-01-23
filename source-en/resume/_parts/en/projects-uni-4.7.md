

### <font color=red>7. Uni-app Projects</font>

#### 1—[SwiperUniApp](https://github.com/PGzxc/SwiperUniApp)

**Project Ownership**：Personal Project/Private
**Project Name**：SwiperUniApp
**Project Address**：https://github.com/PGzxc/SwiperUniApp
**Software Support**：H5+WeChat Mini Program / Alipay Mini Program+Android+iOS
**Development Tools**：HBuilder X 4.87+WeChat Developer Tools+Android Studio+Xcode+Node.js+Vite
**Project Description**：Independently developed cross-platform short video + image gallery browsing application based on UniApp, built with Vue 3 + TypeScript, one code multi-end publishing, realizing unified business logic and interactive experience; product form benchmarks Douyin/Xiaohongshu short video and image community, providing smooth video and image sliding browsing, multi-tab content flow, category viewing and full-screen immersive interactive experience, supporting H5, mini programs, Android, iOS and other multi-platform operation.  

**Functional Modules**：

* Home: Local / Following / Recommended multi-tab content flow, supporting left-right swipe switching and up-down swipe immersive video browsing
* Gallery: Image waterfall flow display, supporting category filtering and pagination loading, click to enter full-screen image preview
* Publish: Content publishing entry, presented in popup form, including interactive animation and status feedback
* Message: System notifications and user interaction message display, supporting new message red dot reminder
* Me: User information display, works list management and basic settings functions

**Technical Points**：

- Architecture Design: UniApp cross-end unified architecture + conditional compilation, improving code reuse rate
- State Management: Composition API + ViewModel pattern, clear state management, component decoupling
- Network and Data: Encapsulate unified network request layer, supporting interface aggregation, error handling and data parsing
- Video Playback: Based on UniApp video component encapsulation playback control logic, supporting short video continuous sliding playback
- Image Processing: Implement waterfall flow loading optimization through lazy loading and pagination rendering, improving long list scrolling performance
- Gesture Interaction: Implement immersive gesture interactions such as video up-down sliding and image preview zooming
- Screen Adaptation: Adopt rpx + Flex to implement responsive layout, adapting to safe areas and notch screens
- Build and Publish: Use HBuilderX to implement H5 / mini program / App multi-end build and publish

**Project Preview**

| ![][swpuni-1] | ![][swpuni-2]  | ![][swpuni-3] | ![][swpuni-4] |
| ------------- | -------------- | ------------- | ------------- |
| ![][swpuni-5] | ![][swpuni-6]  | ![][swpuni-7] | ![][swpuni-8] |
| ![][swpuni-9] | ![][swpuni-10] |               |               |


#### 2—[wanandroid_uni_app](https://github.com/PGzxc/wanandroid_uni_app)

**Project Ownership**：Personal Project
**Project Name**：wanandroid_uni_app(Open Source)
**Project Address**：https://github.com/PGzxc/wanandroid_uni_app
**Software Support**：H5+WeChat Mini Program+Other Mini Programs
**Development Tools**：HBuilder X 3.8.4.20230531+WeChat Developer Tools+Vue(2.x)
**Project Description**：This project is based on WanAndroid open source API, built using uni-app, realizing user login and registration, article browsing, project display, navigation viewing, message notification and other functions, supporting multi-end deployment   
**Technical Points**：

- Use uni-ui component library to build page layout and interactive interface
- Encapsulate network requests based on uni.request
- Listen to inter-page event communication based on uni-api-EventChannel
- Implement page jump and navigation control through routing APIs such as uni.navigateTo and redirectTo
- Use uni.setStorage/uni.getStorage for local data caching
- Create Vue components for page reuse

**Project Preview**

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