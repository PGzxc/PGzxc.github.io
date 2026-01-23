---
title: Android面试题——高频面试题之框架与原理(2)
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: 3a46b1d5
date: 2025-09-22 16:24:24
---
## 一 概述

```
本文题目来自于：
 - 面试招聘要求
 - 网友分享
```

<!--more-->

## 二 面试要求和面试题

### 2.1 面试要求(技术点提取)

```
1.retrofit,okhttp网络请求框架使用及二次封装
2.rxjava,room,eventbus,mmkv等常用框架使用及原理
3.图片框架：fresco,glide等图片加载库集成与优化
4.广告行业：聚合广告sdk开发经验(不限于gromore,sigmob,topon)
5.依赖注入框架
```

## 三 面试题解答(仅供参考)

### 3.1 retrofit,okhttp网络请求框架使用及二次封装

1、Retrofit 和 OkHttp 的区别？

```
1、Retrofit：
RESTful 网络请求封装库，基于注解简化接口定义，
默认使用 OkHttp 作为底层 HTTP 客户端，可替换为其他客户端（如 HttpURLConnection）。

2、OkHttp：
处理实际网络请求，支持连接池、拦截器、HTTP/2、GZIP 压缩
```

2、Retrofit 的工作原理？

```
1、核心：
动态代理 + 注解解析 + OkHttp。

2、流程：

2.1、通过 Retrofit.Builder() 配置 
baseUrl、Converter(如 GsonConverterFactory)、CallAdapter(如 RxJava2CallAdapterFactory)。
2.2、create(Class<T>) 使用动态代理生成接口实现，解析注解（如 @GET、@Query）。
2.3、方法调用转为 ServiceMethod，生成 OkHttp 的 Request。
2.4、OkHttp 执行请求，响应通过 Converter 转为实体类。

3、示例：

interface ApiService {
    @GET("users/{id}")
    Call<User> getUser(@Path("id") String id);
}
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://api.example.com/")
    .addConverterFactory(GsonConverterFactory.create())
    .build();
ApiService service = retrofit.create(ApiService.class);
service.getUser("123").enqueue(new Callback<User>() { ... });
```

3、OkHttp 核心组件

```
OkHttpClient：管理连接池、拦截器、超时等。
Request：包含 URL、Header、Body。
Call：请求抽象，支持同步/异步执行。
Interceptor：拦截器链，处理日志、缓存、重试等
```

4、OkHttp 请求流程

```
1、流程
创建 Request，通过 OkHttpClient.newCall() 生成 RealCall。
执行拦截器链：应用拦截器 → 重试 → 桥接 → 缓存 → 连接 → 网络请求。
响应反向通过拦截器链返回。


2、优势：
支持 HTTP/2、多路复用、GZIP 压缩、缓存。

3、示例：

OkHttpClient client = new OkHttpClient.Builder()
    .addInterceptor(chain -> chain.proceed(chain.request().newBuilder().addHeader("Token", "xyz").build()))
    .build();
Request request = new Request.Builder().url("https://api.example.com/").build();
client.newCall(request).enqueue(new Callback() { ... });
```

5、拦截器作用

```
应用拦截器：修改请求（如添加 Header、日志）。
网络拦截器：处理重试、缓存、压缩。
```

6、如何二次封装 Retrofit/OkHttp？

```
1、目的：
统一管理请求（BaseUrl、超时、Token）、错误处理，提高复用性。

2、实现：
-创建 ApiManager 封装 Retrofit 实例，配置公共参数。
-使用拦截器统一添加 Header 或处理 Token 刷新（捕获 401 错误后重试）。
-结合 Kotlin 协程 + Flow 或 RxJava 替代 Callback。
-封装 Result<T> 响应模型（code、msg、data）。


3、示例：

public class ApiManager {
    private static final Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("https://api.example.com/")
        .client(new OkHttpClient.Builder()
            .addInterceptor(chain -> chain.proceed(chain.request().newBuilder()
                .addHeader("Token", "xyz").build()))
            .build())
        .addConverterFactory(GsonConverterFactory.create())
        .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
        .build();
    public static <T> T createService(Class<T> serviceClass) {
        return retrofit.create(serviceClass);
    }
}
ApiService service = ApiManager.createService(ApiService.class);
service.getUser("123")
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe(user -> { ... }, throwable -> { ... });
```

7、错误码处理

```
在拦截器或 CallAdapter 中统一转换异常：
-网络异常：超时、断网，抛出 AppException。
-业务异常：Token 过期、权限不足，统一处理。
```

### 3.2 rxjava框架使用及原理

1、RxJava 的核心原理？

```
基于观察者模式，Observable 发射事件，Observer 订阅处理。
支持操作符（如 map、flatMap）和线程调度（Schedulers）
```

2、如何实现线程切换？

```
1、说明
subscribeOn：指定上游（数据发射）线程。
observeOn：指定下游（数据处理）线程。

2、示例：

Observable.just("Hello")
    .map(String::toUpperCase)
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe(text -> textView.setText(text));
```

### 3.3 room常用框架使用及原理

1、Room 的优点？

```
基于 SQLite 封装，提供编译时 SQL 校验、LiveData/Flow 支持，简化数据库操作
```

2、如何实现数据库升级？

```
使用 Migration 类，onMigrate 编写 ALTER/CREATE SQL
```

3、Room 的使用

```
1、概念
@Entity: 定义表结构。
@Dao: 定义查询接口（@Query、@Insert）。
@Database: 配置数据库。

2、示例
@Entity(tableName = "users")
public class User { @PrimaryKey int id; String name; }

@Dao
interface UserDao {
    @Query("SELECT * FROM users")
    Flowable<List<User>> getAll();
}

@Database(entities = {User.class}, version = 1)
abstract class AppDatabase extends RoomDatabase {
    abstract UserDao userDao();
}

AppDatabase db = Room.databaseBuilder(context, AppDatabase.class, "db").build();
db.userDao().getAll()
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe(users -> { ... });
```

4、原理

```
注解处理器生成 SQLite 代码，支持 LiveData/Flow 响应式查询
```


### 3.4 eventbus框架使用及原理

1、使用

```
注册：EventBus.getDefault().register(this);
发送：EventBus.getDefault().post(new MessageEvent());
接收：
@Subscribe(threadMode = ThreadMode.MAIN) 
public void onEvent(MessageEvent event) { ... }
```

2、原理

```
基于发布-订阅模式，通过反射 + @Subscribe 注解找到订阅方法。
维护 Map<EventType, SubscriberList>，通过 Handler/线程池切换线程
```

3、优缺点是什么？

```
优点：解耦组件，API 简单。
缺点：调试困难，反射性能开销，事件类型多时管理复杂。
面试点：需 unregister 防止内存泄漏。
```

4、与 RxJava/LiveData/Flow 对比

```
EventBus：简单消息总线，生命周期无感知。
RxJava：支持复杂操作符和错误处理。
LiveData/Flow：适合 MVVM，生命周期感知。
```

### 3.5 mmkv框架使用及原理

1、MMKV 相比 SharedPreferences 有什么优势？

```
MMKV 是腾讯开源的一款高效、轻量级的键值存储框架，其优势在于：

1、MMKV 优势：
读写速度快 10x（基于 mmap + protobuf）。
支持多进程、AES 加密、增量更新。
类型安全，支持多种数据类型。

2、SharedPreferences 缺点：
XML I/O 阻塞，易崩溃，多进程数据不一致
```

2、原理

```
使用内存映射（mmap）+ protobuf 编解码，写入更新内存区域，避免频繁 I/O
```

3、使用场景

```
轻量级键值存储，如用户配置、缓存标记、登录信息
```

4、使用

```
1.初始化 
MMKV.initialize(context);

2.操作 
MMKV kv = MMKV.defaultMMKV(); 
kv.encode("key", value);。

3.迁移 SP
kv.importFromSharedPreferences(sp);
```

5、面试点

```
多进程配置（MULTI_PROCESS_MODE）。
```

### 3.6 图片加载框架(Glide vs Fresco)

1、Glide 和 Fresco 的区别？适用场景？

```
1、Glide: 
轻量(~900KB)，加载快，API 简单，支持 GIF、缓存优化。适合普通 App。

2、Fresco: 
重型(~2-5MB)，Ashmem 内存管理(防 OOM)，支持渐进式 JPEG、动图。适合图片密集 App。

3、区别: 
Glide 依赖 Bitmap，内存压力大；
Fresco 内存优化强但包大。

4、面试点: 低端机用 Fresco，常规用 Glide。
```

2、Glide 的基本使用和优化？

```
1、使用
Glide.with(context)
    .load("https://example.com/image.jpg")
    .placeholder(R.drawable.placeholder)
    .error(R.drawable.error)
    .into(imageView);
    
2、优化
缓存：DiskCacheStrategy.ALL（原始+转换）。
压缩：override(width, height) 指定尺寸，RGB_565 减半内存。
预加载：preload() 或 thumbnail()
RecyclerView：dontAnimate() 防闪烁，pauseRequests() 优化滑动
```

3、如何优化图片加载性能？

```
缓存：内存（LRU）+磁盘缓存，减少重复请求。
压缩：尺寸压缩（匹配 ImageView）、质量压缩（JPEG）。
生命周期管理：绑定 Activity/Fragment 生命周期，防止内存泄漏。
格式优化：使用 WebP，CDN 按需加载。
Fresco 专属：ImagePipelineConfig 启用渐进式 JPEG，ImagePrefetcher 预加载。
面试点：OOM 预防（压缩尺寸、切片加载）。
```

### 3.7 广告行业：聚合广告sdk开发经验(不限于gromore,sigmob,topon)

1、常见广告说明

```
1、Gromore：
字节旗下，深度整合穿山甲广告资源，也支持其他平台，适合依赖字节生态（比如主要靠穿山甲变现）的场景。

2、Sigmob：
轻量化聚合工具，接入简单、SDK 体积小，更适合中小团队快速对接多广告源，降低技术成本。

3、Topon：
汇量科技旗下，广告源覆盖广，智能优化能力强（比如按收益动态选广告），适合需要精细化运营、追求高变现效率的场景（比如游戏类应用）
```

2、什么是聚合广告 SDK，它解决了什么问题？

```
1、定义：
集成多个广告平台（如 GroMore、Sigmob、TopOn）的中间层。

2、作用：
一次接入多平台，提升填充率和收益。
```

3、聚合广告 SDK 的接入流程？(以TopOn为例)

```
1、流程
注册平台，获取 AppID/PlacementID。
添加依赖：TopOn SDK + 各广告网络适配器。
初始化：TopOnAds.init(context, "appId", "appKey");
加载广告：TopOnBanner.loadAd(context, "placementId", bannerView);


2、GroMore：支持热插拔，动态加载 AAR。
3、Sigmob：支持 Report API 拉取收益数据.
4、面试点：权限（INTERNET）、混淆规则、测试设备配置
```

4、广告 SDK 开发中的常见问题？

```
初始化冲突：仅初始化聚合 SDK。
隐私合规：支持 GDPR/ATT。
填充率低：优化 Waterfall 策略。
多进程：配置 MMKV 或 SDK 多进程支持。
加密：AES 加密敏感数据，防逆向。
面试点：防作弊（设备指纹、行为验证）
```

5、接入聚合广告 SDK 时，有哪些关键的开发经验？

```
配置管理：确保 AppId/SlotId 准确，动态管理。
回调处理：统一封装 onAdLoaded、onAdShow、onAdClick，记录日志。
事件上报：确保展示、点击、收益等事件准确回传。
版本管理：关注 SDK 版本更新，测试兼容性。
异常处理：加载失败重试，降级到其他平台。
```

### 3.8 依赖注入框架

面试考点

```
DI 是 Android 架构面试的核心，常考 Hilt/Dagger 与 Koin 的区别，
强调解耦、测试性和减少样板代码。
```

1、 介绍一下依赖注入（DI）的概念

```
定义：将对象创建和依赖关系管理从对象内部转移到外部，实现 解耦。
作用：便于单元测试、模块化和维护。
示例：在 ViewModel 注入 Repository(仓库-负责数据的统一管理和协调)，而非手动 new。
```

2、DI 框架对比：Dagger/Hilt vs Koin

|  框架  |                             特点                             |        适用场景        |
| :----: | :----------------------------------------------------------: | :--------------------: |
| Dagger |              编译期注入，灵活，配置复杂，性能优              | 大型项目，复杂依赖关系 |
|  Hilt  | 基于 Dagger，简化组件生成，自动支持 ViewModel/WorkManager 注入 |   大型项目，官方推荐   |
|  Koin  |              运行时注入，DSL 简洁，灵活，上手快              |   中小项目，快速开发   |

3、常用注解解释

```
@Inject：标记构造函数/字段注入。
@Provides：在 Module 中提供复杂依赖实例。
@Binds：接口绑定实现，高效替代 @Provides（逻辑简单时用）。

Hilt 特性：@InstallIn 指定组件作用域，@SingletonComponent、@HiltViewModel 支持 ViewModel 注入。
```

4、Android 项目中使用 Hilt

```
1、添加依赖
implementation 'com.google.dagger:hilt-android'
kapt 'com.google.dagger:hilt-compiler'

2、Application 类添加注解：@HiltAndroidApp
3、Activity/Fragment 添加注解：@AndroidEntryPoint
4、ViewModel 注入：使用 @HiltViewModel 和 @Inject 构造函数
```

5、总结优化版

```
核心：DI 解耦、提高测试性、减少样板。
框架选择：Hilt/Dagger（大型项目）、Koin（中小项目）。
关键注解：@Inject / @Provides / @Binds。
落地经验：Hilt 注解 Application/Activity/ViewModel，实现自动注入
```
