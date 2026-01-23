

### <font color=red>3. iOS Projects</font>

#### 1—[SwiperIOS](https://github.com/PGzxc/SwiperIOS)

**Project Ownership**：Personal Project
**Project Name**：SwiperIOS (Private)
**Project Address**：https://github.com/PGzxc/SwiperIOS
**Software Support**：iOS
**Development Tools**：MacOS(15.7.3)+Xcode(26.2)+Swift(6.2.3)+Trae(AI Programming Assistant)
**Project Description**：SwiperIOS is a high-fidelity Douyin + Xiaohongshu native iOS short video and image-text community application, developed based on Swift + SwiftUI, combined with api.apiopen.top free open interface, realizing full-screen video vertical swipe, image waterfall flow browsing, publishing pop-up, message reminders and other social experiences; adopting MVVM architecture and unified network layer encapsulation, dark immersive vision and gesture interaction are close to native applications
**Functional Modules**：

* Home: Vertical swipe (Swiper) full-screen video, auto-play when entering the viewport, auto-pause when leaving, and auto-pagination loading at the end
* Gallery: Two-column adaptive waterfall flow, dynamic column width and spacing, click on the image to enlarge the full screen and support pinch-to-zoom
* Publish: Bottom middle raised publish button triggers pop-up window, providing album/camera/text entry
* Message: List page and bottom navigation red dot reminder
* Me: Personal page basic structure, can be expanded later with works, collections, drafts and settings

**Technical Points**：

- Routing and Navigation: SwiftUI TabView + componentized file structure, implementing top tabs and bottom navigation
- Vertical Pagination: Encapsulate UIPageViewController vertical pagination, index synchronization and switching notifications
- Custom Components: BottomTabBar middle raised publish button, selected item elastic scaling animation
- Architecture and State: MVVM + ObservableObject/@Published, decoupling view and data flow
- Network Layer: Encapsulate APIService to uniformly manage requests, underlying APIClient based on Alamofire + ObjectMapper
- Data Mapping: Universal response model + business model JSON mapping, compatible with old/new fields
- Interface Layout: Gallery waterfall flow dynamic column width and spacing, two-column staggered optimization of visual density
- Adaptation and Immersion: GeometryReader + safeAreaInsets responsive layout, content penetration status bar
- Video Playback: AVPlayer viewport enter auto-play/leave pause, buffer indication and loop playback
- Build and Dependencies: CocoaPods management dependencies, Fastlane scripted multi-environment packaging and publishing

Project Preview

| ![][swiperios-1] | ![][swiperios-2] | ![][swiperios-3] |
| :--------------: | :--------------: | :--------------: |
| ![][swiperios-4] | ![][swiperios-5] | ![][swiperios-6] |
| ![][swiperios-7] | ![][swiperios-8] | ![][swiperios-9] |

#### 2—[WanAndroid_SwiftUI](https://github.com/PGzxc/WanAndroid_SwiftUI)

**Project Ownership**：Personal Project
**Project Name**：WanAndroid_SwiftUI
**Project Address**：https://github.com/PGzxc/WanAndroid_SwiftUI
**Software Support**：iOS
**Development Tools**：MacOS(13.4)+Xcode(14.3.1)+Swift(5.8.1)
**Project Description**：This project is an iOS application developed based on the open API of WanAndroid website. Using SwiftUI to build the interface, through HStack, VStack, ZStack and other layouts and common components to quickly implement UI construction and real-time preview; the network layer uses Alamofire with AlamofireObjectMapper to implement data requests and model mapping.  
**Functional Modules**：Home, Navigation, Project, Message, Me, etc.   
**Technical Points**：

- Use TabView+NavigationStack to build the main project framework
- Encapsulate API interfaces and routing management, including BaseURL, methods, paths and parameters, to achieve unified management of network requests
- Alamofire sends network requests, combined with AlamofireObjectMapper to parse response data into Swift models
- Based on MVVM architecture design, using ObservableObject to simplify data and view binding
- Integrate SDWebImageSwiftUI for efficient network image loading and caching
- Implement user data persistence storage through AppStorage
- Use environmentObject to share and manage global application state
- Implement SwiftUI home carousel based on ImageCarousel

**Project Preview**

|![][swift-waz-1]| ![][swift-waz-2]|![][swift-waz-3] |![][swift-waz-4] |
| -------------- | --------------- | --------------  | --------------  |
|![][swift-waz-5]|![][swift-waz-6] |![][swift-waz-7] |![][swift-waz-8] |
|![][swift-waz-9]|![][swift-waz-10]|![][swift-waz-11]|![][swift-waz-12]|

#### 3—[ZhiHuSwiftUI](https://github.com/PGzxc/ZhiHuSwiftUI)

**Project Ownership**：Personal Project
**Project Name**：ZhiHuSwiftUI (Open Source + AI)
**Project Address**：https://github.com/PGzxc/ZhiHuSwiftUI
**Software Support**：iOS
**Development Tools**：MacOS(15.3.2)+Xcode(16.2)+Swift(6.0.3)
**Project Description**：This is an iOS version of the Zhihu community client developed with SwiftUI, adopting MVVM architecture, with complete community functions. The homepage can view post lists and details; the market column displays topics and columns; the publish button supports users to publish articles and questions; the message list column presents interactive information such as likes, comments, follows, etc.; there is also a personal center to facilitate users to manage personal affairs.  
**Functional Modules**：Home, Market, Publish, Message, Me, etc.   
**Technical Points**：

- Use TabView+NavigationStack to build the main project framework
- Adopt MVVM architecture (Model + View + ViewModel) to simplify the decoupling of data and view
- Use URLSession and async/await to implement efficient network requests and asynchronous programming
- Implement data persistence storage through UserDefaults
- Use @StateObject, @Published, @EnvironmentObject for state management and data sharing
- Custom component View to improve code reusability
- Mock simulate temporary data

**Project Preview**

| ![][ios-zh-1] | ![][ios-zh-2]  | ![][ios-zh-3]  | ![][ios-zh-4]  |
| ------------- | -------------- | -------------- | -------------- |
| ![][ios-zh-5] | ![][ios-zh-6]  | ![][ios-zh-7]  | ![][ios-zh-8]  |
| ![][ios-zh-9] | ![][ios-zh-10] | ![][ios-zh-11] | ![][ios-zh-12] |


<!--IOS-Swiperios-->
[swiperios-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-1-home-play.png
[swiperios-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-2-home-state.png
[swiperios-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-3-focus-state.png
[swiperios-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-4-home-city.png
[swiperios-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-5-album.png
[swiperios-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-6-album-big.png
[swiperios-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-7-pub.png
[swiperios-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-8-msg.png
[swiperios-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiperios-9-me.png


<!--IOS-Wanandroid-SwiftUI-->
[swift-waz-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-1-home.png
[swift-waz-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-2-tree.png
[swift-waz-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-3-treetab.png
[swift-waz-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-4-project.png
[swift-waz-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-message-unread-5.png
[swift-waz-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-message-read-6.png
[swift-waz-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-message-info-7.png
[swift-waz-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-me-info-8.png
[swift-waz-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-me-info-no-9.png
[swift-waz-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-login-10.png
[swift-waz-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-register-11.png
[swift-waz-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/swiftui-waz-12-web.png

<!--IOS SwiftUI版本—仿知乎-->

[ios-zh-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-1-login.png
[ios-zh-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-2-register.png
[ios-zh-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-3-home.png
[ios-zh-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-4-home-detail.png
[ios-zh-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-5-market.png
[ios-zh-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-6-market-detail.png
[ios-zh-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-7-pub.png
[ios-zh-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-8-msg.png
[ios-zh-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-9-msg-detail.png
[ios-zh-10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-10-me.png
[ios-zh-11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-11-me-edit.png
[ios-zh-12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/zh-ios-12-set.png