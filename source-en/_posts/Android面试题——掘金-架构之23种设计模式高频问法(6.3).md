---
title: Android面试题——掘金-架构之23种设计模式高频问法(6.3)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: e0397c48
date: 2025-04-07 10:42:02
---
## 一 概述

```
1.Android 中用过哪些设计模式？讲讲它的使用场景？
2.Retrofit 是用了什么设计模式实现的？
3.View 的事件分发中用了哪些设计模式？
4.你如何封装网络请求？用了哪些模式？
5.Glide 中用了哪些设计模式？
6.如何优雅实现组件解耦？用了什么模式？
7.多状态页面如何管理，用什么模式更合适？
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 Android 中用过哪些设计模式？讲讲它的使用场景？

1-单例模式（Singleton）

```
1.目的：保证全局只有一个实例。
2.场景举例：
-自定义 AppManager 管理 Activity 栈。
-Retrofit 网络单例封装：
public class RetrofitClient {
    private static volatile RetrofitClient instance;
    public static RetrofitClient getInstance() {
        if (instance == null) {
            synchronized (RetrofitClient.class) {
                if (instance == null) {
                    instance = new RetrofitClient();
                }
            }
        }
        return instance;
    }
}
```

2-工厂模式（Factory）

```
1.目的：隐藏对象创建逻辑，统一创建方式。
2.场景举例：
-LayoutInflater.from(context)
-通过封装不同网络请求创建方式：
object ApiFactory {
    fun create(type: Int): ApiService {
        return when (type) {
            0 -> retrofit1.create(ApiService::class.java)
            1 -> retrofit2.create(ApiService::class.java)
            else -> throw IllegalArgumentException("Invalid type")
        }
    }
}
```

3-建造者模式（Builder）

```
1.目的：链式构建复杂对象。
2.场景举例：
-AlertDialog.Builder
-NotificationCompat.Builder
-Glide 图片加载：
Glide.with(context)
     .load(url)
     .placeholder(R.drawable.loading)
     .into(imageView)
```

4-观察者模式（Observer）

```
1.目的：一对多监听响应变化。
2.场景举例：
-LiveData + LifecycleObserver
-广播机制 BroadcastReceiver
-RxJava 的订阅发布
```

5-策略模式（Strategy）

```
1.目的：动态切换不同算法或行为。
2.场景举例：
-图片缓存策略（如磁盘优先、内存优先）
-RecyclerView 不同 LayoutManager
-网络请求缓存策略封装
```

6-责任链模式（Chain of Responsibility）

```
1.目的：多个处理者串联处理同一个请求。
2.场景举例：
-OkHttp 的 Interceptor 链
-TouchEvent 的分发机制（Activity → ViewGroup → View）
```

7-装饰器模式（Decorator）

```
1.目的：动态扩展对象功能。
2.场景举例：
-InputStream 系列
-RecyclerView.ItemDecoration 装饰列表
-OkHttp 的日志拦截器
```

8-代理模式（Proxy）

```
1.目的：通过代理类控制原对象的访问。
2.场景举例：
-Retrofit 动态代理接口（通过 Proxy 实现 API 请求）
-Binder 通信中的 IInterface、Stub 代理
```


9-模板方法模式（Template Method）


```
1.目的：定义流程骨架，子类实现细节。
2.场景举例：
自定义 BaseActivity 控制生命周期：
abstract class BaseActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initView()
        initData()
    }
    abstract fun initView()
    abstract fun initData()
}
```

10- 外观模式（Facade）

```
1.目的：封装复杂子系统，提供统一调用入口。
2.场景举例：
-网络框架封装统一入口（请求、解析、异常处理）
-自定义播放器 SDK 提供 PlayerManager 简化使用
```

### 2.2 Retrofit 是用了什么设计模式实现的？

#### 2.2.1 Retrofit 用到的设计模式一览

|  设计模式  |           Retrofit 中的应用            |
| :--------: | :------------------------------------: |
|  单例模式  |           Retrofit 实例创建            |
| 建造者模式 | `Retrofit.Builder` 构建 Retrofit 对象  |
|  工厂模式  | Converter.Factory, CallAdapter.Factory |
|  代理模式  |            动态代理接口请求            |
| 责任链模式 |            OkHttp 拦截器链             |
| 适配器模式 | CallAdapter 接口适配 RxJava、Coroutine |
| 装饰器模式 |   OkHttp Interceptor 中封装请求响应    |

#### 2.2.2 Retrofit 设计模式详解

2-1  单例模式（Singleton）

```
1.场景：Retrofit 实例只创建一次，避免资源浪费。
2.示例：
object RetrofitClient {
    val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl("https://api.example.com")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
}
```

2-2 建造者模式（Builder）

```
1.场景：通过 Retrofit.Builder() 逐步设置参数。
2.源码：
Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("https://...")
        .addConverterFactory(GsonConverterFactory.create())
        .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
        .client(new OkHttpClient())
        .build();
```

2-3 工厂模式（Factory）

```
1.场景：用于创建不同的 Converter、CallAdapter。
2.源码接口：
public interface Converter<F, T> {
    T convert(F value);
    abstract class Factory {
        // GsonFactory, MoshiFactory 等
    }
}

public interface CallAdapter<R, T> {
    T adapt(Call<R> call);
    abstract class Factory {}
}
```

2-4 动态代理模式（Proxy）⭐重点

```
1.场景：接口请求是通过 Java 动态代理生成的。
2.核心源码：
Object proxy = Proxy.newProxyInstance(
    service.getClassLoader(),
    new Class<?>[]{service},
    new InvocationHandler() {
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) {
            return loadServiceMethod(method).invoke(args);
        }
    });
好处：调用接口方法时不用手动写请求逻辑，Retrofit 自动帮你处理（如拦截器、参数、Call返回）    
```

2-5 责任链模式（Chain of Responsibility）【结合 OkHttp】

```
1.场景：OkHttp 网络请求是通过 Interceptor 链执行。
2.例如：
-RetryInterceptor
-LoggingInterceptor
-CacheInterceptor
-CallServerInterceptor
```

2-6 适配器模式（Adapter）

```
场景：CallAdapter.Factory 把 Call 适配成你需要的形式（比如 RxJava、LiveData、协程 suspend 等）
例子：
retrofit.addCallAdapterFactory(RxJava2CallAdapterFactory.create());
```

2-7 装饰器模式（Decorator）

```
1.场景：在 OkHttp 的请求/响应过程中添加额外功能（比如加密、日志、header）
2.使用：client.addInterceptor(loggingInterceptor) // 添加装饰行为
```

### 2.3 View 的事件分发中用了哪些设计模式？

#### 2.3.1 View 的事件分发中使用的设计模式

|   设计模式   |                     具体应用                      |
| :----------: | :-----------------------------------------------: |
|  责任链模式  |              事件的传递、拦截与处理               |
| 模板方法模式 | `dispatchTouchEvent` 与 `onTouchEvent` 的执行顺序 |
|   策略模式   | 不同的事件分发策略（如 `onInterceptTouchEvent`）  |
|  适配器模式  |          `onTouchEvent` 与具体事件的适配          |
|   状态模式   |          View 的不同状态下的事件处理逻辑          |

#### 2.3.2 View 事件分发中的设计模式详细分析

1-责任链模式（Chain of Responsibility）

```
1.场景：
事件从父视图分发到子视图时，通过责任链模式逐层传递触摸事件。
如果某个 View 不处理该事件，它会将事件传递给下一个 View。

2.实现：dispatchTouchEvent 在 ViewGroup 和 View 之间传递事件。

3.源码：
public boolean dispatchTouchEvent(MotionEvent ev) {
    if (onInterceptTouchEvent(ev)) {
        // 事件被拦截
        return onTouchEvent(ev);
    } else {
        return super.dispatchTouchEvent(ev);
    }
}
```

2-模板方法模式（Template Method）

```
1.场景：
事件的处理流程被模板化，父类定义事件分发的流程骨架，具体的事件处理方法由子类（如 View 或 ViewGroup）实现。

2.实现：
dispatchTouchEvent 定义了事件的传递和处理顺序，
具体的事件处理逻辑由 onInterceptTouchEvent 和 onTouchEvent 实现

3.源码：
public boolean dispatchTouchEvent(MotionEvent ev) {
    if (onInterceptTouchEvent(ev)) { // 处理事件拦截
        return onTouchEvent(ev); // 事件最终处理
    }
    return super.dispatchTouchEvent(ev); // 继续传递事件
}
```

3-策略模式（Strategy）

```
1.场景：
onInterceptTouchEvent 是用来决定是否拦截事件处理的，它可以有不同的策略来决定是否处理该事件。
例如，点击时 ViewGroup 可能会拦截事件，而滑动时则不拦截。

2.实现：通过 onInterceptTouchEvent 来改变事件的分发策略，决定是否拦截触摸事件。

3.源码：
public boolean onInterceptTouchEvent(MotionEvent ev) {
    if (shouldIntercept(ev)) {
        return true; // 拦截事件
    }
    return false; // 不拦截
}
```

4- 适配器模式（Adapter）

```
1.场景：
onTouchEvent 是适配器，用来将 MotionEvent（原始事件数据）适配到具体的事件处理逻辑。
事件本身是抽象的，View 根据具体实现将事件适配为响应。

2.实现：onTouchEvent 方法处理不同类型的事件（如点击、滑动、长按等）。

3.源码：
public boolean onTouchEvent(MotionEvent event) {
    switch (event.getAction()) {
        case MotionEvent.ACTION_DOWN:
            // 处理按下事件
            break;
        case MotionEvent.ACTION_MOVE:
            // 处理滑动事件
            break;
        case MotionEvent.ACTION_UP:
            // 处理抬起事件
            break;
    }
    return true;
}
```

5-状态模式（State）

```
1.场景：
View 在不同状态下的事件处理逻辑不同。
例如，按钮在点击时和未点击时的处理逻辑不同。不同状态的切换可以通过状态模式来处理。

2.实现：onTouchEvent 中根据不同的事件类型（如点击、拖动等）切换 View 的状态，进而触发不同的事件处理逻辑。

3.源码：
public boolean onTouchEvent(MotionEvent event) {
    switch (event.getAction()) {
        case MotionEvent.ACTION_DOWN:
            // 设置按钮为按下状态
            setPressed(true);
            break;
        case MotionEvent.ACTION_UP:
            // 设置按钮为未按下状态
            setPressed(false);
            break;
    }
    return true;
}
```

### 2.4 你如何封装网络请求？用了哪些模式？

#### 2.4.1 网络请求封装常见设计模式

|   设计模式   |                      具体应用                      |
| :----------: | :------------------------------------------------: |
|   单例模式   |     网络客户端（如 Retrofit 或 OkHttpClient）      |
|   工厂模式   |       用于创建不同的请求接口、请求参数的构造       |
|   策略模式   |    用于选择不同的请求方式（GET、POST、PUT 等）     |
|  适配器模式  |    将网络请求的响应数据适配到项目所需的数据格式    |
|   代理模式   | 请求的拦截与处理（如网络请求的拦截、日志、缓存等） |
|  装饰器模式  |    增强网络请求的功能（如添加缓存、重试机制等）    |
| 模板方法模式 |    网络请求的流程模板化，子类实现具体的请求方法    |

#### 2.4.2 如何封装网络请求：常用设计模式的应用

1-单例模式（Singleton）

```
1.场景：网络请求的客户端通常是单例，避免多次创建客户端对象，减少资源消耗。
2.实现：例如，使用 Retrofit 或 OkHttp 客户端作为单例。
object RetrofitClient {
    val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl("https://api.example.com")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
}
```

2-工厂模式（Factory）

```
1.场景：根据不同的接口类型创建不同的请求对象。可以统一管理不同 API 请求接口的创建。
2.实现：创建一个工厂类，根据请求类型（GET、POST）或不同的网络库封装不同的请求。
object ApiServiceFactory {
    fun createApiService(): ApiService {
        return RetrofitClient.retrofit.create(ApiService::class.java)
    }
}
```

3-策略模式（Strategy）

```
1.场景：根据不同的需求选择不同的网络请求策略（如不同的 HTTP 方法、请求头、请求参数等）。
2.实现：可以通过封装不同的请求方式（如 GET, POST, PUT 等）来实现动态选择。
interface RequestStrategy {
    fun executeRequest(): Call<ResponseBody>
}

class GetRequestStrategy(private val url: String) : RequestStrategy {
    override fun executeRequest(): Call<ResponseBody> {
        return retrofitService.get(url)
    }
}

class PostRequestStrategy(private val url: String, private val body: RequestBody) : RequestStrategy {
    override fun executeRequest(): Call<ResponseBody> {
        return retrofitService.post(url, body)
    }
}
```

4-适配器模式（Adapter）

```
1.场景：网络请求的响应数据通常与应用所需的数据结构不完全匹配，可以使用适配器模式进行数据转换。
2.实现：例如，使用 ResponseBody 或 String 作为响应，适配成应用需要的 Model 类。
class ResponseAdapter {
    fun adapt(response: Response<ResponseBody>): Result {
        val json = response.body()?.string() ?: "{}"
        return Gson().fromJson(json, Result::class.java)
    }
}
```

5-代理模式（Proxy）

```
1.场景：代理模式常用于请求拦截，做一些通用操作，如请求日志、请求头注入、缓存等。
2.实现：通过 OkHttp 的 Interceptor 或自定义的代理类，可以拦截请求并做统一处理。
class LoggingInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
        Log.d("Request", "URL: ${request.url}")
        return chain.proceed(request)
    }
}
```

6-装饰器模式（Decorator）

```
1.场景：装饰器模式用于增强网络请求的功能，比如增加重试机制、缓存、超时控制等。
2.实现：通过扩展 OkHttpClient 或其他网络请求库来添加装饰功能。
class RetryInterceptor(private val maxRetries: Int) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        var attempt = 0
        var response: Response
        do {
            response = chain.proceed(chain.request())
            attempt++
        } while (!response.isSuccessful && attempt < maxRetries)
        return response
    }
}
```

7-模板方法模式（Template Method）

```
1.场景：
在网络请求中，某些流程是固定的（如添加公共请求头、请求体），而具体的实现由子类提供（如具体请求接口的实现）。
2.实现：可以在父类中定义网络请求的模板流程，子类实现具体的请求方式。
abstract class NetworkRequest {
    fun execute() {
        prepareRequest()
        val response = makeRequest()
        handleResponse(response)
    }

    abstract fun prepareRequest()
    abstract fun makeRequest(): Response
    abstract fun handleResponse(response: Response)
}

class GetRequest : NetworkRequest() {
    override fun prepareRequest() {
        // 准备 GET 请求
    }

    override fun makeRequest(): Response {
        // 执行 GET 请求
        return Response.success("OK")
    }

    override fun handleResponse(response: Response) {
        // 处理响应
    }
}
```

### 2.5 Glide 中用了哪些设计模式？

#### 2.5.1 Glide 中使用的设计模式

|  设计模式  |                   具体应用                   |
| :--------: | :------------------------------------------: |
|  单例模式  |        Glide 的初始化和图片加载管理器        |
|  工厂模式  |       图片请求的构建和不同图片加载策略       |
| 责任链模式 |   图片加载的各种操作，如解码、转换、显示等   |
|  策略模式  |        图片的缓存策略、加载策略的切换        |
| 适配器模式 |    图片加载过程中不同解码器、转换器的适配    |
| 装饰器模式 | 加载过程中的各种增强功能，如图片转换、动画等 |

#### 2.5.2 Glide 中使用的设计模式详细分析

1- 单例模式（Singleton）

```
1.场景：
为了避免重复创建 Glide 实例，Glide 使用单例模式来管理图片加载器的生命周期，
确保应用中只有一个 Glide 实例来管理图片加载。

2.实现：Glide 类本身就是一个单例，通过 Glide.with() 方法可以获取唯一的 Glide 实例，进行图片加载。

3.代码示例：
Glide.with(context)
     .load(url)
     .into(imageView);
```

2-工厂模式（Factory）

```
1.场景：
Glide 通过工厂模式来构建不同类型的图片加载请求，支持多种图片加载策略（如默认加载、圆形图片、模糊效果等）。

2.实现：
通过 RequestBuilder 和 RequestOptions，Glide 提供了不同类型的图片加载方式，
便于开发者根据需求选择不同的加载方式。

3.代码示例：
Glide.with(context)
     .load(url)
     .apply(RequestOptions.circleCropTransform()) // 使用圆形裁剪
     .into(imageView);
```

3-责任链模式（Chain of Responsibility）

```
1.场景：
Glide 加载图片的过程非常复杂，涉及到多个操作（如解码、图片转换、缓存加载等）。
通过责任链模式，Glide 将这些操作串联起来，逐步执行。

2.实现：
在 Glide 内部，通过责任链模式组织一系列处理操作。
例如，加载图片的请求会经过一系列的转换、解码、缓存等操作，直到图片被加载到 ImageView 中。

3.代码示例：
Glide.with(context)
     .load(url)
     .apply(RequestOptions.centerCropTransform()) // 中央裁剪
     .into(imageView);
```

4-策略模式（Strategy）

```
1.场景：
图片加载时，Glide 允许开发者根据需求灵活选择不同的加载策略，比如内存缓存、磁盘缓存、图片大小调整策略等。

2.实现：
Glide 提供了多种缓存策略（如 DiskCacheStrategy.ALL、DiskCacheStrategy.NONE 等），
可以根据不同的使用场景选择不同的策略。

3.代码示例：
Glide.with(context)
     .load(url)
     .diskCacheStrategy(DiskCacheStrategy.ALL)  // 使用所有缓存策略
     .into(imageView);
```

5-适配器模式（Adapter）

```
1.场景：Glide 内部需要处理各种不同格式的图片、数据源等，适配器模式允许 Glide 支持多种不同的解码器和数据源。

2.实现：
Glide 支持多种数据源类型（如 URL、URI、本地文件等）以及不同格式的图片解码器（如 JPEG、PNG、GIF）。
通过适配器模式，Glide 可以灵活地为不同的数据源或图片格式选择合适的解码方式。

3.代码示例：
Glide.with(context)
     .load(new File("/path/to/file"))
     .into(imageView);
```

6-装饰器模式（Decorator）

```
1.场景：
Glide 在加载图片时，允许开发者对图片进行各种增强操作，如添加圆形裁剪、模糊效果等。
这些操作可以通过装饰器模式来实现，逐步装饰图片加载请求。

2.实现：
Glide 的 RequestOptions 和转换器（如 CircleCrop、BlurTransformation）就是典型的装饰器，
通过对请求的“装饰”来增强图片加载的效果。

3.代码示例：
Glide.with(context)
     .load(url)
     .apply(RequestOptions.bitmapTransform(new CircleCrop()))  // 装饰器：圆形裁剪
     .into(imageView);
```

### 2.6 如何优雅实现组件解耦？用了什么模式？

1-组件解耦的核心目标

```
-模块间依赖最小化（避免互相引用）
-独立开发、测试、部署
-代码职责清晰，方便维护
-支持插件化或动态扩展
```

2-常见解耦方式与对应设计模式

|        解耦方式        |               使用场景                |          涉及设计模式          |
| :--------------------: | :-----------------------------------: | :----------------------------: |
|      接口 + 工厂       |      服务调用、模块功能统一入口       | 接口隔离 + 工厂模式 + 单例模式 |
| 路由框架（如 ARouter） |          页面跳转、服务调用           |      策略模式 + 注册模式       |
|  EventBus / LiveData   |            跨模块事件传递             |           观察者模式           |
|  Hilt / Dagger2 注入   |            跨模块依赖注入             |  依赖注入 + 单例 + 构造器模式  |
| ContentProvider / SPI  |        应用启动时模块自动注册         |      插件机制 + 注册模式       |
|   反射 + 注解处理器    | 运行时/编译时自动发现并加载模块实现类 |   反射 + 模板方法 + 代理模式   |

### 2.7 多状态页面如何管理，用什么模式更合适？

#### 2.7.1 常见页面状态

|   状态    |        含义        |
| :-------: | :----------------: |
|  Loading  |      正在加载      |
|  Content  |      正常内容      |
|   Empty   |      数据为空      |
|   Error   |     服务器错误     |
| NoNetwork | 网络异常，加载失败 |
|           |                    |

#### 2.7.2 如何管理多状态页面？

1-方法一：封装状态容器 + 状态切换方法（推荐）

```
1.说明
统一一个 ViewGroup（如 FrameLayout）管理不同状态的 View。
提供 showLoading(), showContent() 等方法。

2.设计模式：状态模式 + 策略模式
-状态模式：每种状态对应一种 UI 表现，状态切换通过统一接口完成。
-策略模式：不同状态通过不同 View 策略实现。

示例：
multiStateLayout.setContentView(contentView)
multiStateLayout.showLoading()
```

2-方法二：结合 Jetpack ViewModel + LiveData 实现状态绑定（MVVM）

```
设计模式：观察者模式 + 状态模式 + MVVM

enum class PageState { LOADING, CONTENT, ERROR, EMPTY }
class MyViewModel : ViewModel() {
    val state = MutableLiveData<PageState>()
}
在 UI 层观察状态
viewModel.state.observe(this) {
    when (it) {
        LOADING -> multiStateLayout.showLoading()
        CONTENT -> multiStateLayout.showContent()
        ERROR -> multiStateLayout.showError()
        EMPTY -> multiStateLayout.showEmpty()
    }
}
```

#### 2.7.3 项目中推荐封装方式

```
-封装一个 MultiStateLayout / UIStatusView
-支持自定义状态布局（传入 layoutId）
-支持重试点击、错误消息显示等能力
-和 ViewModel 状态绑定，解耦 UI 与逻辑
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)