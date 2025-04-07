---
title: Android面试题——掘金-JetPack之WorkManager(3.9)
categories:
  - 面试相关
  - Android面试题
tags:
  - 掘金
abbrlink: d5c1d594
date: 2025-04-07 09:50:28
---
## 一 概述-WorkManager（任务调度）

```
WorkManager 是 Jetpack 提供的持久化任务调度框架，
用于 确保任务在适当的时间执行，即使应用被杀死或设备重启。
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是 WorkManager？它的作用是什么？

```
1.概念
WorkManager 是 Android 官方推荐的 任务调度 API，用于 执行需要保证成功的后台任务，如：

2.作用
✅ 数据同步（上传日志、备份文件）
✅ 图片压缩、数据库清理
✅ 周期性任务（定时检查更新）
✅ 网络请求（确保有网络时执行）
```

### 2.2 WorkManager 适用于哪些场景？

```
-必须保证任务完成（即使设备重启或 App 退出）
-适用于长时间运行的任务（超过 10 分钟）
-无需实时执行的任务（低优先级后台任务）
-适用于电量、网络受限的情况
```

### 2.3 WorkManager 的核心组件

|      组件       |                作用                 |
| :-------------: | :---------------------------------: |
|     Worker      |           执行任务的逻辑            |
|   WorkRequest   |       任务请求，定义任务参数        |
|   WorkManager   |        任务管理器，调度任务         |
| WorkConstraints | 约束条件（如 WiFi、电量充足时执行） |

### 2.4 WorkManager 的基本使用

```
1.创建 Worker
public class UploadWorker extends Worker {
    public UploadWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
    }

    @NonNull
    @Override
    public Result doWork() {
        // 执行后台任务（如上传文件）
        uploadFile();
        return Result.success();
    }
}

2.创建 WorkRequest
WorkRequest uploadWorkRequest = new OneTimeWorkRequest.Builder(UploadWorker.class).build();

添加执行约束（如仅在 WiFi 时执行）：
Constraints constraints = new Constraints.Builder()
        .setRequiredNetworkType(NetworkType.UNMETERED) // 仅在 WiFi 下执行
        .setRequiresCharging(true) // 设备充电时执行
        .build();

WorkRequest constrainedWorkRequest = new OneTimeWorkRequest.Builder(UploadWorker.class)
        .setConstraints(constraints)
        .build();

3.使用 WorkManager 调度任务
WorkManager.getInstance(context).enqueue(uploadWorkRequest);
```

### 2.5 WorkManager 任务类型

|  任务类型  |           API           |       作用       |
| :--------: | :---------------------: | :--------------: |
| 一次性任务 |   OneTimeWorkRequest    |    仅执行一次    |
| 周期性任务 |   PeriodicWorkRequest   |     定期执行     |
|  链式任务  | WorkManager.beginWith() | 串行执行多个任务 |

### 2.6 周期性任务（PeriodicWorkRequest）

```
1.示例
PeriodicWorkRequest periodicWork = new PeriodicWorkRequest.Builder(UploadWorker.class, 15, TimeUnit.MINUTES)
        .setConstraints(new Constraints.Builder().setRequiresCharging(true).build())
        .build();

WorkManager.getInstance(context).enqueue(periodicWork);

2.注意
-最短间隔 15 分钟（系统优化）
-任务不会严格按时执行（系统会优化调度）
```

### 2.7 任务链（链式任务执行）

```
1.示例
OneTimeWorkRequest workA = new OneTimeWorkRequest.Builder(WorkerA.class).build();
OneTimeWorkRequest workB = new OneTimeWorkRequest.Builder(WorkerB.class).build();
OneTimeWorkRequest workC = new OneTimeWorkRequest.Builder(WorkerC.class).build();

WorkManager.getInstance(context)
    .beginWith(workA)
    .then(workB)
    .then(workC)
    .enqueue();
2.✅ 任务按顺序执行（A → B → C）
```

### 2.8 任务合并（并行执行）

```
WorkManager.getInstance(context)
    .beginWith(Arrays.asList(workA, workB)) // A 和 B 并行
    .then(workC) // A、B 完成后执行 C
    .enqueue();
```

### 2.9 任务状态监听

1-示例

```
WorkManager.getInstance(context).getWorkInfoByIdLiveData(uploadWorkRequest.getId())
        .observe(this, workInfo -> {
            if (workInfo != null && workInfo.getState() == WorkInfo.State.SUCCEEDED) {
                Log.d("WorkManager", "任务成功完成");
            }
        });
```

2-任务状态

|   状态    |      作用      |
| :-------: | :------------: |
| ENQUEUED  | 已加入任务队列 |
|  RUNNING  |  任务正在执行  |
| SUCCEEDED |  任务成功完成  |
|  FAILED   |  任务执行失败  |
| CANCELLED |   任务被取消   |

### 2.10 任务取消

```
1.取消某个
WorkManager.getInstance(context).cancelWorkById(uploadWorkRequest.getId());
2.或者取消所有任务
WorkManager.getInstance(context).cancelAllWork();
```

### 2.11 任务重试

```
在 Worker 中返回 Result.retry() 让任务重试
@NonNull
@Override
public Result doWork() {
    try {
        uploadFile();
        return Result.success();
    } catch (Exception e) {
        return Result.retry();
    }
}
```

### 2.12 WorkManager 和其他任务调度方式的对比

|   对比项   |     WorkManager      |      AlarmManager      | JobScheduler | Foreground Service |
| :--------: | :------------------: | :--------------------: | :----------: | :----------------: |
|  适用任务  | 长期任务（数据同步） |        定时闹钟        |   后台调度   |   长时间前台任务   |
| 任务可靠性 |    ✅ 保证任务完成    | ❌ 应用被杀死后任务丢失 | ✅ 适用于8.0+ |  ✅ 适用于前台任务  |
|  电池优化  |        ✅ 支持        |        ❌ 无优化        |    ✅ 支持    |      ❌ 无优化      |
|  执行限制  |   ⚠️ 可能会延迟执行   |      ⏳ 受系统限制      | ⏳ 受系统限制 |    ❌ 需手动控制    |

### 2.13 WorkManager 适用于哪些 Android 版本？

```
✅ Android 5.0（API 21）以上
✅ 自动选择最佳任务调度方式（JobScheduler、AlarmManager...）
```

### 2.14 WorkManager 和 Coroutine / RxJava 结合

```
1.WorkManager + Coroutine
public class CoroutineWorkerExample extends CoroutineWorker {
    public CoroutineWorkerExample(@NonNull Context context, @NonNull WorkerParameters params) {
        super(context, params);
    }

    @NonNull
    @Override
    public Result doWork() {
        runBlocking {
            uploadFile() // 挂起函数
        }
        return Result.success();
    }
}

2.WorkManager + RxJava
public class RxWorkerExample extends RxWorker {
    public RxWorkerExample(@NonNull Context context, @NonNull WorkerParameters params) {
        super(context, params);
    }

    @NonNull
    @Override
    public Single<Result> createWork() {
        return Single.fromCallable(() -> {
            uploadFile();
            return Result.success();
        });
    }
}
```

### 2.15 总结

```
 WorkManager 是 Android 推荐的后台任务调度 API，
 适用于 需要保证任务完成 的情况，比如 数据同步、日志上传、定期检查。

✅ 支持持久化任务（即使设备重启或 App 关闭）
✅ 支持任务链（串行、并行执行）
✅ 支持约束条件（WiFi、电量充足时执行）
✅ 支持 Coroutine、RxJava
✅ 兼容所有 Android 版本（自动适配 API 级别）
```


##  三 参考

* [掘金—知识库的大纲](https://juejin.cn/post/7480464724096057381)