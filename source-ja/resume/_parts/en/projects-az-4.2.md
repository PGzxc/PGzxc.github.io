

### <font color=red>2. Android Projects</font>

#### 1—[SwiperAndroid](https://github.com/PGzxc/SwiperAndroid)

**Project Ownership**：Personal Project
**Project Name**：SwiperAndroid(Private)
**Project Address**：https://github.com/PGzxc/SwiperAndroid
**Software Support**：Android
**Development Tools**：Android Studio(2025.2.2)+Java(17.0.15)+Gradle(8.14.3)+Kotlin(2.0.21)+Trae
**Project Description**：Independently developed Android short video + image gallery browsing application, using Jetpack Compose to implement modern declarative UI; product form benchmarks Douyin/Xiaohongshu short video and image community, providing smooth video/image sliding browsing, category viewing, and full-screen immersive interactive experience.     
**Functional Modules**：

* Home: Local / Following / Recommended multi-tab content stream, supporting left-right swipe switching
* Gallery: Image waterfall flow display, supporting categories and pagination loading
* Publish: Content publishing entry, including interactive animation feedback
* Message: System notifications and user interaction messages
* Me: User information, works list and settings management

**Technical Points**：

- Architecture Design: Adopts MVVM architecture, implements UI and business logic decoupling based on ViewModel
- UI Framework: Uses Jetpack Compose to build declarative UI, implementing responsive layout and smooth animation
- State Management: Manages page state and side effects through Compose State + LaunchedEffect + ViewModel
- Network and Data: Integrates Retrofit + OkHttp + Gson + Coroutines, implementing efficient asynchronous network requests and data parsing
- Video Playback: ExoPlayer implements list auto-playback, full-screen switching and playback control (StyledPlayerView)
- Image Processing: Glide implements efficient caching and loading, optimizing long list scrolling performance
- Gesture Interaction: Based on Compose gesture API to implement image zooming, sliding down to close and other immersive interactive experiences
- Screen Adaptation: Responsive layout + WindowInsets, adapting to notch screens, system bars and various screen sizes
- Build and Dependencies: Gradle Kotlin DSL + Version Catalog + Compose BOM unified management of dependencies and versions
- Multi-ABI Support: Reasonably split ABI, improve installation package size and compatibility

**Project Preview**

| ![][swiperaz-1] | ![][swiperaz-2] | ![][swiperaz-3] |
| :-------------: | :-------------: | :-------------: |
| ![][swiperaz-4] | ![][swiperaz-5] | ![][swiperaz-6] |
| ![][swiperaz-7] | ![][swiperaz-8] | ![][swiperaz-9] |

#### 2—[WanAndroid_ComposeUI](https://github.com/PGzxc/WanAndroid_ComposeUI)

**Project Ownership**：Personal Project
**Project Name**：WanAndroid_ComposeUI
**Project Address**：https://github.com/PGzxc/WanAndroid_ComposeUI
**Software Support**：Android
**Development Tools**：Android Studio(2022.2.1)+Java(17.0.6)+Gradle(8.0-bin)+Kotlin(1.7.20)
**Project Description**：This project is an Android ComposeUI open source App based on the open source API of WanAndroid website. With the help of ComposeUI's layout (Row, Column, Box) and components (Text, Button, Card, TabRow, etc.), it quickly implements interface layout and timely view interface preview, uses Okhttp3 + Retrofit2 + Converter-Gson to execute network requests and data encapsulation, and quickly realizes personal App development.     
**Functional Modules**：Home, Navigation, Project, Message, Me, Settings, etc.   
**Technical Points**：

- Build project network access framework based on Okhttp3 + Retrofit2 + Converter-Gson
- Automatically save login Cookie based on PersistentCookieJar
- Build MVVM framework based on Lifecycle-Viewmodel
- Build page navigation based on navigation-compose
- Implement pagination layout support based on accompanist-pager
- Implement page refresh based on accompanist-swiperefresh
- Display web page details based on accompanist-webview
- Implement flow layout based on accompanist-flowlayout
- Save permanent storage data based on mmkv
- material-icons-core, material-icons-extended use system icons

**Project Preview**

| ![][com-az-1] | ![][com-az-2]  | ![][com-az-3]  | ![][com-az-4]  |
| ------------- | -------------- | -------------- | -------------- |
| ![][com-az-5] | ![][com-az-6]  | ![][com-az-7]  | ![][com-az-8]  |
| ![][com-az-9] | ![][com-az-10] | ![][com-az-11] | ![][com-az-12] |

#### 3—[Live ](https://github.com/PGzxc/Live)

**Project Ownership** ：Personal Project
**Project Name**：Android Project—Live
**Software Support**：Android 6.0+
**Project Address**：https://github.com/PGzxc/Live
**Development Tools**：Android Studio + Github
**Project Description**：Live is a personal open source project, imitating the interaction and functional design of the "Yingke" live streaming platform, covering core modules such as home page, nearby, live streaming, following, and my page. The project implements core functions such as live room chat, bullet screen, gift effects, and supports pull-down refresh and multiple content display layouts.     
**Functional Modules**：Home, Nearby, Live, Following, Me, etc.   
**Technical Points**：

- Build development framework based on Bottom Bar + Fragmentation + DataBinding
- Implement push streaming (PLDroidMediaStreaming) and pull streaming (PLDroidPlayer) based on Qiniu Cloud
- Implement live room chat based on Huanxin chat room
- Implement multiple layouts based on BaseRecycleViewAdapterHelper
- Implement pull-down refresh and pull-up loading based on SmartReFreshLayout
- Implement heart animation based on HeartLayout
- Implement chat bullet screen and gift effects based on ViewAnimator
- Use RAP to simulate interface data

**Project Preview**

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

<!--own project-live-->
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