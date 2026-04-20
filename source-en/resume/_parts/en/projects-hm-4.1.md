### <font color=red>1. Harmony Projects</font>

#### 1—[TeaOrderHM](https://github.com/PGzxc/TeaOrderHM)

**Project Ownership**：Personal Project (Private)
**Project Name**：TeaOrderHM — Harmony Ordering App
**Project URL**：https://github.com/PGzxc/TeaOrderHM
**Platform Support**：Smartphone/Pad
**API/SDK**：API Version 21
**Development Language**：ArkTS+ArkUI
**Development Tools**：DevEco Studio 6.0.1 Release
**Project Description**：A Harmony ordering app developed based on ArkTS and ArkUI, integrated with self-developed Java backend interface and Vue management platform, implementing a complete ordering process including product browsing, size selection, shopping cart management, and order history viewing.
**Functional Modules**：

- Ordering Page ：Product category display, product list browsing, size selection, add to shopping cart
- Shopping Cart Page ：Product quantity adjustment, product deletion, empty shopping cart, checkout function
- Order History Page ：Order history display, order detail viewing

**Technical Highlights**：

- UI Layout Architecture ：Adopting Flex layout and components to build responsive interfaces, achieving reasonable layout of bottom navigation bar and page content
- Common Components ：Using official components such as List, Button, Image, Text to build core function interfaces
- State Management ：Using @State decorator to implement data state management, ensuring data changes are synchronized with UI
- Custom Components ：Building reusable page components based on @Component decorator
- Network Requests：Encapsulating HttpUtil tool class to implement network requests, supporting GET, POST, PUT, DELETE and other methods
- Data Models ：Defining data models such as Product, Category, CartItem, Order to standardize data structure
- Interaction Experience ：Implementing interactive functions such as size selection pop-up, shopping cart quantity adjustment, and immediate feedback
- Error Handling Mechanism ：Implementing comprehensive exception capture and error handling to ensure application stability


**Project Preview**

|   ![][tea-1]    |   ![][tea-2]    |   ![][tea-3]    |
| :-------------: | :-------------: | :-------------: |
|   ![][tea-4]    |   ![][tea-5]    |   ![][tea-6]    |


#### 2—[SwiperHM](https://github.com/PGzxc/SwiperHM)

**Project Ownership**：Personal Project (Private)
**Project Name**：SwiperHM — Harmony Short Video App
**Project URL**：https://github.com/PGzxc/SwiperHM
**Platform Support**：Smartphone/Pad
**API/SDK**：API Version 17
**Development Language**：ArkTS+ArkUI
**Development Tools**：DevEco Studio 5.0.5 Release
**Project Description**：A Harmony project imitating TikTok and Xiaohongshu, based on api.apiopen.top open interface, implementing TikTok-style video swipe switching
**Functional Modules**：Home, Album, Publish, Messages, My Page   
**Technical Highlights**：

- Building Xiaohongshu-style bottom navigation based on Flex+Builder+scale+animation
- Monitoring data changes and UI synchronization based on V1, V2 state management
- Adapting to screens and windows based on official tool WindowUtils
- Custom Components：@Builder decorator, @Component decorator
- Third-party Libraries：axios (network requests), pulltorefres (refresh/load more)
- Common Components：WaterFlow (waterfall flow), Swiper (video swipe), Tabs (navigation bar), etc.
- Audio/Video：Video component and state management (play, loop, prepare, start, error, etc.)

**Project Preview**

| ![][swiperhm-1] | ![][swiperhm-2] | ![][swiperhm-3] |
| :-------------: | :-------------: | :-------------: |
| ![][swiperhm-4] | ![][swiperhm-5] | ![][swiperhm-6] |
| ![][swiperhm-7] | ![][swiperhm-8] | ![][swiperhm-9] |

#### 3—[WanCJ](https://github.com/PGzxc/WanCJ)

**Project Ownership**：Personal Project (Open Source)
**Project Name**：WanCJ
**Project URL**：https://github.com/PGzxc/WanCJ
**Platform Support**：Smartphone/Pad
**API/SDK**：API Version 12
**Development Language**：Cangjie (.cj)+ArkUI
**Development Tools**：DevEco Studio NEXT Beta1+Node(18.18.2)
**Project Description**：This project is an open source project that converts the Harmony development language from ArkTS (.ets) to Cangjie (.cj), with UI layout unchanged, using Cangjie to write logic, and encapsulating network access modules, custom components, etc. to quickly complete function development
**Functional Modules**：Home, Courses, Tools, My Page   
**Technical Highlights**：

- Building bottom navigation framework based on Tabs+TabContent
- Making network requests based on ohos.net.http, encapsulating Get and Post requests
- Serialization and deserialization of data classes
- Building tool classes to convert JsonObject to Bean and String to JsonObject
- Obtaining network data and updating state based on @State, @Prop and other decorators
- Creating custom components based on @Builder decorator, extending existing components (methods) with extend to reduce code reuse

**Project Preview**

| ![][wancj-1] | ![][wancj-2] | ![][wancj-3] | ![][wancj-4] |
| :----------: | :----------: | :----------: | :----------: |
| ![][wancj-5] | ![][wancj-6] | ![][wancj-7] | ![][wancj-8] |

#### 4—[WanAndroidHM](https://github.com/PGzxc/WanAndroidHM)

**Project Ownership**：Personal Project (Open Source)
**Project Name**：WanAndroidHM
**Project URL**：https://github.com/PGzxc/WanAndroidHM
**Platform Support**：Smartphone/Pad
**API/SDK**：API Version 12
**Development Language**：ArkTS+ArkUI
**Development Tools**：DevEco Studio 4.0 Release+Node(16.20.1)+ohpm(1.2.5)
**Project Description**：This project is a Harmony open source hap created based on the open source API of the WanAndroid website. An application supporting the entire Harmony series developed using Harmony layout, components, and API.
**Functional Modules**：Home, Navigation, Projects, Messages, My Page, etc.   
**Technical Highlights**：

- Using Tabs + TabBar to build bottom navigation framework, implementing multi-module switching and page management
- Sending network requests based on @ohos.net.http, adopting Promise to simplify asynchronous operation flow
- Managing network data binding and state updates through @State, @Prop and other decorators
- Using @Builder, @Extend and other decorators to encapsulate custom components, reducing code reuse
- Using preferences and PersistentStorage to implement persistent storage of user data
- Based on router, Navigator page routing and component navigation, and pageTransition transition animation
- Integrating @ohos/pulltorefres to implement page pull-down refresh and pull-up load functions

**Project Preview**

| ![][waz-hm-1]  | ![][waz-hm-2]  | ![][waz-hm-3]  | ![][waz-hm-4]  |
| :------------: | :------------: | :------------: | :------------: |
| ![][waz-hm-5]  | ![][waz-hm-6]  | ![][waz-hm-7]  | ![][waz-hm-8]  |
| ![][waz-hm-9]  | ![][waz-hm-10] | ![][waz-hm-11] | ![][waz-hm-12] |
| ![][waz-hm-13] | ![][waz-hm-14] | ![][waz-hm-15] | ![][waz-hm-16] |

#### 5—[BookHM](https://github.com/PGzxc/BookHM)

**Project Ownership**：Personal Project (Open Source)
**Project Name**：BookHM
**Project URL**：https://github.com/PGzxc/BookHM
**Platform Support**：Smartphone/Pad
**API/SDK**：API Version 10
**Development Language**：ArkTS+ArkUI
**Development Tools**：DevEco Studio 4.0 Release+Node(16.20.1)+ohpm(1.2.5)
**Project Description**：This is an OpenHarmony version of a reading app. It uses List and Grid to handle the display of book information, and uses Tabs navigation component at the bottom. The app's data uses local data to simulate returns.
**Functional Modules**：Reading, Bookshelf, Reading, My Page   
**Technical Highlights**：

- Building bottom navigation framework based on Tabs+tabBar
- Updating state based on @State, @Prop and other decorators
- Monitoring tab switching and setting corresponding Tab data based on `@Watch('changeTab')`
- Creating custom components based on @Builder, @Extend and other decorators to reduce code reuse
- Based on router, Navigator page routing and component navigation, and pageTransition transition animation

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


<!--tea-hm-->
[tea-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-1-order-show.png
[tea-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-2-order-choose.png
[tea-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-3-order-add.png
[tea-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-4-cart-view.png
[tea-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-5-cart-update.png
[tea-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/tea-hm-6-order-list.png

