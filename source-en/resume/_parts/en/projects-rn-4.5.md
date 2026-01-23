

### <font color=red>5. React Native Projects</font>

#### 1—[SwiperRN](https://github.com/PGzxc/SwiperRN)

**Project Ownership**：Personal Project
**Project Name**：SwiperRN (Private)
**Project Address**：https://github.com/PGzxc/SwiperRN
**Software Support**：Android+iOS+Web
**Development Tools**：VS Code+Trae(AI Programming Assistant)+Java(17.0.15)+Node(25.2.1)+Yarn(1.22.22)+react-native(0.81.5)+Expo(54)
**Project Description**：SwiperRN is a high-fidelity Douyin + Xiaohongshu cross-platform short video & image-text community application, developed based on React Native + Expo ecosystem, combined with api.apiopen.top free open interface, realizing full-screen video vertical swipe, image note waterfall flow, dynamic publishing, message notification and other complete social experiences. Supports iOS, Android, Web three ends truly write once run everywhere, visual effects and interactive experience close to native applications.    
**Functional Modules**：

* Home: Douyin-style full-screen video vertical swipe (Swiper), auto-play + gesture pause, support pull-down refresh, pull-up load more
* Gallery: Xiaohongshu-style two-column/three-column adaptive image waterfall flow, dynamic height, click to enlarge to view details
* Publish: Support shooting/album selection of videos, images, multi-image upload, rich text title + topic tags, call interface one-click publish
* Message: Likes, comments, follows, system notification list, real-time red dot reminder, can jump to corresponding content
* Me: Personal homepage grid/list display works, favorites, drafts, settings and night mode switching

**Technical Points**：

- Routing and Navigation: Based on Expo Router to implement file system routing system
- Custom Components: BottomTabBar middle raised button and dynamic scaling effect
- Type System: Based on TypeScript for type definition, ensuring code quality and maintainability
- Network Request: Encapsulate ApiService (fetch/axios) to uniformly manage network requests
- UI Layout: Implement image waterfall flow layout, dynamically calculate column height and image position
- Gesture Interaction: React Native Gesture Handler implements swipe switching
- Animation Effects: React Native Animated and Reanimated high-performance animations
- Adaptation Scheme: SafeAreaContext and Dimensions API responsive layout
- Video Playback: expo-av + FlatList implements "enter viewport auto-play + leave pause", preload next video
- Build and Publish: EAS Build multi-environment application packaging and publishing

**Project Preview-Android**

| ![][swiperrn-az-1] | ![][swiperrn-az-2] | ![][swiperrn-az-3] |
| :----------------: | :----------------: | :----------------: |
| ![][swiperrn-az-4] | ![][swiperrn-az-5] | ![][swiperrn-az-6] |
| ![][swiperrn-az-7] | ![][swiperrn-az-8] | ![][swiperrn-az-9] |

**Project Preview-iOS**

| ![][swiperrn-ios-1] | ![][swiperrn-ios-2] | ![][swiperrn-ios-3] |
| :-----------------: | :-----------------: | :-----------------: |
| ![][swiperrn-ios-4] | ![][swiperrn-ios-5] | ![][swiperrn-ios-6] |
| ![][swiperrn-ios-7] | ![][swiperrn-ios-8] |                     |

#### 2—[WanAndroidRN](https://github.com/PGzxc/WanAndroidRN)

**Project Ownership**：Personal Project
**Project Name**：WanAndroidRN (Open Source)
**Project Address**：https://github.com/PGzxc/WanAndroidRN
**Software Support**：Android+iOS
**Development Tools**：IntelliJ IDEA+Java(11.0.19)+Node(18.18.2)+Yarn(1.22.19)+react-native(0.72.6)+Expo(49)
**Project Description**：This project is a React Native open source App built based on the open API of WanAndroid website. With the help of Expo Go development tools, combined with @ant-design/react-native Ant Financial UI library, it realizes cross-platform support for Android and iOS systems, making it convenient for users to access the website.     
**Functional Modules**：Home, Navigation, Project, Message, Me, etc.   
**Technical Points**：

- Use React Navigation to build bottom navigation framework, realizing smooth page switching
- Adopt Fetch API for network requests, use Promise to simplify asynchronous process
- Use React Hooks (useEffect + useState) to implement data fetching and state updates
- Design reusable custom components to improve code maintainability and development efficiency
- Implement carousel effect based on ant-design/react-native-Carousel
- Implement tab switching based on ant-design/react-native-Tabs

**Project Preview**

| ![][rn-waz-1] | ![][rn-waz-2] | ![][rn-waz-3] |
| ------------- | ------------- | ------------- |
| ![][rn-waz-4] | ![][rn-waz-5] | ![][rn-waz-6] |
| ![][rn-waz-7] | ![][rn-waz-8] | ![][rn-waz-9] |

#### 3—[ZhiHuRN](https://github.com/PGzxc/ZhiHuRN)

**Project Ownership**：Personal Project
**Project Name**：ZhiHuRN (Open Source + AI)
**Project Address**：https://github.com/PGzxc/ZhiHuRN
**Software Support**：Android+iOS
**Development Tools**：IntelliJ IDEA+Java(11.0.19)+Node(22.14.0)+Yarn(1.22.22)+react-native(0.76.7)+Expo(52)
**Project Description**：This project is a Zhihu-like mobile application developed based on React Native. It has implemented many core page functions, including login and registration, home page post browsing and publishing, post search on the discovery page, search history display and hot topic presentation, message notification, and personal information management.      
**Functional Modules**：Login Registration, Home, Discovery, Notification, Me   
**Technical Points**：

- Use React Navigation to build bottom navigation framework, realizing smooth page switching
- Based on Redux for global state management, ensuring data consistency and responsiveness
- Design and reuse custom components to improve code reuse rate and maintainability
- Adopt async-storage and expo-secure-store to implement local data secure storage
- Based on expo-image-picker (image selection), expo-image-manipulator (image processing), expo-file-system (file operation)
- Based on react-native-safe-area-context (safe area handling), react-native-screens (native screen container) to handle display and performance issues

**Project Preview**

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