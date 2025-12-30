### <font color=red>六 Kotlin Multiplatform Mobile项目</font>

#### 1—[WanAndroid-Compose-Multiplatform](https://github.com/PGzxc/WanAndroid-Compose-Multiplatform)

**项目归属**：个人项目
**项目名称**：WanAndroid-Compose-Multiplatform
**项目地址**：https://github.com/PGzxc/WanAndroid-Compose-Multiplatform
**软件支持**：Android+IOS+Desk(Mac/Windows/Linux)
**开发工具**：Android Studio(2022.3.1)+Java(17.0.6)+Gradle(8.0.2-bin)+Kotlin(1.9.0)
**项目描述**：本项目基于 WanAndroid API 开发，采用 Compose Multiplatform 实现跨平台界面构建，支持用户登录、注册、浏览文章、项目、导航与消息等核心功能。适配多端平台。     
**功能模块**：首页、导航、项目、消息、我、设置等   
**技术要点**：

- 基于模版compose-multiplatform-template创建项目
- 基于NavigationBar搭建底部导航框架
- 网络部分：ktor-core核心库+ktor-serialization-kotlinx-json序列化
- 基于Navigator实现界面间导航
- 基于kamel-image显示并加载网络图片
- 基于kstore-file和kstore实现跨平台文件及数据存储
- 基于compose.materialIconsExtended显示Icons图标

**项目预览**

Android截图

| ![][kmm-az-waz-1] | ![][kmm-az-waz-2] | ![][kmm-az-waz-3] | ![][kmm-az-waz-4] |
| ----------------- | ----------------- | ----------------- | ------------------- |
| ![][kmm-az-waz-5] | ![][kmm-az-waz-6] | ![][kmm-az-waz-7] | ![][kmm-az-waz-8] |
| ![][kmm-az-waz-9] |                      |                      |                      |

IOS截图

| ![][kmm-ios-waz-1] | ![][kmm-ios-waz-2] | ![][kmm-ios-waz-3] | ![][kmm-ios-waz-4] |
| ------------------ | ------------------ | ------------------- | ------------------- |
| ![][kmm-ios-waz-5] | ![][kmm-ios-waz-6] | ![][kmm-ios-waz-7] | ![][kmm-ios-waz-8] |
| ![][kmm-ios-waz-9] |                      |                      |                      |

<!--android-WanAndroid_Compose-multiplatform-->
<!--az-->
[kmm-az-waz-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-az-waz-home-1.png
[kmm-az-waz-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-az-waz-navigator-2.png
[kmm-az-waz-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-az-waz-project-3.png
[kmm-az-waz-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-az-waz-msg-4.png
[kmm-az-waz-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-az-waz-msg-5.png
[kmm-az-waz-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-az-waz-me-6.png
[kmm-az-waz-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-az-waz-me-7.png
[kmm-az-waz-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-az-waz-login-8.png
[kmm-az-waz-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-az-waz-register-9.png
<!--ios-->
[kmm-ios-waz-1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-ios-waz-home-1.png
[kmm-ios-waz-2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-ios-waz-navigator-2.png
[kmm-ios-waz-3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-ios-waz-project-3.png
[kmm-ios-waz-4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-ios-waz-msg-4.png
[kmm-ios-waz-5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-ios-waz-msg-5.png
[kmm-ios-waz-6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-ios-waz-me-6.png
[kmm-ios-waz-7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-ios-waz-me-7.png
[kmm-ios-waz-8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-ios-waz-login-8.png
[kmm-ios-waz-9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/multiplatform-ios-waz-register-9.png
