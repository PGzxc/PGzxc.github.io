

### <font color=red>1. Harmony Projects</font>

#### 1—[SwiperHM](https://github.com/PGzxc/SwiperHM)

**Project Ownership**：Personal Project (Private)
**Project Name**：SwiperHM
**Project Address**：https://github.com/PGzxc/SwiperHM
**Software Support**：Harmony Full Series
**API Version**：API Version 17
**Development Language**：ArkTS+ArkUI
**Development Tools**：DevEco Studio 5.0.5 Release
**Project Description**：Imitation of Douyin and Xiaohongshu Harmony project, based on api.apiopen.top open interface, implementing Douyin-like video swipe switching 
**Functional Modules**：Home, Gallery, Publish, Message, Me   
**Technical Points**：

- Build Xiaohongshu-like bottom navigation based on Flex+Builder+scale+animation
- Monitor data changes and UI synchronization based on V1, V2 state management
- Adapt to screens and windows based on official tool WindowUtils
- Custom components: @Builder decorator, @Component decorator

* Third-party libraries: axios (network requests), pulltorefres (refresh/load more)
* Common components: WaterFlow (waterfall flow), Swiper (video swipe), Tabs (navigation bar), etc.
* Audio and video: Video component and state management (playback, loop, preparation, start, error, etc.)

**Project Preview**

| ![][swiperhm-1] | ![][swiperhm-2] | ![][swiperhm-3] |
| :-------------: | :-------------: | :-------------: |
| ![][swiperhm-4] | ![][swiperhm-5] | ![][swiperhm-6] |
| ![][swiperhm-7] | ![][swiperhm-8] | ![][swiperhm-9] |

#### 2—[WanCJ](https://github.com/PGzxc/WanCJ)

**Project Ownership**：Personal Project (Open Source)
**Project Name**：WanCJ
**Project Address**：https://github.com/PGzxc/WanCJ
**Software Support**：Harmony Full Series
**API Version**：API Version 12
**Development Language**：Cangjie(.cj)+ArkUI
**Development Tools**：DevEco Studio NEXT Beta1+Node(18.18.2)
**Project Description**：This project is an open source project that converts Harmony development language from ArkTS(.ets) to Cangjie(.cj), with UI layout unchanged, using Cangjie to write logic, and quickly completing functional development based on encapsulating network access modules, custom components, etc.     
**Functional Modules**：Home, Course, Tool, Me   
**Technical Points**：

- Build bottom navigation framework based on Tabs+TabContent
- Perform network requests based on ohos.net.http, encapsulate Get, Post requests
- Serialization and deserialization of data classes
- Construct tool classes to convert JsonObject to Bean and String to JsonObject
- Get network data and update status based on @State, @Prop and other decorators
- Custom components based on @Builder decorator, extend existing components (methods), reduce reusable code

**Project Preview**

| ![][wancj-1] | ![][wancj-2] | ![][wancj-3] | ![][wancj-4] |
| :----------: | :----------: | :----------: | :----------: |
| ![][wancj-5] | ![][wancj-6] | ![][wancj-7] | ![][wancj-8] |

#### 3—[WanAndroidHM](https://github.com/PGzxc/WanAndroidHM)

**Project Ownership**：Personal Project (Open Source)
**Project Name**：WanAndroidHM
**Project Address**：https://github.com/PGzxc/WanAndroidHM
**Software Support**：Harmony Full Series
**API Version**：API Version 12
**Development Language**：ArkTS+ArkUI
**Development Tools**：DevEco Studio 4.0 Release+Node(16.20.1)+ohpm(1.2.5)
**Project Description**：This project is a Harmony open source hap based on the open API of WanAndroid website. It is an application that supports the full Harmony series developed using Harmony layout, components, and API.     
**Functional Modules**：Home, Navigation, Project, Message, Me, etc.   
**Technical Points**：

- Use Tabs + TabBar to build bottom navigation framework, implementing multi-module switching and page management
- Send network requests based on @ohos.net.http, use Promise to simplify asynchronous operation process
- Manage network data binding and state updates through @State, @Prop and other decorators
- Use @Builder, @Extend and other decorators to encapsulate custom components, reduce reusable code
- Use preferences and PersistentStorage to implement user data persistence storage
- Based on router, Navigator page routing and component navigation and pageTransition transition animation
- Integrate @ohos/pulltorefres to implement page pull-down refresh and pull-up loading functions

**Project Preview**

| ![][waz-hm-1]  | ![][waz-hm-2]  | ![][waz-hm-3]  | ![][waz-hm-4]  |
| :------------: | :------------: | :------------: | :------------: |
| ![][waz-hm-5]  | ![][waz-hm-6]  | ![][waz-hm-7]  | ![][waz-hm-8]  |
| ![][waz-hm-9]  | ![][waz-hm-10] | ![][waz-hm-11] | ![][waz-hm-12] |
| ![][waz-hm-13] | ![][waz-hm-14] | ![][waz-hm-15] | ![][waz-hm-16] |

#### 4—[BookHM](https://github.com/PGzxc/BookHM)

**Project Ownership**：Personal Project (Open Source)
**Project Name**：BookHM
**Project Address**：https://github.com/PGzxc/BookHM
**Software Support**：Harmony Full Series
**API Version**：API Version 10
**Development Language**：ArkTS+ArkUI
**Development Tools**：DevEco Studio 4.0 Release+Node(16.20.1)+ohpm(1.2.5)
**Project Description**：This is a reading app OpenHarmony version. Use List and Grid to handle book information display, and use Tabs navigation component at the bottom. This application uses local data to simulate returns.
**Functional Modules**：Reading, Bookshelf, Reading, Me   
**Technical Points**：

- Build bottom navigation framework based on Tabs+tabBar
- Update status based on @State, @Prop and other decorators
- Monitor tab switching and set corresponding Tab data based on `@Watch('changeTab')`
- Custom components based on @Builder, @Extend and other decorators, reduce reusable code
- Based on router, Navigator page routing and component navigation and pageTransition transition animation

**Project Preview**

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