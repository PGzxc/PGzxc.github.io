---
title: Android面试题——掘金-三方框架之Arouter(5.4)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: bf1099f0
date: 2025-04-07 10:33:32
---
## 一 概述

```
Android 三方框架相关面试题：ARouter
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 ARouter 是什么？它的主要作用是什么？

```
ARouter 是阿里巴巴开源的 Android 路由框架，解决模块化开发中页面跳转、服务调用、解耦的问题。
简单说，就是实现“像 Web 那样，通过路径跳转不同页面”。
```

### 2.2 ARouter 的主要功能有哪些？

```
-页面路由跳转：ARouter.getInstance().build("/login/main").navigation()
-支持参数传递（基本类型、对象等）
-支持模块间服务调用（通过接口注入）
-支持拦截器（登录鉴权、埋点等）
-支持多种跳转方式（Activity、Fragment、服务、Provider）
-支持自动注入参数
-支持 URL 映射、降级策略
-支持 Kotlin、Java、Gradle 多模块构建
```

### 2.3  ARouter 的基本使用流程？

```
1.在 build.gradle 中引入
// 根目录 build.gradle
classpath "com.alibaba:arouter-register:x.x.x"

// app/build.gradle
implementation 'com.alibaba:arouter-api:x.x.x'
kapt 'com.alibaba:arouter-compiler:x.x.x'

2.在 Application 初始化：
if (BuildConfig.DEBUG) {
    ARouter.openLog()
    ARouter.openDebug()
}
ARouter.init(application)

3.使用 @Route(path = "/path/xxx") 注解页面：
@Route(path = "/home/main")
class HomeActivity : AppCompatActivity() { ... }

4.页面跳转：
ARouter.getInstance().build("/home/main").navigation()
```

### 2.4 ARouter 是如何实现路由表的？

```
ARouter 通过注解处理器（APT）在编译期扫描 @Route 注解，生成路由表类（如 ARouter$$Root$$xxx.java）。

-编译期：自动生成路径与类的映射表；
-运行期：通过路径查表、反射创建实例；
-最终通过 navigation() 跳转目标 Activity。
```

### 2.5 ARouter 如何实现参数注入？

```
1.概念
使用 @Autowired 注解定义参数；
调用 ARouter.getInstance().inject(this) 自动注入。

2.示例
@Route(path = "/profile/detail")
class ProfileActivity : AppCompatActivity() {

    @Autowired
    lateinit var userId: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        ARouter.getInstance().inject(this)
    }
}
跳转时传参：
ARouter.getInstance().build("/profile/detail")
    .withString("userId", "123")
    .navigation()
```

### 2.6  ARouter 如何支持模块间调用服务（Service）？

```
通过接口 + 实现类注入机制实现服务调用：

1.定义接口：
interface IUserService {
    fun getUserName(): String
}
2.实现类用 @Route(path = “…") 标注：
@Route(path = "/service/user")
class UserServiceImpl : IUserService { ... }
3.使用：
val service = ARouter.getInstance().navigation(IUserService::class.java)
```

### 2.7 ARouter 拦截器怎么实现？拦截器优先级怎么控制？

```
1.实现 IInterceptor 接口，并注册到路由表中。
@Interceptor(priority = 8, name = "LoginInterceptor")
class LoginInterceptor : IInterceptor {
    override fun process(postcard: Postcard, callback: InterceptorCallback) {
        if (isLogin()) {
            callback.onContinue(postcard)
        } else {
            callback.onInterrupt(null)
        }
    }
}

2.拦截器优先级： priority 值越小，优先级越高。
```

### 2.8 ARouter 如何处理找不到路径或跳转失败？

```
1.设置全局降级策略：
ARouter.getInstance().setDegradeService(object : DegradeService {
    override fun onLost(context: Context?, postcard: Postcard?) {
        // 页面不存在，跳转错误页
    }
})

2.或者使用 navigation(context, callback) 捕获：
ARouter.getInstance().build("/xxx/xxx")
    .navigation(this, object : NavCallback() {
        override fun onLost(postcard: Postcard?) {
            // 页面未找到
        }
    })
```

### 2.9 ARouter 支持哪些类型的参数？

```
支持大多数基本类型、Serializable、Parcelable、自定义对象（需自定义 JsonService 实现）：

-withInt()、withString()、withBoolean()…
-withSerializable()、withParcelable()
-自定义对象需注册 Json 序列化解析器。
```

### 2.10 ARouter 的优缺点？

```
1.优点：
-解耦，模块之间无需直接依赖；
-支持路由跳转、服务调用；
-注解式注册，易于维护；
-多种扩展功能：拦截器、降级、参数注入等；
-编译期生成路由表，性能好。

缺点：
-路由路径易出错，无编译检查；
-使用反射，虽已优化，但仍存在一定开销；
-多模块下初始化复杂度增加；
-@Autowired 不支持泛型类型注入。
```

### 2.11 ARouter 和 Activity/Fragment/Service 直接调用的对比？

|   对比项   |      直接调用       |         ARouter          |
| :--------: | :-----------------: | :----------------------: |
|   解耦性   | 强依赖（需 import） |        ✅ 完全解耦        |
|  编译依赖  |         有          |   ✅ 无（通过路由路径）   |
|  可扩展性  |         差          | ✅ 支持服务调用、拦截器等 |
|  跳转方式  |        固定         | 灵活，支持降级、参数注入 |
| 多模块支持 |    手动管理依赖     |      ✅ 模块完全独立      |

### 2.12 总结

|    维度    |             说明              |
| :--------: | :---------------------------: |
|  路由注册  |          注解 @Route          |
| 编译时处理 |        APT 生成路由表         |
|  路由跳转  |      build + navigation       |
|  参数传递  |     @Autowired + withXXX      |
|   拦截器   |         IInterceptor          |
|  服务调用  | 接口注入（navigation(Class)） |
|  资源开销  |       少，运行期性能高        |

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)