---
title: Android开发之——Android Studio 3.0 构建中失败总结
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - AS3.0
abbrlink: 7bcf7fd0
date: 2017-12-16 22:41:16
---
## 一 前言

AS3.0加入了新的功能，比如默认集成了Kotlin等，但是在使用中也会遇到很多问题，现在把AS3.0开发中遇到的问题总结一下。


<!--more-->

## 二 issue
### 2.1 现象
```
Annotation processors must be explicitly declared now
```

之前在AS2.3中的项目，迁移到AS3.0后突然不能运行了，错误如下：

```
Error:Execution failed for task ':app:javaPreCompileDebug'.
> Annotation processors must be explicitly declared now.  The following dependencies on the compile classpath are found to contain annotation processor.  Please add them to the annotationProcessor configuration.
- butterknife-7.0.1.jar (com.jakewharton:butterknife:7.0.1)
Alternatively, set android.defaultConfig.javaCompileOptions.annotationProcessorOptions.includeCompileClasspath = true to continue with previous behavior.  Note that this option is deprecated and will be removed in the future.
See https://developer.android.com/r/tools/annotation-processor-error-message.html for more details.
```

### 2.2 解决：   
在app的build.gradle中添加如下配置 

```
javaCompileOptions {
        annotationProcessorOptions {
            includeCompileClasspath true
        }
    }
```

![][1]
同步之后就OK了




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-annotation.png