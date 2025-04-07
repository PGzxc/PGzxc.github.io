---
title: Android面试题——掘金-JetPack之Hilt(3.7)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: 43b48a81
date: 2025-04-07 09:48:24
---
## 一 概述-Hilt（依赖注入）

```
Hilt 是 Android 官方推荐的依赖注入（DI）框架，基于 Dagger，提供 更简洁、更易用的依赖注入方式，
帮助开发者管理对象的生命周期、简化依赖关系，并 提高应用的模块化和可测试性。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 Hilt？它的作用是什么？

```
1.概念
Hilt 是 Dagger 在 Android 上的封装，用于 自动管理依赖对象的创建、生命周期和注入。

2.Hilt 的作用
✅ 简化 Dagger 依赖注入（无需手写 Factory 和 Component）
✅ 提供标准作用域（Activity、Fragment、ViewModel...）
✅ 减少样板代码，提高可维护性
✅ 兼容 ViewModel、WorkManager、Navigation 等 Jetpack 组件
✅ 方便单元测试
```

### 2.2 Hilt 的核心组件有哪些？

|      组件       |                      作用                      |
| :-------------: | :--------------------------------------------: |
| @HiltAndroidApp |    Application 入口，生成 Hilt 依赖注入容器    |
|     @Inject     |       用于构造函数或字段，标记可注入对象       |
| @HiltViewModel  |     用于 ViewModel，使其支持 Hilt 依赖注入     |
|     @Module     |                 定义依赖提供者                 |
|   @InstallIn    | 指定 Module 作用域（Application、Activity...） |
|    @Provides    |            提供非构造函数可注入对象            |
|   @Singleton    |                标记全局单例对象                |

### 2.3 Hilt 的基本使用

```
1.在 Application 入口添加 Hilt
@HiltAndroidApp
public class MyApplication extends Application {
}

2.注入依赖（构造函数方式）
2.1 如果 对象可以通过构造函数直接创建，直接用 @Inject 标记：
public class UserRepository {
    @Inject
    public UserRepository() {
    }
}
2.2 在 Activity 里使用
@AndroidEntryPoint
public class MainActivity extends AppCompatActivity {
    @Inject
    UserRepository userRepository; // Hilt 自动提供实例
}

3.使用 @Module 提供实例
3.1 如果对象 不能通过构造函数直接创建（如 Retrofit），使用 @Module 和 @Provides 提供
@Module
@InstallIn(SingletonComponent.class) // 作用域：全局
public class AppModule {

    @Provides
    @Singleton
    public static Retrofit provideRetrofit() {
        return new Retrofit.Builder()
                .baseUrl("https://api.example.com")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
    }

    @Provides
    @Singleton
    public static ApiService provideApiService(Retrofit retrofit) {
        return retrofit.create(ApiService.class);
    }
}
3.2 在 Activity 里使用
@AndroidEntryPoint
public class MainActivity extends AppCompatActivity {
    @Inject
    ApiService apiService; // Hilt 自动提供实例
}
```

### 2.4 Hilt 作用域（Scope）

1.Hilt 提供多个作用域，控制对象的生命周期：

|      作用域      |      注解       |         生命周期          |
| :--------------: | :-------------: | :-----------------------: |
|     全局单例     |   @Singleton    |     整个应用生命周期      |
| Activity 作用域  | @ActivityScoped | 仅在 `Activity` 期间有效  |
| Fragment 作用域  | @FragmentScoped | 仅在 `Fragment` 期间有效  |
| ViewModel 作用域 | @HiltViewModel  | 仅在 `ViewModel` 期间有效 |
|  Service 作用域  | @ServiceScoped  |  仅在 `Service` 期间有效  |

2-示例

```
@ActivityScoped
public class UserManager {
    @Inject
    public UserManager() {
    }
}
```

### 2.5 Hilt 在 ViewModel 中使用

```
1.viewmodel
@HiltViewModel
public class MyViewModel extends ViewModel {
    private final UserRepository userRepository;

    @Inject
    public MyViewModel(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}

2.在 Activity / Fragment 里使用
public class MainActivity extends AppCompatActivity {
    private MyViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        viewModel = new ViewModelProvider(this).get(MyViewModel.class);
    }
}
```

### 2.6 Hilt 如何提供不同实现？（Qualifier）

```
1.当有多个相同类型的依赖时，需要使用 @Qualifier 区分
@Qualifier
@Retention(RUNTIME)
public @interface LocalSource {}

@Qualifier
@Retention(RUNTIME)
public @interface RemoteSource {}

2.在 Module 提供多个实现
@Module
@InstallIn(SingletonComponent.class)
public class DataModule {
    @Provides
    @Singleton
    @LocalSource
    public static UserRepository provideLocalRepo() {
        return new LocalUserRepository();
    }

    @Provides
    @Singleton
    @RemoteSource
    public static UserRepository provideRemoteRepo() {
        return new RemoteUserRepository();
    }
}
3.在 ViewModel 里使用
@HiltViewModel
public class MyViewModel extends ViewModel {
    private final UserRepository userRepository;

    @Inject
    public MyViewModel(@RemoteSource UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

### 2.7 Hilt 如何与 WorkManager 结合？

```
1.自定义Worker

@HiltWorker
public class MyWorker extends Worker {
    private final ApiService apiService;

    @Inject
    public MyWorker(@NonNull Context context, @NonNull WorkerParameters workerParams, ApiService apiService) {
        super(context, workerParams);
        this.apiService = apiService;
    }

    @NonNull
    @Override
    public Result doWork() {
        // 使用 apiService
        return Result.success();
    }
}

2-创建 WorkManager 实例
WorkManager.getInstance(context)
    .enqueue(new OneTimeWorkRequest.Builder(MyWorker.class).build());
```

### 2.8 Hilt 如何进行单元测试？

```
1.概念
Hilt 提供 @HiltAndroidTest 和 @UninstallModules 进行依赖替换

2.示例
@HiltAndroidTest
public class ExampleTest {
    @Rule
    public HiltAndroidRule hiltRule = new HiltAndroidRule(this);

    @Inject
    UserRepository userRepository;

    @Before
    public void init() {
        hiltRule.inject();
    }

    @Test
    public void testUserRepository() {
        assertNotNull(userRepository);
    }
}

```

### 2.9 Hilt 和 Dagger 的区别？

|    对比项    |                 Hilt                  |         Dagger         |
| :----------: | :-----------------------------------: | :--------------------: |
|    简洁性    |      更简单，无需手动 Component       | 需要手动创建 Component |
|   注入方式   |           自动管理依赖注入            |      需要手动管理      |
| 适配 Android | 官方推荐，支持 ViewModel、WorkManager |       需手动适配       |
|   测试支持   |           内置单元测试支持            |      需要额外配置      |

### 2.10 Hilt 的优缺点？

```
1.优点
-比 Dagger 更易用，自动管理依赖
-支持 Android 生命周期，作用域清晰
-兼容 Jetpack 组件（ViewModel、WorkManager）
-支持单元测试

2.缺点
-灵活性不如 Dagger（Dagger 适合更复杂的依赖管理）
-不适用于特别复杂的多级 Component 依赖注入
```

### 2.11 Hilt 核心知识点

```
-Hilt 是 Dagger 的封装，简化依赖注入
-@HiltAndroidApp 启动 Hilt
-@Inject 标记需要注入的对象
-@Module + @Provides 提供外部依赖
-@HiltViewModel 让 ViewModel 支持 Hilt
-支持 WorkManager、Retrofit、RxJava、Flow
-支持单元测试
```

##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)