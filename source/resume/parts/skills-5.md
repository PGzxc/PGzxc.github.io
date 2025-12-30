## 技能清单

### Android
1. 熟悉项目开发模式：传统(XML+Java/Kotlin)与声明式UI(ComposeUI)
2. 熟悉多线程与异步通信机制：Handler、AsyncTask、Coroutine、线程池等
3. 熟悉主流架构模式与实践：MVC/MVP/MVVM/MVI
4. 熟悉核心框架与原理：Retrofit/OkHttp、RxJava、Room、EventBus、MMKV、Glide/Fresco等
5. 熟悉主流商用SDK集成与调试：登录、短信验证、IM、视频/直播、推送、支付、地图等
6. 理解Android核心机制：消息机制、事件分发机制、View绘制流程
7. 熟悉性能调优与分析：启动优化、卡顿检测、内存优化、网络优化、过度绘制优化等
8. 熟练使用性能调试工具：Profiler、TraceView、Systrace、MAT、LeakCanary等
9. 熟悉兼容与适配:设备适配(手机/平板/折叠屏)及版本适配(Android 6.0+)
10. 了解系统底层原理：ART/Dalvik虚拟机、Binder通信机制、内存/进程管理、应用启动流程

### IOS
1.  熟悉项目开发模式：传统UIKit(xib/Storyboard+OC/Swift)与声明式UI(SwiftUI)
2.  熟悉开发与协作工具：依赖管理(CocoaPods/SPM/Carthage)、版本控制(Git/GitHub/Sourcetree)、CI/CD
3.  熟悉主流框架：Alamofire/AFNetworking、SwiftyJSON/ObjectMapper、SDWebImage/Kingfisher等
4.  熟悉常见数据存储：UserDefaults/MMKV、Core Data、Realm/SQLite
5.  理解系统机制：事件传递机制、响应链、自定义控件、KVC/KVO、CALayer/UIView等
6.  理解底层原理：Runtime动态机制、RunLoop工作原理、内存管理(MCR/ARC)、多线程(GCD/NSOperation)
7.  熟悉常见商业SDK：推送、IM、支付、社交分享、视频/直播、地图等
8.  熟悉性能优化：内存泄漏检测、崩溃分析、卡顿与性能监控、工具(Instruments/Leaks/Time Profiler)
9.  熟悉兼容和适配：尺寸(iphone/ipad)、屏幕分辨率、系统兼容性
10.  具备App Store上架经验，熟悉签名、证书管理及常见审核问题处理流程

### Harmony

1. 熟悉鸿蒙多语言开发体系：Java、arkts/ts/js、仓颉
2. 熟悉鸿蒙应用模型：Stage模型、FA模型
3. 熟悉UIAbility生命周期及回调
4. 熟悉鸿蒙装饰器和状态管理器：v1和v2版本、$和$$、全局状态管理等
5. 熟悉arkts多线程：TaskPool和Worker
6. 熟悉异步与事件：异步(回调、Promise/async/await等)、事件机制(EventHub、组件事件)
7. 熟悉组件双向通信：@Prop/@Observed、@Link、@Provide/@Consume、Emitter/EventHub
8. 熟悉鸿蒙系统能力：文件访问、相机、位置、网络、通知、媒体播放等
9. 熟悉分布式开发：分布式数据(共享)，分布式软总线、分布式api
10. 熟悉轻量化服务:原子化服务、卡片服务

### Flutter

1. 熟悉Flutter中组件体系及生命周期：StatelessWidget、StatefulWidget 
2. 理解Flutter中三棵树：Widget Tree、Element Tree、RenderObject Tree
3. 熟悉Flutter中启动流程与性能优化：应用启动到首页渲染的完整链路与启动加速方案
4. 熟悉Flutter中异步及网络：Future/Stream、async/await及Future、Dio/Retrofit等
5. 熟悉Flutter中本地存储：SharedPreferences、SQLite/Drift、Hive/Isar
6. 熟悉Flutter中路由管理：Navigator 1.0/2.0、GoRouter、AutoRoute
7. 熟悉Flutter中状态管理：Provider、Bloc、Riverpod、GetX、MobX、Cubit
8. 熟悉Flutter底层机制：三棵树渲染机制、UI 绘制流程等
9. 了解原生混合开发与通信机制：Flutter与原生混合、XXChannel通信
10. 熟悉性能与多端适配：启动优化与防白屏、性能优化及调优工具、多端适配、溢出问题

### React Native

1. 熟悉前端基础：html/css/js、es6、ts/jsx、react、vue等
2. 熟悉RN基础：函数/类组件、Props/State、组件封装、Hooks、生命周期
3. 熟悉RN状态管理：Redux、MobX、Zustand、Recoil等
4. 熟悉RN工具与工程化：Webpack/Vite/Rollup、Expo(CLI/Dev Client)、CI/CD
5. 熟悉RN路由与导航：React Navigation、React Router Native、Wix Navigation
6. 熟悉RN数据存储：AsyncStorage、MMKV、Realm、SQLite、WatermelonDB
7. 理解RN渲染原理：虚拟 DOM diff 算法、Yoga 布局引擎、Bridge通信机制及新架构(JSI/Fabric)
8. 熟悉RN组件通信：父传子(Props)、子传父(回调函数)、跨层级(状态管理)
9. 熟悉RN常见库：UI库(NativeBase/RN Elements)、跨平台 UI(Ant Design)
10. 了解原生扩展与通信能力：原生接入(蓝牙/位置/推送)、原生通信(TurboModules/JSI)等

### Kotlin Multiplatform Mobile

1. 熟悉Kotlin语言：类型推断、空安全、扩展函数、协程、数据类/密封类等
2. 熟悉KMP平台特化：expect/actual机制、commonMain/androidMain/iosMain模块划分
3. 熟悉KMP构建与配置：kotlin{targets {}}、多平台依赖、Gradle DSL
4. 熟悉KMP架构：shared模块MVVM架构、封装ViewModel/Repository
5. 熟悉KMP数据层：网络层(Ktor)、数据库(SQLDelight)、存储层(KStore/Preferences)等
6. 熟悉KMP协程调度：协程(CoroutineScope)、调度(Dispatcher)
7. 熟悉KMP依赖注入体系：Hilt(Android侧)、Koin(多平台实现)
8. 了解KMP编译与构建流程：构建流程、编译产物(Framework/klib)、XCFramework打包及静态链接
9. 了解KMP性能与内存优化：新GC模型、数据冻结问题、跨线程优化
10. 了解KMP与原生互操作：Android/Ios调用shared模块、桥接Swift与Kotlin数据类型

### Java

1. 熟练掌握 Java 基础语法、集合、多线程、反射等核心技术
2. 熟悉 JVM 内存管理、垃圾回收机制及类加载原理
3. 掌握 Spring、Spring Boot、MyBatis 等主流开发框架
4. 熟练使用 MySQL、Redis 等数据库与缓存技术，具备 SQL 编写与调优能力
5. 了解分布式架构，掌握常见中间件如 RabbitMQ、Kafka、Nacos、Dubbo 等
6. 熟悉网络编程、HTTP 协议及并发处理，掌握线程池、锁机制等并发模型
7. 熟练使用 Git、Maven、IDEA 等开发工具，了解 Jenkins、Docker 等自动化部署流程
8. 熟悉 Junit、Mockito 等单元测试框架，了解常见 Web 安全(XSS、CSRF、SQL 注入)风险


### 微信小程序
1. 熟练掌握标记语言、样式表、JS，进行功能开发
2. 熟悉常用组件的使用及相关API
3. 熟悉小程序网络API功能的封装及返回数据处理
4. 熟悉小程序功能调试及异常问题解决
5. 熟悉小程序模板template封装及调用
6. 熟悉小程序动画即画布Canvas绘制
7. 熟悉小程序第三方SDK使用

### 前端

1. 熟悉HTML5与语义化：语义化标签、音视频、Canvas、WebSocket、LocalStorage 等
2. 熟悉CSS3布局与样式体系：Flex/Grid布局、BFC、定位机制及CSS优先级，动画、变量与Sass/Less等
3. 熟悉JS核心机制：闭包、原型链、this绑定、事件模型、异步编程(Promise、async/await、事件循环)
4. 理解浏览器工作原理与性能优化：渲染流程、缓存策略、重排重绘优化及安全防护(XSS、CSRF)
5. 熟悉ES6+新特性与模块化体系：解构赋值、可选链、Proxy/Reflect、Symbol、ESM模块化、Babel转译机制
6. 熟悉主流前端框架：Vue2/Vue3响应式，Hooks 原理与 Diff 算法
7. 熟悉前端工程化与构建工具链：构建工具(Vite、Webpack、Rollup等)及优化策略(分包、懒加载、代码分割)
8. 了解Node.js与全栈框架：后端框架(Express、Koa、NestJS等)，理解BFF模式与 CI/CD 部署流程
9. 理解网络通信与协议原理：HTTP/HTTPS、DNS、CDN、负载均衡、WebSocket通信及RESTful/GraphQL
10. 具备性能与前沿技术应用能力：首屏优化、虚拟列表、懒加载、了解微前端、WebAssembly、WebGPU、AI

### C#

1. 熟悉 C# 语言及.NET Framework，熟练开发 ASP.NET 和 WinForm 应用
2. 熟悉 Web 开发技术，掌握 Flex、CSS、JavaScript、XML 及 WebService
3. 熟练使用 GDI+、IO、多线程和网络编程技术进行 WinForm 程序开发
4. 理解并应用三层架构设计，熟悉 B/S 和 C/S 应用模式开发
5. 熟悉掌握使用常用的设计模式，如单例模式、工厂模式等
6. 熟悉常用源码管理工具的配置与使用，如SVN、Git
7. 熟悉 SQL Server、MySQL 和 Access 数据库，熟练使用 ADO.NET 进行数据访问与操作
8. 熟悉 DevExpress、ComponentOne 等常用 WinForm 第三方控件库

### AI

1. 熟悉开发 Flutter 基于 gemini-1.5-flash 模型制作 AI 图文软件
2. 熟悉基于 TensorFlow Lite 模型进行图像识别分类
3. 熟悉基于 TensorFlow Lite 模型进行对象检测
4. 熟悉基于 TensorFlow Lite 模型识别单人或多人姿势
5. 熟悉基于 TensorFlow Lite 模型识别语音指令
6. 熟悉基于 TensorFlow Lite 模型进行智能回复
7. 熟悉基于 TensorFlow Lite 模型识别视频片段中人体动作
8. 熟悉基于 TensorFlow LLte 模型进行自然语言处理回答问题