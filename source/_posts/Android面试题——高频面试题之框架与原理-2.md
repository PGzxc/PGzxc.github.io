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

## 二 面试要求和面试题(后续类似不再详述)

### 2.1 面试要求(技术点提取)

```
1.retrofit,okhttp网络请求框架使用及二次封装
2.rxjava,room,eventbus,mmkv等常用框架使用及原理
3.图片框架：fresco,glide等图片加载库集成与优化
4.广告行业：聚合广告sdk开发经验(不限于gromore,sigmob,topon)
```

## 三 面试题解答(仅供参考)

### 3.1 retrofit,okhttp网络请求框架使用及二次封装

1、Retrofit 和 OkHttp 的区别？

```
Retrofit 是 RESTful 网络请求封装库，基于注解简化接口定义，默认使用 OkHttp 作为底层 HTTP 客户端。
OkHttp 负责实际网络请求、连接池、拦截器等。
Retrofit 可替换客户端（如 HttpURLConnection）
```

2、Retrofit 的工作原理？

```
1、简洁款
-Retrofit 本质上是对 OkHttp + 动态代理 + 注解解析 的封装。
-接口方法通过动态代理生成 ServiceMethod，最终调用 OkHttp 发起请求。

2、详解款
-通过 Retrofit.Builder() 配置 baseUrl、
Converter(如 GsonConverterFactory)、CallAdapter(如 RxJavaCallAdapter)。
-create(Class<T>) 使用动态代理生成接口实现，解析注解（如 @GET、@Query）。
-方法调用转为 ServiceMethod，生成 OkHttp 的 Request。
-OkHttp 执行请求，响应通过 Converter 转为实体类

3、示例
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

3、OkHttp 的核心组件

```
OkHttpClient: 管理连接池、拦截器、超时等。
Request: 包含 URL、Header、Body。
Call: 请求抽象，支持同步/异步。
Interceptor: 拦截器链（如日志、缓存）
```

4、请求流程

```
1、请求流程
-创建 Request，通过 OkHttpClient.newCall() 生成 RealCall。
-执行拦截器链：应用拦截器 → 重试 → 桥接（协议处理） → 缓存 → 连接 → 网络请求。
-响应反向通过拦截器链返回。

2、优势: HTTP/2、多路复用、GZIP 压缩、缓存

3、示例
OkHttpClient client = new OkHttpClient.Builder()
    .addInterceptor(chain -> chain.proceed(chain.request().newBuilder().addHeader("Token", "xyz").build()))
    .build();
Request request = new Request.Builder().url("https://api.example.com/").build();
client.newCall(request).enqueue(new Callback() { ... });
```

5、拦截器作用

```
应用拦截器：修改请求 header、统一参数、打印日志。
网络拦截器：处理重试、缓存、压缩
```

6、如何二次封装 Retrofit/OkHttp？

```
1、目的: 
统一管理请求（公共参数、Token、错误处理）、提高复用性。

2、流程
-统一管理 BaseUrl、超时时间、证书。
-结合 Kotlin 协程 + Flow 替代传统 Callback。
-封装统一的 Result<T> 响应模型，包含 code、msg、data。

3、方式:
创建 ApiManager 封装 Retrofit 实例。
添加拦截器处理 Header 或 Token 刷新。
结合 RxJava 实现线程切换

4、面试点: 
Token 过期处理（拦截器捕获 401，自动刷新 Token 后重试）

5、示例
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
// 使用
ApiService service = ApiManager.createService(ApiService.class);
service.getUser("123")
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe(user -> { ... }, throwable -> { ... });
```

7、错误码处理

```
在拦截器或 CallAdapter 中统一转换成业务异常。
网络异常（超时、断网） → AppException。
业务异常（token 过期、权限不足） → 业务层统一处理
```

### 3.2 rxjava框架使用及原理

1、RxJava 的核心原理？

```
基于观察者模式，
Observable 发射事件，
Observer 订阅处理。

支持操作符（如 map、flatMap）和线程调度（Schedulers）
```

2、如何实现线程切换？

```
RxJava 通过 Scheduler + 线程池 管理线程切换。
subscribeOn 决定订阅线程，observeOn 决定观察者线程。
subscribeOn() 指定上游线程，observeOn() 指定下游线程
```

3、示例:

```
Observable.just("Hello")
    .map(String::toUpperCase)
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe(text -> textView.setText(text));
```

### 3.3 room常用框架使用及原理

1、Room 的优点？

```
基于 SQLite 封装，提供编译时 SQL 校验、LiveData/Flow 支持
```

2、如何实现数据库升级？

```
通过 Migration 类实现，onMigrate 方法写 ALTER/CREATE SQL
```

3、Room 的使用

```
@Entity: 定义表结构。
@Dao: 定义查询接口（@Query、@Insert）。
@Database: 配置数据库。
```

4、原理

```
注解处理器生成 SQLite 代码，支持 LiveData/Flowable
```

5、与 RxJava 结合？(示例：返回 Flowable 或 Single)

```
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
// 使用
AppDatabase db = Room.databaseBuilder(context, AppDatabase.class, "db").build();
db.userDao().getAll()
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe(users -> { ... });
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
1、文字描述
EventBus 同样基于发布-订阅模式。
它维护一个订阅者（Subscriber）注册表，
当事件发布时，它会遍历注册表中所有订阅者，找到与事件类型匹配的方法并执行。

2、原理
利用 反射 + 注解（@Subscribe） 找到订阅方法，
内部维护 Map<EventType, SubscriberList>，
通过 Handler 或线程池切换线程。
```

3、优缺点是什么？

```
1、优点: 
-解耦: 组件之间无需直接依赖，只需通过 EventBus 传递事件即可。
-使用简单: 通过注解 @Subscribe 即可快速定义事件处理方法。

2、缺点:
-调试困难: 无法直观地追踪事件的发布方和订阅方。
-性能开销: 可能会有额外的反射开销。
-管理复杂: 如果事件类型过多，维护起来会比较混乱。
```

4、与 RxJava 对比？

```
EventBus 简单但功能单一；
RxJava 支持复杂操作符和错误处理，可替代 EventBus。
```

5、LiveData/Flow 有何区别？

```
EventBus 偏消息总线，生命周期无感知；
LiveData/Flow 更适合 MVVM 架构下的状态驱动。
```

6、面试点

```
EventBus 内存泄漏（需 unregister）
```

### 3.5 mmkv框架使用及原理

1、MMKV 相比 SharedPreferences 有什么优势？

```
MMKV 是腾讯开源的一款高效、轻量级的键值存储框架，其优势在于：

1.性能卓越: 
MMKV 使用 mmap（内存映射） 技术，读写速度远超 SharedPreferences。
SharedPreferences 是通过 XML 文件读写，存在 IO 阻塞。

2.多进程支持: MMKV 原生支持多进程读写同步，而 SharedPreferences 在多进程下容易出现数据不一致。
3.类型安全: 支持基本类型、String、byte[] 等，无需手动转换。
4.轻量和稳定: MMKV 的核心是 C++ 实现，体积小，并且稳定可靠。
```

2、优势

```
读写速度快 10x，支持加密、多进程；
SP I/O 阻塞、易崩溃
```

3、MMKV 为何比 SharedPreferences 快？

```
原理：
基于 mmap 内存映射 + protobuf 编解码，
支持 AES 加密、增量更新、多进程，
写入时只需更新内存映射区域，不涉及频繁 IO。
```

4、使用场景？

```
轻量级 KV 存储，如用户配置、缓存标记、登录信息
```

5、使用

```
1.初始化 
MMKV.initialize(context);

2.操作 
MMKV kv = MMKV.defaultMMKV(); 
kv.encode("key", value);。
```

6、示例

```
迁移 SP：
kv.importFromSharedPreferences(sp);
```

7、面试点

```
MMKV 在多进程中的配置（MULTI_PROCESS_MODE）
```

### 3.6 图片框架：fresco,glide等图片加载库集成与优化

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

3、面试点: 
RecyclerView 中用 dontAnimate() 防闪烁
```

3、如何优化图片加载性能？

```
1、Glide: 限制内存（MemorySizeCalculator）、WebP 格式、CDN 按需加载。
2、Fresco: 配置 ImagePipelineConfig 启用渐进式 JPEG，ImagePrefetcher 预加载。
3、通用: LRU 缓存、RecyclerView 限制可见项加载、HTTP/2.0。
4、面试点: OOM 预防（压缩尺寸、切片加载）。
```

4、如何对图片加载进行优化？

```
1、缓存策略: 
合理利用内存缓存和磁盘缓存，减少重复的网络请求和解码。

2、图片压缩: 
 -尺寸压缩: 加载时将图片尺寸压缩到目标 ImageView 的大小，避免加载过大的图片。
 -质量压缩: 针对 JPEG 格式进行质量压缩，减少文件大小。

3、生命周期管理:
确保图片加载与Activity/Fragment 的生命周期同步，避免在界面销毁后继续加载，造成内存泄漏。

4、内存配置: 
根据设备性能，调整内存缓存和磁盘缓存的大小，避免过度占用内存。

5、特殊格式: 
对于需要显示 GIF 或 WebP 的场景，使用支持相应格式的框架
```

5、优化点

```
-使用 .placeholder()、.error() 占位图，提升用户体验。
-合理设置 inSampleSize 降低内存。
-结合 RecyclerView 的 setHasFixedSize(true)、setRecycledViewPool() 优化滑动性能。
-在列表快速滑动时暂停加载（Glide 提供 pauseRequests()）
```

### 3.7 广告行业：聚合广告sdk开发经验(不限于gromore,sigmob,topon)

1、什么是聚合广告 SDK，它解决了什么问题？

```
1、什么是聚合广告 SDK
聚合广告 SDK 是一个将多个广告平台的 SDK 集成在一起的中间层。


2、它解决了什么问题？
它解决了开发者需要接入多个广告平台（如 GroMore、Sigmob、TopOn 等）来提升广告填充率和收益的痛点。
通过聚合 SDK，开发者只需一次接入，即可管理和调用不同广告平台的资源
```

2、聚合广告 SDK 的接入流程？

```
1、流程(以TopOn为例):
-注册平台，创建 App 和广告位，获取 AppID/PlacementID。
-添加依赖：implementation 'com.toponad:TopOnSDK:最新版' + 各广告网络适配器。
-初始化：TopOnAds.init(context, "appId", "appKey");
-加载广告：javaTopOnBanner.loadAd(context, "placementId", bannerView);

2、GroMore: 支持热插拔，动态加载 AAR。
3、Sigmob: 支持 Report API 拉取收益数据。
4、面试点: 权限（INTERNET）、混淆规则、测试设备配置。
```

3、广告 SDK 开发中的常见问题？

```
问题: 多初始化冲突（只初始化聚合 SDK）、隐私合规（GDPR/ATT）、填充率低（优化 Waterfall）。
多进程: 配置 MMKV.MULTI_PROCESS_MODE 或 SDK 多进程支持。
加密: AES 加密存储敏感数据，防逆向。
面试点: 防作弊（设备指纹、行为验证）。
```

4、接入聚合广告 SDK 时，有哪些关键的开发经验？

```
1、配置管理: 
聚合 SDK 通常需要配置每个广告平台的 AppId、SlotId 等信息。
需要确保配置准确无误，并根据后台配置动态管理。

2、回调处理:
聚合 SDK 会提供各种回调接口，如广告加载成功、失败、展示、点击等。
需要对这些回调进行细致处理，并做好日志记录，方便排查问题。

3、事件上报: 
广告行业的关键事件上报（如展示、点击、收益等）至关重要。
需要确保所有事件都能够准确、及时地回传给业务后台，以便进行数据分析和收益统计。

4、版本管理: 
及时关注聚合 SDK 和各广告平台的 SDK 版本更新，并进行兼容性测试，避免因版本差异导致的问题。

5、异常处理: 
针对加载失败、展示失败等异常情况，需要有完善的重试机制和降级方案，以保证用户体验和收益。
例如，当一个平台的广告加载失败时，可以尝试加载其他平台的广告。
```

5、多平台适配

```
1、聚合 SDK 本质是适配层，底层会调用穿山甲、GDT、Unity 等渠道。

2、回调需做统一封装，例如：
onAdLoaded
onAdShow
onAdClick
```

