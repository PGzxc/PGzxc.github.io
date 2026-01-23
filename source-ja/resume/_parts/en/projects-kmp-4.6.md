

### <font color=red>6. Kotlin Multiplatform Mobile Projects</font>

#### 1—[SwiperKMP](https://github.com/PGzxc/SwiperKMP)

**Project Ownership**：Personal Project
**Project Name**：SwiperKMP(Private)
**Project Address**：https://github.com/PGzxc/SwiperKMP
**Software Support**：Cross-platform (Android, iOS, JVM, Web)
**Development Tools**：IDEA(2025.3.1)+Compose Multiplatform(1.9.3)+Gradle(8.14.3)+AS+Xcode
**Project Description**：Independently developed cross-platform short video + image gallery browsing application, using Compose Multiplatform to implement modern declarative UI that runs on multiple platforms with one codebase. Product form benchmarks Douyin/Xiaohongshu short video and image community, providing smooth video/image sliding browsing, category viewing, and full-screen immersive interactive experience, supporting Android, iOS, JVM and other platforms.    
**Functional Modules**：

* Home: Local / Following / Recommended multi-tab content stream, supporting left-right swipe switching
* Gallery: Image waterfall flow display, supporting categories and pagination loading
* Publish: Content publishing entry, including interactive animation feedback
* Message: System notifications and user interaction messages
* Me: User information, works list and settings management

**Technical Points**：

- Architecture Design: Adopts cross-platform architecture, implements code sharing based on Kotlin Multiplatform, platform-specific code separation
- UI Framework: Uses Compose Multiplatform to build declarative UI, implementing cross-platform responsive layout and smooth animation
- State Management: Manages cross-platform page state and side effects through Compose State + LaunchedEffect + ViewModel
- Network and Data: Ktor + Kotlinx Serialization + Coroutines implement efficient asynchronous network requests and data parsing
- Video Playback: Cross-platform video playback, Android uses ExoPlayer, JVM uses JavaFX
- Image Processing: Coil implements cross-platform efficient caching and loading, optimizing long list scrolling performance
- Gesture Interaction: Based on Compose gesture API to implement cross-platform consistent image zooming, sliding down to close and other immersive interactive experiences
- Screen Adaptation: Responsive layout + platform-specific WindowInsets processing, adapting to notch screens, system bars and various screen sizes
- Build and Dependencies: Gradle Kotlin DSL + Version Catalog unified management of cross-platform dependencies and versions
- Multi-platform Support: Android, iOS, JVM, Web multi-platform build, platform-specific code minimization

**Project Preview-Android**

| ![][swkmp-az-1]  | ![][swkmp-az-2]  | ![][swkmp-az-3] |
| :--------------: | :--------------: | :-------------: |
| ![][swkmp-az-4]  | ![][swkmp-az-5]  | ![][swkmp-az-6] |
| ![][swkmp-az-7]  | ![][swkmp-az-8]  | ![][swkmp-az-9] |
| ![][swkmp-az-10] | ![][swkmp-az-11] |                 |


**Project Preview-IOS**

| ![][swkmp-ios-1]  | ![][swkmp-ios-2]  | ![][swkmp-ios-3] |
| :---------------: | :---------------: | :--------------: |
| ![][swkmp-ios-4]  | ![][swkmp-ios-5]  | ![][swkmp-ios-6] |
| ![][swkmp-ios-7]  | ![][swkmp-ios-8]  | ![][swkmp-ios-9] |
| ![][swkmp-ios-10] | ![][swkmp-ios-11] |                  |



#### 2—[WanAndroidKMP](https://github.com/PGzxc/WanAndroidKMP)

**Project Ownership**：Personal Project
**Project Name**：WanAndroidKMP
**Project Address**：https://github.com/PGzxc/WanAndroidKMP
**Software Support**：Android+IOS+Desk(Mac/Windows/Linux)
**Development Tools**：Android Studio(2022.3.1)+Java(17.0.6)+Gradle(8.0.2-bin)+Kotlin(1.9.0)
**Project Description**：This project is developed based on WanAndroid API, using Compose Multiplatform to implement cross-platform interface construction, supporting core functions such as user login, registration, browsing articles, projects, navigation and messages. Adapted to multiple platforms.     
**Functional Modules**：Home, Navigation, Project, Message, Me, Settings, etc.   
**Technical Points**：

- Create project based on template compose-multiplatform-template
- Build bottom navigation framework based on NavigationBar
- Network part: ktor-core core library + ktor-serialization-kotlinx-json serialization
- Implement inter-interface navigation based on Navigator
- Display and load network images based on kamel-image
- Implement cross-platform file and data storage based on kstore-file and kstore
- Display Icons based on compose.materialIconsExtended

**Project Preview**

Android screenshots

| ![][kmpwaz-az-1] | ![][kmpwaz-az-2] | ![][kmpwaz-az-3] |
| :--------------: | :--------------: | :--------------: |
| ![][kmpwaz-az-4] | ![][kmpwaz-az-5] | ![][kmpwaz-az-6] |
| ![][kmpwaz-az-7] | ![][kmpwaz-az-8] | ![][kmpwaz-az-9] |

IOS screenshots

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